import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCost } from '../../helpers/math-utils';

export type FervorState = {
  totalHarvestedFervor: number;
  fervor: number;
  baseCost: number;
  currentCost: number;
  purchasedItems: string[];
  count: number;
  fervorMultiplicator: number;
};

const initialState: FervorState = {
  totalHarvestedFervor: 0,
  fervor: 0,
  baseCost: 100,
  currentCost: 100,
  purchasedItems: [],
  count: 0,
  fervorMultiplicator: 12,
};

const fervorSlice = createSlice({
  name: 'fervor',
  initialState,
  reducers: {
    incrementFervor: (state) => {
      state.fervor += 1;
      state.totalHarvestedFervor += 1;
    },
    emptyFervor: (state) => {
      state.fervor = 0;
    },
    resetFervor: (_state) => {
      return initialState;
    },
    setFervor: (state, actions) => {
      state.fervor = actions.payload;
    },
    setTotalHarvestedFervor: (state, actions) => {
      state.totalHarvestedFervor = actions.payload;
    },
    incrementFervorCount: (state) => {
      state.count += 1;
    },
    addFervor: (state, action: PayloadAction<number>) => {
      state.fervor += action.payload;
      state.totalHarvestedFervor += action.payload;
    },
    buyFervorItem: (state, actions) => {
      const { name } = actions.payload;
      if (state.fervor >= state.currentCost) {
        state.purchasedItems.push(name);
        state.count += 1;
        state.fervor -= state.currentCost;
        state.currentCost = updateCost(state.baseCost, state.count);
      }
    },
    hydrate: (state, action: PayloadAction<FervorState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  incrementFervor,
  resetFervor,
  setFervor,
  addFervor,
  buyFervorItem,
  emptyFervor,
  hydrate,
  setTotalHarvestedFervor,
  incrementFervorCount,
} = fervorSlice.actions;
export default fervorSlice.reducer;
