import React from 'react';
import type { Achievement } from '../types';
import { formatNumber } from '../utils/format';
import { TrophyIcon } from './icons';

interface AchievementCardProps {
    achievement: Achievement;
    onClaim: (achievementId: string, tierIndex: number) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClaim }) => {
    const currentTierIndex = achievement.tiers.findIndex(t => !t.isClaimed);
    const currentTier = currentTierIndex !== -1 ? achievement.tiers[currentTierIndex] : null;
    
    const isCompleted = currentTierIndex === -1;
    const progress = currentTier ? Math.min((achievement.progress / currentTier.goal) * 100, 100) : 100;
    const canClaim = currentTier && progress >= 100;

    const allTiersClaimed = achievement.tiers.every(t => t.isClaimed);

    return (
        <div className={`bg-gray-800/50 p-4 rounded-lg border border-gray-600 transition-all ${canClaim ? 'border-highlight shadow-lg shadow-highlight/20' : allTiersClaimed ? 'border-green-800' : 'opacity-70'}`}>
            <div className="flex items-center gap-4">
                <TrophyIcon className={`w-10 h-10 ${canClaim ? 'text-highlight' : allTiersClaimed ? 'text-green-400' : 'text-gray-500'}`} />
                <div className="flex-grow">
                    <h4 className="font-bold text-lg">{achievement.name}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {currentTier && !canClaim && (
                        <p className="text-xs text-accent-light mt-1">Next Reward: {currentTier.reward}</p>
                    )}
                </div>
            </div>
            
            {isCompleted ? (
                <p className="text-center font-bold text-green-400 mt-3">All Tiers Completed!</p>
            ) : canClaim ? (
                <div className="mt-3">
                    <button 
                        onClick={() => onClaim(achievement.id, currentTierIndex)}
                        className="w-full bg-highlight hover:bg-yellow-400 text-primary font-bold py-2 px-4 rounded-md transition-all duration-200 animate-pulse-fast"
                    >
                        Claim Reward: {currentTier.reward}
                    </button>
                </div>
            ) : currentTier ? (
                <div className="mt-3">
                    <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                        <span>Progress</span>
                        <span>{formatNumber(achievement.progress)} / {formatNumber(currentTier.goal)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-highlight h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AchievementCard;