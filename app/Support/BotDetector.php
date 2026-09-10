<?php

namespace App\Support;

use Illuminate\Http\Request;

/**
 * Dynamic rendering: real visitors get the normal React/Inertia app
 * (persistent audio player, instant navigation); requests from known
 * crawlers instead get a plain server-rendered Blade view of the same
 * content - real HTML with the actual article/listing text already in it,
 * no JavaScript involved. This is Google's own long-documented pattern for
 * sites that can't do true SSR - see project_dynamic_rendering memory for
 * why (Node/SSR is blocked outright on this host's hosting account).
 *
 * User-Agent sniffing, not a security boundary - a bad actor can trivially
 * spoof one of these strings. That's fine here: worst case they see the
 * same public content a real visitor would, just without the JS shell.
 */
class BotDetector
{
    /**
     * Search engines, social/link-preview crawlers, and AI crawlers -
     * matched as a case-insensitive substring of the User-Agent header.
     */
    private const BOT_USER_AGENT_FRAGMENTS = [
        // Search engines
        'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
        'applebot', 'ia_archiver',
        // Social / link-preview
        'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
        'slackbot', 'discordbot', 'skypeuripreview', 'vkshare', 'redditbot', 'pinterest',
        // SEO tools (indexing-adjacent, worth serving real HTML to as well)
        'ahrefsbot', 'semrushbot', 'mj12bot',
        // AI crawlers
        'gptbot', 'chatgpt-user', 'claudebot', 'anthropic-ai', 'perplexitybot', 'oai-searchbot',
    ];

    public static function isBot(Request $request): bool
    {
        $userAgent = strtolower((string) $request->userAgent());

        if ($userAgent === '') {
            return false;
        }

        foreach (self::BOT_USER_AGENT_FRAGMENTS as $fragment) {
            if (str_contains($userAgent, $fragment)) {
                return true;
            }
        }

        return false;
    }
}
