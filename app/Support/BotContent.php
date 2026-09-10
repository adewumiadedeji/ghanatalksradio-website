<?php

namespace App\Support;

/**
 * Sanitizes WP post_content HTML for the bot-facing Blade views (see
 * BotDetector). Trusted source (this site's own WordPress, single-admin
 * controlled, not public UGC), so this is a light allowlist rather than a
 * full sanitizer like the React app's DOMPurify - mainly stripping
 * <script>/<style>/event-handler-bearing tags so nothing executes if a
 * crawler's own pipeline ever does render this, while keeping every tag
 * that matters for readable article structure and SEO.
 */
class BotContent
{
    private const ALLOWED_TAGS = '<p><a><strong><em><b><i><u><ul><ol><li><h2><h3><h4><blockquote><img><br><figure><figcaption><span><div>';

    public static function renderBody(string $html): string
    {
        return strip_tags($html, self::ALLOWED_TAGS);
    }
}
