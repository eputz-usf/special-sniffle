const CURRENT_USF_PROFILE_SESSION_KEY = 'cic_current_usf_profile_session';

export type CurrentUsfProfileSession = {
  sessionId: string;
  startedAt: string;
};

function isCurrentUsfProfileSession(
  value: unknown,
): value is CurrentUsfProfileSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Partial<CurrentUsfProfileSession>;

  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string'
  );
}

export function getOrCreateCurrentUsfProfileSession(): CurrentUsfProfileSession {
  const savedSession = window.localStorage.getItem(
    CURRENT_USF_PROFILE_SESSION_KEY,
  );

  if (savedSession) {
    try {
      const parsedSession = JSON.parse(savedSession);

      if (isCurrentUsfProfileSession(parsedSession)) {
        return parsedSession;
      }
    } catch {
      window.localStorage.removeItem(CURRENT_USF_PROFILE_SESSION_KEY);
    }
  }

  const session = {
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    CURRENT_USF_PROFILE_SESSION_KEY,
    JSON.stringify(session),
  );

  return session;
}
