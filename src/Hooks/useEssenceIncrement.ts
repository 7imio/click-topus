import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { emptyEssence, incrementEssence } from '../store/slices/essenceSlice';
import {
  incrementTentacleEssence,
  resetTentacles,
} from '../store/slices/tentacleSlice';
import { ESSENCE_FOR_CREATURE } from '../constants/creatures';
import { addTentacleEssence } from '../store/slices/creatureSlice';
import {
  clearPopEffect,
  triggerPopEffect,
} from '../store/slices/animationSlice';

const useEssenceIncrement = () => {
  const dispatch = useAppDispatch();
  // déplace ce useSelector ici pour toujours récupérer la dernière valeur
  const { essence } = useAppSelector((state) => state.essence);

  const essenceIncrementation = useCallback(() => {
    dispatch(incrementTentacleEssence());
    dispatch(incrementEssence());
    dispatch(addTentacleEssence(1));

    const currentEssence = typeof essence === 'number' ? essence : 0;
    if (currentEssence + 1 >= ESSENCE_FOR_CREATURE) {
      dispatch(triggerPopEffect());
      dispatch(emptyEssence());
      setTimeout(() => dispatch(clearPopEffect()), 500);
      dispatch(resetTentacles());
    }
  }, [essence, dispatch]);

  return essenceIncrementation;
};

export default useEssenceIncrement;
