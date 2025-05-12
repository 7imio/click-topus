import { useParams } from 'react-router-dom';
import skillsData from '../../../data/skills/creatureSkills.json';
import { useState } from 'react';
import SkillRoulette from './SkillRoulette'; // On va le créer juste après
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCreature } from '../../../store/slices/creatureSlice';
import { Capacity } from '../../../types/Capacity';

const OctopodeSkillSelector = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const creature = useAppSelector((state) =>
    state.creatures.creatures?.find((c) => c.creatureId === id)
  );

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillSelect = (skillId: string) => {
    if (!creature) return;
    if (!creature.skills || creature.skills?.length >= 3) return;

    const skill = skillsData.find((s) => s.id === skillId) as Capacity;

    if (!skill) return;

    dispatch(
      updateCreature({
        creatureId: id!,
        creature: {
          ...creature,
          skills: [...(creature.skills || []), skill], // Tu pourras charger le détail de la skill via l'ID plus tard
        },
      })
    );

    setSelectedSkill(skillId);

    // Tu peux mettre une petite pause avant de revenir à l'écran principal
    //setTimeout(() => navigate('/'), 1500);
  };

  if (!creature) return <div className="text-white">Octopode not found!</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-white text-2xl mb-4">
        Select a Skill for {creature.creatureName}
      </h1>
      <SkillRoulette
        onSelect={handleSkillSelect}
        disabled={!creature.skills || creature.skills?.length >= 3}
      />
    </div>
  );
};

export default OctopodeSkillSelector;
