<?php

namespace App\Services\Nav;

/**
 * Server-side port of the old Vite SPA's src/utils/GroupedNav.ts. Resolves
 * NavStructure against the real live category list - anything requested
 * whose slug doesn't match a real category is dropped silently (no dead
 * links) rather than rendered broken.
 */
class NavResolver
{
    /**
     * Live categories to keep out of the nav entirely (including "More"),
     * matched as a case-insensitive substring of the category name -
     * mirrors the SPA's confirmed-live-name list.
     */
    private const HIDDEN_CATEGORY_NAME_FRAGMENTS = ['coronavirus', 'election', 'photography', 'gtr podcast'];

    /**
     * @param  array<int, array<string, mixed>>  $liveCategories  WPCategory-shaped arrays (id, name, slug, parent, ...)
     * @return array{groups: array<int, array{label: string, slug: ?string, children: array}>, overflow: array<int, array{label: string, slug: string}>}
     */
    public static function buildResolvedNav(array $liveCategories): array
    {
        $bySlug = [];
        foreach ($liveCategories as $cat) {
            $bySlug[$cat['slug']] = $cat;
        }

        $placedSlugs = NavStructure::placedSlugs();

        $groups = [];
        foreach (NavStructure::STRUCTURE as $group) {
            $ownCategory = ! empty($group['slug']) ? ($bySlug[$group['slug']] ?? null) : null;

            $children = [];
            foreach ($group['children'] ?? [] as $child) {
                if (isset($bySlug[$child['slug']])) {
                    $children[] = ['label' => $child['label'], 'slug' => $child['slug']];
                }
            }

            if (! $ownCategory && count($children) === 0) {
                continue;
            }

            $groups[] = [
                'label' => $group['label'],
                'slug' => $ownCategory['slug'] ?? null,
                'children' => $children,
            ];
        }

        $overflow = [];
        foreach ($liveCategories as $cat) {
            $isTopLevel = (int) ($cat['parent'] ?? 0) === 0;
            if ($isTopLevel && ! in_array($cat['slug'], $placedSlugs, true) && ! self::isHiddenCategory($cat['name'])) {
                $overflow[] = ['label' => $cat['name'], 'slug' => $cat['slug']];
            }
        }

        return ['groups' => $groups, 'overflow' => $overflow];
    }

    private static function isHiddenCategory(string $name): bool
    {
        $lower = strtolower(trim($name));

        foreach (self::HIDDEN_CATEGORY_NAME_FRAGMENTS as $fragment) {
            if (str_contains($lower, $fragment)) {
                return true;
            }
        }

        return false;
    }
}
