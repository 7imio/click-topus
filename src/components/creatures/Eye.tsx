import { FC, ReactNode, useEffect, useState } from 'react';
import { triggerBlinkSequence } from '../../helpers/anim-utils';
import { getGradientFromColor } from '../../helpers/color-utils';
import { useAppSelector } from '../../store/hooks';
import { Skin } from '../../types/Skin';

type EyeProps = {
  skin: Skin;
  handleClick?: () => void;
  children?: ReactNode;
  disablePopEffect?: boolean;
  blink?: boolean;
  miniEye?: boolean;
};

export const Eye: FC<EyeProps> = ({
  handleClick,
  skin,
  children,
  disablePopEffect,
  blink,
  miniEye,
}) => {
  const [blinking, setBlinking] = useState(false);
  const { popEffect } = useAppSelector((state) => state.animation);
  const [click, setClick] = useState(false);
  const { irisColor, bodyColor, eyeWhiteColor, retinaColor } = skin.skin;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const scheduleBlink = () => {
      triggerBlinkSequence(setBlinking);

      const nextBlink = Math.random() * 6000 + 4000;
      timeout = setTimeout(scheduleBlink, nextBlink);
    };

    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setTimeout(() => setClick(false), 50);
  }, [click]);

  return (
    <div
      className={`${
        miniEye
          ? `relative z-10 w-[30px] h-[30px] min-w-[15px] min-h-[15px] max-w-[30px] max-h-[30px]`
          : `relative z-10 w-[20vw] h-[20vw] max-w-[80px] max-h-[80px] min-w-[40px] min-h-[40px]`
      }`}
      onClick={() => setClick(true)}
    >
      {children}

      <div
        className={`${miniEye ? 'animate-glow ' : ''}${blink && click ? 'animate-eye-click ' : ''}absolute inset-0 rounded-full border-[1px] border-black bg-white flex items-center justify-center shadow-inner overflow-hidden transition-transform duration-500 ${
          !disablePopEffect && handleClick !== undefined && popEffect
            ? 'animate-eye-pop'
            : ''
        }`}
        style={{
          backgroundColor: eyeWhiteColor,
          border: `${miniEye ? '3px' : '6px'} solid ${bodyColor}`,
        }}
        onClick={handleClick}
        aria-hidden={true}
      >
        {/* Paupière animée */}
        <div
          className={`eye-lid ${blinking ? 'closed' : ''}`}
          style={{ background: getGradientFromColor(bodyColor) }}
        />

        {/* Iris + pupille */}
        <div
          className={`${miniEye ? 'w-4 h-4' : 'w-10 h-10'} rounded-full flex items-center justify-center`}
          style={{ background: getGradientFromColor(irisColor) }}
        >
          <div
            className={`${miniEye ? 'w-1.5 h-1.5' : 'w-3 h-3'} rounded-full`}
            style={{ background: retinaColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default Eye;
