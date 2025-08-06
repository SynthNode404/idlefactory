import React from 'react';
import type { Machine, Upgrade, ResourceName, Resources, Stats } from './types';
import type { IconProps } from '../components/icons';
import { 
    AutoMinerIcon, DrillIcon, CrusherIcon, SmelterIcon, PickaxeIcon, GearIcon, FactoryIcon, CircuitIcon, 
    MoneyIcon, TechCoreIcon, OreIcon, IronIcon, CopperIcon, GoldIcon, WrenchScrewdriverIcon, CopperWireIcon
} from '../components/icons';

export const RESOURCE_DATA: Record<ResourceName, { name: string; icon: React.ReactElement<IconProps>; sellPrice?: number }> = {
    money: { name: 'Money', icon: React.createElement(MoneyIcon, { className: "text-green-400" }) },
    techCore: { name: 'Tech Cores', icon: React.createElement(TechCoreIcon, { className: "text-purple-400" }) },
    ore: { name: 'Raw Ore', icon: React.createElement(OreIcon, { className: "text-gray-400" }), sellPrice: 0.25 },
    iron: { name: 'Iron Ore', icon: React.createElement(IronIcon, { className: "text-orange-300" }), sellPrice: 1 },
    copper: { name: 'Copper Ore', icon: React.createElement(CopperIcon, { className: "text-orange-500" }), sellPrice: 2 },
    gold: { name: 'Gold Ore', icon: React.createElement(GoldIcon, { className: "text-yellow-400" }) },
    uranium: { name: 'Uranium Ore', icon: React.createElement(OreIcon, null) },
    titanium: { name: 'Titanium Ore', icon: React.createElement(OreIcon, null) },
    ironIngot: { name: 'Iron Ingot', icon: React.createElement(IronIcon, { className: "text-orange-200" }), sellPrice: 5 },
    copperWire: { name: 'Copper Wire', icon: React.createElement(CopperWireIcon, { className: "text-orange-400" }), sellPrice: 12 },
    goldBar: { name: 'Gold Bar', icon: React.createElement(GoldIcon, null) },
    circuit: { name: 'Circuit', icon: React.createElement(CircuitIcon, { className: "text-green-500" }) },
};

export const MACHINE_CATEGORIES: Machine['category'][] = ['Miners', 'Smelters', 'Assemblers'];

export const INITIAL_MACHINES: Machine[] = [
  {
    id: 'miner',
    name: 'Auto Miner',
    description: 'Generates a steady stream of raw ore.',
    category: 'Miners',
    baseCost: { money: 15 },
    cost: { money: 15 },
    recipe: {},
    output: { ore: 1 },
    productionTime: 2000,
    count: 0,
    icon: React.createElement(AutoMinerIcon, { className: "w-8 h-8 text-accent-light" })
  },
  {
    id: 'deep_miner',
    name: 'Deep Core Miner',
    description: 'Mines both iron and copper ore.',
    category: 'Miners',
    baseCost: { money: 200 },
    cost: { money: 200 },
    recipe: {},
    output: { iron: 2, copper: 1 },
    productionTime: 5000,
    count: 0,
    icon: React.createElement(DrillIcon, { className: "w-8 h-8 text-accent-light" })
  },
  {
    id: 'iron_smelter',
    name: 'Iron Smelter',
    description: 'Smelts iron ore into more valuable iron ingots.',
    category: 'Smelters',
    baseCost: { money: 500 },
    cost: { money: 500 },
    recipe: { iron: 2 },
    output: { ironIngot: 1 },
    productionTime: 3000,
    count: 0,
    icon: React.createElement(SmelterIcon, { className: "w-8 h-8 text-accent-light" })
  },
  {
    id: 'copper_furnace',
    name: 'Copper Furnace',
    description: 'Turns copper ore into copper, ready for assembly.',
    category: 'Smelters',
    baseCost: { money: 1000 },
    cost: { money: 1000 },
    recipe: { copper: 2 },
    output: { copperWire: 1 },
    productionTime: 3000,
    count: 0,
    icon: React.createElement(SmelterIcon, { className: "w-8 h-8 text-red-400" })
  },
  {
    id: 'circuit_assembler',
    name: 'Circuit Assembler',
    description: 'Combines iron and copper to produce circuits.',
    category: 'Assemblers',
    baseCost: { money: 10000 },
    cost: { money: 10000 },
    recipe: { ironIngot: 5, copperWire: 3 },
    output: { circuit: 1 },
    productionTime: 10000,
    count: 0,
    icon: React.createElement(WrenchScrewdriverIcon, { className: "w-8 h-8 text-accent-light" })
  },
];

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'reinforced_pick',
    name: 'Reinforced Pickaxe',
    description: 'Doubles the output of each manual ore click.',
    cost: { money: 100 },
    isPurchased: false,
    targetId: 'click',
    multiplier: 2,
    icon: React.createElement(PickaxeIcon, { className: "w-8 h-8 text-highlight" })
  },
  {
    id: 'miner_gears',
    name: 'Better Gears',
    description: 'Doubles the production of all Auto Miners.',
    cost: { money: 500 },
    isPurchased: false,
    targetId: 'miner',
    multiplier: 2,
    icon: React.createElement(GearIcon, { className: "w-8 h-8 text-highlight" })
  },
];

export const INITIAL_RESOURCES: Resources = {
    money: 10, techCore: 0,
    ore: 0, iron: 0, copper: 0, gold: 0, uranium: 0, titanium: 0,
    ironIngot: 0, copperWire: 0, goldBar: 0, circuit: 0
};

export const INITIAL_STATS: Stats = {
    playTime: 0,
    totalClicks: 0,
    moneyEarned: 0,
    itemsCrafted: 0,
    prestigeCount: 0,
    resourcesMined: {},
};