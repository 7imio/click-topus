import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { emptyEssence, increment } from '../store/slices/essenceSlice';
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
  const currentEssence = useAppSelector((state) => state.essence.essence);
  const incrementEssence = useCallback(() => {
    dispatch(incrementTentacleEssence());
    dispatch(increment());
    dispatch(addTentacleEssence(1));
    if (currentEssence + 1 >= ESSENCE_FOR_CREATURE) {
      dispatch(triggerPopEffect());
      dispatch(emptyEssence());
      setTimeout(() => dispatch(clearPopEffect()), 500);
      dispatch(resetTentacles());
    }
  }, [currentEssence, dispatch]);

  return incrementEssence;
};

export default useEssenceIncrement;
