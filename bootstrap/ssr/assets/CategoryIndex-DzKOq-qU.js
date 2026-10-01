import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
//#region resources/js/pages/CategoryIndex.tsx
var import_jsx_runtime = require_jsx_runtime();
var Header = Tt.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
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
`;
var Grid = Tt.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;
var CategoryCard = Tt(Link)`
  display: block;
  padding: 1.25rem 1.4rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
    text-decoration: none;
  }
`;
var CategoryName = Tt.h2`
  font-size: 1.05rem;
  margin: 0 0 0.35rem;
`;
var CategoryDescription = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
var CategoryCount = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;
/**
* A real, standalone directory of every category - see
* CategoryIndexController's own docblock for why this exists (a
* crawlable, sitemap-listed /category page, distinct from
* /category/{slug}'s own article listing).
*/
function CategoryIndex({ categories }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Categories | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "Browse every news and content category on GhanaTalksRadio - politics, entertainment, sports, lifestyle and more."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Browse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Categories" })] }),
		categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No categories to show right now." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CategoryCard, {
			to: `/category/${category.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryName, { children: category.name }),
				category.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDescription, { children: category.description }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CategoryCount, { children: [
					category.count,
					" ",
					category.count === 1 ? "article" : "articles"
				] })
			]
		}, category.id)) })
	] });
}
//#endregion
export { CategoryIndex, CategoryIndex as default };
