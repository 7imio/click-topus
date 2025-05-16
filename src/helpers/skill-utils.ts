import rawSkillsData from '../data/skills/creatureSkills.json';
import { Capacity, CapacityType } from '../types/Capacity';
import { Creature } from '../types/Creature';

// 🧩 Parsing JSON proprement une seule fois
const skillsData: Capacity[] = rawSkillsData.map((data: any) => ({
  id: data.id,
  name: data.name,
  description: data.description,
  type: CapacityType.INFLUENCE,
  toughnesses: data.toughnesses,
  weaknesses: data.weaknesses,
  incompatibilities: data.incompatibilities || [],
}));

export const generateCompatibleSkills = (
  creature: Creature,
  maxSkills = 3
): Capacity[] => {
  const assignedSkills: Capacity[] = [];
  const assignedStrengths: string[] = [];
  const assignedWeaknesses: string[] = [];

  const isSkillCompatible = (skill: Capacity): boolean => {
    const hasIncompatibility = assignedSkills.some((s) =>
      skill.incompatibilities?.includes(s.id)
    );
    const conflictsWithStrength = assignedStrengths.includes(skill.weaknesses);
    const conflictsWithWeakness = assignedWeaknesses.includes(
      skill.toughnesses
    );
    return (
      !hasIncompatibility && !conflictsWithStrength && !conflictsWithWeakness
    );
  };

  while (assignedSkills.length < maxSkills) {
    const availableSkills = skillsData.filter(isSkillCompatible);
    if (!availableSkills.length) break;

    const randomSkill =
      availableSkills[Math.floor(Math.random() * availableSkills.length)];
    assignedSkills.push(randomSkill);
    assignedStrengths.push(randomSkill.toughnesses);
    assignedWeaknesses.push(randomSkill.weaknesses);
  }

  // Update la créature directement si besoin
  creature.skills = assignedSkills;
  creature.skillStrengths = Array.from(new Set(assignedStrengths));
  creature.skillWeaknesses = Array.from(new Set(assignedWeaknesses));
  creature.canConquest = assignedSkills.length > 0;

  return assignedSkills;
};
