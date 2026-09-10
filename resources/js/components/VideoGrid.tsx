import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  posts: WPPost[];
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
`;

const StateBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Shimmer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const ShimmerThumb = styled.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

const ShimmerLine = styled.div`
  height: 12px;
  margin: 0.9rem 1rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

function SkeletonGrid() {
  return (
    <Grid aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <Shimmer key={i}>
          <ShimmerThumb />
          <ShimmerLine style={{ width: '70%' }} />
        </Shimmer>
      ))}
    </Grid>
  );
}

export function VideoGrid({ posts, isLoading, isError, error }: VideoGridProps) {
  if (isLoading) return <SkeletonGrid />;

  if (isError) {
    return (
      <StateBox role="alert">
        Couldn't load videos right now
        {error instanceof Error ? `: ${error.message}` : '.'} Try refreshing the page.
      </StateBox>
    );
  }

  if (posts.length === 0) {
    return <StateBox>No videos here yet — check back soon.</StateBox>;
  }

  return (
    <Grid>
      {posts.map((post) => (
        <VideoCard key={post.id} post={post} />
      ))}
    </Grid>
  );
}
