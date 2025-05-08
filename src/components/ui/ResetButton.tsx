// src/Components/ResetButton.tsx
import { FC } from 'react';
import { clearGame } from '../../helpers/save-utils';
import { useAppDispatch } from '../../store/hooks';
import { resetAllGameState } from '../../store/actions/reset';

const ResetButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    if (confirm('Réinitialiser complètement la partie ?')) {
      clearGame();
      dispatch(resetAllGameState());
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
