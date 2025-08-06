import type React from 'react';
import type { IconProps } from '../components/icons';

export const resourceNames = [
    'money', 'techCore',
    'ore', 'iron', 'copper', 'gold', 'uranium', 'titanium',
    'ironIngot', 'copperWire', 'goldBar', 'circuit'
] as const;

export type ResourceName = typeof resourceNames[number];

export type Resources = Record<ResourceName, number>;

export type MachineCategory = 'Miners' | 'Smelters' | 'Assemblers';

export interface Machine {
  id: string;
  name: string;
  description: string;
  category: MachineCategory;
  cost: Partial<Resources>;
  baseCost: Partial<Resources>;
  recipe: Partial<Resources>; // what it consumes per production cycle
  output: Partial<Resources>; // what it produces
  productionTime: number; // in ms
  count: number;
  icon: React.ReactElement<IconProps>;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: Partial<Resources>;
  isPurchased: boolean;
  targetId: string; // 'click', a machine id, or 'ALL'
  multiplier: number;
  icon: React.ReactElement<IconProps>;
}

export interface Stats {
    playTime: number;
    totalClicks: number;
    moneyEarned: number;
    itemsCrafted: number;
    prestigeCount: number;
    resourcesMined: Partial<Resources>;
}

export interface GameState {
    resources: Resources;
    machines: Machine[];
    upgrades: Upgrade[];
    stats: Stats;
    clickPower: number;
    lastUpdate: number;
    lastSave: Date | null;
}
