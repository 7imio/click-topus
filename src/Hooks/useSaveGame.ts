import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { saveGame } from '../Helpers/save-utils';

const useSaveGame = () => {
  const state = useAppSelector((s) => s);

  useEffect(() => {
    saveGame(state);
  }, [state]);
};

export default useSaveGame;
