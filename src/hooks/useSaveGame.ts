import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { saveGame } from '../helpers/save-utils';

const useSaveGame = (enabled: boolean) => {
  const essence = useAppSelector((s) => s.essence);
  const skin = useAppSelector((s) => s.skin);
  const tentacles = useAppSelector((s) => s.tentacles);
  const creatures = useAppSelector((s) => s.creatures);
  const autoClicker = useAppSelector((s) => s.autoClicker);
  const animation = useAppSelector((s) => s.animation);
  const corruption = useAppSelector((s) => s.corruption);

  const state = {
    essence,
    skin,
    tentacles,
    creatures,
    autoClicker,
    animation,
    corruption,
  };

  useEffect(() => {
    if (!enabled) return;
    console.log('save', state);
    saveGame(state);
  }, [essence, skin, tentacles, creatures, autoClicker, animation, corruption]);
};
export default useSaveGame;
