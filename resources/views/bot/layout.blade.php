<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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

    {{--
        Plain, dependency-free CSS - just enough for a crawler-readable
        layout. Not the site's real design system (styled-components can't
        run without React); this page is never meant to be seen by a human,
        only crawled. Kept intentionally simple so it stays maintainable as
        its own thing rather than chasing parity with the real app.
    --}}
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 760px; margin: 0 auto; padding: 1.5rem; line-height: 1.6; color: #15171C; background: #F2F5F9; }
        a { color: #9C6300; }
        header nav { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #E1E5EC; }
        header nav a { font-weight: 600; text-decoration: none; }
        h1 { font-size: 1.6rem; line-height: 1.3; }
        img { max-width: 100%; height: auto; border-radius: 8px; }
        .meta { color: #5B5E68; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .post-list { list-style: none; padding: 0; }
        .post-list li { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #E1E5EC; }
        .post-list h2 { font-size: 1.15rem; margin: 0 0 0.3rem; }
        .pagination { display: flex; gap: 1rem; margin-top: 2rem; }
        footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #E1E5EC; color: #5B5E68; font-size: 0.85rem; }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="{{ url('/') }}">Home</a>
            @foreach ($navGroups ?? [] as $group)
                @if ($group['slug'])
                    <a href="{{ url('/category/'.$group['slug']) }}">{{ $group['label'] }}</a>
                @endif
            @endforeach
            <a href="{{ url('/podcast') }}">Podcast</a>
            <a href="{{ url('/videos') }}">Videos</a>
        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        &copy; {{ date('Y') }} GhanaTalksRadio — Ghana's digital radio.
    </footer>
</body>
</html>
