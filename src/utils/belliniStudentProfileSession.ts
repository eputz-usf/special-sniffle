const BELLINI_STUDENT_PROFILE_SESSION_KEY = 'cic_bellini_student_profile_session';

export type BelliniStudentProfileSession = {
  sessionId: string;
  startedAt: string;
};

function isBelliniStudentProfileSession(
  value: unknown,
): value is BelliniStudentProfileSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<BelliniStudentProfileSession>;

  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreateBelliniStudentProfileSession(): BelliniStudentProfileSession {
  const savedSession = window.localStorage.getItem(
    BELLINI_STUDENT_PROFILE_SESSION_KEY,
  );

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isBelliniStudentProfileSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(BELLINI_STUDENT_PROFILE_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    BELLINI_STUDENT_PROFILE_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}
