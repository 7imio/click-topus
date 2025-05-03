import { createSlice } from '@reduxjs/toolkit';
import {
  ESSENCE_PER_SEGMENT,
  MAX_TENTACLES,
  SEGMENTS_PER_TENTACLE,
  SEGMENTS_TYPE,
} from '../../constants/tentacles';

export interface Tentacle {
  id: string;
  essence: number;
}

interface TentacleState {
  tentacles: Tentacle[];
}

const initialState: TentacleState = {
  tentacles: [{ id: crypto.randomUUID(), essence: 0 }],
};

const tentacleSlice = createSlice({
  name: 'tentacles',
  initialState,
  reducers: {
    incrementTentacleEssence: (state) => {
      const tentacles = state.tentacles;

      // Trouve la première tentacule incomplète (strictement < 200)
      const targetIndex = tentacles.findIndex(
        (t) =>
          t.essence <
          SEGMENTS_PER_TENTACLE * SEGMENTS_TYPE * ESSENCE_PER_SEGMENT
      );

      if (targetIndex !== -1) {
        tentacles[targetIndex].essence += 1;

        // Si la dernière tentacule vient d'être remplie et qu'on peut en créer une nouvelle
        const last = tentacles[tentacles.length - 1];
        if (
          last.essence === SEGMENTS_PER_TENTACLE * 2 &&
          tentacles.length < MAX_TENTACLES
        ) {
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
  },
});

export const { incrementTentacleEssence, resetTentacles, setTentacles } =
  tentacleSlice.actions;

export default tentacleSlice.reducer;
