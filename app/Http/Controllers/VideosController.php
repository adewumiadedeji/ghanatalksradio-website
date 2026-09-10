<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideosController extends Controller
{
    /**
     * Dedicated YouTube channel feed - Live Now (if currently broadcasting)
     * plus recent uploads. The backend paginates via YouTube's own opaque
     * page_token cursor (not a real page number), so "Load More" re-visits
     * this same route with ?page_token=... and Inertia::merge() appends
     * the new batch onto the existing `videos` prop client-side, rather
     * than the SPA's client-side reveal-buffer trick.
     */
    public function __invoke(PortalApiClient $portal, Request $request): Response
    {
        $pageToken = $request->query('page_token');

        PageMeta::set(
            title: 'Videos | GhanaTalksRadio',
            description: 'Watch GhanaTalksRadio live and catch up on recent video uploads — news, music and entertainment on demand.',
        );

        try {
            $data = $portal->fetchYoutubeVideos($pageToken);
            $isError = false;
        } catch (PortalApiException) {
            $data = ['live' => [], 'videos' => [], 'nextPageToken' => null];
            $isError = true;
        }

        return Inertia::render('Videos', [
            // Live Now isn't paginated/accumulated - only relevant on the
            // first load, so it's a plain prop, not merged.
            'liveVideos' => $data['live'],
            'videos' => Inertia::merge($data['videos']),
            'nextPageToken' => $data['nextPageToken'],
            'isError' => $isError,
        ]);
    }
}
