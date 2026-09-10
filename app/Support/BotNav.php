<?php

namespace App\Support;

use App\Services\Nav\NavResolver;
use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Support\Facades\Cache;

/**
 * Nav category links for the bot-facing Blade views (see BotDetector) -
 * just enough for a crawler to discover the rest of the site via real
 * <a href> links, not full parity with the React nav's dropdown structure.
 * Own cache key/TTL rather than reusing HandleInertiaRequests' 'site-nav'
 * entry, since that one also carries podcast show data these views don't need.
 */
class BotNav
{
    /** @return array<int, array{label: string, slug: ?string, children: array}> */
    public static function groups(WordPressRepository $wp): array
    {
        return Cache::remember('bot-nav-groups', now()->addMinutes(5), function () use ($wp) {
            return NavResolver::buildResolvedNav($wp->getAllCategories())['groups'];
        });
    }
}
