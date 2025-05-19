import { Middleware } from '@reduxjs/toolkit';
import { clearGame } from '../../helpers/save-utils';

const STORAGE_VERSION_KEY = 'abyss-game-version';

const CURRENT_VERSION = __APP_VERSION__ ?? 'unversionned';

export const versionMiddleware: Middleware = (_storeAPI) => (next) => (action) => {
  const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

  if (!savedVersion || savedVersion !== CURRENT_VERSION) {
    console.warn(`Version mismatch! ${savedVersion} !== ${CURRENT_VERSION}. Resetting the state...`);
    clearGame();
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    window.location.reload();
    return; // Important pour stopper la propagation de l'action après reset
  }

  return next(action);
};
