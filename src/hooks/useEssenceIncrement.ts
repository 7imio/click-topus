import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { incrementEssence } from '../store/slices/essenceSlice';
import {
  incrementTentacleEssence,
  resetTentacles,
} from '../store/slices/tentacleSlice';
import {
  addTentacleEssence,
  createNewCreature,
  resetCurrentEssence,
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
  const { currentEssence } = useAppSelector((state) => state.creatures);
  const { essencePerTentacle, essenceForCreature } = useEssenceHelper();
  const skin = useAppSelector((state) => state.skin.currentSkin.skin);

  const essenceIncrementation = useCallback(() => {
    dispatch(incrementTentacleEssence(essencePerTentacle));

    // 1. J'incrémente l'essence GLOBALE pour les achats
    dispatch(incrementEssence());

    // 2. J'incrémente l'essence dédiée à la créature en cours
    dispatch(addTentacleEssence({ essence: 1, essenceForCreature }));

    if (currentEssence + 1 >= essenceForCreature) {
      dispatch(triggerPopEffect());
      dispatch(resetCurrentEssence());
      dispatch(createNewCreature({ essenceForCreature, skin }));
      dispatch(updateTentacleEssenceNeed());
      setTimeout(() => dispatch(clearPopEffect()), 500);
      dispatch(resetTentacles());
    }
  }, [essence, dispatch]);

  return essenceIncrementation;
};

export default useEssenceIncrement;
