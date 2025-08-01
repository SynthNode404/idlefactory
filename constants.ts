import React from 'react';
import { resourceNames } from './types';
import type { Machine, Upgrade, ResourceName, Resources, Stats, Zone, Achievement, ResearchNode } from './types';
import type { IconProps } from './components/icons';
import { 
    AutoMinerIcon, DrillIcon, SmelterIcon, PickaxeIcon, GearIcon, FactoryIcon, CircuitIcon, 
    MoneyIcon, TechCoreIcon, OreIcon, IronIcon, CopperIcon, GoldIcon, WrenchScrewdriverIcon, CopperWireIcon,
    ResearchPointIcon, IronPlateIcon,
    UraniumIcon, TitaniumIcon, NeutroniumIcon, CryoniteIcon, VoltaniumIcon, ObsiditeIcon, VoidCrystalIcon, BiolithIcon, GraviniteIcon,
    AdvancedCircuitIcon, PlasmaCoilIcon, QuantumProcessorIcon, SuperconductorCoilIcon, HeatShieldingIcon, LeadShieldingIcon,
    TitaniumPlateIcon, XenitePlateIcon, VoidAlloyIcon, AntiMatterCoreIcon, LiquidCoolantIcon, OrganicResidueIcon, EnzymeCatalystIcon
} from './components/icons';

export const RESOURCE_DATA: Record<ResourceName, { name: string; icon: React.ReactElement<IconProps>; sellPrice?: number }> = {
    // Base
    money: { name: 'Money', icon: React.createElement(MoneyIcon, { className: "text-green-400" }) },
    techCore: { name: 'Tech Cores', icon: React.createElement(TechCoreIcon, { className: "text-purple-400" }) },
    researchPoint: { name: 'Research', icon: React.createElement(ResearchPointIcon, { className: "text-blue-400" }) },
    
    // Tier 0
    ore: { name: 'Raw Ore', icon: React.createElement(OreIcon, { className: "text-gray-400" }), sellPrice: 0.25 },
    
    // Tier 1
    iron: { name: 'Iron Ore', icon: React.createElement(IronIcon, { className: "text-orange-300" }), sellPrice: 1 },
    copper: { name: 'Copper Ore', icon: React.createElement(CopperIcon, { className: "text-orange-500" }), sellPrice: 2 },
    gold: { name: 'Gold Ore', icon: React.createElement(GoldIcon, { className: "text-yellow-400" }), sellPrice: 10 },
    ironIngot: { name: 'Iron Ingot', icon: React.createElement(IronIcon, { className: "text-orange-200" }), sellPrice: 5 },
    ironPlate: { name: 'Iron Plate', icon: React.createElement(IronPlateIcon, { className: "text-slate-300" }), sellPrice: 15 },
    copperWire: { name: 'Copper Wire', icon: React.createElement(CopperWireIcon, { className: "text-orange-400" }), sellPrice: 12 },
    goldBar: { name: 'Gold Bar', icon: React.createElement(GoldIcon, { className: "text-yellow-300" }), sellPrice: 50 },
    circuit: { name: 'Circuit', icon: React.createElement(CircuitIcon, { className: "text-green-500" }), sellPrice: 50 },
    
    // Tier 2
    uranium: { name: 'Uranium Ore', icon: React.createElement(UraniumIcon, { className: 'text-green-500' }) },
    titanium: { name: 'Titanium Ore', icon: React.createElement(TitaniumIcon, { className: 'text-slate-400' }) },
    uraniumRod: { name: 'Uranium Rod', icon: React.createElement(UraniumIcon, { className: 'text-green-400' }) },
    titaniumPlate: { name: 'Titanium Plate', icon: React.createElement(TitaniumPlateIcon, { className: 'text-slate-200' }) },
    advancedCircuit: { name: 'Advanced Circuit', icon: React.createElement(AdvancedCircuitIcon, { className: 'text-teal-400' }) },
    
    // Tier 3: Radioactive
    neutroniumOre: { name: 'Neutronium Ore', icon: React.createElement(NeutroniumIcon, { className: 'text-fuchsia-500' }) },
    leadShielding: { name: 'Lead Shielding', icon: React.createElement(LeadShieldingIcon, { className: 'text-indigo-400' }) },
    quantumProcessor: { name: 'Quantum Processor', icon: React.createElement(QuantumProcessorIcon, { className: 'text-sky-400' }) },
    
    // Tier 4: Frozen
    cryoniteOre: { name: 'Cryonite Ore', icon: React.createElement(CryoniteIcon, { className: 'text-cyan-400' }) },
    liquidCoolant: { name: 'Liquid Coolant', icon: React.createElement(LiquidCoolantIcon, { className: 'text-blue-300' }) },
    superconductorCoil: { name: 'Superconductor', icon: React.createElement(SuperconductorCoilIcon, { className: 'text-cyan-200' }) },
    
    // Tier 5: Molten
    voltaniumOre: { name: 'Voltanium Ore', icon: React.createElement(VoltaniumIcon, { className: 'text-red-500' }) },
    heatShielding: { name: 'Heat Shielding', icon: React.createElement(HeatShieldingIcon, { className: 'text-orange-400' }) },
    plasmaCoil: { name: 'Plasma Coil', icon: React.createElement(PlasmaCoilIcon, { className: 'text-red-400' }) },
    
    // Tier 6: Bio
    organicResidue: { name: 'Organic Residue', icon: React.createElement(OrganicResidueIcon, { className: 'text-lime-500' }) },
    biolith: { name: 'Biolith', icon: React.createElement(BiolithIcon, { className: 'text-green-300' }) },
    enzymeCatalyst: { name: 'Enzyme Catalyst', icon: React.createElement(EnzymeCatalystIcon, { className: 'text-lime-300' }) },

    // Tier 7: Prestige
    obsiditeShard: { name: 'Obsidite Shard', icon: React.createElement(ObsiditeIcon, { className: 'text-indigo-500' }) },
    voidCrystal: { name: 'Void Crystal', icon: React.createElement(VoidCrystalIcon, { className: 'text-purple-400' }) },
    xenitePlate: { name: 'Xenite Plate', icon: React.createElement(XenitePlateIcon, { className: 'text-indigo-300' }) },
    voidAlloy: { name: 'Void Alloy', icon: React.createElement(VoidAlloyIcon, { className: 'text-purple-300' }) },
    antiMatterCore: { name: 'Anti-Matter Core', icon: React.createElement(AntiMatterCoreIcon, { className: 'text-fuchsia-400' }) },

    // Tier 8: Prestige II
    gravinite: { name: 'Gravinite', icon: React.createElement(GraviniteIcon, { className: 'text-rose-400' }) },
};


export const ZONES: Zone[] = [
    { id: 'surface', name: 'Surface Quarry', unlocksAt: { resource: 'money', amount: 0 } },
    { id: 'subsurface', name: 'Subsurface Crust', unlocksAt: { resource: 'ironIngot', amount: 500 } },
    { id: 'molten', name: 'Molten Core', unlocksAt: { resource: 'titaniumPlate', amount: 100 } },
    { id: 'radioactive', name: 'Radioactive Depths', unlocksAt: { resource: 'uraniumRod', amount: 500 } },
    { id: 'frozen', name: 'Frozen Caverns', unlocksAt: { resource: 'quantumProcessor', amount: 100 } },
    { id: 'void_rift', name: 'Void Rift', unlocksAt: { resource: 'techCore', amount: 1 }, prestigeRequired: 1 },
];

export const INITIAL_MACHINES: Machine[] = [
  // TIER 1 - Basic
  {
    id: 'miner', name: 'Auto Miner', description: 'Generates a steady stream of raw ore.', category: 'Miners',
    baseCost: { money: 15 }, cost: { money: 15 }, recipe: {}, output: { ore: 1 }, productionTime: 2000,
    count: 0, icon: React.createElement(AutoMinerIcon, null), zoneId: 'surface', unlocked: true,
  },
  {
    id: 'deep_miner', name: 'Deep Core Miner', description: 'Mines both iron and copper ore.', category: 'Miners',
    baseCost: { money: 200 }, cost: { money: 200 }, recipe: {}, output: { iron: 2, copper: 1 }, productionTime: 5000,
    count: 0, icon: React.createElement(DrillIcon, null), zoneId: 'surface', unlocked: true,
  },
  {
    id: 'iron_smelter', name: 'Iron Smelter', description: 'Smelts iron ore into iron ingots.', category: 'Smelters',
    baseCost: { money: 500, ore: 50 }, cost: { money: 500, ore: 50 }, recipe: { iron: 2 }, output: { ironIngot: 1 }, productionTime: 3000,
    count: 0, icon: React.createElement(SmelterIcon, null), zoneId: 'surface', unlocked: true,
  },
   {
    id: 'plate_press', name: 'Plate Press', description: 'Presses iron ingots into sturdy iron plates.', category: 'Processors',
    baseCost: { money: 2500, ironIngot: 20 }, cost: { money: 2500, ironIngot: 20 }, recipe: { ironIngot: 2 }, output: { ironPlate: 1 }, productionTime: 4000,
    count: 0, icon: React.createElement(FactoryIcon, null), zoneId: 'subsurface', unlocked: false,
  },
  {
    id: 'copper_furnace', name: 'Copper Furnace', description: 'Turns copper ore into copper wire.', category: 'Smelters',
    baseCost: { money: 1000 }, cost: { money: 1000 }, recipe: { copper: 2 }, output: { copperWire: 1 }, productionTime: 3000,
    count: 0, icon: React.createElement(SmelterIcon, { className: 'text-red-400' }), zoneId: 'surface', unlocked: true,
  },
  {
    id: 'circuit_assembler', name: 'Circuit Assembler', description: 'Combines iron plates and copper wire to produce circuits.', category: 'Assemblers',
    baseCost: { money: 10000, ironPlate: 50 }, cost: { money: 10000, ironPlate: 50 }, recipe: { ironPlate: 2, copperWire: 3 }, output: { circuit: 1, researchPoint: 1 }, productionTime: 10000,
    count: 0, icon: React.createElement(WrenchScrewdriverIcon, null), zoneId: 'subsurface', unlocked: false,
  },
  // TIER 2 - Advanced Components
  {
    id: 'gold_smelter', name: 'Gold Kiln', description: 'Smelts gold ore into gold bars.', category: 'Smelters',
    baseCost: { money: 25000, ironPlate: 100 }, cost: { money: 25000, ironPlate: 100 }, recipe: { gold: 5 }, output: { goldBar: 1 }, productionTime: 8000,
    count: 0, icon: React.createElement(SmelterIcon, { className: 'text-yellow-400' }), zoneId: 'subsurface', unlocked: false,
  },
  {
    id: 'advanced_miner', name: 'Advanced Miner', description: 'Mines Titanium and Uranium ore.', category: 'Miners',
    baseCost: { money: 50000, circuit: 20 }, cost: { money: 50000, circuit: 20 }, recipe: {}, output: { titanium: 1, uranium: 1 }, productionTime: 10000,
    count: 0, icon: React.createElement(DrillIcon, { className: 'text-teal-400' }), zoneId: 'subsurface', unlocked: false,
  },
  {
    id: 'uranium_centrifuge', name: 'Uranium Centrifuge', description: 'Enriches uranium ore into usable rods.', category: 'Processors',
    baseCost: { money: 75000, circuit: 50 }, cost: { money: 75000, circuit: 50 }, recipe: { uranium: 10 }, output: { uraniumRod: 1 }, productionTime: 12000,
    count: 0, icon: React.createElement(FactoryIcon, { className: 'text-green-500' }), zoneId: 'molten', unlocked: false,
  },
  {
    id: 'titanium_forge', name: 'Titanium Forge', description: 'Forges titanium ore into durable plates.', category: 'Processors',
    baseCost: { money: 60000, circuit: 40 }, cost: { money: 60000, circuit: 40 }, recipe: { titanium: 5 }, output: { titaniumPlate: 1 }, productionTime: 9000,
    count: 0, icon: React.createElement(FactoryIcon, { className: 'text-slate-400' }), zoneId: 'molten', unlocked: false,
  },
  {
    id: 'advanced_assembler', name: 'Advanced Assembler', description: 'Builds advanced circuits from gold and titanium.', category: 'Assemblers',
    baseCost: { money: 150000, circuit: 100 }, cost: { money: 150000, circuit: 100 }, recipe: { goldBar: 2, titaniumPlate: 3 }, output: { advancedCircuit: 1 }, productionTime: 15000,
    count: 0, icon: React.createElement(WrenchScrewdriverIcon, { className: 'text-teal-400' }), zoneId: 'molten', unlocked: false,
  },
  // TIER 3+ - Exotic Extractors and their components
  {
    id: 'radiation_siphon', name: 'Radiation Siphon', description: 'Siphons rare Neutronium from radioactive fields.', category: 'Exotic Extractors',
    baseCost: { titaniumPlate: 200, advancedCircuit: 50 }, cost: { titaniumPlate: 200, advancedCircuit: 50 }, recipe: {}, output: { neutroniumOre: 1 }, productionTime: 30000,
    count: 0, icon: React.createElement(NeutroniumIcon, null), zoneId: 'radioactive', unlocked: false,
  },
  {
    id: 'quantum_assembler', name: 'Quantum Assembler', description: 'Assembles Quantum Processors.', category: 'Assemblers',
    baseCost: { uraniumRod: 100, advancedCircuit: 150 }, cost: { uraniumRod: 100, advancedCircuit: 150 }, recipe: { neutroniumOre: 5, goldBar: 10 }, output: { quantumProcessor: 1 }, productionTime: 25000,
    count: 0, icon: React.createElement(QuantumProcessorIcon, null), zoneId: 'radioactive', unlocked: false,
  },
  {
    id: 'cryo_extractor', name: 'Cryo Extractor', description: 'Extracts Cryonite from deep ice.', category: 'Exotic Extractors',
    baseCost: { titaniumPlate: 500, advancedCircuit: 100 }, cost: { titaniumPlate: 500, advancedCircuit: 100 }, recipe: {}, output: { cryoniteOre: 1 }, productionTime: 45000,
    count: 0, icon: React.createElement(CryoniteIcon, null), zoneId: 'frozen', unlocked: false,
  },
  {
    id: 'superconductor_fabricator', name: 'Superconductor Fabricator', description: 'Fabricates superconductors from cryonite.', category: 'Assemblers',
    baseCost: { quantumProcessor: 50, advancedCircuit: 200 }, cost: { quantumProcessor: 50, advancedCircuit: 200 }, recipe: { cryoniteOre: 5, copperWire: 100 }, output: { superconductorCoil: 1 }, productionTime: 35000,
    count: 0, icon: React.createElement(SuperconductorCoilIcon, null), zoneId: 'frozen', unlocked: false,
  },
  {
    id: 'plasma_harvester', name: 'Plasma Harvester', description: 'Harvests Voltanium from molten plasma vents.', category: 'Exotic Extractors',
    baseCost: { uraniumRod: 200, quantumProcessor: 20 }, cost: { uraniumRod: 200, quantumProcessor: 20 }, recipe: {}, output: { voltaniumOre: 1 }, productionTime: 60000,
    count: 0, icon: React.createElement(VoltaniumIcon, null), zoneId: 'molten', unlocked: false,
  },
   {
    id: 'dark_matter_drill', name: 'Dark Matter Drill', description: 'Drills for Obsidite and Void Crystals.', category: 'Exotic Extractors',
    baseCost: { techCore: 5, superconductorCoil: 100 }, cost: { techCore: 5, superconductorCoil: 100 }, recipe: {}, output: { obsiditeShard: 2, voidCrystal: 1 }, productionTime: 120000,
    count: 0, icon: React.createElement(ObsiditeIcon, null), zoneId: 'void_rift', unlocked: false,
  },
  {
    id: 'void_alloy_foundry', name: 'Void Alloy Foundry', description: 'Fuses prestige materials into Void Alloy.', category: 'Processors',
    baseCost: { techCore: 10, quantumProcessor: 200 }, cost: { techCore: 10, quantumProcessor: 200 }, recipe: { obsiditeShard: 5, voidCrystal: 2, titaniumPlate: 50 }, output: { voidAlloy: 1 }, productionTime: 90000,
    count: 0, icon: React.createElement(VoidAlloyIcon, null), zoneId: 'void_rift', unlocked: false,
  },
  
];

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'reinforced_pick', name: 'Reinforced Pickaxe', description: 'Doubles the output of each manual ore click.', cost: { money: 100 },
    isPurchased: false, targetId: 'click', multiplier: 2, icon: React.createElement(PickaxeIcon, null)
  },
  {
    id: 'miner_gears', name: 'Better Gears', description: 'Doubles the production of all Auto Miners.', cost: { money: 500 },
    isPurchased: false, targetId: 'miner', multiplier: 2, icon: React.createElement(GearIcon, null)
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'click_1', name: 'Getting Started', description: 'Click the ore.', category: 'clicks', target: 'totalClicks', progress: 0,
        tiers: [
            { goal: 1, reward: '+1% Click Power', isClaimed: false },
            { goal: 100, reward: '+2% Click Power', isClaimed: false },
            { goal: 1000, reward: '+5% Click Power', isClaimed: false },
        ]
    },
    {
        id: 'ore_1', name: 'Novice Miner', description: 'Mine some ore.', category: 'ores', target: 'ore', progress: 0,
        tiers: [
            { goal: 100, reward: '+1% Miner Speed', isClaimed: false },
            { goal: 1000, reward: '+2% Miner Speed', isClaimed: false },
            { goal: 10000, reward: '+5% Miner Speed', isClaimed: false },
        ]
    }
];

export const INITIAL_RESEARCH_TREE: ResearchNode[] = [
    {
        id: 'mining_eff_1', name: 'Mining Efficiency I', description: 'Increases all miner output by 10%.',
        cost: { researchPoint: 5 }, dependencies: [], isUnlocked: false
    },
    {
        id: 'smelting_eff_1', name: 'Smelting Efficiency I', description: 'Increases all smelter output by 10%.',
        cost: { researchPoint: 10, ironIngot: 100 }, dependencies: ['mining_eff_1'], isUnlocked: false
    },
];

const initialResourceValues = resourceNames.reduce((acc, name) => {
    acc[name] = 0;
    return acc;
}, {} as Resources);

export const INITIAL_RESOURCES: Resources = {
    ...initialResourceValues,
    money: 10,
};

export const INITIAL_STATS: Stats = {
    playTime: 0,
    totalClicks: 0,
    moneyEarned: 0,
    itemsCrafted: 0,
    prestigeCount: 0,
    resourcesMined: {},
};