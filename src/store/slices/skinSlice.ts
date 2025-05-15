import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skin } from '../../types/Skin';

export type SkinState = {
  currentSkin: Skin;
  unlockedSkins: Skin[];
};

export const basicSkin = {
  name: 'Eldritch Horror',
  skin: {
    irisColor: '#6633cc',
    bodyColor: '#00cc66',
    suckerColor: '#9900cc',
    eyeWhiteColor: '#EEEEcc',
    retinaColor: '#27272a',
  },
};

const initialState: SkinState = {
  currentSkin: {
    name: 'Eldritch Horror',
    skin: basicSkin.skin,
  },
  unlockedSkins: [],
};

const skinSlice = createSlice({
  name: 'skin',
  initialState,
  reducers: {
    applySkin: (state, actions) => {
      const { skin } = actions.payload;
      state.currentSkin = skin;
    },
    unlockSkin: (state, actions) => {
      const { unlockedSkins } = state;
      const unlockedSkin = actions.payload;
      unlockedSkins.push(unlockedSkin);
    },
    resetSkin: () => {
      return initialState;
    },
    hydrate: (state, action: PayloadAction<SkinState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { applySkin, unlockSkin, resetSkin, hydrate } = skinSlice.actions;
export default skinSlice.reducer;
