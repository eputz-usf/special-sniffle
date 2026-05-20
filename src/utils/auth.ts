import type { UserType } from '../types/user';
import { isUserType } from './userTypes';

type CreateAccountInput = {
  fullName: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

const accountCreatedKey = 'cicAccountCreated';
const userTypeKey = 'cicUserType';

export async function createAccount(input: CreateAccountInput) {
  localStorage.setItem(accountCreatedKey, 'true');
  localStorage.setItem('cicUserEmail', input.email);
  localStorage.setItem('cicUserName', input.fullName);

  return {
    userId: 'temporary-local-user',
  };
}

export async function login(input: LoginInput) {
  localStorage.setItem('cicUserEmail', input.email);

  return {
    userId: 'temporary-local-user',
  };
}

export async function saveUserType(userType: UserType) {
  localStorage.setItem(userTypeKey, userType);
}

export async function getSavedUserType() {
  const savedUserType = localStorage.getItem(userTypeKey);

  return isUserType(savedUserType) ? savedUserType : null;
}
