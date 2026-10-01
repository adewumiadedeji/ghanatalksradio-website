<?php

namespace App\Services\WordPress\Contracts;

/**
 * Two implementations exist: WordPressApiClient (REST, the original
 * behavior) and WordPressDbClient (direct read-only MySQL). Both return
 * the same WP REST-shaped arrays (title.rendered, _embedded, etc.), and
 * the same {items, meta:{totalItems,totalPages}} collection shape the old
 * Vite SPA's WPCollectionResult<T> used - so controllers and Inertia pages
 * don't care which one is bound. See AppServiceProvider::register().
 */
interface WordPressRepository
{
    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    public function getPosts(array $params = []): array;

    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    public function getPostsByCategory(int $categoryId, array $params = []): array;

    public function getCategoryBySlug(string $slug): ?array;

    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    public function getPostsByCategorySlug(string $slug, array $params = []): array;

    public function getPostBySlug(string $slug): ?array;

    /**
     * Looks a post up by its numeric WordPress ID - only used by
     * LegacyPostRedirectController for the numeric permalink fallback
     * WordPress always exposes alongside a post's pretty-permalink slug
     * (/{id}/), independent of the slug. Years of old backlinks, RSS
     * entries, and social shares reference this form directly, and
     * without a way to resolve it, every one of those URLs dead-ends in
     * a 404 instead of recovering to the real /post/{slug} page - found
     * live via a Search Console Coverage export showing exactly this
     * pattern. Same shape as getPostBySlug().
     */
    public function getPostById(int $id): ?array;

    /**
     * A static WordPress Page (wp/v2/pages), not a Post - used for
     * Privacy Policy and similar legal/static content that lives as a
     * real WP page in the CMS but has no post_type=post/category of its
     * own. Same shape as getPostBySlug() (title.rendered/content.rendered)
     * so StaticPage.tsx can reuse PostContent for sanitized rendering.
     */
    public function getPageBySlug(string $slug): ?array;

    /** @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}} */
    public function searchPosts(string $query, array $params = []): array;

    /** Every non-empty category, alphabetical - used to build the site nav. */
    public function getAllCategories(): array;

    /**
     * Posts from the known video categories (music-video-mix, music,
     * entertainment) - the source pool for the homepage/playlist "watchable
     * post" sections. Caller still needs to filter for an actual YouTube
     * embed (see HomeController::hasYouTubeEmbed) - not every post in these
     * categories has one.
     *
     * @return array{items: array<int, array<string, mixed>>, meta: array{totalItems: int, totalPages: int}}
     */
    public function getVideoSourcePosts(int $perPage = 20): array;

    /**
     * Every published post's slug + last-modified date, for sitemap
     * generation - deliberately lightweight (no _embed/terms/media/author
     * hydration) since this can be 50,000+ posts. The DB client answers
     * this with one query; the REST client still has to paginate - $onPage,
     * if given, is called after each page as (page, totalCollectedSoFar) so
     * a long REST-backed run isn't silent for hours.
     *
     * @return array<int, array{slug: string, modified: ?string}>
     */
    public function getAllPostSlugsForSitemap(?callable $onPage = null): array;
}
