import { FC } from 'react';

const Bubbles: FC = () => {
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
};
export default Bubbles;
