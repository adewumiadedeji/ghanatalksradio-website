import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, s as qt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { a as usePage } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { a as getFeaturedImageUrl, c as getPlainTitle, i as getEmbeddedCategories, n as getAuthorAvatarUrl, o as getFeaturedMedia, r as getAuthorName, s as getPlainExcerpt, t as formatPostDate } from "./wpContent-FS3Fyx5P.js";
//#region resources/js/hooks/useNav.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Reads the server-resolved nav data shared on every Inertia response - no client fetch needed. */
function useNav() {
	return usePage().props.nav;
}
//#endregion
//#region resources/js/components/CategoryNav.tsx
var import_jsx_runtime = require_jsx_runtime();
var Nav = Tt.nav`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  padding-top: 0.85rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;
var linkStyles = `
  font-size: 0.94rem;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    transition: width 0.15s ease;
  }
`;
var NavLink = Tt(Link)`
  ${linkStyles}
  color: ${({ theme }) => theme.colors.inkMuted};

  &::after {
    background: ${({ theme }) => theme.colors.gold};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:hover::after {
    width: 100%;
  }
`;
var PlaylistLink = Tt(NavLink)`
  &::after {
    background: ${({ theme }) => theme.colors.goldDark};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
var DropdownWrap = Tt.div`
  position: relative;
`;
var DropdownTriggerLink = Tt(Link)`
  ${linkStyles}
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  &::after {
    background: ${({ theme }) => theme.colors.gold};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:hover::after {
    width: 100%;
  }
`;
var DropdownTriggerButton = Tt.button`
  ${linkStyles}
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  font-family: inherit;
  color: ${({ theme, $open, $accent }) => $accent ? theme.colors.goldDark : $open ? theme.colors.ink : theme.colors.inkMuted};

  &::after {
    background: ${({ theme, $accent }) => $accent ? theme.colors.goldDark : theme.colors.gold};
    width: ${({ $open }) => $open ? "100%" : "0"};
  }

  &:hover {
    color: ${({ theme, $accent }) => $accent ? theme.colors.goldDark : theme.colors.ink};
  }

  &:hover::after {
    width: 100%;
  }
`;
var Chevron = Tt.svg`
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => $open ? "180deg" : "0deg"});
`;
var Dropdown = Tt.div`
  /* No gap between trigger and panel — a gap here breaks mouseenter/leave
     continuity (the cursor exits the hoverable wrapper while crossing it,
     closing the dropdown before it can be reached). The visual breathing
     room below the trigger comes from padding-top on this element instead,
     which stays inside the hoverable hit area. */
  top: 100%;
  left: 0;
  padding-top: 0.6rem;
  z-index: 50;
  position: absolute;
`;
var DropdownPanel = Tt.div`
  min-width: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;
var DropdownItem = Tt(Link)`
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
/** Generic dismissible dropdown wrapper — hover to open on desktop, click toggles, click-outside and Escape both close it. */
function useDismissibleOpen() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function handleClickOutside(e) {
			if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
		}
		function handleEscape(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);
	return {
		open,
		setOpen,
		wrapRef
	};
}
function NavGroupDropdown({ label, slug, children, basePath = "/category", accent = false }) {
	const { open, setOpen, wrapRef } = useDismissibleOpen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownWrap, {
		ref: wrapRef,
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
		children: [slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownTriggerLink, {
			to: `${basePath}/${slug}`,
			"aria-expanded": open,
			"aria-haspopup": "true",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, {
				$open: open,
				viewBox: "0 0 10 6",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M1 1L5 5L9 1",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownTriggerButton, {
			type: "button",
			$open: open,
			$accent: accent,
			"aria-expanded": open,
			"aria-haspopup": "true",
			onClick: () => setOpen((o) => !o),
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, {
				$open: open,
				viewBox: "0 0 10 6",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M1 1L5 5L9 1",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownPanel, { children: children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownItem, {
				to: `${basePath}/${child.slug}`,
				role: "menuitem",
				onClick: () => setOpen(false),
				children: child.label
			}, child.slug)) })
		})]
	});
}
/**
* "Podcast" nav entry — a dropdown listing distinct shows, each linking to
* its own /podcast/:showSlug archive page. Falls back to a plain link to
* /podcast (no dropdown) if none were found, rather than showing an empty
* or broken chevron. Show data comes from the shared nav prop (resolved
* server-side) instead of a client fetch.
*/
function PodcastNavDropdown() {
	const { podcastShows } = useNav();
	if (podcastShows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistLink, {
		to: "/podcast",
		children: "Podcast"
	});
	const complete = [{
		label: "All Podcast",
		slug: ""
	}, ...podcastShows.map((show) => ({
		label: show.name,
		slug: show.slug
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavGroupDropdown, {
		label: "Podcast",
		slug: void 0,
		basePath: "/podcast",
		children: complete
	});
}
/** Shared with MobileNavDrawer so both surfaces list the same Arena items
* in the same order — Raffle, Predictions, Quizzes and Leaderboard are
* unrelated route trees (no shared URL prefix), so this is a plain
* label/to list rather than the slug+basePath shape NavGroupDropdown
* uses for WordPress-category dropdowns. */
var ARENA_ITEMS = [
	{
		label: "Raffle",
		to: "/raffle"
	},
	{
		label: "Predictions",
		to: "/predictions"
	},
	{
		label: "Quizzes",
		to: "/quizzes"
	},
	{
		label: "Leaderboard",
		to: "/leaderboard"
	}
];
function ArenaDropdown() {
	const { open, setOpen, wrapRef } = useDismissibleOpen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownWrap, {
		ref: wrapRef,
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownTriggerButton, {
			type: "button",
			$open: open,
			"aria-expanded": open,
			"aria-haspopup": "true",
			onClick: () => setOpen((o) => !o),
			children: ["Arena", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, {
				$open: open,
				viewBox: "0 0 10 6",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M1 1L5 5L9 1",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
			role: "menu",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownPanel, { children: ARENA_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownItem, {
				to: item.to,
				role: "menuitem",
				onClick: () => setOpen(false),
				children: item.label
			}, item.to)) })
		})]
	});
}
/**
* Site nav, grouped into the requested structure (Home / News / Podcast /
* Entertainment.../ Lifestyle.../ Sports / Videos / Arena / Playlist /
* More). Ported from the Vite SPA's CategoryNav.tsx - the resolution
* against live WordPress categories now happens server-side
* (App\Services\Nav\NavResolver, shared via HandleInertiaRequests) instead
* of a client react-query fetch, so there's no loading/error state here
* anymore - the data is always present by the time this renders.
*/
function CategoryNav() {
	const { groups, overflow } = useNav();
	const newsGroup = groups.find((g) => g.label === "News");
	const restGroups = groups.filter((g) => g.label !== "News");
	function renderGroup(group) {
		return group.children.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavGroupDropdown, {
			label: group.label,
			slug: group.slug,
			children: group.children
		}, group.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
			to: `/category/${group.slug}`,
			children: group.label
		}, group.label);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav, {
		"aria-label": "Site sections",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
				to: "/",
				children: "Home"
			}),
			newsGroup && renderGroup(newsGroup),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastNavDropdown, {}),
			restGroups.map(renderGroup),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistLink, {
				to: "/videos",
				children: "Videos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistLink, {
				to: "/jobs",
				children: "Jobs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArenaDropdown, {})
		]
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
var Frame = Tt.div`
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
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
//#region resources/js/components/HomeEditorial.tsx
/**
* The redesigned Home page's editorial masthead + hero block - see the
* reference mockups this was built against (a "Paperto News Portal"
* layout). Deliberately Home-only: Layout.tsx's own header (and the
* RadioPlayer/WatchToggle instances living in it) is untouched, so
* playback never interrupts navigating between Home and any other page -
* see this project's own notes on Inertia's persistent-layout mechanism
* for why that matters. This masthead sits BELOW that existing thin
* utility bar as Home's own page content, not a replacement for it -
* a two-tier "utility bar + big masthead" layout is a normal, real
* newspaper-site pattern, not a duplicate header by accident.
*/
var MastheadWrap = Tt.header`
  padding: 0.6rem 0 0;
`;
Tt.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.65rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.3rem;
  }
`;
Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.inkFaint};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 3;
  }
`;
var MastheadTitle = Tt.h1`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;
var SubNavRow = Tt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.15rem 0;
`;
var SearchIconLink = Tt(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.inkMuted};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.ink};
  }
`;
function SearchIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "7",
			cy: "7",
			r: "5.5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11.5 11.5L15 15",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})]
	});
}
function HomeMasthead() {
	(0, import_react.useMemo)(() => (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}) + " · " + (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit"
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MastheadWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubNavRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIconLink, {
		to: "/search",
		"aria-label": "Search",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, {})
	})] }) });
}
var scroll = qt`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;
var TickerWrap = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.55rem 0;
  overflow: hidden;
`;
var TickerBell = Tt.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var TickerTrack = Tt.div`
  display: flex;
  white-space: nowrap;
  animation: ${scroll} 40s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
var TickerItem = Tt(Link)`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 0 1.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.borderStrong};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
/** Breaking-news ticker - real post titles/links, not decorative text. Duplicated once so the CSS scroll loop has no visible seam. */
function NewsTicker({ posts }) {
	if (posts.length === 0) return null;
	const items = posts.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TickerWrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerBell, {
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "currentColor",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 1a1 1 0 0 1 1 1v.06a5 5 0 0 1 4 4.9V10l1.3 1.95a.8.8 0 0 1-.66 1.25H2.36a.8.8 0 0 1-.66-1.25L3 10V6.96a5 5 0 0 1 4-4.9V2a1 1 0 0 1 1-1zM6.5 14a1.5 1.5 0 0 0 3 0h-3z" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerTrack, { children: [...items, ...items].map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickerItem, {
		to: `/post/${post.slug}`,
		children: getPlainTitle(post)
	}, `${post.id}-${i}`)) })] });
}
var HeroLayout = Tt.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: start;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;
var ROTATE_MS = 6e3;
var FADE_MS = 600;
var HeroStage = Tt.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;
var HeroSlide = Tt(Link)`
  position: absolute;
  inset: 0;
  display: block;
  opacity: ${({ $active }) => $active ? 1 : 0};
  transition: opacity ${FADE_MS}ms ease;
  pointer-events: ${({ $active }) => $active ? "auto" : "none"};
`;
var HeroImg = Tt.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
var HeroDotRow = Tt.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;
var HeroDot = Tt.button`
  width: ${({ $active }) => $active ? "22px" : "8px"};
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ $active }) => $active ? "#fff" : "rgba(255, 255, 255, 0.4)"};
  cursor: pointer;
  padding: 0;
  transition: width 0.25s ease, background 0.2s ease;
`;
var HeroScrim = Tt.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 17, 22, 0.88) 0%, rgba(15, 17, 22, 0.25) 55%, transparent 100%);
`;
var HeroCopy = Tt.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.75rem;
  color: #fff;
`;
var HeroTag = Tt.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 0.75rem;
`;
var HeroHeadline = Tt.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 0.6rem;
`;
var HeroExcerpt = Tt.p`
  font-size: 0.9rem;
  opacity: 0.85;
  max-width: 640px;
  margin: 0 0 0.6rem;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;
var HeroByline = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  opacity: 0.75;
  margin: 0;
`;
var SidebarCard = Tt.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.25rem;
`;
var SidebarHead = Tt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
var SidebarTitle = Tt.h3`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
`;
var LiveBadge = Tt.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.live};
  background: ${({ theme }) => theme.colors.liveTint};
  padding: 0.25rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.pill};
`;
var RankedItem = Tt(Link)`
  display: flex;
  gap: 0.85rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
var RankNumber = Tt.span`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.borderStrong};
  flex-shrink: 0;
  width: 1.6rem;
`;
var RankBody = Tt.div``;
var RankTitle = Tt.p`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.25rem;
`;
var RankMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
var SubGrid = Tt.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
var SubCard = Tt(Link)`
  display: block;
`;
var SubCardImg = Tt.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var SubCardTitle = Tt.h3`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.4rem;
`;
var SubCardMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
/**
* The hero slider + "Most Read" sidebar + 3-card row under the ticker.
* The hero is a real cross-fading carousel over ALL of heroPosts - not a
* static single card - mirroring Hero.tsx's own proven mechanics (rotate
* every ROTATE_MS, pause while the tab is hidden, hold still for
* prefers-reduced-motion) under this design's own visual treatment.
*/
function HomeHeroBlock({ heroPosts, mostRead, subStories, engagementBanners }) {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const timerRef = (0, import_react.useRef)(null);
	const prefersReducedMotion = (0, import_react.useRef)(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	const slideCount = heroPosts.length;
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
			stop();
			if (!document.hidden) start();
		}
		start();
		document.addEventListener("visibilitychange", handleVisibility);
		return () => {
			stop();
			document.removeEventListener("visibilitychange", handleVisibility);
		};
	}, [advance, slideCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [slideCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroStage, {
		role: "region",
		"aria-roledescription": "carousel",
		"aria-label": "Top stories",
		children: [heroPosts.map((post, index) => {
			const isActive = index === activeIndex;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroSlide, {
				to: `/post/${post.slug}`,
				$active: isActive,
				"aria-hidden": !isActive,
				tabIndex: isActive ? 0 : -1,
				role: "group",
				"aria-roledescription": "slide",
				"aria-label": `${index + 1} of ${slideCount}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroImg, {
						src: getFeaturedImageUrl(getFeaturedMedia(post), 1024),
						alt: getPlainTitle(post),
						loading: index === 0 ? "eager" : "lazy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScrim, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroCopy, { children: [
						getEmbeddedCategories(post)[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroTag, { children: getEmbeddedCategories(post)[0].name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroHeadline, { children: getPlainTitle(post) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroExcerpt, { children: getPlainExcerpt(post, 180) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroByline, { children: [
							getAuthorName(post),
							" · ",
							formatPostDate(post.date)
						] })
					] })
				]
			}, post.id);
		}), slideCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDotRow, { children: heroPosts.map((post, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDot, {
			type: "button",
			$active: index === activeIndex,
			onClick: () => setActiveIndex(index),
			"aria-label": `Show story ${index + 1} of ${slideCount}`
		}, post.id)) })]
	}), mostRead.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTitle, { children: "Most Read" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveBadge, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		children: "●"
	}), " Live"] })] }), mostRead.slice(0, 5).map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RankedItem, {
		to: `/post/${post.slug}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankNumber, { children: String(i + 1).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RankBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankTitle, { children: getPlainTitle(post) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RankMeta, { children: [
			formatPostDate(post.date),
			" · ",
			getAuthorName(post)
		] })] })]
	}, post.id))] })] }), subStories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubGrid, { children: [subStories.slice(0, 2).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubCard, {
		to: `/post/${post.slug}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCardImg, {
				src: getFeaturedImageUrl(getFeaturedMedia(post), 500),
				alt: getPlainTitle(post),
				loading: "lazy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCardTitle, { children: getPlainTitle(post) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubCardMeta, { children: [
				getAuthorName(post),
				" · ",
				formatPostDate(post.date)
			] })
		]
	}, post.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCard, {
		to: "#",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementBannerStrip, { banners: engagementBanners })
	})] })] });
}
var WeekSection = Tt.section`
  margin: 2.5rem 0;
`;
var WeekSectionHead = Tt.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
var WeekTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;
var WeekSubtitle = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  max-width: 420px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;
var WeekGrid = Tt.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
var WeekColumn = Tt.div`
  display: flex;
  flex-direction: column;
`;
var WeekCard = Tt(Link)`
  display: block;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;
var WeekCardImg = Tt.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var WeekCardMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.4rem;
`;
var WeekCardTitle = Tt.h3`
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.4rem;
`;
var WeekCardExcerpt = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.5;
  margin: 0;
`;
var FeaturedCard = Tt.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
`;
var FeaturedMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.6rem;
`;
var FeaturedTitle = Tt(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
var FeaturedImg = Tt.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var FeaturedExcerpt = Tt.p`
  font-size: 0.87rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.6;
  margin: 0 0 1rem;
`;
var AuthorRow = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
var AuthorAvatar = Tt.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var AuthorAvatarFallback = Tt.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.85rem;
`;
var AuthorName = Tt.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`;
var ExploreLink = Tt(Link)`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  margin-top: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
var DeskSection = Tt.section`
  margin: 2.5rem 0;
`;
Tt.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-bottom: 0.5rem;
`;
var DeskHead = Tt.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
var DeskTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;
var DeskSubtitle = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  max-width: 420px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;
var DeskLayout = Tt.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;
var DateGroup = Tt.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
var DateLabel = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.85rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
var DeskRow = Tt.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
var DeskCard = Tt(Link)`
  display: block;
`;
var DeskCardImg = Tt.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var DeskCardTitle = Tt.h3`
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.35rem;
`;
var DeskCardExcerpt = Tt.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.5;
  margin: 0 0 0.4rem;
`;
var DeskCardMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
var TrendingSidebar = Tt.div``;
var TrendingHead = Tt.h3`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.ink};
`;
var TrendingItem = Tt(Link)`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
var TrendingThumb = Tt.img`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.sm};
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;
var TrendingBody = Tt.div`
  min-width: 0;
`;
var TrendingTitle = Tt.p`
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.25rem;
`;
var TrendingMeta = Tt.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
/** Groups posts by calendar day, preserving each group's existing (already-recency-sorted) order. */
function groupByDay(posts) {
	const groups = /* @__PURE__ */ new Map();
	for (const post of posts) {
		const day = post.date.slice(0, 10);
		if (!groups.has(day)) groups.set(day, []);
		groups.get(day).push(post);
	}
	return [...groups.entries()].map(([day, dayPosts]) => ({
		label: new Date(day).toLocaleDateString("en-GB", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric"
		}),
		posts: dayPosts
	}));
}
/**
* Date-grouped story rows (3 per day shown) + a "Trending" sidebar with
* small thumbnails - see the reference this was built against. No
* per-day archive route exists in this app, so (unlike the reference's
* "View Sunday's Portal") this deliberately has no per-group link -
* never fabricating a destination that doesn't resolve to anything real.
*/
function MultimediaDeskSection({ posts, trending }) {
	if (posts.length === 0) return null;
	const groups = groupByDay(posts).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskSection, {
		"aria-label": "More stories",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskTitle, { children: "More Stories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskSubtitle, { children: "More reporting and features from across the newsroom, newest first." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateLabel, { children: group.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskRow, { children: group.posts.slice(0, 3).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskCard, {
			to: `/post/${post.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCardImg, {
					src: getFeaturedImageUrl(getFeaturedMedia(post), 500),
					alt: getPlainTitle(post),
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCardTitle, { children: getPlainTitle(post) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCardExcerpt, { children: getPlainExcerpt(post, 90) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DeskCardMeta, { children: [
					formatPostDate(post.date),
					" · ",
					getAuthorName(post)
				] })
			]
		}, post.id)) })] }, group.label)) }), trending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingSidebar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingHead, { children: "Trending" }), trending.slice(0, 5).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingItem, {
			to: `/post/${post.slug}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingThumb, {
				src: getFeaturedImageUrl(getFeaturedMedia(post), 120),
				alt: "",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingTitle, { children: getPlainTitle(post) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TrendingMeta, { children: [
				formatPostDate(post.date),
				" · ",
				getAuthorName(post)
			] })] })]
		}, post.id))] })] })]
	});
}
/**
* 2+2+1 editorial grid - two stacked stories per side column, one
* "featured" long-form block on the right (image, real excerpt as body
* copy, author row using WordPress's own real avatar_urls Gravatar map).
* No per-author job title exists in this data, so the author row shows a
* name only, never an invented role/title. With fewer than 5 posts, the
* featured slot falls back to reusing posts[0] rather than disappearing -
* an acceptable minor overlap in a low-content category, better than a
* visibly incomplete third column.
*/
function WeeklyStoriesSection({ title, subtitle, posts }) {
	if (posts.length === 0) return null;
	const left = posts.slice(0, 2);
	const middle = posts.slice(2, 4);
	const featured = posts[4] ?? posts[0];
	const avatarUrl = getAuthorAvatarUrl(featured);
	function Card({ post }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WeekCard, {
			to: `/post/${post.slug}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekCardImg, {
					src: getFeaturedImageUrl(getFeaturedMedia(post), 500),
					alt: getPlainTitle(post),
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WeekCardMeta, { children: [
					formatPostDate(post.date),
					" · ",
					getAuthorName(post)
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekCardTitle, { children: getPlainTitle(post) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekCardExcerpt, { children: getPlainExcerpt(post, 110) })
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WeekSection, {
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WeekSectionHead, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekTitle, { children: title }), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekSubtitle, { children: subtitle })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WeekGrid, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekColumn, { children: left.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { post }, post.id)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekColumn, { children: middle.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { post }, post.id)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FeaturedMeta, { children: [
					formatPostDate(featured.date),
					" · ",
					getAuthorName(featured)
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedTitle, {
					to: `/post/${featured.slug}`,
					children: getPlainTitle(featured)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedImg, {
					src: getFeaturedImageUrl(getFeaturedMedia(featured), 600),
					alt: getPlainTitle(featured),
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedExcerpt, { children: getPlainExcerpt(featured, 280) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthorRow, { children: [avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorAvatar, {
					src: avatarUrl,
					alt: getAuthorName(featured)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorAvatarFallback, {
					"aria-hidden": "true",
					children: getAuthorName(featured).charAt(0)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorName, { children: getAuthorName(featured) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExploreLink, {
					to: `/post/${featured.slug}`,
					children: "Read the full story →"
				})
			] })
		] })]
	});
}
//#endregion
export { NewsTicker as a, CategoryNav as c, MultimediaDeskSection as i, useNav as l, HomeMasthead as n, WeeklyStoriesSection as o, MastheadTitle as r, ARENA_ITEMS as s, HomeHeroBlock as t };
