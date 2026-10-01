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

        // Not pushed to IndexNow - the homepage and these landing pages
        // are static URLs that don't meaningfully "just change" on every
        // run the way a new/edited post does. This command regenerates on
        // every WordPress publish webhook (potentially dozens of times a
        // day), so unconditionally re-pinging the same unchanged URLs
        // every single run is exactly the "spam rather than a real
        // freshness signal" problem the posts-only IndexNow filter below
        // was built to avoid - found live when Bing's own IndexNow
        // submission export showed these static URLs resubmitted on every
        // run alongside genuinely new articles.
        $pageUrls[] = $this->urlEntry("{$siteUrl}/", $today, 'hourly', '1.0');

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
        foreach (array_keys(CareersLandings::all()) as $slug) {
            $loc = "{$siteUrl}/jobs/{$slug}";
            $pageUrls[] = $this->urlEntry($loc, $today, 'daily', '0.7');
        }

        $categories = $wp->getAllCategories();
        // /category itself, not just each /category/{slug} - a real,
        // crawlable directory page so Google has one stable URL listing
        // every category, rather than categories only being discoverable
        // through the header's nav dropdown (client-rendered, not a
        // crawlable link).
        $pageUrls[] = $this->urlEntry("{$siteUrl}/category", $today, 'weekly', '0.6');
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
        $postFileLastmods = [];
        $chunk = [];
        $chunkMaxMod = '';

        foreach ($posts as $post) {
            $mod = $post['modified'] ? date('Y-m-d', strtotime($post['modified'])) : '';
            $loc = "{$siteUrl}/post/{$post['slug']}";
            $chunk[] = $this->urlEntry($loc, $mod, 'weekly', '0.7');
            // 'Y-m-d' strings sort lexicographically, so a plain string
            // comparison is a correct max-date check without parsing.
            $chunkMaxMod = $mod > $chunkMaxMod ? $mod : $chunkMaxMod;

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
                $postFileLastmods[] = $chunkMaxMod ?: $today;
                $this->writeUrlset(end($postFiles), $chunk);
                $chunk = [];
                $chunkMaxMod = '';
            }
        }
        if (! empty($chunk)) {
            $postFiles[] = 'sitemap-posts-'.(count($postFiles) + 1).'.xml';
            $postFileLastmods[] = $chunkMaxMod ?: $today;
            $this->writeUrlset(end($postFiles), $chunk);
        }

        // ─── Sitemap index ───

        // Each sub-sitemap's own lastmod reflects the real max modified
        // date of the posts actually inside it, not a blanket $today for
        // every file on every run - found live via Bing Webmaster Tools
        // showing each individual sub-sitemap's own crawl lagging days
        // behind the index's: claiming all three sub-sitemaps "changed
        // today" on every single regeneration (this command runs on every
        // WordPress publish webhook, easily dozens of times a day) taught
        // Bing to distrust the freshness signal entirely and fall back to
        // its own crawl scheduling instead. sitemap-posts-1.xml in
        // particular (the oldest, largest, most static chunk - new posts
        // only ever land in the newest/last chunk) essentially never
        // actually changes, so it should almost never claim "today".
        $indexEntries = [$this->sitemapEntry("{$siteUrl}/sitemap-pages.xml", $today)];
        foreach ($postFiles as $i => $file) {
            $indexEntries[] = $this->sitemapEntry("{$siteUrl}/{$file}", $postFileLastmods[$i]);
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
