import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { getPlainTitle, formatPostDate } from '../utils/wpContent';

interface CompactPostListProps {
  posts: WPPost[];
  isLoading?: boolean;
}

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.7rem 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Rank = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.borderStrong};
  flex-shrink: 0;
  width: 1.4rem;
`;

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const ItemTitle = styled(Link)`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;

const ItemMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const ShimmerLine = styled.div`
  height: 13px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

/**
 * Dense, numbered, text-first list — no images. Suited to "Trending" /
 * "Most Read" style rails where scanning many headlines quickly matters
 * more than visual weight per item. Deliberately the opposite shape of
 * PostCard, used to give the homepage real visual rhythm instead of every
 * section looking like the same card repeated.
 */
export function CompactPostList({ posts, isLoading }: CompactPostListProps) {
  if (isLoading) {
    return (
      <List aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Item key={i}>
            <Rank>{i + 1}</Rank>
            <ItemBody>
              <ShimmerLine style={{ width: '90%' }} />
            </ItemBody>
          </Item>
        ))}
      </List>
    );
  }

  if (posts.length === 0) return null;

  return (
    <List>
      {posts.map((post, index) => (
        <Item key={post.id}>
          <Rank>{index + 1}</Rank>
          <ItemBody>
            <ItemTitle to={`/post/${post.slug}`}>{getPlainTitle(post)}</ItemTitle>
            <ItemMeta>{formatPostDate(post.date)}</ItemMeta>
          </ItemBody>
        </Item>
      ))}
    </List>
  );
}
