import type { UserType } from '../types/user';
import { isUserType } from './userTypes';

const userTypeKey = 'cicUserType';

export type UserSessionStore = {
  saveUserType: (userType: UserType) => Promise<void>;
  getUserType: () => Promise<UserType | null>;
};

const localUserSessionStore: UserSessionStore = {
  async saveUserType(userType) {
    localStorage.setItem(userTypeKey, userType);
  },
  async getUserType() {
    const savedUserType = localStorage.getItem(userTypeKey);

    return isUserType(savedUserType) ? savedUserType : null;
  },
};

export const userSessionStore = localUserSessionStore;
