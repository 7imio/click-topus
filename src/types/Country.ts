import { Capacity } from './Capacity';

export interface Country {
  name: string;
  ISO_A2: string;
  ISO_A3?: string;
  population: number;
  area: number;
  defensePotential: number;
  capacities: Capacity[]; // Capacités des pays
}
