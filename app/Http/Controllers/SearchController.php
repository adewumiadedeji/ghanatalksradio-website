<?php

namespace App\Http\Controllers;

use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    private const PER_PAGE = 10;

    public function __invoke(WordPressRepository $wp, Request $request): Response
    {
        $query = trim((string) $request->query('q', ''));
        $page = max(1, (int) $request->query('page', 1));

        $result = $query !== ''
            ? $wp->searchPosts($query, ['page' => $page, 'per_page' => self::PER_PAGE])
            : ['items' => [], 'meta' => ['totalItems' => 0, 'totalPages' => 0]];

        // Always noindex - Google's own long-standing recommendation for
        // internal search results (see search.google.com/search-console/...
        // "block search result pages"): near-infinite query-string
        // variations of one page, none with unique crawlable value, is
        // exactly the "thin/duplicate content" pattern SEO tools flag.
        PageMeta::set(
            title: $query !== '' ? "Search: \"{$query}\" | GhanaTalksRadio" : 'Search | GhanaTalksRadio',
            description: $query !== ''
                ? "Search results for \"{$query}\" on GhanaTalksRadio."
                : 'Search GhanaTalksRadio for news, articles and more.',
            noindex: true,
        );

        return Inertia::render('Search', [
            'query' => $query,
            'posts' => $result['items'],
            'meta' => $result['meta'],
            'page' => $page,
        ]);
    }
}
