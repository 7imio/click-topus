import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExponentialGrowth } from '../../helpers/math-utils';
import { generateRandomName } from '../../helpers/name-utils';
import { Creature } from '../../types/Creature';
import { Skin } from '../../types/Skin';
import { basicSkin } from './skinSlice';

export interface CreatureState {
  created: number;
  creatures?: Creature[];
  currentEssence: number;
  maxTentacles: number;
  segmentsPerTentacle: number;
  essencePerSegment: number;
  segmentsType: number;
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

const generateNewCreature = (essence: number, skin: Skin): Creature => {
  return {
    creatureId: crypto.randomUUID(),
    creatureName: generateRandomName(),
    essence: essence,
    skills: [],
    skin: skin ?? basicSkin,
    birthDate: new Date(),
    level: 1,
    victories: 0,
    isDead: false,
    canConquest: false,
    isInConquest: false,
    lastConquestTarget: '',
    deathDate: undefined,
    skillStrengths: [],
    skillWeaknesses: [],
  };
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
        };
      }
    ) => {
      const { essence } = action.payload;
      state.currentEssence += essence;
    },
    resetCurrentEssence: (state) => {
      state.currentEssence = 0;
    },
    createNewCreature: (
      state,
      action: {
        payload: {
          essenceForCreature: number;
          skin: Skin;
        };
      }
    ) => {
      const { essenceForCreature, skin } = action.payload;
      const newCreature = generateNewCreature(essenceForCreature, skin);
      state.creatures?.push(newCreature);

      state.created = state.creatures?.length ?? state.created + 1;
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
    updateCreature: (
      state,
      action: PayloadAction<{ creatureId: string; creature: Creature }>
    ) => {
      const { creatureId, creature } = action.payload;

      if (!Array.isArray(state.creatures)) return;

      const index = state.creatures.findIndex(
        (c) => c.creatureId === creatureId
      );

      if (index !== -1) {
        state.creatures[index] = { ...state.creatures[index], ...creature };
      }
    },
    resetCreatureSkills: (
      state,
      action: PayloadAction<{ creatureId: string }>
    ) => {
      const { creatureId } = action.payload;
      const creature = state.creatures?.find(
        (c) => c.creatureId === creatureId
      );
      if (creature) {
        creature.skills = [];
      }
    },
    hydrate: (state, action: PayloadAction<CreatureState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  addTentacleEssence,
  resetCreatures,
  resetCurrentEssence,
  setCreatedCreatures,
  updateTentacleEssenceNeed,
  updateCreature,
  createNewCreature,
  resetCreatureSkills,
  hydrate,
} = creatureSlice.actions;
export default creatureSlice.reducer;
