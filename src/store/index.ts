import { configureStore } from '@reduxjs/toolkit';
import essenceReducer, { EssenceState } from './slices/essenceSlice';
import skinReducer, { SkinState } from './slices/skinSlice';
import tentacleReducer, { TentacleState } from './slices/tentacleSlice';
import creatureReducer, { CreatureState } from './slices/creatureSlice';
import autoClickerReducer, {
  AutoClickerState,
} from './slices/autoClickerSlice';
import animationReducer, { AnimationState } from './slices/animationSlice';
import debugReducer, { DebugState } from './slices/debugSlice';
import corruptionReducer, { CorruptionState } from './slices/corruptionSlice';
import hydrationReducer, { HydrationState } from './slices/hydrationSlice';
import fervorReducer, { FervorState } from './slices/fervorSlice';

export interface GlobalState {
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
}

export const store = configureStore<GlobalState>({
  reducer: {
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
