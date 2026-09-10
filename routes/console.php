<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Requires the deployed server's real cron to call `php artisan schedule:run`
// every minute (standard Laravel setup) - that's what actually triggers this,
// not a public URL. See app/Console/Commands/GenerateSitemap.php.
//
// This is a backstop, not the primary trigger - WordPress and the podcast
// portal both call POST /api/sitemap/dirty on publish, which regenerates
// within seconds (see SitemapWebhookController). This daily run just covers
// a missed/failed webhook call. Fixed at midday rather than midnight so a
// missed webhook is caught well within the same business day, not overnight.
Schedule::command('sitemap:generate')
    ->dailyAt('12:00')
    ->onOneServer()
    ->withoutOverlapping();
