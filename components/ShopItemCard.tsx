import React from 'react';
import { formatNumber } from '../utils/format';
import { RESOURCE_DATA } from '../game/constants';
import type { Machine, Upgrade, ResourceName } from '../game/types';
import { ArrowRightIcon } from './icons';

interface ShopCardProps {
  item: Machine | Upgrade;
  onBuy: (id: string) => void;
  canAfford: boolean;
  isUpgrade?: boolean;
}

const ShopCard: React.FC<ShopCardProps> = ({ item, onBuy, canAfford, isUpgrade = false }) => {
  const machine = item as Machine;

  return (
    <div className={`bg-gray-800/50 p-4 rounded-lg border transition-colors duration-300 ${canAfford ? 'border-gray-600' : 'border-gray-700'}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-shrink-0">{item.icon}</div>
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-white">{item.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          
          {!isUpgrade && machine.productionTime && (
             <div className="text-xs text-accent mt-2 flex items-center gap-2 flex-wrap">
                <span className="font-bold">Produces:</span>
                {Object.entries(machine.recipe).map(([key, value]) => (
                    <span key={key} className="flex items-center gap-1 bg-red-900/50 px-1.5 py-0.5 rounded-md">
                        {React.cloneElement(RESOURCE_DATA[key as ResourceName].icon, {className: "w-3 h-3"})}
                        <span>{formatNumber(value as number)}</span>
                    </span>
                ))}
                <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                 {Object.entries(machine.output).map(([key, value]) => (
                    <span key={key} className="flex items-center gap-1 bg-green-900/50 px-1.5 py-0.5 rounded-md">
                        {React.cloneElement(RESOURCE_DATA[key as ResourceName].icon, {className: "w-3 h-3"})}
                        <span>{formatNumber(value as number)}</span>
                    </span>
                ))}
                <span className="text-gray-400">/ {machine.productionTime / 1000}s</span>
             </div>
          )}
        </div>
        {!isUpgrade && (
          <div className="flex-shrink-0 text-3xl font-black text-gray-500">
            {machine.count}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {Object.entries(item.cost).map(([key, value]) => {
            const resource = RESOURCE_DATA[key as ResourceName];
            if (!resource) return null;
            return (
              <div key={key} className="flex items-center gap-1.5 text-sm font-semibold">
                {React.cloneElement(resource.icon, {className: "w-4 h-4"})}
                <span>{formatNumber(value as number)}</span>
              </div>
            )
          })}
        </div>
        <button
          onClick={() => onBuy(item.id)}
          disabled={!canAfford}
          className="bg-accent hover:bg-accent-dark disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ShopCard;