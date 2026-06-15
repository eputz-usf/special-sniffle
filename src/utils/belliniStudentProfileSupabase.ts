import type { BelliniStudentProfileMajor } from './belliniStudentProfileMajors';

export type BelliniStudentStoredDocument = {
  bucket: string;
  path: string;
  fileName: string;
  savedAt: string;
  mimeType?: string;
  size?: number;
};

export type BelliniStudentTranscriptDocument = BelliniStudentStoredDocument;
export type BelliniStudentAdditionalDocument = BelliniStudentStoredDocument;

export type BelliniStudentProfilePayload = {
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
  transcriptDocuments?: BelliniStudentTranscriptDocument[];
  additionalDocuments?: BelliniStudentAdditionalDocument[];
};

type UpsertBelliniStudentProfileParams = {
  sessionId: string;
  profile: BelliniStudentProfilePayload;
  majors: BelliniStudentProfileMajor[];
};

type RemoteBelliniStudentProfileRow = {
  profile: BelliniStudentProfilePayload;
  majors: BelliniStudentProfileMajor[];
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

function hasBelliniStudentProfileSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function isRemoteBelliniStudentProfileRow(
  value: unknown,
): value is RemoteBelliniStudentProfileRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const row = value as Partial<RemoteBelliniStudentProfileRow>;

  return (
    row.profile !== undefined &&
    typeof row.profile === 'object' &&
    Array.isArray(row.majors)
  );
}

export async function loadRemoteBelliniStudentProfile(
  sessionId: string,
): Promise<RemoteBelliniStudentProfileRow | null> {
  if (!hasBelliniStudentProfileSupabaseConfig()) {
    return null;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/bellini_student_profiles?session_id=eq.${encodeURIComponent(sessionId)}&select=profile,majors&limit=1`,
    {
      method: 'GET',
      headers: getSupabaseHeaders(),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Unable to load Current Bellini profile: ${message}`);
  }

  const rows = await response.json();

  if (Array.isArray(rows) && isRemoteBelliniStudentProfileRow(rows[0])) {
    return rows[0];
  }

  return null;
}

export async function upsertRemoteBelliniStudentProfile({
  sessionId,
  profile,
  majors,
}: UpsertBelliniStudentProfileParams): Promise<'saved' | 'skipped'> {
  if (!hasBelliniStudentProfileSupabaseConfig()) {
    return 'skipped';
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/bellini_student_profiles?on_conflict=session_id`,
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
    throw new Error(`Unable to save Current Bellini profile: ${message}`);
  }

  return 'saved';
}
