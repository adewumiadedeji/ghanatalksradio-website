<?php

namespace App\Http\Controllers;

use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\BotDetector;
use App\Support\BotNav;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

/**
 * A real, standalone directory of every category - distinct from
 * CategoryArchiveController (one category's own article listing).
 * Exists so /category itself is a real, crawlable, sitemap-listed page
 * Google can use to discover every category URL and keep a history of
 * them, rather than categories only ever being reachable through the
 * header's nav dropdown (client-rendered, not a crawlable link on its
 * own) - see GenerateSitemap's new entry for this route.
 */
class CategoryIndexController extends Controller
{
    public function __invoke(WordPressRepository $wp, Request $request): Response|HttpResponse
    {
        $categories = $wp->getAllCategories();

        PageMeta::set(
            title: 'Categories | GhanaTalksRadio',
            description: 'Browse every news and content category on GhanaTalksRadio - politics, entertainment, sports, lifestyle and more.',
        );

        if (BotDetector::isBot($request)) {
            return response()->view('bot.category-index', [
                'categories' => $categories,
                'navGroups' => BotNav::groups($wp),
            ]);
        }

        return Inertia::render('CategoryIndex', [
            'categories' => $categories,
        ]);
    }
}
