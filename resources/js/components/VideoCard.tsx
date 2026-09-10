import { useState } from 'react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import {
  getYouTubeVideoId,
  getYouTubeThumbnail,
  getPlainTitle,
  getEmbeddedCategories,
  formatPostDate,
} from '../utils/wpContent';

interface VideoCardProps {
  post: WPPost;
}

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }
`;

const ThumbWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayBadge = styled.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(21, 23, 28, 0.18);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.32);
  }
`;

const PlayCircle = styled.span`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge}:hover & {
    transform: scale(1.08);
  }
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Body = styled.div`
  padding: 0.9rem 1rem 1rem;
`;

const Eyebrow = styled(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled(Link)`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin-top: 0.3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;

const Meta = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.4rem;
`;

function PlayGlyph() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="#15171C" aria-hidden="true">
      <path d="M0 0L18 10L0 20V0Z" />
    </svg>
  );
}

/**
 * A video post rendered as a thumbnail card. The real YouTube iframe is
 * only mounted after a click — loading a dozen live YouTube embeds upfront
 * would be slow and mostly wasted, since most won't be watched. The
 * thumbnail itself is YouTube's own static hqdefault.jpg, so no iframe
 * (and no YouTube tracking) loads until the person actually presses play.
 */
export function VideoCard({ post }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeVideoId(post.content.rendered);
  const categories = getEmbeddedCategories(post);
  const title = getPlainTitle(post);

  if (!videoId) return null;

  return (
    <Card>
      <ThumbWrap>
        {playing ? (
          <Frame
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Thumb src={getYouTubeThumbnail(videoId)} alt={title} loading="lazy" />
            <PlayBadge
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
            >
              <PlayCircle>
                <PlayGlyph />
              </PlayCircle>
            </PlayBadge>
          </>
        )}
      </ThumbWrap>
      <Body>
        {categories[0] && (
          <Eyebrow to={`/category/${categories[0].slug}`}>{categories[0].name}</Eyebrow>
        )}
        <Title to={`/post/${post.slug}`}>{title}</Title>
        <Meta>{formatPostDate(post.date)}</Meta>
      </Body>
    </Card>
  );
}
