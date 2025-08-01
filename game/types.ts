

import type React from 'react';
import type { IconProps } from '../components/icons';

export const resourceNames = [
    'money', 'techCore', 'researchPoint',
    'ore', 'iron', 'copper', 'gold', 'uranium', 'titanium',
    'ironIngot', 'ironPlate', 'copperWire', 'goldBar', 'circuit'
] as const;

export type ResourceName = typeof resourceNames[number];

export type Resources = Record<ResourceName, number>;

export type MachineCategory = 'Miners' | 'Smelters' | 'Assemblers' | 'Processors';

export interface Machine {
  id: string;
  name: string;
  description: string;
  category: MachineCategory;
  cost: Partial<Resources>;
  baseCost: Partial<Resources>;
  recipe: Partial<Resources>;
  output: Partial<Resources>;
  productionTime: number; // in ms
  count: number;
  icon: React.ReactElement<IconProps>;
  zoneId: string;
  unlocked: boolean;
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

export type AchievementTier = {
    goal: number;
    reward: string;
    isClaimed: boolean;
};

export interface Achievement {
    id: string;
    name: string;
    description: string;
    category: 'clicks' | 'ores' | 'machines' | 'prestige';
    target: ResourceName | 'totalClicks' | 'prestigeCount' | string;
    tiers: AchievementTier[];
    progress: number;
}

export interface ResearchNode {
    id: string;
    name: string;
    description: string;
    cost: Partial<Resources>;
    dependencies: string[];
    isUnlocked: boolean;
}

export interface Zone {
    id: string;
    name: string;
    unlocksAt: { resource: ResourceName; amount: number };
}

export interface GameState {
    resources: Resources;
    machines: Machine[];
    upgrades: Upgrade[];
    stats: Stats;
    achievements: Achievement[];
    research: ResearchNode[];
    clickPower: number;
    lastUpdate: number;
    lastSave: Date | null;
    storage: number;
    currentZoneId: string;
    achievementMultipliers: {
        click: number;
        miner: number;
        smelter: number;
        assembler: number;
    };
}
