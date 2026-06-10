export type ParsedCourseStatus = 'completed' | 'in-progress' | 'unknown';

export type ParsedTranscriptCourse = {
  code: string;
  title: string;
  letterGrade: string;
  creditsEarned: string;
  qualityPoints: string;
  term: string;
  status: ParsedCourseStatus;
  category: string;
};

const gatewayCoursePrefixes = new Map([
  ['COP', 'Programming'],
  ['COT', 'Computing'],
  ['CDA', 'Computer systems'],
  ['CIS', 'Information systems'],
  ['CNT', 'Networking'],
  ['CGS', 'Computing'],
  ['MAC', 'Math'],
  ['MAD', 'Math'],
  ['MAP', 'Math'],
  ['STA', 'Statistics'],
  ['PHY', 'Science'],
  ['CHM', 'Science'],
  ['BSC', 'Science'],
  ['IDH', 'Honors elective'],
]);

const coursePattern = /\b([A-Z]{2,4})\s*-?\s*(\d{4}[A-Z]?)\b/gi;
const termPattern = /\b(Spring|Summer|Fall)\s+20\d{2}\b/gi;
const fullTermPattern = /^(Spring|Summer|Fall)\s+20\d{2}$/i;
const standaloneTermPattern = /^(Spring|Summer|Fall)$/i;
const gradePattern =
  /(?:^|\s)(A[+-]?|B[+-]?|C[+-]?|D[+-]?|F|S|U|P|W|I|IP|I\/P|TR|NG|NR|In Progress)(?=\s|$)/gi;
const creditPattern = /\b([0-6](?:\.\d{1,3})?)\b/g;
const transcriptMetadataPattern =
  /\b(?:Campus|Camp|Cmp|Location|Site)(?:\s+Code)?\s*(?:T|S|Tampa|SP|St\.?\s*Petersburg|SM|Sarasota(?:\s*-\s*Manatee)?|Online|WEB)?\b|\b(?:Tampa|St\.?\s*Petersburg|Sarasota(?:\s*-\s*Manatee)?|Online)\s+(?:Campus|Camp|Cmp|Location|Site)\b/gi;
const trailingCampusCodePattern = /\s+\b(?:T|S|SP|SM|WEB)\b\s*$/i;
const leadingCampusCodePattern = /^\s*\b(?:T|S|SP|SM|WEB)\b(?=\s+[A-Za-z])/i;
const standaloneCampusCodePattern = /^(?:T|S|SP|SM|WEB)$/i;
const leadingTranscriptNumberPattern =
  /^\s*(?:\d{1,2}(?:\.\d{1,3})?\s+)+(?=[A-Za-z])/;
const embeddedCampusCodePattern =
  /\s+\b(?:T|S|SP|SM|WEB)\b(?=\s+(?:\d{1,4}|Lecture|Lab|Online|Hybrid|In\s*Person|Remote)\b)/gi;
const courseLinePattern = /\b[A-Z]{2,4}\s*-?\s*\d{4}[A-Z]?\b/i;
const webNoisePattern =
  /https?:\/\/|courses\.\s*fl\s*vc\.org|\/Students\/Home\/Transcript|retryCount=|Unofficial Transcript|University of South Florida|Good Academic Standing|Academic Standing|Cambridge AICE Exam|AICE Exam|Cambridge International|Advanced International Certificate|Attempted\s*:|Earned\s*:|GPA Hours\s*:|Quality Points\s*:|GPA\s*:|^\d+\/\d+$|^\d{1,2}\/\d{1,2}\/\d{2,4}\b|^\d{4}-\d{1,2}-\d{1,2}\b|^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b|^\d{1,2}:\d{2}\s*(AM|PM)\b|^Page\s+\d+|^Printed\b|^Generated\b/i;
const profileHeaderNoisePattern =
  /^(Engineering|Computer Science|Beginner,?\s*First time in college|First time in college|Academic Program|Program|College|Major|Student Type|Classification|Degree|Degree Program|Current Program)$/i;
const fakeCoursePrefixPattern = /^(?:T|S)(?:A|B|C|D|F|S|U|P|W|I)$/i;
const transcriptSegmentBoundary = '__TRANSCRIPT_SEGMENT_BOUNDARY__';

type TranscriptLine = {
  text: string;
  start: number;
  end: number;
};

type CourseMatch = RegExpMatchArray & {
  titlePrefix?: string;
  segmentEnd?: number;
};

function normalizeCourseCode(prefix: string, number: string) {
  return `${prefix.toUpperCase()} ${number.toUpperCase()}`;
}

function isLikelyFakeCourseCode(prefix: string) {
  return fakeCoursePrefixPattern.test(prefix);
}

export function categorizeTranscriptCourse(code: string) {
  const prefix = code.split(' ')[0] ?? '';

  return gatewayCoursePrefixes.get(prefix) ?? 'General elective';
}

function inferStatus(grade: string, segment: string): ParsedCourseStatus {
  const normalizedGrade = grade.trim().toUpperCase();

  if (
    ['IP', 'I/P', 'IN-PROGRESS', 'IN PROGRESS', 'TR'].includes(
      normalizedGrade,
    ) ||
    /in[-\s]?progress|currently enrolled|registered/i.test(segment)
  ) {
    return 'in-progress';
  }

  if (/^(A|B|C|D|F|S|U|P|W|I|NG|NR)([+-])?$/.test(normalizedGrade)) {
    return 'completed';
  }

  return 'unknown';
}

function titleCaseTerm(term: string) {
  return term.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getLatestTermBefore(text: string, index: number) {
  let term = '';
  let match: RegExpExecArray | null;

  termPattern.lastIndex = 0;
  while ((match = termPattern.exec(text)) !== null) {
    if (match.index > index) {
      break;
    }

    term = titleCaseTerm(match[0]);
  }

  return term;
}

function cleanCourseTitle(rawTitle: string) {
  const cleanedTitle = rawTitle
    .replaceAll(transcriptSegmentBoundary, ' ')
    .replace(/[-–—:]/g, ' ')
    .replace(termPattern, '')
    .replace(/\bUG\b|\bUndergraduate\b/gi, '')
    .replace(transcriptMetadataPattern, '')
    .replace(/\bAttempted\b|\bEarned\b|\bGPA\b|\bQuality Points\b/gi, '')
    .replace(/\bGood Academic Standing\b|\bAcademic Standing\b/gi, '')
    .replace(/\bGrade\b|\bCredits?\b|\bPoints\b/gi, '')
    .replace(/\b(?:Repeat|Rpts?|Level|Attribute|Instructional Method|Schedule Type)\b/gi, '')
    .replace(leadingCampusCodePattern, '')
    .replace(leadingTranscriptNumberPattern, '')
    .replace(embeddedCampusCodePattern, '')
    .replace(trailingCampusCodePattern, '')
    .replace(/\s+/g, ' ')
    .trim();

  return standaloneTermPattern.test(cleanedTitle) ||
    standaloneCampusCodePattern.test(cleanedTitle) ||
    /^[A-Z]$/.test(cleanedTitle) ||
    !/[A-Za-z]/.test(cleanedTitle)
    ? ''
    : cleanedTitle;
}

function getGradeMatchEnd(match: RegExpMatchArray | undefined) {
  if (!match || match.index === undefined || !match[1]) {
    return undefined;
  }

  const gradeOffset = match[0].lastIndexOf(match[1]);

  return match.index + gradeOffset + match[1].length;
}

function getNumericMatchEnd(match: RegExpMatchArray | undefined) {
  if (!match || match.index === undefined) {
    return undefined;
  }

  return match.index + match[0].length;
}

function mergeTitleParts(leadingTitle: string, trailingTitle: string) {
  if (!leadingTitle) {
    return trailingTitle;
  }

  if (!trailingTitle) {
    return leadingTitle;
  }

  if (leadingTitle.includes(trailingTitle) || trailingTitle.includes(leadingTitle)) {
    return leadingTitle.length >= trailingTitle.length ? leadingTitle : trailingTitle;
  }

  return `${leadingTitle} ${trailingTitle}`.replace(/\s+/g, ' ').trim();
}

function isNoiseLine(line: string) {
  const trimmedLine = line.trim();
  const fakeCourseLineMatch = trimmedLine.match(/^([A-Z]{2})\s*-?\s*(\d{4}[A-Z]?)$/i);

  return (
    !trimmedLine ||
    webNoisePattern.test(trimmedLine) ||
    profileHeaderNoisePattern.test(trimmedLine) ||
    (fakeCourseLineMatch !== null && isLikelyFakeCourseCode(fakeCourseLineMatch[1]))
  );
}

function hasGradeToken(line: string) {
  gradePattern.lastIndex = 0;
  const hasGrade = gradePattern.test(line);
  gradePattern.lastIndex = 0;

  return hasGrade;
}

function getTranscriptLines(text: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  let start = 0;

  text.split(/\n/).forEach((line) => {
    const end = start + line.length;

    if (!isNoiseLine(line)) {
      lines.push({
        text: line.trim(),
        start,
        end,
      });
    }

    start = end + 1;
  });

  return lines;
}

function findLineIndexForPosition(lines: TranscriptLine[], position: number) {
  return lines.findIndex((line) => position >= line.start && position <= line.end);
}

function isPotentialOrphanTitleLine(line: string) {
  const title = cleanCourseTitle(line);

  return (
    title.length > 2 &&
    /[A-Za-z]/.test(title) &&
    !courseLinePattern.test(line) &&
    !hasGradeToken(line)
  );
}

function getPreviousTitleLines(lines: TranscriptLine[], courseLineIndex: number) {
  const titleLines: TranscriptLine[] = [];

  for (let index = courseLineIndex - 1; index >= 0; index -= 1) {
    const line = lines[index];

    if (!line || !isPotentialOrphanTitleLine(line.text)) {
      break;
    }

    titleLines.unshift(line);
  }

  const titleText = titleLines.map((line) => cleanCourseTitle(line.text)).join(' ');

  return titleText.trim().split(/\s+/).length > 1 ? titleLines : [];
}

function isCampusCodeMatch(segment: string, match: RegExpMatchArray) {
  const value = (match[1] ?? match[0]).trim().toUpperCase();

  if (!['T', 'S'].includes(value)) {
    return false;
  }

  const matchIndex = match.index ?? 0;
  const beforeMatch = segment.slice(Math.max(0, matchIndex - 18), matchIndex);
  const afterMatch = segment.slice(matchIndex + match[0].length, matchIndex + 18);

  return (
    /\b(?:Campus|Camp|Cmp|Location|Site)(?:\s+Code)?\s*$/i.test(beforeMatch) ||
    /^\s*(?:Campus|Camp|Cmp|Location|Site)\b/i.test(afterMatch) ||
    (matchIndex === 0 && /^\s+[A-Za-z]/.test(afterMatch))
  );
}

function normalizeTranscriptText(text: string) {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\b([ABCD])\s+([+-])(?=\s|$)/gi, '$1$2')
    .replace(
      /\b([A-Z])\s+([A-Z])\s+([A-Z])\s+([A-Z])\s+(\d)\s*(\d)\s*(\d)\s*(\d)([A-Z]?)\b/g,
      (_match, a, b, c, d, n1, n2, n3, n4, suffix) =>
        `${a}${b}${c}${d} ${n1}${n2}${n3}${n4}${suffix}`,
    )
    .replace(
      /\b([A-Z])\s+([A-Z])\s+([A-Z])\s+(\d)\s*(\d)\s*(\d)\s*(\d)([A-Z]?)\b/g,
      (_match, a, b, c, n1, n2, n3, n4, suffix) =>
        `${a}${b}${c} ${n1}${n2}${n3}${n4}${suffix}`,
    )
    .replace(
      /\b([A-Z])\s+([A-Z])\s+(\d)\s*(\d)\s*(\d)\s*(\d)([A-Z]?)\b/g,
      (_match, a, b, n1, n2, n3, n4, suffix) => {
        if (/^[TS]$/i.test(a) && /^[ABCDFSUPWI]$/i.test(b)) {
          return `${a} ${b} ${n1} ${n2} ${n3}${n4}${suffix}`;
        }

        return `${a}${b} ${n1}${n2}${n3}${n4}${suffix}`;
      },
    );
}

function parseCourseSegment(
  text: string,
  code: string,
  start: number,
  courseCodeLength: number,
  nextStart: number,
  titlePrefix = '',
): ParsedTranscriptCourse {
  const rawSegment = text.slice(start + courseCodeLength, nextStart);
  const segment = rawSegment
    .split(transcriptSegmentBoundary)[0]
    .replace(/\s+/g, ' ')
    .trim();
  const gradeMatches = [...segment.matchAll(gradePattern)].filter(
    (match) => !isCampusCodeMatch(segment, match),
  );
  const creditMatches = [...segment.matchAll(creditPattern)];
  const gradeMatch = gradeMatches.at(-1);
  const numericMatches = creditMatches.filter(
    (match) => Number.parseFloat(match[1]) >= 0,
  );
  const numbersAfterGrade =
    gradeMatch?.index === undefined
      ? numericMatches
      : numericMatches.filter((match) => (match.index ?? 0) > gradeMatch.index);
  const creditsEarnedMatch = numbersAfterGrade[0] ?? numericMatches[0];
  const qualityPointsMatch = numbersAfterGrade[1] ?? numericMatches[1];
  const firstDataIndex = [gradeMatch?.index, creditsEarnedMatch?.index]
    .filter((index): index is number => typeof index === 'number')
    .sort((a, b) => a - b)[0];
  const leadingTitle =
    firstDataIndex === undefined
      ? cleanCourseTitle(segment)
      : cleanCourseTitle(segment.slice(0, firstDataIndex));
  const lastDataEnd = [
    getGradeMatchEnd(gradeMatch),
    getNumericMatchEnd(creditsEarnedMatch),
    getNumericMatchEnd(qualityPointsMatch),
  ]
    .filter((index): index is number => typeof index === 'number')
    .sort((a, b) => b - a)[0];
  const trailingTitle =
    lastDataEnd === undefined ? '' : cleanCourseTitle(segment.slice(lastDataEnd));
  const title = mergeTitleParts(
    cleanCourseTitle(titlePrefix),
    mergeTitleParts(leadingTitle, trailingTitle),
  );
  const letterGrade = gradeMatch?.[1] ?? '';
  const creditsEarned = creditsEarnedMatch?.[1] ?? '';
  const qualityPoints = qualityPointsMatch?.[1] ?? '';

  return {
    code,
    title,
    letterGrade,
    creditsEarned,
    qualityPoints,
    term: getLatestTermBefore(text, start),
    status: inferStatus(letterGrade, segment),
    category: categorizeTranscriptCourse(code),
  };
}

export function parseTranscriptText(text: string): ParsedTranscriptCourse[] {
  const normalizedText = normalizeTranscriptText(text)
    .split(/\n/)
    .map((line) => (isNoiseLine(line) ? transcriptSegmentBoundary : line))
    .join('\n');
  const transcriptLines = getTranscriptLines(normalizedText);
  const matches = [...normalizedText.matchAll(coursePattern)].filter(
    (match) => !fullTermPattern.test(match[0]) && !isLikelyFakeCourseCode(match[1]),
  ) as CourseMatch[];

  matches.forEach((match) => {
    const courseLineIndex = findLineIndexForPosition(
      transcriptLines,
      match.index ?? 0,
    );
    const previousTitleLines = getPreviousTitleLines(
      transcriptLines,
      courseLineIndex,
    );

    if (previousTitleLines.length > 0) {
      match.titlePrefix = previousTitleLines.map((line) => line.text).join(' ');
      match.segmentEnd = previousTitleLines[0].start;
    }
  });

  return matches
    .map((match, index) => {
      const code = normalizeCourseCode(match[1], match[2]);
      const start = match.index ?? 0;
      const nextStart =
        matches[index + 1]?.segmentEnd ??
        matches[index + 1]?.index ??
        Math.min(normalizedText.length, start + 360);

      return parseCourseSegment(
        normalizedText,
        code,
        start,
        match[0].length,
        nextStart,
        match.titlePrefix,
      );
    })
    .filter((course, index, courses) => {
      const hasUsefulData =
        course.title || course.creditsEarned || course.letterGrade;
      const firstOccurrence =
        courses.findIndex(
          (candidate) =>
            candidate.code === course.code &&
            candidate.term === course.term &&
            candidate.title === course.title,
        ) === index;

      return hasUsefulData && firstOccurrence;
    });
}
