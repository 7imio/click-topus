import { FC, useMemo } from 'react';

const Bubbles: FC = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = Math.random() * 20 + 5;
      return (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      );
    });
  }, []); // 🔁 memo only once

  return <>{bubbles}</>;
};

export default Bubbles;
