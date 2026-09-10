import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { i as router3, t as Head_default } from "./index.esm-zJybEw0J.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { t as formatPostDate } from "./wpContent-DNP0YQ-E.js";
//#region resources/js/components/FeaturedVideoPanel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Panel = Tt.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.75rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;
var FeaturedCard = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
`;
var ThumbWrap$1 = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
`;
var Thumb$1 = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var Frame = Tt.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
var LiveBadge = Tt.span`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ theme }) => theme.colors.live};
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.65rem;
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
var PlayCircle$1 = Tt.span`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge}:hover & {
    transform: scale(1.08);
  }
`;
var FeaturedBody = Tt.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;
var FeaturedTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.5rem;
`;
var FeaturedMeta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var Sidebar = Tt.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
var SidebarHeading = Tt.h3`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.4rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
var SidebarItem = Tt.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
`;
var SidebarThumbWrap = Tt.div`
  position: relative;
  flex-shrink: 0;
  width: 108px;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
`;
var SidebarThumb = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var SidebarPlayGlyph = Tt.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(21, 23, 28, 0.22);
  transition: background 0.15s ease;

  ${SidebarItem}:hover & {
    background: rgba(21, 23, 28, 0.4);
  }
`;
var SidebarTitle = Tt.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${SidebarItem}:hover & {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
function PlayGlyph$1({ size = 22 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size * .7,
		height: size,
		viewBox: "0 0 18 20",
		fill: "#fff",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L18 10L0 20V0Z" })
	});
}
/**
* Featured video + "Explore More" sidebar, adapted from a BBC-style video
* hub layout to GhanaTalksRadio's own design system (gold accent, Space
* Grotesk display face) - the structure (large player, compact clickable
* list beside it) carries over, the visual language doesn't.
*
* Same click-to-mount-iframe pattern used everywhere else on the site for
* YouTube embeds - only the actually-playing video ever loads an iframe.
* Picking a sidebar video swaps it into the featured slot and starts it
* playing immediately, matching the explicit intent of clicking it.
*/
function FeaturedVideoPanel({ featured, isLive, sidebarVideos, onSelectSidebarVideo }) {
	const [playingId, setPlayingId] = (0, import_react.useState)(null);
	const isPlaying = playingId === featured.videoId;
	function handleSelect(video) {
		setPlayingId(null);
		onSelectSidebarVideo(video);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThumbWrap$1, { children: [isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveBadge, { children: "Live" }), isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		src: `https://www.youtube.com/embed/${featured.videoId}?autoplay=1`,
		title: featured.title,
		allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
		referrerPolicy: "strict-origin-when-cross-origin",
		allowFullScreen: true
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb$1, {
		src: featured.thumbnail,
		alt: featured.title,
		loading: "lazy"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
		type: "button",
		onClick: () => setPlayingId(featured.videoId),
		"aria-label": `Play video: ${featured.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph$1, { size: 26 }) })
	})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedTitle, { children: featured.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedMeta, { children: isLive ? "Live now" : formatPostDate(featured.publishedAt) })] })] }), sidebarVideos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		"aria-label": "Explore more videos",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeading, { children: "Explore More" }), sidebarVideos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarItem, {
			type: "button",
			onClick: () => handleSelect(video),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarThumbWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarThumb, {
				src: video.thumbnail,
				alt: "",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarPlayGlyph, {
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph$1, { size: 16 })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTitle, { children: video.title })]
		}, video.videoId))]
	})] });
}
//#endregion
//#region resources/js/components/VideoCarousel.tsx
var Wrap = Tt.div`
  position: relative;
`;
var Grid = Tt.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
var CardButton = Tt.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
  }
`;
var ThumbWrap = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;
var Thumb = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var PlayCircle = Tt.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(21, 23, 28, 0.16);
    transition: background 0.15s ease;
  }

  ${CardButton}:hover &::after {
    background: rgba(21, 23, 28, 0.3);
  }
`;
var PlayGlyphCircle = Tt.span`
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;

  ${CardButton}:hover & {
    transform: scale(1.08);
  }
`;
var CardBody = Tt.div`
  padding: 0.85rem 0.95rem 1rem;
`;
var CardTitle = Tt.span`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.4rem;
`;
var CardMeta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var LoadMoreWrap = Tt.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;
var LoadMoreButton = Tt.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.colors.goldTint};
  border: 1px dashed ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.goldDark};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gold};
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
function PlayGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "13",
		height: "15",
		viewBox: "0 0 18 20",
		fill: "#15171C",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L18 10L0 20V0Z" })
	});
}
/**
* "In case you missed it" video grid - 5 columns, growing downward as more
* pages load (was a horizontal scroll rail; changed per product request).
* A trailing "Load more" button below the grid appends the next YouTube
* page into the same grid (backed by Inertia's merge-prop pagination, same
* mechanism the rail used).
*/
function VideoCarousel({ videos, onSelectVideo, onLoadMore, loadingMore, hasMore }) {
	if (videos.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardButton, {
		type: "button",
		onClick: () => onSelectVideo(video),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThumbWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			src: video.thumbnail,
			alt: "",
			loading: "lazy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyphCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, {}) }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: video.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: formatPostDate(video.publishedAt) })] })]
	}, video.videoId)) }), hasMore && onLoadMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadMoreWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadMoreButton, {
		type: "button",
		onClick: onLoadMore,
		disabled: loadingMore,
		children: loadingMore ? "Loading…" : "Load More"
	}) })] });
}
//#endregion
//#region resources/js/pages/Videos.tsx
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
var Section = Tt.section`
  margin: 2.5rem 0;
`;
var SectionTitle = Tt.h2`
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;
var SectionAccent = Tt.span`
  display: inline-block;
  width: 22px;
  height: 3px;
  background: ${({ theme }) => theme.colors.gold};
  margin-right: 0.6rem;
`;
var ErrorNotice = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.9rem;
  padding: 1rem 0;
`;
/**
* Redesigned per a BBC News-style video hub reference: a large featured
* video with an "Explore More" sidebar, plus a horizontal "In case you
* missed it" carousel below - adapted to GhanaTalksRadio's own gold/warm
* design system rather than a literal reskin. Replaces the previous
* Live Now + Recent Videos grid layout.
*
* The live broadcast (if any) is always the default featured video;
* otherwise the newest upload is. Selecting anything from the sidebar or
* carousel swaps it into the featured slot, same as clicking a "watch
* next" item on any video platform.
*
* YouTube's own page_token cursor (opaque, not a real page number) is
* handled via Inertia's merge-prop support (VideosController marks
* `videos` with Inertia::merge()) - the carousel's trailing "Load more"
* card re-visits this route with the next token and the new batch is
* appended automatically.
*/
function Videos({ liveVideos, videos, nextPageToken, isError }) {
	const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
	const [selectedVideo, setSelectedVideo] = (0, import_react.useState)(null);
	const liveIds = (0, import_react.useMemo)(() => new Set(liveVideos.map((v) => v.videoId)), [liveVideos]);
	const recentVideos = (0, import_react.useMemo)(() => videos.filter((v) => !liveIds.has(v.videoId)), [videos, liveIds]);
	const defaultFeatured = liveVideos[0] ?? recentVideos[0] ?? null;
	const featured = selectedVideo ?? defaultFeatured;
	const isFeaturedLive = featured !== null && liveIds.has(featured.videoId);
	const remaining = (0, import_react.useMemo)(() => [...liveVideos, ...recentVideos].filter((v) => v.videoId !== featured?.videoId), [
		liveVideos,
		recentVideos,
		featured
	]);
	const sidebarVideos = remaining.slice(0, 8);
	const carouselVideos = remaining.slice(4);
	function handleSelectVideo(video) {
		setSelectedVideo(video);
	}
	function handleLoadMore() {
		if (!nextPageToken) return;
		setLoadingMore(true);
		router3.get("/videos", { page_token: nextPageToken }, {
			preserveState: true,
			preserveScroll: true,
			only: [
				"videos",
				"nextPageToken",
				"isError"
			],
			onFinish: () => setLoadingMore(false)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Videos | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "Watch GhanaTalksRadio live on YouTube, plus recent uploads — news, music and talk."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Watch" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Videos" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Live broadcasts and recent uploads from the GhanaTalksRadio YouTube channel." })
		] }),
		isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { children: "Videos are temporarily unavailable — please check back soon." }),
		featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedVideoPanel, {
			featured,
			isLive: isFeaturedLive,
			sidebarVideos,
			onSelectSidebarVideo: handleSelectVideo
		}) }),
		carouselVideos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "In Case You Missed It"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCarousel, {
			videos: carouselVideos,
			onSelectVideo: handleSelectVideo,
			onLoadMore: handleLoadMore,
			loadingMore,
			hasMore: !isError && Boolean(nextPageToken)
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.horizontal
		})
	] });
}
//#endregion
export { Videos, Videos as default };
