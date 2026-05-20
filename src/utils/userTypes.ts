import type { UserType, UserTypeOption } from '../types/user';

export const userTypeOptions: UserTypeOption[] = [
  {
    id: 'prospective-student',
    label: 'High School / Prospective Student',
    dashboardRoute: '/dashboard/student',
  },
  {
    id: 'current-usf-student',
    label: 'Current USF Student in Another Major',
    dashboardRoute: '/dashboard/student',
  },
  {
    id: 'current-bellini-student',
    label: 'Current Bellini College Student Considering Switching Degrees',
    dashboardRoute: '/dashboard/student',
  },
  {
    id: 'transfer-student',
    label: 'Transfer Student from a Community or State College',
    dashboardRoute: '/dashboard/student',
  },
  {
    id: 'advisor-staff',
    label: 'Academic Advisor / College Staff',
    dashboardRoute: '/dashboard/advisor',
  },
];

export function getDashboardRoute(userType: UserType) {
  return userTypeOptions.find((option) => option.id === userType)
    ?.dashboardRoute;
}

export function isUserType(value: string | null): value is UserType {
  return userTypeOptions.some((option) => option.id === value);
}
