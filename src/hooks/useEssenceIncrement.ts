import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { emptyEssence, incrementEssence } from '../store/slices/essenceSlice';
import {
  incrementTentacleEssence,
  resetTentacles,
} from '../store/slices/tentacleSlice';
import {
  addTentacleEssence,
  updateTentacleEssenceNeed,
} from '../store/slices/creatureSlice';
import {
  clearPopEffect,
  triggerPopEffect,
} from '../store/slices/animationSlice';
import useEssenceHelper from './useEssenceHelper';

const useEssenceIncrement = () => {
  const dispatch = useAppDispatch();
  // déplace ce useSelector ici pour toujours récupérer la dernière valeur
  const { essence } = useAppSelector((state) => state.essence);
  const { essencePerTentacle, essenceForCreature } = useEssenceHelper();
  const skin = useAppSelector((state) => state.skin.currentSkin.skin);

  const essenceIncrementation = useCallback(() => {
    dispatch(incrementTentacleEssence(essencePerTentacle));
    dispatch(incrementEssence());
    dispatch(addTentacleEssence({ essence: 1, essenceForCreature, skin }));

    const currentEssence = typeof essence === 'number' ? essence : 0;
    if (currentEssence + 1 >= essenceForCreature) {
      dispatch(triggerPopEffect());
      dispatch(emptyEssence());
      dispatch(updateTentacleEssenceNeed());
      setTimeout(() => dispatch(clearPopEffect()), 500);
      dispatch(resetTentacles());
    }
  }, [essence, dispatch]);

  return essenceIncrementation;
};

export default useEssenceIncrement;
