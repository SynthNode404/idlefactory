import React from 'react';
import { formatNumber } from '../utils/format';
import { RESOURCE_DATA } from '../game/constants';
import type { ResourceName, Resources } from '../game/types';

interface ResourceGridProps {
  resources: Resources;
  resourcesPerSecond: Partial<Resources>;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, resourcesPerSecond }) => {
  const discoveredResources = Object.keys(resources).filter(r => {
    const key = r as ResourceName;
    return key === 'money' || key === 'techCore' || resources[key] > 0 || (resourcesPerSecond[key] ?? 0) > 0;
  }) as ResourceName[];

  return (
    <div className="grid grid-cols-2 gap-3">
      {discoveredResources.map(key => {
        const data = RESOURCE_DATA[key];
        const amount = resources[key];
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
  );
};

export default ResourceGrid;
