
import React from 'react';
import { ZONES } from '../constants';
import { GlobeAltIcon } from './icons';

interface ZoneDisplayProps {
    currentZoneId: string;
}

const ZoneDisplay: React.FC<ZoneDisplayProps> = ({ currentZoneId }) => {
    const currentZone = ZONES.find(z => z.id === currentZoneId);

    if (!currentZone) return null;

    return (
        <div className="bg-secondary/50 border border-gray-600 rounded-lg px-4 py-2 flex items-center gap-2">
            <GlobeAltIcon className="w-6 h-6 text-accent-light" />
            <div>
                <p className="text-xs text-gray-400">Current Zone</p>
                <p className="font-bold text-white">{currentZone.name}</p>
            </div>
        </div>
    );
};

export default ZoneDisplay;
