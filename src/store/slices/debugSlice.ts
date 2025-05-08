import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DebugState {
  DEBUG: boolean;
}

const initialState: DebugState = {
  DEBUG: false,
};

const debugSlice = createSlice({
  name: 'debug',
  initialState,
  reducers: {
    triggerDebug: (state) => {
      state.DEBUG = !state.DEBUG;
    },
    hydrate: (state, action: PayloadAction<DebugState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { triggerDebug, hydrate } = debugSlice.actions;

export default debugSlice.reducer;
