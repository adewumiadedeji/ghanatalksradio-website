<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Lists every survey platform (live + "coming soon" placeholders) - this
 * is where the spec's original "preview every platform up front" nav
 * behavior now lives, reached one click in from the "Arena" dropdown's
 * "Surveys" item rather than its own top-level nav dropdown (product
 * decision - see SurveyHub.tsx's own docblock).
 */
class SurveyHubController extends Controller
{
    public function __invoke(PortalApiClient $portal): Response
    {
        PageMeta::set(
            title: 'Surveys | GhanaTalksRadio',
            description: 'Complete short surveys and earn a reward in the GhanaTalksRadio app.',
        );

        try {
            $platforms = $portal->fetchSurveyPlatforms();
            $isError = false;
        } catch (PortalApiException) {
            $platforms = [];
            $isError = true;
        }

        return Inertia::render('SurveyHub', [
            'platforms' => $platforms,
            'isError' => $isError,
        ]);
    }
}
