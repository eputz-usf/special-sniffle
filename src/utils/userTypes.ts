import type { UserType, UserTypeOption } from '../types/user';

export const userTypeOptions: UserTypeOption[] = [
  {
    id: 'prospective-student',
    label: 'High School / Prospective Student',
    dashboardRoute: '/dashboard/prospective-student',
    requiresUsfLogin: false,
    icon: 'backpack',
  },
  {
    id: 'transfer-student',
    label: 'Non USF student',
    dashboardRoute: '/dashboard/transfer-student',
    requiresUsfLogin: false,
    icon: 'graduation-cap',
  },
  {
    id: 'current-usf-student',
    label: 'Current USF Student not in Bellini College',
    dashboardRoute: '/dashboard/current-usf-student',
    requiresUsfLogin: true,
    icon: 'university',
  },
  {
    id: 'current-bellini-student',
    label: 'Current Bellini College Student Considering Switching Degrees',
    dashboardRoute: '/dashboard/current-bellini-student',
    requiresUsfLogin: true,
    icon: 'cpu',
  },
];

export function getDashboardRoute(userType: UserType) {
  return userTypeOptions.find((option) => option.id === userType)
    ?.dashboardRoute;
}

export function isUserType(value: string | null): value is UserType {
  return userTypeOptions.some((option) => option.id === value);
}
