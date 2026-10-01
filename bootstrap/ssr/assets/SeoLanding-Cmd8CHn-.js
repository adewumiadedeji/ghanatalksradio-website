import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { i as router3, t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as Pagination } from "./Pagination-PGR1kGeN.js";
import { t as JobResultCard } from "./JobResultCard-XdAdZLG0.js";
//#region resources/js/pages/careers/SeoLanding.tsx
var import_jsx_runtime = require_jsx_runtime();
var Header = Tt.div`
  margin-bottom: 1.75rem;
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
var Intro = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0 0 1rem;
  max-width: 60ch;
`;
var BrowseAllLink = Tt(Link)`
  display: inline-block;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
var ResultsCount = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;
`;
var JobGrid = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: 2rem;
`;
var EmptyState = Tt.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 2rem;
`;
var RelatedSection = Tt.div`
  margin-top: 1rem;
`;
var RelatedTitle = Tt.h3`
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
`;
var RelatedLinks = Tt.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;
var RelatedChip = Tt(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;
/**
* A curated GTR Careers SEO landing page - genuinely dynamic (real,
* current search results, not static copy), per spec §22. "Related
* categories/locations" (spec §23) link to other Careers landing pages,
* not fabricated links into editorial content this session has no
* visibility into which real WordPress articles exist to link to
* honestly - see CareersLandings' own docblock.
*/
function SeoLanding({ landing, jobs, total, page, limit }) {
	function handlePageChange(newPage) {
		router3.get(window.location.pathname, { page: newPage }, {
			preserveScroll: true,
			preserveState: true
		});
	}
	const totalPages = Math.max(1, Math.ceil(total / limit));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${landing.title} | GTR Careers` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: landing.intro
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "GTR Careers" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: landing.h1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { children: landing.intro }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseAllLink, {
				to: "/jobs",
				children: "Search all GTR Careers listings →"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsCount, { children: total > 0 ? `${total} job${total === 1 ? "" : "s"} found` : "No jobs found for this category right now." }),
		jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "Nothing available here right now - our job providers' coverage varies by region and can be thin in some markets. Check back soon, or browse all GTR Careers listings above." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobGrid, { children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobResultCard, { job }, `${job.source}-${job.source_job_id}`)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page,
			totalPages,
			onPageChange: handlePageChange
		})] }),
		landing.related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RelatedSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedTitle, { children: "Related opportunities" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedLinks, { children: landing.related.map((relatedSlug) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedChip, {
			to: `/jobs/${relatedSlug}`,
			children: relatedSlug.replace(/-/g, " ")
		}, relatedSlug)) })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		})
	] });
}
//#endregion
export { SeoLanding, SeoLanding as default };
