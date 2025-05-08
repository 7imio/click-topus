import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AnimationState {
  popEffect: boolean;
}

const initialState: AnimationState = {
  popEffect: false,
};

const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    triggerPopEffect: (state) => {
      state.popEffect = true;
    },
    clearPopEffect: (state) => {
      state.popEffect = false;
    },
    hydrate: (state, action: PayloadAction<AnimationState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { triggerPopEffect, clearPopEffect, hydrate } =
  animationSlice.actions;
export default animationSlice.reducer;
