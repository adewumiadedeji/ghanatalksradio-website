import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { BannerDto } from '../types/advertising';

/**
 * Renders the real, campaign-backed advertiser banner(s) for one placement
 * (portal's Advertising module - `type = website_banner` campaigns),
 * resolved server-side and passed as the `banners` prop by each page's
 * controller (see PortalApiClient::fetchBanners()). Distinct from
 * AdSlot.tsx, which is Google AdSense - unrelated ad network, unrelated
 * data source. Renders nothing at all when there's no active campaign for
 * this placement, same as AdSlot's own fail-soft behavior.
 *
 * More than one active campaign/creative can legitimately target the same
 * placement at the same size (PublicBannerController returns all of
 * them, in campaign-priority order) - previously every page controller
 * truncated that to just the first one ([0] ?? null), so a second
 * concurrently-running campaign was silently never shown at all. This
 * rotates through the full set instead, one at a time.
 */
const ROTATE_INTERVAL_MS = 7000;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.div`
  display: block;
  margin: 1.75rem 0;
  max-width: 100%;

  a {
    display: block;
    width: 100%;
  }

  img {
    display: block;
    /* Fills whatever container this placement actually sits in (a full
       content column for the hero slot, a narrow sidebar for the house-
       vertical slot, etc.) instead of being pinned to the creative's own
       source pixel width - a 728px-wide upload otherwise renders at a
       fixed 728px even inside a much wider slot, leaving dead space on
       either side. height: auto keeps the creative's own aspect ratio
       regardless of how much it's scaled up or down. */
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

const Slide = styled.div`
  animation: ${fadeIn} 0.5s ease;
`;

export function SponsoredBanner({ banners }: { banners?: BannerDto[] | null }) {
  // Defensive against `banners` arriving as undefined/null - e.g. a
  // deploy where the SSR process/an older cached bundle hasn't picked up
  // a newly-added prop yet. An ad slot failing soft to "render nothing"
  // is correct here (same posture as PortalApiClient::fetchBanners()'s
  // own try/catch) - crashing the whole page over an optional banner
  // is never acceptable, which is exactly what happened in production
  // (`banners.length` on undefined) before this guard existed.
  const safeBanners = Array.isArray(banners) ? banners : [];

  const [index, setIndex] = useState(0);

  // A fresh set of banners (different placement, or a page navigation)
  // should always start from the first/highest-priority one, not
  // whatever index a previous placement's rotation happened to land on.
  useEffect(() => {
    setIndex(0);
  }, [safeBanners]);

  useEffect(() => {
    if (safeBanners.length < 2) return;
    const handle = setInterval(() => {
      setIndex((current) => (current + 1) % safeBanners.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(handle);
  }, [safeBanners.length]);

  if (safeBanners.length === 0) return null;

  const active = safeBanners[index % safeBanners.length];

  const image = (
    <img
      src={active.image_url}
      width={active.width ?? undefined}
      height={active.height ?? undefined}
      alt="Advertisement"
      loading="lazy"
    />
  );

  return (
    <Wrapper aria-label="Advertisement">
      {/* Keyed on the creative id so React remounts (not just re-renders)
          this element on every rotation - that's what re-triggers the
          fadeIn animation each time the active banner changes. */}
      {active.click_url ? (
        <Slide key={active.ad_creative_id} as="a" href={active.click_url} target="_blank" rel="noopener noreferrer sponsored">
          {image}
        </Slide>
      ) : (
        <Slide key={active.ad_creative_id}>{image}</Slide>
      )}
    </Wrapper>
  );
}
