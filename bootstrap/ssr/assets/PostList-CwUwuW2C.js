import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as PostCard } from "./PostCard-BqX_EaWR.js";
//#region resources/js/components/PostList.tsx
var import_jsx_runtime = require_jsx_runtime();
var List = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
var StateBox = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var SkeletonCard = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 1rem;
  padding: 1rem 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
var Shimmer = Tt.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.sm};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
var ShimmerImg = Tt(Shimmer)`
  aspect-ratio: 1 / 1;
  margin: -1rem 0 -1rem -1.1rem;
`;
var ShimmerLines = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;
function SkeletonList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"aria-hidden": "true",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SkeletonCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerImg, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ShimmerLines, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { style: {
				width: "40%",
				height: 10
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { style: {
				width: "90%",
				height: 16
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { style: {
				width: "60%",
				height: 16
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { style: {
				width: "30%",
				height: 10
			} })
		] })] }, i))
	});
}
function PostList({ posts, isLoading, isError, error, adFrequency = 4 }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonList, {});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBox, {
		role: "alert",
		children: [
			"Couldn't load stories right now",
			error instanceof Error ? `: ${error.message}` : ".",
			" Try refreshing the page."
		]
	});
	if (posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No stories here yet." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FragmentWithAd, {
		index,
		adFrequency,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post })
	}, post.id)) });
}
function FragmentWithAd({ index, adFrequency, children }) {
	const showAdAfter = adFrequency > 0 && index > 0 && (index + 1) % adFrequency === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children, showAdAfter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
		format: "in-feed",
		slotId: GTR_AD_SLOTS.inFeed
	})] });
}
//#endregion
export { PostList as t };
