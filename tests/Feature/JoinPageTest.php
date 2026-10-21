<?php

namespace Tests\Feature;

use App\Http\Controllers\JoinController;
use Tests\TestCase;

/** The referral share link's landing page - see JoinController. */
class JoinPageTest extends TestCase
{
    private const ANDROID_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36';

    private const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';

    public function test_it_shows_the_referral_code_in_upper_case(): void
    {
        $this->get('/join/kofi123')->assertOk()->assertSee('KOFI123');
    }

    public function test_it_hands_the_code_to_the_app_through_the_clipboard_marker(): void
    {
        $this->get('/join/KOFI123')->assertOk()->assertSee(JoinController::CLIPBOARD_PREFIX.'KOFI123', false);
    }

    public function test_an_android_phone_only_sees_google_play(): void
    {
        $this->withHeader('User-Agent', self::ANDROID_UA)->get('/join/KOFI123')
            ->assertSee('play.google.com', false)
            ->assertDontSee('apps.apple.com', false);
    }

    public function test_an_iphone_only_sees_the_app_store(): void
    {
        $this->withHeader('User-Agent', self::IPHONE_UA)->get('/join/KOFI123')
            ->assertSee('apps.apple.com', false)
            ->assertDontSee('play.google.com', false);
    }

    public function test_a_desktop_visitor_sees_both_stores(): void
    {
        $this->get('/join/KOFI123')->assertSee('apps.apple.com', false)->assertSee('play.google.com', false);
    }

    public function test_it_is_not_indexed_by_search_engines(): void
    {
        $this->get('/join/KOFI123')->assertSee('noindex', false);
    }
}
