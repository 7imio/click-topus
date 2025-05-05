import { configureStore } from '@reduxjs/toolkit';
import essenceReducer from './slices/essenceSlice';
import skinReducer from './slices/skinSlice';
import tentacleReducer from './slices/tentacleSlice';
import creatureReducer from './slices/creatureSlice';
import autoClickerReducer from './slices/autoClickerSlice';
import animationReducer from './slices/animationSlice';
import debugReducer from './slices/debugSlice';

export const store = configureStore({
  reducer: {
    essence: essenceReducer,
    skin: skinReducer,
    tentacles: tentacleReducer,
    creatures: creatureReducer,
    autoClicker: autoClickerReducer,
    animation: animationReducer,
    debug: debugReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
