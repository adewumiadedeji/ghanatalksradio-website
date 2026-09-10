<?php

namespace App\Http\Middleware;

use App\Services\Nav\NavResolver;
use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Services\WordPress\Contracts\WordPressRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    public function __construct(
        private WordPressRepository $wp,
        private PortalApiClient $portal,
    ) {}

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'nav' => fn () => $this->resolveNav(),
            'promoMessage' => fn () => $this->resolvePromoMessage(),
        ];
    }

    /**
     * Site nav data - resolved categories (grouped per NavStructure, plus
     * "More" overflow) and the podcast show list (for the Podcast nav
     * dropdown). Computed once per request via both backends (WordPress +
     * portal), so each half is cached briefly rather than hit on every
     * single page load - matches the spirit of the old SPA's 30min
     * react-query staleTime for the same data, just server-side now.
     *
     * Two SEPARATE cache entries on purpose, not one combined 'site-nav'
     * key (that was the original shape, and the actual bug: a podcast
     * series rename/is_favorite toggle/status change sat stale in the
     * Podcast dropdown for up to 5 minutes for every visitor, with no way
     * for a single user to force a refresh - reloading or clearing your
     * own browser cache does nothing when the origin itself is serving
     * the same cached response to everyone). Splitting them means the
     * podcast side can run a much shorter TTL without also shortening -
     * and adding load from - the WordPress category nav, which doesn't
     * have this problem.
     */
    private function resolveNav(): array
    {
        return [
            ...Cache::remember('site-nav-categories', now()->addMinutes(5), function () {
                $categories = $this->wp->getAllCategories();

                return NavResolver::buildResolvedNav($categories);
            }),
            'podcastShows' => $this->resolvePodcastShows(),
        ];
    }

    /** Deliberately much shorter than the categories' 5min above - see resolveNav()'s docblock. */
    private function resolvePodcastShows(): array
    {
        return Cache::remember('site-nav-podcast-shows', now()->addSeconds(30), function () {
            try {
                return $this->portal->fetchPodcastShowList(menuOnly: true);
            } catch (PortalApiException) {
                return [];
            }
        });
    }

    /**
     * Global, not per-page - PromoMessageBar (mounted once in Layout.tsx)
     * reads this the same way MobileNavDrawer reads 'nav'. Cached same as
     * resolveNav() above and for the same reason (avoid hitting the portal
     * on every single page load for content that only changes when staff
     * changes a campaign).
     */
    private function resolvePromoMessage(): ?array
    {
        return Cache::remember('site-promo-message', now()->addMinutes(5), function () {
            $messages = $this->portal->fetchPromoMessages();

            return $messages[0] ?? null;
        });
    }
}
