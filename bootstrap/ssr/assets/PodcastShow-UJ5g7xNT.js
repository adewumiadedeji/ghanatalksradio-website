import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { i as router3, t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { t as Pagination } from "./Pagination-BHEjn7Ke.js";
import { t as SponsoredBanner } from "./SponsoredBanner-DmG_BriB.js";
import { t as PodcastEpisodeList } from "./PodcastEpisodeList-Bm-alHKZ.js";
import { t as getAvailablePlatformLinks } from "./PodcastPlatforms-CpaGAbup.js";
//#region resources/js/pages/PodcastShow.tsx
var import_jsx_runtime = require_jsx_runtime();
var BackLink = Tt(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
var Header = Tt.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
var Artwork = Tt.div`
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
var HeaderBody = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;
var Eyebrow = Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var Title = Tt.h1`
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  margin: 0;
`;
var PlatformRow = Tt.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;
var PlatformPill = Tt.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    text-decoration: none;
    border-color: ${({ $accent }) => $accent};
    color: ${({ $accent }) => $accent};
  }
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
/**
* Ported from the Vite SPA's src/pages/PodcastShow.tsx. Show + episodes
* resolved server-side (PodcastShowController) instead of a react-query
* hook; pagination is a real Inertia navigation.
*/
function PodcastShow({ episodes, show, page, totalPages, isError, banner }) {
	const platformLinks = show ? getAvailablePlatformLinks(show.external) : [];
	function handlePageChange(newPage) {
		router3.get(`/podcast/${show.slug}`, { page: newPage }, { preserveScroll: true });
	}
	if (!show) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Show not found | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/podcast",
			children: "← Back to Podcast"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "This show doesn't exist or may have been removed."
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${show.name} | GhanaTalksRadio` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: `Episodes of ${show.name} on GhanaTalksRadio.`
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/podcast",
			children: "← Back to Podcast"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [show.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Artwork, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: show.imageUrl,
			alt: show.name
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeaderBody, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Show" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: show.name }),
			platformLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformRow, { children: platformLinks.map(({ key, label, Icon, accent, url }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlatformPill, {
				href: url,
				target: "_blank",
				rel: "noopener noreferrer",
				$accent: accent,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 14 }), label]
			}, key)) })
		] })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastEpisodeList, {
			episodes,
			isLoading: false,
			isError
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page,
			totalPages,
			onPageChange: handlePageChange
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banner }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		})
	] });
}
//#endregion
export { PodcastShow, PodcastShow as default };
