<?php

use App\Http\Controllers\SitemapWebhookController;
use Illuminate\Support\Facades\Route;

// Machine-facing - WordPress (a transition_post_status snippet) and
// ghanatalksradio-portal (SitemapDirtyNotifier) only. See
// EnsureSitemapWebhookKey / SitemapWebhookController.
Route::middleware('sitemap.webhook')->post('sitemap/dirty', [SitemapWebhookController::class, 'markDirty']);
