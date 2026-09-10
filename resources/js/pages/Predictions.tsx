import { Head } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { PredictionSummaryDto } from '../api/predictions';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface PredictionsProps {
  predictions: PredictionSummaryDto[];
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
  gap: 1.25rem;
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    text-decoration: none;
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;

const MetaRow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
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
 * Ported from the Vite SPA's src/pages/Predictions.tsx. List resolved
 * server-side (PredictionsController) instead of a react-query hook.
 * Unlike Raffle, predicting a score and commenting both happen directly on
 * this site — see PredictionDetail.tsx.
 */
export function Predictions({ predictions, isError }: PredictionsProps) {
  return (
    <>
      <Head>
        <title>Predictions | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Predict the score, earn points on the leaderboard, and talk trash in the comments."
        />
      </Head>

      <Header>
        <Eyebrow>Score Predictor</Eyebrow>
        <Title>Predictions</Title>
        <Subtitle>Predict match scores and see what other listeners think in the comments.</Subtitle>
      </Header>

      {isError ? (
        <StateBox role="alert">Couldn't load predictions. Try refreshing the page.</StateBox>
      ) : predictions.length === 0 ? (
        <StateBox>No prediction games are open right now — check back soon.</StateBox>
      ) : (
        <List>
          {predictions.map((p) => (
            <Card key={p.slug} to={`/predictions/${p.slug}`}>
              <CardTitle>{p.name}</CardTitle>
              {!!p.description && <Description>{p.description}</Description>}
              <MetaRow>Ends {new Date(p.ends_at.replace(' ', 'T')).toLocaleDateString()}</MetaRow>
            </Card>
          ))}
        </List>
      )}

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Predictions;
