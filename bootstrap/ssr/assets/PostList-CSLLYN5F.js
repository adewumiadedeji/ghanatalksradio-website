import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { a as getFeaturedMedia, i as getFeaturedImageUrl, o as getPlainExcerpt, r as getEmbeddedCategories, s as getPlainTitle, t as formatPostDate } from "./wpContent-DNP0YQ-E.js";
//#region resources/js/components/PostCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var Card = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  display: flex;
  flex-direction: ${({ $featured }) => $featured ? "column" : "row"};
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;
var Thumb = Tt(Link)`
  display: block;
  flex-shrink: 0;
  width: ${({ $featured }) => $featured ? "100%" : "148px"};
  aspect-ratio: ${({ $featured }) => $featured ? "16 / 9" : "1 / 1"};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;
var Body = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  justify-content: center;
  padding: 1rem 1.1rem;
`;
var Eyebrow = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: ${({ $featured }) => $featured ? "1.7rem" : "1rem"};
  font-weight: ${({ $featured }) => $featured ? 700 : 600};
  line-height: ${({ $featured }) => $featured ? 1.22 : 1.35};
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
    text-decoration-thickness: 2px;
  }
`;
var Excerpt = Tt.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.1rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
var Meta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.15rem;
`;
function PostCard({ post, variant = "default" }) {
	const featured = variant === "featured";
	const media = getFeaturedMedia(post);
	const imageUrl = getFeaturedImageUrl(media, featured ? 1024 : 320);
	const categories = getEmbeddedCategories(post);
	const postUrl = `/post/${post.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		$featured: featured,
		children: [imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			to: postUrl,
			$featured: featured,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: media?.alt_text || getPlainTitle(post),
				loading: "lazy"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
			categories[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				to: `/category/${categories[0].slug}`,
				children: categories[0].name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				to: postUrl,
				$featured: featured,
				children: getPlainTitle(post)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Excerpt, { children: getPlainExcerpt(post) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatPostDate(post.date) })
		] })]
	});
}
//#endregion
//#region resources/js/components/PostList.tsx
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
export { PostCard as n, PostList as t };
