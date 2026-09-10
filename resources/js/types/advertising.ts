/**
 * Shapes returned by the portal's PublicBannerController, passed through
 * PortalApiClient::fetchBanners()/fetchPromoMessages() as Inertia props -
 * see HomeController etc. for `banner`, HandleInertiaRequests::share()
 * for the shared `promoMessage` prop.
 */
export interface BannerDto {
  campaign_id: number;
  ad_creative_id: number;
  image_url: string;
  size_key: string | null;
  width: number | null;
  height: number | null;
  click_url: string | null;
}

export interface PromoMessageDto {
  campaign_id: number;
  ad_creative_id: number;
  headline: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
}
