import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
//#region resources/js/context/AudioPlayerContext.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AudioPlayerContext = (0, import_react.createContext)(null);
function AudioPlayerProvider({ children }) {
	const [currentId, setCurrentId] = (0, import_react.useState)(null);
	const currentElementRef = (0, import_react.useRef)(null);
	const requestPlay = (0, import_react.useCallback)(async (id, audioEl) => {
		if (currentElementRef.current && currentElementRef.current !== audioEl) currentElementRef.current.pause();
		currentElementRef.current = audioEl;
		setCurrentId(id);
		try {
			await audioEl.play();
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
export { useAudioPlayer as n, AudioPlayerProvider as t };
