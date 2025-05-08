import { useEffect, useState } from 'react';
import './styles/App.css';
import Abyss from './Components/Abyss';
import { useAppDispatch } from './store/hooks';
import { loadGame } from './Helpers/save-utils';
import { hydrate as hydrateEssence } from './store/slices/essenceSlice';
import { hydrate as hydrateCreatures } from './store/slices/creatureSlice';
import { hydrate as hydrateTentacles } from './store/slices/tentacleSlice';
import { hydrate as hydrateAutoClickers } from './store/slices/autoClickerSlice';
import { hydrate as hydrateAnimation } from './store/slices/animationSlice';
import { hydrate as hydrateCorruption } from './store/slices/corruptionSlice';
import { hydrate as hydrateSkin } from './store/slices/skinSlice';
import { hydrate as hydrateDebug } from './store/slices/debugSlice';
import { setHydrated } from './store/slices/hydrationSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const game = loadGame();
    if (game) {
      if (game.essence) dispatch(hydrateEssence(game.essence));
      if (game.creatures) dispatch(hydrateCreatures(game.creatures));
      if (game.tentacles) dispatch(hydrateTentacles(game.tentacles));
      if (game.autoClicker) dispatch(hydrateAutoClickers(game.autoClicker));
      if (game.animation) dispatch(hydrateAnimation(game.animation));
      if (game.corruption) dispatch(hydrateCorruption(game.corruption));
      if (game.skin) dispatch(hydrateSkin(game.skin));
      if (game.debug) dispatch(hydrateDebug(game.debug));
    }
    dispatch(setHydrated(true));
    setLoading(false);
  }, []);

  if (loading)
    return <div className="text-white p-4">Chargement abyssal en cours...</div>;
  return <Abyss />;
}

export default App;
