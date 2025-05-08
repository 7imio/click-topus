import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExponentialGrowth } from '../../helpers/math-utils';
import { SkinColor } from './skinSlice';

export interface CreatureState {
  created: number;
  creatures?: Creature[];
  currentEssence: number;
  maxTentacles: number;
  segmentsPerTentacle: number;
  essencePerSegment: number;
  segmentsType: number;
}

export interface Creature {
  creatureId: string;
  creatureName?: string;
  essence: number;
  skin: SkinColor;
}

const initialState: CreatureState = {
  created: 0,
  creatures: [],
  currentEssence: 0,
  maxTentacles: 8,
  segmentsPerTentacle: 10,
  essencePerSegment: 10,
  segmentsType: 2,
};

const creatureSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    addTentacleEssence: (
      state,
      action: {
        payload: {
          essence: number;
          essenceForCreature: number;
          skin: SkinColor;
        };
      }
    ) => {
      const { essence, essenceForCreature, skin } = action.payload;
      state.currentEssence += essence;
      if (state.currentEssence >= essenceForCreature) {
        const newCreature: Creature = {
          creatureId: crypto.randomUUID(),
          essence: essenceForCreature,
          skin: skin ?? {
            irisColor: '#6633cc',
            bodyColor: '#00cc66',
            suckerColor: '#9900cc',
          },
        };
        state.creatures?.push(newCreature);

        state.created = state.creatures?.length ?? state.created + 1;
        state.currentEssence = 0;
      }
    },
    resetCreatures: (state) => {
      state.created = 0;
      state.creatures = [];
      state.currentEssence = 0;
      state.maxTentacles = 8;
      state.segmentsPerTentacle = 10;
      state.essencePerSegment = 10;
      state.segmentsType = 2;
    },

    setCreatedCreatures: (state, action: { payload: number }) => {
      state.created = action.payload;
    },
    updateTentacleEssenceNeed: (state) => {
      const adjustedEssencePerSegment = Math.floor(
        state.essencePerSegment + getExponentialGrowth(state.created)
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
