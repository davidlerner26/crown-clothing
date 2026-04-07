import { createSelector } from 'reselect';

const selectIsLoadingReducer = (state) => state.loading;

export const selectIsLoading = createSelector(
  [selectIsLoadingReducer],
  (loadingSlice) => loadingSlice.isLoading,
);
