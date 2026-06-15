import { createClient } from 'npm:@supabase/supabase-js@2.106.2';

type ExtractRequest = {
  action?: 'retain' | 'delete' | 'download';
  bucket?: string;
  path?: string;
  profileSessionId?: string;
  fileName?: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function getFileNameFromPath(path: string) {
  return path.split('/').pop() ?? 'transcript.pdf';
}

function sanitizePathPart(value: string) {
  return value.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Supabase function environment is not configured' }, 500);
  }

  let payload: ExtractRequest;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload' }, 400);
  }

  const bucket = payload.bucket ?? 'current-usf-transcripts';
  const path = payload.path;
  const action = payload.action;
  const isTranscriptBucket =
    bucket === 'current-usf-transcripts' ||
    bucket === 'bellini-student-transcripts';
  const isProfileDocumentBucket =
    bucket === 'current-usf-profile-documents' ||
    bucket === 'bellini-student-profile-documents';

  if (!path) {
    return jsonResponse({ error: 'A storage path is required' }, 400);
  }

  if (!isTranscriptBucket && !isProfileDocumentBucket) {
    return jsonResponse({ error: 'Unsupported document bucket' }, 400);
  }

  if (isTranscriptBucket && !path.toLowerCase().endsWith('.pdf')) {
    return jsonResponse({ error: 'A PDF storage path is required' }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  if (action === 'delete') {
    if (path.startsWith('pending/')) {
      if (!isTranscriptBucket) {
        return jsonResponse({ error: 'Pending deletes are only supported for transcripts' }, 400);
      }
    } else {
      const profileSessionId = payload.profileSessionId;

      if (!profileSessionId) {
        return jsonResponse({ error: 'A profile session id is required' }, 400);
      }

      const expectedPrefix = `profile/${sanitizePathPart(profileSessionId)}/`;

      if (!path.startsWith(expectedPrefix)) {
        return jsonResponse({ error: 'That document is not saved to this profile' }, 403);
      }
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return jsonResponse({ error: error.message }, 500);
    }

    return jsonResponse({ deletedUploadedFile: true });
  }

  if (action === 'retain') {
    if (!isTranscriptBucket) {
      return jsonResponse({ error: 'Document retention is only supported for transcripts' }, 400);
    }

    if (!path.startsWith('pending/')) {
      return jsonResponse({ error: 'A pending PDF storage path is required' }, 400);
    }

    const profileSessionId = payload.profileSessionId;

    if (!profileSessionId) {
      return jsonResponse({ error: 'A profile session id is required' }, 400);
    }

    const fileName = sanitizePathPart(payload.fileName ?? getFileNameFromPath(path));
    const retainedPath = `profile/${sanitizePathPart(profileSessionId)}/${Date.now()}-${fileName}`;
    const { error: copyError } = await supabase.storage
      .from(bucket)
      .copy(path, retainedPath);

    if (copyError) {
      return jsonResponse({ error: copyError.message }, 500);
    }

    const { error: removeError } = await supabase.storage.from(bucket).remove([path]);

    if (removeError) {
      return jsonResponse({ error: removeError.message }, 500);
    }

    return jsonResponse({
      document: {
        bucket,
        path: retainedPath,
        fileName: payload.fileName ?? getFileNameFromPath(path),
        savedAt: new Date().toISOString(),
      },
    });
  }

  if (action === 'download') {
    const profileSessionId = payload.profileSessionId;

    if (!profileSessionId) {
      return jsonResponse({ error: 'A profile session id is required' }, 400);
    }

    const expectedPrefix = `profile/${sanitizePathPart(profileSessionId)}/`;

    if (!path.startsWith(expectedPrefix)) {
      return jsonResponse({ error: 'That document is not saved to this profile' }, 403);
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60);

    if (error || !data?.signedUrl) {
      return jsonResponse(
        { error: error?.message ?? 'Unable to create document download URL' },
        500,
      );
    }

    return jsonResponse({ signedUrl: data.signedUrl });
  }

  return jsonResponse({ error: 'Unsupported transcript storage action' }, 400);
});
