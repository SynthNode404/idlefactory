import type React from 'react';
import type { IconProps } from './components/icons';

export const resourceNames = [
    // Base
    'money', 'techCore', 'researchPoint',
    // T0 Ore
    'ore',
    // T1 Resources
    'iron', 'copper', 'gold',
    'ironIngot', 'ironPlate', 'copperWire', 'goldBar', 'circuit',
    // T2 Resources
    'uranium', 'titanium',
    'uraniumRod', 'titaniumPlate', 'advancedCircuit',
    // T3 Resources (Radioactive)
    'neutroniumOre', 'leadShielding', 'quantumProcessor',
    // T4 Resources (Frozen)
    'cryoniteOre', 'liquidCoolant', 'superconductorCoil',
    // T5 Resources (Molten)
    'voltaniumOre', 'heatShielding', 'plasmaCoil',
    // T6 Resources (Bio)
    'organicResidue', 'biolith', 'enzymeCatalyst',
    // T7 Resources (Prestige)
    'obsiditeShard', 'voidCrystal', 'xenitePlate', 'voidAlloy', 'antiMatterCore',
    // T8 Resources (Prestige II)
    'gravinite',
] as const;

export type ResourceName = typeof resourceNames[number];

export type Resources = Record<ResourceName, number>;

export type MachineCategory = 'Miners' | 'Smelters' | 'Assemblers' | 'Processors' | 'Exotic Extractors';

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
  id:string;
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
    prestigeRequired?: number;
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
        exoticExtractor: number;
    };
}
