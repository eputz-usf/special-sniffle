const PUBLIC_QUIZ_SESSION_KEY = 'cic_public_quiz_session';
const PUBLIC_QUIZ_PROGRESS_KEY = 'cic_public_quiz_progress';
const PUBLIC_QUIZ_RESULT_KEY = 'cic_public_quiz_result';

export type PublicQuizSession = {
  sessionId: string;
  startedAt: string;
};

export type PublicQuizProgress = {
  answersByQuestion: Record<string, string>;
  currentQuestionIndex: number;
};

export type SavedPublicQuizResult = {
  recommendedDegrees: string[];
  topMatch: string;
  saveStatus: 'saved' | 'skipped';
};

function isPublicQuizSession(value: unknown): value is PublicQuizSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<PublicQuizSession>;
  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreatePublicQuizSession(): PublicQuizSession {
  const savedSession = window.localStorage.getItem(PUBLIC_QUIZ_SESSION_KEY);

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isPublicQuizSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(PUBLIC_QUIZ_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(PUBLIC_QUIZ_SESSION_KEY, JSON.stringify(session));

  return session;
}

export function loadPublicQuizProgress(): PublicQuizProgress {
  const savedProgress = window.localStorage.getItem(PUBLIC_QUIZ_PROGRESS_KEY);

  if (!savedProgress) {
    return {
      answersByQuestion: {},
      currentQuestionIndex: 0,
    };
  }

  try {
    const parsedProgress = JSON.parse(savedProgress) as Partial<PublicQuizProgress>;

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
    window.localStorage.removeItem(PUBLIC_QUIZ_PROGRESS_KEY);
  }

  return {
    answersByQuestion: {},
    currentQuestionIndex: 0,
  };
}

export function hasPublicQuizProgress() {
  return window.localStorage.getItem(PUBLIC_QUIZ_PROGRESS_KEY) !== null;
}

export function savePublicQuizProgress(progress: PublicQuizProgress) {
  window.localStorage.setItem(PUBLIC_QUIZ_PROGRESS_KEY, JSON.stringify(progress));
}

export function loadPublicQuizResult(): SavedPublicQuizResult | null {
  const savedResult = window.localStorage.getItem(PUBLIC_QUIZ_RESULT_KEY);

  if (!savedResult) {
    return null;
  }

  try {
    return JSON.parse(savedResult) as SavedPublicQuizResult;
  } catch {
    window.localStorage.removeItem(PUBLIC_QUIZ_RESULT_KEY);
    return null;
  }
}

export function savePublicQuizResult(result: SavedPublicQuizResult) {
  window.localStorage.setItem(PUBLIC_QUIZ_RESULT_KEY, JSON.stringify(result));
}

export function resetPublicQuizSession() {
  window.localStorage.removeItem(PUBLIC_QUIZ_SESSION_KEY);
  window.localStorage.removeItem(PUBLIC_QUIZ_PROGRESS_KEY);
  window.localStorage.removeItem(PUBLIC_QUIZ_RESULT_KEY);
}
