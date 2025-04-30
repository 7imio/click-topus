import { FC, useState } from 'react';
import { loadScore, saveScore } from '../Helpers/save-utils';
import Bubbles from './Bubbles';
import Eye from './Eye';
import Tentacle from './Tentacle';

const Abyss: FC = () => {
  const [score, setScore] = useState(loadScore());
  const handleClick = () =>
    setScore((prev) => {
      saveScore(prev + 1);
      return prev + 1;
    });

  const resetScore = () => {
    setScore(0);
    saveScore(0);
  };

  const tentacleCount = Math.floor(score / 100) + 1;
  const suctionCount = Math.floor(score / 10);

  const suctionsPerTentacle = Array(tentacleCount).fill(0);
  for (let i = 0; i < suctionCount; i++) {
    suctionsPerTentacle[tentacleCount - 1 - (i % tentacleCount)]++;
  }

  const angleStep = 360 / tentacleCount;

  return (
    <div className="overflow-hidden">
      <Bubbles />

      <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-green-800 to-neutral-800">
        <h1 className="text-4xl font-bold bg-neutral-500 p-4 rounded-4xl text-purple-800 text-shadow-indigo-500 text-shadow">
          Score: {score}
        </h1>
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Eye
              irisColor="#6633cc"
              handleClick={handleClick}
              tentacleColor="#00cc66"
            >
              {score > 0 &&
                suctionsPerTentacle.map((suctionNb, index) => (
                  <div
                    key={index}
                    onClick={handleClick}
                    className="absolute top-[50%] left-[50%]"
                    style={{
                      transform: `translateX(-30px) rotate(${index * angleStep}deg)`,
                      transformOrigin: 'top center',
                    }}
                    aria-hidden={true}
                  >
                    <Tentacle
                      suctionCount={suctionNb}
                      bodyColor="#00cc66"
                      suctionColor="#9900cc"
                    />
                  </div>
                ))}
            </Eye>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abyss;
