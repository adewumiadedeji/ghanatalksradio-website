import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import type { PodcastEpisode } from '../types/podcast';
import { PodcastEpisodeList } from '../components/PodcastEpisodeList';
import { Pagination } from '../components/Pagination';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface PodcastProps {
  episodes: PodcastEpisode[];
  page: number;
  hasMore: boolean;
  isError: boolean;
}

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.4rem;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  margin-bottom: 0.4rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0;
`;

/**
 * Ported from the Vite SPA's src/pages/Podcast.tsx. Catchup and Podcast are
 * the same feature on this backend - past broadcast segments available on
 * demand. The underlying portal API paginates by page-was-full rather than
 * a true total count, same as before - just resolved server-side now
 * (PodcastController) instead of a react-query hook, with page changes as
 * real Inertia navigations.
 */
export function Podcast({ episodes, page, hasMore, isError }: PodcastProps) {
  const knownTotalPages = hasMore ? page + 1 : page;

  function handlePageChange(newPage: number) {
    router.get('/podcast', { page: newPage }, { preserveScroll: true });
  }

  return (
    <>
      <Head>
        <title>Podcast | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Catch up on past GhanaTalksRadio broadcasts — news bulletins and talk shows, on demand."
        />
      </Head>

      <Header>
        <Eyebrow>Catch Up</Eyebrow>
        <Title>Podcast</Title>
        <Subtitle>Missed a broadcast? Catch up on past shows and news bulletins here.</Subtitle>
      </Header>

      <PodcastEpisodeList episodes={episodes} isLoading={false} isError={isError} />

      <Pagination page={page} totalPages={knownTotalPages} onPageChange={handlePageChange} />

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.vertical} />
    </>
  );
}

export default Podcast;
