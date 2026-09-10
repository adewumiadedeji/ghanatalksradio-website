/** Formats an ISO date string for display, e.g. "23 June 2026". */
export function formatEpisodeDate(dateString: string): string {
  // Space-format defensive handling kept from the legacy backend's
  // "YYYY-MM-DD HH:mm:ss" dates - a no-op for the new backend's real
  // ISO8601 strings, harmless either way.
  const isoSafe = dateString.replace(' ', 'T');
  const date = new Date(isoSafe);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formats start/end times as a "7:00 AM – 10:00 AM" range for display,
 * or just the start time when there's no end (the current backend has no
 * broadcast-end-time concept - episodes only carry a single publish
 * timestamp, so `endDate` is always empty now).
 */
export function formatEpisodeTimeRange(startDate: string, endDate?: string): string {
  const formatTime = (s: string) => {
    const isoSafe = s.replace(' ', 'T');
    const date = new Date(isoSafe);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' });
  };

  const start = formatTime(startDate);
  if (!start) return '';
  const end = endDate ? formatTime(endDate) : '';
  if (!end) return start;
  return `${start} – ${end}`;
}

/**
 * Validates that a string is actually a usable audio URL before treating
 * it as a stream source. The backend (Modules/Podcast) already filters
 * this at import time (see ImportLegacyPodcasts), but this stays as a
 * client-side safety net for episodes entered by hand without the same
 * validation.
 */
export function isPlayableAudioUrl(value: string): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
