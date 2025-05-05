import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AutoClickerState {
  count: number;
  baseCost: number;
  currentCost: number;
}
const initialState: AutoClickerState = {
  count: 0,
  baseCost: 200,
  currentCost: 200,
};

const autoClickerState = createSlice({
  name: 'autoClicker',
  initialState,
  reducers: {
    buyAutoClicker: (state) => {
      state.count += 1;
      state.currentCost += Math.floor(
        state.baseCost * Math.pow(1.2, state.count)
      );
    },
    resetAutoClickers: (state) => {
      state.count = 0;
      state.currentCost = state.baseCost;
    },
    setAutoClickers: (state, action: PayloadAction<AutoClickerState>) => {
      state.count = action.payload.count;
      state.baseCost = action.payload.baseCost;
      state.currentCost = action.payload.currentCost;
    },
  },
});

export const { buyAutoClicker, resetAutoClickers, setAutoClickers } =
  autoClickerState.actions;
export default autoClickerState.reducer;
