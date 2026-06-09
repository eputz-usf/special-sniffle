import type { QuizAnswersByQuestion } from '../../../components/QuizTemplate';
import {
  calculateMatchPercentages,
  type QuizRecommendationSignal,
} from '../../../utils/quizRecommendations';

const CURRENT_USF_QUIZ_SESSION_KEY = 'cic_current_usf_quiz_session';
const CURRENT_USF_QUIZ_PROGRESS_KEY = 'cic_current_usf_quiz_progress';
const CURRENT_USF_QUIZ_RESULT_KEY = 'cic_current_usf_quiz_result';

export type CurrentUsfQuizSession = {
  sessionId: string;
  startedAt: string;
};

export type CurrentUsfQuizProgress = {
  answersByQuestion: QuizAnswersByQuestion;
  currentQuestionIndex: number;
};

export type SavedCurrentUsfQuizResult = {
  recommendedDegrees: string[];
  topMatch: string;
  majorScores: Record<string, number>;
  maximumMajorScores: Record<string, number>;
  matchPercentages: Record<string, number>;
  explanations: Record<string, string>;
  signalsByMajor: Record<string, QuizRecommendationSignal[]>;
  quizVersion: string;
  saveStatus: 'saved' | 'skipped';
};

function isCurrentUsfQuizSession(
  value: unknown,
): value is CurrentUsfQuizSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<CurrentUsfQuizSession>;
  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreateCurrentUsfQuizSession(): CurrentUsfQuizSession {
  const savedSession = window.localStorage.getItem(CURRENT_USF_QUIZ_SESSION_KEY);

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isCurrentUsfQuizSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(CURRENT_USF_QUIZ_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    CURRENT_USF_QUIZ_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}

export function loadCurrentUsfQuizProgress(): CurrentUsfQuizProgress {
  const savedProgress = window.localStorage.getItem(CURRENT_USF_QUIZ_PROGRESS_KEY);

  if (!savedProgress) {
    return {
      answersByQuestion: {},
      currentQuestionIndex: 0,
    };
  }

  try {
    const parsedProgress = JSON.parse(
      savedProgress,
    ) as Partial<CurrentUsfQuizProgress>;

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
    window.localStorage.removeItem(CURRENT_USF_QUIZ_PROGRESS_KEY);
  }

  return {
    answersByQuestion: {},
    currentQuestionIndex: 0,
  };
}

export function saveCurrentUsfQuizProgress(progress: CurrentUsfQuizProgress) {
  window.localStorage.setItem(
    CURRENT_USF_QUIZ_PROGRESS_KEY,
    JSON.stringify(progress),
  );
}

export function loadCurrentUsfQuizResult(): SavedCurrentUsfQuizResult | null {
  const savedResult = window.localStorage.getItem(CURRENT_USF_QUIZ_RESULT_KEY);

  if (!savedResult) {
    return null;
  }

  try {
    const parsedResult = JSON.parse(
      savedResult,
    ) as Partial<SavedCurrentUsfQuizResult>;

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
        maximumMajorScores: parsedResult.maximumMajorScores ?? {},
        matchPercentages:
          parsedResult.matchPercentages ??
          calculateMatchPercentages(
            parsedResult.recommendedDegrees,
            parsedResult.majorScores ?? {},
            parsedResult.maximumMajorScores ?? {},
          ),
        explanations: parsedResult.explanations ?? {},
        signalsByMajor: parsedResult.signalsByMajor ?? {},
        quizVersion: parsedResult.quizVersion ?? 'legacy',
        saveStatus: parsedResult.saveStatus,
      };
    }
  } catch {
    window.localStorage.removeItem(CURRENT_USF_QUIZ_RESULT_KEY);
  }

  return null;
}

export function saveCurrentUsfQuizResult(result: SavedCurrentUsfQuizResult) {
  window.localStorage.setItem(
    CURRENT_USF_QUIZ_RESULT_KEY,
    JSON.stringify(result),
  );
}

export function resetCurrentUsfQuizSession() {
  window.localStorage.removeItem(CURRENT_USF_QUIZ_SESSION_KEY);
  window.localStorage.removeItem(CURRENT_USF_QUIZ_PROGRESS_KEY);
  window.localStorage.removeItem(CURRENT_USF_QUIZ_RESULT_KEY);
}
