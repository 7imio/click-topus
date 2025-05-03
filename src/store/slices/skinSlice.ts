import { createSlice } from '@reduxjs/toolkit';

interface SkinColor {
  irisColor: string;
  bodyColor: string;
  suckerColor: string;
}

export interface Skin {
  name: string;
  skin: SkinColor;
}

type SkinState = {
  currentSkin: Skin;
  unlockedSkins: Skin[];
};

const initialState: SkinState = {
  currentSkin: {
    name: 'Eldritch Horror',
    skin: {
      irisColor: '#6633cc',
      bodyColor: '#00cc66',
      suckerColor: '#9900cc',
    },
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
  },
});

export const { applySkin, unlockSkin } = skinSlice.actions;
export default skinSlice.reducer;
