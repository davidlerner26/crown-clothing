import type { UnknownAction } from 'redux';

import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
  navigateToHome,
} from './user.action';

import type { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly signInError: Error | null;
  readonly signUpError: Error | null;
  readonly signOutError: Error | null;
  readonly navigateToHome: boolean;
};

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  signInError: null,
  signUpError: null,
  signOutError: null,
  navigateToHome: false,
};

export const userReducer = (state = INITIAL_STATE, action: UnknownAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (signInFailed.match(action)) {
    return { ...state, signInError: action.payload };
  }

  if (signUpFailed.match(action)) {
    return { ...state, signUpError: action.payload };
  }

  if (signOutFailed.match(action)) {
    return { ...state, signOutError: action.payload };
  }

  if (navigateToHome.match(action)) {
    return { ...state, navigateToHome: true };
  }

  return state;
};
