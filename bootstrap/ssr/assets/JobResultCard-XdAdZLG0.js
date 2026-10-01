import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Link } from "./Link-CrWePb0Y.js";
//#region resources/js/components/careers/JobResultCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var GRADIENTS = (theme) => [
	`linear-gradient(135deg, ${theme.colors.gold}, ${theme.colors.goldDark})`,
	`linear-gradient(135deg, ${theme.colors.ink}, ${theme.colors.inkMuted})`,
	`linear-gradient(135deg, ${theme.colors.goldDark}, ${theme.colors.ink})`,
	`linear-gradient(135deg, ${theme.colors.gold}, ${theme.colors.ink})`
];
function variantFor(job) {
	const source = job.company ?? job.title;
	let hash = 0;
	for (let i = 0; i < source.length; i += 1) hash = hash * 31 + source.charCodeAt(i) >>> 0;
	return hash % 4;
}
function initialFor(job) {
	return (job.company ?? job.title).trim().charAt(0).toUpperCase() || "?";
}
/** "full_time" / "on_site" from a provider's raw payload -> "Full Time" / "On Site". */
function formatLabel(value) {
	return value.replace(/[_-]+/g, " ").trim().replace(/\b\w/g, (char) => char.toUpperCase());
}
function formatPostedAt(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	const days = Math.floor((Date.now() - date.getTime()) / 864e5);
	if (days <= 0) return "Posted today";
	if (days === 1) return "Posted yesterday";
	if (days < 30) return `Posted ${days}d ago`;
	return `Posted ${date.toLocaleDateString("en-GB", {
		month: "short",
		year: "numeric"
	})}`;
}
var Card = Tt(Link)`
  position: relative;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  ${({ $featured, theme }) => $featured ? `
        padding: 2rem 2.25rem;
        border: 2px solid ${theme.colors.gold};
        box-shadow: 0 14px 34px rgba(242, 169, 0, 0.16), 0 4px 14px rgba(21, 23, 28, 0.06);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(242, 169, 0, 0.22), 0 6px 16px rgba(21, 23, 28, 0.08);
        }
      ` : `
        padding: 1.6rem 1.85rem;
        border: 1px solid ${theme.colors.border};
        box-shadow: ${theme.shadow.sm};

        &:hover {
          transform: translateY(-3px);
          border-color: ${theme.colors.gold};
          box-shadow: ${theme.shadow.md};
        }
      `}

  &:hover {
    text-decoration: none;
  }
`;
var Badge = Tt.div`
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 1.35rem;
  color: #fff;
  background: ${({ theme, $variant }) => GRADIENTS(theme)[$variant % 4]};
`;
var Body = Tt.div`
  flex: 1;
  min-width: 0;
`;
var TopLine = Tt.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;
var Title = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;
var SourceTag = Tt.span`
  flex-shrink: 0;
  margin-top: 0.15rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.25rem 0.6rem;
  white-space: nowrap;
`;
var CompanyLine = Tt.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.3rem 0 0.9rem;
`;
var CompanyName = Tt.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;
var BottomRow = Tt.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 0.75rem;
`;
var Tags = Tt.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1 1 180px;
`;
var Tag = Tt.span`
  flex-shrink: 0;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  background: ${({ theme }) => theme.colors.goldTint};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.3rem 0.7rem;
`;
var PostedText = Tt.span`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var ViewButton = Tt.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 1.15rem;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;

  ${Card}:hover & {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.ink};
  }
`;
function JobResultCard({ job, featured }) {
	const postedLabel = formatPostedAt(job.posted_at);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		to: `/jobs/${job.source}/${job.source_job_id}`,
		$featured: featured,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			$variant: variantFor(job),
			"aria-hidden": "true",
			children: initialFor(job)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopLine, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: job.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceTag, { children: job.source })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CompanyLine, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyName, { children: job.company ?? "Company not disclosed" }), job.location ? ` — ${job.location}` : ""] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BottomRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tags, { children: [
				job.employment_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: formatLabel(job.employment_type) }),
				job.workplace_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { children: formatLabel(job.workplace_type) }),
				postedLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostedText, { children: postedLabel })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewButton, {
				"aria-hidden": "true",
				children: "View Role →"
			})] })
		] })]
	});
}
//#endregion
export { JobResultCard as t };
