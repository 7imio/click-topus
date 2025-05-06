import { GlobalState } from '../store';

// Clé utilisée dans le localStorage
const STORAGE_KEY = 'abyss-game-save';

// 🔐 Sauvegarder le score
export const saveGame = (state: GlobalState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// 📥 Récupérer le score
export const loadGame = (): GlobalState | undefined => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    console.error('Erreur de chargement de la sauvegarde:', err);
    return;
  }
};
