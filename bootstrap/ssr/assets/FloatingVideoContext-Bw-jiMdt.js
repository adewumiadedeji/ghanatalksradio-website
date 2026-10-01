import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { n as LIVE_VIDEO_ID, r as useAudioPlayer } from "./AudioPlayerContext-D8RFr5Sn.js";
import { a as getVideoStreamStatus, d as stopListeningSession, i as getSessionStatus, n as getCurrentScheduledPlaylistItem, t as getDeviceId, u as startListeningSession } from "./deviceId-D7ymQWPP.js";
//#region resources/js/context/FloatingVideoContext.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Owns the app's ONE shared native-`<video>`-backed playback session (the
* live stream, a scheduled-playlist item, or a picked VOD - whichever of
* the three is a direct file, never a YouTube embed, see the "youtube is
* excluded" note below) so it can survive Inertia route navigation instead
* of being torn down when VodSection.tsx (a per-page component) unmounts.
*
* This context is mounted once, above Inertia's page-swap boundary (same
* position as AudioPlayerProvider in app.tsx/ssr.tsx), and renders nothing
* itself - FloatingVideoPlayer.tsx (mounted in Layout.tsx, also above the
* page-swap boundary) is what actually portals the <video> element into
* either VodSection's own hero slot (when the user is on /videos and has
* registered a dock target) or a small floating box (whenever nothing has
* claimed the dock, e.g. the user navigated to a different page while
* something was playing).
*
* Real bug this fixes: a browser's native Picture-in-Picture window closes
* the instant its source <video> element is removed from the document, and
* before this, VodSection's own unmount effect (`stopWatchingLive()`) tore
* the element/hls.js/session down explicitly on every navigation anyway -
* so "floated" playback that worked fine when merely backgrounding the
* browser tab (the DOM never gets destroyed by that) broke the instant the
* user clicked to a different in-site page (an Inertia visit unmounts
* VodSection, which used to always mean "stop"). Moving ownership of the
* element + its playback state here, to a component that never unmounts on
* navigation, is what lets it keep playing (and keep floating) either way.
*
* Deliberately does NOT cover a YouTube-embedded scheduled/VOD item -
* that's a cross-origin iframe, not a <video> element this app controls
* directly, and reliably surviving a re-parent/navigation is a much less
* standard problem for an iframe than for a video element. VodSection
* keeps rendering those inline, exactly as before this change, with no
* floating support - a real, documented limitation, not an oversight.
*/
var STATUS_POLL_MS = 15e3;
var SESSION_HEARTBEAT_MS = 15e3;
function sourceKey(source) {
	if (source.kind === "live") return LIVE_VIDEO_ID;
	if (source.kind === "scheduled") return `scheduled-${source.id}`;
	return `vod-${source.video.id}`;
}
var FloatingVideoContext = (0, import_react.createContext)(null);
function FloatingVideoProvider({ children }) {
	const [liveStatus, setLiveStatus] = (0, import_react.useState)(null);
	const [scheduledCurrent, setScheduledCurrent] = (0, import_react.useState)(null);
	const [active, setActive] = (0, import_react.useState)(null);
	const [playBlocked, setPlayBlocked] = (0, import_react.useState)(false);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [dockTarget, setDockTarget] = (0, import_react.useState)(null);
	const videoRef = (0, import_react.useRef)(null);
	const hlsRef = (0, import_react.useRef)(null);
	const sessionTokenRef = (0, import_react.useRef)(null);
	const heartbeatHandleRef = (0, import_react.useRef)(null);
	const scheduledPollTimeoutRef = (0, import_react.useRef)(null);
	const activeRef = (0, import_react.useRef)(null);
	activeRef.current = active;
	const { requestPlay, notifyStop } = useAudioPlayer();
	const registerDockTarget = (0, import_react.useCallback)((el) => {
		setDockTarget(el);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const poll = () => {
			getVideoStreamStatus().then((result) => {
				if (!cancelled) setLiveStatus(result);
			}).catch(() => {});
		};
		poll();
		const handle = setInterval(poll, STATUS_POLL_MS);
		return () => {
			cancelled = true;
			clearInterval(handle);
		};
	}, []);
	const pollScheduledCurrent = (0, import_react.useCallback)(() => {
		if (scheduledPollTimeoutRef.current) {
			clearTimeout(scheduledPollTimeoutRef.current);
			scheduledPollTimeoutRef.current = null;
		}
		getCurrentScheduledPlaylistItem().then((result) => {
			setScheduledCurrent(result);
			const delayMs = result ? Math.min(Math.max(result.seconds_remaining_in_item + 1, 2), 60) * 1e3 : STATUS_POLL_MS;
			scheduledPollTimeoutRef.current = setTimeout(pollScheduledCurrent, delayMs);
		}).catch(() => {
			scheduledPollTimeoutRef.current = setTimeout(pollScheduledCurrent, STATUS_POLL_MS);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		pollScheduledCurrent();
		return () => {
			if (scheduledPollTimeoutRef.current) clearTimeout(scheduledPollTimeoutRef.current);
		};
	}, [pollScheduledCurrent]);
	function stopHeartbeat() {
		if (heartbeatHandleRef.current) {
			clearInterval(heartbeatHandleRef.current);
			heartbeatHandleRef.current = null;
		}
	}
	const stopActive = (0, import_react.useCallback)(() => {
		stopHeartbeat();
		hlsRef.current?.destroy();
		hlsRef.current = null;
		const token = sessionTokenRef.current;
		if (token) {
			sessionTokenRef.current = null;
			stopListeningSession(token).catch(() => {});
		}
		const wasActive = activeRef.current;
		if (wasActive) notifyStop(sourceKey(wasActive));
		activeRef.current = null;
		setActive(null);
		setPlayBlocked(false);
		setMuted(false);
		const video = videoRef.current;
		if (video) {
			video.pause();
			video.removeAttribute("src");
			video.load();
		}
	}, [notifyStop]);
	function startHeartbeat() {
		stopHeartbeat();
		heartbeatHandleRef.current = setInterval(async () => {
			const token = sessionTokenRef.current;
			if (!token) return;
			try {
				if ((await getSessionStatus(token)).active) return;
				if (sessionTokenRef.current !== token) return;
				stopActive();
			} catch {}
		}, SESSION_HEARTBEAT_MS);
	}
	function reportWatchStart() {
		if (sessionTokenRef.current) return;
		startListeningSession({
			deviceId: getDeviceId(),
			mediaType: "video"
		}).then((token) => {
			sessionTokenRef.current = token;
			startHeartbeat();
		}).catch(() => {});
	}
	function playThroughContext(id, onStarted) {
		const video = videoRef.current;
		if (!video) return;
		requestPlay(id, video).then((ok) => {
			if (ok) {
				setPlayBlocked(false);
				setMuted(false);
				onStarted?.();
				return;
			}
			video.muted = true;
			requestPlay(id, video).then((mutedOk) => {
				setPlayBlocked(!mutedOk);
				setMuted(mutedOk);
				if (mutedOk) onStarted?.();
			});
		});
	}
	const isLive = Boolean(liveStatus?.video_live && liveStatus.hls_url);
	(0, import_react.useEffect)(() => {
		if (active?.kind === "live" && !isLive) stopActive();
	}, [isLive]);
	const joinLive = (0, import_react.useCallback)(() => {
		if (!liveStatus?.hls_url) return;
		const video = videoRef.current;
		if (!video) return;
		const url = liveStatus.hls_url;
		setActive({
			kind: "live",
			label: liveStatus.label || "GhanaTalksRadio Live"
		});
		if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = url;
			playThroughContext(LIVE_VIDEO_ID, reportWatchStart);
		} else import("./hls-CgNUsS_w.js").then(({ default: HlsCtor }) => {
			if (!HlsCtor.isSupported()) return;
			const hls = new HlsCtor();
			hlsRef.current = hls;
			hls.loadSource(url);
			hls.attachMedia(video);
			hls.on(HlsCtor.Events.MANIFEST_PARSED, () => {
				playThroughContext(LIVE_VIDEO_ID, reportWatchStart);
			});
		});
	}, [liveStatus?.hls_url, liveStatus?.label]);
	(0, import_react.useEffect)(() => {
		if (!isLive) return;
		import("./hls-CgNUsS_w.js").catch(() => {});
	}, [isLive]);
	const playScheduledNative = (0, import_react.useCallback)((current) => {
		const video = videoRef.current;
		if (!video) return;
		const key = `scheduled-${current.video.id}`;
		setActive({
			kind: "scheduled",
			id: current.video.id,
			videoUrl: current.video.video_url,
			offsetSeconds: current.offset_seconds,
			label: current.playlist_name
		});
		function onLoadedMetadata() {
			const el = video;
			const safeOffset = Number.isFinite(el.duration) ? Math.max(0, Math.min(current.offset_seconds, el.duration - 1)) : current.offset_seconds;
			if (safeOffset > 0) el.currentTime = safeOffset;
			playThroughContext(key);
			el.removeEventListener("loadedmetadata", onLoadedMetadata);
		}
		video.src = current.video.video_url;
		video.addEventListener("loadedmetadata", onLoadedMetadata);
	}, []);
	(0, import_react.useEffect)(() => {
		if (active?.kind !== "scheduled") return;
		if (!scheduledCurrent) {
			stopActive();
			return;
		}
		if (scheduledCurrent.video.id !== active.id) playScheduledNative(scheduledCurrent);
	}, [scheduledCurrent?.video.id]);
	const playVodNative = (0, import_react.useCallback)((video) => {
		const el = videoRef.current;
		if (!el) return;
		const key = `vod-${video.id}`;
		setActive({
			kind: "vod",
			video
		});
		el.src = video.video_url;
		playThroughContext(key);
	}, []);
	const tapToPlay = (0, import_react.useCallback)(() => {
		const current = activeRef.current;
		if (!current) return;
		playThroughContext(sourceKey(current), current.kind === "live" ? reportWatchStart : void 0);
	}, []);
	const unmute = (0, import_react.useCallback)(() => {
		const video = videoRef.current;
		if (!video) return;
		video.muted = false;
		setMuted(false);
	}, []);
	const handleEnded = (0, import_react.useCallback)(() => {
		const current = activeRef.current;
		if (!current) return;
		if (current.kind === "scheduled") pollScheduledCurrent();
		else stopActive();
	}, [pollScheduledCurrent, stopActive]);
	const handlePause = (0, import_react.useCallback)(() => {
		const current = activeRef.current;
		if (!current || current.kind === "scheduled") return;
		stopActive();
	}, [stopActive]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingVideoContext.Provider, {
		value: {
			liveStatus,
			isLive,
			scheduledCurrent,
			active,
			videoRef,
			playBlocked,
			muted,
			dockTarget,
			registerDockTarget,
			joinLive,
			playScheduledNative,
			playVodNative,
			tapToPlay,
			unmute,
			stopActive,
			handleEnded,
			handlePause,
			refreshScheduledCurrent: pollScheduledCurrent
		},
		children
	});
}
function useFloatingVideo() {
	const ctx = (0, import_react.useContext)(FloatingVideoContext);
	if (!ctx) throw new Error("useFloatingVideo must be used inside FloatingVideoProvider");
	return ctx;
}
//#endregion
export { useFloatingVideo as n, FloatingVideoProvider as t };
