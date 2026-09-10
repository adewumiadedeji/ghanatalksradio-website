@extends('bot.layout')

@section('content')
    <h1>Latest News</h1>
    <ul class="post-list">
        @foreach (array_merge($heroPosts, $topGridPosts, $trendingPosts, $riverPosts) as $post)
            @include('bot._post-list-item', ['post' => $post])
        @endforeach
    </ul>

    @if (! empty($entertainmentPosts))
        <h2>Entertainment</h2>
        <ul class="post-list">
            @foreach ($entertainmentPosts as $post)
                @include('bot._post-list-item', ['post' => $post])
            @endforeach
        </ul>
    @endif

    @if (! empty($sportsPosts))
        <h2>Sports</h2>
        <ul class="post-list">
            @foreach ($sportsPosts as $post)
                @include('bot._post-list-item', ['post' => $post])
            @endforeach
        </ul>
    @endif

    @if (! empty($lifestylePosts))
        <h2>Lifestyle</h2>
        <ul class="post-list">
            @foreach ($lifestylePosts as $post)
                @include('bot._post-list-item', ['post' => $post])
            @endforeach
        </ul>
    @endif
@endsection
