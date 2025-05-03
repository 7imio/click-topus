import { createSlice } from '@reduxjs/toolkit';
import { ESSENCE_FOR_CREATURE } from '../../constants/creatures';

interface CreatureState {
  created: number;
  currentEssence: number;
}

const initialState: CreatureState = {
  created: 0,
  currentEssence: 0,
};

const creatureSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    addTentacleEssence: (state, action: { payload: number }) => {
      state.currentEssence += action.payload;
      if (state.currentEssence >= ESSENCE_FOR_CREATURE) {
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
  },
});

export const { addTentacleEssence, resetCreatures, setCreatedCreatures } =
  creatureSlice.actions;
export default creatureSlice.reducer;
