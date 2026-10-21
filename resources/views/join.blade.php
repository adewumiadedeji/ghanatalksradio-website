<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>You're invited to GhanaTalksRadio</title>
    <style>
        body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #0b1220; color: #f3f4f6; }
        main { max-width: 26rem; margin: 0 auto; padding: 3.5rem 1.5rem; text-align: center; }
        h1 { font-size: 1.6rem; margin: 0 0 .75rem; }
        p { color: #cbd5e1; line-height: 1.5; margin: 0 0 1.25rem; }
        .code { display: inline-block; font-size: 1.75rem; font-weight: 800; letter-spacing: .2em; padding: .6rem 1.2rem; border: 2px dashed #475569; border-radius: .75rem; margin-bottom: 1.5rem; }
        .btn { display: block; margin: 0 0 .75rem; padding: .9rem 1rem; border-radius: .75rem; background: #316bf3; color: #fff; font-weight: 700; text-decoration: none; }
        .btn--alt { background: transparent; border: 1px solid #475569; }
        small { color: #94a3b8; }
    </style>
</head>
<body>
    <main>
        <h1>You're invited to GhanaTalksRadio</h1>
        <p>Listen live, play prediction games, take surveys and earn rewards. Sign up with this code so your friend gets credit:</p>
        <div class="code">{{ $code }}</div>

        @if ($showAndroid)
            <a class="btn" href="{{ $androidUrl }}" data-store>Get it on Google Play</a>
        @endif
        @if ($showIos)
            <a class="btn {{ $showAndroid ? 'btn--alt' : '' }}" href="{{ $iosUrl }}" data-store>Download on the App Store</a>
        @endif

        <small>Already have the app? Open this link on your phone and it will open there. Your code is added automatically - or type it in on the sign-up screen.</small>
    </main>

    <script>
        // Carries the referral through the install: the app reads this on
        // first launch (contract with ghanatalksradio-mobile's utils/pendingReferral.ts).
        (function () {
            var text = @json($clipboardText);
            document.querySelectorAll('a[data-store]').forEach(function (link) {
                link.addEventListener('click', function (event) {
                    if (!navigator.clipboard || !navigator.clipboard.writeText) {
                        return; // follow the link normally - the code is still visible to type in.
                    }
                    event.preventDefault();
                    var go = function () { window.location.href = link.href; };
                    // Never trap the visitor on this page if the clipboard is slow or refused.
                    var timer = setTimeout(go, 700);
                    navigator.clipboard.writeText(text).then(function () { clearTimeout(timer); go(); }, function () { clearTimeout(timer); go(); });
                });
            });
        })();
    </script>
</body>
</html>
