<?php

namespace App\Http\Controllers;

use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\PageMeta;
use App\Support\YoutubeEmbed;
use Inertia\Inertia;
use Inertia\Response;

class PlaylistController extends Controller
{
    private const VIDEO_LIMIT = 18;

    /**
     * Replaces the old site's /news-playlist. There's no podcast/episode
     * data on this backend - this is a curated grid of posts from Music,
     * Music Video Mix, and Entertainment that carry a YouTube embed, which
     * is what the old "playlist" feed actually showed under the hood.
     */
    public function __invoke(WordPressRepository $wp): Response
    {
        $source = $wp->getVideoSourcePosts(self::VIDEO_LIMIT)['items'];

        $videos = array_values(array_filter(
            $source,
            fn ($p) => YoutubeEmbed::hasEmbed($p['content']['rendered'] ?? '')
        ));

        PageMeta::set(
            title: 'Playlist | GhanaTalksRadio',
            description: 'Music, videos and entertainment - a curated playlist from GhanaTalksRadio.',
            image: $videos[0]['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
        );

        return Inertia::render('Playlist', [
            'videos' => $videos,
        ]);
    }
}
