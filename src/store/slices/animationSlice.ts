import { createSlice } from '@reduxjs/toolkit';

interface AnimationState {
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
  },
});

export const { triggerPopEffect, clearPopEffect } = animationSlice.actions;
export default animationSlice.reducer;
