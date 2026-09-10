import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { i as router3, t as Head_default } from "./index.esm-zJybEw0J.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { t as Pagination } from "./Pagination-BHEjn7Ke.js";
import { t as PodcastEpisodeList } from "./PodcastEpisodeList-Bm-alHKZ.js";
//#region resources/js/pages/Podcast.tsx
var import_jsx_runtime = require_jsx_runtime();
var Header = Tt.div`
  margin-bottom: 2rem;
`;
var Eyebrow = Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.4rem;
`;
var Title = Tt.h1`
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  margin-bottom: 0.4rem;
`;
var Subtitle = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0;
`;
/**
* Ported from the Vite SPA's src/pages/Podcast.tsx. Catchup and Podcast are
* the same feature on this backend - past broadcast segments available on
* demand. The underlying portal API paginates by page-was-full rather than
* a true total count, same as before - just resolved server-side now
* (PodcastController) instead of a react-query hook, with page changes as
* real Inertia navigations.
*/
function Podcast({ episodes, page, hasMore, isError }) {
	const knownTotalPages = hasMore ? page + 1 : page;
	function handlePageChange(newPage) {
		router3.get("/podcast", { page: newPage }, { preserveScroll: true });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Podcast | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "Catch up on past GhanaTalksRadio broadcasts — news bulletins and talk shows, on demand."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Catch Up" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Podcast" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Missed a broadcast? Catch up on past shows and news bulletins here." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastEpisodeList, {
			episodes,
			isLoading: false,
			isError
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page,
			totalPages: knownTotalPages,
			onPageChange: handlePageChange
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		})
	] });
}
//#endregion
export { Podcast, Podcast as default };
