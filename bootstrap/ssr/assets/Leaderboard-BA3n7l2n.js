import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { i as router3, t as Head_default } from "./index.esm-zJybEw0J.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
//#region resources/js/pages/Leaderboard.tsx
var import_jsx_runtime = require_jsx_runtime();
var Header = Tt.div`
  margin-bottom: 1.5rem;
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
  margin: 0 0 1.25rem;
`;
var PeriodRow = Tt.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
var PeriodChip = Tt.button`
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.goldDark : theme.colors.border};
  background: ${({ theme, $active }) => $active ? theme.colors.backgroundAlt : "transparent"};
  color: ${({ theme, $active }) => $active ? theme.colors.goldDark : theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
`;
var Table = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;
var Row = Tt.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;
var Rank = Tt.span`
  width: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var Name = Tt.span`
  flex: 1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;
var Points = Tt.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var StateBox = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var PERIODS = [{
	value: "all-time",
	label: "All time"
}, {
	value: "this-month",
	label: "This month"
}];
/**
* Ported from the Vite SPA's src/pages/Leaderboard.tsx. Points leaderboard,
* ranked by total points earned from Predictions, Quizzes and other
* Engagement activities. Read-only on web for now. The period filter is a
* real Inertia navigation (?period=...) instead of client-side state, so
* each period is server-rendered and independently linkable/indexable.
*/
function Leaderboard({ entries, period, isError }) {
	function handlePeriodChange(value) {
		router3.get("/leaderboard", { period: value }, { preserveScroll: true });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Leaderboard | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "See who's earning the most points from Predictions, Quizzes and other GhanaTalksRadio games."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Arena" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Leaderboard" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Points earned from Predictions, Quizzes and other Arena games." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodRow, { children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodChip, {
			type: "button",
			$active: period === p.value,
			onClick: () => handlePeriodChange(p.value),
			children: p.label
		}, p.value)) }),
		isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "Couldn't load the leaderboard. Try refreshing the page."
		}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No points earned yet — be the first on the board." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { children: entries.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { children: index + 1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Name, { children: entry.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Points, { children: entry.points.toLocaleString() })
		] }, index)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.horizontal
		})
	] });
}
//#endregion
export { Leaderboard, Leaderboard as default };
