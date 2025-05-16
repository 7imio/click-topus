import { AppDispatch } from '..';
import { resetAutoClickers } from '../slices/autoClickerSlice';
import { resetCorruption } from '../slices/corruptionSlice';
import { resetCountries } from '../slices/countrySlice';
import { resetCreatures } from '../slices/creatureSlice';
import { resetEssence } from '../slices/essenceSlice';
import { resetFervor } from '../slices/fervorSlice';
import { setHydrated } from '../slices/hydrationSlice';
import { resetSkin } from '../slices/skinSlice';
import { resetTentacles } from '../slices/tentacleSlice';

export const resetAllGameState = () => (dispatch: AppDispatch) => {
  dispatch(resetEssence());
  dispatch(resetCreatures());
  dispatch(resetTentacles());
  dispatch(resetAutoClickers());
  dispatch(resetCorruption());
  dispatch(resetSkin());
  dispatch(resetFervor());
  dispatch(resetCountries());
  dispatch(setHydrated(false));
};
