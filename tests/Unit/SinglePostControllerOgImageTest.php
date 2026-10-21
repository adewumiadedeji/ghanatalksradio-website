<?php

namespace Tests\Unit;

use App\Http\Controllers\SinglePostController;
use App\Services\Portal\PortalApiClient;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Sleep;
use Tests\TestCase;

/**
 * Covers SinglePostController::ogImage() - a real, confirmed production
 * gap: articles here are written with an inline content image block, not
 * via WordPress's separate dedicated Featured Image field, so
 * featured_media is 0 for most posts. Without the content-image
 * fallback, Facebook/X's own link-preview crawlers (which read THIS
 * page's og:image directly) showed the generic site default image for
 * every such article, even after the portal side (WordPressPostFetcher,
 * ghanatalksradio-portal) was fixed to resolve the same fallback for
 * Bluesky's own direct image upload - this page is the thing Facebook/X
 * actually crawl, so it needed the identical fix.
 *
 * Also covers the Firebase-mirroring step added on top of that fallback -
 * see PortalApiClient::mirrorImage()'s own docblock for why a resolved
 * WordPress image URL gets passed through the portal before reaching
 * PageMeta.
 */
class SinglePostControllerOgImageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['services.portal.api_url' => 'https://portal.test']);
    }

    private function ogImage(array $post): ?string
    {
        $controller = new SinglePostController();
        $method = new \ReflectionMethod($controller, 'ogImage');
        $method->setAccessible(true);

        return $method->invoke($controller, $post, new PortalApiClient());
    }

    public function test_the_featured_image_is_used_when_set(): void
    {
        Http::fake(['portal.test/*' => Http::response('Not Found', 404)]);

        $post = [
            'id' => 1,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
            'content' => ['rendered' => '<img src="https://wordpress.ghanatalksradio.com/content.jpg"/>'],
        ];

        $this->assertSame('https://wordpress.ghanatalksradio.com/featured.jpg', $this->ogImage($post));
    }

    public function test_it_falls_back_to_the_first_content_image_when_no_featured_image_is_set(): void
    {
        Http::fake(['portal.test/*' => Http::response('Not Found', 404)]);

        $post = [
            'id' => 2,
            'content' => ['rendered' => '<p>Intro.</p><figure><img src="https://wordpress.ghanatalksradio.com/wp-content/uploads/2026/10/pope.jpg" alt=""/></figure>'],
        ];

        $this->assertSame('https://wordpress.ghanatalksradio.com/wp-content/uploads/2026/10/pope.jpg', $this->ogImage($post));
    }

    public function test_it_returns_null_when_neither_a_featured_image_nor_a_content_image_exists(): void
    {
        $post = ['id' => 3, 'content' => ['rendered' => '<p>No image anywhere in this article.</p>']];

        $this->assertNull($this->ogImage($post));
        Http::assertNothingSent();
    }

    public function test_it_returns_null_when_content_is_missing_entirely(): void
    {
        $this->assertNull($this->ogImage(['id' => 4]));
        Http::assertNothingSent();
    }

    public function test_it_uses_the_portals_mirrored_url_when_the_mirror_succeeds(): void
    {
        Http::fake(['portal.test/*' => Http::response([
            'status' => true, 'message' => 'Mirrored',
            'data' => ['url' => 'https://storage.googleapis.com/ghanatalksradio-bad6a.appspot.com/social-og-images/abc123.jpg'],
        ])]);

        $post = [
            'id' => 5,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
        ];

        $this->assertSame(
            'https://storage.googleapis.com/ghanatalksradio-bad6a.appspot.com/social-og-images/abc123.jpg',
            $this->ogImage($post)
        );
    }

    public function test_a_mirror_failure_falls_back_to_the_raw_wordpress_url(): void
    {
        Http::fake(['portal.test/*' => fn () => throw new \Illuminate\Http\Client\ConnectionException('unreachable')]);

        $post = [
            'id' => 6,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
        ];

        $this->assertSame('https://wordpress.ghanatalksradio.com/featured.jpg', $this->ogImage($post));
    }

    /**
     * A real bug found live: the first version of this cached whatever
     * ogImage() returned forever, INCLUDING the raw-URL fallback - so one
     * transient portal failure (e.g. this app's own deploy landing before
     * the portal's SocialImageMirrorController route did) permanently
     * locked a post onto the un-mirrored URL, even after the portal
     * started working. A failed attempt must never be cached at all.
     */
    public function test_a_failed_mirror_is_retried_on_the_next_request_not_cached(): void
    {
        // PortalApiClient's non-fast calls use retry(2, 1000) - really
        // sleeping between attempts unless faked (same reason
        // PortalApiClientTest fakes it).
        Sleep::fake();

        // One logical mirrorImage() call that ultimately fails costs 3
        // real requests through the fake (1 initial + 2 retries) before
        // PortalApiClient gives up and throws - a single Http::fake()
        // call only replaces registered stubs for URLs it didn't already
        // match in THIS test, so a sequence is the correct way to express
        // "fails every time, then finally succeeds" against the same
        // 'portal.test/*' pattern.
        Http::fakeSequence('portal.test/*')
            ->pushStatus(404)
            ->pushStatus(404)
            ->pushStatus(404)
            ->push([
                'status' => true, 'message' => 'Mirrored',
                'data' => ['url' => 'https://storage.googleapis.com/bucket/social-og-images/retry.jpg'],
            ]);

        $post = [
            'id' => 7,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
        ];

        $this->assertSame('https://wordpress.ghanatalksradio.com/featured.jpg', $this->ogImage($post));
        $this->assertSame('https://storage.googleapis.com/bucket/social-og-images/retry.jpg', $this->ogImage($post));
    }

    /**
     * A second, related real bug: fixing the above wasn't enough on its
     * own. A cache entry already holding the raw URL - written by the
     * OLD code before this fix existed, or by this very page being hit
     * once while the portal endpoint still 404'd - is a non-null, truthy
     * value. The naive fix (`Cache::get($cacheKey) ?? $portal->mirrorImage(...)`)
     * can't tell that apart from a genuinely mirrored URL and trusts it
     * forever too - confirmed live, this is exactly what kept a real
     * article's og:image stuck on the raw WordPress URL even after the
     * portal endpoint started working. A cached value equal to the raw
     * URL must never short-circuit a retry.
     */
    public function test_a_stale_cache_entry_equal_to_the_raw_url_is_not_trusted_and_retries(): void
    {
        $post = [
            'id' => 8,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
        ];

        Cache::forever('og_image_mirror:8', 'https://wordpress.ghanatalksradio.com/featured.jpg');

        Http::fake(['portal.test/*' => Http::response([
            'status' => true, 'message' => 'Mirrored',
            'data' => ['url' => 'https://storage.googleapis.com/bucket/social-og-images/healed.jpg'],
        ])]);

        $this->assertSame('https://storage.googleapis.com/bucket/social-og-images/healed.jpg', $this->ogImage($post));
    }

    /** A GENUINELY mirrored URL (different from the raw one) short-circuits future calls with no portal round-trip at all. */
    public function test_a_genuinely_mirrored_cached_url_is_trusted_without_calling_the_portal(): void
    {
        $post = [
            'id' => 9,
            '_embedded' => ['wp:featuredmedia' => [['source_url' => 'https://wordpress.ghanatalksradio.com/featured.jpg']]],
        ];

        Cache::forever('og_image_mirror:9', 'https://storage.googleapis.com/bucket/social-og-images/already-mirrored.jpg');

        $this->assertSame('https://storage.googleapis.com/bucket/social-og-images/already-mirrored.jpg', $this->ogImage($post));
        Http::assertNothingSent();
    }
}
