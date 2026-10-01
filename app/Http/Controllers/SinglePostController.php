<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\BotDetector;
use App\Support\BotNav;
use App\Support\PageMeta;
use Illuminate\Http\Request;
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
            image: $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
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
}
