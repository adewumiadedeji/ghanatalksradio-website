<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * The deep-link target/fallback page for one specific survey -
 * /surveys/native/{survey}. This is the real URL SurveyPlatform.tsx's
 * "Take survey" link points at, as a genuine anchor (not an Inertia
 * client-side route) specifically so a tap gives the OS a chance to
 * intercept it as a Universal Link (iOS)/App Link (Android) and open the
 * GhanaTalksRadio app directly to this exact survey instead - see
 * AppLinksController's own docblock ("no custom URL scheme, no JS
 * redirect/timeout guessing game") and RootNavigator.tsx's `linking`
 * config in the mobile repo for the other half of this. When the OS
 * doesn't intercept it (app not installed, or iOS Safari's own
 * restriction on auto-opening Universal Links tapped from within Safari
 * itself), the browser lands here instead - a read-only info page that
 * prompts installing the app, never a working take-survey form (that
 * only exists on mobile - see SurveyPlatform.tsx's own docblock for why).
 */
class SurveyDetailController extends Controller
{
    public function __invoke(PortalApiClient $portal, int $survey): Response
    {
        $data = $portal->fetchSurveyDetail($survey);

        if ($data === null) {
            throw new NotFoundHttpException;
        }

        PageMeta::set(
            title: $data['title'].' | GhanaTalksRadio Surveys',
            description: 'Complete this survey and earn a reward in the GhanaTalksRadio app.',
        );

        return Inertia::render('SurveyDetail', [
            'survey' => $data,
        ]);
    }
}
