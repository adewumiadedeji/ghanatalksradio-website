import { useEffect, useRef, useState } from 'react';
import type Hls from 'hls.js';
import styled, { keyframes } from 'styled-components';
import { getVideoStreamStatus, getSessionStatus, startListeningSession, stopListeningSession, type VideoStreamStatus } from '../api/streaming';
import { useAudioPlayer, LIVE_VIDEO_ID } from '../context/AudioPlayerContext';
import { getDeviceId } from '../utils/deviceId';

// Matches RadioPlayer's own STATUS_POLL_MS - same cadence, fully
// independent poll. This app has no real-time broadcast client wired up
// anywhere yet (see getVideoStreamStatus's own docblock), so this is
// deliberately the proven, working pattern rather than a new one.
const STATUS_POLL_MS = 15000;

// Separate from STATUS_POLL_MS above - that one polls "is a video source
// live at all" (always running); this one is the session heartbeat/kick-
// check (only while actively watching), mirroring RadioPlayer's own
// startStatusPoll. Same value, different lifecycle - kept as its own
// named constant rather than reusing STATUS_POLL_MS so the two concerns
// don't get conflated later.
const SESSION_HEARTBEAT_MS = 15000;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const WatchButton = styled.button<{ $live: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: 0.35rem;
  flex-shrink: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: ${({ $live }) => ($live ? 'pointer' : 'not-allowed')};
  background: ${({ theme, $live }) => ($live ? theme.colors.ink : theme.colors.backgroundAlt)};
  color: ${({ theme, $live }) => ($live ? theme.colors.background : theme.colors.inkFaint)};
  transition: transform 0.12s ease, background 0.12s ease;

  &:hover {
    transform: ${({ $live }) => ($live ? 'scale(1.05)' : 'none')};
  }
`;

const LiveDot = styled.span<{ $animate: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.live};
  animation: ${({ $animate }) => ($animate ? pulse : 'none')} 1.6s ease-in-out infinite;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 17, 22, 0.72);
  backdrop-filter: blur(3px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  box-shadow: 0 32px 80px rgba(15, 17, 22, 0.28);
  width: 100%;
  max-width: 720px;
  overflow: hidden;
  animation: ${slideUp} 0.26s cubic-bezier(0.34, 1.36, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const VideoEl = styled.video`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
`;

const Label = styled.p`
  margin: 0;
  padding: 0.85rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

/**
 * Independent "Watch" switch alongside RadioPlayer's "Listen" - see
 * docs/architecture/08-video-streaming-integration-guide.md §8.
 * video_live is a completely separate signal from audio's own on-air
 * state, and the two can be true or false in any combination - but
 * *playback* of the two is mutually exclusive, enforced via
 * AudioPlayerContext (see LIVE_VIDEO_ID's own docblock): opening Watch
 * silently stops Listen (requestPlay's normal pausing behavior, no
 * warning - that's the explicit product decision, switching TO video is
 * the "casual" direction); RadioPlayer separately asks for confirmation
 * before interrupting a live Watch session in the other direction.
 *
 * Also registers a real listener_sessions row (media_type: 'video') for
 * as long as this is actually playing, the same start/heartbeat/stop
 * lifecycle RadioPlayer already uses for audio - so a video viewer shows
 * up correctly (as "Video", not "Radio") on the admin's Live Listeners
 * page, and a staff Kick works the same way for either.
 */
export function WatchToggle() {
  const [status, setStatus] = useState<VideoStreamStatus | null>(null);
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const heartbeatHandleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { requestPlay, notifyStop } = useAudioPlayer();

  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      getVideoStreamStatus()
        .then((result) => {
          if (!cancelled) setStatus(result);
        })
        .catch(() => {
          // Best-effort display only, same as RadioPlayer's listener-count poll.
        });
    };
    poll();
    const handle = setInterval(poll, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  const isLive = Boolean(status?.video_live && status.hls_url);

  function stopHeartbeat() {
    if (heartbeatHandleRef.current) {
      clearInterval(heartbeatHandleRef.current);
      heartbeatHandleRef.current = null;
    }
  }

  // Ends the tracked session server-side (so it drops off the admin's
  // Live Listeners page) and tears down hls.js. Called from every path
  // that stops watching: the close button, the backdrop click, the
  // stream ending while open, and the video element's own onPause -
  // which fires both for those same explicit closes AND for the case
  // where RadioPlayer's requestPlay pauses this element to take over
  // playback itself (Listen interrupting Watch, after confirmation).
  function stopWatching() {
    stopHeartbeat();
    hlsRef.current?.destroy();
    hlsRef.current = null;
    const token = sessionTokenRef.current;
    if (token) {
      sessionTokenRef.current = null;
      stopListeningSession(token).catch(() => {});
    }
    notifyStop(LIVE_VIDEO_ID);
    setOpen(false);
  }

  // Mirrors RadioPlayer's startStatusPoll - keeps this session's
  // last_seen_at fresh and is how a staff Kick actually takes effect for
  // a video viewer, not just an audio one.
  function startHeartbeat() {
    stopHeartbeat();
    heartbeatHandleRef.current = setInterval(async () => {
      const token = sessionTokenRef.current;
      if (!token) return;
      try {
        const result = await getSessionStatus(token);
        if (result.active) return;
        if (sessionTokenRef.current !== token) return;
        stopWatching();
      } catch {
        // Network hiccup — try again next tick, never treat a failed check as a kick.
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
        // Best-effort — a viewer still sees the video even if this fails.
      });
  }

  // If the stream ends while the panel is open, don't leave a dead player up.
  useEffect(() => {
    if (open && !isLive) stopWatching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  useEffect(() => {
    if (!open || !isLive || !videoRef.current) return;
    const video = videoRef.current;
    const url = status!.hls_url!;
    let cancelled = false;

    function playThroughContext() {
      requestPlay(LIVE_VIDEO_ID, video).then((ok) => {
        if (ok) reportWatchStart();
      });
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      playThroughContext();
    } else {
      import('hls.js').then(({ default: HlsCtor }) => {
        if (cancelled || !HlsCtor.isSupported()) return;
        const hls = new HlsCtor();
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(HlsCtor.Events.MANIFEST_PARSED, () => {
          playThroughContext();
        });
      });
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isLive]);

  return (
    <>
      <WatchButton
        type="button"
        $live={isLive}
        disabled={!isLive}
        onClick={() => isLive && setOpen(true)}
        aria-label={isLive ? 'Watch the live video stream' : 'No live video right now'}
        title={isLive ? undefined : 'No live video right now'}
      >
        <LiveDot $animate={isLive} />
        Watch Live
      </WatchButton>

      {open && isLive && (
        <Backdrop onClick={stopWatching} role="dialog" aria-modal="true" aria-label="Watch live video">
          <Panel onClick={(e) => e.stopPropagation()}>
            <CloseBtn type="button" onClick={stopWatching} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </CloseBtn>
            <VideoEl ref={videoRef} controls playsInline onPause={stopWatching} />
            {status?.label && <Label>{status.label}</Label>}
          </Panel>
        </Backdrop>
      )}
    </>
  );
}
