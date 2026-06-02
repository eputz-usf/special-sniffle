import type { QuizRecommendationSignal } from './quizRecommendations';

export type PublicQuizResult = {
  recommendedDegrees: string[];
  topMatch: string;
  majorScores: Record<string, number>;
  explanations: Record<string, string>;
  signalsByMajor: Record<string, QuizRecommendationSignal[]>;
  quizVersion: string;
};

type PublicQuizSessionPayload = {
  sessionId: string;
  userGroup: string;
  quizVersion: string;
  startedAt: string;
};

type PublicQuizAnswerPayload = {
  sessionId: string;
  questionId: string;
  answerValue: string;
  quizVersion: string;
};

type CompletePublicQuizAttemptParams = {
  sessionId: string;
  result: PublicQuizResult;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function getSupabaseHeaders(prefer = 'return=minimal') {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
    Prefer: prefer,
  };
}

async function upsertSupabaseRows(
  tableName: string,
  rows: unknown,
  onConflict: string,
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return 'skipped';
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${tableName}?on_conflict=${onConflict}`,
    {
      method: 'POST',
      headers: getSupabaseHeaders('resolution=merge-duplicates,return=minimal'),
      body: JSON.stringify(rows),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to save ${tableName}: ${message}`);
  }

  return 'saved';
}

async function patchSupabaseRows(
  tableName: string,
  query: string,
  row: unknown,
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return 'skipped';
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?${query}`, {
    method: 'PATCH',
    headers: getSupabaseHeaders(),
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to update ${tableName}: ${message}`);
  }

  return 'saved';
}

export function hasPublicQuizSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function upsertPublicQuizSession({
  sessionId,
  userGroup,
  quizVersion,
  startedAt,
}: PublicQuizSessionPayload): Promise<'saved' | 'skipped'> {
  return upsertSupabaseRows(
    'public_quiz_sessions',
    {
      session_id: sessionId,
      user_group: userGroup,
      quiz_version: quizVersion,
      started_at: startedAt,
      updated_at: new Date().toISOString(),
    },
    'session_id',
  );
}

export async function upsertPublicQuizAnswer({
  sessionId,
  questionId,
  answerValue,
  quizVersion,
}: PublicQuizAnswerPayload): Promise<'saved' | 'skipped'> {
  return upsertSupabaseRows(
    'public_quiz_responses',
    {
      session_id: sessionId,
      question_id: questionId,
      answer_value: answerValue,
      quiz_version: quizVersion,
      updated_at: new Date().toISOString(),
    },
    'session_id,question_id',
  );
}

export async function completePublicQuizAttempt({
  sessionId,
  result,
}: CompletePublicQuizAttemptParams): Promise<'saved' | 'skipped'> {
  if (!hasPublicQuizSupabaseConfig()) {
    return 'skipped';
  }

  const saveResultStatus = await upsertSupabaseRows(
    'public_quiz_results',
    {
      session_id: sessionId,
      recommended_degrees: result.recommendedDegrees,
      top_match: result.topMatch,
      major_scores: result.majorScores,
      explanations: result.explanations,
      recommendation_signals: result.signalsByMajor,
      quiz_version: result.quizVersion,
    },
    'session_id',
  );

  await patchSupabaseRows(
    'public_quiz_sessions',
    `session_id=eq.${encodeURIComponent(sessionId)}`,
    {
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  );

  return saveResultStatus;
}
