import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HydrationState {
  hydrated: boolean;
}

const initialState: HydrationState = {
  hydrated: false,
};

const hydrationSlice = createSlice({
  name: 'hydration',
  initialState,
  reducers: {
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },
  },
});

export const { setHydrated } = hydrationSlice.actions;
export default hydrationSlice.reducer;
