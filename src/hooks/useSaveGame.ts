import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { saveGame } from '../helpers/save-utils';

const useSaveGame = (enabled: boolean, throttleDelay = 5000) => {
  const essence = useAppSelector((s) => s.essence);
  const skin = useAppSelector((s) => s.skin);
  const tentacles = useAppSelector((s) => s.tentacles);
  const creatures = useAppSelector((s) => s.creatures);
  const autoClicker = useAppSelector((s) => s.autoClicker);
  const animation = useAppSelector((s) => s.animation);
  const corruption = useAppSelector((s) => s.corruption);

  const lastSaveRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const now = Date.now();
    const timeSinceLastSave = now - lastSaveRef.current;
    if (timeSinceLastSave >= throttleDelay) {
      const state = {
        essence,
        skin,
        tentacles,
        creatures,
        autoClicker,
        animation,
        corruption,
      };
      console.log('save', state);
      saveGame(state);
    }
  }, [essence, skin, tentacles, creatures, autoClicker, animation, corruption]);
};
export default useSaveGame;
