import styled from 'styled-components';
import type { YoutubeVideoDto } from '../types/youtube';
import { formatPostDate } from '../utils/wpContent';

interface VideoCarouselProps {
  videos: YoutubeVideoDto[];
  onSelectVideo: (video: YoutubeVideoDto) => void;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;
}

const Wrap = styled.div`
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
  }
`;

const ThumbWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayCircle = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(21, 23, 28, 0.16);
    transition: background 0.15s ease;
  }

  ${CardButton}:hover &::after {
    background: rgba(21, 23, 28, 0.3);
  }
`;

const PlayGlyphCircle = styled.span`
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;

  ${CardButton}:hover & {
    transform: scale(1.08);
  }
`;

const CardBody = styled.div`
  padding: 0.85rem 0.95rem 1rem;
`;

const CardTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.4rem;
`;

const CardMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const LoadMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.colors.goldTint};
  border: 1px dashed ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.goldDark};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gold};
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

function PlayGlyph() {
  return (
    <svg width="13" height="15" viewBox="0 0 18 20" fill="#15171C" aria-hidden="true">
      <path d="M0 0L18 10L0 20V0Z" />
    </svg>
  );
}

/**
 * "In case you missed it" video grid - 5 columns, growing downward as more
 * pages load (was a horizontal scroll rail; changed per product request).
 * A trailing "Load more" button below the grid appends the next YouTube
 * page into the same grid (backed by Inertia's merge-prop pagination, same
 * mechanism the rail used).
 */
export function VideoCarousel({ videos, onSelectVideo, onLoadMore, loadingMore, hasMore }: VideoCarouselProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <Wrap>
      <Grid>
        {videos.map((video) => (
          <CardButton key={video.videoId} type="button" onClick={() => onSelectVideo(video)}>
            <ThumbWrap>
              <Thumb src={video.thumbnail} alt="" loading="lazy" />
              <PlayCircle>
                <PlayGlyphCircle>
                  <PlayGlyph />
                </PlayGlyphCircle>
              </PlayCircle>
            </ThumbWrap>
            <CardBody>
              <CardTitle>{video.title}</CardTitle>
              <CardMeta>{formatPostDate(video.publishedAt)}</CardMeta>
            </CardBody>
          </CardButton>
        ))}
      </Grid>

      {hasMore && onLoadMore && (
        <LoadMoreWrap>
          <LoadMoreButton type="button" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading…' : 'Load More'}
          </LoadMoreButton>
        </LoadMoreWrap>
      )}
    </Wrap>
  );
}
