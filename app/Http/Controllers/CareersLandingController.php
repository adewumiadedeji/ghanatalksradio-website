<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\CareersLandings;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * A curated SEO landing page - GET /jobs/{slug}. Structurally just /jobs
 * pre-filled with that landing's search params (see CareersLandings) -
 * real, current, indexable results, not a static page, per spec §22's
 * "current job results" requirement. Registered after the plain /jobs
 * route and before /jobs/{provider}/{reference} in routes/web.php - a
 * 1-segment vs 2-segment path, so there's no ambiguity between "a landing
 * slug" and "a provider+reference pair" at the routing layer.
 */
class CareersLandingController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request, string $slug): Response
    {
        $landing = CareersLandings::find($slug);

        if (! $landing) {
            throw new NotFoundHttpException();
        }

        $result = $portal->searchJobs($landing['search'] + $request->only(['page']));

        PageMeta::set(
            title: "{$landing['title']} | GTR Careers",
            description: $landing['intro'],
        );

        return Inertia::render('careers/SeoLanding', [
            'slug' => $slug,
            'landing' => $landing,
            'jobs' => $result['jobs'],
            'total' => $result['total'],
            'page' => $result['page'],
            'limit' => $result['limit'] ?? 20,
        ]);
    }
}
