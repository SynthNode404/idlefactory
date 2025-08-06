import React, { useState } from 'react';
import { formatNumber } from '../utils/format';
import { OreIcon } from './icons';
import type { Stats } from '../game/types';

interface ClickerProps {
  onClick: () => void;
  stats: Stats;
  clickPower: number;
}

const Clicker: React.FC<ClickerProps> = ({ onClick, stats, clickPower }) => {
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    onClick();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 200);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        className={`relative rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-600 p-8 transition-transform duration-100 ease-out active:scale-95 hover:border-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/50 ${isPopping ? 'animate-pop' : ''}`}
        aria-label="Click to mine ore"
      >
        <OreIcon className="w-24 h-24 sm:w-28 sm:h-28 text-highlight animate-float" />
      </button>
      <div className="text-center bg-secondary py-2 px-4 rounded-lg border border-gray-600 w-full">
        <p className="font-semibold text-accent-light text-lg">+{formatNumber(clickPower)} Ore per click</p>
        <p className="text-sm text-gray-400">Total Clicks: {formatNumber(stats.totalClicks)}</p>
      </div>
    </div>
  );
};

export default Clicker;
