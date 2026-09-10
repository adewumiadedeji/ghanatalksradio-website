<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

/**
 * A single job's detail page - GET /jobs/{provider}/{reference}. This is
 * the one Careers page real crawlable/indexable value depends on the most
 * (spec's SEO goal), so unlike the search results page it's a real,
 * direct, indexable URL - not a client-side-only view.
 */
class CareersJobDetailController extends Controller
{
    public function __invoke(PortalApiClient $portal, string $provider, string $reference): Response
    {
        $job = $portal->getJobDetail($provider, $reference);

        if (! $job) {
            PageMeta::set(title: 'Job not found | GTR Careers', noindex: true);

            return Inertia::render('careers/JobDetail', ['job' => null]);
        }

        PageMeta::set(
            title: "{$job['title']} at ".($job['company'] ?? 'a GTR Careers listing')." | GTR Careers",
            description: $job['description'] ?? "{$job['title']} - view this opportunity and apply on GhanaTalksRadio Careers.",
        );

        return Inertia::render('careers/JobDetail', ['job' => $job]);
    }
}
