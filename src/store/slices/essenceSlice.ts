import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type EssenceState = {
  totalHarvestedEssence: number;
  essence: number;
  purchasedItems: string[];
};

const initialState: EssenceState = {
  totalHarvestedEssence: 0,
  essence: 0,
  purchasedItems: [],
};

const essenceSlice = createSlice({
  name: 'essence',
  initialState,
  reducers: {
    incrementEssence: (state, actions) => {
      const essence = actions.payload ?? 1;
      state.essence += essence;
      state.totalHarvestedEssence += essence;
    },
    emptyEssence: (state) => {
      state.essence = 0;
    },
    resetEssence: (_state) => {
      return initialState;
    },
    setEssence: (state, actions) => {
      state.essence = actions.payload;
    },
    setTotalHarvestedEssence: (state, action) => {
      state.totalHarvestedEssence = action.payload;
    },
    buyEssenceItem: (
      state,
      actions: PayloadAction<{ name: string; cost: number }>
    ) => {
      const { name, cost } = actions.payload;
      if (state.essence >= cost) {
        state.purchasedItems.push(name);
        state.essence -= cost;
      }
    },
    hydrate: (state, action: PayloadAction<EssenceState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  incrementEssence,
  resetEssence,
  setEssence,
  buyEssenceItem,
  emptyEssence,
  hydrate,
  setTotalHarvestedEssence,
} = essenceSlice.actions;
export default essenceSlice.reducer;
