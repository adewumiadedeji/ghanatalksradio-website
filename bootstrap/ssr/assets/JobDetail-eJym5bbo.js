import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
//#region resources/js/pages/careers/JobDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
var BackLink = Tt(Link)`
  display: inline-block;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;
var Title = Tt.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 0 0 0.3rem;
`;
var Company = Tt.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1rem;
`;
var MetaRow = Tt.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;
var MetaPill = Tt.span`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var Description = Tt.div`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.ink};
  white-space: pre-line;
  margin-bottom: 2rem;
`;
var ApplyCard = Tt.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1.25rem;
  text-align: center;
`;
var LeavingNotice = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1rem;
`;
var ApplyButton = Tt.a`
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;
var SourceNote = Tt.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.75rem;
`;
var SourceLink = Tt.a`
  color: ${({ theme }) => theme.colors.inkFaint};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
var NotFound = Tt.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
/**
* A single job's detail page - the one Careers page real crawlable SEO
* value depends on most (see Modules/Careers's own docs). GTR never
* becomes the employer here: the description/requirements shown are
* exactly what the provider returned, and "Apply Now" always leaves this
* site - see this component's LeavingNotice copy, matching the spec's own
* "You are leaving GhanaTalksRadio" requirement.
*/
function JobDetail({ job }) {
	if (!job) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Job not found | GTR Careers" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NotFound, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This job is no longer available or the link has expired." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
		to: "/jobs",
		children: "Browse other opportunities"
	})] })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${job.title} at ${job.company ?? "GTR Careers"} | GTR Careers` }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/jobs",
			children: "← Back to job search"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: job.title }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Company, { children: [job.company ?? "Company not disclosed", job.location ? ` — ${job.location}` : ""] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: [
			job.employment_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaPill, { children: job.employment_type }),
			job.workplace_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaPill, { children: job.workplace_type }),
			job.posted_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaPill, { children: ["Posted ", job.posted_at] })
		] }),
		job.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: job.description }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ApplyCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeavingNotice, { children: "You are leaving GhanaTalksRadio to complete your application on the original job provider's website." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyButton, {
				href: job.apply_url,
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Apply Now ↗"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SourceNote, { children: [
				"Source:",
				" ",
				job.source_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceLink, {
					href: job.source_url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: job.source
				}) : job.source
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "in-article",
			slotId: GTR_AD_SLOTS.inFeed
		})
	] });
}
//#endregion
export { JobDetail, JobDetail as default };
