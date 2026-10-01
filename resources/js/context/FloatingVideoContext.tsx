import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type Hls from 'hls.js';
import {
  getVideoStreamStatus,
  getSessionStatus,
  startListeningSession,
  stopListeningSession,
  getCurrentScheduledPlaylistItem,
  type VideoStreamStatus,
  type ScheduledPlaylistCurrent,
  type VodVideoDto,
} from '../api/streaming';
import { useAudioPlayer, LIVE_VIDEO_ID } from './AudioPlayerContext';
import { getDeviceId } from '../utils/deviceId';

/**
 * Owns the app's ONE shared native-`<video>`-backed playback session (the
 * live stream, a scheduled-playlist item, or a picked VOD - whichever of
 * the three is a direct file, never a YouTube embed, see the "youtube is
 * excluded" note below) so it can survive Inertia route navigation instead
 * of being torn down when VodSection.tsx (a per-page component) unmounts.
 *
 * This context is mounted once, above Inertia's page-swap boundary (same
 * position as AudioPlayerProvider in app.tsx/ssr.tsx), and renders nothing
 * itself - FloatingVideoPlayer.tsx (mounted in Layout.tsx, also above the
 * page-swap boundary) is what actually portals the <video> element into
 * either VodSection's own hero slot (when the user is on /videos and has
 * registered a dock target) or a small floating box (whenever nothing has
 * claimed the dock, e.g. the user navigated to a different page while
 * something was playing).
 *
 * Real bug this fixes: a browser's native Picture-in-Picture window closes
 * the instant its source <video> element is removed from the document, and
 * before this, VodSection's own unmount effect (`stopWatchingLive()`) tore
 * the element/hls.js/session down explicitly on every navigation anyway -
 * so "floated" playback that worked fine when merely backgrounding the
 * browser tab (the DOM never gets destroyed by that) broke the instant the
 * user clicked to a different in-site page (an Inertia visit unmounts
 * VodSection, which used to always mean "stop"). Moving ownership of the
 * element + its playback state here, to a component that never unmounts on
 * navigation, is what lets it keep playing (and keep floating) either way.
 *
 * Deliberately does NOT cover a YouTube-embedded scheduled/VOD item -
 * that's a cross-origin iframe, not a <video> element this app controls
 * directly, and reliably surviving a re-parent/navigation is a much less
 * standard problem for an iframe than for a video element. VodSection
 * keeps rendering those inline, exactly as before this change, with no
 * floating support - a real, documented limitation, not an oversight.
 */

const STATUS_POLL_MS = 15000;
const SESSION_HEARTBEAT_MS = 15000;

export type ActiveVideoSource =
  | { kind: 'live'; label: string }
  | { kind: 'scheduled'; id: number; videoUrl: string; offsetSeconds: number; label: string }
  | { kind: 'vod'; video: VodVideoDto };

function sourceKey(source: ActiveVideoSource): string {
  if (source.kind === 'live') return LIVE_VIDEO_ID;
  if (source.kind === 'scheduled') return `scheduled-${source.id}`;
  return `vod-${source.video.id}`;
}

interface FloatingVideoContextValue {
  /** Raw live-status poll result - VodSection reads this instead of running its own poll, to avoid double-polling the same endpoint. */
  liveStatus: VideoStreamStatus | null;
  /** Boolean(liveStatus?.video_live && liveStatus.hls_url), computed once here so every consumer agrees on the same definition. */
  isLive: boolean;
  /** Raw scheduled-current poll result - same reasoning as liveStatus. */
  scheduledCurrent: ScheduledPlaylistCurrent | null;
  /** What's actually loaded into the shared <video> element right now, or null if nothing native is playing. */
  active: ActiveVideoSource | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  playBlocked: boolean;
  muted: boolean;
  /** The DOM node currently claiming the dock (VodSection's own hero-slot placeholder, when mounted), or null - null means the player is floating, since nothing on the current page wants to show it inline. FloatingVideoPlayer portals the shared <video> into whichever of this or its own floating-box container is current. */
  dockTarget: HTMLElement | null;
  registerDockTarget: (el: HTMLElement | null) => void;
  joinLive: () => void;
  playScheduledNative: (current: ScheduledPlaylistCurrent) => void;
  playVodNative: (video: VodVideoDto) => void;
  tapToPlay: () => void;
  unmute: () => void;
  /** Stops whatever's active (used when the user picks something else, or explicitly closes the floating box). */
  stopActive: () => void;
  /** Attach to the shared <video>'s onEnded/onPause - see this function's own definition for what each means per source kind. */
  handleEnded: () => void;
  handlePause: () => void;
  /** Forces an immediate scheduled-current re-check rather than waiting for the next self-scheduled tick - used by VodSection's own YouTube-scheduled branch (not tracked by this context) on that player's ended/error events, to advance the block promptly instead of waiting up to a minute. */
  refreshScheduledCurrent: () => void;
}

const FloatingVideoContext = createContext<FloatingVideoContextValue | null>(null);

export function FloatingVideoProvider({ children }: { children: ReactNode }) {
  const [liveStatus, setLiveStatus] = useState<VideoStreamStatus | null>(null);
  const [scheduledCurrent, setScheduledCurrent] = useState<ScheduledPlaylistCurrent | null>(null);
  const [active, setActive] = useState<ActiveVideoSource | null>(null);
  const [playBlocked, setPlayBlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dockTarget, setDockTarget] = useState<HTMLElement | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const heartbeatHandleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scheduledPollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mirrors `active` state synchronously for callbacks/effects that can't
  // wait for a re-render (e.g. the live-status poll deciding whether an
  // ended broadcast should stop an in-progress live session).
  const activeRef = useRef<ActiveVideoSource | null>(null);
  activeRef.current = active;

  const { requestPlay, notifyStop } = useAudioPlayer();

  const registerDockTarget = useCallback((el: HTMLElement | null) => {
    setDockTarget(el);
  }, []);

  // Live status - always polling, regardless of route, so a floated live
  // session can notice the broadcast ending even while the user is on a
  // different page (see the isLive-turned-false effect below).
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      getVideoStreamStatus()
        .then((result) => {
          if (!cancelled) setLiveStatus(result);
        })
        .catch(() => {});
    };
    poll();
    const handle = setInterval(poll, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  // Scheduled-current - same self-rescheduling poll VodSection used to own
  // itself (see that file's git history), moved here for the same reason
  // as the live-status poll: it needs to keep running, and needs to be
  // able to advance a floated scheduled session to its next item, even
  // while the user isn't on /videos.
  const pollScheduledCurrent = useCallback(() => {
    if (scheduledPollTimeoutRef.current) {
      clearTimeout(scheduledPollTimeoutRef.current);
      scheduledPollTimeoutRef.current = null;
    }
    getCurrentScheduledPlaylistItem()
      .then((result) => {
        setScheduledCurrent(result);
        const delayMs = result
          ? Math.min(Math.max(result.seconds_remaining_in_item + 1, 2), 60) * 1000
          : STATUS_POLL_MS;
        scheduledPollTimeoutRef.current = setTimeout(pollScheduledCurrent, delayMs);
      })
      .catch(() => {
        scheduledPollTimeoutRef.current = setTimeout(pollScheduledCurrent, STATUS_POLL_MS);
      });
  }, []);

  useEffect(() => {
    pollScheduledCurrent();
    return () => {
      if (scheduledPollTimeoutRef.current) clearTimeout(scheduledPollTimeoutRef.current);
    };
  }, [pollScheduledCurrent]);

  function stopHeartbeat() {
    if (heartbeatHandleRef.current) {
      clearInterval(heartbeatHandleRef.current);
      heartbeatHandleRef.current = null;
    }
  }

  const stopActive = useCallback(() => {
    stopHeartbeat();
    hlsRef.current?.destroy();
    hlsRef.current = null;
    const token = sessionTokenRef.current;
    if (token) {
      sessionTokenRef.current = null;
      stopListeningSession(token).catch(() => {});
    }
    const wasActive = activeRef.current;
    if (wasActive) notifyStop(sourceKey(wasActive));
    activeRef.current = null;
    setActive(null);
    setPlayBlocked(false);
    setMuted(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }, [notifyStop]);

  function startHeartbeat() {
    stopHeartbeat();
    heartbeatHandleRef.current = setInterval(async () => {
      const token = sessionTokenRef.current;
      if (!token) return;
      try {
        const result = await getSessionStatus(token);
        if (result.active) return;
        if (sessionTokenRef.current !== token) return;
        stopActive();
      } catch {
        // Network hiccup - try again next tick, never treat a failed check as a kick.
      }
    }, SESSION_HEARTBEAT_MS);
  }

  function reportWatchStart() {
    if (sessionTokenRef.current) return;
    startListeningSession({ deviceId: getDeviceId(), mediaType: 'video' })
      .then((token) => {
        sessionTokenRef.current = token;
        startHeartbeat();
      })
      .catch(() => {
        // Best-effort - a viewer still sees the video even if this fails.
      });
  }

  // Same muted-autoplay-fallback dance VodSection's own live/scheduled
  // effects used to do inline - every browser allows muted autoplay
  // unconditionally, even outside a user gesture, so this is the one
  // reliable fallback when a real (unmuted) play() is blocked.
  function playThroughContext(id: string, onStarted?: () => void) {
    const video = videoRef.current;
    if (!video) return;
    requestPlay(id, video).then((ok) => {
      if (ok) {
        setPlayBlocked(false);
        setMuted(false);
        onStarted?.();
        return;
      }
      video.muted = true;
      requestPlay(id, video).then((mutedOk) => {
        setPlayBlocked(!mutedOk);
        setMuted(mutedOk);
        if (mutedOk) onStarted?.();
      });
    });
  }

  const isLive = Boolean(liveStatus?.video_live && liveStatus.hls_url);

  // If a live session ends (broadcast stopped) while it's the active
  // source - including while floated on another page - tear it down
  // rather than leaving a dead stream "playing".
  useEffect(() => {
    if (active?.kind === 'live' && !isLive) stopActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  const joinLive = useCallback(() => {
    if (!liveStatus?.hls_url) return;
    const video = videoRef.current;
    if (!video) return;
    const url = liveStatus.hls_url;

    setActive({ kind: 'live', label: liveStatus.label || 'GhanaTalksRadio Live' });

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      playThroughContext(LIVE_VIDEO_ID, reportWatchStart);
    } else {
      import('hls.js').then(({ default: HlsCtor }) => {
        if (!HlsCtor.isSupported()) return;
        const hls = new HlsCtor();
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(HlsCtor.Events.MANIFEST_PARSED, () => {
          playThroughContext(LIVE_VIDEO_ID, reportWatchStart);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveStatus?.hls_url, liveStatus?.label]);

  // Warms the hls.js module cache as soon as there's something to join -
  // see VodSection's original comment (git history) on why this matters
  // for autoplay policy: importing it fresh inside the click handler
  // itself pushed the real play() call too far outside the click's
  // synchronous call stack, and browsers silently treated it as
  // not-user-initiated.
  useEffect(() => {
    if (!isLive) return;
    import('hls.js').catch(() => {});
  }, [isLive]);

  const playScheduledNative = useCallback((current: ScheduledPlaylistCurrent) => {
    const video = videoRef.current;
    if (!video) return;
    const key = `scheduled-${current.video.id}`;

    setActive({
      kind: 'scheduled',
      id: current.video.id,
      videoUrl: current.video.video_url,
      offsetSeconds: current.offset_seconds,
      label: current.playlist_name,
    });

    function onLoadedMetadata() {
      // Narrowed by the `if (!video) return;` guard above; TS doesn't
      // carry that narrowing into a nested function declaration (it could
      // theoretically be invoked independently of this closure), but
      // `video` is a `const` capturing a snapshot of videoRef.current at
      // the top of this same call, so it's safe.
      const el = video!;
      const safeOffset = Number.isFinite(el.duration)
        ? Math.max(0, Math.min(current.offset_seconds, el.duration - 1))
        : current.offset_seconds;
      if (safeOffset > 0) el.currentTime = safeOffset;
      playThroughContext(key);
      el.removeEventListener('loadedmetadata', onLoadedMetadata);
    }

    video.src = current.video.video_url;
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the scheduled block advances to a new item while it's the active
  // source (including while floated), follow it automatically - same
  // "always trust the server's live recomputation" reasoning as
  // VodSection's original handleScheduledEnded().
  useEffect(() => {
    if (active?.kind !== 'scheduled') return;
    if (!scheduledCurrent) {
      stopActive();
      return;
    }
    if (scheduledCurrent.video.id !== active.id) {
      playScheduledNative(scheduledCurrent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduledCurrent?.video.id]);

  const playVodNative = useCallback((video: VodVideoDto) => {
    const el = videoRef.current;
    if (!el) return;
    const key = `vod-${video.id}`;
    setActive({ kind: 'vod', video });
    el.src = video.video_url;
    playThroughContext(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Belt-and-suspenders fallback for whatever browsers still block the
  // autoplay attempts above - a real, fresh, synchronous click here
  // always satisfies autoplay policy.
  const tapToPlay = useCallback(() => {
    const current = activeRef.current;
    if (!current) return;
    playThroughContext(sourceKey(current), current.kind === 'live' ? reportWatchStart : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Unmuting an already-playing element is always allowed (a real click on
  // an element that's already actively playing, no autoplay policy
  // involved), so this just flips the flag directly.
  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
  }, []);

  // Attached to the shared <video>'s own onEnded/onPause (see
  // FloatingVideoPlayer) - what either means depends on which kind of
  // source is currently active, matching each case's original per-source
  // behavior (see git history on VodSection.tsx):
  //  - live: pausing means "I'm done watching" (there's no useful "resume"
  //    position on a live stream), so either event fully stops the session.
  //  - scheduled: only "ended" matters, and re-polls immediately rather
  //    than waiting for the next scheduled tick, to minimize the gap
  //    before the next item starts. A plain pause has no special effect -
  //    the user can just hit play again.
  //  - vod: either event resets back to the thumbnail+play-button state
  //    (stopActive() clears `active`, which VodSection mirrors into its
  //    own local vodPlaying flag).
  const handleEnded = useCallback(() => {
    const current = activeRef.current;
    if (!current) return;
    if (current.kind === 'scheduled') {
      pollScheduledCurrent();
    } else {
      stopActive();
    }
  }, [pollScheduledCurrent, stopActive]);

  const handlePause = useCallback(() => {
    const current = activeRef.current;
    if (!current || current.kind === 'scheduled') return;
    stopActive();
  }, [stopActive]);

  return (
    <FloatingVideoContext.Provider
      value={{
        liveStatus,
        isLive,
        scheduledCurrent,
        active,
        videoRef,
        playBlocked,
        muted,
        dockTarget,
        registerDockTarget,
        joinLive,
        playScheduledNative,
        playVodNative,
        tapToPlay,
        unmute,
        stopActive,
        handleEnded,
        handlePause,
        refreshScheduledCurrent: pollScheduledCurrent,
      }}
    >
      {children}
    </FloatingVideoContext.Provider>
  );
}

export function useFloatingVideo() {
  const ctx = useContext(FloatingVideoContext);
  if (!ctx) throw new Error('useFloatingVideo must be used inside FloatingVideoProvider');
  return ctx;
}
