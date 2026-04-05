import { createSelector } from 'reselect';

import type { RootState } from '../store';

import type { UserState } from './user.reducer';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
);

export const selectError = createSelector(
  selectUserReducer,
  (user) => user.error,
);
