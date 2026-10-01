/**
 * Live listener session tracking — ghanatalksradio-portal's
 * Modules/StreamingIntegration (see PublicListenController), the same
 * endpoints the mobile app calls to populate the admin's Live Listeners
 * page. Sessions are guest by default (no sign-in required on web yet);
 * `session_token` is how stopListeningSession() proves "this is my
 * session" without needing auth.
 */
const PORTAL_API_URL =
  import.meta.env.VITE_PORTAL_API_URL?.replace(/\/$/, '') ||
  'https://app.ghanatalksradio.com';

export class StreamingApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'StreamingApiError';
    this.status = status;
  }
}

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

async function callApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${PORTAL_API_URL}${path}`, {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });

  const json: ApiEnvelope<T> = await response.json();

  if (!response.ok || json.status === false) {
    throw new StreamingApiError(json.message || `Streaming API request failed (${response.status})`, response.status);
  }

  return json.data;
}

export interface StartSessionParams {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  /** Persistent per-browser id from utils/deviceId.ts — lets the backend's
   * closeDanglingSessions() tell a real reconnect apart from a different
   * device on the same shared IP (see that method's docblock). */
  deviceId?: string;
  /** Defaults to 'audio' server-side when omitted - RadioPlayer never needs
   * to pass this. WatchToggle passes 'video' so it shows up correctly on
   * the admin's Live Listeners page instead of looking like a radio
   * listener. */
  mediaType?: 'audio' | 'video';
}

/** Registers a listening session server-side. Returns a session_token that
 * must be passed to stopListeningSession() when playback actually stops. */
export async function startListeningSession(params: StartSessionParams = {}): Promise<string> {
  const { deviceId, mediaType, ...rest } = params;
  const data = await callApi<{ session_token: string }>('/api/listen/start', {
    method: 'POST',
    body: JSON.stringify({ platform: 'web', device_id: deviceId, media_type: mediaType, ...rest }),
  });
  return data.session_token;
}

export async function stopListeningSession(sessionToken: string): Promise<void> {
  await callApi('/api/listen/stop', {
    method: 'POST',
    body: JSON.stringify({ session_token: sessionToken }),
  });
}

/** Public, unauthenticated "N listening now" for the player itself, not an
 * admin feature - seeing a real crowd is a documented driver of listeners
 * staying tuned in and coming back, and it's cheap: this reads the exact
 * same live gauge the admin's Live Listeners page already uses, cached
 * briefly server-side. */
export async function getListenerCount(): Promise<number> {
  const data = await callApi<{ count: number }>('/api/listen/count');
  return data.count;
}

export interface ListenerLocation {
  latitude?: number;
  longitude?: number;
  country?: string;
  region?: string;
  city?: string;
}

/** Best-effort follow-up, called only if/when geolocation actually resolves
 * — startListeningSession() never waits on this, so a listener who denies
 * or never answers the location prompt is still counted (see this app's
 * PublicListenController::updateLocation() docblock for the bug this
 * fixes: a session that never gets created at all if the permission
 * dialog is left unanswered). Fire-and-forget is fine here too — a failed
 * enrichment call just means this session has no location, same as today. */
export async function updateListenerLocation(sessionToken: string, location: ListenerLocation): Promise<void> {
  await callApi('/api/listen/location', {
    method: 'POST',
    body: JSON.stringify({ session_token: sessionToken, ...location }),
  });
}

export interface SessionStatus {
  active: boolean;
  kicked: boolean;
}

/** Also the heartbeat that keeps this session out of the backend's stale-
 * session cutoff (see PublicListenController::status()'s docblock) — call
 * this periodically for as long as playback continues, the same way the
 * mobile app's kick-poll already does. */
export async function getSessionStatus(sessionToken: string): Promise<SessionStatus> {
  return callApi<SessionStatus>(`/api/listen/status?session_token=${encodeURIComponent(sessionToken)}`);
}

/**
 * "Is video live right now" — Modules\StreamingIntegration\Http\Controllers\
 * Api\PublicVideoStreamController, see
 * docs/architecture/08-video-streaming-integration-guide.md §8. Polled, not
 * subscribed — this app has no real-time broadcast client wired up
 * anywhere yet (NowPlayingUpdated has gone unconsumed client-side since it
 * was added), so this deliberately matches the one proven, working pattern
 * already in this file (getSessionStatus) rather than being the first to
 * build that plumbing. Independent of audio entirely: video_live/hls_url
 * being present has no bearing on whether the Icecast stream above is
 * playing, and vice versa.
 */
export interface VideoStreamStatus {
  video_live: boolean;
  source_key?: string;
  label?: string | null;
  started_at?: string;
  hls_url?: string | null;
}

export async function getVideoStreamStatus(): Promise<VideoStreamStatus> {
  return callApi<VideoStreamStatus>('/api/video/status');
}

/**
 * Video On Demand (VOD) — `Modules\VideoOnDemand` in ghanatalksradio-portal
 * (being built in parallel; see the "VOD + video hub" plan). Structurally
 * independent of the live-video-status endpoints above: a VOD video has no
 * connect/heartbeat/disconnect lifecycle, it's a plain content-asset with
 * denormalized view/like counters. Same `callApi<T>`/envelope convention as
 * every other function in this file.
 */
export interface VodVideoDto {
  id: number;
  title: string;
  slug: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  views_count: number;
  likes_count: number;
  published_at: string;
}

export interface VodVideoDetailDto extends VodVideoDto {
  comments_count: number;
}

export interface VodCommentDto {
  id: number;
  body: string;
  author: string;
  is_registered: boolean;
  created_at: string;
}

/** The portal's own VOD pagination shape (`VideoCommentService::listForVideo()`/
 * `PublicVideoController::index()` on the backend) — a plain page number +
 * `has_more` boolean, NOT Laravel's default `paginate()->toArray()` shape
 * (no `next_page_url` cursor). Both the video list and comment list use this
 * same shape, just with a different key for the row array. */
interface VodPageMeta {
  page: number;
  per_page: number;
  total: number;
  has_more: boolean;
}

export interface VodListResult {
  videos: VodVideoDto[];
  page: number;
  hasMore: boolean;
}

export async function getVodVideos(page = 1): Promise<VodListResult> {
  const result = await callApi<{ videos: VodVideoDto[] } & VodPageMeta>(`/api/vod/videos?page=${page}`);
  return { videos: result.videos, page: result.page, hasMore: result.has_more };
}

export async function getVodVideo(slug: string): Promise<VodVideoDetailDto> {
  const result = await callApi<{ video: VodVideoDetailDto }>(`/api/vod/videos/${encodeURIComponent(slug)}`);
  return result.video;
}

export interface ToggleLikeResult {
  liked: boolean;
  likes_count: number;
}

export async function toggleVodLike(videoId: number, deviceId: string): Promise<ToggleLikeResult> {
  return callApi<ToggleLikeResult>(`/api/vod/videos/${videoId}/like`, {
    method: 'POST',
    body: JSON.stringify({ device_id: deviceId }),
  });
}

export interface VodCommentsResult {
  comments: VodCommentDto[];
  page: number;
  hasMore: boolean;
}

export async function getVodComments(videoId: number, page = 1): Promise<VodCommentsResult> {
  const result = await callApi<{ comments: VodCommentDto[] } & VodPageMeta>(
    `/api/vod/videos/${videoId}/comments?page=${page}`
  );
  return { comments: result.comments, page: result.page, hasMore: result.has_more };
}

export interface PostVodCommentParams {
  deviceId: string;
  /** Required for an unauthenticated/guest commenter — see this function's
   * call sites for how that's enforced client-side before submitting. */
  guestName?: string;
  body: string;
}

export async function postVodComment(videoId: number, params: PostVodCommentParams): Promise<VodCommentDto> {
  const result = await callApi<{ comment: VodCommentDto }>(`/api/vod/videos/${videoId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ device_id: params.deviceId, guest_name: params.guestName, body: params.body }),
  });
  return result.comment;
}

/**
 * Scheduled video playlist ("TV programming block") — a PURE, repeatable
 * "what's playing right now" query (`VideoPlaylistScheduleService` on the
 * backend), never a stateful queue: two different visitors polling this at
 * two different moments during the same scheduled block must each
 * independently get the correct current item/offset, since nothing is
 * ever "consumed". `offset_seconds` is how far into `video` playback
 * should start (so a mid-block joiner lands at the right moment, not 0);
 * `seconds_remaining_in_item` is what lets the caller schedule its next
 * check right when this item is expected to end, instead of a blind fixed
 * poll interval only.
 */
export interface ScheduledPlaylistVideo {
  id: number;
  title: string;
  slug: string;
  video_url: string;
  thumbnail_url: string | null;
}

export interface ScheduledPlaylistCurrent {
  playlist_id: number;
  playlist_name: string;
  video: ScheduledPlaylistVideo;
  position: number;
  offset_seconds: number;
  seconds_remaining_in_item: number;
}

export async function getCurrentScheduledPlaylistItem(): Promise<ScheduledPlaylistCurrent | null> {
  const result = await callApi<{ current: ScheduledPlaylistCurrent | null }>('/api/vod/playlists/current');
  return result.current;
}
