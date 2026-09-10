<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

/**
 * Guards POST /api/sitemap/dirty - hit by WordPress (a transition_post_status
 * snippet) and by ghanatalksradio-portal (Modules\Podcast\Application\
 * SitemapDirtyNotifier) whenever something publishes. Same single-shared-
 * secret Bearer pattern as the portal's own EnsureLiquidSoapKey - neither
 * caller is a real account, just another server/site.
 */
class EnsureSitemapWebhookKey
{
    public function handle(Request $request, Closure $next)
    {
        $configured = Config::get('services.sitemap.webhook_secret');

        if (! $configured) {
            return response()->json(['status' => false, 'message' => 'Sitemap webhook is not configured.'], 503);
        }

        $provided = $request->bearerToken();

        if (! $provided || ! hash_equals($configured, $provided)) {
            return response()->json(['status' => false, 'message' => 'Invalid or missing webhook key.'], 401);
        }

        return $next($request);
    }
}
