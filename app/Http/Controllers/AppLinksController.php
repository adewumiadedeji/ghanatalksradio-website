<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

/**
 * Serves the two files iOS/Android use to verify this domain is allowed to
 * open the native app: /.well-known/apple-app-site-association and
 * /.well-known/assetlinks.json. Together with matching config on the native
 * app side (Associated Domains entitlement / App Links intent filter), this
 * makes an ordinary https://ghanatalksradio.com/... link - shared in
 * WhatsApp, found in a Google search result, printed as a QR code, whatever -
 * open directly in the app when it's installed, and load this website when
 * it isn't. No custom URL scheme, no JS redirect/timeout guessing game.
 *
 * Routed through Laravel rather than served as static files in public/ so
 * the Content-Type is guaranteed correct (apple-app-site-association has no
 * extension - most static file servers guess text/plain, which iOS
 * rejects) and there's no dependency on the host not blocking dotfiles.
 *
 * Both endpoints render harmlessly with empty appIDs/package_name until the
 * IOS_TEAM_ID/IOS_BUNDLE_ID/ANDROID_PACKAGE_NAME/ANDROID_SHA256_CERT_FINGERPRINTS
 * env vars are filled in from the native app projects - the OS just won't
 * match anything and every link keeps behaving exactly as it does today.
 */
class AppLinksController extends Controller
{
    /**
     * Paths that deep-link into the app. "/*" covers the whole site per the
     * initial rollout scope; asset/infra paths are excluded since they're
     * never a page a person is meant to land on inside the app.
     */
    private const INCLUDED_PATHS = ['/*'];

    private const EXCLUDED_PATHS = ['/build/*', '/sitemap*', '/robots.txt', '/favicon.ico', '/.well-known/*'];

    public function appleAppSiteAssociation(): JsonResponse
    {
        $teamId = config('services.app_links.ios.team_id');
        $bundleId = config('services.app_links.ios.bundle_id');

        $appId = $teamId && $bundleId ? "{$teamId}.{$bundleId}" : '';

        $components = array_merge(
            array_map(fn ($path) => ['/' => $path, 'exclude' => true], self::EXCLUDED_PATHS),
            array_map(fn ($path) => ['/' => $path], self::INCLUDED_PATHS)
        );

        return response()->json([
            'applinks' => [
                'details' => [
                    [
                        'appIDs' => [$appId],
                        'components' => $components,
                    ],
                ],
            ],
        ])->header('Content-Type', 'application/json');
    }

    public function assetLinks(): JsonResponse
    {
        $packageName = config('services.app_links.android.package_name');
        $fingerprints = config('services.app_links.android.sha256_cert_fingerprints');

        return response()->json([
            [
                'relation' => ['delegate_permission/common.handle_all_urls'],
                'target' => [
                    'namespace' => 'android_app',
                    'package_name' => $packageName ?? '',
                    'sha256_cert_fingerprints' => $fingerprints,
                ],
            ],
        ])->header('Content-Type', 'application/json');
    }
}
