import type { QuizAnswersByQuestion } from '../../../components/QuizTemplate';
import {
  calculateMatchPercentages,
  type QuizRecommendationSignal,
} from '../../../utils/quizRecommendations';

const BELLINI_STUDENT_QUIZ_SESSION_KEY = 'cic_bellini_student_quiz_session';
const BELLINI_STUDENT_QUIZ_PROGRESS_KEY = 'cic_bellini_student_quiz_progress';
const BELLINI_STUDENT_QUIZ_RESULT_KEY = 'cic_bellini_student_quiz_result';

export type BelliniStudentQuizSession = {
  sessionId: string;
  startedAt: string;
};

export type BelliniStudentQuizProgress = {
  answersByQuestion: QuizAnswersByQuestion;
  currentQuestionIndex: number;
};

export type SavedBelliniStudentQuizResult = {
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

function isBelliniStudentQuizSession(
  value: unknown,
): value is BelliniStudentQuizSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<BelliniStudentQuizSession>;
  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreateBelliniStudentQuizSession(): BelliniStudentQuizSession {
  const savedSession = window.localStorage.getItem(
    BELLINI_STUDENT_QUIZ_SESSION_KEY,
  );

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isBelliniStudentQuizSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    BELLINI_STUDENT_QUIZ_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}

export function loadBelliniStudentQuizProgress(): BelliniStudentQuizProgress {
  const savedProgress = window.localStorage.getItem(
    BELLINI_STUDENT_QUIZ_PROGRESS_KEY,
  );

  if (!savedProgress) {
    return {
      answersByQuestion: {},
      currentQuestionIndex: 0,
    };
  }

  try {
    const parsedProgress = JSON.parse(
      savedProgress,
    ) as Partial<BelliniStudentQuizProgress>;

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
    window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_PROGRESS_KEY);
  }

  return {
    answersByQuestion: {},
    currentQuestionIndex: 0,
  };
}

export function saveBelliniStudentQuizProgress(
  progress: BelliniStudentQuizProgress,
) {
  window.localStorage.setItem(
    BELLINI_STUDENT_QUIZ_PROGRESS_KEY,
    JSON.stringify(progress),
  );
}

export function loadBelliniStudentQuizResult():
  | SavedBelliniStudentQuizResult
  | null {
  const savedResult = window.localStorage.getItem(
    BELLINI_STUDENT_QUIZ_RESULT_KEY,
  );

  if (!savedResult) {
    return null;
  }

  try {
    const parsedResult = JSON.parse(
      savedResult,
    ) as Partial<SavedBelliniStudentQuizResult>;

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
    window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_RESULT_KEY);
  }

  return null;
}

export function saveBelliniStudentQuizResult(
  result: SavedBelliniStudentQuizResult,
) {
  window.localStorage.setItem(
    BELLINI_STUDENT_QUIZ_RESULT_KEY,
    JSON.stringify(result),
  );
}

export function resetBelliniStudentQuizSession() {
  window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_SESSION_KEY);
  window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_PROGRESS_KEY);
  window.localStorage.removeItem(BELLINI_STUDENT_QUIZ_RESULT_KEY);
}
