import { configureStore } from '@reduxjs/toolkit';
import essenceReducer from './slices/essenceSlice';

export const store = configureStore({
  reducer: {
    essence: essenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
