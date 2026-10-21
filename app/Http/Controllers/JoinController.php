<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;

/**
 * Where a shared referral link lands: https://ghanatalksradio.com/join/{code}.
 *
 * Someone who already has the app never sees this page - the site-wide
 * App Links / Universal Links config (AppLinksController) opens the app
 * straight from the link, and the app remembers the code itself. This page
 * is for everyone else: it tells them who's inviting them, and sends them
 * to the right store.
 *
 * The one clever bit: just before the browser leaves for the store, the
 * page copies `GTRREF:{code}` to the clipboard, and the app picks that up on
 * first launch (utils/pendingReferral.ts in ghanatalksradio-mobile) so the
 * referral survives the install. That prefix is a contract with the app -
 * change both together. A plain store link can't carry anything through an
 * install, and the Play Store's install-referrer needs a native module
 * (and has no iOS equivalent), so the clipboard is the one mechanism that
 * works on both platforms.
 *
 * Server-rendered Blade, deliberately not an Inertia/React page: it must
 * work instantly on a cold, possibly slow mobile connection, and has no
 * need for the rest of the site's JS.
 */
class JoinController extends Controller
{
    public const CLIPBOARD_PREFIX = 'GTRREF:';

    public function __invoke(Request $request, string $code): View
    {
        $userAgent = strtolower((string) $request->userAgent());
        $isIos = str_contains($userAgent, 'iphone') || str_contains($userAgent, 'ipad') || str_contains($userAgent, 'ipod');
        $isAndroid = str_contains($userAgent, 'android');

        return view('join', [
            'code' => strtoupper($code),
            'clipboardText' => self::CLIPBOARD_PREFIX.strtoupper($code),
            'iosUrl' => 'https://apps.apple.com/us/app/ghanatalksradio/id1511977360',
            'androidUrl' => 'https://play.google.com/store/apps/details?id=com.ghanatalksradio&hl=en&gl=US',
            // Show only the relevant store on a phone; both on desktop.
            'showIos' => $isIos || ! $isAndroid,
            'showAndroid' => $isAndroid || ! $isIos,
        ]);
    }
}
