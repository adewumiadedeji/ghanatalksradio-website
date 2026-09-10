<?php

namespace App\Http\Controllers;

use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Fixed content, not fetched from WordPress - the previous version pulled
 * a genuine WP page (slug "privacy-policy") that had gone stale/thin and
 * needed a real rewrite. Rendered from a plain Blade view
 * (resources/views/legal/privacy-policy.blade.php) rather than WordPress
 * on purpose now: a legal document like this shouldn't be editable by
 * whoever happens to have WordPress page-editing access, and there's no
 * WordPress admin credential available to this deploy pipeline anyway.
 */
class PrivacyPolicyController extends Controller
{
    public function __invoke(): Response
    {
        PageMeta::set(title: 'Privacy Policy | GhanaTalksRadio');

        return Inertia::render('StaticPage', [
            'title' => 'Privacy Policy',
            'content' => view('legal.privacy-policy', ['effectiveDate' => 'August 25, 2026'])->render(),
        ]);
    }
}
