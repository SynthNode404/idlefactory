import React from 'react';
import type { IconProps } from './icons';

interface TabButtonProps {
  text: string;
  icon: React.ReactElement<IconProps>;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ text, icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 sm:flex-initial sm:flex-shrink-0 flex items-center justify-center sm:justify-start gap-2 px-4 py-3 font-bold border-b-2 transition-colors duration-200 ${
        active
          ? 'border-accent text-accent-light'
          : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
};

export default TabButton;