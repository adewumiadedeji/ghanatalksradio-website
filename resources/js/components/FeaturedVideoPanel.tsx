import { useState } from 'react';
import styled from 'styled-components';
import type { YoutubeVideoDto } from '../types/youtube';
import { formatPostDate } from '../utils/wpContent';

interface FeaturedVideoPanelProps {
  featured: YoutubeVideoDto;
  isLive: boolean;
  sidebarVideos: YoutubeVideoDto[];
  onSelectSidebarVideo: (video: YoutubeVideoDto) => void;
}

const Panel = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.75rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
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

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const LiveBadge = styled.span`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ theme }) => theme.colors.live};
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.65rem;
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
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge}:hover & {
    transform: scale(1.08);
  }
`;

const FeaturedBody = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;

const FeaturedTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.5rem;
`;

const FeaturedMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarHeading = styled.h3`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 0.4rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
`;

const SidebarThumbWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 108px;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
`;

const SidebarThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SidebarPlayGlyph = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(21, 23, 28, 0.22);
  transition: background 0.15s ease;

  ${SidebarItem}:hover & {
    background: rgba(21, 23, 28, 0.4);
  }
`;

const SidebarTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${SidebarItem}:hover & {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

function PlayGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size * 0.7} height={size} viewBox="0 0 18 20" fill="#fff" aria-hidden="true">
      <path d="M0 0L18 10L0 20V0Z" />
    </svg>
  );
}

/**
 * Featured video + "Explore More" sidebar, adapted from a BBC-style video
 * hub layout to GhanaTalksRadio's own design system (gold accent, Space
 * Grotesk display face) - the structure (large player, compact clickable
 * list beside it) carries over, the visual language doesn't.
 *
 * Same click-to-mount-iframe pattern used everywhere else on the site for
 * YouTube embeds - only the actually-playing video ever loads an iframe.
 * Picking a sidebar video swaps it into the featured slot and starts it
 * playing immediately, matching the explicit intent of clicking it.
 */
export function FeaturedVideoPanel({ featured, isLive, sidebarVideos, onSelectSidebarVideo }: FeaturedVideoPanelProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const isPlaying = playingId === featured.videoId;

  function handleSelect(video: YoutubeVideoDto) {
    setPlayingId(null);
    onSelectSidebarVideo(video);
  }

  return (
    <Panel>
      <FeaturedCard>
        <ThumbWrap>
          {isLive && <LiveBadge>Live</LiveBadge>}
          {isPlaying ? (
            <Frame
              src={`https://www.youtube.com/embed/${featured.videoId}?autoplay=1`}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <Thumb src={featured.thumbnail} alt={featured.title} loading="lazy" />
              <PlayBadge
                type="button"
                onClick={() => setPlayingId(featured.videoId)}
                aria-label={`Play video: ${featured.title}`}
              >
                <PlayCircle>
                  <PlayGlyph size={26} />
                </PlayCircle>
              </PlayBadge>
            </>
          )}
        </ThumbWrap>
        <FeaturedBody>
          <FeaturedTitle>{featured.title}</FeaturedTitle>
          <FeaturedMeta>{isLive ? 'Live now' : formatPostDate(featured.publishedAt)}</FeaturedMeta>
        </FeaturedBody>
      </FeaturedCard>

      {sidebarVideos.length > 0 && (
        <Sidebar aria-label="Explore more videos">
          <SidebarHeading>Explore More</SidebarHeading>
          {sidebarVideos.map((video) => (
            <SidebarItem key={video.videoId} type="button" onClick={() => handleSelect(video)}>
              <SidebarThumbWrap>
                <SidebarThumb src={video.thumbnail} alt="" loading="lazy" />
                <SidebarPlayGlyph aria-hidden="true">
                  <PlayGlyph size={16} />
                </SidebarPlayGlyph>
              </SidebarThumbWrap>
              <SidebarTitle>{video.title}</SidebarTitle>
            </SidebarItem>
          ))}
        </Sidebar>
      )}
    </Panel>
  );
}
