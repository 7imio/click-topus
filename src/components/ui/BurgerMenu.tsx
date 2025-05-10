import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { triggerDebug } from '../../store/slices/debugSlice';
import { applySkin } from '../../store/slices/skinSlice';
import skins from '../../data/skins/skins.json';
import VoidBurger from './VoidBurger';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleDebug = () => dispatch(triggerDebug());

  const currentSkin = useAppSelector((state) => state.skin.currentSkin);

  const handleChangeSkin = () => {
    const currentIndex = skins.findIndex((s) => s.name === currentSkin.name);
    const nextIndex = (currentIndex + 1) % skins.length;
    dispatch(applySkin({ skin: skins[nextIndex] }));
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-900 text-white px-3 py-2 rounded shadow-md transition-all duration-300 hover:bg-emerald-600 hover:scale-105 flex flex-row align-middle justify-center c"
      >
        <VoidBurger isOpen={open} />
      </button>
      {open && (
        <div className="mt-2 bg-black/90 text-white p-4 rounded shadow-lg flex flex-col space-y-2">
          <Link to="/" onClick={() => setOpen(false)}>
            🏠 Home
          </Link>
          <Link to="/game" onClick={() => setOpen(false)}>
            👁️ The Void
          </Link>
          <div className="flex flex-row">
            <Link to="/info" onClick={() => setOpen(false)}>
              📦 Infos
            </Link>
            <span className="mx-1">-</span>
            <p
              className="cursor-pointer"
              onClick={() => {
                handleDebug();
                setOpen(false);
              }}
            >
              Panel
            </p>
          </div>
          <Link to="/conquest" onClick={() => setOpen(false)}>
            🌍 Conquest
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            ❓ About
          </Link>
          <Link to="/reset" onClick={() => setOpen(false)}>
            💀 Reset
          </Link>
          <Link to="/offsprings" onClick={() => setOpen(false)}>
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
