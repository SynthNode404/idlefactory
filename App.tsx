import React, { useState, useCallback, useMemo } from 'react';
import { useGameState } from './hooks/useGameState';
import { RESOURCE_DATA, MACHINE_CATEGORIES } from './game/constants';
import type { Machine, Upgrade, ResourceName } from './game/types';
import { formatNumber, formatTime } from './utils/format';

import ResourceGrid from './components/ResourceDisplay';
import Clicker from './components/ClickerButton';
import ShopCard from './components/ShopItemCard';
import TabButton from './components/TabButton';
import ConfirmationModal from './components/ConfirmationModal';
import { ChartBarIcon, CogIcon, CurrencyDollarIcon, FireIcon, WrenchScrewdriverIcon, ArrowPathIcon } from './components/icons';

type Tab = 'factory' | 'upgrades' | 'market' | 'stats' | 'settings';

const App: React.FC = () => {
    const { gameState, actions } = useGameState();
    const [activeTab, setActiveTab] = useState<Tab>('factory');
    const [modalConfig, setModalConfig] = useState<{ show: boolean; title: string; message: string; onConfirm: () => void } | null>(null);
    
    const handleResetRequest = () => {
        setModalConfig({
            show: true,
            title: 'Full Game Reset',
            message: 'Are you sure you want to completely reset your progress? This action cannot be undone.',
            onConfirm: () => {
                actions.resetGame();
                setModalConfig(null);
            }
        });
    };

    const handlePrestigeRequest = () => {
        if (!actions.canPrestige()) {
             setModalConfig({
                show: true,
                title: 'Prestige Not Available',
                message: `You need at least ${formatNumber(1e6)} money to prestige.`,
                onConfirm: () => setModalConfig(null),
            });
            return;
        }
        setModalConfig({
            show: true,
            title: 'Prestige',
            message: `Are you sure you want to prestige? You will gain ${formatNumber(actions.prestigeGain)} Tech Cores and reset your current progress (money, machines, upgrades). Tech Cores provide permanent boosts.`,
            onConfirm: () => {
                actions.prestige();
                setModalConfig(null);
            }
        });
    };

    const panels: Record<Tab, React.ReactNode> = {
        factory: <FactoryPanel machines={gameState.machines} resources={gameState.resources} onBuy={actions.buyMachine} />,
        upgrades: <UpgradesPanel upgrades={gameState.upgrades} resources={gameState.resources} onBuy={actions.buyUpgrade} />,
        market: <MarketPanel resources={gameState.resources} onSell={actions.sellResource} />,
        stats: <StatsPanel stats={gameState.stats} />,
        settings: <SettingsPanel onReset={handleResetRequest} onPrestige={handlePrestigeRequest} lastSave={gameState.lastSave} prestigeGain={actions.prestigeGain} canPrestige={actions.canPrestige()} />,
    };

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center p-4 sm:p-6 lg:p-8 font-mono">
            {modalConfig?.show && (
                <ConfirmationModal
                    title={modalConfig.title}
                    message={modalConfig.message}
                    onConfirm={modalConfig.onConfirm}
                    onCancel={() => setModalConfig(null)}
                />
            )}
            <header className="w-full max-w-7xl mx-auto text-center mb-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-accent tracking-widest uppercase shadow-lg">
                    Idle Factory
                </h1>
            </header>

            <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-1 bg-secondary p-6 rounded-lg shadow-2xl border border-gray-700 flex flex-col justify-between space-y-4">
                    <ResourceGrid resources={gameState.resources} resourcesPerSecond={gameState.resourcesPerSecond} />
                    <Clicker onClick={actions.manualClick} stats={gameState.stats} clickPower={gameState.clickPower} />
                </section>

                <section className="lg:col-span-2 bg-secondary p-6 rounded-lg shadow-2xl border border-gray-700">
                    <div className="flex items-center border-b border-gray-700 mb-4">
                        <TabButton text="Factory" icon={<WrenchScrewdriverIcon />} active={activeTab === 'factory'} onClick={() => setActiveTab('factory')} />
                        <TabButton text="Upgrades" icon={<FireIcon />} active={activeTab === 'upgrades'} onClick={() => setActiveTab('upgrades')} />
                        <TabButton text="Market" icon={<CurrencyDollarIcon />} active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
                        <TabButton text="Stats" icon={<ChartBarIcon />} active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
                        <TabButton text="Settings" icon={<CogIcon />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    </div>
                    <div className="max-h-[65vh] overflow-y-auto pr-2">
                        {panels[activeTab]}
                    </div>
                </section>
            </main>
        </div>
    );
};

// --- PANELS ---

const FactoryPanel: React.FC<{ machines: Machine[]; resources: Record<ResourceName, number>; onBuy: (id: string) => void; }> = ({ machines, resources, onBuy }) => {
    const canAfford = useCallback((cost: Partial<Record<ResourceName, number>>) => {
        return Object.entries(cost).every(([resource, amount]) => resources[resource as ResourceName] >= amount);
    }, [resources]);

    return (
        <div className="space-y-6">
            {MACHINE_CATEGORIES.map(category => (
                <div key={category}>
                    <h2 className="text-2xl font-bold text-highlight mb-4">{category}</h2>
                    <div className="space-y-4">
                        {machines.filter(m => m.category === category).map(machine => (
                            <ShopCard key={machine.id} item={machine} onBuy={onBuy} canAfford={canAfford(machine.cost)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const UpgradesPanel: React.FC<{ upgrades: Upgrade[]; resources: Record<ResourceName, number>; onBuy: (id: string) => void; }> = ({ upgrades, resources, onBuy }) => {
    const availableUpgrades = useMemo(() => upgrades.filter(u => !u.isPurchased), [upgrades]);
    const canAfford = useCallback((cost: Partial<Record<ResourceName, number>>) => {
        return Object.entries(cost).every(([resource, amount]) => resources[resource as ResourceName] >= amount);
    }, [resources]);

    return (
        <div className="space-y-4">
            {availableUpgrades.length > 0 ? (
                availableUpgrades.map(upgrade => (
                    <ShopCard key={upgrade.id} item={upgrade} onBuy={onBuy} canAfford={canAfford(upgrade.cost)} isUpgrade />
                ))
            ) : (
                <p className="text-gray-400 italic">No new upgrades available.</p>
            )}
        </div>
    );
};

const MarketPanel: React.FC<{ resources: Record<ResourceName, number>; onSell: (resource: ResourceName, amount: number) => void; }> = ({ resources, onSell }) => {
    const sellableResources = Object.keys(RESOURCE_DATA).filter(r => RESOURCE_DATA[r as ResourceName].sellPrice) as ResourceName[];
    
    const handleSell = (resource: ResourceName, percentage: number) => {
        const amountToSell = Math.floor(resources[resource] * percentage);
        if (amountToSell > 0) {
            onSell(resource, amountToSell);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-highlight mb-4">Market</h2>
            <p className="text-gray-400 mb-4">Sell materials for money.</p>
            {sellableResources.map(resource => {
                const data = RESOURCE_DATA[resource];
                const amount = resources[resource];
                if (amount === 0) return null;
                return (
                    <div key={resource} className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {React.cloneElement(data.icon, { className: 'w-8 h-8' })}
                            <div>
                                <p className="text-lg font-bold">{data.name}</p>
                                <p className="text-sm text-gray-400">Price: ${data.sellPrice}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleSell(resource, 0.25)} className="text-xs bg-accent/80 hover:bg-accent px-2 py-1 rounded">25%</button>
                            <button onClick={() => handleSell(resource, 0.50)} className="text-xs bg-accent/80 hover:bg-accent px-2 py-1 rounded">50%</button>
                            <button onClick={() => handleSell(resource, 1)} className="text-xs bg-accent/80 hover:bg-accent px-2 py-1 rounded">ALL</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const StatsPanel: React.FC<{ stats: any }> = ({ stats }) => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold text-highlight mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <div className="bg-gray-800/50 p-4 rounded-lg">Play Time: <span className="text-accent-light font-bold">{formatTime(stats.playTime)}</span></div>
            <div className="bg-gray-800/50 p-4 rounded-lg">Total Clicks: <span className="text-accent-light font-bold">{formatNumber(stats.totalClicks)}</span></div>
            <div className="bg-gray-800/50 p-4 rounded-lg">Money Earned: <span className="text-accent-light font-bold">${formatNumber(stats.moneyEarned)}</span></div>
            <div className="bg-gray-800/50 p-4 rounded-lg">Items Crafted: <span className="text-accent-light font-bold">{formatNumber(stats.itemsCrafted)}</span></div>
             <div className="bg-gray-800/50 p-4 rounded-lg">Prestige Count: <span className="text-accent-light font-bold">{formatNumber(stats.prestigeCount)}</span></div>
        </div>
    </div>
);

const SettingsPanel: React.FC<{ onReset: () => void; onPrestige: () => void; lastSave: Date | null; prestigeGain: number; canPrestige: boolean; }> = ({ onReset, onPrestige, lastSave, prestigeGain, canPrestige }) => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-highlight mb-4">Prestige</h2>
            <p className="text-gray-400 mb-4">Reset your progress to earn Tech Cores for powerful, permanent boosts. Requires ${formatNumber(1e6)} to prestige.</p>
            <button
                onClick={onPrestige}
                disabled={!canPrestige}
                className="w-full bg-highlight hover:bg-yellow-400 text-primary font-bold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
                <ArrowPathIcon className="w-6 h-6" />
                <span>Prestige for {formatNumber(prestigeGain)} Tech Cores</span>
            </button>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-highlight mb-4">Game Data</h2>
            <div className="text-gray-400 mb-4">
                <p>Your game is auto-saved to this browser's local storage every 30 seconds.</p>
                <p>Last save: {lastSave ? lastSave.toLocaleTimeString() : 'Never'}</p>
            </div>
            <button
                onClick={onReset}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200"
            >
                Full Game Reset
            </button>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-highlight mb-4">Changelog</h2>
            <div className="text-gray-400 space-y-2">
                <p><span className="font-bold text-accent-light">v2.0</span> - The Big Overhaul! Added multiple resources, production chains, a market, stats, settings, and a prestige system.</p>
                <p><span className="font-bold text-accent-light">v1.0</span> - Initial release.</p>
            </div>
        </div>
    </div>
);


export default App;