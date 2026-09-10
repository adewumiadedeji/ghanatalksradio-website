import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { i as router3, t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as PostList } from "./PostList-CSLLYN5F.js";
import { t as Pagination } from "./Pagination-BHEjn7Ke.js";
//#region resources/js/pages/Search.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
  font-size: 1.6rem;
  margin-bottom: 1.25rem;
`;
var Form = Tt.form`
  display: flex;
  gap: 0.6rem;
`;
var Input = Tt.input`
  flex: 1;
  padding: 0.75rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;
var SubmitButton = Tt.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.goldDark};
  }
`;
var ResultsLabel = Tt.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 1.75rem 0 1.25rem;
`;
var EmptyState = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 2rem 0;
`;
/**
* Ported from the Vite SPA's src/pages/Search.tsx. The search itself now
* runs server-side (SearchController), and the query/page state that used
* to live in the URL via useSearchParams is now just... the URL, driven by
* real Inertia navigations (router.get) instead of client-side history state.
*/
function Search({ query, posts, meta, page }) {
	const [inputValue, setInputValue] = (0, import_react.useState)(query);
	function handleSubmit(e) {
		e.preventDefault();
		router3.get("/search", { q: inputValue });
	}
	function handlePageChange(newPage) {
		router3.get("/search", {
			q: query,
			page: newPage
		}, { preserveScroll: true });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${query ? `Search: ${query}` : "Search"} | GhanaTalksRadio` }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Find a story" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Search GhanaTalksRadio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
				onSubmit: handleSubmit,
				role: "search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "search",
					value: inputValue,
					onChange: (e) => setInputValue(e.target.value),
					placeholder: "Search stories…",
					"aria-label": "Search stories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					type: "submit",
					children: "Search"
				})]
			})
		] }),
		query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResultsLabel, { children: [`${meta.totalItems} result${meta.totalItems === 1 ? "" : "s"} for `, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
				"\"",
				query,
				"\""
			] })] }),
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
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "Enter a search term to find stories." })
	] });
}
//#endregion
export { Search, Search as default };
