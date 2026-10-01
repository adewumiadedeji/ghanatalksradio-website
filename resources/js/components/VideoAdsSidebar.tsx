import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { BannerDto } from '../types/advertising';
import type { EngagementBannerDto } from '../types/engagement';

/**
 * The video page's right-column ad carousel, shown only while a viewer
 * has joined the live stream (see VodSection.tsx) - merges TWO otherwise
 * separate systems into one rotation:
 *  - `banners`: third-party advertiser campaigns for the `web_video`
 *    placement (Modules\Advertising, PortalApiClient::fetchBanners()) -
 *    same shape/source SponsoredBanner.tsx renders elsewhere.
 *  - `engagementBanners`: GhanaTalksRadio's own feature cross-promotion
 *    (Raffle, Predictions, Quiz, ...) (Modules\Engagement,
 *    PortalApiClient::fetchEngagementBanners()) - same source
 *    EngagementBannerStrip.tsx renders on the homepage.
 * Neither existing component supports a mixed-source list, so this is a
 * dedicated third component rather than extending either - reuses
 * SponsoredBanner's fade/rotation mechanics (7s interval, keyed remount
 * to re-trigger the CSS fade) since that's this codebase's established
 * pattern for this exact kind of carousel.
 *
 * Every item opens in a new tab on click, regardless of source - a
 * deliberate choice for this placement specifically (EngagementBannerStrip
 * on the homepage opens the same kind of link in the same tab; this
 * widget's own spec calls for a new tab instead, so it isn't reused
 * as-is).
 */
const ROTATE_INTERVAL_MS = 7000;

interface MergedAdItem {
  key: string;
  imageUrl: string;
  linkUrl: string | null;
  alt: string;
}

function mergeAdItems(banners: BannerDto[], engagementBanners: EngagementBannerDto[]): MergedAdItem[] {
  return [
    ...banners.map((b) => ({
      key: `banner-${b.ad_creative_id}`,
      imageUrl: b.image_url,
      linkUrl: b.click_url,
      alt: 'Advertisement',
    })),
    ...engagementBanners.map((e) => ({
      key: `engagement-${e.id}`,
      imageUrl: e.image_url,
      linkUrl: e.link_url,
      alt: e.title,
    })),
  ];
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SlideLink = styled.a`
  display: block;
  animation: ${fadeIn} 0.5s ease;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const SlideImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export function VideoAdsSidebar({
  banners,
  engagementBanners,
}: {
  banners?: BannerDto[] | null;
  engagementBanners?: EngagementBannerDto[] | null;
}) {
  // Defensive against either prop arriving undefined/null, same posture
  // as SponsoredBanner's own guard - a broken ad feed must never crash
  // this page.
  const items = mergeAdItems(Array.isArray(banners) ? banners : [], Array.isArray(engagementBanners) ? engagementBanners : []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length < 2) return;
    const handle = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(handle);
  }, [items.length]);

  if (items.length === 0) return null;

  const active = items[index % items.length];

  const image = <SlideImage src={active.imageUrl} alt={active.alt} loading="lazy" />;

  return (
    <Wrapper aria-label="Advertisement">
      {active.linkUrl ? (
        <SlideLink key={active.key} href={active.linkUrl} target="_blank" rel="noopener noreferrer sponsored">
          {image}
        </SlideLink>
      ) : (
        <SlideLink key={active.key} as="div">
          {image}
        </SlideLink>
      )}
    </Wrapper>
  );
}

export default VideoAdsSidebar;
