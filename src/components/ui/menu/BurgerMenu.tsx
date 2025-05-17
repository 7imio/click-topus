import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { triggerDebug } from '../../../store/slices/debugSlice';
import { applySkin } from '../../../store/slices/skinSlice';
import skins from '../../../data/skins/skins.json';
import VoidBurger from './VoidBurger';
import {
  setEssence,
  setTotalHarvestedEssence,
} from '../../../store/slices/essenceSlice';
import { setCorruption } from '../../../store/slices/corruptionSlice';
import TestToast from '../toast/TestToast';
import { setFervor } from '../../../store/slices/fervorSlice';
import { Creature } from '../../../types/Creature';
import {
  addCreature,
  generateNewCreature,
} from '../../../store/slices/creatureSlice';
import { generateCompatibleSkills } from '../../../helpers/skill-utils';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [animOpen, setAnimOpen] = useState(false);

  const state = useAppSelector((state) => state);

  const { essence, totalHarvestedEssence } = useAppSelector(
    (state) => state.essence
  );
  const { corruption } = useAppSelector((state) => state.corruption);
  const { creatures } = useAppSelector((state) => state.creatures);
  const { fervor } = useAppSelector((state) => state.fervor);

  const devMode = import.meta.env.VITE_DEVELOPER_MODE?.toLowerCase() === 'true';

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

  const handleAddOctopod = () => {
    const randomSkin = skins[Math.floor(Math.random() * skins.length)];
    const newOctopod: Creature = generateNewCreature(100000000, randomSkin);
    generateCompatibleSkills(newOctopod);
    dispatch(addCreature(newOctopod));
  };

  const handleLogState = () => {
    const content = `[${new Date().toISOString()}] ${JSON.stringify(state, null, 2)}\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = `redux-state-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed top-4 left-4 z-200">
      <button
        onClick={handleBurger}
        className="backdrop-blur-sm text-white px-3 py-2 rounded shadow-md transition-all duration-300 hover:bg-emerald-600 hover:scale-105 flex flex-row align-middle justify-center c"
        style={{ backgroundColor: 'rgba(200,200,200,.1)' }}
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
          <p className="cursor-pointer" onClick={handleChangeSkin}>
            🐙 Change Skin
          </p>
          {creatures && creatures.length > 0 && (
            <>
              <hr className="my-2 border-green-500" />
              <Link to="/octopodes" onClick={() => handleBurger()}>
                🪼 Octopods
              </Link>
            </>
          )}
          {fervor > 0 && (
            <Link to="/conquest" onClick={() => handleBurger()}>
              🌍 Conquest
            </Link>
          )}
          <hr className="my-2 border-green-500" />
          <Link to="/about" onClick={() => handleBurger()}>
            ❓ About
          </Link>
          <Link to="/thanks" onClick={() => handleBurger()}>
            🙏 Thanks
          </Link>
          <Link to="/reset" onClick={() => handleBurger()}>
            💀 Reset
          </Link>
          {devMode && (
            <>
              <hr className="my-2 border-green-500" />
              <p
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setEssence(essence + 1000000000));
                  dispatch(
                    setTotalHarvestedEssence(totalHarvestedEssence + 1000000000)
                  );
                }}
              >
                🧬 Add essence
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setCorruption(corruption + 1000000000));
                }}
              >
                ☣️ Add corruption
              </p>

              <p
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setFervor(fervor + 1000000000));
                }}
              >
                🔥 Add fervor
              </p>
              <p className="cursor-pointer" onClick={handleAddOctopod}>
                🪼 Add Octopod
              </p>
              <p className="cursor-pointer">
                <TestToast />
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  handleLogState();
                }}
              >
                🧪 Log Redux State
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
