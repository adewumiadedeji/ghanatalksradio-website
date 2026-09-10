import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import {
  getFeaturedImageUrl,
  getFeaturedMedia,
  getPlainExcerpt,
  getPlainTitle,
  getEmbeddedCategories,
  formatPostDate,
} from '../utils/wpContent';

interface PostCardProps {
  post: WPPost;
  variant?: 'default' | 'featured';
}

const Card = styled.article<{ $featured: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  display: flex;
  flex-direction: ${({ $featured }) => ($featured ? 'column' : 'row')};
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Thumb = styled(Link)<{ $featured: boolean }>`
  display: block;
  flex-shrink: 0;
  width: ${({ $featured }) => ($featured ? '100%' : '148px')};
  aspect-ratio: ${({ $featured }) => ($featured ? '16 / 9' : '1 / 1')};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  justify-content: center;
  padding: 1rem 1.1rem;
`;

const Eyebrow = styled(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled(Link)<{ $featured: boolean }>`
  font-family: ${({ theme }) => theme.font.display};
  font-size: ${({ $featured }) => ($featured ? '1.7rem' : '1rem')};
  font-weight: ${({ $featured }) => ($featured ? 700 : 600)};
  line-height: ${({ $featured }) => ($featured ? 1.22 : 1.35)};
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
    text-decoration-thickness: 2px;
  }
`;

const Excerpt = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.1rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.15rem;
`;

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const featured = variant === 'featured';
  const media = getFeaturedMedia(post);
  const imageUrl = getFeaturedImageUrl(media, featured ? 1024 : 320);
  const categories = getEmbeddedCategories(post);
  const postUrl = `/post/${post.slug}`;

  return (
    <Card $featured={featured}>
      {imageUrl && (
        <Thumb to={postUrl} $featured={featured}>
          <img src={imageUrl} alt={media?.alt_text || getPlainTitle(post)} loading="lazy" />
        </Thumb>
      )}
      <Body>
        {categories[0] && (
          <Eyebrow to={`/category/${categories[0].slug}`}>{categories[0].name}</Eyebrow>
        )}
        <Title to={postUrl} $featured={featured}>
          {getPlainTitle(post)}
        </Title>
        <Excerpt>{getPlainExcerpt(post)}</Excerpt>
        <Meta>{formatPostDate(post.date)}</Meta>
      </Body>
    </Card>
  );
}
