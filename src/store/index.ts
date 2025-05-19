import { configureStore, Middleware } from '@reduxjs/toolkit';
import { versionMiddleware } from './middlewares/versionMiddleware';
import animationReducer, { AnimationState } from './slices/animationSlice';
import attacksReducer, { AttacksState } from './slices/attackSlice';
import autoClickerReducer, { AutoClickerState } from './slices/autoClickerSlice';
import corruptionReducer, { CorruptionState } from './slices/corruptionSlice';
import countriesReducer, { CountryState } from './slices/countrySlice';
import creatureReducer, { CreatureState } from './slices/creatureSlice';
import debugReducer, { DebugState } from './slices/debugSlice';
import essenceReducer, { EssenceState } from './slices/essenceSlice';
import fervorReducer, { FervorState } from './slices/fervorSlice';
import hydrationReducer, { HydrationState } from './slices/hydrationSlice';
import skinReducer, { SkinState } from './slices/skinSlice';
import tentacleReducer, { TentacleState } from './slices/tentacleSlice';
import toastReducer, { ToastState } from './slices/toast/toastSlice';

export interface GlobalState {
  toast: ToastState;
  essence: EssenceState;
  corruption: CorruptionState;
  fervor: FervorState;
  skin: SkinState;
  tentacles: TentacleState;
  creatures: CreatureState;
  autoClicker: AutoClickerState;
  animation: AnimationState;
  debug: DebugState;
  hydration: HydrationState;
  countries: CountryState;
  attacks: AttacksState;
}

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    essence: essenceReducer,
    skin: skinReducer,
    tentacles: tentacleReducer,
    creatures: creatureReducer,
    autoClicker: autoClickerReducer,
    animation: animationReducer,
    debug: debugReducer,
    corruption: corruptionReducer,
    hydration: hydrationReducer,
    fervor: fervorReducer,
    countries: countriesReducer,
    attacks: attacksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(versionMiddleware as Middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
