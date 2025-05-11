import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCost } from '../../helpers/math-utils';

export type CorruptionState = {
  totalHarvestedCorruption: number;
  corruption: number;
  baseCost: number;
  currentCost: number;
  purchasedItems: string[];
  count: number;
};

const initialState: CorruptionState = {
  totalHarvestedCorruption: 0,
  corruption: 0,
  baseCost: 100,
  currentCost: 100,
  purchasedItems: [],
  count: 0,
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
    setTotalHarvestedCorruption: (state, actions) => {
      state.totalHarvestedCorruption = actions.payload;
    },
    buyCorruptionItem: (state, actions: PayloadAction<{ name: string }>) => {
      const { name } = actions.payload;
      if (state.corruption >= state.currentCost) {
        state.purchasedItems.push(name);
        state.count += 1;
        state.corruption -= state.currentCost;
        updateCost(state);
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
  setTotalHarvestedCorruption,
} = corruptionSlice.actions;
export default corruptionSlice.reducer;
