
import React from 'react';
import { formatNumber } from '../utils/format';
import { RESOURCE_DATA } from '../constants';
import type { ResourceName, Resources } from '../types';

interface ResourceGridProps {
  resources: Resources;
  resourcesPerSecond: Partial<Resources>;
  storage: number;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, resourcesPerSecond, storage }) => {
  const discoveredResources = (Object.keys(resources) as ResourceName[]).filter(key => {
    return key === 'money' || key === 'techCore' || key === 'researchPoint' || (resources[key] || 0) > 0 || (resourcesPerSecond[key] || 0) > 0;
  });

  const totalResources = discoveredResources
    .filter(key => key !== 'money' && key !== 'techCore' && key !== 'researchPoint')
    .reduce((sum, key) => sum + (resources[key] || 0), 0);

  return (
    <div className="space-y-3">
        <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-600">
            <p className="text-md font-bold leading-tight text-center">Storage</p>
            <p className="text-sm text-accent-light font-bold leading-tight text-center">{formatNumber(totalResources)} / {formatNumber(storage)}</p>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div className="bg-highlight h-1.5 rounded-full" style={{ width: `${Math.min((totalResources / storage) * 100, 100)}%` }}></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
        {discoveredResources.map(key => {
            const data = RESOURCE_DATA[key];
            const amount = resources[key] || 0;
            const rps = resourcesPerSecond[key] ?? 0;
            if (!data) return null;

            return (
            <div key={key} className="bg-gray-900/50 p-2 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2">
                {React.cloneElement(data.icon, { className: 'w-6 h-6' })}
                <div className="flex-grow">
                    <p className="text-md font-bold leading-tight">{key === 'money' ? `$${formatNumber(amount)}` : formatNumber(amount)}</p>
                    <p className="text-xs text-gray-400 leading-tight">{data.name}</p>
                </div>
                </div>
                {rps > 0 && (
                    <p className="text-xs text-accent text-right mt-1">
                        +{formatNumber(rps)}/s
                    </p>
                )}
            </div>
            );
        })}
        </div>
    </div>
  );
};

export default ResourceGrid;
