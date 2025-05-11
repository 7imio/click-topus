import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCost } from '../../helpers/math-utils';

export interface AutoClickerState {
  speed: number;
  click: number;
  count: number;
  baseCost: number;
  currentCost: number;
}
const initialState: AutoClickerState = {
  speed: 0,
  click: 1,
  count: 0,
  baseCost: 100,
  currentCost: 100,
};

const autoClickerState = createSlice({
  name: 'autoClicker',
  initialState,
  reducers: {
    buyFirstAutoclicker: (state) => {
      state.speed = 1;
      state.count += 1;
      state.currentCost = updateCost(state.baseCost, state.count);
    },
    buyAutoClicker: (state) => {
      state.speed += 1;
      state.count += 1;
      state.currentCost = updateCost(state.baseCost, state.count);
    },
    upgradeAutoclicker: (state) => {
      state.click += 1;
      state.count += 1;
      state.currentCost = updateCost(state.baseCost, state.count);
    },

    resetAutoClickers: (state) => {
      state.speed = 0;
      state.click = 1;
      state.count = 0;
      state.currentCost = state.baseCost;
    },
    setAutoClickers: (state, action: PayloadAction<AutoClickerState>) => {
      state.speed = action.payload.speed;
      state.baseCost = action.payload.baseCost;
      state.currentCost = action.payload.currentCost;
      state.count = action.payload.count;
    },
    hydrate: (state, action: PayloadAction<AutoClickerState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  buyFirstAutoclicker,
  buyAutoClicker,
  resetAutoClickers,
  setAutoClickers,
  upgradeAutoclicker,
  hydrate,
} = autoClickerState.actions;
export default autoClickerState.reducer;
