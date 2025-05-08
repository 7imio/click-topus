import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { applySkin } from '../../store/slices/skinSlice';
import { allSkins } from '../../constants/skins';

const SkinSwitcherButton: FC = () => {
  const dispatch = useAppDispatch();
  const currentSkin = useAppSelector((state) => state.skin.currentSkin);

  const handleClick = () => {
    const currentIndex = allSkins.findIndex((s) => s.name === currentSkin.name);
    const nextIndex = (currentIndex + 1) % allSkins.length;
    dispatch(applySkin({ skin: allSkins[nextIndex] }));
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
      >
        Change Skin
      </button>
    </>
  );
};

export default SkinSwitcherButton;
