import { configureStore } from '@reduxjs/toolkit';
import essenceReducer from './slices/essenceSlice';
import skinReducer from './slices/skinSlice';
import tentacleReducer from './slices/tentacleSlice';

export const store = configureStore({
  reducer: {
    essence: essenceReducer,
    skin: skinReducer,
    tentacles: tentacleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
