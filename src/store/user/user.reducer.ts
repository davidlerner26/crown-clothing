import type { UnknownAction } from 'redux';

import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
  signInIsLoading,
  signUpIsLoading,
} from './user.action';

import type { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly signInIsLoading: boolean;
  readonly signInError: Error | null;
  readonly signUpIsLoading: boolean;
  readonly signUpError: Error | null;
  readonly signOutError: Error | null;
  readonly signOutSuccess: boolean;
};

export const INITIAL_STATE: UserState = {
  currentUser: null,
  signInIsLoading: false,
  signInError: null,
  signUpIsLoading: false,
  signUpError: null,
  signOutError: null,
  signOutSuccess: false,
};

export const userReducer = (state = INITIAL_STATE, action: UnknownAction) => {
  if (signInIsLoading.match(action)) {
    return { ...state, signInIsLoading: action.payload };
  }

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, signOutSuccess: true };
  }

  if (signInFailed.match(action)) {
    return { ...state, signInError: action.payload };
  }

  if (signUpIsLoading.match(action)) {
    return { ...state, signUpIsLoading: action.payload };
  }

  if (signUpFailed.match(action)) {
    return { ...state, signUpError: action.payload };
  }

  if (signOutFailed.match(action)) {
    return { ...state, signOutError: action.payload };
  }

  return state;
};
