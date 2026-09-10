import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import { Link } from '../../routing/Link';
import { AdSlot, GTR_AD_SLOTS } from '../../components/AdSlot';
import type { CareersJob } from '../../types/careers';

interface JobDetailProps {
  job: CareersJob | null;
}

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 0 0 0.3rem;
`;

const Company = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1rem;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const MetaPill = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const Description = styled.div`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.ink};
  white-space: pre-line;
  margin-bottom: 2rem;
`;

const ApplyCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1.25rem;
  text-align: center;
`;

const LeavingNotice = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1rem;
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

const SourceNote = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.75rem;
`;

const SourceLink = styled.a`
  color: ${({ theme }) => theme.colors.inkFaint};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const NotFound = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/**
 * A single job's detail page - the one Careers page real crawlable SEO
 * value depends on most (see Modules/Careers's own docs). GTR never
 * becomes the employer here: the description/requirements shown are
 * exactly what the provider returned, and "Apply Now" always leaves this
 * site - see this component's LeavingNotice copy, matching the spec's own
 * "You are leaving GhanaTalksRadio" requirement.
 */
export function JobDetail({ job }: JobDetailProps) {
  if (!job) {
    return (
      <>
        <Head>
          <title>Job not found | GTR Careers</title>
        </Head>
        <NotFound>
          <p>This job is no longer available or the link has expired.</p>
          <BackLink to="/jobs">Browse other opportunities</BackLink>
        </NotFound>
      </>
    );
  }

  return (
    <>
      <Head>
        {/* One string child only - see SeoLanding.tsx's <title> comment for why. */}
        <title>{`${job.title} at ${job.company ?? 'GTR Careers'} | GTR Careers`}</title>
      </Head>

      <BackLink to="/jobs">← Back to job search</BackLink>

      <Title>{job.title}</Title>
      <Company>
        {job.company ?? 'Company not disclosed'}
        {job.location ? ` — ${job.location}` : ''}
      </Company>

      <MetaRow>
        {job.employment_type && <MetaPill>{job.employment_type}</MetaPill>}
        {job.workplace_type && <MetaPill>{job.workplace_type}</MetaPill>}
        {job.posted_at && <MetaPill>Posted {job.posted_at}</MetaPill>}
      </MetaRow>

      {job.description && <Description>{job.description}</Description>}

      <ApplyCard>
        <LeavingNotice>
          You are leaving GhanaTalksRadio to complete your application on the original job provider's website.
        </LeavingNotice>
        <ApplyButton href={job.apply_url} target="_blank" rel="noopener noreferrer">
          Apply Now ↗
        </ApplyButton>
        <SourceNote>
          Source:{' '}
          {job.source_url ? (
            <SourceLink href={job.source_url} target="_blank" rel="noopener noreferrer">
              {job.source}
            </SourceLink>
          ) : (
            job.source
          )}
        </SourceNote>
      </ApplyCard>

      <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inFeed} />
    </>
  );
}

export default JobDetail;
