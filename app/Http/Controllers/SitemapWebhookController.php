<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;

/**
 * POST /api/sitemap/dirty (guarded by EnsureSitemapWebhookKey) - fired by
 * WordPress on every publish/update and by the portal's
 * SitemapDirtyNotifier whenever a podcast series/episode publishes.
 *
 * Regenerates via dispatch(...)->afterResponse() rather than a queued job -
 * this app has no persistent queue worker, and afterResponse() runs the
 * closure right after the HTTP response is sent, so the caller (a
 * WordPress publish action, a portal model save) is never kept waiting on
 * a multi-second sitemap:generate run. The 60s cache cooldown absorbs a
 * burst of several publishes in the same minute into one regeneration
 * instead of running the full command back-to-back for each.
 */
class SitemapWebhookController extends Controller
{
    private const COOLDOWN_SECONDS = 60;

    public function markDirty()
    {
        if (Cache::has('sitemap_recently_generated')) {
            return response()->json(['status' => true, 'message' => 'Already scheduled']);
        }

        Cache::put('sitemap_recently_generated', true, self::COOLDOWN_SECONDS);

        dispatch(function () {
            Artisan::call('sitemap:generate');
        })->afterResponse();

        return response()->json(['status' => true, 'message' => 'Regenerating']);
    }
}
