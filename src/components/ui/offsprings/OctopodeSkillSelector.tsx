import { useNavigate, useParams } from 'react-router-dom';
import rawSkillsData from '../../../data/skills/creatureSkills.json';
import { FC, useState } from 'react';
import SkillRoulette from './SkillRoulette';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCreature } from '../../../store/slices/creatureSlice';
import { Capacity, CapacityType } from '../../../types/Capacity';
import DiceRoller from './dice/DiceRoller';
import { incrementFervorCount } from '../../../store/slices/fervorSlice';

// 🧩 Parsing propre du JSON brut
const skillsData: Capacity[] = rawSkillsData.map((data: any) => ({
  id: data.id,
  name: data.name,
  description: data.description,
  type: CapacityType.INFLUENCE,
  toughnesses: data.toughnesses,
  weaknesses: data.weaknesses,
  incompatibilities: data.incompatibilities || [],
}));

const OctopodeSkillSelector: FC = () => {
  const { creatureId } = useParams<{ creatureId: string }>();
  const dispatch = useAppDispatch();

  const creature = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === creatureId)
  );

  const [essenceResult, setEssenceResult] = useState<number | null>(null);
  const [_selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleResult = (result: number | null) => {
    if (!result) return;
    setEssenceResult(result);
  };

  const handleSkillSelect = (skillId: string) => {
    if (!creature || (creature.skills?.length ?? 0) >= 3) return;

    const existingSkills = creature.skills || [];
    const existingStrengths = creature.skillStrengths || [];
    const existingWeaknesses = creature.skillWeaknesses || [];

    const isSkillCompatible = (skill: Capacity): boolean => {
      const hasIncompatibility = existingSkills.some((s) =>
        skill.incompatibilities?.includes(s.id)
      );
      const conflictsWithStrength = existingStrengths.includes(
        skill.weaknesses
      );
      const conflictsWithWeakness = existingWeaknesses.includes(
        skill.toughnesses
      );
      return (
        !hasIncompatibility && !conflictsWithStrength && !conflictsWithWeakness
      );
    };

    const availableSkills = skillsData.filter(isSkillCompatible);
    if (!availableSkills.length) return; // Aucun skill compatible

    // 🔁 Cherche une compétence compatible, sinon boucle sur une autre au hasard
    let skill = skillsData.find((s) => s.id === skillId) as Capacity;
    while (!isSkillCompatible(skill)) {
      const randomIndex = Math.floor(Math.random() * availableSkills.length);
      skill = availableSkills[randomIndex];
    }

    const updatedSkills = [...existingSkills, skill];
    const updatedStrengths = Array.from(
      new Set([...existingStrengths, skill.toughnesses].filter(Boolean))
    );
    const updatedWeaknesses = Array.from(
      new Set([...existingWeaknesses, skill.weaknesses].filter(Boolean))
    );

    dispatch(
      updateCreature({
        creatureId: creatureId!,
        creature: {
          ...creature,
          skills: updatedSkills,
          skillStrengths: updatedStrengths,
          skillWeaknesses: updatedWeaknesses,
          canConquest: updatedSkills.length > 0,
        },
      })
    );
    dispatch(incrementFervorCount());
    setSelectedSkill(skill.id);
  };

  if (!creature) return <div className="text-white">Octopode not found!</div>;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-2">
      <h1 className="text-white text-2xl mb-4">
        Roll a dice and select a Skill for {creature.creatureName}
      </h1>

      <DiceRoller
        setResult={handleResult}
        result={essenceResult}
        creature={creature}
      />

      <SkillRoulette
        onSelect={handleSkillSelect}
        creatureId={creatureId ?? ''}
        disabled={(creature.skills?.length ?? 0) >= 3}
      />

      <div className="text-3xl font-bold">
        {essenceResult !== null && (
          <p className="z-100">🎯 New Essence Affectation: {essenceResult}</p>
        )}
      </div>

      <button onClick={() => console.log(creature)}>NIK</button>

      <button
        onClick={() => navigate(`/octopodes/${creatureId}`)}
        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
      >
        Return to {creature.creatureName} panel
      </button>
    </div>
  );
};

export default OctopodeSkillSelector;
