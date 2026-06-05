const TRANSFER_PLANNER_MAJORS_STORAGE_KEY = 'cic_transfer_planner_majors';

export type TransferPlannerMajor = {
  slug: string;
  name: string;
};

function isTransferPlannerMajor(value: unknown): value is TransferPlannerMajor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const major = value as Partial<TransferPlannerMajor>;
  return typeof major.slug === 'string' && typeof major.name === 'string';
}

export function loadTransferPlannerMajors(): TransferPlannerMajor[] {
  const savedMajors = window.localStorage.getItem(TRANSFER_PLANNER_MAJORS_STORAGE_KEY);

  if (!savedMajors) {
    return [];
  }

  try {
    const parsedMajors = JSON.parse(savedMajors);

    if (Array.isArray(parsedMajors)) {
      return parsedMajors.filter(isTransferPlannerMajor);
    }
  } catch {
    window.localStorage.removeItem(TRANSFER_PLANNER_MAJORS_STORAGE_KEY);
  }

  return [];
}

export function saveTransferPlannerMajors(majors: TransferPlannerMajor[]) {
  window.localStorage.setItem(
    TRANSFER_PLANNER_MAJORS_STORAGE_KEY,
    JSON.stringify(majors),
  );
}

export function addTransferPlannerMajor(
  major: TransferPlannerMajor,
): TransferPlannerMajor[] {
  const currentMajors = loadTransferPlannerMajors();

  if (currentMajors.some((currentMajor) => currentMajor.slug === major.slug)) {
    return currentMajors;
  }

  const nextMajors = [...currentMajors, major];
  saveTransferPlannerMajors(nextMajors);

  return nextMajors;
}

export function removeTransferPlannerMajor(slug: string): TransferPlannerMajor[] {
  const nextMajors = loadTransferPlannerMajors().filter(
    (major) => major.slug !== slug,
  );
  saveTransferPlannerMajors(nextMajors);

  return nextMajors;
}
