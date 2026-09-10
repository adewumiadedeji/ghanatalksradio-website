import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import {
  fetchPredictionDetail,
  predictFixture,
  fetchComments,
  postComment,
  type FixtureDto,
  type PredictionDetailDto,
  type CommentDto,
} from '../api/predictions';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';

interface PredictionDetailProps {
  prediction: PredictionDetailDto | null;
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
  gap: 0.6rem;
`;

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const FixtureTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
`;

const ClosedBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const Meta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const FinalScore = styled.span`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const MyPrediction = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const PredictRow = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.3rem;
`;

const ScoreInput = styled.input`
  width: 3rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.ink};
`;

const ScoreDash = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const SubmitButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.55rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ErrorText = styled.span`
  font-size: 0.78rem;
  color: #b3261e;
`;

const CommentsToggle = styled.button`
  align-self: flex-start;
  border: none;
  background: none;
  padding: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
  cursor: pointer;
  margin-top: 0.4rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentsBox = styled.div`
  margin-top: 0.4rem;
  padding-top: 0.85rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const CommentAuthor = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

const CommentBody = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

const CommentInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextField = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};
`;

const EmptyNote = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

const StateBox = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

function formatDate(dateString: string): string {
  return new Date(dateString.replace(' ', 'T')).toLocaleString();
}

function FixtureCard({
  slug,
  fixture,
  myPrediction,
  guestName,
  onGuestNameChange,
  onPredicted,
}: {
  slug: string;
  fixture: FixtureDto;
  myPrediction: { predicted_home_score: number; predicted_away_score: number; points_awarded: number | null } | null;
  guestName: string;
  onGuestNameChange: (name: string) => void;
  onPredicted: (fixtureId: number, home: number, away: number) => void;
}) {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [predicting, setPredicting] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentDto[] | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [posting, setPosting] = useState(false);

  function toggleComments() {
    const next = !showComments;
    setShowComments(next);
    if (next && comments === null) {
      setCommentsLoading(true);
      fetchComments(slug, fixture.id)
        .then((page) => setComments(page.comments))
        .catch(() => setComments([]))
        .finally(() => setCommentsLoading(false));
    }
  }

  function handlePredict(e: React.FormEvent) {
    e.preventDefault();
    const h = parseInt(home, 10);
    const a = parseInt(away, 10);
    if (Number.isNaN(h) || Number.isNaN(a) || h < 0 || a < 0) {
      setFormError('Enter a score for both teams (0 or higher).');
      return;
    }
    setFormError(null);
    setPredicting(true);
    predictFixture(slug, fixture.id, h, a)
      .then(() => onPredicted(fixture.id, h, a))
      .catch((err) => setFormError(err instanceof Error ? err.message : 'Please try again.'))
      .finally(() => setPredicting(false));
  }

  function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || !guestName.trim()) return;
    setPosting(true);
    postComment(slug, fixture.id, body, guestName.trim())
      .then((comment) => {
        setComments((prev) => [...(prev ?? []), comment]);
        setDraft('');
      })
      .catch(() => {})
      .finally(() => setPosting(false));
  }

  return (
    <Card>
      <RowBetween>
        <FixtureTitle>
          {fixture.home_team} vs {fixture.away_team}
        </FixtureTitle>
        {!fixture.predictions_open && <ClosedBadge>Closed</ClosedBadge>}
      </RowBetween>
      <Meta>{formatDate(fixture.kickoff_at)}</Meta>

      {fixture.status === 'completed' && (
        <FinalScore>
          Final: {fixture.actual_home_score} – {fixture.actual_away_score}
        </FinalScore>
      )}

      {myPrediction ? (
        <MyPrediction>
          Your prediction: {myPrediction.predicted_home_score} – {myPrediction.predicted_away_score}
          {myPrediction.points_awarded !== null ? ` (+${myPrediction.points_awarded} pts)` : ''}
        </MyPrediction>
      ) : fixture.predictions_open ? (
        <>
          <PredictRow onSubmit={handlePredict}>
            <ScoreInput
              inputMode="numeric"
              maxLength={2}
              placeholder="0"
              value={home}
              onChange={(e) => setHome(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <ScoreDash>–</ScoreDash>
            <ScoreInput
              inputMode="numeric"
              maxLength={2}
              placeholder="0"
              value={away}
              onChange={(e) => setAway(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <SubmitButton type="submit" disabled={predicting}>
              {predicting ? 'Submitting…' : 'Predict'}
            </SubmitButton>
          </PredictRow>
          {formError && <ErrorText>{formError}</ErrorText>}
        </>
      ) : (
        <Meta>Predictions closed for this fixture.</Meta>
      )}

      <CommentsToggle type="button" onClick={toggleComments}>
        {showComments ? 'Hide comments' : 'Comments'}
      </CommentsToggle>

      {showComments && (
        <CommentsBox>
          {commentsLoading ? (
            <EmptyNote>Loading comments…</EmptyNote>
          ) : !comments || comments.length === 0 ? (
            <EmptyNote>No comments yet — be the first.</EmptyNote>
          ) : (
            comments.map((c) => (
              <CommentRow key={c.id}>
                <RowBetween>
                  <CommentAuthor>{c.author}</CommentAuthor>
                  <Meta>{new Date(c.created_at.replace(' ', 'T')).toLocaleDateString()}</Meta>
                </RowBetween>
                <CommentBody>{c.body}</CommentBody>
              </CommentRow>
            ))
          )}

          <CommentForm onSubmit={handlePostComment}>
            <TextField
              placeholder="Your name"
              value={guestName}
              onChange={(e) => onGuestNameChange(e.target.value)}
            />
            <CommentInputRow>
              <TextField
                style={{ flex: 1 }}
                placeholder="Add a comment"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <SubmitButton type="submit" disabled={posting}>
                {posting ? 'Posting…' : 'Post'}
              </SubmitButton>
            </CommentInputRow>
          </CommentForm>
        </CommentsBox>
      )}
    </Card>
  );
}

/**
 * Ported from the Vite SPA's src/pages/PredictionDetail.tsx. Fixtures are
 * server-rendered (PredictionDetailController) for SEO - real teams,
 * kickoff times, descriptions in the first response. guest_token is a
 * browser-localStorage identity the server can't know, so `my_predictions`
 * starts from the SSR pass (generic/empty) and this re-fetches client-side
 * on mount with the real guest token to layer in personalization -
 * predicting a score and commenting both stay direct client calls to the
 * portal API (api/predictions.ts), same as the original.
 */
export function PredictionDetail({ prediction: initialPrediction }: PredictionDetailProps) {
  const [prediction, setPrediction] = useState(initialPrediction);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    if (!initialPrediction) return;
    fetchPredictionDetail(initialPrediction.slug)
      .then(setPrediction)
      .catch(() => {
        // Personalization is a nice-to-have - the SSR'd fixture data already rendered fine.
      });
    // Only ever re-personalize for the slug this page loaded with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrediction?.slug]);

  if (!prediction) {
    return (
      <>
        <Head>
          <title>Predictions not found | GhanaTalksRadio</title>
        </Head>
        <BackLink to="/predictions">← Back to Predictions</BackLink>
        <StateBox role="alert">This prediction game doesn't exist or may have ended.</StateBox>
      </>
    );
  }

  const myPredictionFor = (fixtureId: number) =>
    prediction.my_predictions.find((p) => p.fixture_id === fixtureId) ?? null;

  function handlePredicted(fixtureId: number, home: number, away: number) {
    setPrediction((prev) =>
      prev
        ? {
            ...prev,
            my_predictions: [
              ...prev.my_predictions,
              { fixture_id: fixtureId, predicted_home_score: home, predicted_away_score: away, points_awarded: null },
            ],
          }
        : prev
    );
  }

  return (
    <>
      <Head>
        <title>{`${prediction.name} | GhanaTalksRadio`}</title>
        {prediction.description && <meta name="description" content={prediction.description} />}
      </Head>

      <BackLink to="/predictions">← Back to Predictions</BackLink>

      <Header>
        <Title>{prediction.name}</Title>
        {!!prediction.description && <Subtitle>{prediction.description}</Subtitle>}
      </Header>

      <List>
        {prediction.fixtures.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            slug={prediction.slug}
            fixture={fixture}
            myPrediction={myPredictionFor(fixture.id)}
            guestName={guestName}
            onGuestNameChange={setGuestName}
            onPredicted={handlePredicted}
          />
        ))}
      </List>

      <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inArticle} />
    </>
  );
}

export default PredictionDetail;
