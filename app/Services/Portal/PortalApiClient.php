<?php

namespace App\Services\Portal;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Server-side port of the old Vite SPA's src/api/{podcasts,youtube,raffle,
 * predictions,quizzes,leaderboard}.ts - same ghanatalksradio-portal
 * endpoints (Modules/Podcast, Modules/Engagement), same
 * {status,data,message} envelope. Runs during the Inertia request/SSR now
 * instead of in the browser for GET data that's the same for every visitor.
 *
 * Predict/comment/submit-quiz stay direct browser calls (see
 * resources/js/api/{predictions,quizzes}.ts) - guest_token is a
 * browser-localStorage identity with no server equivalent, and there's no
 * SEO benefit to proxying a write.
 */
class PortalApiClient
{
    private string $portalUrl;

    public function __construct()
    {
        $this->portalUrl = rtrim(config('services.portal.api_url'), '/');
    }

    /** Recent episodes across every show, newest first - GET /podcasts/episodes/{page}. */
    public function getPodcastEpisodes(int $page = 1): array
    {
        $data = $this->apiGet("/api/podcasts/episodes/{$page}");

        return [
            'episodes' => array_map(
                fn ($item) => $this->toEpisode($item['episode'], $this->toShow($item['series'])),
                $data['episodes']
            ),
            'page' => $data['page'],
            'hasMore' => $data['has_more'],
        ];
    }

    /**
     * All episodes for one show - GET /podcasts/{slug} returns the full list
     * (the backend doesn't paginate per-show), paginated here to match the
     * page-at-a-time UI, same as the SPA did client-side.
     *
     * totalPages is computed from the real length of $allEpisodes (already
     * fully fetched at this point) rather than derived from `hasMore` -
     * `hasMore ? page + 1 : page` looks like a total-page count but isn't
     * one: it's mathematically guaranteed to increment by 1 on every page
     * forward until the true last page, which is why "page 1 of 2" became
     * "page 2 of 3" on the very next click. This fix reports the actual
     * total up front instead.
     */
    public function getPodcastEpisodesByShowSlug(string $showSlug, int $page = 1, int $perPage = 10): array
    {
        try {
            $data = $this->apiGet('/api/podcasts/'.rawurlencode($showSlug));
        } catch (PortalApiException) {
            return ['episodes' => [], 'show' => null, 'totalPages' => 0];
        }

        $show = $this->toShow($data['series']);
        $allEpisodes = array_map(fn ($e) => $this->toEpisode($e, $show), $data['episodes']);

        $totalPages = max(1, (int) ceil(count($allEpisodes) / $perPage));
        $start = ($page - 1) * $perPage;
        $pageItems = array_slice($allEpisodes, $start, $perPage);

        return [
            'episodes' => $pageItems,
            'show' => $show,
            'totalPages' => $totalPages,
        ];
    }

    /** One episode by show slug + episode slug - GET /podcasts/{slug}/episodes/{episodeSlug}. */
    public function getPodcastEpisodeBySlug(string $showSlug, string $episodeSlug): ?array
    {
        try {
            $data = $this->apiGet('/api/podcasts/'.rawurlencode($showSlug).'/episodes/'.rawurlencode($episodeSlug));
        } catch (PortalApiException) {
            return null;
        }

        return $this->toEpisode($data['episode'], $this->toShow($data['series']));
    }

    /**
     * Published shows - GET /podcasts. $menuOnly narrows this to series
     * staff have marked to appear in the site nav's "Podcast" dropdown
     * (Modules\Podcast's `is_favorite` flag) - use this for the dropdown,
     * and leave it false for anything that needs the complete list (the
     * full /podcast listing page, the sitemap generator).
     */
    public function fetchPodcastShowList(bool $menuOnly = false): array
    {
        $data = $this->apiGet('/api/podcasts', $menuOnly ? ['menu' => 1] : []);

        return array_map(fn ($s) => $this->toShow($s), $data['series']);
    }

    /** Currently active raffle(s) - GET /api/raffles. Read-only: entering only happens in the app. */
    public function fetchActiveRaffles(): array
    {
        return $this->apiGet('/api/raffles')['raffles'] ?? [];
    }

    /**
     * Every survey platform row (live + "coming soon" placeholders) -
     * GET /api/survey-platforms. Read-only, same as fetchActiveRaffles():
     * taking a survey only happens in the app (see SurveyHub.tsx's own
     * AppDownloadModal, mirroring Raffle.tsx exactly) - there is no real
     * user_id/bearer-token identity on this web client to credit a
     * reward balance to.
     */
    public function fetchSurveyPlatforms(): array
    {
        return $this->apiGet('/api/survey-platforms')['platforms'] ?? [];
    }

    /**
     * A single survey platform's live/coming-soon state and (if live) its
     * unpersonalized available-surveys list - GET
     * /api/survey-platforms/{platform}. No bearer token is sent (this web
     * client has no real login - see SurveyHub.tsx's own docblock), so
     * this always reflects the anonymous view: audience-unrestricted
     * ACTIVE surveys only, no "your responses" section.
     */
    public function fetchSurveyPlatformDetail(string $platformCode): ?array
    {
        try {
            return $this->apiGet('/api/survey-platforms/'.$platformCode);
        } catch (PortalApiException) {
            return null;
        }
    }

    /**
     * A single native survey's public detail (title/description/reward,
     * no questions needed here - this is the deep-link fallback landing
     * page, not a take-survey form, see SurveyDetail.tsx's own docblock).
     * GET /api/survey-platforms/native/{survey} - fully public, no bearer
     * token, same endpoint the mobile app uses for the real take-survey
     * screen.
     */
    public function fetchSurveyDetail(int $surveyId): ?array
    {
        try {
            return $this->apiGet('/api/survey-platforms/native/'.$surveyId);
        } catch (PortalApiException) {
            return null;
        }
    }

    /**
     * GTR Careers job search - GET /api/careers/jobs
     * (Modules\Careers\Http\Controllers\Api\CareersController). Every
     * job's apply_url in the response is already a GTR-owned redirect
     * link, never the raw external URL - nothing extra to do with it
     * here beyond passing it straight through to the frontend.
     *
     * @return array{jobs: array, total: int, page: int, limit: int}
     */
    public function searchJobs(array $params): array
    {
        try {
            return $this->apiGet('/api/careers/jobs', $params);
        } catch (PortalApiException) {
            return ['jobs' => [], 'total' => 0, 'page' => (int) ($params['page'] ?? 1), 'limit' => 20];
        }
    }

    /** One job's detail view - GET /api/careers/jobs/{provider}/{reference}. Null covers both "not found" and "this provider doesn't support single-job lookup" - see CareersController. */
    public function getJobDetail(string $provider, string $reference): ?array
    {
        try {
            $data = $this->apiGet('/api/careers/jobs/'.rawurlencode($provider).'/'.rawurlencode($reference));
        } catch (PortalApiException) {
            return null;
        }

        return $data['job'] ?? null;
    }

    /** GET /api/careers/job-of-the-day - a fixed daily pick, cached portal-side for the day (see JobOfTheDayController). Null means none available yet, not an error. */
    public function getJobOfTheDay(): ?array
    {
        try {
            $data = $this->apiGet('/api/careers/job-of-the-day');
        } catch (PortalApiException) {
            return null;
        }

        return $data['job'] ?? null;
    }

    /**
     * Active website-banner campaigns for one placement - GET
     * /api/advertising/banners?placement=X (Modules\Advertising\Domain\
     * PlacementKey on the portal side - web_home, web_article,
     * web_podcast_series, web_podcast_episode). Fails soft (empty array,
     * not an exception) unlike most other methods here - a broken ad
     * feed must never take the whole page down with it, since callers
     * render it as a small optional slot, not core content.
     */
    public function fetchBanners(string $placement): array
    {
        try {
            return $this->apiGet('/api/advertising/banners', ['placement' => $placement], fast: true)['banners'] ?? [];
        } catch (PortalApiException $e) {
            // Logged, not silent - a bare fail-soft return here previously
            // masked a real bug (query params getting dropped, see this
            // method's own history) with no trace to debug from.
            Log::warning('PortalApiClient::fetchBanners failed', ['placement' => $placement, 'error' => $e->getMessage()]);

            return [];
        }
    }

    /**
     * Active in-site promotional messages - GET
     * /api/advertising/promo-messages. Same fail-soft posture as
     * fetchBanners() above - see that method's docblock.
     */
    public function fetchPromoMessages(): array
    {
        try {
            return $this->apiGet('/api/advertising/promo-messages', fast: true)['messages'] ?? [];
        } catch (PortalApiException $e) {
            Log::warning('PortalApiClient::fetchPromoMessages failed', ['error' => $e->getMessage()]);

            return [];
        }
    }

    /**
     * GhanaTalksRadio's own feature cross-promotion banners (Raffle,
     * Predictions, Quiz, ...) for the homepage - GET
     * /api/engagement-banners. Deliberately separate from fetchBanners()
     * above: that endpoint serves third-party advertiser campaigns
     * (Modules\Advertising), this one serves the station's own features
     * (Modules\Engagement) with no advertiser/campaign concept at all.
     */
    public function fetchEngagementBanners(): array
    {
        try {
            return $this->apiGet('/api/engagement-banners', fast: true)['banners'] ?? [];
        } catch (PortalApiException $e) {
            Log::warning('PortalApiClient::fetchEngagementBanners failed', ['error' => $e->getMessage()]);

            return [];
        }
    }

    /** Open prediction campaigns - GET /api/predictions. */
    public function fetchPredictionList(): array
    {
        return $this->apiGet('/api/predictions')['predictions'] ?? [];
    }

    /**
     * One prediction campaign's fixtures - GET /api/predictions/{slug}.
     * `guestToken` is a browser-localStorage identity with no server-side
     * equivalent - omit it for the SSR pass (returns fixtures with generic/
     * empty my_predictions, still real content for crawlers) and let the
     * client re-fetch with the real guest token to layer in personalization
     * (see resources/js/pages/PredictionDetail.tsx).
     */
    public function fetchPredictionDetail(string $slug, ?string $guestToken = null): ?array
    {
        try {
            $query = $guestToken ? '?guest_token='.rawurlencode($guestToken) : '';

            return $this->apiGet('/api/predictions/'.rawurlencode($slug).$query);
        } catch (PortalApiException) {
            return null;
        }
    }

    /** Open quiz campaigns - GET /api/quizzes. */
    public function fetchQuizList(): array
    {
        return $this->apiGet('/api/quizzes')['quizzes'] ?? [];
    }

    /** One quiz's questions - GET /api/quizzes/{slug}. No guest-specific state before submission, so this SSRs cleanly. */
    public function fetchQuizDetail(string $slug): ?array
    {
        try {
            return $this->apiGet('/api/quizzes/'.rawurlencode($slug));
        } catch (PortalApiException) {
            return null;
        }
    }

    /** Points leaderboard - GET /api/leaderboard?period=... */
    public function fetchLeaderboard(string $period = 'all-time'): array
    {
        return $this->apiGet('/api/leaderboard?period='.rawurlencode($period))['leaderboard'] ?? [];
    }

    /**
     * Mirrors a WordPress-hosted image onto the portal's public GCS
     * bucket - GET /api/social/mirrored-image?url=... (Modules\Content's
     * SocialImageMirrorController). Exists because
     * wordpress.ghanatalksradio.com and this app share one IONOS
     * hosting account's request-rate ceiling; see that controller's own
     * docblock for the full story (a real, confirmed Facebook "Corrupted
     * Image" report that traced back to an account-wide 429, not a
     * broken file). Only ever called for a post's og:image - see
     * SinglePostController::ogImage(), which also wraps this in its own
     * long-lived cache so a given post only pays this round-trip once,
     * not on every pageview. Fails soft (null) like fetchBanners() -
     * a mirror failure should fall back to the raw WordPress URL, never
     * break the page. Deliberately NOT `fast: true` - the very first
     * mirror of a given image downloads it from WordPress and uploads it
     * to GCS synchronously on the portal side, which can easily exceed
     * the 4s fast budget (meant for calls that are already cheap/
     * decorative, not a cold-cache file copy) - every later page view
     * takes the portal's own `exists()` fast-path instead, so this slow
     * path only ever runs once per post.
     */
    public function mirrorImage(string $wordPressImageUrl): ?string
    {
        try {
            return $this->apiGet('/api/social/mirrored-image', ['url' => $wordPressImageUrl])['url'] ?? null;
        } catch (PortalApiException $e) {
            Log::warning('PortalApiClient::mirrorImage failed', ['url' => $wordPressImageUrl, 'error' => $e->getMessage()]);

            return null;
        }
    }

    /**
     * Server-side port of src/api/youtube.ts - ghanatalksradio-portal's
     * YoutubeController, GET /api/youtube/videos. Live + recent uploads
     * for the channel.
     *
     * @return array{live: array, videos: array, nextPageToken: ?string}
     */
    public function fetchYoutubeVideos(?string $pageToken = null): array
    {
        $query = $pageToken ? ['page_token' => $pageToken] : [];
        $json = $this->rawGet('/api/youtube/videos', $query, fast: true);

        if (! $json || ($json['status'] ?? false) !== true) {
            throw new PortalApiException($json['message'] ?? 'YouTube API request failed');
        }

        return [
            'live' => $json['data']['live'] ?? [],
            'videos' => $json['data']['videos'] ?? [],
            'nextPageToken' => $json['data']['next_page_token'] ?? null,
        ];
    }

    /**
     * Everything HomeController's homepage render needs from the portal,
     * fetched in ONE parallel batch via poolGet() instead of 8 sequential
     * calls (fetchBanners() x5, fetchEngagementBanners(),
     * getPodcastEpisodes(), fetchYoutubeVideos()) - see poolGet()'s own
     * docblock for the measured incident this fixes. Applies the exact
     * same shape/fallback each of those individual methods already
     * returns, so this is a drop-in replacement for calling all of them -
     * HomeController doesn't need any of its own logic to change.
     *
     * $podcastPage is passed straight through to the podcast-episodes
     * path exactly as HomeController already calls getPodcastEpisodes() -
     * not renamed to "count" here despite how HomeController's own
     * PODCAST_COUNT constant reads, since changing what value actually
     * gets sent is a separate, unrelated question from this method's own
     * job (fetching in parallel, not changing what's fetched).
     *
     * @return array{banners: array, secondaryBanners: array, houseHorizontalBanners: array, houseVerticalBanners: array, houseSquareBanners: array, engagementBanners: array, podcast: array{episodes: array, page: int, hasMore: bool}, youtubeVideos: array, youtubeError: bool}
     */
    public function fetchHomepagePortalData(int $podcastPage): array
    {
        $raw = $this->poolGet([
            'banners' => ['path' => '/api/advertising/banners', 'query' => ['placement' => 'web_home'], 'fast' => true],
            'secondaryBanners' => ['path' => '/api/advertising/banners', 'query' => ['placement' => 'web_home_secondary'], 'fast' => true],
            'houseHorizontalBanners' => ['path' => '/api/advertising/banners', 'query' => ['placement' => 'web_house_horizontal'], 'fast' => true],
            'houseVerticalBanners' => ['path' => '/api/advertising/banners', 'query' => ['placement' => 'web_house_vertical'], 'fast' => true],
            'houseSquareBanners' => ['path' => '/api/advertising/banners', 'query' => ['placement' => 'web_house_square'], 'fast' => true],
            'engagementBanners' => ['path' => '/api/engagement-banners', 'fast' => true],
            'podcast' => ['path' => "/api/podcasts/episodes/{$podcastPage}"],
            'youtube' => ['path' => '/api/youtube/videos', 'fast' => true],
        ]);

        $podcastData = $raw['podcast'];
        $podcast = $podcastData ? [
            'episodes' => array_map(
                fn ($item) => $this->toEpisode($item['episode'], $this->toShow($item['series'])),
                $podcastData['episodes']
            ),
            'page' => $podcastData['page'],
            'hasMore' => $podcastData['has_more'],
        ] : ['episodes' => [], 'page' => 1, 'hasMore' => false];

        $youtubeData = $raw['youtube'];

        return [
            'banners' => $raw['banners']['banners'] ?? [],
            'secondaryBanners' => $raw['secondaryBanners']['banners'] ?? [],
            'houseHorizontalBanners' => $raw['houseHorizontalBanners']['banners'] ?? [],
            'houseVerticalBanners' => $raw['houseVerticalBanners']['banners'] ?? [],
            'houseSquareBanners' => $raw['houseSquareBanners']['banners'] ?? [],
            'engagementBanners' => $raw['engagementBanners']['banners'] ?? [],
            'podcast' => $podcast,
            'youtubeVideos' => $youtubeData['videos'] ?? [],
            'youtubeError' => $youtubeData === null,
        ];
    }

    /**
     * $path is absolute from the portal root, e.g. '/api/podcasts/episodes/1'.
     * Query params must go through $query, not appended to $path - Laravel's
     * HTTP client sets Guzzle's 'query' option from this array even when
     * it's empty, which overwrites (not merges with) any query string
     * already embedded in $path. Found via fetchBanners() silently getting
     * "placement is required" back from the portal - it built its own
     * '?placement=...' string into $path while $query defaulted to [].
     */
    private function apiGet(string $path, array $query = [], bool $fast = false): array
    {
        $json = $this->rawGet($path, $query, $fast);

        if (! $json) {
            throw new PortalApiException('Portal API request failed');
        }

        if (($json['status'] ?? true) === false) {
            throw new PortalApiException($json['message'] ?? 'Portal API returned an error');
        }

        // A response that isn't the expected {status, data} envelope at all
        // (e.g. a 422 validation-error shape - {message, errors}, no
        // 'status' or 'data' key - hit directly via an unknown `placement`
        // value) previously crashed here with an uncaught "Undefined array
        // key" ErrorException instead of the PortalApiException every
        // caller already catches - defeating every fail-soft method's own
        // documented contract (fetchBanners() etc.) and taking the whole
        // page down over what should be an empty-array fallback.
        if (! array_key_exists('data', $json)) {
            throw new PortalApiException($json['message'] ?? 'Portal API returned an unexpected response shape');
        }

        return $json['data'];
    }

    /**
     * Every portal call goes through here so timeouts/retries are applied
     * uniformly. Found the hard way (sitemap generation): with no explicit
     * timeout, a stalled TCP handshake to a slow/unreachable host can hang
     * a request indefinitely rather than failing fast - connectTimeout
     * bounds the handshake itself, timeout bounds the whole request, retry
     * absorbs a lone transient blip without surfacing an error for it.
     *
     * retry()'s 4th param ($throw) defaults to true, so once retries are
     * exhausted a non-2xx response throws Illuminate\Http\Client\
     * RequestException - a different exception than the ConnectionException
     * a network-level failure throws. Both get wrapped in PortalApiException
     * here so every caller's `catch (PortalApiException)` (or lack of one,
     * for callers that intentionally let failures surface) behaves the same
     * regardless of which way the portal call failed. Found via
     * fetchBanners()/fetchPromoMessages() 500ing the whole page on a real
     * non-2xx response from the portal - see those methods' docblocks.
     */
    /**
     * Every GET through this client is "the same for every visitor" data
     * (see class docblock) with no caching at all until now - each one was
     * a real network round-trip to ghanatalksradio-portal on every single
     * page render, a large chunk of this app's page-load time. A short TTL
     * collapses repeat requests for the same endpoint+query onto one real
     * call while staying reasonably fresh. Cache::remember() never caches a
     * thrown exception, so a failed/unreachable call is retried on the very
     * next request rather than serving a cached failure for the full TTL.
     */
    private const CACHE_TTL_SECONDS = 120;

    /**
     * `$fast` bounds a call to a few seconds with no retry, for calls
     * whose data is purely decorative on the page that requests it
     * (banners, promo messages, the YouTube teaser strip) - a missing
     * banner is a visually empty slot, not a broken page, so it's never
     * worth holding a PHP-FPM worker for the full 10s-connect/15s-
     * timeout/2-retries budget content-critical calls get. Found via a
     * real production incident: HomeController makes 8-9 sequential
     * portal+WordPress calls per request on shared hosting with a small
     * worker pool - one slow decorative call at the default budget could
     * hold a worker for up to ~75s, and a few concurrent requests doing
     * that exhausts the whole pool.
     */
    /**
     * Fires every request that isn't already cached IN PARALLEL via
     * Http::pool(), instead of HomeController calling fetchBanners() x5,
     * fetchEngagementBanners(), getPodcastEpisodes() and
     * fetchYoutubeVideos() one after another. A real, measured production
     * incident: with the portal slow/unreachable, those 8 sequential
     * calls alone (each paying its own connect/request timeout in turn)
     * accounted for the majority of a homepage render that took 72+
     * seconds to degrade to empty sections even AFTER the WordPress side
     * was separately fixed for the same class of bug - pooling means the
     * total wait is bounded by the SLOWEST single call, not the sum of
     * all of them.
     *
     * Same cache keys as rawGet() (cacheKey() is shared), so a request
     * already cached from an earlier sequential call is skipped here, and
     * a result fetched here is available to a later sequential call too -
     * the two paths are fully interchangeable, just different fetch
     * strategies over the same cache.
     *
     * A pooled request's connection/timeout failure does NOT throw the
     * way a single ->get() call does - Http::pool() returns the
     * exception object itself in that slot instead, so each result needs
     * its own check rather than a surrounding try/catch.
     *
     * @param  array<string, array{path: string, query?: array, fast?: bool}>  $requests  keyed by caller-chosen name
     * @return array<string, array|null> same keys, each the decoded {data} payload, or null on a miss/failure (same contract as apiGet() throwing - caller decides the fallback)
     */
    public function poolGet(array $requests): array
    {
        $results = [];
        $toFetch = [];

        foreach ($requests as $key => $request) {
            $query = $request['query'] ?? [];
            $cacheKey = $this->cacheKey($request['path'], $query);
            $cached = Cache::get($cacheKey);

            if ($cached !== null) {
                $results[$key] = $this->extractData($cached);
            } else {
                $toFetch[$key] = $request + ['query' => $query, 'cacheKey' => $cacheKey];
            }
        }

        if ($toFetch === []) {
            return $results;
        }

        $responses = Http::pool(function (\Illuminate\Http\Client\Pool $pool) use ($toFetch) {
            foreach ($toFetch as $key => $request) {
                $fast = $request['fast'] ?? false;
                $pool->as($key)
                    ->acceptJson()
                    ->connectTimeout($fast ? 3 : 5)
                    ->timeout($fast ? 4 : 8)
                    ->get("{$this->portalUrl}{$request['path']}", $request['query']);
            }
        });

        foreach ($toFetch as $key => $request) {
            $response = $responses[$key] ?? null;

            if (! $response instanceof \Illuminate\Http\Client\Response || $response->failed()) {
                Log::warning('PortalApiClient::poolGet failed', ['key' => $key, 'path' => $request['path'], 'query' => $request['query']]);
                $results[$key] = null;

                continue;
            }

            $json = $response->json();
            Cache::put($request['cacheKey'], $json, self::CACHE_TTL_SECONDS);
            $results[$key] = $this->extractData($json);
        }

        return $results;
    }

    private function cacheKey(string $path, array $query): string
    {
        return 'portal_api:'.$path.'?'.http_build_query($query);
    }

    /** @return array|null the {data} payload, or null if the envelope indicates failure/an unexpected shape - same checks apiGet() throws on. */
    private function extractData(?array $json): ?array
    {
        if (! $json || ($json['status'] ?? true) === false || ! array_key_exists('data', $json)) {
            return null;
        }

        return $json['data'];
    }

    private function rawGet(string $path, array $query = [], bool $fast = false): ?array
    {
        $cacheKey = $this->cacheKey($path, $query);

        return Cache::remember($cacheKey, self::CACHE_TTL_SECONDS, function () use ($path, $query, $fast) {
            try {
                $client = Http::acceptJson()
                    ->connectTimeout($fast ? 3 : 10)
                    ->timeout($fast ? 4 : 15);

                $response = $fast ? $client->get("{$this->portalUrl}{$path}", $query)
                    : $client->retry(2, 1000)->get("{$this->portalUrl}{$path}", $query);
            } catch (\Illuminate\Http\Client\ConnectionException $e) {
                throw new PortalApiException("Portal API unreachable: {$e->getMessage()}");
            } catch (\Illuminate\Http\Client\RequestException $e) {
                throw new PortalApiException("Portal API request failed: {$e->getMessage()}");
            }

            return $response->json();
        });
    }

    private function toShow(array $series): array
    {
        return [
            'id' => $series['slug'],
            'name' => $series['name'],
            'imageUrl' => $series['image_url'] ?? null,
            'slug' => $series['slug'],
            'external' => $series['external_links'] ?? [],
        ];
    }

    private function toEpisode(array $episode, array $show): array
    {
        $audioUrl = $episode['audio_url'] ?? null;
        $isPlayable = $audioUrl && filter_var($audioUrl, FILTER_VALIDATE_URL)
            && (str_starts_with($audioUrl, 'http://') || str_starts_with($audioUrl, 'https://'));

        return [
            'id' => "{$show['slug']}-{$episode['slug']}",
            'showId' => $show['slug'],
            'startDate' => $episode['published_at'] ?? '',
            'endDate' => '',
            'audioUrl' => $isPlayable ? $audioUrl : null,
            'description' => trim((string) ($episode['description'] ?? '')),
            'title' => trim((string) ($episode['title'] ?? '')) ?: 'Untitled episode',
            'slug' => $episode['slug'],
            'external' => $episode['external_links'] ?? [],
            'show' => $show,
        ];
    }
}
