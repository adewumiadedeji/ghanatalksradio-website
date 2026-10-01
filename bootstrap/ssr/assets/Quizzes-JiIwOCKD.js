import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
//#region resources/js/pages/Quizzes.tsx
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
* Ported from the Vite SPA's src/pages/Quizzes.tsx. List resolved
* server-side (QuizzesController) instead of a react-query hook.
*/
function Quizzes({ quizzes, isError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Quizzes | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "Test what you know, earn points on the leaderboard, and see how you rank against other listeners."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Arena" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Quizzes" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Answer a round of questions and see your score instantly." })
		] }),
		isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "Couldn't load quizzes. Try refreshing the page."
		}) : quizzes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No quizzes are open right now — check back soon." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: quizzes.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			to: `/quizzes/${q.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: q.name }),
				!!q.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: q.description }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: ["Ends ", new Date(q.ends_at.replace(" ", "T")).toLocaleDateString()] })
			]
		}, q.slug)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.horizontal
		})
	] });
}
//#endregion
export { Quizzes, Quizzes as default };
