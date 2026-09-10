import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { PostCard } from './PostCard';
import { AdSlot, GTR_AD_SLOTS } from './AdSlot';

interface PostListProps {
  posts: WPPost[];
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  /** Insert an in-feed ad after every N posts. Set to 0 to disable. */
  adFrequency?: number;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StateBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 1rem;
  padding: 1rem 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Shimmer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.sm};

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

const ShimmerImg = styled(Shimmer)`
  aspect-ratio: 1 / 1;
  margin: -1rem 0 -1rem -1.1rem;
`;

const ShimmerLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

function SkeletonList() {
  return (
    <List aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i}>
          <ShimmerImg />
          <ShimmerLines>
            <Shimmer style={{ width: '40%', height: 10 }} />
            <Shimmer style={{ width: '90%', height: 16 }} />
            <Shimmer style={{ width: '60%', height: 16 }} />
            <Shimmer style={{ width: '30%', height: 10 }} />
          </ShimmerLines>
        </SkeletonCard>
      ))}
    </List>
  );
}

export function PostList({
  posts,
  isLoading,
  isError,
  error,
  adFrequency = 4,
}: PostListProps) {
  if (isLoading) {
    return <SkeletonList />;
  }

  if (isError) {
    return (
      <StateBox role="alert">
        Couldn't load stories right now
        {error instanceof Error ? `: ${error.message}` : '.'} Try refreshing
        the page.
      </StateBox>
    );
  }

  if (posts.length === 0) {
    return <StateBox>No stories here yet.</StateBox>;
  }

  return (
    <List>
      {posts.map((post, index) => (
        <FragmentWithAd key={post.id} index={index} adFrequency={adFrequency}>
          <PostCard post={post} />
        </FragmentWithAd>
      ))}
    </List>
  );
}

function FragmentWithAd({
  index,
  adFrequency,
  children,
}: {
  index: number;
  adFrequency: number;
  children: React.ReactNode;
}) {
  const showAdAfter =
    adFrequency > 0 && index > 0 && (index + 1) % adFrequency === 0;

  return (
    <>
      {children}
      {showAdAfter && <AdSlot format="in-feed" slotId={GTR_AD_SLOTS.inFeed} />}
    </>
  );
}
