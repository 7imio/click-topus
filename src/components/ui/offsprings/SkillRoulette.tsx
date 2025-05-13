import { FC, useState } from 'react';
import skillsData from '../../../data/skills/creatureSkills.json';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addSkillToCreature,
  rerollCreatureSkills,
} from '../../../store/slices/corruptionSlice';
import { resetCreatureSkills } from '../../../store/slices/creatureSlice';

interface SkillRouletteProps {
  onSelect: (skillId: string) => void;
  creatureId: string;
  disabled: boolean;
}

const SkillRoulette: FC<SkillRouletteProps> = ({
  onSelect,
  disabled,
  creatureId,
}) => {
  const [rolling, setRolling] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const corruption = useAppSelector((state) => state.corruption);

  const creature = useAppSelector((state) => state.creatures).creatures?.find(
    (c) => c.creatureId === creatureId
  );

  const startRoll = () => {
    if (rolling || disabled) return;
    setRolling(true);
    const rollDuration = 2000;
    const interval = 100;

    let elapsed = 0;

    const rollInterval = setInterval(() => {
      const randomSkill =
        skillsData[Math.floor(Math.random() * skillsData.length)];
      setSelectedSkill(randomSkill.name);
      elapsed += interval;

      if (elapsed >= rollDuration) {
        clearInterval(rollInterval);
        setRolling(false);
        onSelect(randomSkill.id);
        dispatch(addSkillToCreature({ creatureId, skillId: randomSkill.id }));
      }
    }, interval);
  };

  const handleBuySkill = () => {
    if (!creature) return;
    if (!creature.skills) creature.skills = [];
    if (creature.skills.length >= 3) return;
    startRoll();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 overflow-hidden w-80 border-4 border-green-500 rounded-lg bg-black shadow-lg">
        <motion.div
          animate={{ y: rolling ? [-50, -0, 50] : 0 }}
          transition={{
            repeat: rolling ? Infinity : 0,
            duration: 0.1,
            ease: 'easeInOut',
          }}
          className="flex flex-col h-full justify-center align-middle items-center text-white text-2xl font-bold"
        >
          {selectedSkill || '🎲 Roll to Select'}
        </motion.div>
      </div>

      <button
        onClick={handleBuySkill}
        disabled={rolling || disabled}
        className={`mt-6 px-6 py-2 rounded-full text-white font-bold ${
          rolling ||
          disabled ||
          corruption.corruption <
            corruption.currentCost * corruption.skillMultiplicator
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {rolling
          ? 'Rolling...'
          : disabled
            ? 'No more skills to affect'
            : `Affect skills - ${corruption.currentCost * corruption.skillMultiplicator} corruption`}
      </button>
    </div>
  );
};

export default SkillRoulette;
