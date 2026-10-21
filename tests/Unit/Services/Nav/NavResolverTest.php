<?php

namespace Tests\Unit\Services\Nav;

use App\Services\Nav\NavResolver;
use Tests\TestCase;

/**
 * Covers a real bug: a subcategory (parent !== 0, e.g. a "News" child
 * like "Education") that isn't explicitly placed in NavStructure used to
 * be dropped from the nav entirely - neither rendered as a group child
 * nor falling into "More" overflow, because the overflow loop required
 * parent === 0. A live, published category must always be reachable
 * from the nav somehow.
 */
class NavResolverTest extends TestCase
{
    public function test_an_unplaced_top_level_category_falls_into_overflow(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'Opinion', 'slug' => 'opinion', 'parent' => 0],
        ];

        $result = NavResolver::buildResolvedNav($categories);

        $this->assertSame([['label' => 'Opinion', 'slug' => 'opinion']], $result['overflow']);
    }

    public function test_an_unplaced_subcategory_also_falls_into_overflow(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'News', 'slug' => 'news', 'parent' => 0],
            ['id' => 2, 'name' => 'Education', 'slug' => 'education', 'parent' => 1],
        ];

        $result = NavResolver::buildResolvedNav($categories);

        $this->assertContains(['label' => 'Education', 'slug' => 'education'], $result['overflow']);
    }

    public function test_a_category_explicitly_placed_in_structure_is_not_duplicated_into_overflow(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'News', 'slug' => 'news', 'parent' => 0],
        ];

        $result = NavResolver::buildResolvedNav($categories);

        $this->assertSame([], $result['overflow']);
    }

    public function test_a_hidden_category_never_appears_in_overflow_even_as_a_subcategory(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'News', 'slug' => 'news', 'parent' => 0],
            ['id' => 2, 'name' => 'US Election 2026', 'slug' => 'election-2026', 'parent' => 1],
        ];

        $result = NavResolver::buildResolvedNav($categories);

        $this->assertSame([], $result['overflow']);
    }
}
