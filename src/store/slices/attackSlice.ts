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

const findAttack = (state: AttacksState, id: string) =>
  state.ongoingAttack.find((a) => a.id === id);

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

    updateAttackTime: (state, action: PayloadAction<{ id: string; seconds: number }>) => {
      const { id, seconds } = action.payload;
      const attack = findAttack(state, id);
      if (!attack) return;
      if (attack.isActive) {
        attack.elapsedTime += seconds;
        if (attack.elapsedTime >= attack.attackTime) {
          attack.isActive = false;
        }
      }
    },

    updateAttackTimeManual: (state, action: PayloadAction<{ id: string; attackTime: number }>) => {
      const { id, attackTime } = action.payload;
      const attack = findAttack(state, id);
      if (attack) {
        attack.attackTime = Math.max(1, attackTime);
      }
    },

    addOctopodeToAttack: (state, action: PayloadAction<{ id: string; octopodeId: string }>) => {
      const { id, octopodeId } = action.payload;
      const attack = findAttack(state, id);
      if (attack && !attack.octopodesId.includes(octopodeId)) {
        attack.octopodesId.push(action.payload.octopodeId);
      }
    },

    endAttack: (state, action: PayloadAction<string>) => {
      state.ongoingAttack = state.ongoingAttack.filter((a) => a.id !== action.payload);
    },

    pauseAttack: (state, action: PayloadAction<string>) => {
      const attack = findAttack(state, action.payload);
      if (attack) attack.isActive = false;
    },

    resumeAttack: (state, action: PayloadAction<string>) => {
      const attack = findAttack(state, action.payload);
      if (attack && attack.elapsedTime < attack.attackTime) attack.isActive = true;
    },

    renameAttack: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const attack = findAttack(state, action.payload.id);
      if (attack) attack.name = action.payload.name;
    },

    setAttackCompleted: (state, action: PayloadAction<string>) => {
      const attack = findAttack(state, action.payload);
      if (attack) {
        attack.isActive = false;
        attack.elapsedTime = attack.attackTime;
      }
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
  addOctopodeToAttack,
  endAttack,
  resetAttacks,
  pauseAttack,
  renameAttack,
  resumeAttack,
  setAttackCompleted,
  hydrate,
  updateAttackTimeManual,
} = attackSlice.actions;
export default attackSlice.reducer;
