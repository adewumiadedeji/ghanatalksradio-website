import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import { Link } from '../../routing/Link';
import { Pagination } from '../../components/Pagination';
import { AdSlot, GTR_AD_SLOTS } from '../../components/AdSlot';
import { JobResultCard } from '../../components/careers/JobResultCard';
import type { CareersJob } from '../../types/careers';

interface LandingConfig {
  title: string;
  h1: string;
  intro: string;
  related: string[];
}

interface SeoLandingProps {
  slug: string;
  landing: LandingConfig;
  jobs: CareersJob[];
  total: number;
  page: number;
  limit: number;
}

const Header = styled.div`
  margin-bottom: 1.75rem;
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

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0 0 1rem;
  max-width: 60ch;
`;

const BrowseAllLink = styled(Link)`
  display: inline-block;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const ResultsCount = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;
`;

const JobGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 2rem;
`;

const RelatedSection = styled.div`
  margin-top: 1rem;
`;

const RelatedTitle = styled.h3`
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
`;

const RelatedLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const RelatedChip = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;

/**
 * A curated GTR Careers SEO landing page - genuinely dynamic (real,
 * current search results, not static copy), per spec §22. "Related
 * categories/locations" (spec §23) link to other Careers landing pages,
 * not fabricated links into editorial content this session has no
 * visibility into which real WordPress articles exist to link to
 * honestly - see CareersLandings' own docblock.
 */
export function SeoLanding({ landing, jobs, total, page, limit }: SeoLandingProps) {
  function handlePageChange(newPage: number) {
    router.get(window.location.pathname, { page: newPage }, { preserveScroll: true, preserveState: true });
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <>
      <Head>
        {/* Inertia's <Head> requires <title> to have exactly one string
            child - {expr} plus literal text renders as multiple children
            and crashes its renderer with "Cannot convert undefined or
            null to object" (it tries to treat each child as a full React
            element with its own .props). A single template literal
            avoids that entirely - see Search.tsx's <title> for the same
            pattern. */}
        <title>{`${landing.title} | GTR Careers`}</title>
        <meta name="description" content={landing.intro} />
      </Head>

      <Header>
        <Eyebrow>GTR Careers</Eyebrow>
        <Title>{landing.h1}</Title>
        <Intro>{landing.intro}</Intro>
        <BrowseAllLink to="/jobs">Search all GTR Careers listings →</BrowseAllLink>
      </Header>

      <ResultsCount>
        {total > 0 ? `${total} job${total === 1 ? '' : 's'} found` : 'No jobs found for this category right now.'}
      </ResultsCount>

      {jobs.length === 0 ? (
        <EmptyState>
          Nothing available here right now - our job providers' coverage varies by region and can be thin in some
          markets. Check back soon, or browse all GTR Careers listings above.
        </EmptyState>
      ) : (
        <>
          <JobGrid>
            {jobs.map((job) => (
              <JobResultCard key={`${job.source}-${job.source_job_id}`} job={job} />
            ))}
          </JobGrid>

          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}

      {landing.related.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Related opportunities</RelatedTitle>
          <RelatedLinks>
            {landing.related.map((relatedSlug) => (
              <RelatedChip key={relatedSlug} to={`/jobs/${relatedSlug}`}>
                {relatedSlug.replace(/-/g, ' ')}
              </RelatedChip>
            ))}
          </RelatedLinks>
        </RelatedSection>
      )}

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.vertical} />
    </>
  );
}

export default SeoLanding;
