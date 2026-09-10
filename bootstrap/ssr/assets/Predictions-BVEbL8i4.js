import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
//#region resources/js/pages/Predictions.tsx
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
var List = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
var Card = Tt(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    text-decoration: none;
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;
var CardTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
`;
var Description = Tt.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;
var MetaRow = Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var StateBox = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
/**
* Ported from the Vite SPA's src/pages/Predictions.tsx. List resolved
* server-side (PredictionsController) instead of a react-query hook.
* Unlike Raffle, predicting a score and commenting both happen directly on
* this site — see PredictionDetail.tsx.
*/
function Predictions({ predictions, isError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Predictions | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "Predict the score, earn points on the leaderboard, and talk trash in the comments."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Score Predictor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Predictions" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Predict match scores and see what other listeners think in the comments." })
		] }),
		isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "Couldn't load predictions. Try refreshing the page."
		}) : predictions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No prediction games are open right now — check back soon." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: predictions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			to: `/predictions/${p.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: p.name }),
				!!p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: p.description }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: ["Ends ", new Date(p.ends_at.replace(" ", "T")).toLocaleDateString()] })
			]
		}, p.slug)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.horizontal
		})
	] });
}
//#endregion
export { Predictions, Predictions as default };
