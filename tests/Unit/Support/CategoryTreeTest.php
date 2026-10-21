<?php

namespace Tests\Unit\Support;

use App\Support\CategoryTree;
use Tests\TestCase;

class CategoryTreeTest extends TestCase
{
    public function test_it_returns_direct_children(): void
    {
        $categories = [
            ['id' => 1, 'parent' => 0], // News
            ['id' => 2, 'parent' => 1], // Education
            ['id' => 3, 'parent' => 1], // Politics
            ['id' => 4, 'parent' => 0], // Sports (unrelated)
        ];

        $this->assertEqualsCanonicalizing([2, 3], CategoryTree::descendantIds($categories, 1));
    }

    public function test_it_returns_grandchildren_too(): void
    {
        $categories = [
            ['id' => 1, 'parent' => 0], // News
            ['id' => 2, 'parent' => 1], // Education
            ['id' => 3, 'parent' => 2], // Education > Scholarships
        ];

        $this->assertEqualsCanonicalizing([2, 3], CategoryTree::descendantIds($categories, 1));
    }

    public function test_it_never_includes_the_root_itself(): void
    {
        $categories = [
            ['id' => 1, 'parent' => 0],
        ];

        $this->assertSame([], CategoryTree::descendantIds($categories, 1));
    }

    public function test_a_category_with_no_children_returns_empty(): void
    {
        $categories = [
            ['id' => 1, 'parent' => 0],
            ['id' => 2, 'parent' => 0],
        ];

        $this->assertSame([], CategoryTree::descendantIds($categories, 1));
    }

    public function test_it_does_not_infinite_loop_on_a_self_referencing_parent(): void
    {
        // Malformed data shouldn't happen in real WordPress, but this must
        // never hang the request if it somehow does.
        $categories = [
            ['id' => 1, 'parent' => 1],
        ];

        $this->assertSame([1], CategoryTree::descendantIds($categories, 1));
    }
}
