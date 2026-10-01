import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, s as qt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { i as router3, t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { r as useAudioPlayer } from "./AudioPlayerContext-D8RFr5Sn.js";
import { a as getVideoStreamStatus, c as getVodVideos, f as toggleVodLike, l as postVodComment, n as getCurrentScheduledPlaylistItem, o as getVodComments, s as getVodVideo, t as getDeviceId } from "./deviceId-D7ymQWPP.js";
import { n as useFloatingVideo } from "./FloatingVideoContext-Bw-jiMdt.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as formatPostDate, u as getYouTubeVideoId } from "./wpContent-FS3Fyx5P.js";
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
var ThumbWrap$2 = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
`;
var Thumb$2 = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var Frame = Tt.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
var LiveBadge$1 = Tt.span`
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
var PlayBadge$1 = Tt.button`
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
var PlayCircle$2 = Tt.span`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge$1}:hover & {
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
function PlayGlyph$2({ size = 22 }) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThumbWrap$2, { children: [isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveBadge$1, { children: "Live" }), isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		src: `https://www.youtube.com/embed/${featured.videoId}?autoplay=1`,
		title: featured.title,
		allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
		referrerPolicy: "strict-origin-when-cross-origin",
		allowFullScreen: true
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb$2, {
		src: featured.thumbnail,
		alt: featured.title,
		loading: "lazy"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge$1, {
		type: "button",
		onClick: () => setPlayingId(featured.videoId),
		"aria-label": `Play video: ${featured.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle$2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph$2, { size: 26 }) })
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph$2, { size: 16 })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTitle, { children: video.title })]
		}, video.videoId))]
	})] });
}
//#endregion
//#region resources/js/components/VideoCarousel.tsx
var Wrap = Tt.div`
  position: relative;
`;
var Grid$1 = Tt.div`
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
var CardButton$1 = Tt.button`
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
var ThumbWrap$1 = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;
var Thumb$1 = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var PlayCircle$1 = Tt.span`
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

  ${CardButton$1}:hover &::after {
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

  ${CardButton$1}:hover & {
    transform: scale(1.08);
  }
`;
var CardBody$1 = Tt.div`
  padding: 0.85rem 0.95rem 1rem;
`;
var CardTitle$1 = Tt.span`
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
var CardMeta$1 = Tt.span`
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
function PlayGlyph$1() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid$1, { children: videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardButton$1, {
		type: "button",
		onClick: () => onSelectVideo(video),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThumbWrap$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb$1, {
			src: video.thumbnail,
			alt: "",
			loading: "lazy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyphCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph$1, {}) }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle$1, { children: video.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta$1, { children: formatPostDate(video.publishedAt) })] })]
	}, video.videoId)) }), hasMore && onLoadMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadMoreWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadMoreButton, {
		type: "button",
		onClick: onLoadMore,
		disabled: loadingMore,
		children: loadingMore ? "Loading…" : "Load More"
	}) })] });
}
//#endregion
//#region resources/js/components/VodSection.tsx
var youtubeApiPromise = null;
/** Loads the YouTube IFrame Player API script at most once per page - a second call while it's already loading/loaded resolves from the same shared promise. */
function loadYoutubeIframeApi() {
	if (window.YT?.Player) return Promise.resolve();
	if (youtubeApiPromise) return youtubeApiPromise;
	youtubeApiPromise = new Promise((resolve) => {
		const previousCallback = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			previousCallback?.();
			resolve();
		};
		const script = document.createElement("script");
		script.src = "https://www.youtube.com/iframe_api";
		document.head.appendChild(script);
	});
	return youtubeApiPromise;
}
var pulse = qt`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;
var HeroCard = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
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
var ThumbPlaceholder = Tt.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.ink}, #2a2d36);
`;
/** YT.Player mounts its own iframe into this div - see loadYoutubeIframeApi(). */
var YoutubePlayerHost = Tt.div`
  width: 100%;
  height: 100%;

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
var YoutubeFrame = Tt.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
`;
var LiveBadge = Tt.span`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  /* Must paint above FloatingVideoPlayer's OverlayHost, a position:fixed
     sibling elsewhere in the tree that visually sits at this exact spot
     when docked (see that file's own docblock) - z-index: 1 was enough
     back when the <video> was a plain DOM sibling here, but a fixed
     element needs a real numeric gap over OverlayHost's own (deliberately
     low, 2) docked z-index to reliably stack above it regardless of DOM
     order. */
  z-index: 10;
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
    animation: ${pulse} 1.6s ease-in-out infinite;
  }
`;
var UnmuteBadge = Tt.button`
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  /* See LiveBadge's own comment on why this needs to be a real gap above
     OverlayHost's docked z-index (2), not just above the old z-index: 1
     it used to only need to beat. */
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: rgba(21, 23, 28, 0.72);
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.88);
  }
`;
var JoinLiveButton = Tt.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* See LiveBadge's own comment - must clear OverlayHost's docked z-index. */
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: none;
  background: rgba(21, 23, 28, 0.28);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.42);
  }
`;
var JoinLivePill = Tt.span`
  /* Explicitly stacked above the absolutely-positioned ThumbPlaceholder
     sibling - without this, the pill (an in-flow flex item) paints
     *below* the abs-positioned placeholder in every browser tested and
     is invisible despite being technically present/accessible in the DOM. */
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.pill};
`;
var PlayBadge = Tt.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* See LiveBadge's own comment - must clear OverlayHost's docked z-index. */
  z-index: 10;
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
var HeroBody = Tt.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;
var HeroTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.5rem;
`;
var HeroMetaRow = Tt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`;
var HeroMeta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var EngagementRow = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;
var LikeButton = Tt.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme, $liked }) => $liked ? theme.colors.gold : theme.colors.border};
  background: ${({ theme, $liked }) => $liked ? theme.colors.goldTint : "transparent"};
  color: ${({ theme, $liked }) => $liked ? theme.colors.goldDark : theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
var CommentsToggleBtn = Tt.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;
var CommentsBox = Tt.div`
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;
var CommentRow = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
var CommentTopRow = Tt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;
var CommentAuthor = Tt.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;
var CommentBody = Tt.p`
  margin: 0;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var CommentForm = Tt.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;
var CommentInputRow = Tt.div`
  display: flex;
  gap: 0.5rem;
`;
var TextField = Tt.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};
`;
var SubmitButton = Tt.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
var EmptyNote = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
var GridTitle = Tt.h3`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 1.75rem 0 1rem;
`;
var Grid = Tt.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
var CardThumbWrap = Tt.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;
var CardThumb = Tt.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var CardDuration = Tt.span`
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
  background: rgba(15, 17, 22, 0.78);
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
`;
var CardBody = Tt.div`
  padding: 0.85rem 0.95rem 1rem;
`;
var CardTitle = Tt.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 0.4rem;
`;
var CardMeta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
function PlayGlyph({ size = 22 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size * .7,
		height: size,
		viewBox: "0 0 18 20",
		fill: "#fff",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L18 10L0 20V0Z" })
	});
}
function MutedGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 16,
		height: 16,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "#fff",
		strokeWidth: 2,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 5 6 9H2v6h4l5 4V5Z",
			fill: "#fff",
			stroke: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M23 9 17 15M17 9l6 6",
			strokeLinecap: "round"
		})]
	});
}
function formatDuration(seconds) {
	if (seconds === null || Number.isNaN(seconds)) return null;
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
function formatCommentDate(dateString) {
	return new Date(dateString.replace(" ", "T")).toLocaleDateString();
}
/**
* Live-or-VOD hero + browsable VOD grid + likes/comments for the currently
* featured video — the new half of the /videos page (see the "VOD + video
* hub" plan, Part B). Fully separate data source from the YouTube-backed
* FeaturedVideoPanel/VideoCarousel section that already exists on this
* page — this talks to the portal's new `Modules\VideoOnDemand` API
* (being built in parallel; every call below degrades to an empty/loading
* state rather than crashing if that backend isn't up yet).
*
* Hero priority: a live broadcast (video_live) is the default when nothing
* else has been explicitly picked; otherwise the most recently published
* VOD video is. Picking any video from the grid below overrides that
* default for the rest of the page's lifetime (no auto-return to Live —
* the user can always scroll back to a "Join Live" card in the grid, or
* refresh, matching how FeaturedVideoPanel's own sidebar selection works
* on the YouTube section further down this page).
*
* Live/scheduled/VOD native-<video> playback itself (hls.js setup,
* requestPlay/session heartbeat, autoplay-policy muted fallback) lives in
* FloatingVideoContext, not here - this component only decides WHICH
* source should be featured and calls that context's actions
* (joinLive/playScheduledNative/playVodNative); the context owns the
* actual element so a floated video/live session survives this component
* unmounting on navigation. See that context's own docblock for the full
* reasoning. Only a YouTube-embedded scheduled/VOD item is still handled
* entirely locally here - that's a real, documented limitation, not an
* oversight (see the render branches below and FloatingVideoContext's own
* docblock).
*/
function VodSection() {
	const { liveStatus, isLive, scheduledCurrent, active, playBlocked, muted, registerDockTarget, joinLive, playScheduledNative, playVodNative, tapToPlay, unmute, refreshScheduledCurrent } = useFloatingVideo();
	const [vodVideos, setVodVideos] = (0, import_react.useState)([]);
	const [vodLoading, setVodLoading] = (0, import_react.useState)(true);
	const [vodError, setVodError] = (0, import_react.useState)(false);
	const [selectedVod, setSelectedVod] = (0, import_react.useState)(() => active?.kind === "vod" ? active.video : null);
	const [vodPlaying, setVodPlaying] = (0, import_react.useState)(() => active?.kind === "vod");
	const [featuredDetail, setFeaturedDetail] = (0, import_react.useState)(null);
	const [liked, setLiked] = (0, import_react.useState)(false);
	const [likesCount, setLikesCount] = (0, import_react.useState)(0);
	const [liking, setLiking] = (0, import_react.useState)(false);
	const [showComments, setShowComments] = (0, import_react.useState)(false);
	const [comments, setComments] = (0, import_react.useState)(null);
	const [commentsLoading, setCommentsLoading] = (0, import_react.useState)(false);
	const [guestName, setGuestName] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [posting, setPosting] = (0, import_react.useState)(false);
	const scheduledYoutubeContainerRef = (0, import_react.useRef)(null);
	const scheduledYoutubePlayerRef = (0, import_react.useRef)(null);
	const [scheduledPlayBlocked, setScheduledPlayBlocked] = (0, import_react.useState)(false);
	const [scheduledMuted, setScheduledMuted] = (0, import_react.useState)(false);
	const { notifyStop } = useAudioPlayer();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getVodVideos().then(({ videos }) => {
			if (cancelled) return;
			const sorted = [...videos].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
			setVodVideos(sorted);
		}).catch(() => {
			if (!cancelled) setVodError(true);
		}).finally(() => {
			if (!cancelled) setVodLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const mostRecentVod = vodVideos[0] ?? null;
	const showLiveHero = isLive && !selectedVod;
	const showScheduledHero = !showLiveHero && !selectedVod && Boolean(scheduledCurrent);
	const scheduledVodDto = scheduledCurrent ? {
		id: scheduledCurrent.video.id,
		title: scheduledCurrent.video.title,
		slug: scheduledCurrent.video.slug,
		description: "",
		video_url: scheduledCurrent.video.video_url,
		thumbnail_url: scheduledCurrent.video.thumbnail_url,
		duration_seconds: null,
		views_count: 0,
		likes_count: 0,
		published_at: ""
	} : null;
	const featuredVod = selectedVod ?? (showScheduledHero ? scheduledVodDto : mostRecentVod);
	(0, import_react.useEffect)(() => {
		if (!featuredVod) {
			setFeaturedDetail(null);
			return;
		}
		let cancelled = false;
		getVodVideo(featuredVod.slug).then((detail) => {
			if (cancelled) return;
			setFeaturedDetail(detail);
			setLikesCount(detail.likes_count);
			setLiked(false);
			setShowComments(false);
			setComments(null);
		}).catch(() => {
			if (!cancelled) setFeaturedDetail(null);
		});
		return () => {
			cancelled = true;
		};
	}, [featuredVod?.slug]);
	(0, import_react.useEffect)(() => {
		if (!showScheduledHero || !scheduledCurrent) return;
		const current = scheduledCurrent;
		const youtubeId = getYouTubeVideoId(current.video.video_url);
		let cancelled = false;
		if (youtubeId) {
			if (!scheduledYoutubeContainerRef.current) return;
			const container = scheduledYoutubeContainerRef.current;
			loadYoutubeIframeApi().then(() => {
				if (cancelled || !container) return;
				scheduledYoutubePlayerRef.current = new window.YT.Player(container, {
					videoId: youtubeId,
					playerVars: {
						autoplay: 1,
						playsinline: 1,
						start: Math.max(0, Math.floor(current.offset_seconds))
					},
					events: {
						onReady: (event) => {
							event.target.playVideo();
							setTimeout(() => {
								if (cancelled) return;
								if (event.target.getPlayerState?.() !== window.YT.PlayerState.PLAYING) {
									event.target.mute();
									event.target.playVideo();
									setScheduledMuted(true);
								}
							}, 700);
							setScheduledPlayBlocked(false);
						},
						onStateChange: (event) => {
							if (event.data === window.YT.PlayerState.ENDED) refreshScheduledCurrent();
						},
						onError: () => refreshScheduledCurrent()
					}
				});
			});
			return () => {
				cancelled = true;
				scheduledYoutubePlayerRef.current?.destroy?.();
				scheduledYoutubePlayerRef.current = null;
				notifyStop(`scheduled-${current.video.id}`);
				setScheduledPlayBlocked(false);
				setScheduledMuted(false);
			};
		}
		if (active?.kind === "scheduled" && active.id === current.video.id) return;
		playScheduledNative(current);
	}, [showScheduledHero, scheduledCurrent?.video.id]);
	function handleTapToPlayScheduled() {
		if (scheduledYoutubePlayerRef.current) {
			scheduledYoutubePlayerRef.current.playVideo();
			setScheduledPlayBlocked(false);
			return;
		}
		tapToPlay();
	}
	function handleUnmuteScheduled() {
		if (scheduledYoutubePlayerRef.current) {
			scheduledYoutubePlayerRef.current.unMute();
			setScheduledMuted(false);
			return;
		}
		unmute();
	}
	function handleJoinLive() {
		joinLive();
	}
	(0, import_react.useEffect)(() => {
		if (!featuredVod || getYouTubeVideoId(featuredVod.video_url)) return;
		setVodPlaying(active?.kind === "vod" && active.video.id === featuredVod.id);
	}, [active, featuredVod?.id]);
	function handlePlayFeaturedVod() {
		if (!featuredVod) return;
		setVodPlaying(true);
		if (!getYouTubeVideoId(featuredVod.video_url)) playVodNative(featuredVod);
	}
	function handleSelectVod(video) {
		setSelectedVod(video);
		setVodPlaying(true);
		if (!getYouTubeVideoId(video.video_url)) playVodNative(video);
	}
	function handleToggleLike() {
		if (!featuredDetail || liking) return;
		setLiking(true);
		toggleVodLike(featuredDetail.id, getDeviceId()).then((result) => {
			setLiked(result.liked);
			setLikesCount(result.likes_count);
		}).catch(() => {}).finally(() => setLiking(false));
	}
	function toggleComments() {
		const next = !showComments;
		setShowComments(next);
		if (next && comments === null && featuredDetail) {
			setCommentsLoading(true);
			getVodComments(featuredDetail.id).then(({ comments }) => setComments(comments)).catch(() => setComments([])).finally(() => setCommentsLoading(false));
		}
	}
	function handlePostComment(e) {
		e.preventDefault();
		if (!featuredDetail) return;
		const body = draft.trim();
		if (!body || !guestName.trim()) return;
		setPosting(true);
		postVodComment(featuredDetail.id, {
			deviceId: getDeviceId(),
			guestName: guestName.trim(),
			body
		}).then((comment) => {
			setComments((prev) => [...prev ?? [], comment]);
			setDraft("");
		}).catch(() => {}).finally(() => setPosting(false));
	}
	const gridVideos = vodVideos.filter((v) => v.id !== featuredVod?.id);
	const hasHero = showLiveHero || Boolean(featuredVod);
	const scheduledIsYoutube = scheduledCurrent ? Boolean(getYouTubeVideoId(scheduledCurrent.video.video_url)) : false;
	const scheduledNativeActive = active?.kind === "scheduled";
	if (!hasHero) {
		if (vodLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Loading videos…" });
		return vodError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Videos are temporarily unavailable — please check back soon." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "No videos available yet — check back soon." });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [hasHero && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbWrap, { children: showLiveHero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveBadge, { children: "Live" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: registerDockTarget,
			style: {
				width: "100%",
				height: "100%"
			}
		}),
		active?.kind === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [playBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
			type: "button",
			onClick: tapToPlay,
			"aria-label": "Tap to start the live video",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, { size: 26 }) })
		}), muted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnmuteBadge, {
			type: "button",
			onClick: unmute,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MutedGlyph, {}), "Tap to unmute"]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JoinLiveButton, {
			type: "button",
			onClick: handleJoinLive,
			"aria-label": "Join the live video stream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbPlaceholder, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(JoinLivePill, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, { size: 16 }), "Join Live"] })]
		})
	] }) : showScheduledHero && scheduledCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveBadge, { children: "Now Playing" }),
		scheduledIsYoutube ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubePlayerHost, { ref: scheduledYoutubeContainerRef }, `scheduled-yt-${scheduledCurrent.video.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: registerDockTarget,
			style: {
				width: "100%",
				height: "100%"
			}
		}, `scheduled-${scheduledCurrent.video.id}`),
		(scheduledIsYoutube ? scheduledPlayBlocked : scheduledNativeActive && playBlocked) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
			type: "button",
			onClick: handleTapToPlayScheduled,
			"aria-label": "Tap to start this video",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, { size: 26 }) })
		}),
		(scheduledIsYoutube ? scheduledMuted : scheduledNativeActive && muted) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnmuteBadge, {
			type: "button",
			onClick: handleUnmuteScheduled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MutedGlyph, {}), "Tap to unmute"]
		})
	] }) : featuredVod ? getYouTubeVideoId(featuredVod.video_url) ? vodPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeFrame, {
		src: `https://www.youtube.com/embed/${getYouTubeVideoId(featuredVod.video_url)}?autoplay=1`,
		title: featuredVod.title,
		allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
		referrerPolicy: "strict-origin-when-cross-origin",
		allowFullScreen: true
	}, `vod-yt-${featuredVod.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [featuredVod.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		src: featuredVod.thumbnail_url,
		alt: featuredVod.title,
		loading: "lazy"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbPlaceholder, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
		type: "button",
		onClick: handlePlayFeaturedVod,
		"aria-label": `Play video: ${featuredVod.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, { size: 26 }) })
	})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: registerDockTarget,
		style: {
			width: "100%",
			height: "100%"
		}
	}, `vod-${featuredVod.id}`), !vodPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [featuredVod.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		src: featuredVod.thumbnail_url,
		alt: featuredVod.title,
		loading: "lazy"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbPlaceholder, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayBadge, {
		type: "button",
		onClick: handlePlayFeaturedVod,
		"aria-label": `Play video: ${featuredVod.title}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayCircle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, { size: 26 }) })
	})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbPlaceholder, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroBody, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroTitle, { children: showLiveHero ? liveStatus?.label || "GhanaTalksRadio Live" : featuredVod?.title }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroMetaRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMeta, { children: showLiveHero ? "Live now" : showScheduledHero ? "Now playing" : featuredVod ? `${formatPostDate(featuredVod.published_at)} · ${featuredVod.views_count.toLocaleString()} views` : null }), !showLiveHero && featuredDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EngagementRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LikeButton, {
			type: "button",
			$liked: liked,
			disabled: liking,
			onClick: handleToggleLike,
			children: [
				liked ? "♥" : "♡",
				" ",
				likesCount.toLocaleString()
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentsToggleBtn, {
			type: "button",
			onClick: toggleComments,
			children: ["💬 ", (featuredDetail.comments_count ?? 0).toLocaleString()]
		})] })] }),
		!showLiveHero && showComments && featuredDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentsBox, { children: [commentsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Loading comments…" }) : !comments || comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "No comments yet — be the first." }) : comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentTopRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentAuthor, { children: c.author }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMeta, { children: formatCommentDate(c.created_at) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentBody, { children: c.body })] }, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentForm, {
			onSubmit: handlePostComment,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				placeholder: "Your name",
				value: guestName,
				onChange: (e) => setGuestName(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentInputRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				style: { flex: 1 },
				placeholder: "Add a comment",
				value: draft,
				onChange: (e) => setDraft(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				type: "submit",
				disabled: posting,
				children: posting ? "Posting…" : "Post"
			})] })]
		})] })
	] })] }), gridVideos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridTitle, { children: "More Videos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: gridVideos.map((video) => {
		const duration = formatDuration(video.duration_seconds);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardButton, {
			type: "button",
			onClick: () => handleSelectVod(video),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardThumbWrap, { children: [video.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardThumb, {
				src: video.thumbnail_url,
				alt: "",
				loading: "lazy"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbPlaceholder, {}), duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDuration, { children: duration })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: video.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [
				formatPostDate(video.published_at),
				" · ",
				video.views_count.toLocaleString(),
				" views"
			] })] })]
		}, video.id);
	}) })] })] });
}
//#endregion
//#region resources/js/pages/Videos.tsx
var STATUS_POLL_MS = 15e3;
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
	const [studioStatus, setStudioStatus] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const poll = () => {
			getVideoStreamStatus().then((result) => {
				if (!cancelled) setStudioStatus(result);
			}).catch(() => {});
		};
		poll();
		const handle = setInterval(poll, STATUS_POLL_MS);
		return () => {
			cancelled = true;
			clearInterval(handle);
		};
	}, []);
	const isStudioLive = Boolean(studioStatus?.video_live && studioStatus.hls_url);
	const [hasScheduledVideo, setHasScheduledVideo] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const poll = () => {
			getCurrentScheduledPlaylistItem().then((result) => {
				if (!cancelled) setHasScheduledVideo(Boolean(result));
			}).catch(() => {});
		};
		poll();
		const handle = setInterval(poll, STATUS_POLL_MS);
		return () => {
			cancelled = true;
			clearInterval(handle);
		};
	}, []);
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
		(isStudioLive || hasScheduledVideo) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Watch" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Videos" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Live broadcasts and recent uploads from the GhanaTalksRadio YouTube channel." })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "Live & On Demand"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VodSection, {})] })] }),
		isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { children: "Videos are temporarily unavailable — please check back soon." }),
		featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "What you have missed"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedVideoPanel, {
			featured,
			isLive: isFeaturedLive,
			sidebarVideos,
			onSelectSidebarVideo: handleSelectVideo
		})] }),
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
