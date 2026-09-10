<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * GTR Careers search - GET /jobs. A thin pass-through to the portal's own
 * Modules/Careers API (PortalApiClient::searchJobs()) - all search logic,
 * provider aggregation, dedup and the apply-redirect token live there;
 * this controller only shapes the request/response for the page.
 */
class CareersController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request): Response
    {
        $params = $request->only(['q', 'location', 'country', 'category', 'employment_type', 'workplace_type', 'page', 'sort']);
        $result = $portal->searchJobs($params);

        $query = $request->string('q')->toString();

        PageMeta::set(
            title: $query !== '' ? "{$query} Jobs | GTR Careers" : 'GTR Careers — Find Your Next Opportunity',
            description: $query !== ''
                ? "Find current {$query} job opportunities, curated by GhanaTalksRadio. Apply directly with the original employer."
                : 'Discover broadcasting, media and job opportunities across Ghana, Nigeria and Africa - curated by GhanaTalksRadio.',
            // Search results are real and functional but are effectively
            // infinite query-string variations of the same page - same
            // "don't index thin/duplicate search result pages" reasoning
            // PageMeta's own docblock already documents for this exact
            // case. The plain /jobs landing (no query) stays indexable.
            noindex: $request->anyFilled(['q', 'location', 'country', 'category', 'employment_type', 'workplace_type']),
        );

        return Inertia::render('careers/Search', [
            'jobs' => $result['jobs'],
            'total' => $result['total'],
            'page' => $result['page'],
            'limit' => $result['limit'] ?? 20,
            'params' => $params,
            // Only worth the extra portal round-trip on the plain
            // homepage (no active search) - a filtered/paginated results
            // view has no real estate or reason to also show it.
            'jobOfTheDay' => $params === [] ? $portal->getJobOfTheDay() : null,
        ]);
    }
}
