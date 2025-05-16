export enum CapacityType {
  DEFENSE = 'defense', // Défense militaire ou résistance mentale (PAYS)
  INFLUENCE = 'influence', // Propagation d'idéologies, contrôle mental, etc. (OCTOPODS)
}

export interface Capacity {
  id: string;
  name: string;
  description: string;
  type: CapacityType;
  toughnesses: string;
  weaknesses: string;
  incompatibilities?: string[];
}
