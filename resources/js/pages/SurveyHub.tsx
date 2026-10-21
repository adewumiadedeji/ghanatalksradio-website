import { Head, Link } from '@inertiajs/react';
import styled from 'styled-components';
import type { SurveyPlatformSummaryDto } from '../types/survey';

/** Short, honest teaser copy per known platform code - a fallback covers any future platform the backend adds before this map is updated. */
const PLATFORM_BLURBS: Record<string, string> = {
  native: 'Quick surveys from GhanaTalksRadio itself.',
  cpx_research: 'Paid surveys from our global survey partner.',
};

function blurbFor(code: string): string {
  return PLATFORM_BLURBS[code] ?? 'Complete short surveys and earn a reward.';
}

interface SurveyHubProps {
  platforms: SurveyPlatformSummaryDto[];
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
  gap: 1rem;
`;

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const IconBadge = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.goldTint};
  color: ${({ theme }) => theme.colors.goldDark};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const PlatformName = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
`;

const PlatformBlurb = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const EndCap = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const StatusTag = styled.span<{ $live: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.25rem 0.55rem;
  white-space: nowrap;
  color: ${({ theme, $live }) => ($live ? theme.colors.goldDark : theme.colors.inkFaint)};
  background: ${({ theme, $live }) => ($live ? theme.colors.goldTint : theme.colors.backgroundAlt)};
`;

const Chevron = styled.svg`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.inkFaint};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
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

/**
 * Lists every survey platform, live or "coming soon" - this is where the
 * spec's original "preview every platform up front" nav behavior now
 * lives (product decision: the top nav's "Arena" dropdown gets one flat
 * "Surveys" link to here, not its own dropdown listing every platform
 * row - see CategoryNav.tsx's ARENA_ITEMS). Purely a read-only preview:
 * taking a survey and earning a reward only happens in the app (there is
 * no real login on this web client to credit a reward balance to - see
 * SurveyPlatform.tsx's own docblock), the same "Read-only: entering only
 * happens in the app" posture Raffle.tsx already has.
 */
export function SurveyHub({ platforms, isError }: SurveyHubProps) {
  return (
    <>
      <Head>
        <title>Surveys | GhanaTalksRadio</title>
        <meta name="description" content="Complete short surveys and earn a reward in the GhanaTalksRadio app." />
      </Head>

      <Header>
        <Eyebrow>Earn Rewards</Eyebrow>
        <Title>Surveys</Title>
        <Subtitle>Complete a short survey and earn a reward in the GhanaTalksRadio app.</Subtitle>
      </Header>

      {isError ? (
        <StateBox role="alert">Couldn't load survey platforms. Try refreshing the page.</StateBox>
      ) : platforms.length === 0 ? (
        <StateBox>No survey platforms available right now.</StateBox>
      ) : (
        <List>
          {platforms.map((platform) => (
            <Card key={platform.code} href={`/surveys/${platform.code}`}>
              <IconBadge aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path d="M9 7h6M9 11h6M9 15h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </IconBadge>
              <Info>
                <PlatformName>{platform.label}</PlatformName>
                <PlatformBlurb>{blurbFor(platform.code)}</PlatformBlurb>
              </Info>
              <EndCap>
                <StatusTag $live={platform.is_live}>{platform.is_live ? 'Live' : 'Coming soon'}</StatusTag>
                <Chevron width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Chevron>
              </EndCap>
            </Card>
          ))}
        </List>
      )}
    </>
  );
}

export default SurveyHub;
