import { useNavigate, useParams } from 'react-router-dom';
import skillsData from '../../../data/skills/creatureSkills.json';
import { FC, useState } from 'react';
import SkillRoulette from './SkillRoulette'; // On va le créer juste après
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCreature } from '../../../store/slices/creatureSlice';
import { Capacity } from '../../../types/Capacity';
import DiceRoller from './dice/DiceRoller';

const OctopodeSkillSelector: FC = () => {
  const { creatureId } = useParams<{ creatureId: string }>();

  const dispatch = useAppDispatch();

  const creature = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === creatureId)
  );
  const [essenceResult, setEssenceResult] = useState<number | null>(null);
  const handleResult = (result: number | null) => {
    if (!result) return;
    setEssenceResult(result);
  };

  const [_selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillSelect = (skillId: string) => {
    if (!creature) return;
    if (!creature.skills || creature.skills?.length >= 3) return;

    const skill = skillsData.find((s) => s.id === skillId) as Capacity;

    if (!skill) return;

    dispatch(
      updateCreature({
        creatureId: creatureId!,
        creature: {
          ...creature,
          skills: [...(creature.skills || []), skill], // Tu pourras charger le détail de la skill via l'ID plus tard
        },
      })
    );

    setSelectedSkill(skillId);
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
        disabled={!creature.skills || creature.skills?.length >= 3}
      />

      <div className="text-3xl font-bold">
        {essenceResult !== null && (
          <p className="z-100">🎯 New Essence Affectation : {essenceResult}</p>
        )}
      </div>
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
