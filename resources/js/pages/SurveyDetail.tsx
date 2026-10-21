import { useState } from 'react';
import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { SurveyDetailDto } from '../types/survey';
import { AppDownloadModal } from '../components/AppDownloadModal';

interface SurveyDetailProps {
  survey: SurveyDetailDto;
}

const Wrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem 1.5rem;
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
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 0.6rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
`;

const RewardTag = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
  margin: 0 0 1.5rem;
`;

const OpenButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.8rem 2rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
`;

function formatReward(minor: number): string {
  return `$${(minor / 100).toFixed(2)}`;
}

/**
 * This URL (/surveys/native/{id}) is the real deep-link target a tap on
 * "Take survey" (SurveyPlatform.tsx) navigates to, as a genuine anchor so
 * the OS gets a chance to intercept it as a Universal/App Link and open
 * the GhanaTalksRadio app directly to this survey - see
 * SurveyDetailController's own docblock. Landing on this PAGE at all
 * means that didn't happen (app not installed, or iOS Safari's own
 * restriction on auto-opening a Universal Link tapped from within Safari
 * itself) - so the modal opens immediately rather than waiting for a
 * second tap, since the visitor already expressed intent to take this
 * survey once.
 */
export function SurveyDetail({ survey }: SurveyDetailProps) {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      <Head>
        <title>{`${survey.title} | GhanaTalksRadio Surveys`}</title>
        <meta name="description" content="Complete this survey and earn a reward in the GhanaTalksRadio app." />
      </Head>

      <Wrap>
        <Eyebrow>Earn Rewards</Eyebrow>
        <Title>{survey.title}</Title>
        {!!survey.description && <Description>{survey.description}</Description>}
        <RewardTag>Earn {formatReward(survey.reward_amount_minor)} for completing this survey</RewardTag>
        <OpenButton type="button" onClick={() => setModalOpen(true)}>
          Get the app to take this survey
        </OpenButton>
      </Wrap>

      <AppDownloadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Get the app to take this survey"
        message="Taking a survey and earning your reward happens in the GhanaTalksRadio app. Download it free, then open this survey again from inside the app."
      />
    </>
  );
}

export default SurveyDetail;
