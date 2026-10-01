<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PodcastShowController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request, string $showSlug): Response
    {
        $page = max(1, (int) $request->query('page', 1));

        try {
            $result = $portal->getPodcastEpisodesByShowSlug($showSlug, $page);
            $isError = false;
        } catch (PortalApiException) {
            $result = ['episodes' => [], 'show' => null, 'totalPages' => 0];
            $isError = true;
        }

        if ($result['show'] !== null) {
            // Same duplicate-description fix as CategoryArchiveController -
            // every page of one show's episode list would otherwise share
            // one identical title/description.
            PageMeta::set(
                title: $page > 1
                    ? "{$result['show']['name']} — Page {$page} | GhanaTalksRadio Podcasts"
                    : $result['show']['name'].' | GhanaTalksRadio Podcasts',
                description: $page > 1
                    ? "More episodes of {$result['show']['name']} on GhanaTalksRadio, page {$page}."
                    : "Listen to {$result['show']['name']} on GhanaTalksRadio - news, music and talk, on demand.",
                image: $result['show']['imageUrl'] ?? null,
                noindex: $page > 1,
            );
        }

        return Inertia::render('PodcastShow', [
            'episodes' => $result['episodes'],
            'show' => $result['show'],
            'page' => $page,
            'totalPages' => $result['totalPages'],
            'isError' => $isError,
            'banners' => $portal->fetchBanners('web_podcast_series'),
        ]);
    }
}
