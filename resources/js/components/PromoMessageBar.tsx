import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import styled from 'styled-components';
import type { SharedPageProps } from '../types/nav';

const STORAGE_KEY = 'gtr_dismissed_promo_ids';
const MAX_REMEMBERED = 20;

function dismissedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Keyed by campaign+creative, not just campaign - a new creative on the same campaign (rare but possible) should still show. */
function markDismissed(id: string) {
  try {
    const ids = dismissedIds().filter((existing) => existing !== id);
    ids.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(-MAX_REMEMBERED)));
  } catch {}
}

const Bar = styled.div`
  background: ${({ theme }) => theme.colors.goldTint};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0.65rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const CtaLink = styled.a`
  flex-shrink: 0;
  padding: 0.4rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

const CloseBtn = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

/**
 * Site-wide sponsored announcement strip, mounted once in Layout.tsx just
 * below the header. Content comes from the `promoMessage` shared Inertia
 * prop (see HandleInertiaRequests::resolvePromoMessage()) - a
 * `type = promo_message` campaign on the portal side, global rather than
 * per-page (unlike SponsoredBanner, there's no placement concept for
 * these - see PublicBannerController::promoMessages()'s docblock).
 *
 * Deliberately a slim top bar, not another modal - WelcomeModal already
 * owns the "interstitial on load" slot, and stacking two of those would
 * be poor UX. Dismissal is persisted per campaign+creative id so a
 * dismissed message stays dismissed but a new one still shows.
 */
export function PromoMessageBar() {
  const promoMessage = usePage<SharedPageProps>().props.promoMessage;
  const [dismissed, setDismissed] = useState(false);

  const id = promoMessage ? `${promoMessage.campaign_id}-${promoMessage.ad_creative_id}` : null;

  useEffect(() => {
    if (id) {
      setDismissed(dismissedIds().includes(id));
    }
  }, [id]);

  if (!promoMessage || !id || dismissed) return null;

  function close() {
    markDismissed(id!);
    setDismissed(true);
  }

  return (
    <Bar role="region" aria-label="Announcement">
      <Inner>
        <Text>
          <strong>{promoMessage.headline}</strong>
          {promoMessage.body ? ` — ${promoMessage.body}` : ''}
        </Text>
        {promoMessage.cta_url && (
          <CtaLink href={promoMessage.cta_url} target="_blank" rel="noopener noreferrer sponsored">
            {promoMessage.cta_label || 'Learn more'}
          </CtaLink>
        )}
        <CloseBtn type="button" onClick={close} aria-label="Dismiss announcement">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </CloseBtn>
      </Inner>
    </Bar>
  );
}
