/**
 * Prediction game API — ghanatalksradio-portal's Modules/Engagement (see
 * PublicPredictionController), the same Laravel backend the mobile app
 * uses. Unlike Raffle, this is a real read/write client — predicting a
 * score and posting a comment both happen directly on the web, there's
 * no app-download redirect (see predictionApi.ts in the mobile repo for
 * the matching client, same DTO shapes).
 */
import { getGuestToken } from '../utils/guestToken';

const PORTAL_API_URL =
  import.meta.env.VITE_PORTAL_API_URL?.replace(/\/$/, '') ||
  'https://app.ghanatalksradio.com';

export class PredictionApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'PredictionApiError';
    this.status = status;
  }
}

export interface PredictionSummaryDto {
  slug: string;
  name: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  requires_registered_user: boolean;
  status: string;
}

export interface FixtureDto {
  id: number;
  home_team: string;
  away_team: string;
  kickoff_at: string;
  status: string;
  actual_home_score: number | null;
  actual_away_score: number | null;
  predictions_open: boolean;
}

export interface MyPredictionDto {
  fixture_id: number;
  predicted_home_score: number;
  predicted_away_score: number;
  points_awarded: number | null;
}

export interface PredictionDetailDto extends PredictionSummaryDto {
  fixtures: FixtureDto[];
  my_predictions: MyPredictionDto[];
}

export interface PredictResultDto {
  fixture_id: number;
  predicted_home_score: number;
  predicted_away_score: number;
}

export interface CommentDto {
  id: number;
  author: string;
  body: string;
  created_at: string;
  is_registered: boolean;
}

export interface CommentsPageDto {
  comments: CommentDto[];
  page: number;
  per_page: number;
  total: number;
  has_more: boolean;
}

async function apiGet<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${PORTAL_API_URL}/api${path}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch (networkErr) {
    throw new PredictionApiError(`Network error reaching prediction API: ${(networkErr as Error).message}`, 0);
  }
  const json = await response.json().catch(() => null);
  if (!json || json.status !== true) {
    throw new PredictionApiError(json?.message || `Prediction API request failed (${response.status})`, response.status);
  }
  return json.data as T;
}

async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${PORTAL_API_URL}/api${path}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (networkErr) {
    throw new PredictionApiError(`Network error reaching prediction API: ${(networkErr as Error).message}`, 0);
  }
  const json = await response.json().catch(() => null);
  if (!json || json.status !== true) {
    throw new PredictionApiError(json?.message || `Prediction API request failed (${response.status})`, response.status);
  }
  return json.data as T;
}

export async function fetchPredictionList(): Promise<PredictionSummaryDto[]> {
  const data = await apiGet<{ predictions: PredictionSummaryDto[] }>('/predictions');
  return data.predictions;
}

export async function fetchPredictionDetail(slug: string): Promise<PredictionDetailDto> {
  const guestToken = getGuestToken();
  return apiGet<PredictionDetailDto>(`/predictions/${encodeURIComponent(slug)}?guest_token=${encodeURIComponent(guestToken)}`);
}

export async function predictFixture(
  slug: string,
  fixtureId: number,
  predictedHomeScore: number,
  predictedAwayScore: number
): Promise<PredictResultDto> {
  return apiPost<PredictResultDto>(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/predict`, {
    predicted_home_score: predictedHomeScore,
    predicted_away_score: predictedAwayScore,
    guest_token: getGuestToken(),
  });
}

/** Oldest-first, page 1 = oldest. Web doesn't paginate the thread yet
 * (see mobile's comments modal for the infinite-scroll version), so this
 * requests a generously large page to cover typical fixture threads in
 * one call - has_more/page/total are still returned for whenever web
 * grows a "load more" control. */
export async function fetchComments(slug: string, fixtureId: number, page: number = 1): Promise<CommentsPageDto> {
  return apiGet<CommentsPageDto>(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/comments?page=${page}&per_page=50`);
}

export async function postComment(slug: string, fixtureId: number, body: string, guestName: string): Promise<CommentDto> {
  const data = await apiPost<{ comment: CommentDto }>(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/comments`, {
    body,
    guest_token: getGuestToken(),
    guest_name: guestName,
  });
  return data.comment;
}
