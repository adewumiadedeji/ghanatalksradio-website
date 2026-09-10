const STORAGE_KEY = 'gtr_device_id_v1';

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
let cached: string | null = null;

export function getDeviceId(): string {
  if (cached) return cached;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    cached = stored;
    return stored;
  }
  const generated =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(STORAGE_KEY, generated);
  cached = generated;
  return generated;
}
