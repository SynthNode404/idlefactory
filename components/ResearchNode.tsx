

import React from 'react';
import { formatNumber } from '../utils/format';
import { RESOURCE_DATA } from '../constants';
import type { ResearchNode, ResourceName } from '../types';
import { LockClosedIcon, CheckCircleIcon } from './icons';

interface ResearchNodeProps {
    node: ResearchNode;
    canAfford: boolean;
    onUnlock: (id: string) => void;
    isUnlockable: boolean;
}

const ResearchNodeCard: React.FC<ResearchNodeProps> = ({ node, canAfford, onUnlock, isUnlockable }) => {
    let borderColor = 'border-gray-600';
    if (node.isUnlocked) borderColor = 'border-green-500';
    else if (isUnlockable && canAfford) borderColor = 'border-accent';

    return (
        <div className={`bg-gray-800/50 p-4 rounded-lg border transition-colors duration-300 ${borderColor}`}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                    <h3 className="font-bold text-lg text-white">{node.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{node.description}</p>
                </div>
                {node.isUnlocked && (
                    <div className="flex-shrink-0 text-green-400">
                        <CheckCircleIcon className="w-8 h-8" />
                    </div>
                )}
            </div>
            {!node.isUnlocked && (
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {Object.entries(node.cost).map(([key, value]) => {
                            const resource = RESOURCE_DATA[key as ResourceName];
                            if (!resource) return null;
                            return (
                                <div key={key} className="flex items-center gap-1.5 text-sm font-semibold">
                                    {React.cloneElement(resource.icon, { className: "w-4 h-4" })}
                                    <span>{formatNumber(value as number)}</span>
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => onUnlock(node.id)}
                        disabled={!canAfford || !isUnlockable}
                        className="bg-accent hover:bg-accent-dark disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-200 flex items-center gap-2"
                    >
                        {!isUnlockable ? <LockClosedIcon className="w-5 h-5"/> : null}
                        {isUnlockable ? 'Research' : 'Locked'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResearchNodeCard;
