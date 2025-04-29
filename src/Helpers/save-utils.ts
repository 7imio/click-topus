// Clé utilisée dans le localStorage
const STORAGE_KEY = 'abyss-game-save';

// 🔐 Sauvegarder le score
export const saveScore = (score: number): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ score }));
};

// 📥 Récupérer le score
export const loadScore = (): number => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;

    const parsed = JSON.parse(data);
    return typeof parsed.score === 'number' ? parsed.score : 0;
  } catch (err) {
    console.error('Erreur de chargement du score:', err);
    return 0;
  }
};
