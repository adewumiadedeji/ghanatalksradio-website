import styled from 'styled-components';
import type { BannerDto } from '../types/advertising';

/**
 * Renders a real, campaign-backed advertiser banner (portal's Advertising
 * module - `type = website_banner` campaigns), resolved server-side and
 * passed as the `banner` prop by each page's controller (see
 * PortalApiClient::fetchBanners()). Distinct from AdSlot.tsx, which is
 * Google AdSense - unrelated ad network, unrelated data source. Renders
 * nothing at all when there's no active campaign for this placement,
 * same as AdSlot's own fail-soft behavior.
 */
const Wrapper = styled.div<{ $width: number | null }>`
  display: flex;
  justify-content: center;
  margin: 1.75rem 0;
  max-width: 100%;

  a {
    display: block;
    max-width: 100%;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    ${({ $width }) => ($width ? `width: ${$width}px;` : '')}
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export function SponsoredBanner({ banner }: { banner: BannerDto | null }) {
  if (!banner) return null;

  const image = (
    <img
      src={banner.image_url}
      width={banner.width ?? undefined}
      height={banner.height ?? undefined}
      alt="Advertisement"
      loading="lazy"
    />
  );

  return (
    <Wrapper $width={banner.width} aria-label="Advertisement">
      {banner.click_url ? (
        <a href={banner.click_url} target="_blank" rel="noopener noreferrer sponsored">
          {image}
        </a>
      ) : (
        image
      )}
    </Wrapper>
  );
}
