import { FC, ReactNode, useEffect, useState } from 'react';
import { getGradientFromColor } from '../Helpers/color-utils';

type EyeProps = {
  irisColor: string;
  handleClick: () => void;
  children?: ReactNode;
};

export const Eye: FC<EyeProps> = ({ irisColor, handleClick, children }) => {
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const triggerBlink = () => {
      setBlinking(true);

      // durée du clignement (fermé)
      setTimeout(() => {
        setBlinking(false);

        // chance d’un double clignement
        if (Math.random() < 0.2) {
          setTimeout(() => {
            setBlinking(true);
            setTimeout(() => setBlinking(false), 200);
          }, 200);
        }
      }, 200);

      // prochain blink entre 4s et 10s
      const nextBlink = Math.random() * 6000 + 4000;
      timeout = setTimeout(triggerBlink, nextBlink);
    };

    triggerBlink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative z-10 w-24 h-24">
      {children}

      <div
        className="absolute inset-0 rounded-full border-[1px] border-black bg-white flex items-center justify-center shadow-inner overflow-hidden"
        onClick={handleClick}
      >
        {/* Paupière animée */}
        <div className={`eye-lid ${blinking ? 'closed' : ''}`} />

        {/* Iris + pupille */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: getGradientFromColor(irisColor) }}
        >
          <div className="w-4 h-4 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
};

export default Eye;
