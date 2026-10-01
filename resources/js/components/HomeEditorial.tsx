import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from '../routing/Link';
import { CategoryNav } from './CategoryNav';
import type { WPPost } from '../types/wordpress';
import {
  getPlainTitle,
  getPlainExcerpt,
  getFeaturedMedia,
  getFeaturedImageUrl,
  getAuthorName,
  getAuthorAvatarUrl,
  getEmbeddedCategories,
  formatPostDate,
} from '../utils/wpContent';
import EngagementBannerStrip from './EngagementBannerStrip';

/**
 * The redesigned Home page's editorial masthead + hero block - see the
 * reference mockups this was built against (a "Paperto News Portal"
 * layout). Deliberately Home-only: Layout.tsx's own header (and the
 * RadioPlayer/WatchToggle instances living in it) is untouched, so
 * playback never interrupts navigating between Home and any other page -
 * see this project's own notes on Inertia's persistent-layout mechanism
 * for why that matters. This masthead sits BELOW that existing thin
 * utility bar as Home's own page content, not a replacement for it -
 * a two-tier "utility bar + big masthead" layout is a normal, real
 * newspaper-site pattern, not a duplicate header by accident.
 */

const MastheadWrap = styled.header`
  padding: 0.6rem 0 0;
`;

const MastheadTop = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.65rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.3rem;
  }
`;

const MastheadDate = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.inkFaint};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 3;
  }
`;

export const MastheadTitle = styled.h1`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SubNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.15rem 0;
`;

const SearchIconLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.inkMuted};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 11.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HomeMasthead() {
  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) +
      ' · ' +
      new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    []
  );

  return (
    <MastheadWrap>
      {/* <MastheadTop>
        <span aria-hidden="true" />
        <MastheadTitle>GhanaTalksRadio</MastheadTitle>
        <MastheadDate style={{ justifySelf: 'end' }}>{dateLabel}</MastheadDate>
      </MastheadTop> */}

      <SubNavRow>
        <CategoryNav />
        <SearchIconLink to="/search" aria-label="Search">
          <SearchIcon />
        </SearchIconLink>
      </SubNavRow>
    </MastheadWrap>
  );
}

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const TickerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.55rem 0;
  overflow: hidden;
`;

const TickerBell = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const TickerTrack = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${scroll} 40s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TickerItem = styled(Link)`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 0 1.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.borderStrong};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

/** Breaking-news ticker - real post titles/links, not decorative text. Duplicated once so the CSS scroll loop has no visible seam. */
export function NewsTicker({ posts }: { posts: WPPost[] }) {
  if (posts.length === 0) return null;
  const items = posts.slice(0, 8);

  return (
    <TickerWrap>
      <TickerBell aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a1 1 0 0 1 1 1v.06a5 5 0 0 1 4 4.9V10l1.3 1.95a.8.8 0 0 1-.66 1.25H2.36a.8.8 0 0 1-.66-1.25L3 10V6.96a5 5 0 0 1 4-4.9V2a1 1 0 0 1 1-1zM6.5 14a1.5 1.5 0 0 0 3 0h-3z" />
        </svg>
      </TickerBell>
      <TickerTrack>
        {[...items, ...items].map((post, i) => (
          <TickerItem key={`${post.id}-${i}`} to={`/post/${post.slug}`}>
            {getPlainTitle(post)}
          </TickerItem>
        ))}
      </TickerTrack>
    </TickerWrap>
  );
}

const HeroLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: start;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const ROTATE_MS = 6000;
const FADE_MS = 600;

const HeroStage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;

const HeroSlide = styled(Link)<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: block;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity ${FADE_MS}ms ease;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroDotRow = styled.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const HeroDot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '22px' : '8px')};
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.4)')};
  cursor: pointer;
  padding: 0;
  transition: width 0.25s ease, background 0.2s ease;
`;

const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 17, 22, 0.88) 0%, rgba(15, 17, 22, 0.25) 55%, transparent 100%);
`;

const HeroCopy = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.75rem;
  color: #fff;
`;

const HeroTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 0.75rem;
`;

const HeroHeadline = styled.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 0.6rem;
`;

const HeroExcerpt = styled.p`
  font-size: 0.9rem;
  opacity: 0.85;
  max-width: 640px;
  margin: 0 0 0.6rem;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const HeroByline = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  opacity: 0.75;
  margin: 0;
`;

const SidebarCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.25rem;
`;

const SidebarHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SidebarTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
`;

const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.live};
  background: ${({ theme }) => theme.colors.liveTint};
  padding: 0.25rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.pill};
`;

const RankedItem = styled(Link)`
  display: flex;
  gap: 0.85rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const RankNumber = styled.span`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.borderStrong};
  flex-shrink: 0;
  width: 1.6rem;
`;

const RankBody = styled.div``;

const RankTitle = styled.p`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.25rem;
`;

const RankMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SubCard = styled(Link)`
  display: block;
`;

const SubCardImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const SubCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.4rem;
`;

const SubCardMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

interface HomeHeroBlockProps {
  heroPosts: WPPost[];
  mostRead: WPPost[];
  subStories: WPPost[];
  engagementBanners: any[]
}

/**
 * The hero slider + "Most Read" sidebar + 3-card row under the ticker.
 * The hero is a real cross-fading carousel over ALL of heroPosts - not a
 * static single card - mirroring Hero.tsx's own proven mechanics (rotate
 * every ROTATE_MS, pause while the tab is hidden, hold still for
 * prefers-reduced-motion) under this design's own visual treatment.
 */
export function HomeHeroBlock({ heroPosts, mostRead, subStories, engagementBanners }: HomeHeroBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const slideCount = heroPosts.length;

  const advance = useCallback(() => {
    setActiveIndex((i) => (slideCount > 0 ? (i + 1) % slideCount : 0));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || prefersReducedMotion.current) return;

    function start() {
      timerRef.current = setInterval(advance, ROTATE_MS);
    }
    function stop() {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    function handleVisibility() {
      stop();
      if (!document.hidden) start();
    }

    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [advance, slideCount]);

  return (
    <>
      {slideCount > 0 && (
        <HeroLayout>
          <HeroStage role="region" aria-roledescription="carousel" aria-label="Top stories">
            {heroPosts.map((post, index) => {
              const isActive = index === activeIndex;
              return (
                <HeroSlide
                  key={post.id}
                  to={`/post/${post.slug}`}
                  $active={isActive}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slideCount}`}
                >
                  <HeroImg
                    src={getFeaturedImageUrl(getFeaturedMedia(post), 1024)}
                    alt={getPlainTitle(post)}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <HeroScrim />
                  <HeroCopy>
                    {getEmbeddedCategories(post)[0] && <HeroTag>{getEmbeddedCategories(post)[0].name}</HeroTag>}
                    <HeroHeadline>{getPlainTitle(post)}</HeroHeadline>
                    <HeroExcerpt>{getPlainExcerpt(post, 180)}</HeroExcerpt>
                    <HeroByline>
                      {getAuthorName(post)} · {formatPostDate(post.date)}
                    </HeroByline>
                  </HeroCopy>
                </HeroSlide>
              );
            })}

            {slideCount > 1 && (
              <HeroDotRow>
                {heroPosts.map((post, index) => (
                  <HeroDot
                    key={post.id}
                    type="button"
                    $active={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show story ${index + 1} of ${slideCount}`}
                  />
                ))}
              </HeroDotRow>
            )}
          </HeroStage>

          {mostRead.length > 0 && (
            <SidebarCard>
              <SidebarHead>
                <SidebarTitle>Most Read</SidebarTitle>
                <LiveBadge>
                  <span aria-hidden="true">●</span> Live
                </LiveBadge>
              </SidebarHead>
              {mostRead.slice(0, 5).map((post, i) => (
                <RankedItem key={post.id} to={`/post/${post.slug}`}>
                  <RankNumber>{String(i + 1).padStart(2, '0')}</RankNumber>
                  <RankBody>
                    <RankTitle>{getPlainTitle(post)}</RankTitle>
                    <RankMeta>
                      {formatPostDate(post.date)} · {getAuthorName(post)}
                    </RankMeta>
                  </RankBody>
                </RankedItem>
              ))}
            </SidebarCard>
          )}
        </HeroLayout>
      )}

      {subStories.length > 0 && (
        <SubGrid>
          {subStories.slice(0, 2).map((post) => (
            <SubCard key={post.id} to={`/post/${post.slug}`}>
              <SubCardImg src={getFeaturedImageUrl(getFeaturedMedia(post), 500)} alt={getPlainTitle(post)} loading="lazy" />
              <SubCardTitle>{getPlainTitle(post)}</SubCardTitle>
              <SubCardMeta>
                {getAuthorName(post)} · {formatPostDate(post.date)}
              </SubCardMeta>
            </SubCard>
          ))}
          <SubCard to="#">
            <EngagementBannerStrip banners={engagementBanners} />
          </SubCard>
        </SubGrid>
      )}
    </>
  );
}

const WeekSection = styled.section`
  margin: 2.5rem 0;
`;

const WeekSectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const WeekTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;

const WeekSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  max-width: 420px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const WeekColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const WeekCard = styled(Link)`
  display: block;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const WeekCardImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const WeekCardMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.4rem;
`;

const WeekCardTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.4rem;
`;

const WeekCardExcerpt = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.5;
  margin: 0;
`;

const FeaturedCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
`;

const FeaturedMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.6rem;
`;

const FeaturedTitle = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const FeaturedImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const FeaturedExcerpt = styled.p`
  font-size: 0.87rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.6;
  margin: 0 0 1rem;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const AuthorAvatarFallback = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.85rem;
`;

const AuthorName = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
`;

const ExploreLink = styled(Link)`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  margin-top: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const DeskSection = styled.section`
  margin: 2.5rem 0;
`;

const DeskEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-bottom: 0.5rem;
`;

const DeskHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const DeskTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;

const DeskSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  max-width: 420px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const DeskLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const DateGroup = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DateLabel = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.85rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DeskRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const DeskCard = styled(Link)`
  display: block;
`;

const DeskCardImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const DeskCardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.35rem;
`;

const DeskCardExcerpt = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.5;
  margin: 0 0 0.4rem;
`;

const DeskCardMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

const TrendingSidebar = styled.div``;

const TrendingHead = styled.h3`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.ink};
`;

const TrendingItem = styled(Link)`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TrendingThumb = styled.img`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.sm};
  object-fit: cover;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const TrendingBody = styled.div`
  min-width: 0;
`;

const TrendingTitle = styled.p`
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.25rem;
`;

const TrendingMeta = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

/** Groups posts by calendar day, preserving each group's existing (already-recency-sorted) order. */
function groupByDay(posts: WPPost[]): { label: string; posts: WPPost[] }[] {
  const groups = new Map<string, WPPost[]>();
  for (const post of posts) {
    const day = post.date.slice(0, 10);
    if (!groups.has(day)) groups.set(day, []);
    groups.get(day)!.push(post);
  }
  return [...groups.entries()].map(([day, dayPosts]) => ({
    label: new Date(day).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    posts: dayPosts,
  }));
}

interface MultimediaDeskSectionProps {
  posts: WPPost[];
  trending: WPPost[];
}

/**
 * Date-grouped story rows (3 per day shown) + a "Trending" sidebar with
 * small thumbnails - see the reference this was built against. No
 * per-day archive route exists in this app, so (unlike the reference's
 * "View Sunday's Portal") this deliberately has no per-group link -
 * never fabricating a destination that doesn't resolve to anything real.
 */
export function MultimediaDeskSection({ posts, trending }: MultimediaDeskSectionProps) {
  if (posts.length === 0) return null;
  const groups = groupByDay(posts).slice(0, 4);

  return (
    <DeskSection aria-label="More stories">
      <DeskHead>
        <DeskTitle>More Stories</DeskTitle>
        <DeskSubtitle>More reporting and features from across the newsroom, newest first.</DeskSubtitle>
      </DeskHead>

      <DeskLayout>
        <div>
          {groups.map((group) => (
            <DateGroup key={group.label}>
              <DateLabel>{group.label}</DateLabel>
              <DeskRow>
                {group.posts.slice(0, 3).map((post) => (
                  <DeskCard key={post.id} to={`/post/${post.slug}`}>
                    <DeskCardImg
                      src={getFeaturedImageUrl(getFeaturedMedia(post), 500)}
                      alt={getPlainTitle(post)}
                      loading="lazy"
                    />
                    <DeskCardTitle>{getPlainTitle(post)}</DeskCardTitle>
                    <DeskCardExcerpt>{getPlainExcerpt(post, 90)}</DeskCardExcerpt>
                    <DeskCardMeta>
                      {formatPostDate(post.date)} · {getAuthorName(post)}
                    </DeskCardMeta>
                  </DeskCard>
                ))}
              </DeskRow>
            </DateGroup>
          ))}
        </div>

        {trending.length > 0 && (
          <TrendingSidebar>
            <TrendingHead>Trending</TrendingHead>
            {trending.slice(0, 5).map((post) => (
              <TrendingItem key={post.id} to={`/post/${post.slug}`}>
                <TrendingThumb src={getFeaturedImageUrl(getFeaturedMedia(post), 120)} alt="" loading="lazy" />
                <TrendingBody>
                  <TrendingTitle>{getPlainTitle(post)}</TrendingTitle>
                  <TrendingMeta>
                    {formatPostDate(post.date)} · {getAuthorName(post)}
                  </TrendingMeta>
                </TrendingBody>
              </TrendingItem>
            ))}
          </TrendingSidebar>
        )}
      </DeskLayout>
    </DeskSection>
  );
}

interface WeeklyStoriesSectionProps {
  title: string;
  subtitle?: string;
  posts: WPPost[];
}

/**
 * 2+2+1 editorial grid - two stacked stories per side column, one
 * "featured" long-form block on the right (image, real excerpt as body
 * copy, author row using WordPress's own real avatar_urls Gravatar map).
 * No per-author job title exists in this data, so the author row shows a
 * name only, never an invented role/title. With fewer than 5 posts, the
 * featured slot falls back to reusing posts[0] rather than disappearing -
 * an acceptable minor overlap in a low-content category, better than a
 * visibly incomplete third column.
 */
export function WeeklyStoriesSection({ title, subtitle, posts }: WeeklyStoriesSectionProps) {
  if (posts.length === 0) return null;

  const left = posts.slice(0, 2);
  const middle = posts.slice(2, 4);
  const featured = posts[4] ?? posts[0];
  const avatarUrl = getAuthorAvatarUrl(featured);

  function Card({ post }: { post: WPPost }) {
    return (
      <WeekCard to={`/post/${post.slug}`}>
        <WeekCardImg src={getFeaturedImageUrl(getFeaturedMedia(post), 500)} alt={getPlainTitle(post)} loading="lazy" />
        <WeekCardMeta>
          {formatPostDate(post.date)} · {getAuthorName(post)}
        </WeekCardMeta>
        <WeekCardTitle>{getPlainTitle(post)}</WeekCardTitle>
        <WeekCardExcerpt>{getPlainExcerpt(post, 110)}</WeekCardExcerpt>
      </WeekCard>
    );
  }

  return (
    <WeekSection aria-label={title}>
      <WeekSectionHead>
        <WeekTitle>{title}</WeekTitle>
        {subtitle && <WeekSubtitle>{subtitle}</WeekSubtitle>}
      </WeekSectionHead>

      <WeekGrid>
        <WeekColumn>
          {left.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </WeekColumn>

        <WeekColumn>
          {middle.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </WeekColumn>

        <FeaturedCard>
          <FeaturedMeta>
            {formatPostDate(featured.date)} · {getAuthorName(featured)}
          </FeaturedMeta>
          <FeaturedTitle to={`/post/${featured.slug}`}>{getPlainTitle(featured)}</FeaturedTitle>
          <FeaturedImg
            src={getFeaturedImageUrl(getFeaturedMedia(featured), 600)}
            alt={getPlainTitle(featured)}
            loading="lazy"
          />
          <FeaturedExcerpt>{getPlainExcerpt(featured, 280)}</FeaturedExcerpt>

          <AuthorRow>
            {avatarUrl ? (
              <AuthorAvatar src={avatarUrl} alt={getAuthorName(featured)} />
            ) : (
              <AuthorAvatarFallback aria-hidden="true">{getAuthorName(featured).charAt(0)}</AuthorAvatarFallback>
            )}
            <AuthorName>{getAuthorName(featured)}</AuthorName>
          </AuthorRow>

          <ExploreLink to={`/post/${featured.slug}`}>Read the full story →</ExploreLink>
        </FeaturedCard>
      </WeekGrid>
    </WeekSection>
  );
}
