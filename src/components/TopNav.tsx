import React from 'react';
import { TabType } from '../types';
import { Volume2, VolumeX, LogIn, Compass, GitMerge, Bot, Users, Award } from 'lucide-react';
import { toggleSound, playClickSound } from '../utils/sound';

interface TopNavProps {
  currentTab: TabType;
  onTabChange?: (tab: TabType) => void;
  level: number;
  userName?: string;
  onProfileClick: () => void;
  onOpenAuth: () => void;
  soundState: boolean;
  setSoundState: (val: boolean) => void;
  unclaimedTrophiesCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onTabChange,
  level,
  userName = 'Alex Vance',
  onProfileClick,
  onOpenAuth,
  soundState,
  setSoundState,
  unclaimedTrophiesCount = 0,
}) => {
  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundState(next);
    if (next) playClickSound();
  };

  const navLinks: Array<{
    id: TabType;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    { id: 'discover', label: 'Discover', shortLabel: 'Discover', icon: <Compass className="w-4 h-4 shrink-0" /> },
    { id: 'roadmap', label: 'Roadmap Forge', shortLabel: 'Roadmap', icon: <GitMerge className="w-4 h-4 shrink-0" /> },
    { id: 'aigang', label: 'AI Gang Lab', shortLabel: 'AI Gang', icon: <Bot className="w-4 h-4 shrink-0" /> },
    { id: 'guilds', label: 'Guilds & Homies', shortLabel: 'Guilds', icon: <Users className="w-4 h-4 shrink-0" /> },
    {
      id: 'stats',
      label: 'Stats & Missions',
      shortLabel: 'Stats',
      icon: <Award className="w-4 h-4 shrink-0" />,
      badge: unclaimedTrophiesCount,
    },
  ];

  return (
    <nav className="w-full bg-[#faf7f2] border-b-2 border-black transition-all select-none" aria-label="Main application header">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 w-full flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onTabChange?.('discover');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded-xl p-0.5"
            aria-label="PathForge Home - Go to Discover"
          >
            {/* Logo Icon */}
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#4ade80] border-2 border-black flex items-center justify-center shrink-0 brutal-shadow-sm font-black text-black group-hover:scale-105 transition-transform"
              role="img"
              aria-label="PathForge brand icon"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            {/* Brand Title and Web Tag */}
            <div className="shrink-0 flex items-center gap-1.5">
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-black leading-none shrink-0">
                PathForge
              </span>
              <span className="bg-[#4ade80] border border-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider text-black shrink-0 hidden xs:inline-block">
                WEB
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center gap-1 bg-white border-2 border-black p-1 rounded-2xl brutal-shadow-sm shrink-0"
          role="navigation"
          aria-label="Desktop primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onTabChange?.(link.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-black ${
                  isActive
                    ? 'bg-[#fde047] text-black border-2 border-black brutal-shadow-sm'
                    : 'text-neutral-800 hover:text-black hover:bg-[#faf7f2] border-2 border-transparent'
                }`}
              >
                <span className="shrink-0 flex items-center justify-center" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="shrink-0 hidden xl:inline">{link.label}</span>
                <span className="shrink-0 xl:hidden">{link.shortLabel}</span>
                {link.badge && link.badge > 0 ? (
                  <span
                    className="ml-1 bg-[#ef4444] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-black shrink-0 inline-flex items-center justify-center leading-none"
                    aria-label={`${link.badge} pending rewards`}
                  >
                    {link.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Right: Sound Toggle, Level Indicator, DEV ID, and User Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label={soundState ? 'Mute audio synthesizer sound effects' : 'Enable audio synthesizer sound effects'}
            title={soundState ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors brutal-shadow-sm shrink-0 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            {soundState ? (
              <Volume2 className="w-4 h-4 text-black shrink-0" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-800 shrink-0" aria-hidden="true" />
            )}
          </button>

          {/* Level Badge */}
          <div
            className="flex items-center gap-1 bg-[#fdfbf7] border-2 border-black px-2 sm:px-2.5 py-1 rounded-full brutal-shadow-sm shrink-0 whitespace-nowrap"
            role="status"
            aria-label={`Current player level: ${level}`}
          >
            <span className="text-[#f59e0b] text-xs sm:text-sm shrink-0" aria-hidden="true">⚡</span>
            <span className="text-[11px] sm:text-xs font-black text-black shrink-0">
              LVL {level}
            </span>
          </div>

          {/* Auth ID / Login Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenAuth();
            }}
            aria-label="Open authentication pass to switch developer identity"
            title="Open Login / Switch Dev Identity"
            className="flex items-center gap-1.5 bg-white hover:bg-[#fde047] border-2 border-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl brutal-shadow-sm text-xs font-black uppercase text-black transition-colors shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
          >
            <LogIn className="w-3.5 h-3.5 text-black shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline shrink-0">DEV ID</span>
          </button>

          {/* Avatar button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onProfileClick();
            }}
            aria-label={`Open student profile for ${userName}`}
            title={`Open Student Profile: ${userName}`}
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 focus-visible:ring-2 focus-visible:ring-black rounded-full cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-[#ef4444] border-2 border-black flex items-center justify-center text-white brutal-shadow-sm hover:scale-105 active:scale-95 transition-transform overflow-hidden">
              <span className="text-xs font-black shrink-0 select-none" aria-hidden="true">AV</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
