import type { PodcastExternalLinks } from './podcast';
import type { PromoMessageDto } from './advertising';

export interface ResolvedNavChild {
  label: string;
  slug: string;
}

export interface ResolvedNavGroup {
  label: string;
  slug?: string | null;
  children: ResolvedNavChild[];
}

export interface PodcastShowNavItem {
  id: string;
  name: string;
  imageUrl: string | null;
  slug: string;
  external: PodcastExternalLinks;
}

/** Shape of the 'nav' prop shared on every Inertia response - see HandleInertiaRequests::share(). */
export interface ResolvedNav {
  groups: ResolvedNavGroup[];
  overflow: ResolvedNavChild[];
  podcastShows: PodcastShowNavItem[];
}

export interface SharedPageProps {
  nav: ResolvedNav;
  /** Shared on every Inertia response - see HandleInertiaRequests::resolvePromoMessage(). */
  promoMessage: PromoMessageDto | null;
  [key: string]: unknown;
}
