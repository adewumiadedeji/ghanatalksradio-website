import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from '../routing/Link';
import styled, { keyframes } from 'styled-components';
import type { WPPost } from '../types/wordpress';
import {
  getFeaturedImageUrl,
  getFeaturedMedia,
  getPlainExcerpt,
  getPlainTitle,
  getEmbeddedCategories,
  formatPostDate,
} from '../utils/wpContent';

const ROTATE_MS = 6000;
const FADE_MS = 600;

interface HeroProps {
  posts: WPPost[];
  isLoading: boolean;
}

const Stage = styled.div`
  position: relative;
  aspect-ratio: 16 / 8;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.shadow.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 5;
  }
`;

const Slide = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity ${FADE_MS}ms ease;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

const SlideImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(21, 23, 28, 0.05) 0%,
    rgba(21, 23, 28, 0.35) 55%,
    rgba(21, 23, 28, 0.88) 100%
  );
`;

const SlideBody = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.25rem 2rem 2rem;
  max-width: 620px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 1.25rem 1.75rem;
  }
`;

const Eyebrow = styled(Link)`
  display: inline-flex;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.gold};
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 0.85rem;

  &:hover {
    text-decoration: none;
    filter: brightness(1.05);
  }
`;

const SlideTitle = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.22;
  color: #fff;
  margin-bottom: 0.6rem;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SlideExcerpt = styled.p`
  display: none;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  max-width: 540px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const SlideMeta = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 0.65rem;
`;

const DotRow = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 1.25rem;
    bottom: 1.25rem;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '22px' : '8px')};
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ $active }) =>
    $active ? '#fff' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: width 0.25s ease, background 0.2s ease;
  padding: 0;
`;

const shimmer = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const HeroSkeleton = styled.div`
  aspect-ratio: 16 / 8;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 5;
  }
`;

/**
 * Rotating hero showcasing the most recent posts with a cross-fade between
 * slides. Auto-advances every ROTATE_MS, pauses while the tab is hidden
 * (no point burning a fade cycle nobody sees), and respects
 * prefers-reduced-motion by holding on the first slide instead of forcing
 * the position-based timer to keep firing with motion the user opted out of.
 */
export function Hero({ posts, isLoading }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const slideCount = posts.length;

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
      if (document.hidden) {
        stop();
      } else {
        stop();
        start();
      }
    }

    start();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [advance, slideCount]);

  if (isLoading || posts.length === 0) {
    return <HeroSkeleton aria-hidden="true" />;
  }

  return (
    <Stage
      role="region"
      aria-roledescription="carousel"
      aria-label="Top stories"
    >
      {posts.map((post, index) => {
        const media = getFeaturedMedia(post);
        const imageUrl = getFeaturedImageUrl(media, 1200);
        const categories = getEmbeddedCategories(post);
        const title = getPlainTitle(post);
        const isActive = index === activeIndex;

        return (
          <Slide
            key={post.id}
            $active={isActive}
            aria-hidden={!isActive}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${posts.length}`}
          >
            {imageUrl && (
              <SlideImage
                src={imageUrl}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )}
            <Scrim />
            <SlideBody>
              {categories[0] && (
                <Eyebrow to={`/category/${categories[0].slug}`} tabIndex={isActive ? 0 : -1}>
                  {categories[0].name}
                </Eyebrow>
              )}
              <SlideTitle to={`/post/${post.slug}`} tabIndex={isActive ? 0 : -1}>
                {title}
              </SlideTitle>
              <SlideExcerpt>{getPlainExcerpt(post, 140)}</SlideExcerpt>
              <SlideMeta>{formatPostDate(post.date)}</SlideMeta>
            </SlideBody>
          </Slide>
        );
      })}

      {slideCount > 1 && (
        <DotRow>
          {posts.map((post, index) => (
            <Dot
              key={post.id}
              type="button"
              $active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show story ${index + 1} of ${slideCount}`}
            />
          ))}
        </DotRow>
      )}
    </Stage>
  );
}
