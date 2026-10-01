<?php

namespace App\Services\WordPress;

use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Direct read-only access to WordPress's own MySQL tables, on the
 * 'wordpress' connection (config/database.php) - replaces the REST API
 * hop WordPressApiClient makes. Builds the exact same WP REST-shaped
 * arrays (title.rendered, _embedded.author/wp:featuredmedia/wp:term, etc.)
 * so the frontend types (resources/js/types/wordpress.ts, ported straight
 * from the SPA) don't need to change at all.
 *
 * Read-only by construction: every method here is a SELECT. The DB user
 * in WP_DB_USERNAME must itself be granted SELECT only - this class
 * doesn't enforce that, the MySQL grant does.
 */
class WordPressDbClient implements WordPressRepository
{
    private const CONNECTION = 'wordpress';

    /** Categories confirmed to hold the site's YouTube-embedded video content. */
    private const VIDEO_CATEGORY_SLUGS = ['music-video-mix', 'music', 'entertainment'];

    /** Site root used to build absolute media URLs (wp-content/uploads/...). */
    private string $siteUrl;

    public function __construct()
    {
        $apiUrl = config('services.wordpress.api_url');
        // Strip the /wp-json/... suffix to get the site root, e.g.
        // https://wordpress.ghanatalksradio.com/wp-json/wp/v2 -> https://wordpress.ghanatalksradio.com
        $this->siteUrl = rtrim(preg_replace('#/wp-json.*$#', '', $apiUrl), '/');
    }

    public function getPosts(array $params = []): array
    {
        $perPage = max(1, (int) ($params['per_page'] ?? 10));
        $page = max(1, (int) ($params['page'] ?? 1));

        $query = $this->buildPostsQuery($params);

        $totalItems = (clone $query)->count('posts.ID');
        $rows = $query->orderBy('post_date', 'desc')->forPage($page, $perPage)->get();

        return [
            'items' => $this->hydratePosts($rows),
            'meta' => [
                'totalItems' => $totalItems,
                'totalPages' => (int) ceil($totalItems / $perPage),
            ],
        ];
    }

    public function getPostsByCategory(int $categoryId, array $params = []): array
    {
        return $this->getPosts(array_merge($params, ['categories' => $categoryId]));
    }

    public function getPostBySlug(string $slug): ?array
    {
        $row = DB::connection(self::CONNECTION)->table('posts')
            ->where('post_type', 'post')
            ->where('post_status', 'publish')
            ->where('post_name', $slug)
            ->first();

        if (! $row) {
            return null;
        }

        return $this->hydratePosts(collect([$row]))[0] ?? null;
    }

    public function getPostById(int $id): ?array
    {
        $row = DB::connection(self::CONNECTION)->table('posts')
            ->where('post_type', 'post')
            ->where('post_status', 'publish')
            ->where('ID', $id)
            ->first();

        if (! $row) {
            return null;
        }

        return $this->hydratePosts(collect([$row]))[0] ?? null;
    }

    public function getPageBySlug(string $slug): ?array
    {
        $row = DB::connection(self::CONNECTION)->table('posts')
            ->where('post_type', 'page')
            ->where('post_status', 'publish')
            ->where('post_name', $slug)
            ->first();

        if (! $row) {
            return null;
        }

        return $this->hydratePosts(collect([$row]))[0] ?? null;
    }

    public function searchPosts(string $query, array $params = []): array
    {
        return $this->getPosts(array_merge($params, ['search' => $query]));
    }

    public function getAllCategories(): array
    {
        $rows = DB::connection(self::CONNECTION)->table('terms')
            ->join('term_taxonomy', 'term_taxonomy.term_id', '=', 'terms.term_id')
            ->where('term_taxonomy.taxonomy', 'category')
            ->where('term_taxonomy.count', '>', 0)
            ->orderBy('terms.name', 'asc')
            ->select('terms.term_id', 'terms.name', 'terms.slug', 'term_taxonomy.description', 'term_taxonomy.parent', 'term_taxonomy.count')
            ->get();

        return $rows->map(fn ($row) => $this->formatTerm($row, 'category'))->all();
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

        return $this->getPosts(['categories' => $categoryIds, 'per_page' => $perPage]);
    }

    public function getAllPostSlugsForSitemap(?callable $onPage = null): array
    {
        $result = DB::connection(self::CONNECTION)->table('posts')
            ->where('post_type', 'post')
            ->where('post_status', 'publish')
            ->orderBy('post_modified', 'desc')
            ->select('post_name as slug', 'post_modified_gmt as modified')
            ->get()
            ->map(fn ($row) => ['slug' => $row->slug, 'modified' => $this->toIso($row->modified) ?: null])
            ->all();

        // One query, not paginated - single callback so callers watching
        // for progress (see GenerateSitemap) still get a signal.
        if ($onPage !== null) {
            $onPage(1, count($result));
        }

        return $result;
    }

    private function buildPostsQuery(array $params)
    {
        $query = DB::connection(self::CONNECTION)->table('posts')
            ->where('post_type', 'post')
            ->where('post_status', 'publish');

        if (! empty($params['categories'])) {
            $categoryIds = is_array($params['categories']) ? $params['categories'] : [$params['categories']];
            $query->whereIn('ID', function ($sub) use ($categoryIds) {
                $sub->select('object_id')
                    ->from('term_relationships')
                    ->join('term_taxonomy', 'term_taxonomy.term_taxonomy_id', '=', 'term_relationships.term_taxonomy_id')
                    ->where('term_taxonomy.taxonomy', 'category')
                    ->whereIn('term_taxonomy.term_id', $categoryIds);
            });
        }

        if (! empty($params['slug'])) {
            $slugs = is_array($params['slug']) ? $params['slug'] : [$params['slug']];
            $query->whereIn('post_name', $slugs);
        }

        if (! empty($params['search'])) {
            $term = '%'.str_replace(['%', '_'], ['\\%', '\\_'], $params['search']).'%';
            $query->where(function ($sub) use ($term) {
                $sub->where('post_title', 'like', $term)
                    ->orWhere('post_content', 'like', $term)
                    ->orWhere('post_excerpt', 'like', $term);
            });
        }

        return $query;
    }

    public function getCategoryBySlug(string $slug): ?array
    {
        $row = DB::connection(self::CONNECTION)->table('terms')
            ->join('term_taxonomy', 'term_taxonomy.term_id', '=', 'terms.term_id')
            ->where('term_taxonomy.taxonomy', 'category')
            ->where('terms.slug', $slug)
            ->select('terms.term_id', 'terms.name', 'terms.slug', 'term_taxonomy.description', 'term_taxonomy.parent', 'term_taxonomy.count')
            ->first();

        if (! $row) {
            return null;
        }

        return $this->formatTerm($row, 'category');
    }

    public function getPostsByCategorySlug(string $slug, array $params = []): array
    {
        $category = $this->getCategoryBySlug($slug);

        if ($category === null) {
            return ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];
        }

        return $this->getPostsByCategory($category['id'], $params);
    }

    /** @param  Collection<int, object>  $rows */
    private function hydratePosts(Collection $rows): array
    {
        if ($rows->isEmpty()) {
            return [];
        }

        $postIds = $rows->pluck('ID')->all();
        $authorIds = $rows->pluck('post_author')->unique()->all();

        $authors = $this->getAuthors($authorIds);
        $featuredMedia = $this->getFeaturedMedia($postIds);
        $terms = $this->getTermsForPosts($postIds);

        return $rows->map(function ($row) use ($authors, $featuredMedia, $terms) {
            $postTerms = $terms[$row->ID] ?? ['category' => [], 'post_tag' => []];
            $media = $featuredMedia[$row->ID] ?? null;
            $author = $authors[$row->post_author] ?? null;

            return [
                'id' => (int) $row->ID,
                'date' => $this->toIso($row->post_date),
                'date_gmt' => $this->toIso($row->post_date_gmt),
                'modified' => $this->toIso($row->post_modified),
                'modified_gmt' => $this->toIso($row->post_modified_gmt),
                'slug' => $row->post_name,
                'status' => $row->post_status,
                'type' => 'post',
                'link' => "{$this->siteUrl}/{$row->post_name}/",
                'title' => ['rendered' => $row->post_title],
                'content' => ['rendered' => $row->post_content],
                'excerpt' => ['rendered' => $row->post_excerpt !== '' ? $row->post_excerpt : $this->makeExcerpt($row->post_content)],
                'author' => (int) $row->post_author,
                'featured_media' => $media['id'] ?? 0,
                'comment_status' => $row->comment_status,
                'categories' => array_column($postTerms['category'], 'id'),
                'tags' => array_column($postTerms['post_tag'], 'id'),
                '_embedded' => array_filter([
                    'author' => $author ? [$author] : null,
                    'wp:featuredmedia' => $media ? [$media] : null,
                    'wp:term' => [$postTerms['category'], $postTerms['post_tag']],
                ], fn ($v) => $v !== null),
            ];
        })->all();
    }

    /** @return array<int, array<string, mixed>> keyed by user ID */
    private function getAuthors(array $authorIds): array
    {
        if (empty($authorIds)) {
            return [];
        }

        return DB::connection(self::CONNECTION)->table('users')
            ->whereIn('ID', $authorIds)
            ->select('ID', 'display_name', 'user_nicename', 'user_url')
            ->get()
            ->mapWithKeys(fn ($u) => [(int) $u->ID => [
                'id' => (int) $u->ID,
                'name' => $u->display_name,
                'url' => $u->user_url,
                'description' => '',
                'link' => "{$this->siteUrl}/author/{$u->user_nicename}/",
                'slug' => $u->user_nicename,
            ]])
            ->all();
    }

    /** @return array<int, array<string, mixed>> keyed by post ID */
    private function getFeaturedMedia(array $postIds): array
    {
        if (empty($postIds)) {
            return [];
        }

        $thumbnailIds = DB::connection(self::CONNECTION)->table('postmeta')
            ->whereIn('post_id', $postIds)
            ->where('meta_key', '_thumbnail_id')
            ->pluck('meta_value', 'post_id');

        if ($thumbnailIds->isEmpty()) {
            return [];
        }

        $attachmentIds = $thumbnailIds->unique()->values()->all();

        $attachments = DB::connection(self::CONNECTION)->table('posts')
            ->whereIn('ID', $attachmentIds)
            ->where('post_type', 'attachment')
            ->select('ID', 'post_title', 'post_date', 'post_name', 'post_mime_type', 'guid')
            ->get()
            ->keyBy('ID');

        $attachedFiles = DB::connection(self::CONNECTION)->table('postmeta')
            ->whereIn('post_id', $attachmentIds)
            ->where('meta_key', '_wp_attached_file')
            ->pluck('meta_value', 'post_id');

        $attachmentMeta = DB::connection(self::CONNECTION)->table('postmeta')
            ->whereIn('post_id', $attachmentIds)
            ->where('meta_key', '_wp_attachment_metadata')
            ->pluck('meta_value', 'post_id');

        $altText = DB::connection(self::CONNECTION)->table('postmeta')
            ->whereIn('post_id', $attachmentIds)
            ->where('meta_key', '_wp_attachment_image_alt')
            ->pluck('meta_value', 'post_id');

        $result = [];

        foreach ($thumbnailIds as $postId => $attachmentId) {
            $attachment = $attachments->get($attachmentId);
            if (! $attachment) {
                continue;
            }

            $attachedFile = $attachedFiles->get($attachmentId);
            $uploadsBase = "{$this->siteUrl}/wp-content/uploads";
            $sourceUrl = $attachedFile ? "{$uploadsBase}/{$attachedFile}" : $attachment->guid;

            $sizes = [];
            $rawMeta = $attachmentMeta->get($attachmentId);
            if ($rawMeta) {
                // WP core's own serialization format for attachment metadata -
                // this is our own trusted DB data, but allowed_classes:false
                // still guards against ever instantiating an unexpected object.
                $meta = @unserialize($rawMeta, ['allowed_classes' => false]);
                $dir = $attachedFile ? dirname($attachedFile) : '';
                if (is_array($meta) && ! empty($meta['sizes']) && is_array($meta['sizes'])) {
                    foreach ($meta['sizes'] as $sizeName => $size) {
                        $sizes[$sizeName] = [
                            'file' => $size['file'] ?? '',
                            'width' => (int) ($size['width'] ?? 0),
                            'height' => (int) ($size['height'] ?? 0),
                            'mime_type' => $size['mime-type'] ?? $attachment->post_mime_type,
                            'source_url' => $dir !== '' && $dir !== '.'
                                ? "{$uploadsBase}/{$dir}/{$size['file']}"
                                : "{$uploadsBase}/{$size['file']}",
                        ];
                    }
                }
            }

            $result[(int) $postId] = [
                'id' => (int) $attachmentId,
                'date' => $this->toIso($attachment->post_date),
                'slug' => $attachment->post_name,
                'type' => 'attachment',
                'link' => "{$this->siteUrl}/{$attachment->post_name}/",
                'title' => ['rendered' => $attachment->post_title],
                'author' => 0,
                'caption' => ['rendered' => ''],
                'alt_text' => $altText->get($attachmentId, ''),
                'media_type' => str_starts_with((string) $attachment->post_mime_type, 'image/') ? 'image' : 'file',
                'mime_type' => $attachment->post_mime_type,
                'media_details' => [
                    'width' => 0,
                    'height' => 0,
                    'file' => $attachedFile ?? '',
                    'sizes' => $sizes,
                ],
                'source_url' => $sourceUrl,
            ];
        }

        return $result;
    }

    /**
     * @return array<int, array{category: array<int, array>, post_tag: array<int, array>}> keyed by post ID
     */
    private function getTermsForPosts(array $postIds): array
    {
        if (empty($postIds)) {
            return [];
        }

        $rows = DB::connection(self::CONNECTION)->table('term_relationships')
            ->join('term_taxonomy', 'term_taxonomy.term_taxonomy_id', '=', 'term_relationships.term_taxonomy_id')
            ->join('terms', 'terms.term_id', '=', 'term_taxonomy.term_id')
            ->whereIn('term_relationships.object_id', $postIds)
            ->whereIn('term_taxonomy.taxonomy', ['category', 'post_tag'])
            ->select(
                'term_relationships.object_id',
                'terms.term_id',
                'terms.name',
                'terms.slug',
                'term_taxonomy.taxonomy',
                'term_taxonomy.description',
                'term_taxonomy.parent',
                'term_taxonomy.count'
            )
            ->get();

        $result = [];

        foreach ($rows as $row) {
            $postId = (int) $row->object_id;
            $result[$postId] ??= ['category' => [], 'post_tag' => []];
            $result[$postId][$row->taxonomy][] = $this->formatTerm($row, $row->taxonomy);
        }

        return $result;
    }

    private function formatTerm(object $row, string $taxonomy): array
    {
        return [
            'id' => (int) $row->term_id,
            'count' => (int) $row->count,
            'description' => $row->description,
            'link' => "{$this->siteUrl}/category/{$row->slug}/",
            'name' => $row->name,
            'slug' => $row->slug,
            'taxonomy' => $taxonomy,
            'parent' => (int) $row->parent,
        ];
    }

    /** WP stores dates as "Y-m-d H:i:s" local strings with no offset; ISO-8601-ify to match the REST API's format. */
    private function toIso(?string $mysqlDateTime): string
    {
        if (! $mysqlDateTime || $mysqlDateTime === '0000-00-00 00:00:00') {
            return '';
        }

        return str_replace(' ', 'T', $mysqlDateTime);
    }

    private function makeExcerpt(string $content, int $words = 55): string
    {
        $plain = trim(strip_tags($content));

        return implode(' ', array_slice(preg_split('/\s+/', $plain), 0, $words));
    }
}
