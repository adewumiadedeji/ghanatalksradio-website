import { Head } from '@inertiajs/react';
import styled from 'styled-components';

import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';



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

const StateBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;


/**
 * Ported from the Vite SPA's src/pages/Playlist.tsx. Video posts resolved
 * server-side (PlaylistController) instead of a react-query hook.
 */
export function Authors() {
  return (
    <>
        <Head>
            <title>Our AUthors | GhanaTalksRadio</title>
            <meta
            name="description"
            content="Music videos, mixes and entertainment clips from GhanaTalksRadio."
            />
        </Head>

        <Header>
            <Eyebrow>Editorial</Eyebrow>
            <Title>Authors</Title>
            <Subtitle>Meet the talented writers, journalists, and broadcasters behind Ghana Talks Radio. Explore our team profiles, expert insights, and latest stories.</Subtitle>
        </Header>

        <StateBox>No author here yet — check back soon.</StateBox>
        <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Authors;
