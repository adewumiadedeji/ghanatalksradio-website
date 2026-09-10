/**
 * Shapes returned by the portal's PublicEngagementBannerController,
 * passed through PortalApiClient::fetchEngagementBanners() - see
 * HomeController for the `engagementBanners` prop. Distinct from
 * BannerDto (types/advertising.ts): that shape is a third-party
 * advertiser campaign; this one is GhanaTalksRadio's own feature
 * cross-promotion (Raffle, Predictions, Quiz, ...), with no
 * advertiser/campaign concept at all.
 */
export interface EngagementBannerDto {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
}
