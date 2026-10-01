import { useEffect, useState, type CSSProperties } from 'react';
import styled from 'styled-components';
import { router } from '@inertiajs/react';
import { useFloatingVideo } from '../context/FloatingVideoContext';

/**
 * Mounted once in Layout.tsx (persists across Inertia navigation, same as
 * RadioPlayer/WatchToggle) - renders the one shared <video> element
 * FloatingVideoContext owns, and either docks it visually over VodSection's
 * hero-slot placeholder (`dockTarget`, when the user is on /videos) or
 * floats it in a small corner box everywhere else.
 *
 * CRITICAL: the <video> is a plain, direct child of ONE fixed DOM node
 * (`OverlayHost`, rendered unconditionally, exactly once) whose IDENTITY
 * never changes across renders - only its CSS position/size changes
 * between "docked" (matched every frame to
 * `dockTarget.getBoundingClientRect()`), "floating" (a fixed corner box)
 * and "idle" (off-screen, 0x0). This was NOT the first design tried here:
 * an earlier version used `createPortal(<video/>, dockTarget ??
 * floatingHost ?? hiddenHost)` - swapping WHICH container the SAME portal
 * targeted based on state. That turned out to be a real, verified bug:
 * React destroys and recreates a portal's children whenever the portal's
 * *container* argument changes between renders, even with an explicit
 * `key` on the portal (confirmed by instrumenting the ref callback - the
 * exact same HTMLVideoElement was never reused across a container change,
 * always torn down and rebuilt), which silently reset the video's
 * src/playback state the instant docking flipped to floating.
 * Repositioning one never-swapped, non-portalled container via CSS
 * instead is what actually survives navigation without interrupting
 * playback. See FloatingVideoContext's own docblock for why this all
 * exists in the first place.
 */
// z-index is deliberately LOW while docked (2) and HIGH while floating
// (500). Docked, this element sits at the exact same screen position as
// VodSection's LiveBadge/PlayBadge/UnmuteBadge/JoinLiveButton overlays -
// those used to be plain DOM siblings inside the same ThumbWrap, naturally
// stacking above the old inline <video> by DOM order, but this element is
// no longer in that DOM subtree at all (see this file's own docblock), so
// it needs an explicit z-index low enough that those badges (bumped to
// z-index: 10 in VodSection.tsx) reliably paint above it instead of being
// covered.
const OverlayHost = styled.div<{ $floating: boolean }>`
  position: fixed;
  z-index: ${({ $floating }) => ($floating ? 500 : 2)};
  overflow: hidden;
  background: #000;
  border-radius: ${({ $floating, theme }) => ($floating ? theme.radius.md : 0)};
  box-shadow: ${({ $floating, theme }) => ($floating ? theme.shadow.md : 'none')};
  cursor: ${({ $floating }) => ($floating ? 'pointer' : 'default')};

  video {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const FloatingLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.4rem 1.8rem 0.4rem 0.6rem;
  background: linear-gradient(rgba(0, 0, 0, 0.75), transparent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  z-index: 1;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const FLOATING_WIDTH = 300;
const FLOATING_ASPECT = 16 / 9;
const FLOATING_MARGIN = 16;
// Clears MobileBottomPlayerBar (Layout.tsx) so the two never overlap.
const FLOATING_MOBILE_BOTTOM_OFFSET = 78;
const MOBILE_BREAKPOINT = 768;

export function FloatingVideoPlayer() {
  const { active, videoRef, dockTarget, stopActive, handleEnded, handlePause } = useFloatingVideo();
  const [dockRect, setDockRect] = useState<DOMRect | null>(null);

  // Keeps the overlay glued to VodSection's placeholder while docked - a
  // plain rAF loop is the simplest robust way to track scroll/resize/
  // layout changes without wiring up separate listeners for each.
  useEffect(() => {
    if (!dockTarget) {
      setDockRect(null);
      return;
    }
    let raf: number;
    const sync = () => {
      setDockRect(dockTarget.getBoundingClientRect());
      raf = requestAnimationFrame(sync);
    };
    sync();
    return () => cancelAnimationFrame(raf);
  }, [dockTarget]);

  const isDocked = !!dockTarget;
  const isFloating = !!active && !isDocked;

  const label = !active
    ? null
    : active.kind === 'live'
      ? active.label
      : active.kind === 'scheduled'
        ? active.label
        : active.video.title;

  let style: CSSProperties;
  if (isDocked && dockRect) {
    style = { top: dockRect.top, left: dockRect.left, width: dockRect.width, height: dockRect.height };
  } else if (isFloating) {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const width = isMobile ? 190 : FLOATING_WIDTH;
    const height = width / FLOATING_ASPECT;
    style = {
      left: window.innerWidth - width - (isMobile ? 12 : FLOATING_MARGIN),
      top:
        window.innerHeight -
        height -
        (isMobile ? FLOATING_MOBILE_BOTTOM_OFFSET : FLOATING_MARGIN),
      width,
      height,
    };
  } else {
    // Idle - nothing playing yet. Kept mounted (0x0, off-screen) rather
    // than unrendered, so videoRef.current already exists the moment a
    // user clicks Join Live/a VOD/etc. - none of those actions are what
    // creates this element, so it can't be conditioned on `active`
    // existing yet (that would be circular: nothing could ever set it).
    style = { top: 0, left: 0, width: 0, height: 0, opacity: 0, pointerEvents: 'none' };
  }

  return (
    <OverlayHost
      $floating={isFloating}
      style={style}
      onClick={isFloating ? () => router.visit('/videos') : undefined}
    >
      <video ref={videoRef} controls playsInline onEnded={handleEnded} onPause={handlePause} />
      {isFloating && (
        <>
          <FloatingLabel>{label}</FloatingLabel>
          <CloseButton
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stopActive();
            }}
            aria-label="Close floating video"
          >
            &times;
          </CloseButton>
        </>
      )}
    </OverlayHost>
  );
}
