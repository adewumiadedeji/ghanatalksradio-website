<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * A single survey platform's landing page - 404 only if the platform
 * code doesn't exist at all (fetchSurveyPlatformDetail() returns null for
 * that case); a known-but-disabled platform still renders 200 with a
 * "coming soon" state. No take-survey flow exists on web at all - see
 * SurveyHub.tsx's own docblock for why.
 */
class SurveyPlatformController extends Controller
{
    public function __invoke(PortalApiClient $portal, string $platform): Response
    {
        $data = $portal->fetchSurveyPlatformDetail($platform);

        if ($data === null) {
            throw new NotFoundHttpException;
        }

        PageMeta::set(
            title: ($data['label'] ?? 'Surveys').' | GhanaTalksRadio',
            description: 'Complete short surveys and earn a reward in the GhanaTalksRadio app.',
        );

        return Inertia::render('SurveyPlatform', [
            'platform' => $data,
        ]);
    }
}
