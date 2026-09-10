import { useEffect, useState } from 'react';
import { Link } from '../routing/Link';
import styled, { keyframes } from 'styled-components';

const STORAGE_KEY = 'gtr_cookie_accepted';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

/**
 * Sits above the fixed mobile player bar (z-index 80) and below the
 * mobile nav drawer (z-index 90). Uses z-index 85.
 * On mobile it accounts for the player bar height via bottom offset.
 */
const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 85;
  background: ${({ theme }) => theme.colors.ink};
  color: rgba(255, 255, 255, 0.85);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${slideUp} 0.3s ease;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);

  /* On mobile, sit above the fixed audio player bar (~88px tall) */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 88px;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Message = styled.p`
  font-size: 0.83rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  min-width: 220px;

  a {
    color: ${({ theme }) => theme.colors.gold};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #fff;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const LearnBtn = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: #fff;
    text-decoration: none;
  }
`;

const AcceptBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.gold};
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }
`;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Slight delay so it doesn't appear before the page has painted.
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <Bar role="region" aria-label="Cookie notice">
      <Message>
        We use cookies to personalise content, serve ads and analyse traffic.
        By continuing to use GhanaTalksRadio you agree to our{' '}
        <Link to="/privacy-policy" onClick={accept}>
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/cookie-policy" onClick={accept}>
          Cookie Policy
        </Link>.
      </Message>
      <Actions>
        <LearnBtn to="/privacy-policy" onClick={accept}>Learn more</LearnBtn>
        <AcceptBtn type="button" onClick={accept}>Got it</AcceptBtn>
      </Actions>
    </Bar>
  );
}
