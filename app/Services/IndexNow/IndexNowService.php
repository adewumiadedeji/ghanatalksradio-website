<?php

namespace App\Services\IndexNow;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * IndexNow (indexnow.org) - a real-time "this URL changed, come get it"
 * ping supported by Bing and Yandex. Google has no open equivalent (its
 * Indexing API is officially restricted to JobPosting/BroadcastEvent
 * pages only, and needs its own OAuth service account + Search Console
 * verification - a separate, bigger piece of work than this).
 *
 * Complements the sitemap rather than replacing it: the sitemap is what
 * a crawler discovers on its own schedule, this is what asks it to
 * revisit sooner than that schedule otherwise would. Needs no account or
 * credentials beyond the key file at public/{key}.txt, which proves
 * domain ownership - see config/services.php's 'indexnow.key' and
 * GenerateSitemap, which fires this after every regeneration (both the
 * daily cron and the real-time WordPress/portal publish webhook run
 * through that same command).
 */
class IndexNowService
{
    private const ENDPOINT = 'https://api.indexnow.org/indexnow';

    private readonly ?string $key;

    /**
     * Config read directly in a no-arg constructor - same pattern as
     * PortalApiClient - since Laravel's container can't auto-resolve a
     * plain scalar constructor argument without an explicit binding.
     *
     * Deliberately 'bing_key' (INDEXNOW_BING_KEY), not 'key'
     * (INDEXNOW_KEY) - see config/services.php's own docblock. 'key' is
     * reserved for something else already using that value; this is the
     * dedicated key actually issued by Bing Webmaster Tools for this
     * protocol, with its own matching public/{key}.txt deployed.
     */
    public function __construct()
    {
        $this->key = config('services.indexnow.bing_key');
    }

    public function isEnabled(): bool
    {
        return filled($this->key);
    }

    /** @param  array<int, string>  $urls */
    public function submit(array $urls): void
    {
        if (! $this->isEnabled() || empty($urls)) {
            return;
        }

        $host = parse_url($urls[0], PHP_URL_HOST);

        if (! $host) {
            return;
        }

        try {
            Http::timeout(8)->post(self::ENDPOINT, [
                'host' => $host,
                'key' => $this->key,
                'keyLocation' => "https://{$host}/{$this->key}.txt",
                'urlList' => array_values($urls),
            ]);
        } catch (Throwable $e) {
            // Fail-soft, same posture as PortalApiClient - a slow/down
            // IndexNow endpoint must never block sitemap generation.
            Log::warning('IndexNow submission failed', ['error' => $e->getMessage()]);
        }
    }
}
