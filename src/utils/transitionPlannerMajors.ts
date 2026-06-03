const PLANNER_MAJORS_STORAGE_KEY = 'cic_high_school_transition_planner_majors';

export type PlannerMajor = {
  slug: string;
  name: string;
};

function isPlannerMajor(value: unknown): value is PlannerMajor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const major = value as Partial<PlannerMajor>;
  return typeof major.slug === 'string' && typeof major.name === 'string';
}

export function loadPlannerMajors(): PlannerMajor[] {
  const savedMajors = window.localStorage.getItem(PLANNER_MAJORS_STORAGE_KEY);

  if (!savedMajors) {
    return [];
  }

  try {
    const parsedMajors = JSON.parse(savedMajors);

    if (Array.isArray(parsedMajors)) {
      return parsedMajors.filter(isPlannerMajor);
    }
  } catch {
    window.localStorage.removeItem(PLANNER_MAJORS_STORAGE_KEY);
  }

  return [];
}

export function savePlannerMajors(majors: PlannerMajor[]) {
  window.localStorage.setItem(
    PLANNER_MAJORS_STORAGE_KEY,
    JSON.stringify(majors),
  );
}

export function addPlannerMajor(major: PlannerMajor): PlannerMajor[] {
  const currentMajors = loadPlannerMajors();

  if (currentMajors.some((currentMajor) => currentMajor.slug === major.slug)) {
    return currentMajors;
  }

  const nextMajors = [...currentMajors, major];
  savePlannerMajors(nextMajors);

  return nextMajors;
}

export function removePlannerMajor(slug: string): PlannerMajor[] {
  const nextMajors = loadPlannerMajors().filter((major) => major.slug !== slug);
  savePlannerMajors(nextMajors);

  return nextMajors;
}
