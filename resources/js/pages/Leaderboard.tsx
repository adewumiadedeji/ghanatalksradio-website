import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import type { LeaderboardEntryDto } from '../types/leaderboard';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface LeaderboardProps {
  entries: LeaderboardEntryDto[];
  period: string;
  isError: boolean;
}

const Header = styled.div`
  margin-bottom: 1.5rem;
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
  margin: 0 0 1.25rem;
`;

const PeriodRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PeriodChip = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.goldDark : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.backgroundAlt : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.goldDark : theme.colors.inkMuted)};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
`;

const Table = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Rank = styled.span`
  width: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const Name = styled.span`
  flex: 1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

const Points = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const StateBox = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const PERIODS = [
  { value: 'all-time', label: 'All time' },
  { value: 'this-month', label: 'This month' },
];

/**
 * Ported from the Vite SPA's src/pages/Leaderboard.tsx. Points leaderboard,
 * ranked by total points earned from Predictions, Quizzes and other
 * Engagement activities. Read-only on web for now. The period filter is a
 * real Inertia navigation (?period=...) instead of client-side state, so
 * each period is server-rendered and independently linkable/indexable.
 */
export function Leaderboard({ entries, period, isError }: LeaderboardProps) {
  function handlePeriodChange(value: string) {
    router.get('/leaderboard', { period: value }, { preserveScroll: true });
  }

  return (
    <>
      <Head>
        <title>Leaderboard | GhanaTalksRadio</title>
        <meta
          name="description"
          content="See who's earning the most points from Predictions, Quizzes and other GhanaTalksRadio games."
        />
      </Head>

      <Header>
        <Eyebrow>Arena</Eyebrow>
        <Title>Leaderboard</Title>
        <Subtitle>Points earned from Predictions, Quizzes and other Arena games.</Subtitle>
      </Header>

      <PeriodRow>
        {PERIODS.map((p) => (
          <PeriodChip
            key={p.value}
            type="button"
            $active={period === p.value}
            onClick={() => handlePeriodChange(p.value)}
          >
            {p.label}
          </PeriodChip>
        ))}
      </PeriodRow>

      {isError ? (
        <StateBox role="alert">Couldn't load the leaderboard. Try refreshing the page.</StateBox>
      ) : entries.length === 0 ? (
        <StateBox>No points earned yet — be the first on the board.</StateBox>
      ) : (
        <Table>
          {entries.map((entry, index) => (
            <Row key={index}>
              <Rank>{index + 1}</Rank>
              <Name>{entry.name}</Name>
              <Points>{entry.points.toLocaleString()}</Points>
            </Row>
          ))}
        </Table>
      )}

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Leaderboard;
