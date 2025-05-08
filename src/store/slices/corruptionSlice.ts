import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CorruptionState = {
  totalHarvestedCorruption: number;
  corruption: number;
  purchasedItems: string[];
};

const initialState: CorruptionState = {
  totalHarvestedCorruption: 0,
  corruption: 0,
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
    buyCorruptionItem: (
      state,
      actions: PayloadAction<{ name: string; cost: number }>
    ) => {
      const { name, cost } = actions.payload;
      if (state.corruption >= cost) {
        state.purchasedItems.push(name);
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
