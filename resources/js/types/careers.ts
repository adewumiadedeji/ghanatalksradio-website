/**
 * Types for GTR Careers (ghanatalksradio-portal's Modules/Careers) - a
 * job-discovery/traffic vertical, not a recruitment platform. GTRJob is
 * never persisted anywhere - it exists only for the lifetime of one
 * search/detail API response. `apply_url` here is always a GTR-owned
 * redirect link (never the raw external URL) - see
 * CareersRedirectService on the portal side.
 */

export interface CareersJobSalary {
  min: number | null;
  max: number | null;
  currency: string | null;
}

export interface CareersJob {
  title: string;
  company: string | null;
  location: string | null;
  country: string | null;
  description: string | null;
  employment_type: string | null;
  workplace_type: string | null;
  salary: CareersJobSalary | null;
  posted_at: string | null;
  source: string;
  source_job_id: string | null;
  source_url: string | null;
  apply_url: string;
}

export interface CareersSearchParams {
  q?: string;
  location?: string;
  country?: string;
  category?: string;
  employment_type?: string;
  workplace_type?: string;
  page?: number;
  sort?: 'relevance' | 'newest';
}
