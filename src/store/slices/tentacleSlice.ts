import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tentacle {
  id: string;
  essence: number;
}

export interface TentacleState {
  tentacles: Tentacle[];
}

const initialState: TentacleState = {
  tentacles: [{ id: crypto.randomUUID(), essence: 0 }],
};

const tentacleSlice = createSlice({
  name: 'tentacles',
  initialState,
  reducers: {
    incrementTentacleEssence: (
      state,
      action: PayloadAction<{ essenceToAdd: number; count: number }>
    ) => {
      const { essenceToAdd: maxEssencePerTentacle, count } = action.payload;
      let remainingEssence = count;

      while (remainingEssence > 0) {
        const currentTentacle = state.tentacles[state.tentacles.length - 1];
        const essenceNeeded = maxEssencePerTentacle - currentTentacle.essence;
        const essenceToApply = Math.min(remainingEssence, essenceNeeded);

        currentTentacle.essence += essenceToApply;
        remainingEssence -= essenceToApply;

        if (currentTentacle.essence >= maxEssencePerTentacle) {
          currentTentacle.essence = maxEssencePerTentacle;
          state.tentacles.push({ id: crypto.randomUUID(), essence: 0 });
        }
      }
    },

    resetTentacles: (state) => {
      state.tentacles = [{ id: crypto.randomUUID(), essence: 0 }];
    },

    setTentacles: (state, action) => {
      state.tentacles = action.payload;
    },
    hydrate: (state, action: PayloadAction<TentacleState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  incrementTentacleEssence,
  resetTentacles,
  setTentacles,
  hydrate,
} = tentacleSlice.actions;

export default tentacleSlice.reducer;
