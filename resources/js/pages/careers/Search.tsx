import { useState, type FormEvent } from 'react';
import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import { Link } from '../../routing/Link';
import { Pagination } from '../../components/Pagination';
import { AdSlot, GTR_AD_SLOTS } from '../../components/AdSlot';
import { JobResultCard } from '../../components/careers/JobResultCard';
import type { CareersJob, CareersSearchParams } from '../../types/careers';

interface SearchProps {
  jobs: CareersJob[];
  total: number;
  page: number;
  limit: number;
  params: CareersSearchParams;
  jobOfTheDay: CareersJob | null;
}

/** Spec §26's exact shortcut list - search configurations, not permanent records. Most map to a curated CareersLandings slug; "Graduate Jobs" has no dedicated landing copy yet, so it goes straight to a filtered /jobs search instead. */
const FEATURED_SEARCHES: { label: string; href: string }[] = [
  { label: 'Radio Jobs', href: '/jobs/radio' },
  { label: 'Media Jobs', href: '/jobs/media' },
  { label: 'Jobs in Accra', href: '/jobs/accra' },
  { label: 'Jobs in Lagos', href: '/jobs/lagos' },
  { label: 'Remote Jobs', href: '/jobs/remote' },
  { label: 'Tech Jobs', href: '/jobs/technology' },
  { label: 'Internship Opportunities', href: '/jobs/internships' },
  { label: 'Graduate Jobs', href: '/jobs?employment_type=graduate' },
];

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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0 0 1.5rem;
`;

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1 1 220px;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.92rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.inkMuted};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const FeaturedRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;

const FeaturedChip = styled(Link)`
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: none;
  }
`;

const JobOfTheDayWrap = styled.div`
  margin-bottom: 2.5rem;
`;

const JobOfTheDayEyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.75rem;
`;

const ResultsCount = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;
`;

const JobList = styled.div`
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
`;

const EmptyStateActions = styled.div`
  margin-top: 1rem;
`;

/**
 * GTR Careers search - a job-discovery/traffic vertical, not a
 * recruitment platform (see Modules/Careers on the portal side for the
 * full "why"). Every job card links to a real, indexable /jobs/{provider}/
 * {reference} detail page - never a modal/client-only view - since that
 * detail page is this feature's actual SEO value. Card presentation
 * itself lives in JobResultCard, shared with every SEO landing page so
 * the whole vertical looks like one system.
 */
export function Search({ jobs, total, page, limit, params, jobOfTheDay }: SearchProps) {
  const [query, setQuery] = useState(params.q ?? '');
  const [location, setLocation] = useState(params.location ?? '');

  const hasActiveFilters = Boolean(
    params.q || params.location || params.country || params.category || params.employment_type || params.workplace_type
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.get('/jobs', { q: query || undefined, location: location || undefined }, { preserveState: true });
  }

  function handleClear() {
    setQuery('');
    setLocation('');
    router.get('/jobs');
  }

  function handlePageChange(newPage: number) {
    router.get('/jobs', { ...params, page: newPage }, { preserveScroll: true, preserveState: true });
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <>
      <Head>
        <title>{params.q ? `${params.q} Jobs | GTR Careers` : 'GTR Careers | GhanaTalksRadio'}</title>
      </Head>

      <Header>
        <Eyebrow>GTR Careers</Eyebrow>
        <Title>Find your next opportunity</Title>
        <Subtitle>
          Broadcasting, media and job opportunities across Ghana, Nigeria and Africa. Apply directly with the
          original employer.
        </Subtitle>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Job title, e.g. Radio Presenter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Job title or keyword"
          />
          <SearchInput
            type="text"
            placeholder="Location, e.g. Accra"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location"
          />
          <SearchButton type="submit">Search Jobs</SearchButton>
          {hasActiveFilters && (
            <ClearButton type="button" onClick={handleClear}>
              Clear search ✕
            </ClearButton>
          )}
        </SearchForm>

        <FeaturedRow>
          {FEATURED_SEARCHES.map((item) => (
            <FeaturedChip key={item.label} to={item.href}>
              🔥 {item.label}
            </FeaturedChip>
          ))}
        </FeaturedRow>
      </Header>

      {jobOfTheDay && (
        <JobOfTheDayWrap>
          <JobOfTheDayEyebrow>🔥 GTR Job of the Day</JobOfTheDayEyebrow>
          <JobResultCard job={jobOfTheDay} featured />
        </JobOfTheDayWrap>
      )}

      <ResultsCount>
        {total > 0
          ? `${total} job${total === 1 ? '' : 's'} found`
          : 'No jobs found yet for this search - try a different title or location.'}
      </ResultsCount>

      {jobs.length === 0 ? (
        <EmptyState>
          {params.location
            ? `Nothing matched "${params.location}" right now - our job providers' coverage varies by region and can be thin in some markets. Try a broader location, drop the location filter, or search by job title instead.`
            : 'Nothing matched that search right now. GTR Careers aggregates live listings from external job providers - try a broader search term, or check back soon.'}
          {hasActiveFilters && (
            <EmptyStateActions>
              <ClearButton type="button" onClick={handleClear}>
                Clear search ✕
              </ClearButton>
            </EmptyStateActions>
          )}
        </EmptyState>
      ) : (
        <JobList>
          {jobs.map((job) => (
            <JobResultCard key={`${job.source}-${job.source_job_id}`} job={job} />
          ))}
        </JobList>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.vertical} />
    </>
  );
}

export default Search;
