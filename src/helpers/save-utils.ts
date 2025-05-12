import { GlobalState } from '../store';

const STORAGE_KEY = 'abyss-game-save';

export const saveGame = (state: Partial<GlobalState>): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Error while saving ! ', err);
  }
};

export const loadGame = (): Partial<GlobalState> | undefined => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      console.warn('NO DATA');
      return;
    }

    const parsed = JSON.parse(data);
    console.log('Game loaded !');
    return parsed;
  } catch (err) {
    console.error('Error while loading save ! ', err);
    return;
  }
};

export const clearGame = () => {
  localStorage.removeItem(STORAGE_KEY);
};
