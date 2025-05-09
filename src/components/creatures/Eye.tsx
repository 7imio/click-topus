import { FC, ReactNode, useEffect, useState } from 'react';
import { triggerBlinkSequence } from '../../helpers/anim-utils';
import { getGradientFromColor } from '../../helpers/color-utils';
import { useAppSelector } from '../../store/hooks';

type EyeProps = {
  irisColor: string;
  tentacleColor: string;
  handleClick?: () => void;
  children?: ReactNode;
  disablePopEffect?: boolean;
  blink?: boolean;
  miniEye?: boolean;
};

export const Eye: FC<EyeProps> = ({
  irisColor,
  handleClick,
  tentacleColor,
  children,
  disablePopEffect,
  blink,
  miniEye,
}) => {
  const [blinking, setBlinking] = useState(false);
  const { popEffect } = useAppSelector((state) => state.animation);
  const [click, setClick] = useState(false);

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
          ? `relative z-10 w-[40px] h-[40px] min-w-[20px] min-h-[20px] max-w-[40px] max-h-[40px]`
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
          backgroundColor: '#EEEECC',
          border: `${miniEye ? '3px' : '6px'} solid ${tentacleColor}`,
        }}
        onClick={handleClick}
        aria-hidden={true}
      >
        {/* Paupière animée */}
        <div
          className={`eye-lid ${blinking ? 'closed' : ''}`}
          style={{ background: getGradientFromColor(tentacleColor) }}
        />

        {/* Iris + pupille */}
        <div
          className={`${miniEye ? 'w-5 h-5' : 'w-10 h-10'} rounded-full flex items-center justify-center`}
          style={{ background: getGradientFromColor(irisColor) }}
        >
          <div
            className={`${miniEye ? 'w-1.5 h-1.5' : 'w-3 h-3'} rounded-full bg-neutral-800`}
          />
        </div>
      </div>
    </div>
  );
};

export default Eye;
