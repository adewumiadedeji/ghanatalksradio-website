import { Head } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { QuizSummaryDto } from '../api/quizzes';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface QuizzesProps {
  quizzes: QuizSummaryDto[];
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
 * Ported from the Vite SPA's src/pages/Quizzes.tsx. List resolved
 * server-side (QuizzesController) instead of a react-query hook.
 */
export function Quizzes({ quizzes, isError }: QuizzesProps) {
  return (
    <>
      <Head>
        <title>Quizzes | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Test what you know, earn points on the leaderboard, and see how you rank against other listeners."
        />
      </Head>

      <Header>
        <Eyebrow>Arena</Eyebrow>
        <Title>Quizzes</Title>
        <Subtitle>Answer a round of questions and see your score instantly.</Subtitle>
      </Header>

      {isError ? (
        <StateBox role="alert">Couldn't load quizzes. Try refreshing the page.</StateBox>
      ) : quizzes.length === 0 ? (
        <StateBox>No quizzes are open right now — check back soon.</StateBox>
      ) : (
        <List>
          {quizzes.map((q) => (
            <Card key={q.slug} to={`/quizzes/${q.slug}`}>
              <CardTitle>{q.name}</CardTitle>
              {!!q.description && <Description>{q.description}</Description>}
              <MetaRow>Ends {new Date(q.ends_at.replace(' ', 'T')).toLocaleDateString()}</MetaRow>
            </Card>
          ))}
        </List>
      )}

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Quizzes;
