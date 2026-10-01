import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { c as getPlainTitle, i as getEmbeddedCategories, l as getYouTubeThumbnail, t as formatPostDate, u as getYouTubeVideoId } from "./wpContent-FS3Fyx5P.js";
//#region resources/js/components/VideoCard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Card = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }
`;
var ThumbWrap = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
`;
var Thumb = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var PlayBadge = Tt.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(21, 23, 28, 0.18);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.32);
  }
`;
var PlayCircle = Tt.span`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge}:hover & {
    transform: scale(1.08);
  }
`;
var Frame = Tt.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
var Body = Tt.div`
  padding: 0.9rem 1rem 1rem;
`;
var Eyebrow = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin-top: 0.3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;
var Meta = Tt.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.4rem;
`;
function PlayGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "18",
		height: "20",
		viewBox: "0 0 18 20",
		fill: "#15171C",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L18 10L0 20V0Z" })
	});
}
/**
* A video post rendered as a thumbnail card. The real YouTube iframe is
* only mounted after a click — loading a dozen live YouTube embeds upfront
* would be slow and mostly wasted, since most won't be watched. The
* thumbnail itself is YouTube's own static hqdefault.jpg, so no iframe
* (and no YouTube tracking) loads until the person actually presses play.
*/
function VideoCard({ post }) {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const videoId = getYouTubeVideoId(post.content.rendered);
	const categories = getEmbeddedCategories(post);
	const title = getPlainTitle(post);
	if (!videoId) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbWrap, { children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
		title,
		allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
		referrerPolicy: "strict-origin-when-cross-origin",
		allowFullScreen: true
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		src: getYouTubeThumbnail(videoId),
		alt: title,
		loading: "lazy"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
		type: "button",
		onClick: () => setPlaying(true),
		"aria-label": `Play video: ${title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, {}) })
	})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
		categories[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
			to: `/category/${categories[0].slug}`,
			children: categories[0].name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
			to: `/post/${post.slug}`,
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatPostDate(post.date) })
	] })] });
}
//#endregion
//#region resources/js/components/VideoGrid.tsx
var Grid = Tt.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
`;
var StateBox = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var Shimmer = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;
var ShimmerThumb = Tt.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
var ShimmerLine = Tt.div`
  height: 12px;
  margin: 0.9rem 1rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
function SkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
		"aria-hidden": "true",
		children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shimmer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerThumb, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine, { style: { width: "70%" } })] }, i))
	});
}
function VideoGrid({ posts, isLoading, isError, error }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonGrid, {});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBox, {
		role: "alert",
		children: [
			"Couldn't load videos right now",
			error instanceof Error ? `: ${error.message}` : ".",
			" Try refreshing the page."
		]
	});
	if (posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No videos here yet — check back soon." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { post }, post.id)) });
}
//#endregion
export { VideoGrid as t };
