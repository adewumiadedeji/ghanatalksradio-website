<?php

namespace Tests\Unit\Services\WordPress;

use App\Services\WordPress\WordPressApiClient;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

/**
 * Covers a real production bug: every method here used to call
 * $this->http()->get(...) directly, which only ever guards against a bad
 * HTTP status ($response->failed()) - a genuine connection failure
 * (WordPress unreachable, DNS failure, the connect/request timeout
 * actually firing) throws ConnectionException regardless, and that was
 * never caught anywhere in this class. It propagated straight out of
 * Cache::remember()'s closure and crashed whatever page called in -
 * since nearly every page on the site fetches posts or categories from
 * here, a single slow/unreachable moment on WordPress's end 500'd the
 * ENTIRE site, every page, repeatedly. safeGet() centralizes the catch
 * so every method (existing and future) degrades to an empty/null result
 * instead.
 */
class WordPressApiClientTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['services.wordpress.api_url' => 'https://wp.test/wp-json/wp/v2']);
    }

    public function test_get_posts_degrades_to_an_empty_collection_on_connection_failure(): void
    {
        Http::fake(['wp.test/*' => fn () => throw new ConnectionException('timed out')]);

        $result = (new WordPressApiClient())->getPosts();

        $this->assertSame(['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]], $result);
    }

    public function test_get_post_by_slug_returns_null_on_connection_failure(): void
    {
        Http::fake(['wp.test/*' => fn () => throw new ConnectionException('timed out')]);

        $this->assertNull((new WordPressApiClient())->getPostBySlug('some-post'));
    }

    public function test_get_category_by_slug_returns_null_on_connection_failure(): void
    {
        Http::fake(['wp.test/*' => fn () => throw new ConnectionException('timed out')]);

        $this->assertNull((new WordPressApiClient())->getCategoryBySlug('news'));
    }

    public function test_get_all_categories_returns_empty_array_on_connection_failure(): void
    {
        Http::fake(['wp.test/*' => fn () => throw new ConnectionException('timed out')]);

        $this->assertSame([], (new WordPressApiClient())->getAllCategories());
    }

    public function test_get_page_by_slug_returns_null_on_connection_failure(): void
    {
        Http::fake(['wp.test/*' => fn () => throw new ConnectionException('timed out')]);

        $this->assertNull((new WordPressApiClient())->getPageBySlug('privacy-policy'));
    }

    public function test_get_posts_still_works_normally_when_wordpress_is_reachable(): void
    {
        Http::fake(['wp.test/*' => Http::response(
            [['id' => 1, 'title' => ['rendered' => 'Hello']]],
            200,
            ['X-WP-Total' => '1', 'X-WP-TotalPages' => '1']
        )]);

        $result = (new WordPressApiClient())->getPosts();

        $this->assertSame(1, $result['meta']['totalItems']);
        $this->assertSame(1, $result['items'][0]['id']);
    }
}
