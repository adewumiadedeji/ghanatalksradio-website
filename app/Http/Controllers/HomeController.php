<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
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

        $entertainmentPosts = $wp->getPostsByCategorySlug('entertainment', ['per_page' => self::RAIL_COUNT])['items'];
        $sportsPosts = $wp->getPostsByCategorySlug('sports', ['per_page' => self::RAIL_COUNT])['items'];
        $lifestylePosts = $wp->getPostsByCategorySlug('lifestyle', ['per_page' => self::LIFESTYLE_GRID_COUNT])['items'];
        $podcast = $portal->getPodcastEpisodes(self::PODCAST_COUNT);

        if (BotDetector::isBot($request)) {
            // Skips the portal calls entirely below (youtube videos, ad
            // banner) - the bot view doesn't render either, so no reason to
            // spend an external request on them for every crawl.
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

        try {
            $youtubeVideos = array_slice(
                $portal->fetchYoutubeVideos()['videos'],
                0,
                self::YOUTUBE_TEASER_COUNT
            );
            $youtubeError = false;
        } catch (PortalApiException) {
            $youtubeVideos = [];
            $youtubeError = true;
        }

        return Inertia::render('Home', [
            'banner' => $portal->fetchBanners('web_home')[0] ?? null,
            'engagementBanners' => $portal->fetchEngagementBanners(),
            'heroPosts' => $heroPosts,
            'topGridPosts' => $topGridPosts,
            'trendingPosts' => $trendingPosts,
            'riverPosts' => $riverPosts,
            'entertainmentPosts' => $entertainmentPosts,
            'sportsPosts' => $sportsPosts,
            'lifestylePosts' => $lifestylePosts,
            'podcasts' => $podcast,
            'videoPosts' => $videoPosts,
            'youtubeVideos' => $youtubeVideos,
            'youtubeError' => $youtubeError,
        ]);
    }
}
