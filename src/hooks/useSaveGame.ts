import { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { saveGame } from '../helpers/save-utils';

const useSaveGame = (enabled: boolean, throttleDelay = 5000) => {
  const essence = useAppSelector((s) => s.essence);
  const corruption = useAppSelector((s) => s.corruption);
  const fervor = useAppSelector((s) => s.fervor);
  const skin = useAppSelector((s) => s.skin);
  const tentacles = useAppSelector((s) => s.tentacles);
  const creatures = useAppSelector((s) => s.creatures);
  const autoClicker = useAppSelector((s) => s.autoClicker);
  const countries = useAppSelector((s) => s.countries);
  const attacks = useAppSelector((s) => s.attacks);
  // toast
  // debug
  // animations

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
        corruption,
        countries,
        fervor,
        attacks,
      };

      saveGame(state);
    }
  }, [
    essence,
    skin,
    tentacles,
    creatures,
    autoClicker,
    corruption,
    countries,
    fervor,
    attacks,
  ]);
};
export default useSaveGame;
