export type UserType =
  | 'prospective-student'
  | 'current-usf-student'
  | 'current-bellini-student'
  | 'transfer-student';

export type UserTypeOption = {
  id: UserType;
  label: string;
  dashboardRoute: string;
  requiresUsfLogin: boolean;
  icon?: 'backpack' | 'graduation-cap' | 'cpu' | 'university';
  logoSrc?: string;
  logoAlt?: string;
};
