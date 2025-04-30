import { FC, useState } from 'react';
import Eye from './Eye';
import SegmentedTentacle from './SegmentedTentacle';
import Bubbles from './Bubbles';

const Abyss: FC = () => {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore((prev) => prev + 1);
  };

  const tentacleCount = Math.min(Math.floor(score / 200) + 1, 8); // 1 tentacule tous les 200 clics
  const angleStep = 360 / tentacleCount;

  const tentacleScores = Array(tentacleCount).fill(0);
  for (let i = 0; i < score; i++) {
    const index = i % tentacleCount; // pas inversé, stable
    tentacleScores[index]++;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-green-900 to-gray-900">
      <h1 className="text-4xl font-bold text-purple-800">Score: {score}</h1>
      <Bubbles />
      <div className="relative w-[600px] h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Eye
            irisColor="#6633cc"
            tentacleColor="#00cc66"
            handleClick={handleClick}
          >
            {tentacleScores.map((tentacleScore, idx) => (
              <div
                key={idx}
                onClick={handleClick}
                className="absolute top-[50%] left-[40%]"
                style={{
                  transform: `rotate(${idx * angleStep}deg)`,
                  transformOrigin: 'top center',
                }}
              >
                <SegmentedTentacle
                  totalClicks={tentacleScore}
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
