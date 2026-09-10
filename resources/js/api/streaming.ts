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
}

/** Registers a listening session server-side. Returns a session_token that
 * must be passed to stopListeningSession() when playback actually stops. */
export async function startListeningSession(params: StartSessionParams = {}): Promise<string> {
  const { deviceId, ...rest } = params;
  const data = await callApi<{ session_token: string }>('/api/listen/start', {
    method: 'POST',
    body: JSON.stringify({ platform: 'web', device_id: deviceId, ...rest }),
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
