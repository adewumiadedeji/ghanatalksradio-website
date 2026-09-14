import { useEffect, useRef, useState } from 'react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import { useNav } from '../hooks/useNav';
import type { ResolvedNavChild, ResolvedNavGroup } from '../types/nav';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  padding-top: 0.85rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const linkStyles = `
  font-size: 0.94rem;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    transition: width 0.15s ease;
  }
`;

const NavLink = styled(Link)`
  ${linkStyles}
  color: ${({ theme }) => theme.colors.inkMuted};

  &::after {
    background: ${({ theme }) => theme.colors.gold};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:hover::after {
    width: 100%;
  }
`;

const PlaylistLink = styled(NavLink)`
  &::after {
    background: ${({ theme }) => theme.colors.goldDark};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const DropdownWrap = styled.div`
  position: relative;
`;

const DropdownTriggerLink = styled(Link)`
  ${linkStyles}
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  &::after {
    background: ${({ theme }) => theme.colors.gold};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:hover::after {
    width: 100%;
  }
`;

const DropdownTriggerButton = styled.button<{ $open: boolean; $accent?: boolean }>`
  ${linkStyles}
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  font-family: inherit;
  color: ${({ theme, $open, $accent }) =>
    $accent ? theme.colors.goldDark : $open ? theme.colors.ink : theme.colors.inkMuted};

  &::after {
    background: ${({ theme, $accent }) => ($accent ? theme.colors.goldDark : theme.colors.gold)};
    width: ${({ $open }) => ($open ? '100%' : '0')};
  }

  &:hover {
    color: ${({ theme, $accent }) => ($accent ? theme.colors.goldDark : theme.colors.ink)};
  }

  &:hover::after {
    width: 100%;
  }
`;

const Chevron = styled.svg<{ $open: boolean }>`
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const Dropdown = styled.div`
  /* No gap between trigger and panel — a gap here breaks mouseenter/leave
     continuity (the cursor exits the hoverable wrapper while crossing it,
     closing the dropdown before it can be reached). The visual breathing
     room below the trigger comes from padding-top on this element instead,
     which stays inside the hoverable hit area. */
  top: 100%;
  left: 0;
  padding-top: 0.6rem;
  z-index: 50;
  position: absolute;
`;

const DropdownPanel = styled.div`
  min-width: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled(Link)`
  padding: 0.55rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

/** Generic dismissible dropdown wrapper — hover to open on desktop, click toggles, click-outside and Escape both close it. */
function useDismissibleOpen() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return { open, setOpen, wrapRef };
}

function NavGroupDropdown({
  label,
  slug,
  children,
  basePath = '/category',
  accent = false,
}: {
  label: string;
  slug?: string | null;
  children: ResolvedNavChild[];
  /** URL prefix for this group's own link and all its children — defaults to category routes, but e.g. "/podcast" for the Podcast shows dropdown. */
  basePath?: string;
  /** Gold-accented styling, matching PlaylistLink — used for nav entries that aren't WordPress categories (e.g. Podcast). */
  accent?: boolean;
}) {
  const { open, setOpen, wrapRef } = useDismissibleOpen();

  return (
    <DropdownWrap ref={wrapRef} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {slug ? (
        <DropdownTriggerLink
          to={`${basePath}/${slug}`}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {label}
          <Chevron $open={open} viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </Chevron>
        </DropdownTriggerLink>
      ) : (
        <DropdownTriggerButton
          type="button"
          $open={open}
          $accent={accent}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((o) => !o)}
        >
          {label}
          <Chevron $open={open} viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </Chevron>
        </DropdownTriggerButton>
      )}

      {open && (
        <Dropdown role="menu">
          <DropdownPanel>
            {children.map((child) => (
              <DropdownItem key={child.slug} to={`${basePath}/${child.slug}`} role="menuitem" onClick={() => setOpen(false)}>
                {child.label}
              </DropdownItem>
            ))}
          </DropdownPanel>
        </Dropdown>
      )}
    </DropdownWrap>
  );
}

/**
 * "Podcast" nav entry — a dropdown listing distinct shows, each linking to
 * its own /podcast/:showSlug archive page. Falls back to a plain link to
 * /podcast (no dropdown) if none were found, rather than showing an empty
 * or broken chevron. Show data comes from the shared nav prop (resolved
 * server-side) instead of a client fetch.
 */
function PodcastNavDropdown() {
  const { podcastShows } = useNav();

  if (podcastShows.length === 0) {
    return <PlaylistLink to="/podcast">Podcast</PlaylistLink>;
  }

  const children: ResolvedNavChild[] = podcastShows.map((show) => ({
    label: show.name,
    slug: show.slug,
  }));

  const complete = [{ label: 'All Podcast', slug: '' }, ...children];

  return <NavGroupDropdown label="Podcast" slug={undefined} basePath="/podcast" children={complete} />;
}

/** Shared with MobileNavDrawer so both surfaces list the same Arena items
 * in the same order — Raffle, Predictions, Quizzes and Leaderboard are
 * unrelated route trees (no shared URL prefix), so this is a plain
 * label/to list rather than the slug+basePath shape NavGroupDropdown
 * uses for WordPress-category dropdowns. */
export const ARENA_ITEMS: { label: string; to: string }[] = [
  { label: 'Raffle', to: '/raffle' },
  { label: 'Predictions', to: '/predictions' },
  { label: 'Quizzes', to: '/quizzes' },
  { label: 'Leaderboard', to: '/leaderboard' },
];

function ArenaDropdown() {
  const { open, setOpen, wrapRef } = useDismissibleOpen();

  return (
    <DropdownWrap ref={wrapRef} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownTriggerButton
        type="button"
        $open={open}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        Arena
        <Chevron $open={open} viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </Chevron>
      </DropdownTriggerButton>

      {open && (
        <Dropdown role="menu">
          <DropdownPanel>
            {ARENA_ITEMS.map((item) => (
              <DropdownItem key={item.to} to={item.to} role="menuitem" onClick={() => setOpen(false)}>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownPanel>
        </Dropdown>
      )}
    </DropdownWrap>
  );
}

function MoreDropdown({ items }: { items: ResolvedNavChild[] }) {
  const { open, setOpen, wrapRef } = useDismissibleOpen();

  if (items.length === 0) return null;

  return (
    <DropdownWrap ref={wrapRef} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownTriggerButton type="button" $open={open} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        More
        <Chevron $open={open} viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </Chevron>
      </DropdownTriggerButton>

      {open && (
        <Dropdown role="menu">
          <DropdownPanel>
            {items.map((item) => (
              <DropdownItem key={item.slug} to={`/category/${item.slug}`} role="menuitem" onClick={() => setOpen(false)}>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownPanel>
        </Dropdown>
      )}
    </DropdownWrap>
  );
}

/**
 * Site nav, grouped into the requested structure (Home / News / Podcast /
 * Entertainment.../ Lifestyle.../ Sports / Videos / Arena / Playlist /
 * More). Ported from the Vite SPA's CategoryNav.tsx - the resolution
 * against live WordPress categories now happens server-side
 * (App\Services\Nav\NavResolver, shared via HandleInertiaRequests) instead
 * of a client react-query fetch, so there's no loading/error state here
 * anymore - the data is always present by the time this renders.
 */
export function CategoryNav() {
  const { groups, overflow } = useNav();

  // Render order matches the requested sequence exactly: Home, News,
  // Podcast, then the remaining resolved groups (Entertainment.../
  // Lifestyle.../Sports) in their configured order, then Videos, Arena,
  // Playlist and More at the end. "News" is pulled out and rendered
  // explicitly first rather than relying on array order.
  const newsGroup = groups.find((g) => g.label === 'News');
  const restGroups = groups.filter((g) => g.label !== 'News');

  function renderGroup(group: ResolvedNavGroup) {
    return group.children.length > 0 ? (
      <NavGroupDropdown key={group.label} label={group.label} slug={group.slug} children={group.children} />
    ) : (
      <NavLink key={group.label} to={`/category/${group.slug}`}>
        {group.label}
      </NavLink>
    );
  }

  return (
    <Nav aria-label="Site sections">
      <NavLink to="/">Home</NavLink>
      {newsGroup && renderGroup(newsGroup)}
      <PodcastNavDropdown />
      {restGroups.map(renderGroup)}
      <PlaylistLink to="/videos">Videos</PlaylistLink>
      <PlaylistLink to="/jobs">Jobs</PlaylistLink>
      <ArenaDropdown />
      {/* <PlaylistLink to="/playlist">Playlist</PlaylistLink> */}
      {/* <MoreDropdown items={overflow} /> */}
    </Nav>
  );
}
