@extends('bot.layout')

@section('content')
    <h1>{{ $category['name'] }}</h1>

    <ul class="post-list">
        @foreach ($posts as $post)
            @include('bot._post-list-item', ['post' => $post])
        @endforeach
    </ul>

    <nav class="pagination">
        @if ($page > 1)
            <a href="{{ url('/category/'.$category['slug']) }}?page={{ $page - 1 }}">&larr; Newer</a>
        @endif
        @if ($page < ($meta['totalPages'] ?? 1))
            <a href="{{ url('/category/'.$category['slug']) }}?page={{ $page + 1 }}">Older &rarr;</a>
        @endif
    </nav>
@endsection
