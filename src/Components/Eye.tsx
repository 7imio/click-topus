import { FC, ReactNode, useEffect, useState } from 'react';
import { getGradientFromColor } from '../Helpers/color-utils';
import { triggerBlinkSequence } from '../Helpers/anim-utils';

type EyeProps = {
  irisColor: string;
  tentacleColor: string;
  handleClick: () => void;
  children?: ReactNode;
  popEffect: boolean;
};

export const Eye: FC<EyeProps> = ({
  irisColor,
  handleClick,
  tentacleColor,
  children,
  popEffect,
}) => {
  const [blinking, setBlinking] = useState(false);

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

  return (
    <div className="relative z-10 w-20 h-20">
      {children}

      <div
        className={`absolute inset-0 rounded-full border-[1px] border-black bg-white flex items-center justify-center shadow-inner overflow-hidden transition-transform duration-500 ${
          popEffect ? 'animate-eye-pop' : ''
        }`}
        style={{
          backgroundColor: '#EEEECC',
          border: `6px solid ${tentacleColor}`,
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
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: getGradientFromColor(irisColor) }}
        >
          <div className="w-3 h-3 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
};

export default Eye;
