import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AutoClickerState {
  count: number;
  click: number;
  baseCost: number;
  currentCost: number;
}
const initialState: AutoClickerState = {
  count: 0,
  click: 1,
  baseCost: 200,
  currentCost: 200,
};

const updateCost = (state: AutoClickerState) => {
  state.currentCost += Math.floor(state.baseCost * Math.pow(1.2, state.count));
};

const autoClickerState = createSlice({
  name: 'autoClicker',
  initialState,
  reducers: {
    buyFirstAutoclicker: (state) => {
      state.count = 1;
      updateCost(state);
    },
    buyAutoClicker: (state) => {
      state.count += 1;
      updateCost(state);
    },
    upgradeAutoclicker: (state) => {
      state.click += 1;
      updateCost(state);
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

export const {
  buyFirstAutoclicker,
  buyAutoClicker,
  resetAutoClickers,
  setAutoClickers,
  upgradeAutoclicker,
} = autoClickerState.actions;
export default autoClickerState.reducer;
