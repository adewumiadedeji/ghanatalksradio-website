import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, o as qt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { n as useAudioPlayer } from "./AudioPlayerContext-B1i_wU94.js";
//#region resources/js/api/streaming.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Live listener session tracking — ghanatalksradio-portal's
* Modules/StreamingIntegration (see PublicListenController), the same
* endpoints the mobile app calls to populate the admin's Live Listeners
* page. Sessions are guest by default (no sign-in required on web yet);
* `session_token` is how stopListeningSession() proves "this is my
* session" without needing auth.
*/
var PORTAL_API_URL = "https://app.ghanatalksradio.com".replace(/\/$/, "") || "https://app.ghanatalksradio.com";
var StreamingApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "StreamingApiError";
		this.status = status;
	}
};
async function callApi(path, init) {
	const response = await fetch(`${PORTAL_API_URL}${path}`, {
		...init,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...init?.headers ?? {}
		}
	});
	const json = await response.json();
	if (!response.ok || json.status === false) throw new StreamingApiError(json.message || `Streaming API request failed (${response.status})`, response.status);
	return json.data;
}
/** Registers a listening session server-side. Returns a session_token that
* must be passed to stopListeningSession() when playback actually stops. */
async function startListeningSession(params = {}) {
	const { deviceId, ...rest } = params;
	return (await callApi("/api/listen/start", {
		method: "POST",
		body: JSON.stringify({
			platform: "web",
			device_id: deviceId,
			...rest
		})
	})).session_token;
}
async function stopListeningSession(sessionToken) {
	await callApi("/api/listen/stop", {
		method: "POST",
		body: JSON.stringify({ session_token: sessionToken })
	});
}
/** Public, unauthenticated "N listening now" for the player itself, not an
* admin feature - seeing a real crowd is a documented driver of listeners
* staying tuned in and coming back, and it's cheap: this reads the exact
* same live gauge the admin's Live Listeners page already uses, cached
* briefly server-side. */
async function getListenerCount() {
	return (await callApi("/api/listen/count")).count;
}
/** Best-effort follow-up, called only if/when geolocation actually resolves
* — startListeningSession() never waits on this, so a listener who denies
* or never answers the location prompt is still counted (see this app's
* PublicListenController::updateLocation() docblock for the bug this
* fixes: a session that never gets created at all if the permission
* dialog is left unanswered). Fire-and-forget is fine here too — a failed
* enrichment call just means this session has no location, same as today. */
async function updateListenerLocation(sessionToken, location) {
	await callApi("/api/listen/location", {
		method: "POST",
		body: JSON.stringify({
			session_token: sessionToken,
			...location
		})
	});
}
/** Also the heartbeat that keeps this session out of the backend's stale-
* session cutoff (see PublicListenController::status()'s docblock) — call
* this periodically for as long as playback continues, the same way the
* mobile app's kick-poll already does. */
async function getSessionStatus(sessionToken) {
	return callApi(`/api/listen/status?session_token=${encodeURIComponent(sessionToken)}`);
}
//#endregion
//#region resources/js/utils/geolocation.ts
var GPS_TIMEOUT_MS = 8e3;
var GPS_MAX_AGE_MS = 6e5;
var REVERSE_GEOCODE_TIMEOUT_MS = 5e3;
function getCoordinates() {
	return new Promise((resolve) => {
		if (!("geolocation" in navigator)) {
			resolve(null);
			return;
		}
		navigator.geolocation.getCurrentPosition((position) => resolve({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}), () => resolve(null), {
			enableHighAccuracy: false,
			timeout: GPS_TIMEOUT_MS,
			maximumAge: GPS_MAX_AGE_MS
		});
	});
}
async function reverseGeocode(latitude, longitude) {
	const empty = {
		country: null,
		region: null,
		city: null
	};
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REVERSE_GEOCODE_TIMEOUT_MS);
	try {
		const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`, {
			headers: { Accept: "application/json" },
			signal: controller.signal
		});
		if (!response.ok) return empty;
		const address = (await response.json())?.address ?? {};
		return {
			country: address.country ?? null,
			region: address.state ?? address.region ?? null,
			city: address.city ?? address.town ?? address.county ?? null
		};
	} catch {
		return empty;
	} finally {
		clearTimeout(timeout);
	}
}
async function resolveListenerLocation() {
	try {
		const coords = await getCoordinates();
		if (!coords) return null;
		const place = await reverseGeocode(coords.latitude, coords.longitude);
		return {
			...coords,
			...place
		};
	} catch {
		return null;
	}
}
//#endregion
//#region resources/js/utils/deviceId.ts
var STORAGE_KEY = "gtr_device_id_v1";
/**
* Persistent, non-expiring per-browser identity generated once on first
* visit and reused for as long as localStorage isn't cleared — mirrors
* mobile's AsyncStorage-backed utils/deviceId.ts (same storage-key
* naming), swapped for synchronous localStorage the same way
* guestToken.ts already does for its own token. Sent with every listening
* session (see api/streaming.ts's startListeningSession()) so the
* backend's closeDanglingSessions() can tell "this browser reconnected"
* apart from "a different device on the same shared IP" — see that
* method's own docblock for the bug this fixes (two devices on the same
* home WiFi were wrongly closing each other's live sessions).
*/
var cached = null;
function getDeviceId() {
	if (cached) return cached;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		cached = stored;
		return stored;
	}
	const generated = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
	localStorage.setItem(STORAGE_KEY, generated);
	cached = generated;
	return generated;
}
//#endregion
//#region resources/js/components/RadioPlayer.tsx
var import_jsx_runtime = require_jsx_runtime();
var STREAM_URL = "https://live.ghanatalksradio.com/listen";
var LIVE_STREAM_ID = "live-stream";
var STATUS_POLL_MS = 15e3;
var LISTENER_COUNT_POLL_MS = 2e4;
var STALL_GRACE_MS = 2e4;
var pulse = qt`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;
var spin = qt`
  to { transform: rotate(360deg); }
`;
var Bar = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 0.6rem 0.5rem 0.5rem;
  width: fit-content;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }
`;
var PlayButton = Tt.button`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $status }) => $status === "error" ? theme.colors.inkFaint : theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.inkFaint};
    cursor: not-allowed;
    transform: none;
  }
`;
var Spinner = Tt.span`
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(21, 23, 28, 0.25);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;
var Info = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  padding-right: 0.5rem;
  min-width: 0;
`;
var StationLabel = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $status }) => $status === "error" ? "#E2776B" : theme.colors.inkFaint};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
var LiveDot = Tt.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.live};
  animation: ${({ $animate }) => $animate ? pulse : "none"} 1.6s ease-in-out infinite;
`;
var NowPlaying = Tt.span`
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`;
Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  white-space: nowrap;
`;
var Bars = Tt.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 16px;
  padding-right: 0.25rem;

  span {
    display: block;
    width: 3px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 1px;
    animation: ${({ $playing }) => $playing ? "gtr-bar 0.9s ease-in-out infinite" : "none"};
    opacity: ${({ $playing }) => $playing ? 1 : .35};
  }

  span:nth-child(1) { height: 40%; animation-delay: -0.6s; }
  span:nth-child(2) { height: 100%; animation-delay: -0.3s; }
  span:nth-child(3) { height: 65%; animation-delay: -0.9s; }

  @keyframes gtr-bar {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
  }
`;
function PlayIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "16",
		viewBox: "0 0 14 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0L14 8L0 16V0Z" })
	});
}
function PauseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "16",
		viewBox: "0 0 14 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "0",
			width: "5",
			height: "16",
			rx: "1"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "9",
			y: "0",
			width: "5",
			height: "16",
			rx: "1"
		})]
	});
}
var STATUS_LABEL = {
	idle: "On air",
	connecting: "Connecting…",
	playing: "On air",
	error: "Can't connect"
};
/**
* Persistent live-stream player shown in the header/bottom bar.
* Uses AudioPlayerContext so starting a podcast episode automatically stops it.
*/
function RadioPlayer({ compact = false }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const audioRef = (0, import_react.useRef)(null);
	const { currentId, requestPlay, notifyStop } = useAudioPlayer();
	const sessionTokenRef = (0, import_react.useRef)(null);
	const pollHandleRef = (0, import_react.useRef)(null);
	const stallTimeoutRef = (0, import_react.useRef)(null);
	const [listenerCount, setListenerCount] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const poll = () => {
			getListenerCount().then((count) => {
				if (!cancelled) setListenerCount(count);
			}).catch(() => {});
		};
		poll();
		const handle = setInterval(poll, LISTENER_COUNT_POLL_MS);
		return () => {
			cancelled = true;
			clearInterval(handle);
		};
	}, []);
	const streamAvailable = Boolean(STREAM_URL);
	const effectiveStatus = status === "playing" && !(currentId === LIVE_STREAM_ID) ? "idle" : status;
	function stopStatusPoll() {
		if (pollHandleRef.current) {
			clearInterval(pollHandleRef.current);
			pollHandleRef.current = null;
		}
	}
	function clearStallTimeout() {
		if (stallTimeoutRef.current) {
			clearTimeout(stallTimeoutRef.current);
			stallTimeoutRef.current = null;
		}
	}
	function handleStallTimeout() {
		stallTimeoutRef.current = null;
		audioRef.current?.pause();
		setStatus("error");
		reportListenStop();
	}
	function handleStalled() {
		if (stallTimeoutRef.current) return;
		stallTimeoutRef.current = setTimeout(handleStallTimeout, STALL_GRACE_MS);
	}
	function startStatusPoll() {
		stopStatusPoll();
		pollHandleRef.current = setInterval(async () => {
			const token = sessionTokenRef.current;
			if (!token) return;
			try {
				if ((await getSessionStatus(token)).active) return;
				if (sessionTokenRef.current !== token) return;
				stopStatusPoll();
				sessionTokenRef.current = null;
				audioRef.current?.pause();
				notifyStop(LIVE_STREAM_ID);
				setStatus("idle");
			} catch {}
		}, STATUS_POLL_MS);
	}
	function reportListenStart() {
		if (sessionTokenRef.current) return;
		startListeningSession({ deviceId: getDeviceId() }).then((token) => {
			sessionTokenRef.current = token;
			startStatusPoll();
			resolveListenerLocation().then((location) => {
				if (!location || sessionTokenRef.current !== token) return;
				return updateListenerLocation(token, {
					latitude: location.latitude,
					longitude: location.longitude,
					country: location.country ?? void 0,
					region: location.region ?? void 0,
					city: location.city ?? void 0
				});
			}).catch(() => {});
		}).catch(() => {});
	}
	function reportListenStop() {
		stopStatusPoll();
		const token = sessionTokenRef.current;
		if (!token) return;
		sessionTokenRef.current = null;
		stopListeningSession(token).catch(() => {});
	}
	(0, import_react.useEffect)(() => {
		function handleUnload() {
			const token = sessionTokenRef.current;
			if (!token) return;
			const url = `${"https://app.ghanatalksradio.com".replace(/\/$/, "") || "https://app.ghanatalksradio.com"}/api/listen/stop`;
			const blob = new Blob([JSON.stringify({ session_token: token })], { type: "application/json" });
			navigator.sendBeacon(url, blob);
		}
		window.addEventListener("pagehide", handleUnload);
		return () => {
			window.removeEventListener("pagehide", handleUnload);
			handleUnload();
			stopStatusPoll();
			clearStallTimeout();
		};
	}, []);
	async function play() {
		if (!audioRef.current) return;
		setStatus("connecting");
		audioRef.current.load();
		if (!await requestPlay(LIVE_STREAM_ID, audioRef.current)) setStatus("error");
	}
	function pause() {
		clearStallTimeout();
		audioRef.current?.pause();
		notifyStop(LIVE_STREAM_ID);
		reportListenStop();
		setStatus("idle");
	}
	function togglePlay() {
		if (!streamAvailable) return;
		if (effectiveStatus === "playing" || effectiveStatus === "connecting") pause();
		else play();
	}
	const isPlaying = effectiveStatus === "playing";
	const isBusy = effectiveStatus === "connecting";
	const hasError = effectiveStatus === "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, { children: [
		streamAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioRef,
			src: STREAM_URL,
			preload: "none",
			onPlaying: () => {
				clearStallTimeout();
				setStatus("playing");
				reportListenStart();
			},
			onWaiting: () => setStatus("connecting"),
			onStalled: handleStalled,
			onError: () => {
				clearStallTimeout();
				setStatus("error");
				reportListenStop();
			},
			onPause: () => {
				clearStallTimeout();
				setStatus((s) => s === "error" ? s : "idle");
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayButton, {
			type: "button",
			onClick: togglePlay,
			disabled: !streamAvailable,
			$status: effectiveStatus,
			"aria-label": isPlaying ? "Pause live stream" : "Play live stream",
			"aria-live": "polite",
			title: !streamAvailable ? "Stream coming soon" : hasError ? "Couldn't connect — tap to retry" : void 0,
			children: isBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayIcon, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StationLabel, {
			$status: effectiveStatus,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveDot, { $animate: !hasError }), streamAvailable ? STATUS_LABEL[effectiveStatus] : "Stream coming soon"]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowPlaying, { children: "GhanaTalksRadio Live" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bars, {
			$playing: isPlaying,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		})
	] });
}
/**
* On-demand episode player that looks exactly like RadioPlayer's Bar design.
* Uses AudioPlayerContext so starting it stops the live stream, and starting
* the live stream stops it — one audio source at a time, always.
*/
function EpisodePlayer({ audioUrl, title, id, artist, artwork }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const audioRef = (0, import_react.useRef)(null);
	const { currentId, requestPlay, notifyStop } = useAudioPlayer();
	const effectiveStatus = status === "playing" && !(currentId === id) ? "idle" : status;
	function updateMediaSessionMetadata() {
		if (!("mediaSession" in navigator)) return;
		navigator.mediaSession.metadata = new MediaMetadata({
			title,
			artist: artist || "GhanaTalksRadio Podcast",
			artwork: artwork ? [{
				src: artwork,
				sizes: "512x512",
				type: "image/png"
			}] : []
		});
	}
	async function play() {
		if (!audioRef.current) return;
		setStatus("connecting");
		if (!await requestPlay(id, audioRef.current)) setStatus("error");
	}
	function pause() {
		audioRef.current?.pause();
		notifyStop(id);
		setStatus("idle");
	}
	function togglePlay() {
		if (effectiveStatus === "playing" || effectiveStatus === "connecting") pause();
		else play();
	}
	const isPlaying = effectiveStatus === "playing";
	const isBusy = effectiveStatus === "connecting";
	const hasError = effectiveStatus === "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bar, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioRef,
			src: audioUrl,
			preload: "none",
			onPlaying: () => {
				setStatus("playing");
				updateMediaSessionMetadata();
			},
			onEnded: () => {
				setStatus("idle");
				notifyStop(id);
			},
			onPause: () => setStatus((s) => s === "error" ? s : "idle"),
			onError: () => setStatus("error"),
			onStalled: () => setStatus("error")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayButton, {
			type: "button",
			onClick: togglePlay,
			$status: effectiveStatus,
			"aria-label": isPlaying ? "Pause episode" : "Play episode",
			title: hasError ? "Couldn't load audio — tap to retry" : void 0,
			children: isBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayIcon, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationLabel, {
			$status: effectiveStatus,
			children: isPlaying ? "Now playing" : hasError ? "Can't load" : "Episode"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowPlaying, { children: title })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bars, {
			$playing: isPlaying,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		})
	] });
}
//#endregion
export { RadioPlayer as n, EpisodePlayer as t };
