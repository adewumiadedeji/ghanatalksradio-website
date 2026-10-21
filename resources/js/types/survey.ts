export interface SurveyPlatformSummaryDto {
  code: string;
  label: string;
  is_live: boolean;
}

export interface AvailableSurveyDto {
  id: number;
  title: string;
  reward_amount_minor: number;
}

/**
 * A real, currently-available CPX survey, shown for preview only - no
 * `link`/`id` (the backend deliberately strips them; the real link is
 * signed for a preview identity, not the visitor, so it's never safe to
 * open directly on web). Matches the mobile app's own CPX card shape
 * (you_earn/stars/LOI/badges, no title - CPX's API has none).
 */
export interface CpxSurveyPreviewDto {
  loi_minutes: number;
  payout: number;
  you_earn: number;
  rating_avg: number | null;
  rating_count: number | null;
  needs_qualification: boolean;
  is_top: boolean;
  needs_webcam: boolean;
}

export interface SurveyPlatformDetailDto {
  is_live: boolean;
  label: string;
  available?: AvailableSurveyDto[];
  cpx_preview?: CpxSurveyPreviewDto[];
}

export interface SurveyDetailDto {
  id: number;
  title: string;
  description: string | null;
  reward_amount_minor: number;
}
