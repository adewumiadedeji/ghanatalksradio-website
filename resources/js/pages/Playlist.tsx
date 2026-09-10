import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { VideoGrid } from '../components/VideoGrid';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface PlaylistProps {
  videos: WPPost[];
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
 * Ported from the Vite SPA's src/pages/Playlist.tsx. Video posts resolved
 * server-side (PlaylistController) instead of a react-query hook.
 */
export function Playlist({ videos }: PlaylistProps) {
  return (
    <>
      <Head>
        <title>Playlist | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Music videos, mixes and entertainment clips from GhanaTalksRadio."
        />
      </Head>

      <Header>
        <Eyebrow>Watch</Eyebrow>
        <Title>Playlist</Title>
        <Subtitle>Music videos, mixes and entertainment clips from GhanaTalksRadio.</Subtitle>
      </Header>

      <VideoGrid posts={videos} isLoading={false} isError={false} />

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Playlist;
