import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { i as router3, t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as PostList } from "./PostList-CwUwuW2C.js";
import { t as Pagination } from "./Pagination-PGR1kGeN.js";
//#region resources/js/pages/CategoryArchive.tsx
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
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 3rem 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;
/**
* Ported from the Vite SPA's src/pages/CategoryArchive.tsx. Pagination and
* the category lookup both now happen server-side (CategoryArchiveController)
* instead of client-side react-query hooks - page changes are real Inertia
* navigations (router.get), each one a fresh server-rendered response.
*/
function CategoryArchive({ category, posts, meta, page }) {
	function handlePageChange(newPage) {
		router3.get(`/category/${category.slug}`, { page: newPage }, { preserveScroll: true });
	}
	if (!category) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Section not found | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Section not found" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "This category doesn't exist or may have been renamed." })
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${category.name} | GhanaTalksRadio` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: category.description || `Latest ${category.name} stories from GhanaTalksRadio.`
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Section" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: category.name })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostList, {
			posts,
			isLoading: false,
			isError: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page,
			totalPages: meta.totalPages,
			onPageChange: handlePageChange
		})
	] });
}
//#endregion
export { CategoryArchive, CategoryArchive as default };
