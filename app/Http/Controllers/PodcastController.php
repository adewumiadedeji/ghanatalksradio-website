<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PodcastController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request): Response
    {
        $page = max(1, (int) $request->query('page', 1));

        try {
            $result = $portal->getPodcastEpisodes($page);
            $episodes = $result['episodes'];
            $hasMore = $result['hasMore'];
            $isError = false;
        } catch (PortalApiException) {
            $episodes = [];
            $hasMore = false;
            $isError = true;
        }

        PageMeta::set(
            title: $page > 1 ? "GhanaTalksRadio Podcasts — Page {$page}" : 'Podcasts | GhanaTalksRadio',
            description: $page > 1
                ? "More recent podcast episodes from GhanaTalksRadio, page {$page}."
                : 'Every GhanaTalksRadio show and episode — news bulletins, talk shows and more, on demand.',
            noindex: $page > 1,
        );

        return Inertia::render('Podcast', [
            'episodes' => $episodes,
            'page' => $page,
            'hasMore' => $hasMore,
            'isError' => $isError,
        ]);
    }
}
