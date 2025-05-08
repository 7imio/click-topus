// src/Components/ResetButton.tsx
import { FC } from 'react';
import { clearGame } from '../Helpers/save-utils';

const ResetButton: FC = () => {
  const handleReset = () => {
    if (confirm('Réinitialiser complètement la partie ?')) {
      clearGame();
      location.reload(); // Recharge l'app depuis zéro
    }
  };

  return (
    <button
      onClick={handleReset}
      className="fixed bottom-5 left-5 px-4 py-2 bg-red-700 text-white hover:bg-red-800 z-50"
    >
      Reset Game
    </button>
  );
};

export default ResetButton;
