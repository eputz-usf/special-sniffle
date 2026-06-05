const CURRENT_USF_PROFILE_MAJORS_STORAGE_KEY = 'cic_current_usf_profile_majors';

export type CurrentUsfProfileMajor = {
  slug: string;
  name: string;
};

function isCurrentUsfProfileMajor(
  value: unknown,
): value is CurrentUsfProfileMajor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const major = value as Partial<CurrentUsfProfileMajor>;
  return typeof major.slug === 'string' && typeof major.name === 'string';
}

export function loadCurrentUsfProfileMajors(): CurrentUsfProfileMajor[] {
  const savedMajors = window.localStorage.getItem(
    CURRENT_USF_PROFILE_MAJORS_STORAGE_KEY,
  );

  if (!savedMajors) {
    return [];
  }

  try {
    const parsedMajors = JSON.parse(savedMajors);

    if (Array.isArray(parsedMajors)) {
      return parsedMajors.filter(isCurrentUsfProfileMajor);
    }
  } catch {
    window.localStorage.removeItem(CURRENT_USF_PROFILE_MAJORS_STORAGE_KEY);
  }

  return [];
}

export function saveCurrentUsfProfileMajors(
  majors: CurrentUsfProfileMajor[],
) {
  window.localStorage.setItem(
    CURRENT_USF_PROFILE_MAJORS_STORAGE_KEY,
    JSON.stringify(majors),
  );
}

export function addCurrentUsfProfileMajor(
  major: CurrentUsfProfileMajor,
): CurrentUsfProfileMajor[] {
  const currentMajors = loadCurrentUsfProfileMajors();

  if (currentMajors.some((currentMajor) => currentMajor.slug === major.slug)) {
    return currentMajors;
  }

  const nextMajors = [...currentMajors, major];
  saveCurrentUsfProfileMajors(nextMajors);

  return nextMajors;
}

export function removeCurrentUsfProfileMajor(
  slug: string,
): CurrentUsfProfileMajor[] {
  const nextMajors = loadCurrentUsfProfileMajors().filter(
    (major) => major.slug !== slug,
  );
  saveCurrentUsfProfileMajors(nextMajors);

  return nextMajors;
}
