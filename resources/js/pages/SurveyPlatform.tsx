import { useState } from 'react';
import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { CpxSurveyPreviewDto, SurveyPlatformDetailDto } from '../types/survey';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { AppDownloadModal } from '../components/AppDownloadModal';

interface SurveyPlatformProps {
  platform: SurveyPlatformDetailDto;
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
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SurveyTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
`;

const RewardTag = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const TakeButton = styled.a`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

const PreviewCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PreviewTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const EarnBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const EarnLabel = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const EarnAmount = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.ink};
`;

const Stars = styled.div`
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.gold};
`;

const RatingCount = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  text-align: right;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Badge = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  background: ${({ theme }) => theme.colors.goldTint};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.2rem 0.5rem;
`;

const PreviewBottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const LoiText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const TakeInAppButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

function Stargauge({ ratingAvg }: { ratingAvg: number | null }) {
  const rounded = ratingAvg != null ? Math.round(ratingAvg) : 0;
  return <Stars aria-hidden="true">{'★'.repeat(rounded) + '☆'.repeat(5 - rounded)}</Stars>;
}

function CpxPreviewCard({ survey, onTake }: { survey: CpxSurveyPreviewDto; onTake: () => void }) {
  return (
    <PreviewCard>
      <PreviewTopRow>
        <EarnBlock>
          <EarnLabel>You earn</EarnLabel>
          <EarnAmount>${survey.you_earn.toFixed(2)}</EarnAmount>
        </EarnBlock>
        <div>
          <Stargauge ratingAvg={survey.rating_avg} />
          {survey.rating_count != null && (
            <RatingCount>
              {survey.rating_count} rating{survey.rating_count === 1 ? '' : 's'}
            </RatingCount>
          )}
        </div>
      </PreviewTopRow>

      {(survey.is_top || survey.needs_webcam) && (
        <BadgeRow>
          {survey.is_top && <Badge>Top survey</Badge>}
          {survey.needs_webcam && <Badge>Webcam needed</Badge>}
        </BadgeRow>
      )}

      <PreviewBottomRow>
        <LoiText>
          ~{survey.loi_minutes} minute{survey.loi_minutes === 1 ? '' : 's'}
        </LoiText>
        <TakeInAppButton type="button" onClick={onTake}>
          Take in app
        </TakeInAppButton>
      </PreviewBottomRow>
    </PreviewCard>
  );
}

const StateBoxText = styled.p`
  margin: 0 0 1.25rem;
`;

const OpenAppButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

function formatReward(minor: number): string {
  return `$${(minor / 100).toFixed(2)}`;
}

/**
 * A single survey platform's landing page. Read-only on web by product
 * decision: there is no real login/session on this client (only a
 * localStorage guest token, used elsewhere for Predictions/Polls/Quizzes
 * - see guestToken.ts), and a survey reward is a real, immediately-
 * credited balance on a genuine user_id that a guest token can't hold.
 * Two distinct "here's what's available" shapes, mutually exclusive
 * (PublicSurveyController::show() only ever populates one):
 * - `available` (native): "Take survey" is a genuine anchor to
 *   /surveys/native/{id} - NOT an onClick-only modal trigger like
 *   Raffle.tsx's "Enter Raffle" - so a real top-level navigation happens
 *   and the OS gets a chance to intercept it as a Universal/App Link and
 *   open the app directly to this exact survey (see
 *   SurveyDetailController's own docblock for the fallback when it
 *   doesn't).
 * - `cpx_preview` (CPX Research, or any future third-party network): a
 *   real, currently-available list fetched server-side (see
 *   PublicSurveyController::cpxPublicPreview()'s own docblock for why
 *   it's safe to show real reward/rating/time stats here despite no real
 *   visitor identity existing yet) - but with no real survey link at all
 *   (deliberately stripped server-side), so "Take in app" always opens
 *   the app-download modal, never a direct navigation.
 * Either way, the real take-survey/earn-reward flow lives in the mobile
 * app, which already has real Sanctum-authenticated users.
 */
export function SurveyPlatform({ platform }: SurveyPlatformProps) {
  const available = platform.available ?? [];
  const cpxPreview = platform.cpx_preview ?? [];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{`${platform.label} | GhanaTalksRadio`}</title>
        <meta name="description" content="Complete short surveys and earn a reward in the GhanaTalksRadio app." />
      </Head>

      <Header>
        <Eyebrow>Earn Rewards</Eyebrow>
        <Title>{platform.label}</Title>
        <Subtitle>
          {platform.is_live
            ? 'Taking a survey and earning your reward happens in the GhanaTalksRadio app.'
            : `${platform.label} is coming soon to GhanaTalksRadio.`}
        </Subtitle>
      </Header>

      {!platform.is_live ? (
        <StateBox>
          <StateBoxText>
            <strong>{platform.label}</strong> isn't live yet - check back soon.
          </StateBoxText>
        </StateBox>
      ) : available.length > 0 ? (
        <List>
          {available.map((survey) => (
            <Card key={survey.id}>
              <SurveyTitle>{survey.title}</SurveyTitle>
              <RewardTag>Earn {formatReward(survey.reward_amount_minor)}</RewardTag>
              <TakeButton href={`/surveys/native/${survey.id}`}>Take survey</TakeButton>
            </Card>
          ))}
        </List>
      ) : cpxPreview.length > 0 ? (
        <Grid>
          {cpxPreview.map((survey, i) => (
            <CpxPreviewCard key={i} survey={survey} onTake={() => setModalOpen(true)} />
          ))}
        </Grid>
      ) : (
        <StateBox>
          <StateBoxText>
            New {platform.label} surveys are added regularly. Open the GhanaTalksRadio app to see what's available
            and start earning.
          </StateBoxText>
          <OpenAppButton type="button" onClick={() => setModalOpen(true)}>
            Get the app
          </OpenAppButton>
        </StateBox>
      )}

      <AppDownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Get the app for ${platform.label}`}
        message={`${platform.label} surveys are taken in the GhanaTalksRadio app. Download it free to see what's available and start earning.`}
      />

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default SurveyPlatform;
