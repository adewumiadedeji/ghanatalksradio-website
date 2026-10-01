import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/context/AudioPlayerContext.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Well-known id for WatchToggle's video player - exported from here (not
* WatchToggle itself) so RadioPlayer can check `currentId === LIVE_VIDEO_ID`
* without importing WatchToggle, which would be a backwards, video-depends-
* on-audio-UI-knowing-about-it dependency. See RadioPlayer's play() for why
* it needs to know this specific id: switching from Watch to Listen is the
* one direction that asks for confirmation before interrupting, unlike
* every other switch (Listen<->Episode, or Listen->Watch) which happens
* silently, matching the explicit product decision that watching video
* feels like the bigger thing to lose without warning.
*/
var LIVE_VIDEO_ID = "watch-video";
var AudioPlayerContext = (0, import_react.createContext)(null);
function AudioPlayerProvider({ children }) {
	const [currentId, setCurrentId] = (0, import_react.useState)(null);
	const currentElementRef = (0, import_react.useRef)(null);
	const requestPlay = (0, import_react.useCallback)(async (id, mediaEl) => {
		if (currentElementRef.current && currentElementRef.current !== mediaEl) currentElementRef.current.pause();
		currentElementRef.current = mediaEl;
		setCurrentId(id);
		try {
			await mediaEl.play();
			return true;
		} catch {
			currentElementRef.current = null;
			setCurrentId(null);
			return false;
		}
	}, []);
	const notifyStop = (0, import_react.useCallback)((id) => {
		setCurrentId((prev) => prev === id ? null : prev);
		if (currentElementRef.current) currentElementRef.current = null;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioPlayerContext.Provider, {
		value: {
			currentId,
			requestPlay,
			notifyStop
		},
		children
	});
}
function useAudioPlayer() {
	const ctx = (0, import_react.useContext)(AudioPlayerContext);
	if (!ctx) throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
	return ctx;
}
//#endregion
export { LIVE_VIDEO_ID as n, useAudioPlayer as r, AudioPlayerProvider as t };
