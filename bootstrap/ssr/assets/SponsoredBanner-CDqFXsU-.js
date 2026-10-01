import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, s as qt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/components/SponsoredBanner.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
var ROTATE_INTERVAL_MS = 7e3;
var fadeIn = qt`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var Wrapper = Tt.div`
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
var Slide = Tt.div`
  animation: ${fadeIn} 0.5s ease;
`;
function SponsoredBanner({ banners }) {
	const safeBanners = Array.isArray(banners) ? banners : [];
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setIndex(0);
	}, [safeBanners]);
	(0, import_react.useEffect)(() => {
		if (safeBanners.length < 2) return;
		const handle = setInterval(() => {
			setIndex((current) => (current + 1) % safeBanners.length);
		}, ROTATE_INTERVAL_MS);
		return () => clearInterval(handle);
	}, [safeBanners.length]);
	if (safeBanners.length === 0) return null;
	const active = safeBanners[index % safeBanners.length];
	const image = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: active.image_url,
		width: active.width ?? void 0,
		height: active.height ?? void 0,
		alt: "Advertisement",
		loading: "lazy"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrapper, {
		"aria-label": "Advertisement",
		children: active.click_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slide, {
			as: "a",
			href: active.click_url,
			target: "_blank",
			rel: "noopener noreferrer sponsored",
			children: image
		}, active.ad_creative_id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slide, { children: image }, active.ad_creative_id)
	});
}
//#endregion
export { SponsoredBanner as t };
