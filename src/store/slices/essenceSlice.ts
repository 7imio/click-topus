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
    incrementEssence: (state) => {
      state.essence += 1;
      state.totalHarvestedEssence += 1;
    },
    emptyEssence: (state) => {
      state.essence = 0;
    },
    resetEssence: (state) => {
      state = initialState;
    },
    setEssence: (state, actions) => {
      state.essence = actions.payload;
    },
    buyEssenceItem: (
      state,
      actions: PayloadAction<{ name: string; cost: number }>
    ) => {
      const { name, cost } = actions.payload;
      if (state.essence >= cost) {
        state.purchasedItems.push(name);
      }
    },
  },
});

export const {
  incrementEssence,
  resetEssence,
  setEssence,
  buyEssenceItem,
  emptyEssence,
} = essenceSlice.actions;
export default essenceSlice.reducer;
