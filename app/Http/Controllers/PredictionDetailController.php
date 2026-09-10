<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PredictionDetailController extends Controller
{
    /**
     * guest_token is a browser-localStorage identity (see
     * resources/js/utils/guestToken.ts) with no server-side equivalent, so
     * this SSRs the fixtures WITHOUT it - real content for crawlers
     * (teams, kickoff times, descriptions), with generic/empty
     * my_predictions. The page re-fetches with the real guest token on
     * mount to layer in personalization once hydrated.
     */
    public function __invoke(PortalApiClient $portal, Request $request, string $slug): Response|HttpResponse
    {
        $prediction = $portal->fetchPredictionDetail($slug);

        if ($prediction === null) {
            return Inertia::render('PredictionDetail', ['prediction' => null])
                ->toResponse($request)->setStatusCode(404);
        }

        PageMeta::set(
            title: $prediction['name'].' | GhanaTalksRadio',
            description: $prediction['description'] ?: "Predict {$prediction['name']} and win points on GhanaTalksRadio.",
        );

        return Inertia::render('PredictionDetail', [
            'prediction' => $prediction,
        ]);
    }
}
