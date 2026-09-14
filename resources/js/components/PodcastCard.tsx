import styled, { css } from 'styled-components';
import type { PodcastEpisode } from '../types/podcast';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';

interface PodcastEpisodeListProps {
  episodes: PodcastEpisode[];
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  direction?: string;
}

const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.4rem;
  scrollbar-width: thin;
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
  display: flex;
  gap: 1rem;
  padding: 1rem;

  @keyframes gtr-shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const ShimmerArt = styled.div`
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

const ShimmerLines = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

const ShimmerLine = styled.div`
  height: 11px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: gtr-shimmer 1.4s ease-in-out infinite;
`;

function SkeletonList() {
  return (
    <List aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Shimmer key={i}>
          <ShimmerArt />
          <ShimmerLines>
            <ShimmerLine style={{ width: '30%' }} />
            <ShimmerLine style={{ width: '85%' }} />
            <ShimmerLine style={{ width: '60%' }} />
          </ShimmerLines>
        </Shimmer>
      ))}
    </List>
  );
}

export function PodcastCard({ episodes, isLoading, isError, error }: PodcastEpisodeListProps) {
  if (isLoading) return <SkeletonList />;

  if (isError) {
    return (
      <StateBox role="alert">
        Couldn't load episodes right now
        {error instanceof Error ? `: ${error.message}` : '.'} Try refreshing the page.
      </StateBox>
    );
  }

  if (episodes.length === 0) {
    return <StateBox>No episodes here yet — check back soon.</StateBox>;
  }

  return (
    <List>
      {episodes.map((episode) => (
        <PodcastEpisodeCard key={episode.id} episode={episode} showExternal={false} />
      ))}
    </List>
  );
}
