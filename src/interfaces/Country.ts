export interface Country {
  name: string;
  ISO_A3: string;
  population: number;
  area: number;
  indoctrinationPotential: string;
  militaryControlPotential: string;
  immunity?: string[]; // pour les futures bonus / malus
  weaknesses?: string[]; // pour les futures bonus / malus
}
