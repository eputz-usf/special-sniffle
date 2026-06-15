const BELLINI_STUDENT_PROFILE_MAJORS_STORAGE_KEY = 'cic_bellini_student_profile_majors';

export type BelliniStudentProfileMajor = {
  slug: string;
  name: string;
};

function isBelliniStudentProfileMajor(
  value: unknown,
): value is BelliniStudentProfileMajor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const major = value as Partial<BelliniStudentProfileMajor>;
  return typeof major.slug === 'string' && typeof major.name === 'string';
}

export function loadBelliniStudentProfileMajors(): BelliniStudentProfileMajor[] {
  const savedMajors = window.localStorage.getItem(
    BELLINI_STUDENT_PROFILE_MAJORS_STORAGE_KEY,
  );

  if (!savedMajors) {
    return [];
  }

  try {
    const parsedMajors = JSON.parse(savedMajors);

    if (Array.isArray(parsedMajors)) {
      return parsedMajors.filter(isBelliniStudentProfileMajor);
    }
  } catch {
    window.localStorage.removeItem(BELLINI_STUDENT_PROFILE_MAJORS_STORAGE_KEY);
  }

  return [];
}

export function saveBelliniStudentProfileMajors(
  majors: BelliniStudentProfileMajor[],
) {
  window.localStorage.setItem(
    BELLINI_STUDENT_PROFILE_MAJORS_STORAGE_KEY,
    JSON.stringify(majors),
  );
}

export function addBelliniStudentProfileMajor(
  major: BelliniStudentProfileMajor,
): BelliniStudentProfileMajor[] {
  const currentMajors = loadBelliniStudentProfileMajors();

  if (currentMajors.some((currentMajor) => currentMajor.slug === major.slug)) {
    return currentMajors;
  }

  const nextMajors = [...currentMajors, major];
  saveBelliniStudentProfileMajors(nextMajors);

  return nextMajors;
}

export function removeBelliniStudentProfileMajor(
  slug: string,
): BelliniStudentProfileMajor[] {
  const nextMajors = loadBelliniStudentProfileMajors().filter(
    (major) => major.slug !== slug,
  );
  saveBelliniStudentProfileMajors(nextMajors);

  return nextMajors;
}
