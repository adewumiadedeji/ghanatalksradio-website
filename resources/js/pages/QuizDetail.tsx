import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import { submitQuiz, type QuizDetailDto, type QuizResultDto } from '../api/quizzes';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface QuizDetailProps {
  quiz: QuizDetailDto | null;
}

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Header = styled.div`
  margin-bottom: 1.75rem;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 3.6vw, 2rem);
  margin-bottom: 0.4rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.92rem;
  margin: 0;
`;

const ResultBanner = styled.div`
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.goldDark};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const QuestionText = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
`;

const ChoiceRow = styled.label<{ $selected: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.goldDark : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.backgroundAlt : 'transparent')};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ErrorText = styled.span`
  font-size: 0.82rem;
  color: #b3261e;
`;

const StateBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

/**
 * Ported from the Vite SPA's src/pages/QuizDetail.tsx. Questions/choices
 * are fully server-rendered (QuizDetailController) - no guest-specific
 * state exists before submission, unlike PredictionDetail. Submitting
 * stays a direct client call to the portal API (api/quizzes.ts), same as
 * the original (no react-query in this project, so a plain useState-based
 * submit instead of a mutation hook).
 */
export function QuizDetail({ quiz }: QuizDetailProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResultDto | null>(null);

  if (!quiz) {
    return (
      <>
        <Head>
          <title>Quiz not found | GhanaTalksRadio</title>
        </Head>
        <BackLink to="/quizzes">← Back to Quizzes</BackLink>
        <StateBox role="alert">This quiz doesn't exist or may have ended.</StateBox>
      </>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quiz || Object.keys(answers).length < quiz.questions.length) {
      setFormError('Pick an answer for every question before submitting.');
      return;
    }
    setFormError(null);
    setSubmitting(true);
    submitQuiz(quiz.slug, answers)
      .then(setResult)
      .catch((err) => setFormError(err instanceof Error ? err.message : 'Please try again.'))
      .finally(() => setSubmitting(false));
  }

  return (
    <>
      <Head>
        <title>{`${quiz.name} | GhanaTalksRadio`}</title>
        {quiz.description && <meta name="description" content={quiz.description} />}
      </Head>

      <BackLink to="/quizzes">← Back to Quizzes</BackLink>

      <Header>
        <Title>{quiz.name}</Title>
        {!!quiz.description && <Subtitle>{quiz.description}</Subtitle>}
        {result && (
          <ResultBanner>
            You scored {result.score} / {result.total_possible}
          </ResultBanner>
        )}
      </Header>

      <form onSubmit={handleSubmit}>
        <List>
          {quiz.questions.map((question) => (
            <Card key={question.id}>
              <QuestionText>{question.question_text}</QuestionText>
              {question.choices.map((choice) => {
                const selected = answers[question.id] === choice.id;
                return (
                  <ChoiceRow key={choice.id} $selected={selected} $disabled={!!result}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selected}
                      disabled={!!result}
                      onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: choice.id }))}
                    />
                    {choice.label}
                  </ChoiceRow>
                );
              })}
            </Card>
          ))}
        </List>

        {formError && <ErrorText>{formError}</ErrorText>}

        {!result && (
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Quiz'}
          </SubmitButton>
        )}
      </form>

      <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inArticle} />
    </>
  );
}

export default QuizDetail;
