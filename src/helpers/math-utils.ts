export const multiplier = 1.2;

export const getExponentialGrowth = (exponential: number) => {
  return Math.pow(multiplier, (exponential + 1) * 0.5);
};

export const rollEffect = (
  base: number,
  d20: number,
  options: {
    scale?: number;
    neutralZone?: [number, number];
  } = {}
): number => {
  const { scale = 100, neutralZone = [7, 14] } = options;
  const [neutralMin, neutralMax] = neutralZone;

  if (d20 < neutralMin) {
    const intensity = (neutralMin - d20) / (neutralMin - 1);
    const multiplier = 1 - intensity * (scale / 100);
    return Math.floor(base * multiplier);
  } else if (d20 > neutralMax) {
    const intensity = (d20 - neutralMax) / (20 - neutralMax);
    const multiplier = 1 + intensity * (scale / 100);
    return Math.floor(base * multiplier);
  } else {
    return base;
  }
};
