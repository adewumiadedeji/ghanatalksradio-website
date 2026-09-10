import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, o as qt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { n as useAudioPlayer } from "./AudioPlayerContext-B1i_wU94.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as formatEpisodeTimeRange, t as formatEpisodeDate } from "./podcastContent-Bn_AzXYj.js";
//#region resources/js/assets/brands/spotify.png
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var spotify_default = "/build/assets/spotify-GmcK3c4t.png";
//#endregion
//#region resources/js/assets/brands/youtube.png
var youtube_default = "/build/assets/youtube-AkghRVG_.png";
//#endregion
//#region resources/js/assets/brands/apple.png
var apple_default = "/build/assets/apple-l1ngXvUr.png";
//#endregion
//#region resources/js/assets/brands/amazon.png
var amazon_default = "/build/assets/amazon-C4pC3aLf.png";
//#endregion
//#region resources/js/assets/brands/google.png
var google_default = "/build/assets/google-B7STifup.png";
//#endregion
//#region resources/js/components/PodcastEpisodeCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var barAnim = qt`
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1);   }
`;
var Card = Tt.article`
  display: flex;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1rem;
  transition: box-shadow 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;
var Artwork = Tt.div`
  flex-shrink: 0;
  width: 184px;
  height: 184px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;
var Body = Tt.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
var ShowName = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;
var Description = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
`;
var MetaRow = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.2rem;
  flex-wrap: wrap;
`;
var Meta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
/**
* Compact play button shown when idle — plain pill with play icon + label.
* When playing this gets hidden and replaced by the animated PlayerBar.
*/
var IdlePlayButton = Tt.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.8rem 0.35rem 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;
/**
* Active playing state: dark pill with pause icon + animated waveform bars.
* Matches the RadioPlayer Bar visual — same dark background, gold bars.
*/
var PlayerBar = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.65rem 0.35rem 0.45rem;
`;
var PauseBtn = Tt.button`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: transform 0.12s ease;

  &:hover {
    transform: scale(1.08);
  }
`;
var NowPlayingLabel = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
/** Animated waveform bars — identical animation to RadioPlayer's Bars. */
var WaveBars = Tt.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 14px;
  padding-right: 0.15rem;

  span {
    display: block;
    width: 3px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 1px;
    animation: ${barAnim} 0.9s ease-in-out infinite;
  }

  span:nth-child(1) { height: 40%; animation-delay: -0.6s; }
  span:nth-child(2) { height: 100%; animation-delay: -0.3s; }
  span:nth-child(3) { height: 65%; animation-delay: -0.9s; }
`;
var ServiceRow = Tt.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.1rem 0.5rem;
  border-radius: 25px;
`;
var ServiceLink = Tt.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0.25rem;
  background: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;
var ServiceIcon = Tt.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
`;
var Label = Tt.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var UnavailableNote = Tt.span`
  font-size: 0.7rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
function PlayIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "9",
		height: "11",
		viewBox: "0 0 9 11",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L9 5.5L0 11V0Z" })
	});
}
function PauseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "9",
		height: "11",
		viewBox: "0 0 9 11",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "0",
			width: "3",
			height: "11",
			rx: "1"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "6",
			y: "0",
			width: "3",
			height: "11",
			rx: "1"
		})]
	});
}
var platformIcons = {
	spotify: spotify_default,
	youtube: youtube_default,
	apple: apple_default,
	amazon: amazon_default,
	google: google_default
};
function PodcastEpisodeCard({ episode }) {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	const { currentId, requestPlay, notifyStop } = useAudioPlayer();
	const playerId = `episode-card-${episode.id}`;
	const timeRange = formatEpisodeTimeRange(episode.startDate, episode.endDate);
	const isOwned = currentId === playerId;
	const effectivePlaying = playing && isOwned;
	async function handlePlay() {
		if (!episode.audioUrl || !audioRef.current) return;
		setPlaying(true);
		if (!await requestPlay(playerId, audioRef.current)) setPlaying(false);
	}
	function updateMediaSessionMetadata() {
		if (!("mediaSession" in navigator)) return;
		navigator.mediaSession.metadata = new MediaMetadata({
			title: episode.title,
			artist: episode.show.name || "GhanaTalksRadio Podcast",
			artwork: episode.show.imageUrl ? [{
				src: episode.show.imageUrl,
				sizes: "512x512",
				type: "image/png"
			}] : []
		});
	}
	function handlePause() {
		audioRef.current?.pause();
		notifyStop(playerId);
		setPlaying(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [episode.show.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Artwork, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: episode.show.imageUrl,
		alt: episode.show.name,
		loading: "lazy"
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowName, {
			to: `/podcast/${episode.show.slug}`,
			children: episode.show.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
			to: `/podcast/${episode.show.slug}/${episode.slug}`,
			children: episode.title
		}),
		episode.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: episode.description }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatEpisodeDate(episode.startDate) }), timeRange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: timeRange })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: [episode.audioUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioRef,
			src: episode.audioUrl,
			preload: "none",
			onPlaying: updateMediaSessionMetadata,
			onEnded: () => {
				setPlaying(false);
				notifyStop(playerId);
			},
			onPause: () => setPlaying((p) => p && !isOwned ? false : p)
		}), effectivePlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlayerBar, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseBtn, {
				type: "button",
				onClick: handlePause,
				"aria-label": "Pause episode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseIcon, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowPlayingLabel, { children: "Playing" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WaveBars, {
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IdlePlayButton, {
			type: "button",
			onClick: handlePlay,
			"aria-label": "Play episode",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayIcon, {}), "Play"]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnavailableNote, { children: "Audio unavailable for this episode" }), episode.show.external && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ServiceRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "LISTEN ON: " }), Object.entries(episode.show.external).map(([name, url]) => url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceLink, {
			href: url,
			target: "_blank",
			rel: "noopener noreferrer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
				src: platformIcons[name],
				alt: name
			})
		}, name) : null)] })] })
	] })] });
}
//#endregion
//#region resources/js/components/PodcastEpisodeList.tsx
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
function PodcastEpisodeList({ episodes, isLoading, isError, error }) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: episodes.map((episode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PodcastEpisodeCard, { episode }, episode.id)) });
}
//#endregion
export { PodcastEpisodeList as t };
