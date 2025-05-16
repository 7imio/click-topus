import { FC } from 'react';
import { Country } from '../../../../types/Country';
import { Creature } from '../../../../types/Creature';
import rawCountrySkills from '../../../../data/skills/countrySkills.json';
import { Capacity } from '../../../../types/Capacity';

interface SkillCompatibilitiesProps {
  country: Country;
  octopode: Creature;
  onLaunchAttack: () => void;
  onBack: () => void;
}

const SkillCompatibilities: FC<SkillCompatibilitiesProps> = ({
  octopode,
  country,
  onLaunchAttack,
  onBack,
}) => {
  const hasAdvantage =
    Array.isArray(octopode.skillStrengths) &&
    octopode.skillStrengths.some((str) =>
      country.capacities.some((cap) => cap.weaknesses === str)
    );

  const hasDisadvantage =
    Array.isArray(octopode.skillWeaknesses) &&
    octopode.skillWeaknesses.some((weak) =>
      country.capacities.some((cap) => cap.toughnesses === weak)
    );

  const multiplier = hasAdvantage
    ? 'x0.5 (Advantage)'
    : hasDisadvantage
      ? 'x2 (Disadvantage)'
      : 'x1 (Neutral)';
  const multiplierColor = hasAdvantage
    ? 'text-green-400'
    : hasDisadvantage
      ? 'text-red-400'
      : 'text-yellow-300';

  const creatureStrenghts = octopode.skillStrengths?.map((strength) => {
    const skill = (rawCountrySkills as Capacity[]).find(
      (skill) => skill.id === strength
    );
    return skill ? skill.name : strength;
  });

  const creatureWeaknesses = octopode.skillWeaknesses?.map((weakness) => {
    const skill = (rawCountrySkills as Capacity[]).find(
      (skill) => skill.id === weakness
    );
    return skill ? skill.name : weakness;
  });

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-green-900/80 border-2 border-green-700 rounded-lg shadow-lg transition-all duration-300">
      <div>
        <h3 className="text-xl font-bold mb-4 text-center">
          🔍 Compatibility Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-300 text-center mb-4">
          <div>
            <p className="font-bold text-green-100">🧬 Strengths</p>
            <p>{creatureStrenghts?.join(', ') || 'None'}</p>
          </div>

          <div>
            <p className="font-bold text-green-100">💀 Weaknesses</p>
            <p>{creatureWeaknesses?.join(', ') || 'None'}</p>
          </div>

          <div>
            <p className="font-bold text-green-100">🏰 Country Capacities</p>
            <p>
              {country.capacities.map((cap) => cap.name).join(', ') || 'None'}
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <span
            className={`px-6 py-3 bg-emerald-800 text-white rounded-full shadow-md font-bold ${multiplierColor}`}
          >
            🛡️ Defense Multiplier: {multiplier}
          </span>
        </div>
      </div>

      {/* 🎮 Action Buttons */}
      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={onLaunchAttack}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full"
        >
          🚀 Launch Attack
        </button>

        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full"
        >
          🔙 Back to Conquest Panel
        </button>
      </div>
    </div>
  );
};

export default SkillCompatibilities;
