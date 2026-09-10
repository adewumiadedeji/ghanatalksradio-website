import styled from 'styled-components';
import { Link } from '../../routing/Link';
import type { CareersJob } from '../../types/careers';

interface JobResultCardProps {
  job: CareersJob;
  /** The "GTR Job of the Day" treatment - a larger card with a gold border and glow instead of the plain listing style, so exactly one job on the page reads as genuinely curated. */
  featured?: boolean;
}

// ─── Layout ──────────────────────────────────────────────────────────────────
//
// A real elevated card, not a flat list row or a plain avatar+pill tile -
// soft shadow at rest, a colored gradient badge per company (hashed from
// the company name, cycling through a small set of on-brand gold/ink
// combinations so it stays varied without introducing off-brand hues), and
// a visible "View Role" pill so the card reads as an actionable listing
// rather than plain text. Modeled on the premium-SaaS-careers-page look
// (Ashby/Greenhouse/Linear) rather than a dense directory table.

const GRADIENTS = (theme: any) => [
  `linear-gradient(135deg, ${theme.colors.gold}, ${theme.colors.goldDark})`,
  `linear-gradient(135deg, ${theme.colors.ink}, ${theme.colors.inkMuted})`,
  `linear-gradient(135deg, ${theme.colors.goldDark}, ${theme.colors.ink})`,
  `linear-gradient(135deg, ${theme.colors.gold}, ${theme.colors.ink})`,
];

function variantFor(job: CareersJob): number {
  const source = job.company ?? job.title;
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
  }
  return hash % 4;
}

function initialFor(job: CareersJob): string {
  const source = job.company ?? job.title;
  return source.trim().charAt(0).toUpperCase() || '?';
}

/** "full_time" / "on_site" from a provider's raw payload -> "Full Time" / "On Site". */
function formatLabel(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatPostedAt(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  if (days < 30) return `Posted ${days}d ago`;
  return `Posted ${date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
}

const Card = styled(Link)<{ $featured?: boolean }>`
  position: relative;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  ${({ $featured, theme }) =>
    $featured
      ? `
        padding: 2rem 2.25rem;
        border: 2px solid ${theme.colors.gold};
        box-shadow: 0 14px 34px rgba(242, 169, 0, 0.16), 0 4px 14px rgba(21, 23, 28, 0.06);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(242, 169, 0, 0.22), 0 6px 16px rgba(21, 23, 28, 0.08);
        }
      `
      : `
        padding: 1.6rem 1.85rem;
        border: 1px solid ${theme.colors.border};
        box-shadow: ${theme.shadow.sm};

        &:hover {
          transform: translateY(-3px);
          border-color: ${theme.colors.gold};
          box-shadow: ${theme.shadow.md};
        }
      `}

  &:hover {
    text-decoration: none;
  }
`;

const Badge = styled.div<{ $variant: number }>`
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 1.35rem;
  color: #fff;
  background: ${({ theme, $variant }) => GRADIENTS(theme)[$variant % 4]};
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const TopLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
`;

const SourceTag = styled.span`
  flex-shrink: 0;
  margin-top: 0.15rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.25rem 0.6rem;
  white-space: nowrap;
`;

const CompanyLine = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.3rem 0 0.9rem;
`;

const CompanyName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 0.75rem;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1 1 180px;
`;

const Tag = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  background: ${({ theme }) => theme.colors.goldTint};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.3rem 0.7rem;
`;

const PostedText = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const ViewButton = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 1.15rem;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;

  ${Card}:hover & {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

export function JobResultCard({ job, featured }: JobResultCardProps) {
  const postedLabel = formatPostedAt(job.posted_at);

  return (
    <Card to={`/jobs/${job.source}/${job.source_job_id}`} $featured={featured}>
      <Badge $variant={variantFor(job)} aria-hidden="true">
        {initialFor(job)}
      </Badge>

      <Body>
        <TopLine>
          <Title>{job.title}</Title>
          <SourceTag>{job.source}</SourceTag>
        </TopLine>

        <CompanyLine>
          <CompanyName>{job.company ?? 'Company not disclosed'}</CompanyName>
          {job.location ? ` — ${job.location}` : ''}
        </CompanyLine>

        <BottomRow>
          <Tags>
            {job.employment_type && <Tag>{formatLabel(job.employment_type)}</Tag>}
            {job.workplace_type && <Tag>{formatLabel(job.workplace_type)}</Tag>}
            {postedLabel && <PostedText>{postedLabel}</PostedText>}
          </Tags>
          <ViewButton aria-hidden="true">View Role &rarr;</ViewButton>
        </BottomRow>
      </Body>
    </Card>
  );
}

export default JobResultCard;
