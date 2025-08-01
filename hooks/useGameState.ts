

import { useState, useEffect, useCallback, useMemo } from 'react';
import { produce } from 'https://esm.sh/immer@10.1.1';
import type { GameState, Machine, Upgrade, ResourceName, Resources, Achievement, ResearchNode } from '../types';
import { INITIAL_MACHINES, INITIAL_RESOURCES, INITIAL_STATS, INITIAL_UPGRADES, RESOURCE_DATA, ZONES, INITIAL_ACHIEVEMENTS, INITIAL_RESEARCH_TREE } from '../constants';

const SAVE_KEY = 'idleFactorySaveData_v2.2';

const getInitialState = (): GameState => ({
    resources: { ...INITIAL_RESOURCES },
    machines: INITIAL_MACHINES.map(m => ({ ...m, cost: { ...m.baseCost } })),
    upgrades: INITIAL_UPGRADES.map(u => ({ ...u, cost: { ...u.cost } })),
    stats: { ...INITIAL_STATS, resourcesMined: {} },
    achievements: INITIAL_ACHIEVEMENTS.map(a => ({...a, tiers: a.tiers.map(t => ({...t}))})),
    research: INITIAL_RESEARCH_TREE.map(r => ({...r, cost: {...r.cost}})),
    clickPower: 1,
    lastUpdate: Date.now(),
    lastSave: null,
    storage: 10000,
    currentZoneId: 'surface',
    achievementMultipliers: { click: 1, miner: 1, smelter: 1, assembler: 1, exoticExtractor: 1 },
});

const loadGame = (): GameState => {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            const loadedState = JSON.parse(saved);
            const initialState = getInitialState();

            // Intelligent merge of saved data with initial data to handle game updates
            const mergedState = { ...initialState };

            //Scalar values
            mergedState.clickPower = loadedState.clickPower ?? initialState.clickPower;
            mergedState.storage = loadedState.storage ?? initialState.storage;
            mergedState.currentZoneId = loadedState.currentZoneId ?? initialState.currentZoneId;

            //Objects
            mergedState.resources = { ...initialState.resources, ...(loadedState.resources || {}) };
            mergedState.stats = { ...initialState.stats, ...(loadedState.stats || {}) };
            mergedState.achievementMultipliers = { ...initialState.achievementMultipliers, ...(loadedState.achievementMultipliers || {}) };

            //Arrays of objects (merge saved progress into the master list from constants)
            const mergeArray = (initialArr: any[], savedArr: any[], idField = 'id') => {
                 const savedMap = new Map(savedArr?.map(item => [item[idField], item]));
                 return initialArr.map(initialItem => {
                     const savedItem = savedMap.get(initialItem[idField]);
                     if (savedItem) {
                         // Preserve icon from initial data, but take saved progress.
                         // Crucially, use the baseCost from the new constants, but the *current* cost from save.
                         const finalItem = { ...initialItem, ...savedItem, icon: initialItem.icon, baseCost: initialItem.baseCost };
                         if(!savedItem.cost) { // handle legacy saves before cost scaling
                             finalItem.cost = finalItem.baseCost;
                         }
                         return finalItem;
                     }
                     return initialItem;
                 });
            };

            mergedState.machines = mergeArray(initialState.machines, loadedState.machines);
            mergedState.upgrades = mergeArray(initialState.upgrades, loadedState.upgrades);
            mergedState.achievements = mergeArray(initialState.achievements, loadedState.achievements);
            mergedState.research = mergeArray(initialState.research, loadedState.research);

            mergedState.lastUpdate = Date.now();
            mergedState.lastSave = loadedState.lastSave ? new Date(loadedState.lastSave) : null;

            return mergedState;
        }
    } catch (e) {
        console.error("Failed to load saved game, resetting:", e);
        localStorage.removeItem(SAVE_KEY);
    }
    return getInitialState();
};

const nonStorageResources: ResourceName[] = ['money', 'techCore', 'researchPoint'];

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(loadGame);
    const [resourcesPerSecond, setResourcesPerSecond] = useState<Partial<Resources>>({});

    const checkAndAwardAchievements = useCallback((draft: GameState) => {
        draft.achievements.forEach(ach => {
            let progress = 0;
            if (ach.category === 'clicks') progress = draft.stats.totalClicks;
            else if (ach.category === 'ores' && ach.target) progress = draft.stats.resourcesMined[ach.target as ResourceName] || 0;
            else if (ach.category === 'prestige') progress = draft.stats.prestigeCount;
            // Add more categories here...

            ach.progress = progress;
        });
    }, []);
    
    // Main Game Loop
    useEffect(() => {
        const gameLoop = setInterval(() => {
            const now = Date.now();
            const delta = (now - gameState.lastUpdate) / 1000;
            if (delta <= 0) return;

            setGameState(produce(draft => {
                let totalItemsCrafted = 0;
                const nextRps: Partial<Resources> = {};
                const totalPhysicalResources = Object.entries(draft.resources)
                    .filter(([key]) => !nonStorageResources.includes(key as ResourceName))
                    .reduce((sum, [, value]) => sum + (value as number), 0);

                draft.stats.playTime += delta;

                draft.machines.forEach(machine => {
                    if (machine.count === 0 || !machine.unlocked) return;

                    const upgradeMultiplier = draft.upgrades
                        .filter(u => u.isPurchased && (u.targetId === machine.id || u.targetId === 'ALL'))
                        .reduce((mult, u) => mult * u.multiplier, 1);
                    
                    let achievementMultiplier = 1;
                    if (machine.category === 'Miners') achievementMultiplier = draft.achievementMultipliers.miner;
                    else if (machine.category === 'Smelters') achievementMultiplier = draft.achievementMultipliers.smelter;
                    else if (machine.category === 'Assemblers' || machine.category === 'Processors') achievementMultiplier = draft.achievementMultipliers.assembler;
                    else if (machine.category === 'Exotic Extractors') achievementMultiplier = draft.achievementMultipliers.exoticExtractor;


                    const productionsPerSecond = (1000 / machine.productionTime) * machine.count * upgradeMultiplier * achievementMultiplier;
                    
                    const hasRecipe = Object.keys(machine.recipe).length > 0;
                    
                    if (!hasRecipe) {
                         const amountProduced = productionsPerSecond * delta;
                         Object.entries(machine.output).forEach(([resource, value]) => {
                            if (totalPhysicalResources < draft.storage) {
                                draft.resources[resource as ResourceName] = (draft.resources[resource as ResourceName] || 0) + (value as number) * amountProduced;
                            }
                            nextRps[resource as ResourceName] = (nextRps[resource as ResourceName] || 0) + (value as number) * productionsPerSecond;
                        });
                    } else {
                        let maxProductionsPossibleInTick = Infinity;
                        Object.entries(machine.recipe).forEach(([resource, cost]) => {
                           if((cost as number) > 0) {
                             const maxForResource = (draft.resources[resource as ResourceName] || 0) / (cost as number);
                             maxProductionsPossibleInTick = Math.min(maxProductionsPossibleInTick, maxForResource);
                           }
                        });
                        
                        const productionsThisTick = Math.min(productionsPerSecond * delta, maxProductionsPossibleInTick);

                        if (productionsThisTick > 0) {
                            if (totalPhysicalResources >= draft.storage) return;

                            totalItemsCrafted += productionsThisTick;
                            Object.entries(machine.recipe).forEach(([resource, cost]) => {
                                draft.resources[resource as ResourceName] -= (cost as number) * productionsThisTick;
                            });
                            Object.entries(machine.output).forEach(([resource, value]) => {
                                draft.resources[resource as ResourceName] = (draft.resources[resource as ResourceName] || 0) + (value as number) * productionsThisTick;
                                nextRps[resource as ResourceName] = (nextRps[resource as ResourceName] || 0) + (value as number) * (productionsThisTick / delta);
                            });
                        }
                    }
                });
                 draft.stats.itemsCrafted += totalItemsCrafted;
                 draft.lastUpdate = now;

                 // Zone and machine unlocks
                const currentZoneIndex = ZONES.findIndex(z => z.id === draft.currentZoneId);
                if (currentZoneIndex < ZONES.length - 1) { // If not in the last zone
                    const nextZone = ZONES[currentZoneIndex + 1];
                    const canUnlock = (draft.resources[nextZone.unlocksAt.resource] || 0) >= nextZone.unlocksAt.amount &&
                                      (draft.stats.prestigeCount || 0) >= (nextZone.prestigeRequired || 0);
                    if (canUnlock) {
                        draft.currentZoneId = nextZone.id;
                    }
                }

                 draft.machines.forEach(m => {
                    if (!m.unlocked && m.zoneId === draft.currentZoneId) {
                        m.unlocked = true;
                    }
                 });


                 checkAndAwardAchievements(draft);
                 setResourcesPerSecond(nextRps);
            }));

        }, 1000);

        return () => clearInterval(gameLoop);
    }, [gameState.lastUpdate, checkAndAwardAchievements]);

    // Auto-save
    useEffect(() => {
        const autoSave = setInterval(() => {
            setGameState(s => {
                 const stateToSave = { ...s, lastSave: new Date() };
                 localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
                 return produce(s, draft => {
                    draft.lastSave = stateToSave.lastSave;
                });
            });
        }, 30000);

        return () => clearInterval(autoSave);
    }, []);
    
    const manualClick = useCallback(() => {
        setGameState(produce(draft => {
            const clickAmount = draft.clickPower * draft.achievementMultipliers.click;
            const totalPhysicalResources = Object.entries(draft.resources)
                .filter(([key]) => !nonStorageResources.includes(key as ResourceName))
                .reduce((sum, [, value]) => sum + (value as number), 0);
                
            if (totalPhysicalResources + clickAmount <= draft.storage) {
                draft.resources.ore += clickAmount;
                draft.stats.resourcesMined.ore = (draft.stats.resourcesMined.ore || 0) + clickAmount;
            }
            draft.stats.totalClicks += 1;
        }));
    }, []);

    const buyMachine = useCallback((machineId: string) => {
        setGameState(produce(draft => {
            const machine = draft.machines.find(m => m.id === machineId);
            if (!machine || !machine.unlocked) return;

            const canAfford = Object.entries(machine.cost).every(
                ([resource, amount]) => (draft.resources[resource as ResourceName] || 0) >= (amount as number)
            );

            if (canAfford) {
                Object.entries(machine.cost).forEach(
                    ([resource, amount]) => { draft.resources[resource as ResourceName] -= (amount as number); }
                );
                machine.count += 1;
                Object.keys(machine.cost).forEach(res => {
                    const resource = res as ResourceName;
                    if(machine.baseCost[resource]) {
                         machine.cost[resource] = Math.ceil((machine.baseCost[resource] as number) * Math.pow(1.15, machine.count));
                    }
                });
            }
        }));
    }, []);

    const buyUpgrade = useCallback((upgradeId: string) => {
        setGameState(produce(draft => {
            const upgrade = draft.upgrades.find(u => u.id === upgradeId);
            if (!upgrade || upgrade.isPurchased) return;
            
            const canAfford = Object.entries(upgrade.cost).every(
                ([resource, amount]) => (draft.resources[resource as ResourceName] || 0) >= (amount as number)
            );

            if (canAfford) {
                 Object.entries(upgrade.cost).forEach(
                    ([resource, amount]) => { draft.resources[resource as ResourceName] -= (amount as number); }
                );
                upgrade.isPurchased = true;
                if (upgrade.targetId === 'click') {
                    draft.clickPower *= upgrade.multiplier;
                }
            }
        }));
    }, []);
    
    const sellResource = useCallback((resource: ResourceName, amount: number) => {
        setGameState(produce(draft => {
            const price = RESOURCE_DATA[resource]?.sellPrice;
            if (typeof price !== 'number' || (draft.resources[resource] || 0) < amount) return;

            draft.resources[resource] -= amount;
            const moneyGained = amount * price;
            draft.resources.money = (draft.resources.money || 0) + moneyGained;
            draft.stats.moneyEarned = (draft.stats.moneyEarned || 0) + moneyGained;
        }));
    }, []);

    const unlockResearch = useCallback((researchId: string) => {
        setGameState(produce(draft => {
            const node = draft.research.find(r => r.id === researchId);
            if (!node || node.isUnlocked) return;

            const depsMet = node.dependencies.every(depId => draft.research.find(r => r.id === depId)?.isUnlocked);
            if (!depsMet) return;

            const canAfford = Object.entries(node.cost).every(([res, cost]) => (draft.resources[res as ResourceName] || 0) >= (cost as number));

            if (canAfford) {
                 Object.entries(node.cost).forEach(([res, cost]) => {
                    draft.resources[res as ResourceName] -= cost as number;
                });
                node.isUnlocked = true;
            }
        }));
    }, []);

    const upgradeStorage = useCallback(() => {
        setGameState(produce(draft => {
            const cost = draft.storage * 5;
            if ((draft.resources.money || 0) >= cost) {
                draft.resources.money -= cost;
                draft.storage = Math.ceil(draft.storage * 2);
            }
        }));
    }, []);

    const claimAchievementReward = useCallback((achievementId: string, tierIndex: number) => {
        setGameState(produce(draft => {
            const achievement = draft.achievements.find(a => a.id === achievementId);
            if (!achievement || !achievement.tiers[tierIndex] || achievement.tiers[tierIndex].isClaimed) {
                return;
            }

            const tier = achievement.tiers[tierIndex];
            if (achievement.progress >= tier.goal) {
                tier.isClaimed = true;
                
                const reward = tier.reward.toLowerCase();
                const valuePart = reward.match(/([+-]?\d+(\.\d+)?%)/);
                if (valuePart) {
                    const percentage = parseFloat(valuePart[0]) / 100;
                    if (reward.includes('click')) {
                        draft.achievementMultipliers.click += percentage;
                    } else if (reward.includes('miner')) {
                        draft.achievementMultipliers.miner += percentage;
                    } else if (reward.includes('smelter')) {
                        draft.achievementMultipliers.smelter += percentage;
                    } else if (reward.includes('assembler') || reward.includes('processor')) {
                        draft.achievementMultipliers.assembler += percentage;
                    }
                }
            }
        }));
    }, []);
    
    const canPrestige = useCallback(() => (gameState.resources.money || 0) >= 1e6, [gameState.resources.money]);

    const prestigeGain = useMemo(() => {
        if (!canPrestige()) return 0;
        return Math.floor(Math.sqrt((gameState.resources.money || 0) / 1e5)) || 0;
    }, [gameState.resources.money, canPrestige]);

    const prestige = useCallback(() => {
        if (!canPrestige()) return;
        const gain = prestigeGain;
        
        setGameState(produce(draft => {
            const techCores = (draft.resources.techCore || 0) + gain;
            const prestigeCount = (draft.stats.prestigeCount || 0) + 1;
            const playTime = draft.stats.playTime;
            const totalClicks = draft.stats.totalClicks;
            const achievements = draft.achievements;
            const achievementMultipliers = draft.achievementMultipliers;
            const research = draft.research;

            const freshState = getInitialState();
            Object.assign(draft, freshState);
            
            draft.resources.techCore = techCores;
            draft.stats.prestigeCount = prestigeCount;
            draft.stats.playTime = playTime;
            draft.stats.totalClicks = totalClicks;
            
            draft.achievements = achievements;
            draft.achievementMultipliers = achievementMultipliers;
            draft.research = research;
        }));

    }, [canPrestige, prestigeGain]);

    const resetGame = useCallback(() => {
        localStorage.removeItem(SAVE_KEY);
        setGameState(getInitialState());
    }, []);

    return {
        gameState: { ...gameState, resourcesPerSecond },
        actions: {
            manualClick,
            buyMachine,
            buyUpgrade,
            sellResource,
            resetGame,
            prestige,
            canPrestige,
            prestigeGain,
            unlockResearch,
            upgradeStorage,
            claimAchievementReward,
        }
    };
};