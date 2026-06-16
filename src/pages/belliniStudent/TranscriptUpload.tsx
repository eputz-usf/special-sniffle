import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ClipboardList,
  Download,
  FileText,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { loadBelliniStudentProfileMajors } from '../../utils/belliniStudentProfileMajors';
import { getOrCreateBelliniStudentProfileSession } from '../../utils/belliniStudentProfileSession';
import {
  type BelliniStudentProfilePayload,
  type BelliniStudentTranscriptDocument,
  loadRemoteBelliniStudentProfile,
  upsertRemoteBelliniStudentProfile,
} from '../../utils/belliniStudentProfileSupabase';
import {
  categorizeTranscriptCourse,
  parseTranscriptText,
} from '../../utils/transcriptParser';
import '../../styles/degrees.css';
import '../../styles/transcriptUpload.css';

const TRANSCRIPT_STORAGE_KEY = 'cic_bellini_student_transcript_summary';
const BELLINI_STUDENT_PROFILE_STORAGE_KEY = 'cic_bellini_student_profile';
const TRANSCRIPT_BUCKET = 'bellini-student-transcripts';
const MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type CourseStatus = 'completed' | 'in-progress' | 'unknown';

type ExtractedCourse = {
  id: string;
  code: string;
  title: string;
  letterGrade: string;
  creditsEarned: string;
  qualityPoints: string;
  term: string;
  status: CourseStatus;
  category: string;
};

type TranscriptSummary = {
  sourceName: string;
  extractedAt: string;
  courses: ExtractedCourse[];
};

type RemoteExtractedCourse = Omit<ExtractedCourse, 'id'>;

type TranscriptExtractionResponse = {
  text?: string;
  courses?: RemoteExtractedCourse[];
  error?: string;
  deletedUploadedFile?: boolean;
  document?: BelliniStudentTranscriptDocument;
  signedUrl?: string;
};

type ProfileDraft = Partial<BelliniStudentProfilePayload>;

type PendingTranscriptDocument = {
  bucket: string;
  path: string;
  fileName: string;
};

type PdfJsModule = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (options: {
    data: Uint8Array;
    disableFontFace?: boolean;
    isEvalSupported?: boolean;
    useSystemFonts?: boolean;
  }) => {
    promise: Promise<{
      numPages: number;
      getPage: (pageNumber: number) => Promise<{
        getTextContent: () => Promise<{
          items: Array<{
            str?: string;
            transform?: number[];
          }>;
        }>;
      }>;
    }>;
  };
};

const emptyCourse: ExtractedCourse = {
  id: '',
  code: '',
  title: '',
  letterGrade: '',
  creditsEarned: '',
  qualityPoints: '',
  term: '',
  status: 'unknown',
  category: 'General elective',
};

function createCourseId() {
  return `course-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadSavedSummary(): TranscriptSummary | null {
  const savedSummary = window.localStorage.getItem(TRANSCRIPT_STORAGE_KEY);

  if (!savedSummary) {
    return null;
  }

  try {
    const parsedSummary = JSON.parse(savedSummary) as TranscriptSummary;

    return {
      ...parsedSummary,
      courses: parsedSummary.courses.map((course) => ({
        ...emptyCourse,
        ...course,
        letterGrade:
          course.letterGrade || (course as unknown as { grade?: string }).grade || '',
        creditsEarned:
          course.creditsEarned ||
          (course as unknown as { credits?: string }).credits ||
          '',
        qualityPoints: course.qualityPoints || '',
      })),
    };
  } catch {
    window.localStorage.removeItem(TRANSCRIPT_STORAGE_KEY);
    return null;
  }
}

function sumCompletedCredits(courses: ExtractedCourse[]) {
  return courses
    .filter((course) => course.status === 'completed')
    .reduce(
      (total, course) => total + (Number.parseFloat(course.creditsEarned) || 0),
      0,
    );
}

function getBlankCourseFields(course: ExtractedCourse) {
  const requiredFields: Array<{
    label: string;
    value: string;
  }> = [
    { label: 'course', value: course.code },
    { label: 'title', value: course.title },
    { label: 'letter grade', value: course.letterGrade },
    { label: 'credits earned', value: course.creditsEarned },
    { label: 'term', value: course.term },
    { label: 'area', value: course.category },
  ];

  return requiredFields
    .filter((field) => !field.value.trim())
    .map((field) => field.label);
}

function buildProfileNote(courses: ExtractedCourse[]) {
  const gatewayCourses = courses.filter((course) => course.category !== 'General elective');

  if (gatewayCourses.length === 0) {
    return 'Transcript extraction reviewed: no gateway-related courses were identified automatically.';
  }

  return [
    'Transcript extraction reviewed. Gateway-related courses identified:',
    ...gatewayCourses.map((course) => {
      const details = [
        course.term,
        course.creditsEarned && `${course.creditsEarned} credits earned`,
        course.letterGrade,
      ]
        .filter(Boolean)
        .join(', ');

      return `- ${course.code}${course.title ? ` ${course.title}` : ''}${details ? ` (${details})` : ''}`;
    }),
  ].join('\n');
}

function mapRemoteCourses(courses: RemoteExtractedCourse[] = []): ExtractedCourse[] {
  return courses.map((course) => ({
    ...emptyCourse,
    ...course,
    id: createCourseId(),
  }));
}

function getPrintValue(value: string) {
  return value.trim() || '-';
}

function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function loadProfileDraft(): ProfileDraft {
  const savedProfile = window.localStorage.getItem(BELLINI_STUDENT_PROFILE_STORAGE_KEY);

  if (!savedProfile) {
    return {};
  }

  try {
    return JSON.parse(savedProfile) as ProfileDraft;
  } catch {
    return {};
  }
}

function toProfilePayload(profile: ProfileDraft): BelliniStudentProfilePayload {
  return {
    studentName: profile.studentName ?? '',
    uNumber: profile.uNumber ?? '',
    usfEmail: profile.usfEmail ?? '',
    currentCollege: profile.currentCollege ?? '',
    currentMajor: profile.currentMajor ?? '',
    yearStarted: profile.yearStarted ?? '',
    classStanding: profile.classStanding ?? '',
    completedCredits: profile.completedCredits ?? '',
    currentGpa: profile.currentGpa ?? '',
    notes: profile.notes ?? '',
    questions: profile.questions ?? '',
    transcriptDocuments: profile.transcriptDocuments ?? [],
    additionalDocuments: profile.additionalDocuments ?? [],
  };
}

async function invokeTranscriptFunction(body: Record<string, unknown>) {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured in this environment.');
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/extract-transcript`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  let data: TranscriptExtractionResponse = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText) as TranscriptExtractionResponse;
    } catch {
      data = { error: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(data.error || `Edge Function failed with status ${response.status}`);
  }

  return data;
}

async function extractPdfTextInBrowser(file: File) {
  const pdfJsUrl = 'https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.mjs';
  const pdfjs = (await import(/* @vite-ignore */ pdfJsUrl)) as PdfJsModule;

  pdfjs.GlobalWorkerOptions.workerSrc =
    'https://esm.sh/pdfjs-dist@4.10.38/legacy/build/pdf.worker.mjs';

  const document = await pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
    disableFontFace: true,
    isEvalSupported: false,
    useSystemFonts: false,
  }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const positionedItems = content.items
      .filter((item) => item.str?.trim())
      .map((item) => {
        const transform = item.transform ?? [0, 0, 0, 0, 0, 0];

        return {
          str: item.str ?? '',
          x: Number(transform[4]) || 0,
          y: Number(transform[5]) || 0,
        };
      })
      .sort((a, b) => (Math.abs(b.y - a.y) > 2 ? b.y - a.y : a.x - b.x));
    const lines: Array<{ y: number; items: typeof positionedItems }> = [];

    positionedItems.forEach((item) => {
      const line = lines.find((candidate) => Math.abs(candidate.y - item.y) <= 2);

      if (line) {
        line.items.push(item);
        return;
      }

      lines.push({ y: item.y, items: [item] });
    });

    pages.push(
      lines
        .map((line) =>
          line.items
            .sort((a, b) => a.x - b.x)
            .map((item) => item.str.trim())
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim(),
        )
        .filter(Boolean)
        .join('\n'),
    );
  }

  return pages.join('\n');
}

function TranscriptUpload() {
  const savedSummary = loadSavedSummary();
  const [profileSession] = useState(getOrCreateBelliniStudentProfileSession);
  const [sourceName, setSourceName] = useState(savedSummary?.sourceName ?? '');
  const [transcriptText, setTranscriptText] = useState('');
  const [courses, setCourses] = useState<ExtractedCourse[]>(
    savedSummary?.courses ?? [],
  );
  const [savedDocuments, setSavedDocuments] = useState<
    BelliniStudentTranscriptDocument[]
  >(() => loadProfileDraft().transcriptDocuments ?? []);
  const [selectedDocumentPath, setSelectedDocumentPath] = useState(
    savedDocuments[0]?.path ?? '',
  );
  const [statusMessage, setStatusMessage] = useState(
    savedSummary
      ? `Loaded ${savedSummary.courses.length} saved courses from your last review.`
      : 'Paste transcript text, upload a .txt/PDF file for extraction.',
  );
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [pendingDocument, setPendingDocument] =
    useState<PendingTranscriptDocument | null>(null);
  const [showPrintWarning, setShowPrintWarning] = useState(false);

  const completedCredits = useMemo(() => sumCompletedCredits(courses), [courses]);
  const incompleteCourses = useMemo(
    () =>
      courses
        .map((course, index) => ({
          course,
          index,
          blankFields: getBlankCourseFields(course),
        }))
        .filter(({ blankFields }) => blankFields.length > 0),
    [courses],
  );
  const selectedSavedDocument =
    savedDocuments.find((document) => document.path === selectedDocumentPath) ??
    savedDocuments[0];
  const activeDocumentPath = selectedSavedDocument?.path ?? '';

  useEffect(() => {
    let isMounted = true;

    async function loadSavedDocuments() {
      try {
        const remoteProfile = await loadRemoteBelliniStudentProfile(
          profileSession.sessionId,
        );

        if (!isMounted || !remoteProfile) {
          return;
        }

        const remoteDocuments = remoteProfile.profile.transcriptDocuments ?? [];

        setSavedDocuments(remoteDocuments);
        window.localStorage.setItem(
          BELLINI_STUDENT_PROFILE_STORAGE_KEY,
          JSON.stringify({
            ...loadProfileDraft(),
            transcriptDocuments: remoteDocuments,
          }),
        );
      } catch {
        if (isMounted) {
          setStatusMessage(
            'Saved documents could not be refreshed from Supabase. Local profile documents are still available.',
          );
        }
      }
    }

    loadSavedDocuments();

    return () => {
      isMounted = false;
    };
  }, [profileSession.sessionId]);

  function updateCourse(
    id: string,
    field: keyof Omit<ExtractedCourse, 'id'>,
    value: string,
  ) {
    setCourses((currentCourses) =>
      currentCourses.map((course) => {
        if (course.id !== id) {
          return course;
        }

        const nextCourse = {
          ...course,
          [field]: value,
        };

        if (field === 'code') {
          nextCourse.category = categorizeTranscriptCourse(value.toUpperCase());
        }

        return nextCourse;
      }),
    );
  }

  function extractCourses(text: string, nextSourceName = sourceName) {
    const parsedCourses = mapRemoteCourses(parseTranscriptText(text));

    setCourses(parsedCourses);
    setSourceName(nextSourceName);
    setStatusMessage(
      parsedCourses.length > 0
        ? `Extracted ${parsedCourses.length} course rows. Review and edit before saving.`
        : 'No course rows were detected. Try pasting text that includes course codes such as COP 2510 or MAC 2311.',
    );
  }

  function handleTextExtraction() {
    extractCourses(transcriptText);
  }

  function handlePrintCourseList() {
    if (incompleteCourses.length > 0) {
      setShowPrintWarning(true);
      return;
    }

    window.print();
  }

  function printCourseListWithIncompleteRows() {
    setShowPrintWarning(false);
    window.print();
  }

  async function extractPdfWithSupabase(file: File) {
    if (file.size > MAX_PDF_SIZE_BYTES) {
      setStatusMessage('PDF files must be 10 MB or smaller for transcript extraction.');
      return;
    }

    const safeFileName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
    const storagePath = `pending/${crypto.randomUUID()}-${safeFileName}`;
    let uploadWarning = '';
    let uploadedDocument: PendingTranscriptDocument | null = null;

    setIsProcessingFile(true);
    setStatusMessage(
      isSupabaseConfigured()
        ? 'Uploading PDF to Supabase secure storage for extraction...'
        : 'Extracting transcript text in your browser...',
    );
    setPendingDocument(null);

    try {
      if (isSupabaseConfigured()) {
        try {
          const { error: uploadError } = await supabase.storage
            .from(TRANSCRIPT_BUCKET)
            .upload(storagePath, file, {
              contentType: 'application/pdf',
              upsert: false,
            });

          if (uploadError) {
            throw new Error(uploadError.message);
          }

          uploadedDocument = {
            bucket: TRANSCRIPT_BUCKET,
            path: storagePath,
            fileName: file.name,
          };
          setStatusMessage('PDF uploaded. Extracting transcript text in your browser...');
        } catch (error) {
          uploadWarning =
            error instanceof Error
              ? ` Supabase upload failed, so the PDF cannot be saved to profile yet: ${error.message}`
              : ' Supabase upload failed, so the PDF cannot be saved to profile yet.';
          setStatusMessage('Supabase upload failed. Extracting transcript text locally...');
        }
      }

      const extractedText = await extractPdfTextInBrowser(file);
      const extractedCourses = mapRemoteCourses(parseTranscriptText(extractedText));

      setTranscriptText(extractedText);
      setCourses(extractedCourses);
      setPendingDocument(uploadedDocument);
      setStatusMessage(
        extractedCourses.length > 0
          ? `Extracted ${extractedCourses.length} course rows from the PDF.${
              uploadedDocument
                ? ' Choose whether to save or delete the uploaded document.'
                : uploadWarning
            }`
          : `PDF text was extracted, but no course rows were detected. Review the extracted text.${
              uploadedDocument
                ? ' Then choose whether to save or delete the uploaded document.'
                : uploadWarning
            }`,
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? `PDF extraction failed: ${error.message}`
          : 'PDF extraction failed. Try a text export or paste transcript text.',
      );
    } finally {
      setIsProcessingFile(false);
    }
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSourceName(file.name);

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      await extractPdfWithSupabase(file);
      event.target.value = '';
      return;
    }

    if (!file.name.toLowerCase().endsWith('.txt')) {
      setStatusMessage(
        'Upload a PDF or .txt transcript export. Image transcript uploads are not supported.',
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = String(reader.result ?? '');
      setTranscriptText(text);
      extractCourses(text, file.name);
    };

    reader.onerror = () => {
      setStatusMessage('Unable to read that file. Try pasting the transcript text instead.');
    };

    reader.readAsText(file);
    event.target.value = '';
  }

  async function loadSavedDocumentForExtraction() {
    if (!selectedSavedDocument) {
      setStatusMessage('Choose a saved transcript document first.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatusMessage(
        'Supabase is not configured in this environment. Saved documents cannot be loaded.',
      );
      return;
    }

    setIsProcessingFile(true);
    setStatusMessage(`Loading ${selectedSavedDocument.fileName} from saved documents...`);

    try {
      if (pendingDocument) {
        await deletePendingDocument();
      }

      const data = await invokeTranscriptFunction({
        action: 'download',
        bucket: selectedSavedDocument.bucket,
        path: selectedSavedDocument.path,
        profileSessionId: profileSession.sessionId,
      });

      if (data?.error || !data?.signedUrl) {
        throw new Error(data?.error ?? 'No download URL was returned.');
      }

      const response = await fetch(data.signedUrl);

      if (!response.ok) {
        throw new Error(`Document download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const file = new File([blob], selectedSavedDocument.fileName, {
        type: blob.type || 'application/pdf',
      });
      const extractedText = await extractPdfTextInBrowser(file);
      const extractedCourses = mapRemoteCourses(parseTranscriptText(extractedText));

      setSourceName(selectedSavedDocument.fileName);
      setTranscriptText(extractedText);
      setCourses(extractedCourses);
      setPendingDocument(null);
      setStatusMessage(
        extractedCourses.length > 0
          ? `Extracted ${extractedCourses.length} course rows from ${selectedSavedDocument.fileName}.`
          : `Loaded ${selectedSavedDocument.fileName}, but no course rows were detected. Review the extracted text.`,
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';

      setStatusMessage(
        errorMessage === 'A pending PDF storage path is required'
          ? 'Unable to load saved document: the Supabase transcript function needs to be redeployed so saved profile documents can be opened.'
          : errorMessage
            ? `Unable to load saved document: ${errorMessage}`
          : 'Unable to load saved document.',
      );
    } finally {
      setIsProcessingFile(false);
    }
  }

  function addCourse() {
    setCourses((currentCourses) => [
      ...currentCourses,
      { ...emptyCourse, id: createCourseId() },
    ]);
  }

  function removeCourse(id: string) {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    );
  }

  function removeAllCourses() {
    setCourses([]);
    setStatusMessage('All extracted course rows removed.');
  }

  function saveSummary() {
    const reviewedCourses = courses.filter((course) => course.code.trim());
    const summary: TranscriptSummary = {
      sourceName,
      extractedAt: new Date().toISOString(),
      courses: reviewedCourses,
    };

    window.localStorage.setItem(TRANSCRIPT_STORAGE_KEY, JSON.stringify(summary));

    const profile = loadProfileDraft();

    const profileNote = buildProfileNote(reviewedCourses);
    const existingNotes = profile.notes?.trim();

    window.localStorage.setItem(
      BELLINI_STUDENT_PROFILE_STORAGE_KEY,
      JSON.stringify({
        ...profile,
        completedCredits:
          completedCredits > 0 ? String(completedCredits) : profile.completedCredits ?? '',
        notes: existingNotes ? `${existingNotes}\n\n${profileNote}` : profileNote,
        questions:
          profile.questions?.trim() ||
          'Ask advising which extracted transcript courses satisfy Bellini gateway and major-entry requirements.',
      }),
    );

    setCourses(reviewedCourses);
    setStatusMessage(
      `Saved ${reviewedCourses.length} reviewed courses locally and added a summary to your profile.`,
    );
  }

  async function deletePendingDocument() {
    if (!pendingDocument) {
      return;
    }

    setIsProcessingFile(true);
    setStatusMessage('Deleting the uploaded PDF from Supabase Storage...');

    try {
      const data = await invokeTranscriptFunction({
        action: 'delete',
        bucket: pendingDocument.bucket,
        path: pendingDocument.path,
      });

      if (data?.error) {
        throw new Error(data.error);
      }

      setPendingDocument(null);
      setStatusMessage('Uploaded PDF deleted. You can still review the extracted course rows.');
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? `Unable to delete uploaded PDF: ${error.message}`
          : 'Unable to delete uploaded PDF.',
      );
    } finally {
      setIsProcessingFile(false);
    }
  }

  async function savePendingDocumentToProfile() {
    if (!pendingDocument) {
      return;
    }

    setIsProcessingFile(true);
    setStatusMessage('Saving the uploaded PDF to your profile storage...');

    try {
      const data = await invokeTranscriptFunction({
        action: 'retain',
        bucket: pendingDocument.bucket,
        path: pendingDocument.path,
        fileName: pendingDocument.fileName,
        profileSessionId: profileSession.sessionId,
      });

      if (data?.error || !data?.document) {
        throw new Error(data?.error ?? 'No saved document reference was returned.');
      }

      const profile = loadProfileDraft();
      const currentDocuments = profile.transcriptDocuments ?? [];
      const nextProfile = toProfilePayload({
        ...profile,
        transcriptDocuments: [...currentDocuments, data.document],
      });

      window.localStorage.setItem(
        BELLINI_STUDENT_PROFILE_STORAGE_KEY,
        JSON.stringify(nextProfile),
      );

      await upsertRemoteBelliniStudentProfile({
        sessionId: profileSession.sessionId,
        profile: nextProfile,
        majors: loadBelliniStudentProfileMajors(),
      });

      setPendingDocument(null);
      setSavedDocuments(nextProfile.transcriptDocuments ?? []);
      setSelectedDocumentPath(data.document.path);
      setStatusMessage(
        `Saved ${data.document.fileName} to your profile storage in Supabase.`,
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? `Unable to save document to profile: ${error.message}`
          : 'Unable to save document to profile.',
      );
    } finally {
      setIsProcessingFile(false);
    }
  }

  async function resetTranscript() {
    if (pendingDocument) {
      await deletePendingDocument();
    }

    setTranscriptText('');
    setCourses([]);
    setSourceName('');
    setPendingDocument(null);
    window.localStorage.removeItem(TRANSCRIPT_STORAGE_KEY);
    setStatusMessage('Transcript workspace reset.');
  }

  return (
    <main className="degrees-page transcript-upload-page">
      <section className="degrees-hero transcript-upload-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">transcript tool</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/current-bellini-student#majors"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Transcript Upload and Extraction</h1>
        <p>
          Upload a PDF transcript through Supabase extraction, or paste copied
          transcript text to identify courses, credits, grades, and
          Bellini major-change advising checkpoints.
        </p>
        <aside className="transcript-privacy-warning">
          <AlertTriangle size={24} aria-hidden="true" />
          <p>
            This prototype is for unofficial transcript review only. Do not
            upload official records or sensitive documents unless you are
            comfortable using this storage and extraction process.
          </p>
        </aside>
      </section>

      <section className="transcript-workspace">
        <article className="transcript-panel transcript-input-panel">
          <div className="transcript-panel-heading">
            <Upload size={24} aria-hidden="true" />
            <div>
              <h2>Upload or Paste Text</h2>
              <p>
                PDFs are uploaded to private Supabase Storage. Text extraction
                runs in your browser, then you decide whether to keep or delete
                the uploaded PDF.
              </p>
            </div>
          </div>

          {savedDocuments.length > 0 ? (
            <section
              className="transcript-saved-documents"
              aria-labelledby="transcript-saved-documents-title"
            >
              <div className="transcript-saved-documents-heading">
                <FileText size={20} aria-hidden="true" />
                <div>
                  <h3 id="transcript-saved-documents-title">
                    Use a saved document
                  </h3>
                  <p>
                    Choose a transcript PDF already saved to this profile and
                    extract courses from it again.
                  </p>
                </div>
              </div>
              <div className="transcript-saved-document-controls">
                <label>
                  <span>Saved transcript</span>
                  <select
                    value={activeDocumentPath}
                    onChange={(event) =>
                      setSelectedDocumentPath(event.target.value)
                    }
                    disabled={isProcessingFile}
                  >
                    {savedDocuments.map((document) => (
                      <option value={document.path} key={document.path}>
                        {document.fileName} - Saved{' '}
                        {new Date(document.savedAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={loadSavedDocumentForExtraction}
                  disabled={!selectedSavedDocument || isProcessingFile}
                >
                  <ClipboardList size={18} aria-hidden="true" />
                  Extract saved PDF
                </button>
              </div>
            </section>
          ) : null}

          <label className="transcript-file-drop">
            <Download size={22} aria-hidden="true" />
            <span>{sourceName || 'Choose a PDF or .txt transcript export'}</span>
            <input
              type="file"
              accept="application/pdf,.pdf,.txt,text/plain"
              onChange={handleFileUpload}
              disabled={isProcessingFile}
            />
          </label>

          <label className="transcript-textarea-label">
            <span>Transcript text</span>
            <textarea
              value={transcriptText}
              onChange={(event) => setTranscriptText(event.target.value)}
              placeholder="Paste copied transcript text here. Example: Fall 2025&#10;COP 2510 Programming Concepts 3.00 A"
              rows={12}
            />
          </label>

          <div className="transcript-actions">
            <button
              type="button"
              onClick={handleTextExtraction}
              disabled={isProcessingFile}
            >
              <ClipboardList size={18} aria-hidden="true" />
              Extract Courses
            </button>
            <button
              className="secondary"
              type="button"
              onClick={resetTranscript}
              disabled={isProcessingFile}
            >
              <RotateCcw size={18} aria-hidden="true" />
              Reset
            </button>
            <button
              type="button"
              onClick={saveSummary}
              disabled={courses.length === 0 || isProcessingFile}
            >
              <Save size={18} aria-hidden="true" />
              Save Reviewed Summary
            </button>
          </div>

          <p className="transcript-status">{statusMessage}</p>
          {pendingDocument ? (
            <aside className="transcript-document-consent">
              <div>
                <h3>Save this PDF to your profile?</h3>
                <p>
                  The extracted course rows are ready to review. The uploaded
                  PDF is still in temporary Supabase storage until you choose
                  whether to keep it with your profile or delete it.
                </p>
              </div>
              <div className="transcript-document-consent-actions">
                <button
                  type="button"
                  onClick={savePendingDocumentToProfile}
                  disabled={isProcessingFile}
                >
                  <Save size={18} aria-hidden="true" />
                  Save document to profile
                </button>
                <button
                  className="secondary"
                  type="button"
                  onClick={deletePendingDocument}
                  disabled={isProcessingFile}
                >
                  Delete uploaded PDF
                </button>
              </div>
            </aside>
          ) : null}
        </article>
      </section>

      <section className="transcript-results-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Extracted information</p>
          <h2>Review Course Rows</h2>
        </div>

        <div className="transcript-table-actions">
          <div className="transcript-table-primary-actions">
            <button type="button" onClick={addCourse}>
              <Plus size={18} aria-hidden="true" />
              Add course
            </button>
            <button
              type="button"
              onClick={handlePrintCourseList}
              disabled={courses.length === 0}
            >
              <Printer size={18} aria-hidden="true" />
              Print Course List
            </button>
          </div>
          <button
            className="danger"
            type="button"
            onClick={removeAllCourses}
            disabled={courses.length === 0}
          >
            <Trash2 size={18} aria-hidden="true" />
            Remove all courses
          </button>
        </div>
        <p className="transcript-course-count">
          {courses.length === 1
            ? '1 course extracted'
            : `${courses.length} courses extracted`}
        </p>

        {courses.length > 0 ? (
          <div
            className="transcript-course-table"
            aria-label="Printable extracted course list"
          >
            <div className="transcript-print-heading">
              <h2>Extracted Course List</h2>
              <p>
                {sourceName ? `Source: ${sourceName}` : 'Source: Transcript review'}
              </p>
              <p>Printed {new Date().toLocaleDateString()}</p>
            </div>
            <div className="transcript-course-header">
              <span>Course</span>
              <span>Title</span>
              <span>Letter grade</span>
              <span>Credits earned</span>
              <span>Term</span>
              <span>Status</span>
              <span>Area</span>
              <span>Remove</span>
            </div>
            {courses.map((course) => {
              const blankFields = getBlankCourseFields(course);
              const isIncomplete = blankFields.length > 0;

              return (
                <div
                  className={`transcript-course-row${
                    isIncomplete ? ' transcript-course-row-incomplete' : ''
                  }`}
                  key={course.id}
                >
                  <input
                    aria-label="Course code"
                    value={course.code}
                    onChange={(event) =>
                      updateCourse(course.id, 'code', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.code)}
                  </span>
                  <textarea
                    className="transcript-course-title-field"
                    aria-label="Course title"
                    value={course.title}
                    rows={2}
                    onChange={(event) =>
                      updateCourse(course.id, 'title', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.title)}
                  </span>
                  <input
                    aria-label="Letter grade"
                    value={course.letterGrade}
                    onChange={(event) =>
                      updateCourse(course.id, 'letterGrade', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.letterGrade)}
                  </span>
                  <input
                    aria-label="Credits earned"
                    value={course.creditsEarned}
                    onChange={(event) =>
                      updateCourse(course.id, 'creditsEarned', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.creditsEarned)}
                  </span>
                  <input
                    aria-label="Term"
                    value={course.term}
                    onChange={(event) =>
                      updateCourse(course.id, 'term', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.term)}
                  </span>
                  <select
                    aria-label="Course status"
                    value={course.status}
                    onChange={(event) =>
                      updateCourse(course.id, 'status', event.target.value)
                    }
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In progress</option>
                    <option value="unknown">Unknown</option>
                  </select>
                  <span className="transcript-print-value">
                    {course.status === 'in-progress'
                      ? 'In progress'
                      : course.status === 'completed'
                        ? 'Completed'
                        : 'Unknown'}
                  </span>
                  <input
                    aria-label="Course area"
                    value={course.category}
                    onChange={(event) =>
                      updateCourse(course.id, 'category', event.target.value)
                    }
                  />
                  <span className="transcript-print-value">
                    {getPrintValue(course.category)}
                  </span>
                  <button
                    className="transcript-remove-button"
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    aria-label={`Remove ${course.code || 'course'}`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                  {isIncomplete ? (
                    <p className="transcript-course-warning">
                      Fill in the blank fields before saving: {blankFields.join(', ')}.
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <article className="transcript-empty-state">
            <h3>No courses extracted yet</h3>
            <p>
              Upload a PDF, paste transcript text, upload a `.txt` export, or
              add course rows manually.
            </p>
          </article>
        )}
      </section>

      {showPrintWarning ? (
        <div
          className="transcript-print-warning-overlay"
          role="presentation"
          onClick={() => setShowPrintWarning(false)}
        >
          <section
            aria-labelledby="transcript-print-warning-title"
            aria-modal="true"
            className="transcript-print-warning-dialog"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="transcript-print-warning-icon">
              <AlertTriangle size={26} aria-hidden="true" />
            </div>
            <div>
              <p className="degrees-eyebrow">Print warning</p>
              <h2 id="transcript-print-warning-title">
                Some courses are incomplete
              </h2>
              <p>
                {incompleteCourses.length}{' '}
                {incompleteCourses.length === 1 ? 'course has' : 'courses have'}{' '}
                blank fields. The printed list will show missing values as
                dashes.
              </p>
              <ul className="transcript-print-warning-list">
                {incompleteCourses.slice(0, 4).map(({ course, index, blankFields }) => (
                  <li key={course.id}>
                    <strong>{course.code.trim() || `Course ${index + 1}`}</strong>:{' '}
                    {blankFields.join(', ')}
                  </li>
                ))}
              </ul>
              {incompleteCourses.length > 4 ? (
                <p className="transcript-print-warning-more">
                  And {incompleteCourses.length - 4} more incomplete{' '}
                  {incompleteCourses.length - 4 === 1 ? 'course' : 'courses'}.
                </p>
              ) : null}
            </div>
            <div className="transcript-print-warning-actions">
              <button type="button" onClick={() => setShowPrintWarning(false)}>
                Review Courses
              </button>
              <button
                className="secondary"
                type="button"
                onClick={printCourseListWithIncompleteRows}
              >
                <Printer size={18} aria-hidden="true" />
                Print Anyway
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default TranscriptUpload;
