import React from 'react';

export type IconProps = {
  className?: string;
};

export const OreIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4.5 8.5L12 22L19.5 8.5L12 2Z" stroke="black" strokeWidth="1" strokeLinejoin="round"/>
    <path d="M4.5 8.5L12 12L19.5 8.5"/><path d="M12 2V12"/>
  </svg>
);
export const AutoMinerIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M10 14h4"/><path d="M16 4h4"/>
  </svg>
);
export const DrillIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9l-2-2-2 2"/><path d="M12 7V2"/><path d="M18 9h-2a2 2 0 0 1-4 0H8"/><path d="M20 13a2 2 0 0 0-2-2h-2.5a1.5 1.5 0 0 0-3 0H10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3z"/><path d="M12 18v4"/>
  </svg>
);
export const CrusherIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M8 5V2"/><path d="M16 5V2"/><path d="M12 15v5"/><path d="M10 20h4"/>
  </svg>
);
export const SmelterIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10h20"/><path d="M6 10v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10"/><path d="M12 2v2"/><path d="M9 2l-2 4"/><path d="M15 2l2 4"/>
  </svg>
);
export const FactoryIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-6H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" />
    </svg>
);
export const PickaxeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 14.5L3 21"/><path d="m19 5-8.6 8.6"/><path d="M17 3 3 17"/><path d="m21 7-4-4-2.5 2.5"/>
  </svg>
);
export const GearIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="m11 10.27 1 1.73"/><path d="m7 3.34 1 1.73"/><path d="m13 13.73-1-1.73"/><path d="M17 3.34l-1 1.73"/><path d="m11 3.73 1 1.73"/><path d="m7 20.66 1-1.73"/><path d="m13 10.27-1 1.73"/><path d="m2 12h2"/><path d="m22 12h-2"/><path d="m18.36 17-1.73-1"/><path d="m10.27 11 1.73 1"/><path d="m5.64 7 1.73 1"/><path d="m13.73 13-1.73-1"/><path d="m18.36 7-1.73 1"/><path d="m10.27 13 1.73-1"/><path d="m5.64 17 1.73-1"/><path d="m13.73 11-1.73 1"/></svg>
);
export const CircuitIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 4"/><path d="M10 15v4a3 3 0 0 0 3 3l4-4"/><path d="M4 14h6"/><path d="M14 4h6"/><path d="M4 10h2"/><path d="M18 10h2"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="14" r="2"/></svg>
);
// This was UpgradeIcon
export const FireIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15L12 15a2.25 2.25 0 01-3.032-2.148A3.749 3.749 0 019 9.6c0-1.033.39-2.01.968-2.748L12 15z" /></svg>;
// New Icons
export const MoneyIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" fillRule="evenodd" /></svg>;
export const TechCoreIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25M12 12.75v9.75" /></svg>;
export const IronIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" /></svg>;
export const CopperIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 9a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm1 3a1 1 0 100 2h14a1 1 0 100-2H3z" /></svg>;
export const GoldIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 16.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 011.5 0v2.5a.75.75 0 01-.75.75z" /><path fillRule="evenodd" d="M5.5 3A.5.5 0 016 3.5v1A.5.5 0 015.5 5 .5.5 0 015 4.5v-1A.5.5 0 015.5 3zM8 3.5a.5.5 0 00-.5-.5.5.5 0 00-.5.5v1a.5.5 0 00.5.5.5.5 0 00.5-.5v-1zm2.5-.5A.5.5 0 0111 3.5v1a.5.5 0 01-.5.5.5.5 0 01-.5-.5v-1c0-.276.224-.5.5-.5zM14.5 3a.5.5 0 01.5.5v1a.5.5 0 01-.5.5.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" clipRule="evenodd" /><path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
export const CopperWireIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12,1A11,11,0,0,0,1,12" /><path d="M12,23A11,11,0,0,0,23,12" /><path d="M12,5A7,7,0,0,0,5,12" /><path d="M12,19A7,7,0,0,0,19,12" /></svg>
export const WrenchScrewdriverIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c-.047-.58-.278-1.14-.64-1.503l-2.351-2.351a.5.5 0 00-.707 0l-6.364 6.364-3.618-3.617a.5.5 0 00-.707 0l-2.35 2.35a.5.5 0 000 .707l3.617 3.617-6.364 6.364a.5.5 0 000 .707l2.35 2.35.707.707a.5.5 0 00.707 0l3.618-3.617 6.364-6.364a.5.5 0 00.707 0l2.35-2.351" /></svg>;
export const ChartBarIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 019.75 19.875V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
export const CogIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0" /></svg>;
export const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
export const ArrowPathIcon: React.FC<IconProps> = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.18-3.182a8.25 8.25 0 00-11.665 0l-3.18 3.18a8.25 8.25 0 0011.665 0l3.181-3.181" /></svg>;

// Deprecated, but keep for type compatibility if needed
export const UpgradeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
    </svg>
);