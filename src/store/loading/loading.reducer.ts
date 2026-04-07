import { createSlice } from '@reduxjs/toolkit';

export const LOADING_INITIAL_STATE = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: LOADING_INITIAL_STATE,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
