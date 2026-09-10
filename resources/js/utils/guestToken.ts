const STORAGE_KEY = 'gtr_guest_token_v1';

/**
 * Stable per-browser identity for Engagement features that accept an
 * anonymous `guest_token` in place of auth (predictions/comments — see
 * PublicPredictionController's docblock in the portal repo). Web has no
 * login, so every request uses this branch. Mirrors the mobile app's
 * AsyncStorage-backed getGuestToken() (same storage key), swapped for
 * synchronous localStorage.
 */
let cached: string | null = null;

export function getGuestToken(): string {
  if (cached) return cached;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    cached = stored;
    return stored;
  }
  const generated = `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(STORAGE_KEY, generated);
  cached = generated;
  return generated;
}
