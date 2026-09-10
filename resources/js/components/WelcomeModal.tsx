import { useEffect, useState } from 'react';
import { Link } from '../routing/Link';
import styled, { keyframes } from 'styled-components';
import {
  APP_LINKS,
  CHANNEL_LINKS,
  SOCIAL_LINKS,
} from './footerLinks';
import { ADVERTISER_PORTAL_URLS } from '../config/advertiserPortal';
import logoUrl from '../assets/logo.png';

// ─── Timing ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gtr_welcome_last_shown';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function shouldShowModal(): boolean {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    return Date.now() - Number(last) > ONE_WEEK_MS;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
}

// ─── Animations ──────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const barBounce = keyframes`
  0%, 100% { transform: scaleY(0.35); }
  50%       { transform: scaleY(1);   }
`;

// ─── Styled components ───────────────────────────────────────────────────────

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
  animation: ${fadeIn} 0.22s ease;

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
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.28s cubic-bezier(0.34, 1.36, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  /* Hide scrollbar visually but keep scroll functional */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

/* ── Hero banner ── */
const Banner = styled.div`
  background: ${({ theme }) => theme.colors.ink};
  border-radius: 20px 20px 0 0;
  padding: 2rem 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Subtle gold diagonal stripe accent — the "one aesthetic risk" */
  &::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -40px;
    width: 200px;
    height: 200px;
    background: ${({ theme }) => theme.colors.gold};
    opacity: 0.08;
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -60px;
    width: 260px;
    height: 260px;
    background: ${({ theme }) => theme.colors.gold};
    opacity: 0.05;
    border-radius: 50%;
  }
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 10px;
  position: relative;
  z-index: 1;
`;

const Tagline = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  position: relative;
  z-index: 1;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.35rem, 4vw, 1.7rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const Sub = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.62);
  margin: 0;
  line-height: 1.55;
  position: relative;
  z-index: 1;
  max-width: 380px;
`;

/* Animated waveform bars — the radio-identity signature */
const Wave = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 20px;
  position: relative;
  z-index: 1;

  span {
    display: block;
    width: 4px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.gold};
    animation: ${barBounce} 1s ease-in-out infinite;
  }
  span:nth-child(1) { height: 35%; animation-delay: 0s;     }
  span:nth-child(2) { height: 75%; animation-delay: -0.25s; }
  span:nth-child(3) { height: 100%; animation-delay: -0.5s; }
  span:nth-child(4) { height: 60%; animation-delay: -0.75s; }
  span:nth-child(5) { height: 35%; animation-delay: -1s;    }

  @media (prefers-reduced-motion: reduce) {
    span { animation: none; height: 60% !important; }
  }
`;

/* ── Body ── */
const Body = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.25rem 1.25rem 1.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

/* ── Advertise CTA ── */
const AdCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.goldTint};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: filter 0.15s ease, transform 0.15s ease;

  &:hover {
    filter: brightness(0.97);
    transform: translateY(-1px);
    text-decoration: none;
  }
`;

const AdIcon = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const AdText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AdTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const AdDesc = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/* ── App links ── */
const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AppPill = styled.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease, background 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.goldTint};
    text-decoration: none;
  }
`;

/* ── Podcast CTA ── */
const PodcastCTA = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: ${({ theme }) => theme.colors.ink};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`;

const PodcastText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const PodcastTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
`;

const PodcastDesc = styled.span`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
`;

/* ── Social + Channel row ── */
const IconRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const IconBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
    transform: translateY(-1px);
    text-decoration: none;
  }
`;

const ChannelBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.goldTint};
  color: ${({ theme }) => theme.colors.goldDark};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.96);
    text-decoration: none;
  }
`;

/* ── Footer row ── */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const DismissBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.55rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const ExploreBtn = styled(Link)`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.55rem 1.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

/* ── Close button ── */
const CloseBtn = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't immediately compete with page load rendering.
    const timer = setTimeout(() => {
      if (shouldShowModal()) {
        setOpen(true);
        markShown();
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  function close() {
    setOpen(false);
  }

  return (
    <Backdrop onClick={close} role="dialog" aria-modal="true" aria-label="Welcome to GhanaTalksRadio">
      <Panel onClick={(e) => e.stopPropagation()}>

        {/* ── Banner ── */}
        <Banner>
          <CloseBtn type="button" onClick={close} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </CloseBtn>
          <Logo src={logoUrl} alt="GhanaTalksRadio" />
          <Tagline>Ghana's Digital Radio</Tagline>
          <Headline>Your voice. Your stories.<br />Your station.</Headline>
          <Sub>
            News, music, talk and culture — live and on demand.
            Giving the youth a voice since day one.
          </Sub>
          <Wave aria-hidden="true">
            <span /><span /><span /><span /><span />
          </Wave>
        </Banner>

        {/* ── Body ── */}
        <Body>

          {/* Advertise */}
          <Section>
            <SectionLabel>Grow your business</SectionLabel>
            <AdCard href={ADVERTISER_PORTAL_URLS.getStarted} target="_blank" rel="noopener noreferrer">
              <AdIcon>📣</AdIcon>
              <AdText>
                <AdTitle>Advertise with GhanaTalksRadio</AdTitle>
                <AdDesc>Reach thousands of engaged Ghanaian listeners daily — on air and online.</AdDesc>
              </AdText>
            </AdCard>
          </Section>

          {/* Apps */}
          <Section>
            <SectionLabel>Take us everywhere</SectionLabel>
            <AppGrid>
              {APP_LINKS.map(({ label, href, Icon }) => (
                <AppPill key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={16} />
                  {label}
                </AppPill>
              ))}
            </AppGrid>
          </Section>

          {/* Podcast */}
          <Section>
            <SectionLabel>Catch up anytime</SectionLabel>
            <PodcastCTA to="/podcast" onClick={close}>
              <span style={{ fontSize: '1.8rem' }}>🎙</span>
              <PodcastText>
                <PodcastTitle>GTR Podcast</PodcastTitle>
                <PodcastDesc>News bulletins, talk shows and more — on demand whenever you're ready.</PodcastDesc>
              </PodcastText>
              <svg style={{ marginLeft: 'auto', flexShrink: 0, color: 'rgba(255,255,255,0.4)' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PodcastCTA>
          </Section>

          {/* Social */}
          <Section>
            <SectionLabel>Follow us</SectionLabel>
            <IconRow>
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <IconBtn key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}>
                  <Icon size={18} />
                </IconBtn>
              ))}
            </IconRow>
          </Section>

          {/* Channels */}
          <Section>
            <SectionLabel>Join our community</SectionLabel>
            <IconRow>
              {CHANNEL_LINKS.map(({ label, href, Icon }) => (
                <ChannelBtn key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={16} />
                  {label.replace(' Channel', '')}
                </ChannelBtn>
              ))}
            </IconRow>
          </Section>

          {/* Footer */}
          <Footer>
            <DismissBtn type="button" onClick={close}>Maybe later</DismissBtn>
            <ExploreBtn to="/" onClick={close}>Explore GTR →</ExploreBtn>
          </Footer>

        </Body>
      </Panel>
    </Backdrop>
  );
}
