<?php

namespace App\Services\WordPress;

use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

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
            $response = $this->http()->get("{$this->baseUrl}/posts", $query);

            return $this->toCollection($response);
        });
    }

    public function getPostsByCategory(int $categoryId, array $params = []): array
    {
        return $this->getPosts(array_merge($params, ['categories' => $categoryId]));
    }

    public function getCategoryBySlug(string $slug): ?array
    {
        return Cache::remember("wp_api:category:{$slug}", self::CATEGORY_CACHE_TTL_SECONDS, function () use ($slug) {
            $response = $this->http()->get("{$this->baseUrl}/categories", [
                'slug' => $slug,
            ]);

            if ($response->failed()) {
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
            $response = $this->http()->get("{$this->baseUrl}/posts", [
                'slug' => $slug,
                '_embed' => 'true',
            ]);

            if ($response->failed()) {
                return null;
            }

            $data = $response->json() ?? [];

            return $data[0] ?? null;
        });
    }

    public function getPostById(int $id): ?array
    {
        return Cache::remember("wp_api:post_id:{$id}", self::CACHE_TTL_SECONDS, function () use ($id) {
            $response = $this->http()->get("{$this->baseUrl}/posts/{$id}", [
                '_embed' => 'true',
            ]);

            if ($response->failed()) {
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
            $response = $this->http()->get("{$this->baseUrl}/pages", [
                'slug' => $slug,
            ]);

            if ($response->failed()) {
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
                $response = $this->http()->get("{$this->baseUrl}/categories", [
                    'per_page' => 100,
                    'hide_empty' => 'true',
                    'orderby' => 'name',
                    'order' => 'asc',
                    'page' => $page,
                ]);

                if ($response->failed()) {
                    break;
                }

                $all = array_merge($all, $response->json() ?? []);
                $totalPages = (int) $response->header('X-WP-TotalPages');
                $page++;
            } while ($page <= $totalPages);

            return $all;
        });
    }

    public function getVideoSourcePosts(int $perPage = 20): array
    {
        $categoryIds = [];
        foreach (self::VIDEO_CATEGORY_SLUGS as $slug) {
            $category = $this->getCategoryBySlug($slug);
            if ($category) {
                $categoryIds[] = $category['id'];
            }
        }

        if (empty($categoryIds)) {
            return ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];
        }

        return $this->getPosts(['categories' => implode(',', $categoryIds), 'per_page' => $perPage]);
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
     */
    private function http(): \Illuminate\Http\Client\PendingRequest
    {
        return Http::acceptJson()->connectTimeout(10)->timeout(15);
    }

    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    private function toCollection(Response $response): array
    {
        if ($response->failed()) {
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
