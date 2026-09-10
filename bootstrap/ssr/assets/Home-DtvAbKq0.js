import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, o as qt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { a as getFeaturedMedia, i as getFeaturedImageUrl, o as getPlainExcerpt, r as getEmbeddedCategories, s as getPlainTitle, t as formatPostDate } from "./wpContent-DNP0YQ-E.js";
import { n as PostCard, t as PostList } from "./PostList-CSLLYN5F.js";
import { t as SponsoredBanner } from "./SponsoredBanner-DmG_BriB.js";
import { t as VideoGrid } from "./VideoGrid-DvUkHi9S.js";
//#region resources/js/components/Hero.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ROTATE_MS = 6e3;
var FADE_MS = 600;
var Stage = Tt.div`
  position: relative;
  aspect-ratio: 16 / 8;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.shadow.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 5;
  }
`;
var Slide$1 = Tt.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity ${FADE_MS}ms ease;
  pointer-events: ${({ $active }) => $active ? "auto" : "none"};
`;
var SlideImage$1 = Tt.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var Scrim = Tt.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(21, 23, 28, 0.05) 0%,
    rgba(21, 23, 28, 0.35) 55%,
    rgba(21, 23, 28, 0.88) 100%
  );
`;
var SlideBody = Tt.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.25rem 2rem 2rem;
  max-width: 620px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 1.25rem 1.75rem;
  }
`;
var Eyebrow = Tt(Link)`
  display: inline-flex;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.gold};
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 0.85rem;

  &:hover {
    text-decoration: none;
    filter: brightness(1.05);
  }
`;
var SlideTitle = Tt(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.22;
  color: #fff;
  margin-bottom: 0.6rem;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;
var SlideExcerpt = Tt.p`
  display: none;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  max-width: 540px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
var SlideMeta = Tt.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 0.65rem;
`;
var DotRow = Tt.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 1.25rem;
    bottom: 1.25rem;
  }
`;
var Dot = Tt.button`
  width: ${({ $active }) => $active ? "22px" : "8px"};
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ $active }) => $active ? "#fff" : "rgba(255, 255, 255, 0.4)"};
  cursor: pointer;
  transition: width 0.25s ease, background 0.2s ease;
  padding: 0;
`;
var shimmer = qt`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;
var HeroSkeleton = Tt.div`
  aspect-ratio: 16 / 8;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 5;
  }
`;
/**
* Rotating hero showcasing the most recent posts with a cross-fade between
* slides. Auto-advances every ROTATE_MS, pauses while the tab is hidden
* (no point burning a fade cycle nobody sees), and respects
* prefers-reduced-motion by holding on the first slide instead of forcing
* the position-based timer to keep firing with motion the user opted out of.
*/
function Hero({ posts, isLoading }) {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const timerRef = (0, import_react.useRef)(null);
	const prefersReducedMotion = (0, import_react.useRef)(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	const slideCount = posts.length;
	const advance = (0, import_react.useCallback)(() => {
		setActiveIndex((i) => slideCount > 0 ? (i + 1) % slideCount : 0);
	}, [slideCount]);
	(0, import_react.useEffect)(() => {
		if (slideCount <= 1 || prefersReducedMotion.current) return;
		function start() {
			timerRef.current = setInterval(advance, ROTATE_MS);
		}
		function stop() {
			if (timerRef.current) clearInterval(timerRef.current);
		}
		function handleVisibility() {
			if (document.hidden) stop();
			else {
				stop();
				start();
			}
		}
		start();
		document.addEventListener("visibilitychange", handleVisibility);
		return () => {
			stop();
			document.removeEventListener("visibilitychange", handleVisibility);
		};
	}, [advance, slideCount]);
	if (isLoading || posts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSkeleton, { "aria-hidden": "true" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		role: "region",
		"aria-roledescription": "carousel",
		"aria-label": "Top stories",
		children: [posts.map((post, index) => {
			const media = getFeaturedMedia(post);
			const imageUrl = getFeaturedImageUrl(media, 1200);
			const categories = getEmbeddedCategories(post);
			const title = getPlainTitle(post);
			const isActive = index === activeIndex;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slide$1, {
				$active: isActive,
				"aria-hidden": !isActive,
				role: "group",
				"aria-roledescription": "slide",
				"aria-label": `${index + 1} of ${posts.length}`,
				children: [
					imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideImage$1, {
						src: imageUrl,
						alt: "",
						loading: index === 0 ? "eager" : "lazy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SlideBody, { children: [
						categories[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
							to: `/category/${categories[0].slug}`,
							tabIndex: isActive ? 0 : -1,
							children: categories[0].name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideTitle, {
							to: `/post/${post.slug}`,
							tabIndex: isActive ? 0 : -1,
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideExcerpt, { children: getPlainExcerpt(post, 140) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideMeta, { children: formatPostDate(post.date) })
					] })
				]
			}, post.id);
		}), slideCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotRow, { children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {
			type: "button",
			$active: index === activeIndex,
			onClick: () => setActiveIndex(index),
			"aria-label": `Show story ${index + 1} of ${slideCount}`
		}, post.id)) })]
	});
}
//#endregion
//#region resources/js/components/CompactPostList.tsx
var List = Tt.ol`
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
var ShimmerLine$1 = Tt.div`
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
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"aria-hidden": "true",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { children: i + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine$1, { style: { width: "90%" } }) })] }, i))
	});
	if (posts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: posts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rank, { children: index + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, {
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
//#region resources/js/components/EngagementBannerStrip.tsx
/** How long each banner stays on screen before cross-fading to the next. */
var ROTATE_INTERVAL_MS = 5e3;
/**
* A single-slot, auto-rotating cross-fade carousel of feature-highlight
* banners (Raffle, Predictions, Quiz, ...) pointing at GhanaTalksRadio's
* own pages - fed by PortalApiClient::fetchEngagementBanners()
* (Modules\Engagement on the portal side), not the Advertising module's
* SponsoredBanner/BannerDto. Shows exactly one banner at a time (not a
* grid of tiles - staff can upload as many as they like, only one is ever
* on screen), advancing through the admin-controlled order automatically.
*
* A fixed aspect-ratio frame with `object-fit: contain` (never `cover`)
* so a real designed creative - which can be portrait, square, or wide -
* is always shown in full, never cropped; this is also what makes it
* naturally mobile-responsive with no separate breakpoint logic, since a
* single scaling box has nothing to reflow.
*/
var Frame$1 = Tt.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 420px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
var Slide = Tt.a`
  position: absolute;
  inset: 0;
  display: block;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity 0.6s ease;
  pointer-events: ${({ $active }) => $active ? "auto" : "none"};
`;
var SlideImage = Tt.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
function EngagementBannerStrip({ banners }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (banners.length <= 1) return;
		const id = setInterval(() => {
			setIndex((current) => (current + 1) % banners.length);
		}, ROTATE_INTERVAL_MS);
		return () => clearInterval(id);
	}, [banners.length]);
	if (banners.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame$1, {
		"aria-label": "Featured GhanaTalksRadio features",
		"aria-live": "off",
		children: banners.map((banner, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slide, {
			href: banner.link_url,
			$active: i === index,
			"aria-hidden": i !== index,
			tabIndex: i === index ? 0 : -1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideImage, {
				src: banner.image_url,
				alt: banner.title,
				loading: i === 0 ? "eager" : "lazy"
			})
		}, banner.id))
	});
}
//#endregion
//#region resources/js/components/YoutubeVideoCard.tsx
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
var ShimmerLine = Tt.div`
  height: 12px;
  margin: 0.9rem 1rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-video-shimmer 1.4s ease-in-out infinite;
`;
function SkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
		"aria-hidden": "true",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shimmer, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerThumb, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShimmerLine, { style: { width: "70%" } })] }, i))
	});
}
function YoutubeVideoGrid({ videos, isLoading, isError, error, isLive = false, emptyMessage = "No videos here yet — check back soon." }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonGrid, {});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBox, {
		role: "alert",
		children: [
			"Couldn't load videos right now",
			error instanceof Error ? `: ${error.message}` : ".",
			" Try refreshing the page."
		]
	});
	if (videos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: emptyMessage });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { children: videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeVideoCard, {
		video,
		isLive
	}, video.videoId)) });
}
//#endregion
//#region resources/js/pages/Home.tsx
var YOUTUBE_TEASER_COUNT = 4;
var HeroSection = Tt.section`
  margin-bottom: 2.5rem;
`;
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
function Home({ banner, engagementBanners, heroPosts, topGridPosts, trendingPosts, riverPosts, entertainmentPosts, sportsPosts, lifestylePosts, videoPosts, youtubeVideos, youtubeError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "News, politics, music, lifestyle and entertainment for the youth voice in Ghana."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
			posts: heroPosts,
			isLoading: false
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banner }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.vertical
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "Top Stories"] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitZone, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopStoriesGrid, { children: topGridPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingPanel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			style: {
				marginBottom: "0.5rem",
				fontSize: "0.85rem"
			},
			children: "Trending"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactPostList, {
			posts: trendingPosts,
			isLoading: false
		})] })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitZone, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TopStoriesGrid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySection, {
			title: "Entertainment",
			categorySlug: "entertainment",
			seeAllHref: "/category/entertainment",
			hasPosts: entertainmentPosts.length > 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostRail, {
				posts: entertainmentPosts,
				isLoading: false
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySection, {
			title: "Sports",
			categorySlug: "sports",
			seeAllHref: "/category/sports",
			hasPosts: sportsPosts.length > 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostRail, {
				posts: sportsPosts,
				isLoading: false
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingPanel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementBannerStrip, { banners: engagementBanners }) })] }),
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAccent, {}), "More Stories"] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostList, {
			posts: riverPosts,
			isLoading: false,
			isError: false
		})] })
	] });
}
//#endregion
export { Home, Home as default };
