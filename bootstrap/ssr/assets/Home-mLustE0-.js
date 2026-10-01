import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { a as NewsTicker, i as MultimediaDeskSection, n as HomeMasthead, o as WeeklyStoriesSection, t as HomeHeroBlock } from "./HomeEditorial-BpvIaCne.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { a as getFeaturedImageUrl, c as getPlainTitle, o as getFeaturedMedia, t as formatPostDate } from "./wpContent-FS3Fyx5P.js";
import { t as PostCard } from "./PostCard-BqX_EaWR.js";
import { t as SponsoredBanner } from "./SponsoredBanner-CDqFXsU-.js";
import { t as VideoGrid } from "./VideoGrid-DM-Orfiq.js";
import { n as PodcastEpisodeCard } from "./PodcastEpisodeList-DVAr-EDi.js";
//#region resources/js/components/CompactPostList.tsx
var import_jsx_runtime = require_jsx_runtime();
var List$1 = Tt.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
var Item = Tt.li`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.7rem 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;
var Rank = Tt.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.borderStrong};
  flex-shrink: 0;
  width: 1.4rem;
`;
var ItemBody = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;
var ItemTitle = Tt(Link)`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;
var ItemMeta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var ShimmerLine$2 = Tt.div`
  height: 13px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
/**
* Dense, numbered, text-first list — no images. Suited to "Trending" /
* "Most Read" style rails where scanning many headlines quickly matters
* more than visual weight per item. Deliberately the opposite shape of
* PostCard, used to give the homepage real visual rhythm instead of every
* section looking like the same card repeated.
*/
function CompactPostList({ posts, isLoading }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, {
		"aria-hidden": "true",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { children: i + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine$2, { style: { width: "90%" } }) })] }, i))
	});
	if (posts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, { children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { children: index + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, {
		to: `/post/${post.slug}`,
		children: getPlainTitle(post)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemMeta, { children: formatPostDate(post.date) })] })] }, post.id)) });
}
//#endregion
//#region resources/js/components/PostRail.tsx
var Track = Tt.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.4rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 3px;
  }
`;
var Card$2 = Tt(Link)`
  flex: 0 0 220px;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
    text-decoration: none;
  }
`;
var Thumb$2 = Tt.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card$2}:hover & img {
    transform: scale(1.04);
  }
`;
var CardBody = Tt.div`
  padding: 0.75rem 0.85rem 0.9rem;
`;
var CardTitle = Tt.div`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
var CardMeta = Tt.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.4rem;
`;
var ShimmerCard$1 = Tt.div`
  flex: 0 0 220px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var ShimmerThumb$2 = Tt.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
/**
* Horizontally-scrolling image-forward card rail — good for visually
* heavy categories (Entertainment, Sports) where thumbnails carry real
* information and a flat text list would waste that. Distinct shape from
* CompactPostList and PostCard so the homepage reads as edited zones, not
* one repeated card pattern.
*/
function PostRail({ posts, isLoading }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
		"aria-hidden": "true",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerCard$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerThumb$2, {}) }, i))
	});
	if (posts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, { children: posts.map((post) => {
		const media = getFeaturedMedia(post);
		const imageUrl = getFeaturedImageUrl(media, 320);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$2, {
			to: `/post/${post.slug}`,
			children: [imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb$2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: media?.alt_text || getPlainTitle(post),
				loading: "lazy"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: getPlainTitle(post) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: formatPostDate(post.date) })] })]
		}, post.id);
	}) });
}
//#endregion
//#region resources/js/components/PostGrid.tsx
var Grid$1 = Tt.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
var Card$1 = Tt(Link)`
  display: flex;
  gap: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 0.75rem;
  transition: box-shadow 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    text-decoration: none;
  }
`;
var Thumb$1 = Tt.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
var Body$1 = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  justify-content: center;
`;
var Title$1 = Tt.div`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.32;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
var Meta$1 = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var ShimmerCard = Tt.div`
  display: flex;
  gap: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 0.75rem;
`;
var ShimmerThumb$1 = Tt.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
/**
* Compact grid of small image+text cards — a third distinct visual shape
* alongside CompactPostList (dense, no images) and PostRail (horizontal
* scroll, big images). Suited to a "Lifestyle"-style section with a
* moderate item count where a flat list feels sparse but big featured
* cards feel oversized.
*/
function PostGrid({ posts, isLoading, columns = 2 }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid$1, {
		$columns: columns,
		"aria-hidden": "true",
		children: Array.from({ length: columns * 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerThumb$1, {}) }, i))
	});
	if (posts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid$1, {
		$columns: columns,
		children: posts.map((post) => {
			const media = getFeaturedMedia(post);
			const imageUrl = getFeaturedImageUrl(media, 160);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, {
				to: `/post/${post.slug}`,
				children: [imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: media?.alt_text || getPlainTitle(post),
					loading: "lazy"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title$1, { children: getPlainTitle(post) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta$1, { children: formatPostDate(post.date) })] })]
			}, post.id);
		})
	});
}
//#endregion
//#region resources/js/components/YoutubeVideoCard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
var LiveBadge = Tt.span`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ theme }) => theme.colors.live};
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
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
var Title = Tt.p`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
* One video from the channel's live feed / recent uploads. Same
* click-to-mount-iframe pattern as VideoCard (for WP-post-embedded
* videos): the thumbnail is a static image, the real YouTube iframe only
* loads once the person actually presses play, so a page full of these
* doesn't eagerly load a dozen live YouTube embeds nobody asked for yet.
*/
function YoutubeVideoCard({ video, isLive = false }) {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThumbWrap, { children: [isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveBadge, { children: "Live" }), playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		src: `https://www.youtube.com/embed/${video.videoId}?autoplay=1`,
		title: video.title,
		allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
		referrerPolicy: "strict-origin-when-cross-origin",
		allowFullScreen: true
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		src: video.thumbnail,
		alt: video.title,
		loading: "lazy"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
		type: "button",
		onClick: () => setPlaying(true),
		"aria-label": `Play video: ${video.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, {}) })
	})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: video.title }), !isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatPostDate(video.publishedAt) })] })] });
}
//#endregion
//#region resources/js/components/YoutubeVideoGrid.tsx
var Grid = Tt.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
`;
var StateBox$1 = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var Shimmer$1 = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;

  @keyframes gtr-video-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;
var ShimmerThumb = Tt.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-video-shimmer 1.4s ease-in-out infinite;
`;
var ShimmerLine$1 = Tt.div`
  height: 12px;
  margin: 0.9rem 1rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-video-shimmer 1.4s ease-in-out infinite;
`;
function SkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
		"aria-hidden": "true",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shimmer$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerThumb, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine$1, { style: { width: "70%" } })] }, i))
	});
}
function YoutubeVideoGrid({ videos, isLoading, isError, error, isLive = false, emptyMessage = "No videos here yet — check back soon." }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonGrid, {});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBox$1, {
		role: "alert",
		children: [
			"Couldn't load videos right now",
			error instanceof Error ? `: ${error.message}` : ".",
			" Try refreshing the page."
		]
	});
	if (videos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox$1, { children: emptyMessage });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeVideoCard, {
		video,
		isLive
	}, video.videoId)) });
}
//#endregion
//#region resources/js/components/PodcastCard.tsx
var List = Tt.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.4rem;
  scrollbar-width: thin;
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
  display: flex;
  gap: 1rem;
  padding: 1rem;

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;
var ShimmerArt = Tt.div`
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
var ShimmerLines = Tt.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;
var ShimmerLine = Tt.div`
  height: 11px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;
function SkeletonList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"aria-hidden": "true",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shimmer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerArt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ShimmerLines, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine, { style: { width: "30%" } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine, { style: { width: "85%" } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine, { style: { width: "60%" } })
		] })] }, i))
	});
}
function PodcastCard({ episodes, isLoading, isError, error }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonList, {});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBox, {
		role: "alert",
		children: [
			"Couldn't load episodes right now",
			error instanceof Error ? `: ${error.message}` : ".",
			" Try refreshing the page."
		]
	});
	if (episodes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No episodes here yet — check back soon." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: episodes.map((episode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastEpisodeCard, {
		episode,
		showExternal: false
	}, episode.id)) });
}
//#endregion
//#region resources/js/pages/Home.tsx
var YOUTUBE_TEASER_COUNT = 4;
var SectionHead = Tt.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;
var SectionTitle = Tt.h2`
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
`;
var SectionAccent = Tt.span`
  display: inline-block;
  width: 22px;
  height: 3px;
  background: ${({ theme }) => theme.colors.gold};
  margin-right: 0.6rem;
`;
/** Caps the secondary banner slot to a real 728x90 Leaderboard's own
width, since SponsoredBanner itself now always fills 100% of whatever
container it's placed in - the main hero slot above wants that
full-bleed behavior, this one deliberately doesn't (a 728px-sized
creative would render blurry stretched any wider). */
var SecondaryBannerWrap = Tt.div`
  max-width: 728px;
  margin: 0 auto;
`;
var SeeAllLink = Tt(Link)`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;
/**
* `min-width: 0` matters whenever this is placed as a grid/flex item (as
* CategorySection now is, inside TopStoriesGrid alongside the Engagement
* banner) - a grid/flex item's default min-width is `auto`, which means
* "at least the min-content size of its descendants," not zero. PostRail's
* cards use `flex: 0 0 220px` (explicitly non-shrinking), so their summed
* width becomes this item's min-content floor - forcing the grid column
* to that width regardless of its `1fr` track and breaking the mobile
* single-column collapse entirely. Real bug found on a real mobile view.
*/
var Section = Tt.section`
  margin: 2.5rem 0;
  min-width: 0;
`;
/**
* Two-zone layout: a wide "Top Stories" grid alongside a narrow "Trending"
* rail. On narrower viewports the trending rail drops below the grid
* rather than squeezing into a useless sliver.
*/
var SplitZone = Tt.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;
var TopStoriesGrid = Tt.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
var TrendingPanel = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.25rem 1.4rem;
`;
/**
* Resilient wrapper for a category-driven homepage section: only renders
* if there are posts to show. An unconfirmed category slug simply produces
* no section at all rather than an empty, broken-looking gap with a
* heading and nothing under it.
*/
function CategorySection({ title, categorySlug, seeAllHref, hasPosts, children }) {
	if (!hasPosts) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		"aria-label": title,
		"data-category": categorySlug,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), title] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeeAllLink, {
			to: seeAllHref,
			children: "See all →"
		})] }), children]
	});
}
/**
* Ported from the Vite SPA's src/pages/Home.tsx. Data now arrives as props
* from HomeController (fetched server-side, during the Inertia/SSR render)
* instead of via react-query hooks in the browser — same WordPress and
* portal content, same layout, but crawlers now get it as real HTML on the
* first response.
*/
function Home({ banners, secondaryBanners, houseHorizontalBanners, houseVerticalBanners, houseSquareBanners, engagementBanners, heroPosts, topGridPosts, trendingPosts, riverPosts, entertainmentPosts, sportsPosts, lifestylePosts, podcasts, videoPosts, youtubeVideos, youtubeError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "News, politics, music, lifestyle and entertainment for the youth voice in Ghana."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeMasthead, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banners }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryBannerWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banners: secondaryBanners }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsTicker, { posts: heroPosts }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHeroBlock, {
			heroPosts,
			mostRead: trendingPosts,
			subStories: heroPosts.slice(1, 4),
			engagementBanners
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banners: houseHorizontalBanners }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "Top Stories"] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitZone, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopStoriesGrid, { children: topGridPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingPanel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				style: {
					marginBottom: "0.5rem",
					fontSize: "0.85rem"
				},
				children: "Trending"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactPostList, {
				posts: trendingPosts,
				isLoading: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banners: houseVerticalBanners })
		] })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySection, {
			title: "Entertainment",
			categorySlug: "entertainment",
			seeAllHref: "/category/entertainment",
			hasPosts: entertainmentPosts.length > 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostRail, {
				posts: entertainmentPosts,
				isLoading: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banners: houseSquareBanners }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyStoriesSection, {
			title: "Sports",
			subtitle: "The scores, signings and storylines from the pitches, courts and tracks this week.",
			posts: sportsPosts
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySection, {
			title: "Lifestyle",
			categorySlug: "lifestyle",
			seeAllHref: "/category/lifestyle",
			hasPosts: lifestylePosts.length > 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostGrid, {
				posts: lifestylePosts,
				isLoading: false,
				columns: 4
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySection, {
			title: "Podcasts",
			categorySlug: "podcasts",
			seeAllHref: "/podcast",
			hasPosts: podcasts.episodes.length > 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastCard, {
				episodes: podcasts.episodes,
				isLoading: false,
				isError: false
			})
		}),
		videoPosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "Playlist"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeeAllLink, {
			to: "/playlist",
			children: "See all →"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoGrid, {
			posts: videoPosts,
			isLoading: false,
			isError: false
		})] }),
		youtubeVideos.length > 0 && !youtubeError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "Videos"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeeAllLink, {
			to: "/videos",
			children: "See all →"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeVideoGrid, {
			videos: youtubeVideos.slice(0, YOUTUBE_TEASER_COUNT),
			isLoading: false,
			isError: youtubeError
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultimediaDeskSection, {
			posts: riverPosts,
			trending: trendingPosts
		})
	] });
}
//#endregion
export { Home, Home as default };
