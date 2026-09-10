import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { APP_LINKS } from './footerLinks';
import logoUrl from '../assets/logo.png';

interface AppDownloadModalProps {
  open: boolean;
  onClose: () => void;
  /** Defaults are raffle-flavored since that's this modal's first caller, but any interaction that's app-only can reuse it with its own copy. */
  title?: string;
  message?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
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
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.26s cubic-bezier(0.34, 1.36, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.ink};
  border-radius: 20px 20px 0 0;
  padding: 2rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  position: relative;
  overflow: hidden;

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
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 10px;
  position: relative;
  z-index: 1;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.2rem, 4vw, 1.45rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin: 0;
  position: relative;
  z-index: 1;
`;

const Sub = styled.p`
  font-size: 0.87rem;
  color: rgba(255, 255, 255, 0.62);
  margin: 0;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  max-width: 340px;
`;

const Body = styled.div`
  padding: 1.5rem 1.75rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const AppPill = styled.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 0.75rem;
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

const DismissBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.borderStrong};
  }
`;

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

/**
 * Shared "this only works in the app" prompt — first used by the Raffle
 * preview page (entering/paying only happens in the app), but written
 * generically so any other web-only-preview interaction can reuse it with
 * its own title/message.
 */
export function AppDownloadModal({
  open,
  onClose,
  title = 'Get the app to enter',
  message = 'Raffle entries and payments happen in the GhanaTalksRadio app. Download it free to enter this raffle and track your tickets.',
}: AppDownloadModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Backdrop onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Banner>
          <CloseBtn type="button" onClick={onClose} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </CloseBtn>
          <Logo src={logoUrl} alt="GhanaTalksRadio" />
          <Headline>{title}</Headline>
          <Sub>{message}</Sub>
        </Banner>

        <Body>
          <AppGrid>
            {APP_LINKS.map(({ label, href, Icon }) => (
              <AppPill key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={16} />
                {label}
              </AppPill>
            ))}
          </AppGrid>
          <DismissBtn type="button" onClick={onClose}>
            Maybe later
          </DismissBtn>
        </Body>
      </Panel>
    </Backdrop>
  );
}
