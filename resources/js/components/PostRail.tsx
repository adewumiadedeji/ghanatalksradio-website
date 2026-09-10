import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import {
  getFeaturedImageUrl,
  getFeaturedMedia,
  getPlainTitle,
  formatPostDate,
} from '../utils/wpContent';

interface PostRailProps {
  posts: WPPost[];
  isLoading?: boolean;
}

const Track = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.4rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 3px;
  }
`;

const Card = styled(Link)`
  flex: 0 0 220px;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
    text-decoration: none;
  }
`;

const Thumb = styled.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const CardBody = styled.div`
  padding: 0.75rem 0.85rem 0.9rem;
`;

const CardTitle = styled.div`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.4rem;
`;

const ShimmerCard = styled.div`
  flex: 0 0 220px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const ShimmerThumb = styled.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

/**
 * Horizontally-scrolling image-forward card rail — good for visually
 * heavy categories (Entertainment, Sports) where thumbnails carry real
 * information and a flat text list would waste that. Distinct shape from
 * CompactPostList and PostCard so the homepage reads as edited zones, not
 * one repeated card pattern.
 */
export function PostRail({ posts, isLoading }: PostRailProps) {
  if (isLoading) {
    return (
      <Track aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <ShimmerCard key={i}>
            <ShimmerThumb />
          </ShimmerCard>
        ))}
      </Track>
    );
  }

  if (posts.length === 0) return null;

  return (
    <Track>
      {posts.map((post) => {
        const media = getFeaturedMedia(post);
        const imageUrl = getFeaturedImageUrl(media, 320);
        return (
          <Card key={post.id} to={`/post/${post.slug}`}>
            {imageUrl && (
              <Thumb>
                <img src={imageUrl} alt={media?.alt_text || getPlainTitle(post)} loading="lazy" />
              </Thumb>
            )}
            <CardBody>
              <CardTitle>{getPlainTitle(post)}</CardTitle>
              <CardMeta>{formatPostDate(post.date)}</CardMeta>
            </CardBody>
          </Card>
        );
      })}
    </Track>
  );
}
