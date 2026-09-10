@php $postCategory = $post['_embedded']['wp:term'][0][0] ?? null; @endphp
<li>
    <h2><a href="{{ url('/post/'.$post['slug']) }}">{{ $post['title']['rendered'] }}</a></h2>
    <p class="meta">
        @if ($postCategory) {{ $postCategory['name'] }} &middot; @endif
        {{ \Illuminate\Support\Carbon::parse($post['date'])->format('j F Y') }}
    </p>
    <p>{{ \App\Support\PageMeta::plainText($post['excerpt']['rendered'] ?? '') }}</p>
</li>
