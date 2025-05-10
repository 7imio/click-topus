import countries from '../../data/countries/coutriesData.json';
import countrySkills from '../../data/skills/countrySkills.json';
import { CapacityType } from '../../types/Capacity';
import { Country } from '../../types/Country';

export const useCountryData = (): Country[] => {
  return countries.map((c) => ({
    ...c,
    defensePotential: Number(c.defensePotential),
    capacities: c.capacities
      .map((capacity: string) => {
        const skill = countrySkills.find((skill) => skill.id === capacity);
        if (!skill) return undefined;
        return {
          ...skill,
          type: skill.type as CapacityType,
        };
      })
      .filter(
        (skill): skill is NonNullable<typeof skill> => skill !== undefined
      ),
  }));
};
