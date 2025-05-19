import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { versionMiddleware } from './middlewares/versionMiddleware';
import animationReducer, { AnimationState } from './slices/animationSlice';
import autoClickerReducer, {
  AutoClickerState,
} from './slices/autoClickerSlice';
import corruptionReducer, { CorruptionState } from './slices/corruptionSlice';
import creatureReducer, { CreatureState } from './slices/creatureSlice';
import debugReducer, { DebugState } from './slices/debugSlice';
import essenceReducer, { EssenceState } from './slices/essenceSlice';
import hydrationReducer, { HydrationState } from './slices/hydrationSlice';
import skinReducer, { SkinState } from './slices/skinSlice';
import tentacleReducer, { TentacleState } from './slices/tentacleSlice';
import toastReducer, { ToastState } from './slices/toast/toastSlice';

export interface GlobalState {
  toast: ToastState;
  essence: EssenceState;
  skin: SkinState;
  tentacles: TentacleState;
  creatures: CreatureState;
  autoClicker: AutoClickerState;
  animation: AnimationState;
  debug: DebugState;
  corruption: CorruptionState;
  hydration: HydrationState;
}

export const store: EnhancedStore<GlobalState> = configureStore({
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(versionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
