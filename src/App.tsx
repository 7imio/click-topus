import { useEffect, useState } from 'react';
import './styles/App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadGame } from './helpers/save-utils';
import { hydrate as hydrateEssence } from './store/slices/essenceSlice';
import { hydrate as hydrateCreatures } from './store/slices/creatureSlice';
import { hydrate as hydrateTentacles } from './store/slices/tentacleSlice';
import { hydrate as hydrateAutoClickers } from './store/slices/autoClickerSlice';
import { hydrate as hydrateCorruption } from './store/slices/corruptionSlice';
import { hydrate as hydrateSkin } from './store/slices/skinSlice';
import { hydrate as hydrateDebug } from './store/slices/debugSlice';
import { hydrate as hydrateFervor } from './store/slices/fervorSlice';
import { hydrate as hydrateCountries } from './store/slices/countrySlice';
import { setHydrated } from './store/slices/hydrationSlice';
import Router from './components/router/Router';
import Bubbles from './components/background/Bubbles';
import BurgerMenu from './components/ui/menu/BurgerMenu';
import useHarvestEssence from './hooks/useHarvestEssence';
import useHarvestCorruption from './hooks/useHarvestCorruption';
import ToastListener from './hooks/toast/ToastListener';
import useHarvestFervor from './hooks/useHarvestFervor';
import useSaveGame from './hooks/useSaveGame';
import { useInitializeCountries } from './hooks/useInitializeCountries';
import useManageAttack from './hooks/useManageAttack';
import { hydrate as hydrateAttacks } from './store/slices/attackSlice';
import useDecayIndoctrination from './hooks/useDecayIndoctrination';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { hydrated } = useAppSelector((s) => s.hydration);

  useSaveGame(hydrated);
  useInitializeCountries();
  useHarvestEssence();
  useHarvestCorruption();
  useHarvestFervor();
  useManageAttack();
  useDecayIndoctrination();

  useEffect(() => {
    const game = loadGame();
    if (game) {
      if (game.essence) dispatch(hydrateEssence(game.essence));
      if (game.corruption) dispatch(hydrateCorruption(game.corruption));
      if (game.fervor) dispatch(hydrateFervor(game.fervor));
      if (game.skin) dispatch(hydrateSkin(game.skin));
      if (game.tentacles) dispatch(hydrateTentacles(game.tentacles));
      if (game.creatures) dispatch(hydrateCreatures(game.creatures));
      if (game.autoClicker) dispatch(hydrateAutoClickers(game.autoClicker));
      if (game.countries) dispatch(hydrateCountries(game.countries));
      if (game.attacks) dispatch(hydrateAttacks(game.attacks));
      if (game.debug) dispatch(hydrateDebug(game.debug));
      // hydrate countries
    }
    dispatch(setHydrated(true));
    setLoading(false);
  }, [hydrated]);

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-900 to-gray-900">
      <ToastListener />
      <BurgerMenu />
      {loading ? (
        <div className="text-white p-4">Loading...</div>
      ) : (
        <>
          <Bubbles />
          <Router />
        </>
      )}
    </div>
  );
}

export default App;
