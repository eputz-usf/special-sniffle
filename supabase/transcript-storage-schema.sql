-- Current USF transcript upload prototype storage.
-- Apply this SQL in Supabase before enabling PDF uploads in production.
-- Uploaded PDFs are private and should be deleted by the transcript extraction
-- Edge Function immediately after text extraction unless explicit retention is added.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'current-usf-transcripts',
  'current-usf-transcripts',
  false,
  10485760,
  array['application/pdf']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'current-usf-profile-documents',
  'current-usf-profile-documents',
  false,
  10485760,
  null
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Allow anonymous current USF transcript uploads"
  on storage.objects;
create policy "Allow anonymous current USF transcript uploads"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'current-usf-transcripts'
    and lower((storage.foldername(name))[1]) = 'pending'
  );

drop policy if exists "Allow anonymous current USF profile document uploads"
  on storage.objects;
create policy "Allow anonymous current USF profile document uploads"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'current-usf-profile-documents'
    and lower((storage.foldername(name))[1]) = 'profile'
  );

drop policy if exists "Prevent anonymous current USF transcript reads"
  on storage.objects;
create policy "Prevent anonymous current USF transcript reads"
  on storage.objects
  for select
  to anon
  using (false);
