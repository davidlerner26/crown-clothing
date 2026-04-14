import { createSelector } from 'reselect';

import type { RootState } from '../store';

import type { UserState } from './user.reducer';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
);

export const selectSignInError = createSelector(
  selectUserReducer,
  (user) => user.signInError,
);

export const selectSignUpError = createSelector(
  selectUserReducer,
  (user) => user.signUpError,
);

export const selectSignOutError = createSelector(
  selectUserReducer,
  (user) => user.signOutError,
);

export const selectSignOutSuccess = createSelector(
  selectUserReducer,
  (user) => user.signOutSuccess,
);
