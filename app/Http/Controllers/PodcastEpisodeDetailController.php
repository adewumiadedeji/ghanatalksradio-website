<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PodcastEpisodeDetailController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request, string $showSlug, string $episodeSlug): Response|HttpResponse
    {
        $episode = $portal->getPodcastEpisodeBySlug($showSlug, $episodeSlug);

        if ($episode === null) {
            return Inertia::render('PodcastEpisodeDetail', ['episode' => null, 'banner' => null])
                ->toResponse($request)->setStatusCode(404);
        }

        PageMeta::set(
            title: $episode['title'].' | '.$episode['show']['name'].' | GhanaTalksRadio',
            description: $episode['description'] ?: null,
            image: $episode['show']['imageUrl'] ?? null,
        );

        return Inertia::render('PodcastEpisodeDetail', [
            'episode' => $episode,
            'banner' => $portal->fetchBanners('web_podcast_episode')[0] ?? null,
        ]);
    }
}
