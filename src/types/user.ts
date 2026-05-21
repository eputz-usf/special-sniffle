export type UserType =
  | 'prospective-student'
  | 'current-usf-student'
  | 'current-bellini-student'
  | 'transfer-student'
  | 'advisor-staff';

export type UserTypeOption = {
  id: UserType;
  label: string;
  dashboardRoute: string;
  icon?: 'backpack' | 'graduation-cap' | 'notebook-pen' | 'cpu' | 'university';
  logoSrc?: string;
  logoAlt?: string;
};
