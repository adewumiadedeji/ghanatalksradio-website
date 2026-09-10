import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { EngagementBannerDto } from '../types/engagement';

/** How long each banner stays on screen before cross-fading to the next. */
const ROTATE_INTERVAL_MS = 5000;

/**
 * A single-slot, auto-rotating cross-fade carousel of feature-highlight
 * banners (Raffle, Predictions, Quiz, ...) pointing at GhanaTalksRadio's
 * own pages - fed by PortalApiClient::fetchEngagementBanners()
 * (Modules\Engagement on the portal side), not the Advertising module's
 * SponsoredBanner/BannerDto. Shows exactly one banner at a time (not a
 * grid of tiles - staff can upload as many as they like, only one is ever
 * on screen), advancing through the admin-controlled order automatically.
 *
 * A fixed aspect-ratio frame with `object-fit: contain` (never `cover`)
 * so a real designed creative - which can be portrait, square, or wide -
 * is always shown in full, never cropped; this is also what makes it
 * naturally mobile-responsive with no separate breakpoint logic, since a
 * single scaling box has nothing to reflow.
 */
const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 420px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Slide = styled.a<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: block;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.6s ease;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

const SlideImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export function EngagementBannerStrip({ banners }: { banners: EngagementBannerDto[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <Frame aria-label="Featured GhanaTalksRadio features" aria-live="off">
      {banners.map((banner, i) => (
        <Slide
          key={banner.id}
          href={banner.link_url}
          $active={i === index}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
        >
          <SlideImage src={banner.image_url} alt={banner.title} loading={i === 0 ? 'eager' : 'lazy'} />
        </Slide>
      ))}
    </Frame>
  );
}

export default EngagementBannerStrip;
