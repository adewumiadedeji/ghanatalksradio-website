<?php

namespace App\Http\Controllers;

use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Http\Request;

/**
 * Catches every request that matched no real route. The site migrated off
 * WordPress's original root-level permalinks (/{slug}) onto /post/{slug}
 * with no redirect ever built for the switch - confirmed via a Search
 * Console Coverage export showing ~950 once-real article URLs (years of
 * accumulated backlinks and crawl/index history) now 404ing, every one of
 * them a bare single-segment slug that still resolves to a real, live post
 * under /post/{slug}. A single-segment path matching a real post's slug
 * gets a permanent redirect there, recovering that URL's link equity
 * instead of leaving it dead; anything else (multi-segment paths, bot
 * scans for /wp-login.php, /.env, etc.) still 404s exactly as before - the
 * slug-shape check below filters those out before ever touching the
 * WordPress DB connection.
 */
class LegacyPostRedirectController extends Controller
{
    public function __invoke(WordPressRepository $wp, Request $request)
    {
        $path = trim($request->path(), '/');

        if (! preg_match('/^[a-z0-9-]+$/', $path)) {
            abort(404);
        }

        if ($wp->getPostBySlug($path) === null) {
            abort(404);
        }

        return redirect("/post/{$path}", 301);
    }
}
