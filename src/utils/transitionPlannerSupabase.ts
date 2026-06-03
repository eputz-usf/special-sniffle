import type { PlannerMajor } from './transitionPlannerMajors';

export type TransitionPlannerPayload = {
  studentName: string;
  selectedRecommendations: string[];
  goals: string;
  questions: string;
  notes: string;
  nextSteps: string;
};

type UpsertTransitionPlannerParams = {
  sessionId: string;
  planner: TransitionPlannerPayload;
  majors: PlannerMajor[];
};

type RemoteTransitionPlannerRow = {
  planner: TransitionPlannerPayload;
  majors: PlannerMajor[];
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

function hasTransitionPlannerSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function isRemoteTransitionPlannerRow(
  value: unknown,
): value is RemoteTransitionPlannerRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const row = value as Partial<RemoteTransitionPlannerRow>;

  return (
    row.planner !== undefined &&
    typeof row.planner === 'object' &&
    Array.isArray(row.majors)
  );
}

export async function loadRemoteTransitionPlanner(
  sessionId: string,
): Promise<RemoteTransitionPlannerRow | null> {
  if (!hasTransitionPlannerSupabaseConfig()) {
    return null;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/public_transition_plans?session_id=eq.${encodeURIComponent(sessionId)}&select=planner,majors&limit=1`,
    {
      method: 'GET',
      headers: getSupabaseHeaders(),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load transition planner: ${message}`);
  }

  const rows = await response.json();

  if (Array.isArray(rows) && isRemoteTransitionPlannerRow(rows[0])) {
    return rows[0];
  }

  return null;
}

export async function upsertRemoteTransitionPlanner({
  sessionId,
  planner,
  majors,
}: UpsertTransitionPlannerParams): Promise<'saved' | 'skipped'> {
  if (!hasTransitionPlannerSupabaseConfig()) {
    return 'skipped';
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/public_transition_plans?on_conflict=session_id`,
    {
      method: 'POST',
      headers: getSupabaseHeaders('resolution=merge-duplicates,return=minimal'),
      body: JSON.stringify({
        session_id: sessionId,
        planner,
        majors,
        updated_at: new Date().toISOString(),
      }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to save transition planner: ${message}`);
  }

  return 'saved';
}
