import { AppDispatch } from '..';
import { resetEssence } from '../slices/essenceSlice';
import { resetCreatures } from '../slices/creatureSlice';
import { resetTentacles } from '../slices/tentacleSlice';
import { resetAutoClickers } from '../slices/autoClickerSlice';
import { resetCorruption } from '../slices/corruptionSlice';
import { setHydrated } from '../slices/hydrationSlice';

export const resetAllGameState = () => (dispatch: AppDispatch) => {
  dispatch(resetEssence());
  dispatch(resetCreatures());
  dispatch(resetTentacles());
  dispatch(resetAutoClickers());
  dispatch(resetCorruption());
  dispatch(setHydrated(false)); // pour forcer une nouvelle hydratation si besoin
};
