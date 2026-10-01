import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { i as router3, t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as Pagination } from "./Pagination-PGR1kGeN.js";
import { t as JobResultCard } from "./JobResultCard-XdAdZLG0.js";
//#region resources/js/pages/careers/Search.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Spec §26's exact shortcut list - search configurations, not permanent records. Most map to a curated CareersLandings slug; "Graduate Jobs" has no dedicated landing copy yet, so it goes straight to a filtered /jobs search instead. */
var FEATURED_SEARCHES = [
	{
		label: "Radio Jobs",
		href: "/jobs/radio"
	},
	{
		label: "Media Jobs",
		href: "/jobs/media"
	},
	{
		label: "Jobs in Accra",
		href: "/jobs/accra"
	},
	{
		label: "Jobs in Lagos",
		href: "/jobs/lagos"
	},
	{
		label: "Remote Jobs",
		href: "/jobs/remote"
	},
	{
		label: "Tech Jobs",
		href: "/jobs/technology"
	},
	{
		label: "Internship Opportunities",
		href: "/jobs/internships"
	},
	{
		label: "Graduate Jobs",
		href: "/jobs?employment_type=graduate"
	}
];
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
var Subtitle = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0 0 1.5rem;
`;
var SearchForm = Tt.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
`;
var SearchInput = Tt.input`
  flex: 1 1 220px;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.92rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;
var SearchButton = Tt.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;
var ClearButton = Tt.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.inkMuted};
    color: ${({ theme }) => theme.colors.ink};
  }
`;
var FeaturedRow = Tt.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;
var FeaturedChip = Tt(Link)`
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;
var JobOfTheDayWrap = Tt.div`
  margin-bottom: 2.5rem;
`;
var JobOfTheDayEyebrow = Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.75rem;
`;
var ResultsCount = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;
`;
var JobList = Tt.div`
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
`;
var EmptyStateActions = Tt.div`
  margin-top: 1rem;
`;
/**
* GTR Careers search - a job-discovery/traffic vertical, not a
* recruitment platform (see Modules/Careers on the portal side for the
* full "why"). Every job card links to a real, indexable /jobs/{provider}/
* {reference} detail page - never a modal/client-only view - since that
* detail page is this feature's actual SEO value. Card presentation
* itself lives in JobResultCard, shared with every SEO landing page so
* the whole vertical looks like one system.
*/
function Search({ jobs, total, page, limit, params, jobOfTheDay }) {
	const [query, setQuery] = (0, import_react.useState)(params.q ?? "");
	const [location, setLocation] = (0, import_react.useState)(params.location ?? "");
	const hasActiveFilters = Boolean(params.q || params.location || params.country || params.category || params.employment_type || params.workplace_type);
	function handleSubmit(e) {
		e.preventDefault();
		router3.get("/jobs", {
			q: query || void 0,
			location: location || void 0
		}, { preserveState: true });
	}
	function handleClear() {
		setQuery("");
		setLocation("");
		router3.get("/jobs");
	}
	function handlePageChange(newPage) {
		router3.get("/jobs", {
			...params,
			page: newPage
		}, {
			preserveScroll: true,
			preserveState: true
		});
	}
	const totalPages = Math.max(1, Math.ceil(total / limit));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: params.q ? `${params.q} Jobs | GTR Careers` : "GTR Careers | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "GTR Careers" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Find your next opportunity" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Broadcasting, media and job opportunities across Ghana, Nigeria and Africa. Apply directly with the original employer." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SearchForm, {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						type: "text",
						placeholder: "Job title, e.g. Radio Presenter",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						"aria-label": "Job title or keyword"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						type: "text",
						placeholder: "Location, e.g. Accra",
						value: location,
						onChange: (e) => setLocation(e.target.value),
						"aria-label": "Location"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchButton, {
						type: "submit",
						children: "Search Jobs"
					}),
					hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearButton, {
						type: "button",
						onClick: handleClear,
						children: "Clear search ✕"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedRow, { children: FEATURED_SEARCHES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedChip, {
				to: item.href,
				children: ["🔥 ", item.label]
			}, item.label)) })
		] }),
		jobOfTheDay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JobOfTheDayWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobOfTheDayEyebrow, { children: "🔥 GTR Job of the Day" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobResultCard, {
			job: jobOfTheDay,
			featured: true
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsCount, { children: total > 0 ? `${total} job${total === 1 ? "" : "s"} found` : "No jobs found yet for this search - try a different title or location." }),
		jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyState, { children: [params.location ? `Nothing matched "${params.location}" right now - our job providers' coverage varies by region and can be thin in some markets. Try a broader location, drop the location filter, or search by job title instead.` : "Nothing matched that search right now. GTR Careers aggregates live listings from external job providers - try a broader search term, or check back soon.", hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStateActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearButton, {
			type: "button",
			onClick: handleClear,
			children: "Clear search ✕"
		}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobList, { children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobResultCard, { job }, `${job.source}-${job.source_job_id}`)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page,
			totalPages,
			onPageChange: handlePageChange
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		})
	] });
}
//#endregion
export { Search, Search as default };
