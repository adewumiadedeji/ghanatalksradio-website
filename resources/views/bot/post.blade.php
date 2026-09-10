@extends('bot.layout')

@section('content')
    @if ($post === null)
        <h1>Post not found</h1>
        <p>This article doesn't exist or has been removed.</p>
    @else
    @php
        $category = $post['_embedded']['wp:term'][0][0] ?? null;
        $author = $post['_embedded']['author'][0]['name'] ?? null;
        $image = $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null;
    @endphp

    <article>
        @if ($category)
            <a href="{{ url('/category/'.$category['slug']) }}">{{ $category['name'] }}</a>
        @endif

        <h1>{{ $post['title']['rendered'] }}</h1>

        <p class="meta">
            @if ($author) By {{ $author }} @endif
            &middot; {{ \Illuminate\Support\Carbon::parse($post['date'])->format('j F Y') }}
        </p>

        @if ($image)
            <img src="{{ $image }}" alt="{{ $post['title']['rendered'] }}" />
        @endif

        <div>
            {!! \App\Support\BotContent::renderBody($post['content']['rendered']) !!}
        </div>
    </article>
    @endif
@endsection
