<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Resend, Postmark, AWS, and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'wordpress' => [
        // wordpress.ghanatalksradio.com - same backend the old Vite SPA hit
        // over REST.
        'api_url' => env('WP_API_URL', 'https://wordpress.ghanatalksradio.com/wp-json/wp/v2'),

        // 'api' (default) or 'db'. Only set to 'db' where the WP_DB_*
        // connection (config/database.php) is actually reachable - i.e.
        // once this app is deployed on IONOS hosting itself. See
        // AppServiceProvider::register() for how this is used.
        'data_source' => env('WP_DATA_SOURCE', 'api'),
    ],

    'portal' => [
        // ghanatalksradio-portal (Laravel) - podcasts, raffle, YouTube,
        // predictions, quizzes, leaderboard. Called over HTTP, same as
        // the old Vite SPA did, just from the server now instead of the browser.
        'api_url' => env('PORTAL_API_URL', 'https://app.ghanatalksradio.com'),
    ],

    'sitemap' => [
        // Shared secret for POST /api/sitemap/dirty (EnsureSitemapWebhookKey) -
        // the same value must be configured on the WordPress side (the
        // transition_post_status snippet) and on the portal
        // (SITEMAP_WEBHOOK_SECRET, Modules/Podcast's SitemapDirtyNotifier).
        // Not a per-account credential, so one rotatable key.
        'webhook_secret' => env('SITEMAP_WEBHOOK_SECRET'),
    ],

    'indexnow' => [
        // Bing/Yandex real-time re-crawl ping (indexnow.org) - see
        // IndexNowService. Not a secret in the security sense (it's
        // served back publicly at public/{key}.txt to prove domain
        // ownership); it just needs to stay in sync with that file.
        //
        // 'key' (INDEXNOW_KEY) is left alone - reserved for whatever it's
        // already being used for elsewhere - and 'bing_key'
        // (INDEXNOW_BING_KEY) is the real key IndexNowService actually
        // submits with, issued directly from Bing Webmaster Tools, with
        // its own matching public/{key}.txt already deployed. Deliberately
        // two separate values, not one shared key, per explicit product
        // decision - even though the indexnow.org protocol itself doesn't
        // require per-platform keys (one key can serve Bing and Yandex
        // both), this keeps them from ever colliding again.
        'key' => env('INDEXNOW_KEY'),
        'bing_key' => env('INDEXNOW_BING_KEY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Universal Links (iOS) / App Links (Android)
    |--------------------------------------------------------------------------
    |
    | Identifiers for the native mobile apps, published via
    | /.well-known/apple-app-site-association and /.well-known/assetlinks.json
    | (see AppLinksController) so that tapping any ghanatalksradio.com link
    | opens directly in the app when it's installed, and falls back to this
    | website when it isn't - no custom scheme, no JS redirect/timeout hack.
    |
    | These values come from the native app projects, not this one - get
    | them from whoever maintains the iOS/Android app repos. Both files
    | render harmlessly with placeholders in the meantime (they just won't
    | match any real app yet, so the OS won't intercept anything).
    */
    'app_links' => [
        'ios' => [
            // Apple Developer Team ID, e.g. "AB12CD34EF".
            'team_id' => env('IOS_TEAM_ID'),
            // iOS bundle identifier, e.g. "com.ghanatalksradio.app".
            'bundle_id' => env('IOS_BUNDLE_ID'),
        ],
        'android' => [
            // Application ID from the Android app's build.gradle, e.g. "com.ghanatalksradio.app".
            'package_name' => env('ANDROID_PACKAGE_NAME'),
            // SHA256 fingerprint of the signing certificate (release keystore),
            // colon-separated hex, from `keytool -list -v` or the Play Console
            // "App signing" page. Supports a comma-separated list if the app
            // is signed with more than one cert (e.g. upload + Play App Signing).
            'sha256_cert_fingerprints' => array_filter(explode(',', (string) env('ANDROID_SHA256_CERT_FINGERPRINTS', ''))),
        ],
    ],

];
