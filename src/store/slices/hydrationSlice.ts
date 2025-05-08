// src/store/slices/hydrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalState } from '../index';
import { store } from '../index';

const hydrationSlice = createSlice({
  name: 'hydration',
  initialState: {},
  reducers: {
    hydrateAllState: (_state, action: PayloadAction<Partial<GlobalState>>) => {
      const payload = action.payload;

      console.log('State Hydration ', payload);

      if (payload.creatures)
        store.dispatch({
          type: 'creatures/hydrate',
          payload: payload.creatures,
        });

      if (payload.tentacles)
        store.dispatch({
          type: 'tentacles/hydrate',
          payload: payload.tentacles,
        });

      if (payload.skin)
        store.dispatch({ type: 'skin/hydrate', payload: payload.skin });

      if (payload.essence)
        store.dispatch({ type: 'essence/hydrate', payload: payload.essence });

      if (payload.autoClicker)
        store.dispatch({
          type: 'autoClicker/hydrate',
          payload: payload.autoClicker,
        });

      if (payload.animation)
        store.dispatch({
          type: 'animation/hydrate',
          payload: payload.animation,
        });

      if (payload.debug)
        store.dispatch({ type: 'debug/hydrate', payload: payload.debug });

      if (payload.corruption)
        store.dispatch({
          type: 'corruption/hydrate',
          payload: payload.corruption,
        });
    },
  },
});

export const { hydrateAllState } = hydrationSlice.actions;
export default hydrationSlice.reducer;
