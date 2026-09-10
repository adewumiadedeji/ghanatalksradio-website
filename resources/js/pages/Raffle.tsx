import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { RaffleDto } from '../types/raffle';
import { AppDownloadModal } from '../components/AppDownloadModal';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface RaffleProps {
  raffles: RaffleDto[];
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const PrizeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const SponsorTag = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  background: ${({ theme }) => theme.colors.goldTint};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.25rem 0.55rem;
  width: fit-content;
`;

const Description = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;

const PrizeName = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;

const PrizeValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const ActionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-end;
  }
`;

const TicketPrice = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const EnterButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

const StateBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

function secondsUntil(dateString: string): number {
  const ms = new Date(dateString.replace(' ', 'T')).getTime() - Date.now();
  return Math.max(0, Math.floor(ms / 1000));
}

function formatTimeLeft(totalSeconds: number): string {
  if (totalSeconds <= 0) return 'Ended';
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}

function RaffleCard({ raffle, onEnter }: { raffle: RaffleDto; onEnter: () => void }) {
  const [timeLeft, setTimeLeft] = useState(() => secondsUntil(raffle.entries_close_at));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(secondsUntil(raffle.entries_close_at)), 1000);
    return () => clearInterval(timer);
  }, [raffle.entries_close_at]);

  return (
    <Card>
      <PrizeBlock>
        {raffle.sponsor && <SponsorTag>Sponsored by {raffle.sponsor.name}</SponsorTag>}
        <PrizeName>{raffle.name}</PrizeName>
        {!!raffle.description && <Description>{raffle.description}</Description>}
        {raffle.number_of_winners !== null && (
          <PrizeValue>{raffle.number_of_winners} winner(s)</PrizeValue>
        )}
        <MetaRow>
          <span>{formatTimeLeft(timeLeft)}</span>
        </MetaRow>
      </PrizeBlock>

      <ActionBlock>
        {raffle.allow_free_entry ? (
          <TicketPrice>Free to enter</TicketPrice>
        ) : raffle.entry_price !== null && raffle.entry_currency ? (
          <TicketPrice>
            Entry from {raffle.entry_currency} {raffle.entry_price}
          </TicketPrice>
        ) : null}
        <EnterButton type="button" onClick={onEnter}>
          Enter Raffle
        </EnterButton>
      </ActionBlock>
    </Card>
  );
}

/**
 * Ported from the Vite SPA's src/pages/Raffle.tsx. Raffle list resolved
 * server-side (RaffleController) instead of a react-query hook. Actually
 * entering (and paying) only happens in the app, so "Enter Raffle" opens
 * the app-download prompt instead of any web checkout flow - unchanged
 * from the original.
 */
export function Raffle({ raffles, isError }: RaffleProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Raffle | GhanaTalksRadio</title>
        <meta
          name="description"
          content="See this week's GhanaTalksRadio raffle prize and enter from the app."
        />
      </Head>

      <Header>
        <Eyebrow>Win Big</Eyebrow>
        <Title>Raffle</Title>
        <Subtitle>
          Enter for a chance to win — raffle entries and payments happen in the GhanaTalksRadio app.
        </Subtitle>
      </Header>

      {isError ? (
        <StateBox role="alert">Couldn't load the current raffle. Try refreshing the page.</StateBox>
      ) : raffles.length === 0 ? (
        <StateBox>No raffle running right now — check back soon.</StateBox>
      ) : (
        <List>
          {raffles.map((raffle) => (
            <RaffleCard key={raffle.slug} raffle={raffle} onEnter={() => setModalOpen(true)} />
          ))}
        </List>
      )}

      <AppDownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Get the app to enter"
        message="Raffle entries and payments happen in the GhanaTalksRadio app. Download it free to enter and track your tickets."
      />

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Raffle;
