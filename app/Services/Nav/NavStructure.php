<?php

namespace App\Services\Nav;

/**
 * Server-side port of the old Vite SPA's src/utils/NavStructure.ts.
 * Desired top-level nav structure - each entry maps a menu label to the
 * WordPress category slug(s) it should resolve to. See the original for
 * the "which slugs are actually confirmed live" notes; the resilience
 * property is the same here: NavResolver only renders a group/item when a
 * live category with a matching slug actually exists.
 */
class NavStructure
{
    public const STRUCTURE = [
        ['label' => 'News', 'slug' => 'news'],
        ['label' => 'Entertainment', 'slug' => 'entertainment', 'children' => [
            ['label' => 'Entertainment', 'slug' => 'entertainment'],
            ['label' => 'Music', 'slug' => 'music'],
            ['label' => 'Music Video Mix', 'slug' => 'music-video-mix'],
        ]],
        ['label' => 'Lifestyle', 'slug' => 'lifestyle', 'children' => [
            ['label' => 'Lifestyle', 'slug' => 'lifestyle'],
            ['label' => 'Recipe', 'slug' => 'recipe'],
            ['label' => 'Travel', 'slug' => 'travel'],
            ['label' => 'Health', 'slug' => 'health'],
            ['label' => 'Inspirational Quote', 'slug' => 'inspirational-quote'],
        ]],
        ['label' => 'Sports', 'slug' => 'sports'],
    ];

    /**
     * Slugs handled by a dedicated fixed nav link elsewhere (Raffle links to
     * /raffle, not a WP category archive) - excluded from "More" overflow so
     * a live WP category of the same name doesn't produce a duplicate entry.
     */
    private const MANUALLY_HANDLED_SLUGS = ['raffle', 'predictions'];

    /** Every slug explicitly placed in STRUCTURE (or handled manually) - anything live that isn't one of these falls into "More" instead of disappearing. */
    public static function placedSlugs(): array
    {
        $slugs = self::MANUALLY_HANDLED_SLUGS;

        foreach (self::STRUCTURE as $group) {
            if (! empty($group['slug'])) {
                $slugs[] = $group['slug'];
            }
            foreach ($group['children'] ?? [] as $child) {
                $slugs[] = $child['slug'];
            }
        }

        return array_values(array_unique($slugs));
    }
}
