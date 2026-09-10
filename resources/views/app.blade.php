<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {{--
      Per-page title/description/image, set by the controller via
      App\Support\PageMeta before rendering (falls back to the site
      defaults for routes that don't set it - see PageMeta.php). Rendered
      directly here, in PHP, rather than through Inertia's client-side
      <Head> component: real social-media link previews (WhatsApp,
      Facebook, iMessage, Slack) fetch raw HTML and never execute
      JavaScript, so they'd never see anything <Head> patches in after
      React mounts - and with SSR disabled on this deployment
      (INERTIA_SSR_ENABLED=false), that's true for every single request
      now, not just non-JS crawlers. @inertiaHead below stays as-is for
      when SSR *is* available elsewhere and additionally emits Inertia's
      own head tags, but the tags a shared link actually gets previewed
      from are these.
    --}}
    @php
      $meta = \App\Support\PageMeta::get();
      $metaTitle = $meta['title'] ?? 'GhanaTalksRadio — News, Music & Talk for the Youth Voice';
      $metaDescription = $meta['description'] ?? "Ghana's digital radio — news, music, talk and culture, live and on demand. Giving the youth a voice since day one.";
      $metaImage = $meta['image'] ?? asset('og-default.png');
    @endphp
    <title>{{ $metaTitle }}</title>
    <meta name="description" content="{{ $metaDescription }}" />
    @if ($meta['noindex'] ?? false)
      <meta name="robots" content="noindex, follow" />
    @endif
    <link rel="canonical" href="{{ \App\Support\PageMeta::canonicalUrl() }}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="GhanaTalksRadio" />
    <meta property="og:title" content="{{ $metaTitle }}" />
    <meta property="og:description" content="{{ $metaDescription }}" />
    <meta property="og:image" content="{{ $metaImage }}" />
    <meta property="og:url" content="{{ \App\Support\PageMeta::canonicalUrl() }}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $metaTitle }}" />
    <meta name="twitter:description" content="{{ $metaDescription }}" />
    <meta name="twitter:image" content="{{ $metaImage }}" />

    <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}" />
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}" />
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..500&family=JetBrains+Mono:wght@500;600&display=swap"
      rel="stylesheet"
    />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2147054503852134"
     crossorigin="anonymous"></script>

    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
