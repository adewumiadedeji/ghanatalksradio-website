import { createContext, useCallback, useContext, useRef, useState } from 'react';

/**
 * Shared audio player context — enforces one audio source playing at a time
 * across the entire app. The live stream (RadioPlayer) and any on-demand
 * episode players (PodcastEpisodeDetail, PodcastEpisodeCard) all register
 * through this context. Starting one automatically stops the other.
 *
 * Architecture: we store a ref to the currently-playing HTMLAudioElement
 * (not a React state) to avoid triggering re-renders in unrelated components
 * when ownership changes. The `currentId` state is only used by components
 * that need to know "am I the one currently playing?".
 */

type AudioPlayerId = string;

interface AudioPlayerContextValue {
  /** ID of the currently-playing source, or null if nothing is playing. */
  currentId: AudioPlayerId | null;
  /**
   * Request exclusive playback for `id`. Pauses any currently-playing source
   * first, then calls play() on the provided audio element.
   * Returns true if play() succeeded, false if it was blocked/failed.
   */
  requestPlay: (id: AudioPlayerId, audioEl: HTMLAudioElement) => Promise<boolean>;
  /** Notify the context that a source stopped (so currentId can be cleared). */
  notifyStop: (id: AudioPlayerId) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentId, setCurrentId] = useState<AudioPlayerId | null>(null);
  // Ref to the currently-playing element — lets us pause it without needing
  // a state update or a full re-render of the provider tree.
  const currentElementRef = useRef<HTMLAudioElement | null>(null);

  const requestPlay = useCallback(async (id: AudioPlayerId, audioEl: HTMLAudioElement): Promise<boolean> => {
    // Pause whatever's currently playing (if it's a different source).
    if (currentElementRef.current && currentElementRef.current !== audioEl) {
      currentElementRef.current.pause();
    }

    currentElementRef.current = audioEl;
    setCurrentId(id);

    try {
      await audioEl.play();
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
