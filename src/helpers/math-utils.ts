import { Country } from '../types/Country';
import { Creature } from '../types/Creature';

export const multiplier = 1.2;

export const getExponentialGrowth = (exponential: number) => {
  return Math.pow(multiplier, (exponential + 1) * 0.5);
};

export const updateCost = (baseCost: number, count: number): number => {
  return Math.floor(baseCost * Math.pow(1.2, count));
};

export const rollEffect = (
  base: number,
  d20: number,
  options: {
    scale?: number; // En pourcentage d'évolution max (ex: 50 = +50% ou -50%)
    neutralZone?: [number, number];
  } = {}
): number => {
  const { scale = 50, neutralZone = [8, 12] } = options;
  const [neutralMin, neutralMax] = neutralZone;

  // Si dans la zone neutre, pas de changement
  if (d20 >= neutralMin && d20 <= neutralMax) {
    return base;
  }

  // Calcul de l'intensité de l'effet (plus le jet est extrême, plus l'effet est fort)
  const distanceFromNeutral =
    d20 < neutralMin ? neutralMin - d20 : d20 - neutralMax;
  const maxDistance = d20 < neutralMin ? neutralMin - 1 : 20 - neutralMax;
  const intensity = distanceFromNeutral / maxDistance;

  // Appliquer un pourcentage d'augmentation ou de réduction sur la base
  const effectMultiplier =
    1 + (d20 < neutralMin ? -1 : 1) * intensity * (scale / 100);
  const result = Math.floor(base * effectMultiplier);

  // Sécurisation pour éviter des résultats aberrants (négatifs ou trop petits)
  return Math.max(0, result);
};

export const calculateConquestMultiplier = (
  octopode: Creature,
  country: Country
) => {
  const hasAdvantage = octopode.skillStrengths?.some((str) =>
    country.weaknesses?.includes(str)
  );
  const hasDisadvantage = octopode.skillWeaknesses?.some((weak) =>
    country.toughnesses?.includes(weak)
  );

  if (hasAdvantage) return 0.5;
  if (hasDisadvantage) return 2;
  return 1;
};

export const calculateBattleOutcome = (
  octopode: Creature,
  country: Country
) => {
  const multiplier = calculateConquestMultiplier(octopode, country);
  const population = country.population;

  const indoctrinationNeeded = population - (country.indoctrinationLevel || 0);

  // Essence nécessaire pour indoctriner la totalité du pays
  const essenceRequired = indoctrinationNeeded / multiplier;

  // L'octopode dépensera tout ce qu'il peut, mais pas plus que nécessaire
  const totalEssenceSpent = Math.min(
    octopode.essence,
    Math.floor(essenceRequired)
  );
  const totalIndoctrination = Math.floor(totalEssenceSpent * multiplier);

  const willConquer =
    (country.indoctrinationLevel || 0) + totalIndoctrination >= population;

  return {
    totalEssenceSpent,
    totalIndoctrination,
    victory: willConquer,
  };
};

export const calculateDynamicAttackTime = (
  octopodes: Creature[],
  country: Country
): number => {
  const totalEssence = octopodes.reduce((acc, octo) => acc + octo.essence, 0);
  const population = country.population;

  // Cas particulier : pas de population => conquête immédiate
  if (population === 0) return 1;

  const ratio = totalEssence / population;

  // Si ratio >= 1 => on peut réduire le temps d'attaque
  if (ratio >= 1) {
    const cappedRatio = Math.min(ratio, 30); // Évite les valeurs extrêmes
    const reducedTime = Math.ceil(30 / cappedRatio); // Inversement proportionnel
    return Math.max(1, reducedTime);
  }

  // Si l'octopode est trop faible, temps max
  return 30;
};
