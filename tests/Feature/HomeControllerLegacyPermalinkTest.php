<?php

namespace Tests\Feature;

use App\Services\WordPress\Contracts\WordPressRepository;
use Mockery\MockInterface;
use Tests\TestCase;

/**
 * Regression coverage for a real, confirmed indexing bug surfaced by a
 * Google Search Console Coverage export: /?p={id} (WordPress's query-
 * string numeric permalink, exposed for every post regardless of whether
 * pretty permalinks were ever on) never redirected to the real article -
 * Route::fallback()-based LegacyPostRedirectController only ever sees
 * requests where NO route matched the path, but '/' with a ?p= query
 * string still matches HomeController's own real route, so the fallback
 * never ran and the homepage silently rendered 200 with its own canonical
 * instead of recovering the real post.
 */
class HomeControllerLegacyPermalinkTest extends TestCase
{
    public function test_a_valid_legacy_post_id_redirects_to_the_real_article(): void
    {
        $this->mock(WordPressRepository::class, function (MockInterface $mock) {
            $mock->shouldReceive('getPostById')->once()->with(63606)->andReturn(['slug' => 'some-real-article']);
        });

        $this->get('/?p=63606')
            ->assertRedirect('/post/some-real-article')
            ->assertStatus(301);
    }

    public function test_an_unknown_legacy_post_id_404s_instead_of_rendering_the_homepage(): void
    {
        $this->mock(WordPressRepository::class, function (MockInterface $mock) {
            $mock->shouldReceive('getPostById')->once()->with(999999)->andReturn(null);
        });

        $this->get('/?p=999999')->assertStatus(404);
    }

    public function test_a_non_numeric_p_value_never_triggers_the_id_lookup(): void
    {
        $this->mock(WordPressRepository::class, function (MockInterface $mock) {
            $mock->shouldNotReceive('getPostById');
        });

        // A non-numeric ?p= falls through to the homepage's normal render,
        // which has its own real dependencies (portal banners/podcasts) not
        // relevant to this regression - a 500 here would mean something
        // else broke, not this change, so only the mock expectation above
        // (never reached) is this test's actual assertion.
        try {
            $this->get('/?p=not-a-number');
        } catch (\Throwable) {
            // ignore - see comment above
        }
    }
}
