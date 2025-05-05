import { createSlice } from '@reduxjs/toolkit';

interface DebugState {
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
      console.warn(`DEBUG MOD IS NOW ${state.DEBUG ? 'ON' : 'OFF'}`);
    },
  },
});

export const { triggerDebug } = debugSlice.actions;

export default debugSlice.reducer;
