import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import styled, { keyframes } from 'styled-components';
import { getVideoStreamStatus, type VideoStreamStatus } from '../api/streaming';

// Matches RadioPlayer's own STATUS_POLL_MS - same cadence, fully
// independent poll. This app has no real-time broadcast client wired up
// anywhere yet (see getVideoStreamStatus's own docblock), so this is
// deliberately the proven, working pattern rather than a new one.
const STATUS_POLL_MS = 15000;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
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

/**
 * Independent "Watch" indicator alongside RadioPlayer's "Listen" - see
 * docs/architecture/08-video-streaming-integration-guide.md §8.
 * video_live is a completely separate signal from audio's own on-air
 * state, and the two can be true or false in any combination.
 *
 * Purely a status pill + navigator now - it used to own a modal with real
 * HLS playback and listener-session tracking directly, but that all moved
 * to the /videos page's own hero player (see Videos.tsx/VodSection.tsx)
 * as part of the unified video-hub work, so the same "Join Live" flow
 * exists in exactly one place instead of two independent implementations.
 * Clicking this when live just navigates there.
 *
 * Renders nothing at all when the studio isn't live - previously stayed
 * mounted as a disabled/greyed pill so the header layout never shifted,
 * but per direct product feedback a permanently-visible "Watch Live"
 * control that's usually unusable read as broken/confusing rather than
 * informative. The surrounding flex layout (PlayerSlot /
 * MobileBottomPlayerBar in Layout.tsx) just collapses the space when this
 * renders null, so no layout changes were needed there.
 */
export function WatchToggle() {
  const [status, setStatus] = useState<VideoStreamStatus | null>(null);

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

  if (!isLive) return null;

  return (
    <WatchButton
      type="button"
      $live={isLive}
      disabled={!isLive}
      onClick={() => isLive && router.visit('/videos')}
      aria-label={isLive ? 'Go watch the live video stream' : 'No live video right now'}
      title={isLive ? undefined : 'No live video right now'}
    >
      <LiveDot $animate={isLive} />
      Watch Live
    </WatchButton>
  );
}
