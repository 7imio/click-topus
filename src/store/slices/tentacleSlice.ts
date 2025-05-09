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
    incrementTentacleEssence: (state, action: PayloadAction<number>) => {
      const essenceToAdd = action.payload;
      const tentacles = state.tentacles;
      const targetIndex = tentacles.findIndex((t) => t.essence < essenceToAdd);

      if (targetIndex !== -1) {
        tentacles[targetIndex].essence += 1;

        const last = tentacles[tentacles.length - 1];
        if (last.essence >= essenceToAdd) {
          tentacles.push({ id: crypto.randomUUID(), essence: 0 });
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
