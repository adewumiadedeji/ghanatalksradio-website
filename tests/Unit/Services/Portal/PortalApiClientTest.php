<?php

namespace Tests\Unit\Services\Portal;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Sleep;
use Tests\TestCase;

class PortalApiClientTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config(['services.portal.api_url' => 'https://portal.test']);

        // retry(2, 1000) really sleeps between attempts unless faked.
        Sleep::fake();
    }

    public function test_non_2xx_response_is_wrapped_in_portal_api_exception_not_request_exception(): void
    {
        Http::fake([
            'portal.test/*' => Http::response('Internal Server Error', 500),
        ]);

        $this->expectException(PortalApiException::class);

        (new PortalApiClient)->fetchActiveRaffles();
    }

    public function test_connection_failure_is_wrapped_in_portal_api_exception(): void
    {
        Http::fake([
            'portal.test/*' => fn () => throw new \Illuminate\Http\Client\ConnectionException('Connection failed'),
        ]);

        $this->expectException(PortalApiException::class);

        (new PortalApiClient)->fetchActiveRaffles();
    }

    public function test_fetch_banners_fails_soft_on_non_2xx_response(): void
    {
        Http::fake([
            'portal.test/*' => Http::response('Not Found', 404),
        ]);

        $this->assertSame([], (new PortalApiClient)->fetchBanners('web_home'));
    }

    /**
     * Real crash found live: a 200/2xx response shaped like a Laravel
     * validation-error body ({message, errors}, no 'status' or 'data' key
     * at all - e.g. hit via an unknown `placement` value the portal
     * doesn't recognize yet) previously reached `return $json['data']`
     * unguarded and threw an uncaught "Undefined array key 'data'"
     * ErrorException, not the PortalApiException every caller already
     * catches - taking the whole page down instead of failing soft to [].
     */
    public function test_fetch_banners_fails_soft_on_a_response_with_no_data_key(): void
    {
        Http::fake([
            'portal.test/*' => Http::response(['message' => 'The selected placement is invalid.', 'errors' => ['placement' => ['The selected placement is invalid.']]], 200),
        ]);

        $this->assertSame([], (new PortalApiClient)->fetchBanners('web_video'));
    }

    public function test_fetch_promo_messages_fails_soft_on_non_2xx_response(): void
    {
        Http::fake([
            'portal.test/*' => Http::response('Internal Server Error', 500),
        ]);

        $this->assertSame([], (new PortalApiClient)->fetchPromoMessages());
    }

    public function test_fetch_active_raffles_returns_data_on_success(): void
    {
        Http::fake([
            'portal.test/*' => Http::response(['status' => true, 'data' => ['raffles' => [['id' => 1]]]], 200),
        ]);

        $this->assertSame([['id' => 1]], (new PortalApiClient)->fetchActiveRaffles());
    }

    /**
     * Regression test for the "page 1 of 2" -> "page 2 of 3" bug - total
     * pages must be computed from the real episode count returned by the
     * backend, not derived from a page-by-page hasMore flag (which is
     * mathematically guaranteed to increment by 1 on every page forward
     * regardless of how many episodes actually exist).
     */
    public function test_get_podcast_episodes_by_show_slug_reports_a_stable_total_page_count(): void
    {
        $series = ['name' => 'DJ ROK Music Show', 'slug' => 'dj-rok-music-show'];
        $episodes = array_map(
            fn ($i) => ['title' => "Episode {$i}", 'slug' => "episode-{$i}", 'published_at' => now()->subDays($i)->toIso8601String()],
            range(1, 25)
        );

        Http::fake([
            'portal.test/*' => Http::response(['status' => true, 'data' => ['series' => $series, 'episodes' => $episodes]], 200),
        ]);

        $client = new PortalApiClient;
        $page1 = $client->getPodcastEpisodesByShowSlug('dj-rok-music-show', 1, 10);
        $page2 = $client->getPodcastEpisodesByShowSlug('dj-rok-music-show', 2, 10);
        $page3 = $client->getPodcastEpisodesByShowSlug('dj-rok-music-show', 3, 10);

        // 25 episodes at 10 per page = 3 total pages, reported identically
        // on every page - the whole point of the fix.
        $this->assertSame(3, $page1['totalPages']);
        $this->assertSame(3, $page2['totalPages']);
        $this->assertSame(3, $page3['totalPages']);
        $this->assertCount(10, $page1['episodes']);
        $this->assertCount(10, $page2['episodes']);
        $this->assertCount(5, $page3['episodes']);
    }

    public function test_get_podcast_episodes_by_show_slug_reports_one_total_page_for_an_empty_show(): void
    {
        Http::fake([
            'portal.test/*' => Http::response(['status' => true, 'data' => [
                'series' => ['name' => 'Empty Show', 'slug' => 'empty-show'],
                'episodes' => [],
            ]], 200),
        ]);

        $result = (new PortalApiClient)->getPodcastEpisodesByShowSlug('empty-show');

        $this->assertSame(1, $result['totalPages']);
        $this->assertSame([], $result['episodes']);
    }

    public function test_search_jobs_fails_soft_to_an_empty_result_on_a_portal_error(): void
    {
        Http::fake([
            'portal.test/*' => Http::response('Internal Server Error', 500),
        ]);

        $result = (new PortalApiClient)->searchJobs(['q' => 'radio presenter', 'page' => 2]);

        $this->assertSame(['jobs' => [], 'total' => 0, 'page' => 2, 'limit' => 20], $result);
    }

    public function test_search_jobs_returns_data_on_success(): void
    {
        Http::fake([
            'portal.test/*' => Http::response(['status' => true, 'data' => [
                'jobs' => [['title' => 'Radio Presenter']],
                'total' => 1,
                'page' => 1,
                'limit' => 20,
            ]], 200),
        ]);

        $result = (new PortalApiClient)->searchJobs(['q' => 'radio presenter']);

        $this->assertSame([['title' => 'Radio Presenter']], $result['jobs']);
        $this->assertSame(1, $result['total']);
    }

    public function test_get_job_detail_returns_null_on_a_portal_error(): void
    {
        Http::fake([
            'portal.test/*' => Http::response('Not Found', 404),
        ]);

        $this->assertNull((new PortalApiClient)->getJobDetail('jooble', '123'));
    }

    public function test_get_job_detail_returns_the_job_on_success(): void
    {
        Http::fake([
            'portal.test/*' => Http::response(['status' => true, 'data' => [
                'job' => ['title' => 'Radio Presenter', 'source' => 'jooble'],
            ]], 200),
        ]);

        $job = (new PortalApiClient)->getJobDetail('jooble', '123');

        $this->assertSame('Radio Presenter', $job['title']);
    }
}
