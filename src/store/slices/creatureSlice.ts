import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CreatureState {
  created: number;
  currentEssence: number;
  maxTentacles: number;
  segmentsPerTentacle: number;
  essencePerSegment: number;
  segmentsType: number;
  multiplier: number;
}

const initialState: CreatureState = {
  created: 0,
  currentEssence: 0,
  maxTentacles: 8,
  segmentsPerTentacle: 10,
  essencePerSegment: 10,
  segmentsType: 2,
  multiplier: 1.1,
};

const creatureSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    addTentacleEssence: (
      state,
      action: { payload: { essence: number; essenceForCreature: number } }
    ) => {
      const { essence, essenceForCreature } = action.payload;
      state.currentEssence += essence;
      if (state.currentEssence >= essenceForCreature) {
        state.created += 1;
        state.currentEssence = 0;
      }
    },
    resetCreatures: (state) => {
      state.created = 0;
      state.currentEssence = 0;
    },
    setCreatedCreatures: (state, action: { payload: number }) => {
      state.created = action.payload;
    },
    updateTentacleEssenceNeed: (state) => {
      const adjustedEssencePerSegment = Math.floor(
        state.essencePerSegment *
          Math.pow(state.multiplier, state.created / 10 + 1)
      );
      state.essencePerSegment = adjustedEssencePerSegment;
    },
    hydrate: (state, action: PayloadAction<CreatureState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  addTentacleEssence,
  resetCreatures,
  setCreatedCreatures,
  updateTentacleEssenceNeed,
  hydrate,
} = creatureSlice.actions;
export default creatureSlice.reducer;
