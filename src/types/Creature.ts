import { Skin } from './Skin';
import { Capacity } from './Capacity';

export interface Creature {
  creatureId: string;
  creatureName: string;
  essence: number; // Essence actuelle
  baseEssence: number; // montant d'essence de base a la création de l'octopode.
  maxEssence: number; // Essence maximale enregistrée
  skin: Skin;
  skills?: Capacity[];
  skillStrengths?: string[];
  skillWeaknesses?: string[];
  isDead?: boolean;
  canConquest?: boolean;
  isInConquest?: boolean;
  victories?: number; // Nombre de victoires (= combats menés avec succès)
  lastConquestTarget?: string; // Code ISO du pays en cours de conquête
  birthDate: number;
  deathDate?: number;
  level?: number; // Niveau de la créature
}
