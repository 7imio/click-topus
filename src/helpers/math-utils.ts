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
