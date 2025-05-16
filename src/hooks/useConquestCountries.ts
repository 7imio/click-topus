import { useAppSelector } from '../store/hooks';

const useConquestCountries = () => {
  const { countries, victories } = useAppSelector((state) => state.countries);

  const unlockedDefenseLevel = victories + 1;

  return countries
    .filter(
      (c) => !c.isConquered && c.defensePotential <= unlockedDefenseLevel // ✅ Filtre par défense débloquée
    )
    .map((c) => ({
      ...c,
      indoctrinationLevelPercentage: Math.min(
        100,
        ((c.indoctrinationLevel ?? 0) / c.population) * 100
      ),
    }));
};

export default useConquestCountries;
