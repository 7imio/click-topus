import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { triggerDebug } from '../../store/slices/debugSlice';
import SkinSwitcherButton from './SkinSwitcherButton';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleDebug = () => dispatch(triggerDebug());

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-900 text-white px-3 py-2 rounded"
      >
        ☰ Menu
      </button>
      {open && (
        <div className="mt-2 bg-black/90 text-white p-4 rounded shadow-lg flex flex-col space-y-2">
          <Link to="/" onClick={() => setOpen(false)}>
            🏠 Home
          </Link>
          <Link to="/game" onClick={() => setOpen(false)}>
            👁️ The Void
          </Link>
          <Link to="/infos" onClick={() => setOpen(false)}>
            📦 Infos
          </Link>
          <Link to="/conquest" onClick={() => setOpen(false)}>
            🌍 Conquest
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            ❓ About
          </Link>
          <Link to="/reset" onClick={() => setOpen(false)}>
            💀 Reset
          </Link>
          <button
            className="bg-neutral-500 text-2xl text-amber-50"
            onClick={handleDebug}
          >
            DEBUG
          </button>
          <SkinSwitcherButton />
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
