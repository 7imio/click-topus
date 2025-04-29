import { FC, useState } from 'react';
import Tentacle from './Tentacle';
import Eye from './Eye';

const Abyss: FC = () => {
  const [score, setScore] = useState(0);
  const handleClick = () => setScore((prev) => prev + 1);

  const tentacleCount = Math.floor(score / 100) + 1;
  const suctionCount = Math.floor(score / 10);

  const suctionsPerTentacle = Array(tentacleCount).fill(0);
  for (let i = 0; i < suctionCount; i++) {
    suctionsPerTentacle[tentacleCount - 1 - (i % tentacleCount)]++;
  }

  const angleStep = 360 / tentacleCount;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-green-800 to-neutral-800">
      <h1 className="text-4xl font-bold bg-neutral-500 p-4 rounded-4xl text-purple-800 text-shadow-indigo-500 text-shadow">
        Score: {score}
      </h1>
      <div className="relative w-[600px] h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Eye irisColor="#6633cc" handleClick={handleClick}>
            {score > 0 &&
              suctionsPerTentacle.map((suctionNb, idx) => (
                <div
                  key={idx}
                  onClick={handleClick}
                  className="absolute top-[50%] left-[50%]"
                  style={{
                    transform: `translateX(-30px) rotate(${idx * angleStep}deg)`,
                    transformOrigin: 'top center',
                  }}
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
  );
};

export default Abyss;
