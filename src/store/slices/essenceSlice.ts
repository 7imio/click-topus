import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EssenceState = {
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
    increment: (state) => {
      state.essence += 1;
      state.totalHarvestedEssence += 1;
    },
    reset: (state) => {
      state.essence = 0;
      state.totalHarvestedEssence = 0;
    },
    setEssence: (state, actions) => {
      state.essence = actions.payload;
    },
    spendEssence: (
      state,
      actions: PayloadAction<{ name: string; cost: number }>
    ) => {
      const { name, cost } = actions.payload;
      if (state.essence >= cost) {
        state.essence -= cost;
        state.purchasedItems.push(name);
      }
    },
  },
});

export const { increment, reset, setEssence, spendEssence } =
  essenceSlice.actions;
export default essenceSlice.reducer;
