import type { UserType } from '../types/user';

export const degreeDashboardRoutes = {
  general: '/dashboard/general#majors',
  'current-usf-student': '/dashboard/current-usf-student#majors',
  'current-bellini-student': '/dashboard/current-bellini-student#majors',
  'transfer-student': '/dashboard/transfer-student#majors',
} as const;

export type DegreeSource = keyof typeof degreeDashboardRoutes;

// Direct degree links have a useful Bellini context even in a fresh browser.
export function getDegreeSource(value: string | null): DegreeSource {
  return value && Object.hasOwn(degreeDashboardRoutes, value)
    ? value as DegreeSource
    : 'current-bellini-student';
}

export function getDegreeUserType(source: DegreeSource): UserType {
  return source === 'general' ? 'transfer-student' : source;
}
