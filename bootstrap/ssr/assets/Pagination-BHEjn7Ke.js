import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
//#region resources/js/components/Pagination.tsx
var import_jsx_runtime = require_jsx_runtime();
var Nav = Tt.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
`;
var PageButton = Tt.button`
  padding: 0.55rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.goldTint};
  }
`;
var PageIndicator = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 0 0.4rem;
`;
function Pagination({ page, totalPages, onPageChange }) {
	if (totalPages <= 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav, {
		"aria-label": "Pagination",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageButton, {
				onClick: () => onPageChange(page - 1),
				disabled: page <= 1,
				children: "← Prev"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageIndicator, {
				"aria-current": "page",
				children: [
					page,
					" / ",
					totalPages
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageButton, {
				onClick: () => onPageChange(page + 1),
				disabled: page >= totalPages,
				children: "Next →"
			})
		]
	});
}
//#endregion
export { Pagination as t };
