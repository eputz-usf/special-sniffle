import type { UserType, UserTypeOption } from '../types/user';

export const userTypeOptions: UserTypeOption[] = [
  {
    id: 'prospective-student',
    label: 'High School / Prospective Student',
    dashboardRoute: '/dashboard/student',
    icon: 'backpack',
  },
  {
    id: 'current-usf-student',
    label: 'Current USF Student not in Bellini College',
    dashboardRoute: '/dashboard/student',
    icon: 'university',
  },
  {
    id: 'current-bellini-student',
    label: 'Current Bellini College Student Considering Switching Degrees',
    dashboardRoute: '/dashboard/student',
    icon: 'cpu',
  },
  {
    id: 'transfer-student',
    label: 'Non USF student',
    dashboardRoute: '/dashboard/student',
    icon: 'graduation-cap',
  },
  {
    id: 'advisor-staff',
    label: 'Academic Advisor / College Staff',
    dashboardRoute: '/dashboard/advisor',
    icon: 'notebook-pen',
  },
];

export function getDashboardRoute(userType: UserType) {
  return userTypeOptions.find((option) => option.id === userType)
    ?.dashboardRoute;
}

export function isUserType(value: string | null): value is UserType {
  return userTypeOptions.some((option) => option.id === value);
}
