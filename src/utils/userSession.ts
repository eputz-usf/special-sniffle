import type { UserType } from '../types/user';
import { isUserType } from './userTypes';

const userTypeKey = 'cicUserType';

export type UserSessionStore = {
  saveUserType: (userType: UserType) => Promise<void>;
  getUserType: () => Promise<UserType | null>;
};

const localUserSessionStore: UserSessionStore = {
  async saveUserType(userType) {
    try {
      localStorage.setItem(userTypeKey, userType);
    } catch {
      // Public navigation remains available when browser storage is blocked.
    }
  },
  async getUserType() {
    try {
      const savedUserType = localStorage.getItem(userTypeKey);
      return isUserType(savedUserType) ? savedUserType : null;
    } catch {
      return null;
    }
  },
};

export const userSessionStore = localUserSessionStore;
