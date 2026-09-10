<?php

namespace App\Console\Commands;

use App\Services\IndexNow\IndexNowService;
use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Services\WordPress\Contracts\WordPressRepository;
use App\Support\CareersLandings;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * Server-side port of the old Vite SPA's public/generate-sitemap.php.
 * Same output shape (sitemap-index.xml + sitemap-pages.xml +
 * sitemap-posts-N.xml, chunked at 40,000 URLs/file per the sitemaps.org
 * 50,000-URL cap), written to public/ so the web server serves them as
 * plain static files - same as before.
 *
 * The old script needed a secret-key-protected public HTTP endpoint
 * because a static site has no other way to run PHP on a schedule. This
 * is a real artisan command instead, meant to run via Laravel's scheduler
 * (see routes/console.php) triggered by a real cron calling
 * `php artisan schedule:run` - no public URL, no secret key needed.
 */
class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Regenerate sitemap-index.xml + sitemap-pages.xml + sitemap-posts-N.xml in public/';

    /** Safely under the sitemaps.org 50,000-URL-per-file hard limit, leaving headroom for growth between runs. */
    private const POSTS_PER_FILE = 40000;

    public function handle(WordPressRepository $wp, PortalApiClient $portal, IndexNowService $indexNow): int
    {
        $siteUrl = rtrim(config('app.url'), '/');
        $today = now()->toDateString();

        // ─── Pages sitemap: home, categories, podcast shows/episodes, static ───

        $pageUrls = [];
        $indexNowUrls = [];

        $pageUrls[] = $this->urlEntry("{$siteUrl}/", $today, 'hourly', '1.0');
        $indexNowUrls[] = "{$siteUrl}/";

        $pageUrls[] = $this->urlEntry("{$siteUrl}/podcast", $today, 'daily', '0.8');
        $pageUrls[] = $this->urlEntry("{$siteUrl}/playlist", $today, 'weekly', '0.7');

        // GTR Careers - the plain search page plus every curated SEO
        // landing page (see CareersLandings). Job DETAIL pages
        // (/jobs/{provider}/{reference}) are deliberately excluded: they
        // only resolve through JobDetailCache's 1-hour click-through
        // cache (Jooble/Adzuna have no permanent job-by-id endpoint), so
        // a URL a crawler visits after that window has expired would
        // 404 - the opposite of what a sitemap should promise. These
        // landing pages are real, stable, evergreen URLs whose
        // underlying results change constantly, hence 'daily' + always
        // today's lastmod.
        $pageUrls[] = $this->urlEntry("{$siteUrl}/jobs", $today, 'daily', '0.8');
        $indexNowUrls[] = "{$siteUrl}/jobs";
        foreach (array_keys(CareersLandings::all()) as $slug) {
            $loc = "{$siteUrl}/jobs/{$slug}";
            $pageUrls[] = $this->urlEntry($loc, $today, 'daily', '0.7');
            $indexNowUrls[] = $loc;
        }

        $categories = $wp->getAllCategories();
        foreach ($categories as $category) {
            $pageUrls[] = $this->urlEntry("{$siteUrl}/category/{$category['slug']}", '', 'daily', '0.6');
        }
        $catCount = count($categories);

        $showCount = 0;
        try {
            $shows = $portal->fetchPodcastShowList();
            foreach ($shows as $show) {
                $pageUrls[] = $this->urlEntry("{$siteUrl}/podcast/{$show['slug']}", '', 'daily', '0.6');
                $showCount++;
            }
        } catch (PortalApiException $e) {
            $this->warn("Podcast show list failed: {$e->getMessage()}");
        }

        $episodeCount = 0;
        try {
            $page = 1;
            while (true) {
                $result = $portal->getPodcastEpisodes($page);
                if (empty($result['episodes'])) {
                    break;
                }
                foreach ($result['episodes'] as $episode) {
                    $mod = $episode['startDate'] ? date('Y-m-d', strtotime($episode['startDate'])) : '';
                    $pageUrls[] = $this->urlEntry(
                        "{$siteUrl}/podcast/{$episode['show']['slug']}/{$episode['slug']}",
                        $mod,
                        'monthly',
                        '0.5'
                    );
                    $episodeCount++;
                }
                if (! $result['hasMore']) {
                    break;
                }
                $page++;
            }
        } catch (PortalApiException $e) {
            $this->warn("Podcast episodes failed: {$e->getMessage()}");
        }

        $pagesWritten = $this->writeUrlset('sitemap-pages.xml', $pageUrls);

        // ─── Posts sitemaps: chunked across files ───

        $posts = $wp->getAllPostSlugsForSitemap(function (int $page, int $total) {
            if ($page % 10 === 0) {
                $this->info("  ...page {$page}, {$total} posts collected so far");
            }
        });
        $postFiles = [];
        $chunk = [];

        foreach ($posts as $post) {
            $mod = $post['modified'] ? date('Y-m-d', strtotime($post['modified'])) : '';
            $loc = "{$siteUrl}/post/{$post['slug']}";
            $chunk[] = $this->urlEntry($loc, $mod, 'weekly', '0.7');

            // Only today's new/edited posts, not the full ~10k-post
            // backlog on every run - IndexNow is a "this just changed"
            // ping, not a bulk resubmission, and pinging Bing/Yandex with
            // the entire archive every time this command runs (daily cron
            // + every WordPress publish webhook) would look like spam
            // rather than a real freshness signal. This was previously
            // never pinged for any post, new or old - found while
            // diagnosing why brand-new articles weren't indexed quickly.
            if ($mod === $today) {
                $indexNowUrls[] = $loc;
            }

            if (count($chunk) >= self::POSTS_PER_FILE) {
                $postFiles[] = 'sitemap-posts-'.(count($postFiles) + 1).'.xml';
                $this->writeUrlset(end($postFiles), $chunk);
                $chunk = [];
            }
        }
        if (! empty($chunk)) {
            $postFiles[] = 'sitemap-posts-'.(count($postFiles) + 1).'.xml';
            $this->writeUrlset(end($postFiles), $chunk);
        }

        // ─── Sitemap index ───

        $indexEntries = [$this->sitemapEntry("{$siteUrl}/sitemap-pages.xml", $today)];
        foreach ($postFiles as $file) {
            $indexEntries[] = $this->sitemapEntry("{$siteUrl}/{$file}", $today);
        }

        $indexXml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n"
            .implode('', $indexEntries)
            .'</sitemapindex>';

        file_put_contents(public_path('sitemap-index.xml'), $indexXml);

        // ─── IndexNow: ask Bing/Yandex to re-crawl the pages whose
        // underlying content changes constantly (home, GTR Careers) sooner
        // than their own schedule would. Google has no equivalent open
        // ping - see IndexNowService's own docblock. No-op if
        // INDEXNOW_KEY isn't configured.
        $indexNow->submit($indexNowUrls);

        $summary = "sitemap-index.xml + sitemap-pages.xml ({$pagesWritten} URLs: {$catCount} categories, "
            ."{$showCount} podcast shows, {$episodeCount} episodes) + ".count($postFiles)
            .' posts file(s) ('.count($posts).' posts total)'
            .($indexNow->isEnabled() ? ' + IndexNow ping ('.count($indexNowUrls).' URLs)' : '');

        Log::info("Sitemap generated: {$summary}");
        $this->info("Done. {$summary}");

        return self::SUCCESS;
    }

    private function urlEntry(string $loc, string $lastmod = '', string $changefreq = 'weekly', string $priority = '0.7'): string
    {
        $out = "  <url>\n    <loc>".$this->xmlEscape($loc)."</loc>\n";
        if ($lastmod) {
            $out .= "    <lastmod>{$lastmod}</lastmod>\n";
        }
        $out .= "    <changefreq>{$changefreq}</changefreq>\n";
        $out .= "    <priority>{$priority}</priority>\n";
        $out .= "  </url>\n";

        return $out;
    }

    private function sitemapEntry(string $loc, string $lastmod): string
    {
        return "  <sitemap>\n    <loc>".$this->xmlEscape($loc)."</loc>\n    <lastmod>{$lastmod}</lastmod>\n  </sitemap>\n";
    }

    private function xmlEscape(string $str): string
    {
        return htmlspecialchars($str, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }

    /** @param  array<int, string>  $urlEntries */
    private function writeUrlset(string $filename, array $urlEntries): int
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n"
            .implode('', $urlEntries)
            .'</urlset>';

        file_put_contents(public_path($filename), $xml);

        return count($urlEntries);
    }
}
