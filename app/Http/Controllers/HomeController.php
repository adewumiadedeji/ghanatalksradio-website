<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\BotDetector;
use App\Support\BotNav;
use App\Support\PageMeta;
use App\Support\YoutubeEmbed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class HomeController extends Controller
{
    private const HERO_COUNT = 5;

    private const TOP_GRID_COUNT = 6;

    private const TRENDING_COUNT = 6;

    private const RIVER_COUNT = 10;

    private const RAIL_COUNT = 8;

    private const LIFESTYLE_GRID_COUNT = 4;

    private const VIDEO_TEASER_COUNT = 6;

    private const YOUTUBE_TEASER_COUNT = 4;

    private const PODCAST_COUNT =10;

    public function __invoke(WordPressRepository $wp, PortalApiClient $portal, Request $request): Response|HttpResponse
    {
        // WordPress's OTHER numeric permalink fallback - /?p={id} - as
        // opposed to the /{id}/ path form LegacyPostRedirectController
        // already handles. Route::fallback() never sees this one: '/' with
        // a query string still matches this real route, so the request
        // never falls through - the homepage silently rendered 200 with
        // its own canonical for every one of these instead of recovering
        // the real article, which is exactly the "Google indexed a
        // homepage-duplicate instead of the real post" pattern a Search
        // Console Coverage export surfaced across potentially thousands of
        // old ?p={id} URLs (every post WordPress ever published exposes
        // one, regardless of whether pretty permalinks were ever on).
        // Checked first, before any of this controller's real work, so a
        // redirecting request never pays for the feed fetches below.
        if ($request->filled('p') && ctype_digit((string) $request->query('p'))) {
            $post = $wp->getPostById((int) $request->query('p'));

            if ($post === null) {
                abort(404);
            }

            return redirect("/post/{$post['slug']}", 301);
        }

        // Explicit rather than relying on app.blade.php's fallback default -
        // once every other page sets its own PageMeta, this description
        // should genuinely only ever describe the homepage.
        PageMeta::set(
            title: 'GhanaTalksRadio — News, Music & Talk for the Youth Voice',
            description: "Ghana's digital radio — news, music, talk and culture, live and on demand. Giving the youth a voice since day one.",
        );

        // Same "most recent posts feed both hero and river" fetch shape as
        // the old Home.tsx: one over-fetched batch, sliced and deduped
        // client-side there - here, server-side, once per request. Fetched
        // ONCE at the largest size needed (was 3 separate WordPress calls
        // for overlapping slices of the same feed - real, wasted round
        // trips even with the WordPressApiClient cache below, since each
        // per_page value was its own cache key).
        $combinedSource = $wp->getPosts([
            'per_page' => self::RIVER_COUNT + self::HERO_COUNT + self::TOP_GRID_COUNT,
        ])['items'];

        $heroPosts = array_slice($combinedSource, 0, self::HERO_COUNT);
        $heroIds = array_column($heroPosts, 'id');

        $topGridPosts = array_slice(
            array_values(array_filter($combinedSource, fn ($p) => ! in_array($p['id'], $heroIds, true))),
            0,
            self::TOP_GRID_COUNT
        );

        $usedAfterTop = array_merge($heroIds, array_column($topGridPosts, 'id'));

        $trendingPosts = array_slice(
            array_values(array_filter($combinedSource, fn ($p) => ! in_array($p['id'], $usedAfterTop, true))),
            0,
            self::TRENDING_COUNT
        );

        $usedAfterTrending = array_merge($usedAfterTop, array_column($trendingPosts, 'id'));

        $riverPosts = array_slice(
            array_values(array_filter($combinedSource, fn ($p) => ! in_array($p['id'], $usedAfterTrending, true))),
            0,
            self::RIVER_COUNT
        );

        // Recent posts from the video-embed categories, filtered down to
        // ones that actually have a YouTube embed (not every post in these
        // categories does) - same over-fetch-then-filter shape as the
        // SPA's useVideoPosts hook.
        $videoSource = $wp->getVideoSourcePosts(max(self::VIDEO_TEASER_COUNT * 2, 20))['items'];
        $videoPosts = array_slice(
            array_values(array_filter($videoSource, fn ($p) => YoutubeEmbed::hasEmbed($p['content']['rendered'] ?? ''))),
            0,
            self::VIDEO_TEASER_COUNT
        );

        // Resolved from one getAllCategories() call (already cached for
        // the nav on every page, see HandleInertiaRequests - almost
        // always a free cache hit here, not a new round-trip) instead of
        // 3 separate getPostsByCategorySlug() calls, each of which did
        // its OWN redundant category-slug lookup internally. A real,
        // measured production incident: with WordPress slow/unreachable,
        // every one of these redundant sequential lookups waited out its
        // own connect/request timeout in turn, taking a single homepage
        // render up to 146 SECONDS to finally degrade to empty sections -
        // "every navigation takes forever" was this, not an exaggeration.
        $categoryIdsBySlug = [];
        foreach ($wp->getAllCategories() as $category) {
            $categoryIdsBySlug[$category['slug']] = $category['id'];
        }

        $entertainmentPosts = isset($categoryIdsBySlug['entertainment'])
            ? $wp->getPostsByCategory($categoryIdsBySlug['entertainment'], ['per_page' => self::RAIL_COUNT])['items']
            : [];
        $sportsPosts = isset($categoryIdsBySlug['sports'])
            ? $wp->getPostsByCategory($categoryIdsBySlug['sports'], ['per_page' => self::RAIL_COUNT])['items']
            : [];
        $lifestylePosts = isset($categoryIdsBySlug['lifestyle'])
            ? $wp->getPostsByCategory($categoryIdsBySlug['lifestyle'], ['per_page' => self::LIFESTYLE_GRID_COUNT])['items']
            : [];

        if (BotDetector::isBot($request)) {
            // Skips every portal call below (banners, podcast, youtube) -
            // the bot view doesn't render any of them, so no reason to
            // spend external requests on them for every crawl. This used
            // to fetch podcast episodes even for a bot (a pre-existing
            // inconsistency with this comment's own stated intent) -
            // moving the whole batch below this check actually delivers
            // what the comment already promised.
            return response()->view('bot.home', [
                'navGroups' => BotNav::groups($wp),
                'heroPosts' => $heroPosts,
                'topGridPosts' => $topGridPosts,
                'trendingPosts' => $trendingPosts,
                'riverPosts' => $riverPosts,
                'entertainmentPosts' => $entertainmentPosts,
                'sportsPosts' => $sportsPosts,
                'lifestylePosts' => $lifestylePosts,
            ]);
        }

        // One parallel batch instead of 8 sequential portal calls
        // (fetchBanners() x5, fetchEngagementBanners(),
        // getPodcastEpisodes(), fetchYoutubeVideos()) - see
        // PortalApiClient::fetchHomepagePortalData()'s own docblock for
        // the measured incident this fixes (these 8 calls alone were the
        // dominant cost in a homepage render that took 72+ seconds to
        // degrade to empty sections when the portal was slow, even after
        // the WordPress side was separately fixed for the same class of
        // bug). Every field below is the exact same shape/fallback the
        // individual methods already returned.
        $portalData = $portal->fetchHomepagePortalData(self::PODCAST_COUNT);

        $youtubeVideos = array_slice($portalData['youtubeVideos'], 0, self::YOUTUBE_TEASER_COUNT);

        return Inertia::render('Home', [
            // Full arrays, not [0] ?? null - more than one active
            // campaign/creative can legitimately target the same
            // placement at once, and SponsoredBanner.tsx rotates through
            // all of them instead of only ever showing one.
            'banners' => $portalData['banners'],
            // Secondary, narrower strip for a 728x90-sized creative - the
            // main hero slot above now stretches full-width, so a
            // smaller/older creative belongs here instead of being
            // stretched blurry in that one - see PlacementKey::WebHomeSecondary.
            'secondaryBanners' => $portalData['secondaryBanners'],
            // GTR's own internal-program banners (raffle/prediction/quiz-
            // style self-promotion, but for any internal program) -
            // dedicated placements, deliberately never competing with the
            // advertiser banner above for the same slot. Named by shape,
            // not page - see PlacementKey's own docblock and where each
            // renders in Home.tsx.
            'houseHorizontalBanners' => $portalData['houseHorizontalBanners'],
            'houseVerticalBanners' => $portalData['houseVerticalBanners'],
            'houseSquareBanners' => $portalData['houseSquareBanners'],
            'engagementBanners' => $portalData['engagementBanners'],
            'heroPosts' => $heroPosts,
            'topGridPosts' => $topGridPosts,
            'trendingPosts' => $trendingPosts,
            'riverPosts' => $riverPosts,
            'entertainmentPosts' => $entertainmentPosts,
            'sportsPosts' => $sportsPosts,
            'lifestylePosts' => $lifestylePosts,
            'podcasts' => $portalData['podcast'],
            'videoPosts' => $videoPosts,
            'youtubeVideos' => $youtubeVideos,
            'youtubeError' => $portalData['youtubeError'],
        ]);
    }
}
