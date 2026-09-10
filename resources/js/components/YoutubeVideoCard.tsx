import { useState } from 'react';
import styled from 'styled-components';
import type { YoutubeVideoDto } from '../types/youtube';
import { formatPostDate } from '../utils/wpContent';

interface YoutubeVideoCardProps {
  video: YoutubeVideoDto;
  isLive?: boolean;
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

const LiveBadge = styled.span`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ theme }) => theme.colors.live};
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
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

const Title = styled.p`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
 * One video from the channel's live feed / recent uploads. Same
 * click-to-mount-iframe pattern as VideoCard (for WP-post-embedded
 * videos): the thumbnail is a static image, the real YouTube iframe only
 * loads once the person actually presses play, so a page full of these
 * doesn't eagerly load a dozen live YouTube embeds nobody asked for yet.
 */
export function YoutubeVideoCard({ video, isLive = false }: YoutubeVideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <Card>
      <ThumbWrap>
        {isLive && <LiveBadge>Live</LiveBadge>}
        {playing ? (
          <Frame
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Thumb src={video.thumbnail} alt={video.title} loading="lazy" />
            <PlayBadge
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${video.title}`}
            >
              <PlayCircle>
                <PlayGlyph />
              </PlayCircle>
            </PlayBadge>
          </>
        )}
      </ThumbWrap>
      <Body>
        <Title>{video.title}</Title>
        {!isLive && <Meta>{formatPostDate(video.publishedAt)}</Meta>}
      </Body>
    </Card>
  );
}
