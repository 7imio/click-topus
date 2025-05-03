import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment } from '../store/slices/essenceSlice';
import {
  incrementTentacleEssence,
  resetTentacles,
} from '../store/slices/tentacleSlice';
import { ESSENCE_FOR_CREATURE } from '../constants/creatures';
import { addTentacleEssence } from '../store/slices/creatureSlice';

const useEssenceIncrement = (setPopEffect?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const currentEssence = useAppSelector((state) => state.essence.essence);
  const incrementEssence = useCallback(() => {
    dispatch(incrementTentacleEssence());
    dispatch(increment());
    dispatch(addTentacleEssence(1));
    if (currentEssence + 1 >= ESSENCE_FOR_CREATURE) {
      if (setPopEffect) {
        setPopEffect(true);
        setTimeout(() => setPopEffect(false), 500);
      }
      dispatch(resetTentacles());
    }
  }, [currentEssence, dispatch, setPopEffect]);

  return incrementEssence;
};

export default useEssenceIncrement;
