/**
 * Quiz API — ghanatalksradio-portal's Modules/Engagement (see
 * PublicQuizController), the same Laravel backend the mobile app's
 * quizApi.ts uses. Guests submit with a guest_token (same pattern as
 * Predictions) — no sign-in required.
 */
import { getGuestToken } from '../utils/guestToken';

const PORTAL_API_URL =
  import.meta.env.VITE_PORTAL_API_URL?.replace(/\/$/, '') ||
  'https://app.ghanatalksradio.com';

export class QuizApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'QuizApiError';
    this.status = status;
  }
}

export interface QuizSummaryDto {
  slug: string;
  name: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  requires_registered_user: boolean;
  status: string;
}

export interface QuizChoiceDto {
  id: number;
  label: string;
}

export interface QuizQuestionDto {
  id: number;
  question_text: string;
  choices: QuizChoiceDto[];
}

export interface QuizDetailDto extends QuizSummaryDto {
  time_limit_seconds: number | null;
  questions: QuizQuestionDto[];
}

export interface QuizResultDto {
  score: number;
  total_possible: number;
}

async function apiGet<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${PORTAL_API_URL}/api${path}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch (networkErr) {
    throw new QuizApiError(`Network error reaching quiz API: ${(networkErr as Error).message}`, 0);
  }
  const json = await response.json().catch(() => null);
  if (!json || json.status !== true) {
    throw new QuizApiError(json?.message || `Quiz API request failed (${response.status})`, response.status);
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
    throw new QuizApiError(`Network error reaching quiz API: ${(networkErr as Error).message}`, 0);
  }
  const json = await response.json().catch(() => null);
  if (!json || json.status !== true) {
    throw new QuizApiError(json?.message || `Quiz API request failed (${response.status})`, response.status);
  }
  return json.data as T;
}

export async function fetchQuizList(): Promise<QuizSummaryDto[]> {
  const data = await apiGet<{ quizzes: QuizSummaryDto[] }>('/quizzes');
  return data.quizzes;
}

export async function fetchQuizDetail(slug: string): Promise<QuizDetailDto> {
  return apiGet<QuizDetailDto>(`/quizzes/${encodeURIComponent(slug)}`);
}

/** `answers` maps question id -> chosen choice id. */
export async function submitQuiz(slug: string, answers: Record<number, number>): Promise<QuizResultDto> {
  return apiPost<QuizResultDto>(`/quizzes/${encodeURIComponent(slug)}/submit`, {
    answers,
    guest_token: getGuestToken(),
  });
}
