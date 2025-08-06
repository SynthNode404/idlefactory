
import { useState, useEffect, useCallback, useMemo } from 'react';
import { produce } from 'https://esm.sh/immer@10.1.1';
import type { GameState, Machine, Upgrade, ResourceName, Resources } from '../game/types';
import { INITIAL_MACHINES, INITIAL_RESOURCES, INITIAL_STATS, INITIAL_UPGRADES, RESOURCE_DATA } from '../game/constants';

const SAVE_KEY = 'idleFactorySaveData_v2';

// Correctly creates a fresh game state without breaking non-serializable data like React elements for icons.
const getInitialState = (): GameState => ({
    resources: { ...INITIAL_RESOURCES },
    // Deep copy machines and upgrades to avoid mutating the constants,
    // while preserving non-serializable React Elements for icons.
    machines: INITIAL_MACHINES.map(m => ({ ...m, cost: { ...m.cost } })),
    upgrades: INITIAL_UPGRADES.map(u => ({ ...u, cost: { ...u.cost } })),
    stats: { ...INITIAL_STATS, resourcesMined: {} },
    clickPower: 1,
    lastUpdate: Date.now(),
    lastSave: null,
});

const loadGame = (): GameState => {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            const loadedState = JSON.parse(saved) as Partial<GameState>;
            const initialState = getInitialState();

            // Create lookup maps for saved progress
            const savedMachinesMap = new Map(loadedState.machines?.map((m: Machine) => [m.id, m]));
            const savedUpgradesMap = new Map(loadedState.upgrades?.map((u: Upgrade) => [u.id, u]));

            // Re-hydrate machines: merge saved data onto the master list from constants
            const machines = initialState.machines.map(initialMachine => {
                const savedMachine = savedMachinesMap.get(initialMachine.id);
                if (savedMachine) {
                    // Important: Use initialMachine as the base to keep the valid icon
                    return { ...initialMachine, ...savedMachine, icon: initialMachine.icon };
                }
                return initialMachine; // New machine not in save file
            });

            // Re-hydrate upgrades similarly
            const upgrades = initialState.upgrades.map(initialUpgrade => {
                const savedUpgrade = savedUpgradesMap.get(initialUpgrade.id);
                if (savedUpgrade) {
                    return { ...initialUpgrade, ...savedUpgrade, icon: initialUpgrade.icon };
                }
                return initialUpgrade;
            });
            
            const finalState: GameState = {
                // Start with a valid shape
                ...initialState,
                // Overwrite with loaded scalar values.
                clickPower: loadedState.clickPower ?? initialState.clickPower,
                // Explicitly merge sub-objects
                resources: { ...initialState.resources, ...(loadedState.resources || {}) },
                stats: { ...initialState.stats, ...(loadedState.stats || {}) },
                // Use the rehydrated arrays
                machines: machines,
                upgrades: upgrades,
                // Set runtime values
                lastUpdate: Date.now(),
                lastSave: loadedState.lastSave ? new Date(loadedState.lastSave) : null,
            };

            // Migration for playTime from string to number
            if (finalState.stats && typeof (finalState.stats.playTime as any) === 'string') {
                const oldTime = parseInt(finalState.stats.playTime as any, 10);
                finalState.stats.playTime = isNaN(oldTime) ? 0 : oldTime;
            }

            return finalState;
        }
    } catch (e) {
        console.error("Failed to load saved game, resetting:", e);
        localStorage.removeItem(SAVE_KEY); // Clear corrupted save data
    }
    return getInitialState();
};

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>(loadGame);
    const [resourcesPerSecond, setResourcesPerSecond] = useState<Partial<Resources>>({});

    // Main Game Loop
    useEffect(() => {
        const gameLoop = setInterval(() => {
            const now = Date.now();
            const delta = (now - gameState.lastUpdate) / 1000;
            if (delta <= 0) return;

            setGameState(produce(draft => {
                let totalItemsCrafted = 0;
                const nextRps: Partial<Resources> = {};

                draft.stats.playTime = (draft.stats.playTime || 0) + delta;

                draft.machines.forEach(machine => {
                    if (machine.count === 0) return;

                    const upgradeMultiplier = draft.upgrades
                        .filter(u => u.isPurchased && (u.targetId === machine.id || u.targetId === 'ALL'))
                        .reduce((mult, u) => mult * u.multiplier, 1);

                    const productionsPerSecond = (1000 / machine.productionTime) * machine.count * upgradeMultiplier;
                    
                    const hasRecipe = Object.keys(machine.recipe).length > 0;
                    
                    if (!hasRecipe) {
                         const amountProduced = productionsPerSecond * delta;
                         Object.entries(machine.output).forEach(([resource, value]) => {
                            draft.resources[resource as ResourceName] += (value as number) * amountProduced;
                            nextRps[resource as ResourceName] = (nextRps[resource as ResourceName] || 0) + (value as number) * productionsPerSecond;
                        });
                    } else {
                        // For machines with recipes, calculate max possible productions based on available resources
                        let maxProductionsPossibleInTick = Infinity;
                        Object.entries(machine.recipe).forEach(([resource, cost]) => {
                           if((cost as number) > 0) {
                             const maxForResource = draft.resources[resource as ResourceName] / (cost as number);
                             maxProductionsPossibleInTick = Math.min(maxProductionsPossibleInTick, maxForResource);
                           }
                        });
                        
                        const productionsThisTick = Math.min(productionsPerSecond * delta, maxProductionsPossibleInTick);

                        if (productionsThisTick > 0) {
                            totalItemsCrafted += productionsThisTick;
                            Object.entries(machine.recipe).forEach(([resource, cost]) => {
                                draft.resources[resource as ResourceName] -= (cost as number) * productionsThisTick;
                            });
                            Object.entries(machine.output).forEach(([resource, value]) => {
                                draft.resources[resource as ResourceName] += (value as number) * productionsThisTick;
                                nextRps[resource as ResourceName] = (nextRps[resource as ResourceName] || 0) + (value as number) * (productionsThisTick / delta);
                            });
                        }
                    }
                });
                 draft.stats.itemsCrafted += totalItemsCrafted;
                 draft.lastUpdate = now;
                 setResourcesPerSecond(nextRps);
            }));

        }, 1000); // Update once per second

        return () => clearInterval(gameLoop);
    }, [gameState.lastUpdate]);

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
        }, 30000); // Save every 30 seconds

        return () => clearInterval(autoSave);
    }, []);
    
    const manualClick = useCallback(() => {
        setGameState(produce(draft => {
            draft.resources.ore += draft.clickPower;
            draft.stats.totalClicks += 1;
        }));
    }, []);

    const buyMachine = useCallback((machineId: string) => {
        setGameState(produce(draft => {
            const machine = draft.machines.find(m => m.id === machineId);
            if (!machine) return;

            const canAfford = Object.entries(machine.cost).every(
                ([resource, amount]) => draft.resources[resource as ResourceName] >= (amount as number)
            );

            if (canAfford) {
                Object.entries(machine.cost).forEach(
                    ([resource, amount]) => { draft.resources[resource as ResourceName] -= (amount as number); }
                );
                machine.count += 1;
                // Increase cost for next purchase
                Object.keys(machine.cost).forEach(res => {
                    const resource = res as ResourceName;
                    machine.cost[resource] = Math.ceil(machine.baseCost[resource]! * Math.pow(1.15, machine.count));
                });
            }
        }));
    }, []);

    const buyUpgrade = useCallback((upgradeId: string) => {
        setGameState(produce(draft => {
            const upgrade = draft.upgrades.find(u => u.id === upgradeId);
            if (!upgrade || upgrade.isPurchased) return;
            
            const canAfford = Object.entries(upgrade.cost).every(
                ([resource, amount]) => draft.resources[resource as ResourceName] >= (amount as number)
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
            if (!price || draft.resources[resource] < amount) return;

            draft.resources[resource] -= amount;
            const moneyGained = amount * price;
            draft.resources.money += moneyGained;
            draft.stats.moneyEarned += moneyGained;
        }));
    }, []);
    
    const canPrestige = useCallback(() => gameState.resources.money >= 1e6, [gameState.resources.money]);

    const prestigeGain = useMemo(() => {
        if (!canPrestige()) return 0;
        return Math.floor(Math.sqrt(gameState.resources.money / 1e5)) || 0;
    }, [gameState.resources.money, canPrestige]);

    const prestige = useCallback(() => {
        if (!canPrestige()) return;
        const gain = prestigeGain;
        
        const oldStats = { ...gameState.stats };

        setGameState(produce(draft => {
            const techCores = draft.resources.techCore + gain;
            
            const freshState = getInitialState();
            
            Object.assign(draft, freshState);
            
            draft.resources.techCore = techCores;
            draft.stats.prestigeCount = oldStats.prestigeCount + 1;
            draft.stats.playTime = oldStats.playTime;
            draft.stats.totalClicks = oldStats.totalClicks;
        }));

    }, [canPrestige, prestigeGain, gameState.stats]);

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
            prestigeGain
        }
    };
};
