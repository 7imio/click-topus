import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearGame } from '../../helpers/save-utils';
import { useAppDispatch } from '../../store/hooks';
import { resetAllGameState } from '../../store/actions/reset';

const ResetScreen = () => {
  const [cleared, setCleared] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleReset = () => {
    clearGame();
    dispatch(resetAllGameState());
    setCleared(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-100 text-center px-4">
      {!cleared ? (
        <>
          <h1 className="text-4xl font-bold mb-6 text-red-500">
            ⚠️ Réinitialisation abyssale
          </h1>
          <p className="mb-8 max-w-md">
            Êtes-vous sûr de vouloir tout effacer ? Cette action détruira votre
            progression et bannira vos rejetons dans le néant pour l’éternité.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleReset}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
            >
              Oui, tout effacer
            </button>
            <button
              onClick={() => navigate('/game')}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded"
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6 text-emerald-400">
            🧼 Purification complète
          </h1>
          <p className="mb-6">La corruption a été effacée.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded"
          >
            Retourner dans les abysses
          </button>
        </>
      )}
    </div>
  );
};

export default ResetScreen;
