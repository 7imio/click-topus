import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCost } from '../../helpers/math-utils';

export type CorruptionState = {
  totalHarvestedCorruption: number;
  corruption: number;
  baseCost: number;
  currentCost: number;
  purchasedItems: string[];
  count: number;
  skillMultiplicator: number;
  rerollMultiplicator: number;
};

const initialState: CorruptionState = {
  totalHarvestedCorruption: 0,
  corruption: 0,
  baseCost: 100,
  currentCost: 100,
  purchasedItems: [],
  count: 0,
  skillMultiplicator: 10,
  rerollMultiplicator: 50,
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
        state.currentCost = updateCost(state.baseCost, state.count);
      }
    },
    addSkillToCreature: (
      state,
      action: PayloadAction<{ creatureId: string; skillId: string }>
    ) => {
      const { creatureId, skillId } = action.payload;
      const price = state.currentCost * state.skillMultiplicator;
      if (state.corruption > price) {
        state.corruption -= price;
        state.count += 1;
        state.purchasedItems.push(`${skillId}-${creatureId}`);
        state.currentCost = updateCost(state.baseCost, state.count);
      }
    },
    hydrate: (state, action: PayloadAction<CorruptionState>) => {
      return { ...state, ...action.payload };
    },
    rerollCreatureSkills: (
      state,
      action: PayloadAction<{ creatureId: string }>
    ) => {
      const { creatureId } = action.payload;
      const price = state.currentCost * state.rerollMultiplicator;

      if (state.corruption >= price) {
        state.corruption -= price;
        state.purchasedItems.push(`Reroll-${creatureId}`);
        state.count += 1;
        state.currentCost = updateCost(state.baseCost, state.count);
      }
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
  addSkillToCreature,
  rerollCreatureSkills,
} = corruptionSlice.actions;
export default corruptionSlice.reducer;
