import { useAppSelector } from '../store/hooks';

const useConquestCountries = () => {
  const { countries } = useAppSelector((state) => state.countries);
  return countries
    .filter((c) => !c.isConquered && (c.indoctrinationLevel ?? 0) > 0)
    .map((c) => ({
      ...c,
      indoctrinationLevelPercentage: Math.min(
        100,
        (c.indoctrinationLevel! / c.population) * 100
      ),
    }));
};

export default useConquestCountries;
