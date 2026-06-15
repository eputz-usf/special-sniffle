import type { PublicQuizResult } from '../../../utils/publicQuizSupabase';

type BelliniStudentQuizSessionPayload = {
  sessionId: string;
  quizVersion: string;
  startedAt: string;
};

type BelliniStudentQuizAnswerPayload = {
  sessionId: string;
  questionId: string;
  answerValue: string;
  quizVersion: string;
};

type CompleteBelliniStudentQuizAttemptParams = {
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

export function hasBelliniStudentQuizSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function upsertBelliniStudentQuizSession({
  sessionId,
  quizVersion,
  startedAt,
}: BelliniStudentQuizSessionPayload): Promise<'saved' | 'skipped'> {
  return upsertSupabaseRows(
    'bellini_student_quiz_sessions',
    {
      session_id: sessionId,
      quiz_version: quizVersion,
      started_at: startedAt,
      updated_at: new Date().toISOString(),
    },
    'session_id',
  );
}

export async function upsertBelliniStudentQuizAnswer({
  sessionId,
  questionId,
  answerValue,
  quizVersion,
}: BelliniStudentQuizAnswerPayload): Promise<'saved' | 'skipped'> {
  return upsertSupabaseRows(
    'bellini_student_quiz_responses',
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

export async function completeBelliniStudentQuizAttempt({
  sessionId,
  result,
}: CompleteBelliniStudentQuizAttemptParams): Promise<'saved' | 'skipped'> {
  if (!hasBelliniStudentQuizSupabaseConfig()) {
    return 'skipped';
  }

  const saveResultStatus = await upsertSupabaseRows(
    'bellini_student_quiz_results',
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
    'bellini_student_quiz_sessions',
    `session_id=eq.${encodeURIComponent(sessionId)}`,
    {
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  );

  return saveResultStatus;
}
