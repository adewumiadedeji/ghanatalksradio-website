<?php

namespace App\Services\WordPress;

use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Server-side port of the old Vite SPA's src/api/{wpClient,posts,categories}.ts.
 * Same WP REST endpoints, same _embed usage, same X-WP-Total/X-WP-TotalPages
 * pagination headers - the difference is this now runs during the Inertia
 * request/SSR render instead of in the browser, so crawlers get the
 * resulting HTML instead of an empty <div id="root">.
 *
 * Used unless WP_DATA_SOURCE=db (see WordPressDbClient and
 * AppServiceProvider::register()).
 */
class WordPressApiClient implements WordPressRepository
{
    /**
     * Categories confirmed to hold the site's YouTube-embedded video
     * content. There's no dedicated "podcast"/"video" post type on this
     * backend - watchable content lives as ordinary posts in these
     * categories with a YouTube embed in content.rendered.
     */
    private const VIDEO_CATEGORY_SLUGS = ['music-video-mix', 'music', 'entertainment'];

    /**
     * Every page render (Home alone makes ~9 of these calls, and every
     * single page pulls categories for its own nav) was hitting the real
     * remote WordPress site fresh, with no caching at all - a large chunk
     * of this app's page-load time. Posts don't need to be fresher than
     * this for a news site; a short TTL keeps content current while
     * collapsing repeat requests for the same page/category onto one real
     * HTTP round-trip. Cache::remember() never caches a thrown exception -
     * a failed/unreachable request is retried on the very next request,
     * not stuck serving a cached failure.
     */
    private const CACHE_TTL_SECONDS = 120;

    private const CATEGORY_CACHE_TTL_SECONDS = 600;

    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.wordpress.api_url'), '/');
    }

    public function getPosts(array $params = []): array
    {
        $query = array_merge([
            '_embed' => 'true',
            'per_page' => 10,
        ], $params);

        return Cache::remember('wp_api:posts:'.http_build_query($query), self::CACHE_TTL_SECONDS, function () use ($query) {
            return $this->toCollection($this->safeGet("{$this->baseUrl}/posts", $query));
        });
    }

    public function getPostsByCategory(int|array $categoryId, array $params = []): array
    {
        // WP REST's `categories` param wants a comma-separated string for
        // an OR match across multiple IDs, not PHP's array-bracket query
        // syntax - same convention already used by getVideoSourcePosts().
        $categories = is_array($categoryId) ? implode(',', $categoryId) : $categoryId;

        return $this->getPosts(array_merge($params, ['categories' => $categories]));
    }

    public function getCategoryBySlug(string $slug): ?array
    {
        return Cache::remember("wp_api:category:{$slug}", self::CATEGORY_CACHE_TTL_SECONDS, function () use ($slug) {
            $response = $this->safeGet("{$this->baseUrl}/categories", ['slug' => $slug]);

            if (! $response || $response->failed()) {
                return null;
            }

            $data = $response->json() ?? [];

            return $data[0] ?? null;
        });
    }

    public function getPostsByCategorySlug(string $slug, array $params = []): array
    {
        $category = $this->getCategoryBySlug($slug);

        if ($category === null) {
            return ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];
        }

        return $this->getPostsByCategory($category['id'], $params);
    }

    public function getPostBySlug(string $slug): ?array
    {
        return Cache::remember("wp_api:post:{$slug}", self::CACHE_TTL_SECONDS, function () use ($slug) {
            $response = $this->safeGet("{$this->baseUrl}/posts", ['slug' => $slug, '_embed' => 'true']);

            if (! $response || $response->failed()) {
                return null;
            }

            $data = $response->json() ?? [];

            return $data[0] ?? null;
        });
    }

    public function getPostById(int $id): ?array
    {
        return Cache::remember("wp_api:post_id:{$id}", self::CACHE_TTL_SECONDS, function () use ($id) {
            $response = $this->safeGet("{$this->baseUrl}/posts/{$id}", ['_embed' => 'true']);

            if (! $response || $response->failed()) {
                return null;
            }

            return $response->json();
        });
    }

    public function getPageBySlug(string $slug): ?array
    {
        // Same CATEGORY_CACHE_TTL_SECONDS as getCategoryBySlug() - a
        // static legal page changes far less often than a post, no need
        // for the shorter post-cache TTL.
        return Cache::remember("wp_api:page:{$slug}", self::CATEGORY_CACHE_TTL_SECONDS, function () use ($slug) {
            $response = $this->safeGet("{$this->baseUrl}/pages", ['slug' => $slug]);

            if (! $response || $response->failed()) {
                return null;
            }

            $data = $response->json() ?? [];

            return $data[0] ?? null;
        });
    }

    public function searchPosts(string $query, array $params = []): array
    {
        return $this->getPosts(array_merge($params, ['search' => $query]));
    }

    public function getAllCategories(): array
    {
        return Cache::remember('wp_api:all_categories', self::CATEGORY_CACHE_TTL_SECONDS, function () {
            $all = [];
            $page = 1;
            $totalPages = 1;

            do {
                $response = $this->safeGet("{$this->baseUrl}/categories", [
                    'per_page' => 100,
                    'hide_empty' => 'true',
                    'orderby' => 'name',
                    'order' => 'asc',
                    'page' => $page,
                ]);

                if (! $response || $response->failed()) {
                    break;
                }

                $all = array_merge($all, $response->json() ?? []);
                $totalPages = (int) $response->header('X-WP-TotalPages');
                $page++;
            } while ($page <= $totalPages);

            return $all;
        });
    }

    /**
     * Resolved from the one already-cached getAllCategories() call rather
     * than a separate getCategoryBySlug() round-trip per slug - this used
     * to be 3 extra sequential WordPress calls on every cold-cache
     * homepage render (one per VIDEO_CATEGORY_SLUGS entry), each paying
     * the full connect/request timeout if WordPress was slow that
     * moment. A real, measured production incident: with WordPress
     * unreachable, a single homepage render (this call plus
     * HomeController's other category lookups) took 146 SECONDS to
     * finally degrade to empty sections - "every navigation takes
     * forever" wasn't an exaggeration, it was every one of these
     * redundant sequential lookups each waiting out its own timeout in
     * turn. getAllCategories() is called for the nav on every single page
     * already (HandleInertiaRequests), so by the time this runs it's
     * almost always a free cache hit, not a new round-trip.
     */
    public function getVideoSourcePosts(int $perPage = 20): array
    {
        $categoryIds = $this->categoryIdsBySlug(self::VIDEO_CATEGORY_SLUGS);

        if (empty($categoryIds)) {
            return ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];
        }

        return $this->getPosts(['categories' => implode(',', $categoryIds), 'per_page' => $perPage]);
    }

    /** @return array<int, int> the real category id for each slug that actually exists - unknown slugs are silently skipped. */
    private function categoryIdsBySlug(array $slugs): array
    {
        $bySlug = [];
        foreach ($this->getAllCategories() as $category) {
            $bySlug[$category['slug']] = $category['id'];
        }

        return array_values(array_filter(array_map(fn ($slug) => $bySlug[$slug] ?? null, $slugs)));
    }

    public function getAllPostSlugsForSitemap(?callable $onPage = null): array
    {
        $all = [];
        $page = 1;

        while (true) {
            try {
                // retry: this loop makes hundreds of sequential requests
                // against a 50,000+ row table - a lone transient timeout
                // shouldn't kill an otherwise-complete run. orderby=id
                // (not modified): id is the primary key, guaranteed
                // indexed and stable across the whole paginated run;
                // modified isn't indexed on a stock WP schema and made
                // every single page here painfully slow - and ordering by
                // a mutable column during pagination risks posts shifting
                // between pages if anything changes mid-run.
                $response = $this->http()
                    ->timeout(30)
                    ->retry(3, 2000)
                    ->get("{$this->baseUrl}/posts", [
                        'per_page' => 100,
                        'page' => $page,
                        'status' => 'publish',
                        'orderby' => 'id',
                        'order' => 'asc',
                        '_fields' => 'slug,modified_gmt',
                    ]);
            } catch (\Illuminate\Http\Client\ConnectionException) {
                // Exhausted retries - stop with whatever was collected so
                // far rather than losing the entire run's progress.
                break;
            }

            if ($response->failed()) {
                break;
            }

            $posts = $response->json() ?? [];
            if (empty($posts)) {
                break;
            }

            foreach ($posts as $post) {
                if (empty($post['slug'])) {
                    continue;
                }
                $all[] = ['slug' => $post['slug'], 'modified' => $post['modified_gmt'] ?? null];
            }

            if ($onPage !== null) {
                $onPage($page, count($all));
            }

            if (count($posts) < 100) {
                break;
            }
            $page++;
        }

        return $all;
    }

    /**
     * Base HTTP client with a bounded connect timeout. Found the hard way
     * (sitemap generation): with no explicit timeout, a stalled TCP
     * handshake to a slow/unreachable host can hang a request indefinitely
     * instead of failing fast. Callers needing more (retry, a longer
     * request timeout for a heavy paginated loop) layer it on top.
     *
     * Tightened from connectTimeout(10)/timeout(15) - now that safeGet()
     * degrades to an empty result instead of crashing (see its own
     * docblock), there's no reason to make a real visitor wait out a long
     * timeout hoping a slow WordPress eventually answers. Measured
     * directly: a single homepage render made ~9 of these calls
     * sequentially, so even the OLD timeout alone (ignoring the crash
     * fix) meant a degraded WordPress could cost a visitor 90+ seconds on
     * this budget alone before HomeController's own fixes reduced the
     * call count. A healthy WordPress response normally takes well under
     * a second; 3s/5s is still generous headroom above that.
     */
    private function http(): \Illuminate\Http\Client\PendingRequest
    {
        return Http::acceptJson()->connectTimeout(3)->timeout(5);
    }

    /**
     * Every GET in this class went through plain $this->http()->get(...)
     * before - safe against a bad HTTP status (every caller already
     * checks $response->failed()), but NOT against a genuine connection
     * failure (WordPress unreachable, DNS failure, the connect/request
     * timeout above actually firing), which Laravel's HTTP client throws
     * as ConnectionException regardless of status-code handling. That
     * exception was never caught anywhere in this class, so it propagated
     * straight out of Cache::remember()'s closure and crashed whatever
     * page/controller called in - a real, confirmed production pattern:
     * ANY WordPress hiccup (not an outage, just a slow moment) 500'd the
     * entire site, every page, since nearly every page fetches posts or
     * categories from here. Centralizing the catch here means every
     * existing and future caller gets this protection automatically,
     * rather than needing to remember it per call site.
     */
    private function safeGet(string $url, array $query = []): ?Response
    {
        try {
            return $this->http()->get($url, $query);
        } catch (ConnectionException $e) {
            Log::warning('WordPressApiClient: connection failed', ['url' => $url, 'error' => $e->getMessage()]);

            return null;
        }
    }

    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    private function toCollection(?Response $response): array
    {
        if (! $response || $response->failed()) {
            return ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];
        }

        return [
            'items' => $response->json() ?? [],
            'meta' => [
                'totalItems' => (int) $response->header('X-WP-Total'),
                'totalPages' => (int) $response->header('X-WP-TotalPages'),
            ],
        ];
    }
}
