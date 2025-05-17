import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Attack {
  id: string;
  countryId: string;
  octopodesId: string[];
  attackTime: number; // seconds
  elapsedTime: number;
  isActive: boolean;
  name?: string; // later
}

export interface AttacksState {
  ongoingAttack: Attack[];
}

const initialState: AttacksState = {
  ongoingAttack: [],
};

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {
    startAttack: (
      state,
      action: PayloadAction<Omit<Attack, 'id' | 'elapsedTime' | 'isActive'>>
    ) => {
      const newAttack: Attack = {
        id: crypto.randomUUID(),
        elapsedTime: 0,
        isActive: true,
        ...action.payload,
      };
      state.ongoingAttack.push(newAttack);
    },

    updateAttackTime: (
      state,
      action: PayloadAction<{ id: string; seconds: number }>
    ) => {
      const attack = state.ongoingAttack.find(
        (atk: Attack) => atk.id === action.payload.id
      );
      if (!attack) return;
      if (attack.isActive) {
        attack.elapsedTime += action.payload.seconds;
        if (attack.elapsedTime >= attack.attackTime) {
          attack.isActive = false;
        }
      }
    },
    updateAttackTimeManual: (
      state,
      action: PayloadAction<{ id: string; attackTime: number }>
    ) => {
      const attack = state.ongoingAttack.find(
        (a) => a.id === action.payload.id
      );
      if (attack) {
        attack.attackTime = Math.max(1, action.payload.attackTime);
      }
    },

    updateAttackAddOctopode: (
      state,
      action: PayloadAction<{ id: string; octopodeId: string }>
    ) => {
      const attack = state.ongoingAttack.find(
        (a) => a.id === action.payload.id
      );
      if (attack && !attack.octopodesId.includes(action.payload.octopodeId)) {
        attack.octopodesId.push(action.payload.octopodeId);
      }
    },

    endAttack: (state, action: PayloadAction<string>) => {
      state.ongoingAttack = state.ongoingAttack.filter(
        (attack) => attack.id !== action.payload
      );
    },
    resetAttacks: (_state) => initialState,
    hydrate: (_state, action: PayloadAction<AttacksState>) => {
      return { ...action.payload };
    },
  },
});

export const {
  startAttack,
  updateAttackTime,
  updateAttackAddOctopode,
  endAttack,
  resetAttacks,
  hydrate,
  updateAttackTimeManual,
} = attackSlice.actions;
export default attackSlice.reducer;
