import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
//#region resources/js/components/SponsoredBanner.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Renders a real, campaign-backed advertiser banner (portal's Advertising
* module - `type = website_banner` campaigns), resolved server-side and
* passed as the `banner` prop by each page's controller (see
* PortalApiClient::fetchBanners()). Distinct from AdSlot.tsx, which is
* Google AdSense - unrelated ad network, unrelated data source. Renders
* nothing at all when there's no active campaign for this placement,
* same as AdSlot's own fail-soft behavior.
*/
var Wrapper = Tt.div`
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
    ${({ $width }) => $width ? `width: ${$width}px;` : ""}
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
function SponsoredBanner({ banner }) {
	if (!banner) return null;
	const image = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: banner.image_url,
		width: banner.width ?? void 0,
		height: banner.height ?? void 0,
		alt: "Advertisement",
		loading: "lazy"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrapper, {
		$width: banner.width,
		"aria-label": "Advertisement",
		children: banner.click_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: banner.click_url,
			target: "_blank",
			rel: "noopener noreferrer sponsored",
			children: image
		}) : image
	});
}
//#endregion
export { SponsoredBanner as t };
