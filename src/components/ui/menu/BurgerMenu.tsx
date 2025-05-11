import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { triggerDebug } from '../../../store/slices/debugSlice';
import { applySkin } from '../../../store/slices/skinSlice';
import skins from '../../../data/skins/skins.json';
import VoidBurger from './VoidBurger';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [animOpen, setAnimOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleDebug = () => dispatch(triggerDebug());
  const handleBurger = () => {
    if (!open && !animOpen) {
      setOpen(true);
      setAnimOpen(true);
    } else if (open && animOpen) {
      setAnimOpen(false);
      setTimeout(() => setOpen(false), 450);
    }
  };

  const currentSkin = useAppSelector((state) => state.skin.currentSkin);

  const handleChangeSkin = () => {
    const currentIndex = skins.findIndex((s) => s.name === currentSkin.name);
    const nextIndex = (currentIndex + 1) % skins.length;
    dispatch(applySkin({ skin: skins[nextIndex] }));
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={handleBurger}
        className="bg-green-900 text-white px-3 py-2 rounded shadow-md transition-all duration-300 hover:bg-emerald-600 hover:scale-105 flex flex-row align-middle justify-center c"
      >
        <VoidBurger isOpen={open} />
      </button>
      {open && (
        <div
          className={`mt-2 bg-black/90 text-white p-4 rounded shadow-lg flex flex-col space-y-2 ${animOpen ? 'burger-open' : 'burger-close'}`}
        >
          <Link to="/" onClick={() => handleBurger()}>
            🏠 Home
          </Link>
          <Link to="/game" onClick={() => handleBurger()}>
            👁️ The Void
          </Link>
          <div className="flex flex-row">
            <Link to="/info" onClick={() => handleBurger()}>
              📦 Infos
            </Link>
            <span className="mx-1">-</span>
            <p
              className="cursor-pointer"
              onClick={() => {
                handleDebug();
                handleBurger();
              }}
            >
              Panel
            </p>
          </div>
          <Link to="/conquest" onClick={() => handleBurger()}>
            🌍 Conquest
          </Link>
          <Link to="/about" onClick={() => handleBurger()}>
            ❓ About
          </Link>
          <Link to="/reset" onClick={() => handleBurger()}>
            💀 Reset
          </Link>
          <Link to="/offsprings" onClick={() => handleBurger()}>
            🪼 Offsprings
          </Link>
          <p className="cursor-pointer" onClick={handleChangeSkin}>
            🐙 Change Skin
          </p>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
