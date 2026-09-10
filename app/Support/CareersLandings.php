<?php

namespace App\Support;

/**
 * The curated, static set of SEO landing pages GTR Careers generates -
 * deliberately NOT a dynamic category×location combinatorial generator.
 * Spec §21 is explicit: "Do NOT generate thousands of empty or near-
 * identical pages" - this is exactly the example list from that section
 * (categories, locations, and broadcasting-focused role searches), kept
 * as plain constants per spec §13 ("Categories can initially be
 * application configuration/constants") rather than a database table,
 * since adding a new landing page is a code change either way and this
 * needs no admin UI to manage.
 *
 * Each entry's `search` params feed the exact same
 * PortalApiClient::searchJobs() call the plain /jobs page uses - a
 * landing page is really just /jobs pre-filled with a specific query,
 * not a separate data source.
 */
class CareersLandings
{
    /** @return array<string, array{title: string, h1: string, intro: string, search: array, related: string[]}> */
    public static function all(): array
    {
        return [
            // Categories
            'broadcasting' => [
                'title' => 'Broadcasting Jobs',
                'h1' => 'Broadcasting Jobs',
                'intro' => 'Radio and TV broadcasting roles - presenters, producers, engineers and more - curated by GhanaTalksRadio.',
                'search' => ['category' => 'broadcasting'],
                'related' => ['radio', 'journalism', 'ghana'],
            ],
            'radio' => [
                'title' => 'Radio Jobs',
                'h1' => 'Radio Jobs',
                'intro' => 'Current radio industry opportunities - on-air, production and technical roles.',
                'search' => ['q' => 'radio'],
                'related' => ['radio-presenter', 'radio-producer', 'broadcasting'],
            ],
            'journalism' => [
                'title' => 'Journalism & Media Jobs',
                'h1' => 'Journalism & Media Jobs',
                'intro' => 'Reporting, editorial and broadcast journalism opportunities across Africa.',
                'search' => ['category' => 'journalism-media'],
                'related' => ['broadcast-journalist', 'media', 'ghana'],
            ],
            'media' => [
                'title' => 'Media Jobs',
                'h1' => 'Media Jobs',
                'intro' => 'Television, video, digital media and content roles.',
                'search' => ['category' => 'media'],
                'related' => ['journalism', 'video-editor', 'nigeria'],
            ],
            'technology' => [
                'title' => 'Technology Jobs',
                'h1' => 'Technology Jobs',
                'intro' => 'Software, IT and technical roles - including remote-friendly positions.',
                'search' => ['category' => 'technology'],
                'related' => ['remote', 'ghana', 'nigeria'],
            ],
            'remote' => [
                'title' => 'Remote Jobs',
                'h1' => 'Remote Jobs',
                'intro' => 'Work-from-anywhere opportunities in media, technology, marketing and more.',
                'search' => ['workplace_type' => 'remote'],
                'related' => ['technology', 'media', 'internships'],
            ],
            'internships' => [
                'title' => 'Internship Opportunities',
                'h1' => 'Internships & Graduate Opportunities',
                'intro' => 'Entry-level and internship opportunities for those starting their career.',
                'search' => ['employment_type' => 'internship'],
                'related' => ['broadcasting', 'media', 'remote'],
            ],

            // Locations
            'ghana' => [
                'title' => 'Jobs in Ghana',
                'h1' => 'Jobs in Ghana',
                'intro' => 'Current opportunities across Accra, Kumasi, Tema, Takoradi, Tamale and Cape Coast.',
                'search' => ['country' => 'gh'],
                'related' => ['accra', 'broadcasting', 'remote'],
            ],
            'nigeria' => [
                'title' => 'Jobs in Nigeria',
                'h1' => 'Jobs in Nigeria',
                'intro' => 'Current opportunities across Lagos, Abuja, Port Harcourt, Ibadan and more.',
                'search' => ['country' => 'ng'],
                'related' => ['lagos', 'media', 'remote'],
            ],
            'accra' => [
                'title' => 'Jobs in Accra',
                'h1' => 'Jobs in Accra',
                'intro' => 'Current opportunities in Accra, Ghana.',
                'search' => ['location' => 'accra'],
                'related' => ['ghana', 'radio-presenter', 'broadcasting'],
            ],
            'lagos' => [
                'title' => 'Jobs in Lagos',
                'h1' => 'Jobs in Lagos',
                'intro' => 'Current opportunities in Lagos, Nigeria.',
                'search' => ['location' => 'lagos'],
                'related' => ['nigeria', 'media', 'technology'],
            ],

            // Broadcasting-focused role searches
            'radio-presenter' => [
                'title' => 'Radio Presenter Jobs',
                'h1' => 'Radio Presenter Jobs',
                'intro' => 'Find current radio presenter opportunities across Ghana, Nigeria and beyond.',
                'search' => ['q' => 'radio presenter'],
                'related' => ['radio-producer', 'broadcast-journalist', 'radio'],
            ],
            'radio-producer' => [
                'title' => 'Radio Producer Jobs',
                'h1' => 'Radio Producer Jobs',
                'intro' => 'Current radio production opportunities.',
                'search' => ['q' => 'radio producer'],
                'related' => ['radio-presenter', 'radio', 'ghana'],
            ],
            'broadcast-journalist' => [
                'title' => 'Broadcast Journalist Jobs',
                'h1' => 'Broadcast Journalist Jobs',
                'intro' => 'Current broadcast journalism opportunities.',
                'search' => ['q' => 'broadcast journalist'],
                'related' => ['journalism', 'radio-presenter', 'nigeria'],
            ],
            'video-editor' => [
                'title' => 'Video Editor Jobs',
                'h1' => 'Video Editor Jobs',
                'intro' => 'Current video editing and post-production opportunities.',
                'search' => ['q' => 'video editor'],
                'related' => ['media', 'podcast-producer', 'remote'],
            ],
            'podcast-producer' => [
                'title' => 'Podcast Producer Jobs',
                'h1' => 'Podcast Producer Jobs',
                'intro' => 'Current podcast production opportunities.',
                'search' => ['q' => 'podcast producer'],
                'related' => ['video-editor', 'media', 'remote'],
            ],
        ];
    }

    public static function find(string $slug): ?array
    {
        return self::all()[$slug] ?? null;
    }
}
