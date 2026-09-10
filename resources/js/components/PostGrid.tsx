import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import {
  getFeaturedImageUrl,
  getFeaturedMedia,
  getPlainTitle,
  formatPostDate,
} from '../utils/wpContent';

interface PostGridProps {
  posts: WPPost[];
  isLoading?: boolean;
  columns?: number;
}

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  gap: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 0.75rem;
  transition: box-shadow 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    text-decoration: none;
  }
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.32;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const ShimmerCard = styled.div`
  display: flex;
  gap: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 0.75rem;
`;

const ShimmerThumb = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

/**
 * Compact grid of small image+text cards — a third distinct visual shape
 * alongside CompactPostList (dense, no images) and PostRail (horizontal
 * scroll, big images). Suited to a "Lifestyle"-style section with a
 * moderate item count where a flat list feels sparse but big featured
 * cards feel oversized.
 */
export function PostGrid({ posts, isLoading, columns = 2 }: PostGridProps) {
  if (isLoading) {
    return (
      <Grid $columns={columns} aria-hidden="true">
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <ShimmerCard key={i}>
            <ShimmerThumb />
          </ShimmerCard>
        ))}
      </Grid>
    );
  }

  if (posts.length === 0) return null;

  return (
    <Grid $columns={columns}>
      {posts.map((post) => {
        const media = getFeaturedMedia(post);
        const imageUrl = getFeaturedImageUrl(media, 160);
        return (
          <Card key={post.id} to={`/post/${post.slug}`}>
            {imageUrl && (
              <Thumb>
                <img src={imageUrl} alt={media?.alt_text || getPlainTitle(post)} loading="lazy" />
              </Thumb>
            )}
            <Body>
              <Title>{getPlainTitle(post)}</Title>
              <Meta>{formatPostDate(post.date)}</Meta>
            </Body>
          </Card>
        );
      })}
    </Grid>
  );
}
