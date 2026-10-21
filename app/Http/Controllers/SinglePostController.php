<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\BotDetector;
use App\Support\BotNav;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class SinglePostController extends Controller
{
    public function __invoke(WordPressRepository $wp, PortalApiClient $portal, Request $request, string $slug): Response|HttpResponse
    {
        $post = $wp->getPostBySlug($slug);

        if ($post === null) {
            if (BotDetector::isBot($request)) {
                return response()->view('bot.post', ['post' => null, 'navGroups' => BotNav::groups($wp)], 404);
            }

            return Inertia::render('SinglePost', [
                'post' => null,
                'url' => PageMeta::canonicalUrl(),
                'banner' => null,
            ])->toResponse($request)->setStatusCode(404);
        }

        PageMeta::set(
            title: PageMeta::truncatedTitle($post['title']['rendered']),
            description: $post['excerpt']['rendered'] ?? null,
            image: $this->ogImage($post, $portal),
        );

        if (BotDetector::isBot($request)) {
            return response()->view('bot.post', ['post' => $post, 'navGroups' => BotNav::groups($wp)]);
        }

        return Inertia::render('SinglePost', [
            'post' => $post,
            'url' => PageMeta::canonicalUrl(),
            'banners' => $portal->fetchBanners('web_article'),
        ]);
    }

    /**
     * Falls back to the first <img> in the post's own CONTENT when no
     * WordPress "Featured Image" is set at all - a real, confirmed
     * editorial workflow mismatch, not a one-off: articles here are
     * written with an inline content image block, not via WordPress's
     * separate dedicated Featured Image field, so featured_media is 0 for
     * most posts. Without this fallback, Facebook/X's own link-preview
     * crawlers (which read THIS page's og:image, not anything the portal
     * resolves on its own) would show the generic site default image for
     * every such article - this page is the actual thing they crawl.
     * Mirrors WordPressPostFetcher's identical fallback on the portal
     * side (ghanatalksradio-portal), which fixed the same gap for
     * Bluesky's own direct image upload.
     *
     * The resolved URL is then passed through PortalApiClient::mirrorImage()
     * before being handed to PageMeta - wordpress.ghanatalksradio.com and
     * this app share one IONOS account's rate limit, which a social
     * platform's crawler can occasionally trip when fetching the raw
     * WordPress URL directly (a real, confirmed Facebook "Corrupted
     * Image" report that traced back to an account-wide 429, not a
     * broken file - see SocialImageMirrorController on the portal side).
     * A mirror failure falls back to the raw WordPress URL unchanged -
     * the exact same behavior this page had before the mirror existed,
     * never a regression.
     *
     * ONLY a successful mirror is ever cached, and forever (an image
     * never changes once mirrored, so the portal's own cheap exists()
     * check is never needed again for this post) - a failure is
     * deliberately NOT cached at any TTL. Found the hard way, twice:
     *
     * 1. Caching the fallback too meant a single transient failure (this
     *    app's deploy landing before the portal's own
     *    SocialImageMirrorController route did) got baked in permanently -
     *    nothing would ever retry a Cache::rememberForever() call that
     *    already resolved to the raw-URL fallback.
     * 2. Fixing #1 still wasn't enough on its own: a cache entry already
     *    holding the raw URL from BEFORE that fix was deployed (written by
     *    the old code, or even by this very page being hit once while the
     *    portal endpoint still 404'd) is a non-null, truthy value - a
     *    naive `Cache::get($cacheKey) ?? $portal->mirrorImage(...)` can't
     *    tell that apart from a genuine mirrored URL and trusts it
     *    forever too. The fix: only ever trust a cached value that's
     *    actually DIFFERENT from the raw URL - a cached value equal to
     *    $rawImageUrl can only mean "mirroring hadn't succeeded as of the
     *    last attempt", so it always retries instead of short-circuiting.
     *    This self-heals on the very next pageview with no manual cache
     *    clear needed, for both the stale-entry case above and any future
     *    one like it.
     */
    private function ogImage(array $post, PortalApiClient $portal): ?string
    {
        $featured = $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null;

        $rawImageUrl = $featured;
        if (! $rawImageUrl) {
            $html = $post['content']['rendered'] ?? '';
            if ($html && preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $html, $matches)) {
                $rawImageUrl = html_entity_decode($matches[1], ENT_QUOTES);
            }
        }

        if (! $rawImageUrl) {
            return null;
        }

        $cacheKey = "og_image_mirror:{$post['id']}";
        $cached = Cache::get($cacheKey);

        if ($cached && $cached !== $rawImageUrl) {
            return $cached;
        }

        $mirrored = $portal->mirrorImage($rawImageUrl);

        if ($mirrored) {
            Cache::forever($cacheKey, $mirrored);

            return $mirrored;
        }

        return $rawImageUrl;
    }
}
