import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExponentialGrowth } from '../../helpers/math-utils';

export type CorruptionState = {
  totalHarvestedCorruption: number;
  corruption: number;
  baseCost: number;
  currentCost: number;
  purchasedItems: string[];
};

const initialState: CorruptionState = {
  totalHarvestedCorruption: 0,
  corruption: 0,
  baseCost: 100,
  currentCost: 100,
  purchasedItems: [],
};

const corruptionSlice = createSlice({
  name: 'corruption',
  initialState,
  reducers: {
    incrementCorruption: (state) => {
      state.corruption += 1;
      state.totalHarvestedCorruption += 1;
    },
    emptyCorruption: (state) => {
      state.corruption = 0;
    },
    resetCorruption: (_state) => {
      return initialState;
    },
    setCorruption: (state, actions) => {
      state.corruption = actions.payload;
    },
    buyCorruptionItem: (state, actions: PayloadAction<{ name: string }>) => {
      const { name } = actions.payload;
      if (state.corruption >= state.currentCost) {
        state.purchasedItems.push(name);
        state.corruption -= state.currentCost;
        const newCost = getExponentialGrowth(state.purchasedItems.length);
        state.currentCost = newCost;
      }
    },

    hydrate: (state, action: PayloadAction<CorruptionState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  incrementCorruption,
  resetCorruption,
  setCorruption,
  buyCorruptionItem,
  emptyCorruption,
  hydrate,
} = corruptionSlice.actions;
export default corruptionSlice.reducer;
