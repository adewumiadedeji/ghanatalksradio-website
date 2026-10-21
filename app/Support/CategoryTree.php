<?php

namespace App\Support;

/**
 * WordPress categories can nest (a "News" parent with "Education",
 * "Politics", etc. as children) - CategoryArchiveController needs to
 * treat a parent category's archive page as "this category OR any of its
 * descendants" so that a post an editor tagged to a child category
 * (instead of the parent) still shows up, rather than silently vanishing
 * from the parent's own listing page. See that controller's own docblock
 * for the real bug this fixes: /category/news looked stale because posts
 * were landing in a child category instead of the literal "news" term.
 */
class CategoryTree
{
    /**
     * @param  array<int, array{id: int, parent: int}>  $allCategories  as returned by WordPressRepository::getAllCategories()
     * @return array<int, int> every descendant (children, grandchildren, ...) of $rootId - never includes $rootId itself
     */
    public static function descendantIds(array $allCategories, int $rootId): array
    {
        $childrenByParent = [];
        foreach ($allCategories as $category) {
            $childrenByParent[(int) $category['parent']][] = (int) $category['id'];
        }

        $visited = [];
        $queue = $childrenByParent[$rootId] ?? [];

        while ($queue !== []) {
            $id = array_shift($queue);

            if (isset($visited[$id])) {
                // Malformed/cyclic parent data shouldn't exist in real
                // WordPress, but must never hang the request if it does.
                continue;
            }
            $visited[$id] = true;

            foreach ($childrenByParent[$id] ?? [] as $childId) {
                $queue[] = $childId;
            }
        }

        return array_keys($visited);
    }
}
