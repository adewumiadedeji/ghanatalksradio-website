import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID as
  | string
  | undefined;

export const GTR_AD_SLOTS = {
  horizontal: '7678592508',
  vertical: '6820952195',
  inFeed: '4801659284',
  inArticle: '6681451234',
} as const;

const IN_FEED_LAYOUT_KEY = '-55+cd+18-cp+js';

export type AdSlotFormat = 'in-article' | 'in-feed' | 'sidebar' | 'leaderboard';

interface AdSlotProps {
  slotId?: string;
  format?: AdSlotFormat;
  minHeight?: number;
  className?: string;
}

const FIXED_HEIGHT_FORMATS: Record<string, number> = {
  sidebar: 600,
  leaderboard: 90,
};

/**
 * Every format here uses `data-ad-format="auto" data-full-width-responsive`
 * (see buildAdAttributes) except in-feed/in-article, which have their own
 * fluid layout. "Auto/responsive" ad units decide their own height from
 * live AdSense inventory - a real, well-known AdSense behavior where an
 * unfilled or oddly-matched slot can reserve a much taller box than it
 * ever does locally (no live ad-serving happens on localhost, so this
 * never reproduces there). `min-height` alone doesn't bound that - only
 * a `max-height` does. Capped generously (3x the intended size, or 320px
 * where there's no fixed size) so a real filled ad still displays fully,
 * this only clips a runaway empty reservation. Real bug reported live:
 * a leaderboard slot reserved most of a mobile screen's height with
 * nothing in it.
 */
function resolveMaxHeight(minHeight?: number): number {
  return minHeight ? minHeight * 3 : 320;
}

const Wrapper = styled.div<{ $minHeight?: number; $maxHeight: number }>`
  width: 100%;
  ${({ $minHeight }) => ($minHeight ? `min-height: ${$minHeight}px;` : '')}
  max-height: ${({ $maxHeight }) => $maxHeight}px;
  display: ${({ $minHeight }) => ($minHeight ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
  margin: 1.75rem 0;
  overflow: hidden;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.inkFaint};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem 1rem;
`;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function buildAdAttributes(format: AdSlotFormat): Record<string, string> {
  if (format === 'in-feed') {
    return {
      'data-ad-format': 'fluid',
      'data-ad-layout-key': IN_FEED_LAYOUT_KEY,
    };
  }
  if (format === 'in-article') {
    return {
      'data-ad-layout': 'in-article',
      'data-ad-format': 'fluid',
    };
  }
  return {
    'data-ad-format': 'auto',
    'data-full-width-responsive': 'true',
  };
}

/**
 * AdSense ad unit, SPA-safe.
 *
 * The core problem with AdSense in React SPAs: adsbygoogle.push({}) must be
 * called AFTER the <ins> element is in the DOM, and must be called again on
 * every route change — because AdSense treats each push() as initializing one
 * specific <ins> element. Inertia navigations never do a real page load
 * either, so AdSense's own script never re-scans the page on its own. If
 * push() fires before the <ins> is mounted (race condition) or doesn't fire
 * after a route change (stale effect), the ad silently shows nothing.
 *
 * Fix: usePage().url adds the current path to the effect's dependency
 * array, so the effect re-runs on every Inertia navigation. The insRef
 * null-check ensures push() only fires once the <ins> is actually in the DOM.
 *
 * A bare setTimeout(0) here used to be enough to yield one event-loop tick,
 * but in production this was firing before the browser had finished laying
 * out the <ins>'s ancestors (still measured 0px wide) - AdSense's own script
 * measures the element synchronously when push() runs and throws a TagError
 * ("No slot size for availableWidth=0") if it's 0px, which permanently marks
 * that <ins> as done/failed with no retry (confirmed live on
 * ghanatalksradio.com: every ad slot threw this on every load, width was
 * always 0 at push time even though the same element measured 1200px+ a
 * moment later). setTimeout(0) only guarantees "after this tick", not "after
 * layout" - requestAnimationFrame runs after the browser's next paint, which
 * is what's actually needed here. Polling across a few frames (rather than a
 * single rAF) covers the case where the ad's container itself is still
 * settling its own width (e.g. flex/grid siblings still loading images).
 */
const MAX_WIDTH_POLL_FRAMES = 30; // ~0.5s at 60fps - generous but bounded, so a slot that never gets width still resolves instead of silently never pushing.

export function AdSlot({
  slotId,
  format = 'in-article',
  minHeight,
  className,
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const { url } = usePage();
  const resolvedMinHeight = minHeight ?? FIXED_HEIGHT_FORMATS[format];
  const resolvedMaxHeight = resolveMaxHeight(resolvedMinHeight);
  const isLive = Boolean(ADSENSE_CLIENT_ID && slotId);

  useEffect(() => {
    if (!isLive) return;
    if (!insRef.current) return;

    // If AdSense has already stamped this <ins> (i.e. it already has
    // data-adsbygoogle-status set), don't push again — doing so causes the
    // "already initialized" error and produces a blank unit.
    if (insRef.current.getAttribute('data-adsbygoogle-status')) return;

    let cancelled = false;
    let rafId = 0;
    let attempts = 0;

    function push() {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSlot: adsbygoogle push failed', err);
      }
    }

    function waitForWidthThenPush() {
      if (cancelled || !insRef.current) return;
      attempts += 1;
      const hasWidth = insRef.current.getBoundingClientRect().width > 0;
      if (hasWidth || attempts >= MAX_WIDTH_POLL_FRAMES) {
        push();
        return;
      }
      rafId = requestAnimationFrame(waitForWidthThenPush);
    }

    rafId = requestAnimationFrame(waitForWidthThenPush);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };

    // url is the key dependency: re-run on every Inertia navigation so the
    // newly-mounted <ins> gets its push() call after navigation.
  }, [isLive, slotId, url]);

  if (!isLive) {
    return (
      <Wrapper $minHeight={resolvedMinHeight} $maxHeight={resolvedMaxHeight} className={className} aria-hidden="true">
        <Placeholder>Ad space — {format}</Placeholder>
      </Wrapper>
    );
  }

  const adAttributes = buildAdAttributes(format);

  return (
    <Wrapper $minHeight={resolvedMinHeight} $maxHeight={resolvedMaxHeight} className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        {...adAttributes}
      />
    </Wrapper>
  );
}
