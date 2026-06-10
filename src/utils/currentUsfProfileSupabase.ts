import type { CurrentUsfProfileMajor } from './currentUsfProfileMajors';

export type CurrentUsfStoredDocument = {
  bucket: string;
  path: string;
  fileName: string;
  savedAt: string;
  mimeType?: string;
  size?: number;
};

export type CurrentUsfTranscriptDocument = CurrentUsfStoredDocument;
export type CurrentUsfAdditionalDocument = CurrentUsfStoredDocument;

export type CurrentUsfProfilePayload = {
  studentName: string;
  uNumber: string;
  usfEmail: string;
  currentCollege: string;
  currentMajor: string;
  yearStarted: string;
  classStanding: string;
  completedCredits: string;
  currentGpa: string;
  notes: string;
  questions: string;
  transcriptDocuments?: CurrentUsfTranscriptDocument[];
  additionalDocuments?: CurrentUsfAdditionalDocument[];
};

type UpsertCurrentUsfProfileParams = {
  sessionId: string;
  profile: CurrentUsfProfilePayload;
  majors: CurrentUsfProfileMajor[];
};

type RemoteCurrentUsfProfileRow = {
  profile: CurrentUsfProfilePayload;
  majors: CurrentUsfProfileMajor[];
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

function hasCurrentUsfProfileSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function isRemoteCurrentUsfProfileRow(
  value: unknown,
): value is RemoteCurrentUsfProfileRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const row = value as Partial<RemoteCurrentUsfProfileRow>;

  return (
    row.profile !== undefined &&
    typeof row.profile === 'object' &&
    Array.isArray(row.majors)
  );
}

export async function loadRemoteCurrentUsfProfile(
  sessionId: string,
): Promise<RemoteCurrentUsfProfileRow | null> {
  if (!hasCurrentUsfProfileSupabaseConfig()) {
    return null;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/current_usf_profiles?session_id=eq.${encodeURIComponent(sessionId)}&select=profile,majors&limit=1`,
    {
      method: 'GET',
      headers: getSupabaseHeaders(),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load Current USF profile: ${message}`);
  }

  const rows = await response.json();

  if (Array.isArray(rows) && isRemoteCurrentUsfProfileRow(rows[0])) {
    return rows[0];
  }

  return null;
}

export async function upsertRemoteCurrentUsfProfile({
  sessionId,
  profile,
  majors,
}: UpsertCurrentUsfProfileParams): Promise<'saved' | 'skipped'> {
  if (!hasCurrentUsfProfileSupabaseConfig()) {
    return 'skipped';
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/current_usf_profiles?on_conflict=session_id`,
    {
      method: 'POST',
      headers: getSupabaseHeaders('resolution=merge-duplicates,return=minimal'),
      body: JSON.stringify({
        session_id: sessionId,
        profile,
        majors,
        auth_context:
          'Prototype only: anonymous browser session. Future USF version should attach this row to authenticated Microsoft/USF identity.',
        updated_at: new Date().toISOString(),
      }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to save Current USF profile: ${message}`);
  }

  return 'saved';
}
