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
};
