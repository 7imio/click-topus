import './styles/App.css';
import Abyss from './Components/Abyss';
import { useEffect } from 'react';
import { loadGame } from './Helpers/save-utils';
import { useAppDispatch } from './store/hooks';
import { hydrateAllState } from './store/slices/hydrationSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      console.log('now state hydration', saved);
      dispatch(hydrateAllState(saved));
      console.log('hydrate', saved);
    }
  }, []);

  return <Abyss />;
}

export default App;
