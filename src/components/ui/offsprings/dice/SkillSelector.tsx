import { useState } from 'react';
import creatureSkills from '../../../../data/skills/creatureSkills.json'; // Si c'est pour les rejetons

const SkillSelector = () => {
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const drawSkill = () => {
    const skill =
      creatureSkills[Math.floor(Math.random() * creatureSkills.length)];
    setSelectedSkill(skill);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={drawSkill}
        className="bg-purple-700 hover:bg-purple-600 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:scale-105"
      >
        ✨ Draw a Skill
      </button>
      {selectedSkill && (
        <div className="text-center text-green-300 mt-4">
          <h2 className="text-2xl font-bold">{selectedSkill.name}</h2>
          <p className="text-sm italic">{selectedSkill.description}</p>
          <p className="text-xs mt-2 text-gray-400">
            Type: {selectedSkill.type.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillSelector;
