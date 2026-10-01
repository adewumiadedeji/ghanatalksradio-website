//#region resources/js/api/streaming.ts
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
	const { deviceId, mediaType, ...rest } = params;
	return (await callApi("/api/listen/start", {
		method: "POST",
		body: JSON.stringify({
			platform: "web",
			device_id: deviceId,
			media_type: mediaType,
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
async function getVideoStreamStatus() {
	return callApi("/api/video/status");
}
async function getVodVideos(page = 1) {
	const result = await callApi(`/api/vod/videos?page=${page}`);
	return {
		videos: result.videos,
		page: result.page,
		hasMore: result.has_more
	};
}
async function getVodVideo(slug) {
	return (await callApi(`/api/vod/videos/${encodeURIComponent(slug)}`)).video;
}
async function toggleVodLike(videoId, deviceId) {
	return callApi(`/api/vod/videos/${videoId}/like`, {
		method: "POST",
		body: JSON.stringify({ device_id: deviceId })
	});
}
async function getVodComments(videoId, page = 1) {
	const result = await callApi(`/api/vod/videos/${videoId}/comments?page=${page}`);
	return {
		comments: result.comments,
		page: result.page,
		hasMore: result.has_more
	};
}
async function postVodComment(videoId, params) {
	return (await callApi(`/api/vod/videos/${videoId}/comments`, {
		method: "POST",
		body: JSON.stringify({
			device_id: params.deviceId,
			guest_name: params.guestName,
			body: params.body
		})
	})).comment;
}
async function getCurrentScheduledPlaylistItem() {
	return (await callApi("/api/vod/playlists/current")).current;
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
export { getVideoStreamStatus as a, getVodVideos as c, stopListeningSession as d, toggleVodLike as f, getSessionStatus as i, postVodComment as l, getCurrentScheduledPlaylistItem as n, getVodComments as o, updateListenerLocation as p, getListenerCount as r, getVodVideo as s, getDeviceId as t, startListeningSession as u };
