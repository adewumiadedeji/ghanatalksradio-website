<?php

namespace App\Http\Controllers;

use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Google Play flagged this URL as missing - WordPress's own "Contact Us"
 * page (id 766) has no real content, just an embedded Contact Form 7
 * form that depends on WordPress's own JS/AJAX runtime and won't work
 * rendered standalone here, so this is genuinely new content rather than
 * a port. support@ghanatalksradio.com is a placeholder - swap for the
 * real support address before this ships.
 */
class AboutUsController extends Controller
{
    public function __invoke(): Response
    {
        PageMeta::set(title: 'About Us | GhanaTalksRadio');

        return Inertia::render('AboutUs', [
            'supportEmail' => 'support@ghanatalksradio.com',
        ]);
    }
}
