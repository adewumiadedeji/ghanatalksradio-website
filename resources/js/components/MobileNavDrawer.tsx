import { useEffect, useState } from 'react';
import { Link } from '../routing/Link';
import { usePage } from '@inertiajs/react';
import styled from 'styled-components';
import { ARENA_ITEMS } from './CategoryNav';
import { useNav } from '../hooks/useNav';
import { ADVERTISER_PORTAL_URLS } from '../config/advertiserPortal';
import type { ResolvedNavChild, ResolvedNavGroup } from '../types/nav';

const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.ink};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const HamburgerIcon = styled.svg`
  width: 22px;
  height: 22px;
`;

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayScrim};
  z-index: 90;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
`;

const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 86vw);
  background: ${({ theme }) => theme.colors.surface};
  z-index: 95;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.25s ease;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DrawerTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 1.05rem;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const DrawerBody = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0 2rem;
`;

/** Mobile equivalent of the desktop TopBar's AdvertiserActions - hidden there below the tablet breakpoint, so it lives here instead. */
const AdvertiserRow = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const GetStartedBtn = styled.a`
  flex: 1;
  text-align: center;
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.85rem;
  font-weight: 700;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

const FlatLink = styled(Link)<{ $accent?: boolean }>`
  display: block;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    color: ${({ theme, $accent }) => ($accent ? theme.colors.gold : theme.colors.ink)};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    text-decoration: none;
  }
`;

const AccordionWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const AccordionTrigger = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
`;

const AccordionChevron = styled.svg<{ $open: boolean }>`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const AccordionPanel = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '600px' : '0')};
  overflow: hidden;
  transition: max-height 0.25s ease;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const AccordionItem = styled(Link)`
  display: block;
  padding: 0.7rem 1.25rem 0.7rem 2rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <AccordionChevron $open={open} viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </AccordionChevron>
  );
}

function MobileAccordionGroup({
  group,
  onNavigate,
}: {
  group: ResolvedNavGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AccordionWrap>
      <AccordionTrigger type="button" $open={open} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {group.label}
        <ChevronDownIcon open={open} />
      </AccordionTrigger>
      <AccordionPanel $open={open}>
        {group.slug && (
          <AccordionItem to={`/category/${group.slug}`} onClick={onNavigate}>
            All {group.label}
          </AccordionItem>
        )}
        {group.children.map((child: ResolvedNavChild) => (
          <AccordionItem key={child.slug} to={`/category/${child.slug}`} onClick={onNavigate}>
            {child.label}
          </AccordionItem>
        ))}
      </AccordionPanel>
    </AccordionWrap>
  );
}

function MobilePodcastAccordion({ onNavigate }: { onNavigate: () => void }) {
  const { podcastShows } = useNav();
  const [open, setOpen] = useState(false);

  if (podcastShows.length === 0) {
    return (
      <FlatLink to="/podcast" $accent onClick={onNavigate}>
        Podcast
      </FlatLink>
    );
  }

  return (
    <AccordionWrap>
      <AccordionTrigger
        type="button"
        $open={open}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Podcast
        <ChevronDownIcon open={open} />
      </AccordionTrigger>
      <AccordionPanel $open={open}>
        <AccordionItem to="/podcast" onClick={onNavigate}>
          All Episodes
        </AccordionItem>
        {podcastShows.map((show) => (
          <AccordionItem key={show.slug} to={`/podcast/${show.slug}`} onClick={onNavigate}>
            {show.name}
          </AccordionItem>
        ))}
      </AccordionPanel>
    </AccordionWrap>
  );
}

function MobileArenaAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <AccordionWrap>
      <AccordionTrigger type="button" $open={open} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        Arena
        <ChevronDownIcon open={open} />
      </AccordionTrigger>
      <AccordionPanel $open={open}>
        {ARENA_ITEMS.map((item) => (
          <AccordionItem key={item.to} to={item.to} onClick={onNavigate}>
            {item.label}
          </AccordionItem>
        ))}
      </AccordionPanel>
    </AccordionWrap>
  );
}

function MobileMoreGroup({ items, onNavigate }: { items: ResolvedNavChild[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <AccordionWrap>
      <AccordionTrigger type="button" $open={open} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        More
        <ChevronDownIcon open={open} />
      </AccordionTrigger>
      <AccordionPanel $open={open}>
        {items.map((item) => (
          <AccordionItem key={item.slug} to={`/category/${item.slug}`} onClick={onNavigate}>
            {item.label}
          </AccordionItem>
        ))}
      </AccordionPanel>
    </AccordionWrap>
  );
}

/**
 * Hamburger trigger + slide-out drawer for narrow viewports, replacing the
 * desktop hover-dropdown CategoryNav (hidden below the tablet breakpoint —
 * hover dropdowns don't translate to touch). Groups with children become
 * accordions instead of hover panels. Ported from the Vite SPA's
 * MobileNavDrawer.tsx - nav data comes from the shared Inertia prop
 * (useNav) instead of a client fetch, and the drawer closes on navigation
 * via usePage().url instead of react-router's useLocation.
 */
export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const { groups, overflow } = useNav();
  const { url } = usePage();

  useEffect(() => {
    setOpen(false);
  }, [url]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const newsGroup = groups.find((g) => g.label === 'News');
  const restGroups = groups.filter((g) => g.label !== 'News');

  function close() {
    setOpen(false);
  }

  function renderGroup(group: ResolvedNavGroup) {
    return group.children.length > 0 ? (
      <MobileAccordionGroup key={group.label} group={group} onNavigate={close} />
    ) : (
      <FlatLink key={group.label} to={`/category/${group.slug}`} onClick={close}>
        {group.label}
      </FlatLink>
    );
  }

  return (
    <>
      <HamburgerButton type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <HamburgerIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </HamburgerIcon>
      </HamburgerButton>

      <Backdrop $open={open} onClick={close} aria-hidden="true" />

      <Drawer $open={open} role="dialog" aria-modal="true" aria-label="Site menu">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <CloseButton type="button" aria-label="Close menu" onClick={close}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </CloseButton>
        </DrawerHeader>

        <AdvertiserRow>
          <GetStartedBtn href={ADVERTISER_PORTAL_URLS.getStarted}>Advertise: Get started</GetStartedBtn>
        </AdvertiserRow>

        <DrawerBody>
          <FlatLink to="/" onClick={close}>Home</FlatLink>
          <FlatLink to="/category/news" $accent onClick={close}>News</FlatLink>
          <FlatLink to="/podcast" $accent onClick={close}>Podcasts</FlatLink>
          <FlatLink to="/videos" $accent onClick={close}>Videos</FlatLink>
          <FlatLink to="/jobs" $accent onClick={close}>Jobs</FlatLink>
          <MobileArenaAccordion onNavigate={close} />
        </DrawerBody>
      </Drawer>
    </>
  );
}
