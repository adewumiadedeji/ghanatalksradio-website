import { createContext, useCallback, useContext, useRef, useState } from 'react';

/**
 * Shared media player context — enforces one audio/video source playing at
 * a time across the entire app. The live stream (RadioPlayer), any
 * on-demand episode players (PodcastEpisodeDetail, PodcastEpisodeCard), and
 * the live video watch player (WatchToggle) all register through this
 * context. Starting one automatically stops whatever else was playing.
 *
 * HTMLMediaElement (not HTMLAudioElement) on purpose - it's the common
 * interface both <audio> and <video> implement (play/pause/pause event),
 * so WatchToggle's <video> element can participate in this same exclusivity
 * mechanism without this context needing to know or care which tag it is.
 *
 * Architecture: we store a ref to the currently-playing element (not a
 * React state) to avoid triggering re-renders in unrelated components when
 * ownership changes. The `currentId` state is only used by components that
 * need to know "am I the one currently playing?" or "is something else
 * (specifically which) currently playing?".
 */

type AudioPlayerId = string;

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
export const LIVE_VIDEO_ID = 'watch-video';

interface AudioPlayerContextValue {
  /** ID of the currently-playing source, or null if nothing is playing. */
  currentId: AudioPlayerId | null;
  /**
   * Request exclusive playback for `id`. Pauses any currently-playing source
   * first, then calls play() on the provided media element.
   * Returns true if play() succeeded, false if it was blocked/failed.
   */
  requestPlay: (id: AudioPlayerId, mediaEl: HTMLMediaElement) => Promise<boolean>;
  /** Notify the context that a source stopped (so currentId can be cleared). */
  notifyStop: (id: AudioPlayerId) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentId, setCurrentId] = useState<AudioPlayerId | null>(null);
  // Ref to the currently-playing element — lets us pause it without needing
  // a state update or a full re-render of the provider tree.
  const currentElementRef = useRef<HTMLMediaElement | null>(null);

  const requestPlay = useCallback(async (id: AudioPlayerId, mediaEl: HTMLMediaElement): Promise<boolean> => {
    // Pause whatever's currently playing (if it's a different source).
    if (currentElementRef.current && currentElementRef.current !== mediaEl) {
      currentElementRef.current.pause();
    }

    currentElementRef.current = mediaEl;
    setCurrentId(id);

    try {
      await mediaEl.play();
      return true;
    } catch {
      // Play blocked (e.g. no user gesture, network error) — clear ownership.
      currentElementRef.current = null;
      setCurrentId(null);
      return false;
    }
  }, []);

  const notifyStop = useCallback((id: AudioPlayerId) => {
    setCurrentId((prev) => (prev === id ? null : prev));
    if (currentElementRef.current) {
      // Only clear the ref if it was this source that stopped.
      currentElementRef.current = null;
    }
  }, []);

  return (
    <AudioPlayerContext.Provider value={{ currentId, requestPlay, notifyStop }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error('useAudioPlayer must be used inside AudioPlayerProvider');
  return ctx;
}
