@extends('bot.layout')

@section('content')
    <h1>Categories</h1>

    <ul class="post-list">
        @foreach ($categories as $category)
            <li>
                <a href="{{ url('/category/'.$category['slug']) }}">{{ $category['name'] }}</a>
                @if (!empty($category['description']))
                    <p>{{ $category['description'] }}</p>
                @endif
            </li>
        @endforeach
    </ul>
@endsection
