import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearPopEffect,
  triggerPopEffect,
} from '../store/slices/animationSlice';
import {
  addTentacleEssence,
  createNewCreature,
  resetCurrentEssence,
  updateTentacleEssenceNeed,
} from '../store/slices/creatureSlice';
import { incrementEssence } from '../store/slices/essenceSlice';
import {
  incrementTentacleEssence,
  resetTentacles,
} from '../store/slices/tentacleSlice';
import useEssenceHelper from './useEssenceHelper';

const useEssenceIncrement = (essenceToIncrement?: number) => {
  const dispatch = useAppDispatch();

  const { currentEssence } = useAppSelector((state) => state.creatures);

  const { essencePerTentacle, essenceForCreature } = useEssenceHelper();
  const skin = useAppSelector((state) => state.skin.currentSkin);

  const essenceIncrementation = useCallback(() => {
    const count = essenceToIncrement ?? 1;
    dispatch(
      incrementTentacleEssence({
        essenceToAdd: essencePerTentacle,
        count,
      })
    );

    // 1. GLOBAL essence incrementation
    dispatch(incrementEssence(count));

    // 2. CREATURE essence incrementation
    dispatch(
      addTentacleEssence({
        essence: count,
        essenceForCreature,
      })
    );

    if (currentEssence + 1 >= essenceForCreature) {
      const delta = currentEssence - essenceForCreature;

      dispatch(triggerPopEffect());
      dispatch(resetCurrentEssence());
      dispatch(createNewCreature({ essenceForCreature, skin }));
      dispatch(updateTentacleEssenceNeed());
      setTimeout(() => dispatch(clearPopEffect()), 500);

      dispatch(resetTentacles());
      if (delta > 0) {
        dispatch(addTentacleEssence({ essence: delta, essenceForCreature }));
      }
    }
  }, [currentEssence, dispatch]);

  return essenceIncrementation;
};

export default useEssenceIncrement;
