export const multiplier = 1.2;

export const getExponentialGrowth = (exponential: number) => {
  return Math.pow(multiplier, (exponential + 1) * 0.5);
};
