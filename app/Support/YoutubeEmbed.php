<?php

namespace App\Support;

class YoutubeEmbed
{
    /** Matches a YouTube video ID out of an embed iframe src or a watch/short link - same pattern as the old SPA's wpContent.ts. */
    private const PATTERN = '#(?:youtube(?:-nocookie)?\.com/(?:embed/|watch\?v=)|youtu\.be/)([a-zA-Z0-9_-]{11})#';

    /** True if this post's content contains a YouTube embed - used to identify "watchable" posts among a category's mixed content. */
    public static function hasEmbed(string $html): bool
    {
        return preg_match(self::PATTERN, $html) === 1;
    }
}
