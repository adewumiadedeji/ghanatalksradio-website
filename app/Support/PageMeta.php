<?php

namespace App\Support;

/**
 * Per-request page metadata (title/description/image), rendered directly by
 * app.blade.php rather than through Inertia's client-side <Head> component.
 *
 * Real social-media link previews (WhatsApp, Facebook, iMessage, Slack)
 * fetch raw HTML and never execute JavaScript, so they never see anything
 * <Head> patches in after React mounts - and with SSR disabled on this
 * deployment (see AppServiceProvider / INERTIA_SSR_ENABLED), that's true of
 * every single request now, not just non-JS crawlers. Controllers that
 * already have the specific post/episode/etc in hand call
 * PageMeta::set(...) before returning their Inertia::render() response;
 * app.blade.php reads it back out and falls back to the site defaults for
 * any route that doesn't set it.
 */
class PageMeta
{
    /** @var array{title: string, description: ?string, image: ?string, noindex: bool}|null */
    private static ?array $current = null;

    /**
     * $noindex: for pages that are real, functional, and linked-to but
     * shouldn't be indexed - internal search results being the main case
     * (Google's own long-standing recommendation: infinite query-string
     * variations of a search page read as thin/duplicate content to a
     * crawler, since the on-page text barely changes between searches).
     */
    public static function set(string $title, ?string $description = null, ?string $image = null, bool $noindex = false): void
    {
        self::$current = [
            'title' => $title,
            'description' => $description !== null ? self::plainText($description) : null,
            'image' => $image,
            'noindex' => $noindex,
        ];
    }

    /** @return array{title: string, description: ?string, image: ?string, noindex: bool}|null */
    public static function get(): ?array
    {
        return self::$current;
    }

    /**
     * Absolute URL of the current path on the one canonical host
     * (config('app.url'), not whatever host the request actually arrived
     * on). ghanatalksradio.com and www.ghanatalksradio.com both resolve to
     * this app with no redirect between them - building canonical/og:url
     * from request()->url() (or url()->current()) let every page
     * self-declare as canonical on BOTH hosts, splitting Google's ranking
     * signals for the same content across two "different" sites. Confirmed
     * live: the same post URL rendered a different canonical/og:url
     * depending only on which host served the request.
     */
    public static function canonicalUrl(): string
    {
        return rtrim(config('app.url'), '/').request()->getPathInfo();
    }

    /**
     * Strips HTML/entities from a WP excerpt or portal description (both
     * arrive as raw HTML) and truncates to a clean single-line summary -
     * WhatsApp/Facebook truncate og:description themselves anyway, but at
     * a fixed byte count that can cut mid-tag if we hand them raw HTML.
     */
    public static function plainText(string $html, int $limit = 200): string
    {
        $text = trim(html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5));
        $text = preg_replace('/\s+/', ' ', $text) ?? $text;

        return mb_strlen($text) > $limit ? mb_substr($text, 0, $limit - 1).'…' : $text;
    }
}
