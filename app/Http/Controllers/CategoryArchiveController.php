<?php

namespace App\Http\Controllers;

use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\BotDetector;
use App\Support\BotNav;
use App\Support\CategoryTree;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class CategoryArchiveController extends Controller
{
    private const PER_PAGE = 10;

    public function __invoke(WordPressRepository $wp, Request $request, string $slug): Response|HttpResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $category = $wp->getCategoryBySlug($slug);

        if ($category === null) {
            if (BotDetector::isBot($request)) {
                return response()->view('bot.category', [
                    'category' => ['name' => 'Not found', 'slug' => $slug],
                    'posts' => [],
                    'meta' => ['totalItems' => 0, 'totalPages' => 0],
                    'page' => $page,
                    'navGroups' => BotNav::groups($wp),
                ], 404);
            }

            // A real 404 status, not just a "not found" message rendered
            // with a 200 - the old Vite SPA couldn't do this (client-only
            // routing has no HTTP status concept), but a crawler should
            // see a genuine 404 for a category that doesn't exist.
            return Inertia::render('CategoryArchive', [
                'category' => null,
                'posts' => [],
                'meta' => ['totalItems' => 0, 'totalPages' => 0],
                'page' => $page,
            ])->toResponse($request)->setStatusCode(404);
        }

        // This category's own posts PLUS every descendant (sub)category's
        // posts - a category archive page must show "everything filed
        // under News", not just whatever got tagged to the literal "news"
        // term. Without this, a post an editor filed under a News
        // subcategory (e.g. "Education") instead of the parent term was
        // invisible here, which is exactly why /category/news could look
        // stale for months while the site kept publishing - the new
        // content was landing in a subcategory this page never queried.
        $descendantIds = CategoryTree::descendantIds($wp->getAllCategories(), $category['id']);
        $categoryIds = array_merge([$category['id']], $descendantIds);

        $result = $wp->getPostsByCategory($categoryIds, [
            'page' => $page,
            'per_page' => self::PER_PAGE,
        ]);

        // Page 2+ of the same category would otherwise share IDENTICAL
        // title/description with every other page of it (only the post
        // list differs) - exactly the "duplicate meta description" pattern
        // SEO auditors flag. Deeper pages are also noindexed: their content
        // is just older posts already indexed individually via their own
        // /post/{slug} page, so the listing page itself has no unique
        // value to rank on beyond page 1.
        PageMeta::set(
            title: $page > 1
                ? "{$category['name']} — Page {$page} | GhanaTalksRadio"
                : $category['name'].' | GhanaTalksRadio',
            description: $page > 1
                ? "More {$category['name']} news and articles from GhanaTalksRadio, page {$page}."
                : "The latest {$category['name']} news, articles and updates from GhanaTalksRadio.",
            image: $result['items'][0]['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
            noindex: $page > 1,
        );

        if (BotDetector::isBot($request)) {
            return response()->view('bot.category', [
                'category' => $category,
                'posts' => $result['items'],
                'meta' => $result['meta'],
                'page' => $page,
                'navGroups' => BotNav::groups($wp),
            ]);
        }

        return Inertia::render('CategoryArchive', [
            'category' => $category,
            'posts' => $result['items'],
            'meta' => $result['meta'],
            'page' => $page,
        ]);
    }
}
