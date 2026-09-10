import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import {
  getListenerCount,
  getSessionStatus,
  startListeningSession,
  stopListeningSession,
  updateListenerLocation,
} from '../api/streaming';
import { resolveListenerLocation } from '../utils/geolocation';
import { getDeviceId } from '../utils/deviceId';

const STREAM_URL = import.meta.env.VITE_RADIO_STREAM_URL as string | undefined;
const LIVE_STREAM_ID = 'live-stream';

// Also this player's only heartbeat (see streaming.ts's getSessionStatus
// docblock) and its only way of noticing a staff Kick, since there's no
// real-time push wired up — same interval and same reasoning as the
// mobile app's KICK_POLL_MS in radioService.ts; the two polls don't need
// to match each other, they just both need to run.
const STATUS_POLL_MS = 15000;

// Independent of playback/session state on purpose - shown even before a
// visitor presses play, since "1,204 listening now" is itself a reason to
// press play. Doesn't need to be as fresh as the kick-detection poll above.
const LISTENER_COUNT_POLL_MS = 20000;

type PlayerStatus = 'idle' | 'connecting' | 'playing' | 'error';

// A `stalled` event just means the browser isn't receiving data at this
// instant - normal, self-recovering buffering blips on a long-running live
// stream, not a dead connection (unlike a real `error` event). Declaring it
// fatal immediately - as this used to - stopped the tracked session and
// showed "Can't connect" while the browser quietly kept buffering and
// resumed playback seconds later: the UI/session said disconnected while
// actual audio kept streaming. This grace period gives it a chance to
// recover (onPlaying firing again cancels it) before treating it as real.
const STALL_GRACE_MS = 20000;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 0.6rem 0.5rem 0.5rem;
  width: fit-content;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PlayButton = styled.button<{ $status: PlayerStatus }>`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $status }) =>
    $status === 'error' ? theme.colors.inkFaint : theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.inkFaint};
    cursor: not-allowed;
    transform: none;
  }
`;

const Spinner = styled.span`
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(21, 23, 28, 0.25);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  padding-right: 0.5rem;
  min-width: 0;
`;

const StationLabel = styled.span<{ $status: PlayerStatus }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $status }) =>
    $status === 'error' ? '#E2776B' : theme.colors.inkFaint};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const LiveDot = styled.span<{ $animate: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.live};
  animation: ${({ $animate }) => ($animate ? pulse : 'none')} 1.6s ease-in-out infinite;
`;

const NowPlaying = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`;

const ListenerCountLabel = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  white-space: nowrap;
`;

const Bars = styled.div<{ $playing: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 16px;
  padding-right: 0.25rem;

  span {
    display: block;
    width: 3px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 1px;
    animation: ${({ $playing }) => ($playing ? 'gtr-bar 0.9s ease-in-out infinite' : 'none')};
    opacity: ${({ $playing }) => ($playing ? 1 : 0.35)};
  }

  span:nth-child(1) { height: 40%; animation-delay: -0.6s; }
  span:nth-child(2) { height: 100%; animation-delay: -0.3s; }
  span:nth-child(3) { height: 65%; animation-delay: -0.9s; }

  @keyframes gtr-bar {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
  }
`;

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M0 0L14 8L0 16V0Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="5" height="16" rx="1" />
      <rect x="9" y="0" width="5" height="16" rx="1" />
    </svg>
  );
}

interface RadioPlayerProps {
  compact?: boolean;
}

const STATUS_LABEL: Record<PlayerStatus, string> = {
  idle: 'On air',
  connecting: 'Connecting…',
  playing: 'On air',
  error: "Can't connect",
};

/**
 * Persistent live-stream player shown in the header/bottom bar.
 * Uses AudioPlayerContext so starting a podcast episode automatically stops it.
 */
export function RadioPlayer({ compact = false }: RadioPlayerProps) {
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentId, requestPlay, notifyStop } = useAudioPlayer();
  const sessionTokenRef = useRef<string | null>(null);
  const pollHandleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stallTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [listenerCount, setListenerCount] = useState<number | null>(null);

  // Polls regardless of this player's own playback state - the count
  // reflects everyone listening station-wide, not just this tab, and
  // showing it before someone has even pressed play is itself part of
  // the point (see getListenerCount()'s own docblock).
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      getListenerCount()
        .then((count) => {
          if (!cancelled) setListenerCount(count);
        })
        .catch(() => {
          // Best-effort display only - never worth surfacing an error for.
        });
    };
    poll();
    const handle = setInterval(poll, LISTENER_COUNT_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  const streamAvailable = Boolean(STREAM_URL);

  const isCurrentlyOwned = currentId === LIVE_STREAM_ID;
  const effectiveStatus: PlayerStatus =
    status === 'playing' && !isCurrentlyOwned ? 'idle' : status;

  function stopStatusPoll() {
    if (pollHandleRef.current) {
      clearInterval(pollHandleRef.current);
      pollHandleRef.current = null;
    }
  }

  function clearStallTimeout() {
    if (stallTimeoutRef.current) {
      clearTimeout(stallTimeoutRef.current);
      stallTimeoutRef.current = null;
    }
  }

  // Only reached if a stall never recovers within STALL_GRACE_MS - now
  // treated as a real disconnect: pause the element for real (so the
  // audio can't keep quietly playing/buffering against a UI that says
  // it's stopped) and end the tracked session.
  function handleStallTimeout() {
    stallTimeoutRef.current = null;
    audioRef.current?.pause();
    setStatus('error');
    reportListenStop();
  }

  function handleStalled() {
    if (stallTimeoutRef.current) return;
    stallTimeoutRef.current = setTimeout(handleStallTimeout, STALL_GRACE_MS);
  }

  // Keeps this session's last_seen_at fresh for as long as playback
  // continues, and is how this player finds out a staff member kicked it
  // off — see streaming.ts's getSessionStatus docblock.
  function startStatusPoll() {
    stopStatusPoll();
    pollHandleRef.current = setInterval(async () => {
      const token = sessionTokenRef.current;
      if (!token) return;
      try {
        const result = await getSessionStatus(token);
        if (result.active) return;
        if (sessionTokenRef.current !== token) return;
        stopStatusPoll();
        sessionTokenRef.current = null;
        audioRef.current?.pause();
        notifyStop(LIVE_STREAM_ID);
        setStatus('idle');
      } catch {
        // Network hiccup — try again next tick, never treat a failed
        // check itself as a kick.
      }
    }, STATUS_POLL_MS);
  }

  // Reports this listener to the admin's Live Listeners page — fires once
  // actual playback starts (onPlaying), not on the click, so a blocked/
  // failed connection never registers a session. Deliberately does NOT
  // wait on resolveListenerLocation() - every count matters for the
  // business, and gating the session on geolocation meant a listener who
  // denies the permission prompt, or never answers it at all before
  // leaving (some platforms suspend the JS timeout while the dialog is
  // unanswered), never got counted. Location is now a best-effort
  // follow-up attached to the session after it already exists - see
  // updateListenerLocation()/PublicListenController::updateLocation()'s
  // own docblocks.
  function reportListenStart() {
    if (sessionTokenRef.current) return;
    const deviceId = getDeviceId();
    startListeningSession({ deviceId })
      .then((token) => {
        sessionTokenRef.current = token;
        startStatusPoll();

        resolveListenerLocation()
          .then((location) => {
            // The session may have already been stopped/replaced by the
            // time geolocation resolves - never attach location to a
            // session that's no longer the current one.
            if (!location || sessionTokenRef.current !== token) return;

            return updateListenerLocation(token, {
              latitude: location.latitude,
              longitude: location.longitude,
              country: location.country ?? undefined,
              region: location.region ?? undefined,
              city: location.city ?? undefined,
            });
          })
          .catch(() => {
            // Best-effort - the session already exists either way.
          });
      })
      .catch(() => {
        // Best-effort — a listener still hears the stream even if this fails.
      });
  }

  function reportListenStop() {
    stopStatusPoll();
    const token = sessionTokenRef.current;
    if (!token) return;
    sessionTokenRef.current = null;
    stopListeningSession(token).catch(() => {});
  }

  // Covers the tab-close/navigate-away case, where a normal fetch may
  // never complete — sendBeacon is designed to survive page unload.
  useEffect(() => {
    function handleUnload() {
      const token = sessionTokenRef.current;
      if (!token) return;
      const url = `${(import.meta.env.VITE_PORTAL_API_URL as string | undefined)?.replace(/\/$/, '') || 'https://app.ghanatalksradio.com'}/api/listen/stop`;
      const blob = new Blob([JSON.stringify({ session_token: token })], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    }
    window.addEventListener('pagehide', handleUnload);
    return () => {
      window.removeEventListener('pagehide', handleUnload);
      handleUnload();
      stopStatusPoll();
      clearStallTimeout();
    };
  }, []);

  async function play() {
    if (!audioRef.current) return;
    setStatus('connecting');
    audioRef.current.load();
    const ok = await requestPlay(LIVE_STREAM_ID, audioRef.current);
    if (!ok) setStatus('error');
  }

  function pause() {
    clearStallTimeout();
    audioRef.current?.pause();
    notifyStop(LIVE_STREAM_ID);
    reportListenStop();
    setStatus('idle');
  }

  function togglePlay() {
    if (!streamAvailable) return;
    if (effectiveStatus === 'playing' || effectiveStatus === 'connecting') {
      pause();
    } else {
      play();
    }
  }

  const isPlaying = effectiveStatus === 'playing';
  const isBusy = effectiveStatus === 'connecting';
  const hasError = effectiveStatus === 'error';

  return (
    <Bar>
      {streamAvailable && (
        <audio
          ref={audioRef}
          src={STREAM_URL}
          preload="none"
          onPlaying={() => { clearStallTimeout(); setStatus('playing'); reportListenStart(); }}
          onWaiting={() => setStatus('connecting')}
          onStalled={handleStalled}
          onError={() => { clearStallTimeout(); setStatus('error'); reportListenStop(); }}
          onPause={() => { clearStallTimeout(); setStatus((s) => (s === 'error' ? s : 'idle')); }}
        />
      )}

      <PlayButton
        type="button"
        onClick={togglePlay}
        disabled={!streamAvailable}
        $status={effectiveStatus}
        aria-label={isPlaying ? 'Pause live stream' : 'Play live stream'}
        aria-live="polite"
        title={
          !streamAvailable
            ? 'Stream coming soon'
            : hasError
              ? "Couldn't connect — tap to retry"
              : undefined
        }
      >
        {isBusy ? <Spinner /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>

      <Info>
        <StationLabel $status={effectiveStatus}>
          <LiveDot $animate={!hasError} />
          {streamAvailable ? STATUS_LABEL[effectiveStatus] : 'Stream coming soon'}
        </StationLabel>
        {!compact && <NowPlaying>GhanaTalksRadio Live</NowPlaying>}
        {/* {listenerCount !== null && (
          <ListenerCountLabel>{listenerCount.toLocaleString()} listening now</ListenerCountLabel>
        )} */}
      </Info>

      <Bars $playing={isPlaying} aria-hidden="true">
        <span />
        <span />
        <span />
      </Bars>
    </Bar>
  );
}

interface EpisodePlayerProps {
  audioUrl: string;
  title: string;
  /** Unique ID for this episode — use the episode's API id, e.g. "episode-3631". */
  id: string;
  /** Show name, e.g. "GhanaTalksRadio Podcast" — falls back to that generic label, mirroring mobile's radioStore.ts playPodcastEpisode(). */
  artist?: string | null;
  /** Show artwork URL — set as the OS lock-screen/media-notification artwork via the Media Session API, so a minimized/backgrounded tab still shows the podcast image, matching TrackPlayer's artwork on mobile. */
  artwork?: string | null;
}

/**
 * On-demand episode player that looks exactly like RadioPlayer's Bar design.
 * Uses AudioPlayerContext so starting it stops the live stream, and starting
 * the live stream stops it — one audio source at a time, always.
 */
export function EpisodePlayer({ audioUrl, title, id, artist, artwork }: EpisodePlayerProps) {
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentId, requestPlay, notifyStop } = useAudioPlayer();

  const isCurrentlyOwned = currentId === id;
  const effectiveStatus: PlayerStatus =
    status === 'playing' && !isCurrentlyOwned ? 'idle' : status;

  function updateMediaSessionMetadata() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: artist || 'GhanaTalksRadio Podcast',
      artwork: artwork ? [{ src: artwork, sizes: '512x512', type: 'image/png' }] : [],
    });
  }

  async function play() {
    if (!audioRef.current) return;
    setStatus('connecting');
    const ok = await requestPlay(id, audioRef.current);
    if (!ok) setStatus('error');
  }

  function pause() {
    audioRef.current?.pause();
    notifyStop(id);
    setStatus('idle');
  }

  function togglePlay() {
    if (effectiveStatus === 'playing' || effectiveStatus === 'connecting') {
      pause();
    } else {
      play();
    }
  }

  const isPlaying = effectiveStatus === 'playing';
  const isBusy = effectiveStatus === 'connecting';
  const hasError = effectiveStatus === 'error';

  return (
    <Bar>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="none"
        onPlaying={() => { setStatus('playing'); updateMediaSessionMetadata(); }}
        onEnded={() => { setStatus('idle'); notifyStop(id); }}
        onPause={() => setStatus((s) => (s === 'error' ? s : 'idle'))}
        onError={() => setStatus('error')}
        onStalled={() => setStatus('error')}
      />

      <PlayButton
        type="button"
        onClick={togglePlay}
        $status={effectiveStatus}
        aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
        title={hasError ? "Couldn't load audio — tap to retry" : undefined}
      >
        {isBusy ? <Spinner /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
      </PlayButton>

      <Info>
        <StationLabel $status={effectiveStatus}>
          {isPlaying ? 'Now playing' : hasError ? "Can't load" : 'Episode'}
        </StationLabel>
        <NowPlaying>{title}</NowPlaying>
      </Info>

      <Bars $playing={isPlaying} aria-hidden="true">
        <span />
        <span />
        <span />
      </Bars>
    </Bar>
  );
}
