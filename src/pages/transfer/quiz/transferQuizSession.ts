import type { QuizAnswersByQuestion } from '../../../components/QuizTemplate';
import type { QuizRecommendationSignal } from '../../../utils/quizRecommendations';

const TRANSFER_QUIZ_SESSION_KEY = 'cic_transfer_quiz_session';
const TRANSFER_QUIZ_PROGRESS_KEY = 'cic_transfer_quiz_progress';
const TRANSFER_QUIZ_RESULT_KEY = 'cic_transfer_quiz_result';

export type TransferQuizSession = {
  sessionId: string;
  startedAt: string;
};

export type TransferQuizProgress = {
  answersByQuestion: QuizAnswersByQuestion;
  currentQuestionIndex: number;
};

export type SavedTransferQuizResult = {
  recommendedDegrees: string[];
  topMatch: string;
  majorScores: Record<string, number>;
  explanations: Record<string, string>;
  signalsByMajor: Record<string, QuizRecommendationSignal[]>;
  quizVersion: string;
  saveStatus: 'saved' | 'skipped';
};

function isTransferQuizSession(value: unknown): value is TransferQuizSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<TransferQuizSession>;
  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreateTransferQuizSession(): TransferQuizSession {
  const savedSession = window.localStorage.getItem(TRANSFER_QUIZ_SESSION_KEY);

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isTransferQuizSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(TRANSFER_QUIZ_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    TRANSFER_QUIZ_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}

export function loadTransferQuizProgress(): TransferQuizProgress {
  const savedProgress = window.localStorage.getItem(TRANSFER_QUIZ_PROGRESS_KEY);

  if (!savedProgress) {
    return {
      answersByQuestion: {},
      currentQuestionIndex: 0,
    };
  }

  try {
    const parsedProgress = JSON.parse(
      savedProgress,
    ) as Partial<TransferQuizProgress>;

    if (
      parsedProgress.answersByQuestion &&
      typeof parsedProgress.answersByQuestion === 'object' &&
      typeof parsedProgress.currentQuestionIndex === 'number'
    ) {
      return {
        answersByQuestion: parsedProgress.answersByQuestion,
        currentQuestionIndex: parsedProgress.currentQuestionIndex,
      };
    }
  } catch {
    window.localStorage.removeItem(TRANSFER_QUIZ_PROGRESS_KEY);
  }

  return {
    answersByQuestion: {},
    currentQuestionIndex: 0,
  };
}

export function hasTransferQuizProgress() {
  return window.localStorage.getItem(TRANSFER_QUIZ_PROGRESS_KEY) !== null;
}

export function saveTransferQuizProgress(progress: TransferQuizProgress) {
  window.localStorage.setItem(
    TRANSFER_QUIZ_PROGRESS_KEY,
    JSON.stringify(progress),
  );
}

export function loadTransferQuizResult(): SavedTransferQuizResult | null {
  const savedResult = window.localStorage.getItem(TRANSFER_QUIZ_RESULT_KEY);

  if (!savedResult) {
    return null;
  }

  try {
    const parsedResult = JSON.parse(
      savedResult,
    ) as Partial<SavedTransferQuizResult>;

    if (
      Array.isArray(parsedResult.recommendedDegrees) &&
      typeof parsedResult.topMatch === 'string' &&
      (parsedResult.saveStatus === 'saved' ||
        parsedResult.saveStatus === 'skipped')
    ) {
      return {
        recommendedDegrees: parsedResult.recommendedDegrees,
        topMatch: parsedResult.topMatch,
        majorScores: parsedResult.majorScores ?? {},
        explanations: parsedResult.explanations ?? {},
        signalsByMajor: parsedResult.signalsByMajor ?? {},
        quizVersion: parsedResult.quizVersion ?? 'legacy',
        saveStatus: parsedResult.saveStatus,
      };
    }
  } catch {
    window.localStorage.removeItem(TRANSFER_QUIZ_RESULT_KEY);
  }

  return null;
}

export function saveTransferQuizResult(result: SavedTransferQuizResult) {
  window.localStorage.setItem(
    TRANSFER_QUIZ_RESULT_KEY,
    JSON.stringify(result),
  );
}

export function resetTransferQuizSession() {
  window.localStorage.removeItem(TRANSFER_QUIZ_SESSION_KEY);
  window.localStorage.removeItem(TRANSFER_QUIZ_PROGRESS_KEY);
  window.localStorage.removeItem(TRANSFER_QUIZ_RESULT_KEY);
}
