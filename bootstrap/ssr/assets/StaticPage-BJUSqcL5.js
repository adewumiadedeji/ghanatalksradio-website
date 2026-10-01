import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as PostContent } from "./PostContent-CV-szNZw.js";
//#region resources/js/pages/StaticPage.tsx
var import_jsx_runtime = require_jsx_runtime();
var Article = Tt.article`
  max-width: ${({ theme }) => theme.contentWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
var Title = Tt.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1.5rem;
`;
function StaticPage({ title, content }) {
	if (content === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Not found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This page couldn't be found." })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostContent, { html: content })] });
}
//#endregion
export { StaticPage as default };
