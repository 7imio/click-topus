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
    <div className="rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center bg-black text-green-100 text-center">
      {!cleared ? (
        <>
          <h1 className="text-4xl font-bold mb-6 text-red-500">
            ⚠️ Abyssal Reset
          </h1>
          <p className="mb-8 max-w-md">
            Are you sure you want to erase everything? This action will destroy
            your progress and banish your octopods into the void for eternity.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleReset}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
            >
              Yes, erase all
            </button>
            <button
              onClick={() => navigate('/game')}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6 text-emerald-400">
            🧼 Purification complete
          </h1>
          <p className="mb-6">Corruption has been vanished.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded"
          >
            Return into the void
          </button>
        </>
      )}
    </div>
  );
};

export default ResetScreen;
