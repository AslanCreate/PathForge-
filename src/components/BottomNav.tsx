import React from 'react';
import { TabType } from '../types';
import { Compass, GitMerge, Bot, Users, Award } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unclaimedTrophiesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unclaimedTrophiesCount = 0,
}) => {
  const tabs: Array<{
    id: TabType;
    label: string;
    icon: React.ReactNode;
    isGangButton?: boolean;
    badgeCount?: number;
  }> = [
    {
      id: 'discover',
      label: 'Discover',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: <GitMerge className="w-5 h-5" />,
    },
    {
      id: 'aigang',
      label: 'AI GANG',
      icon: <Bot className="w-5 h-5" />,
      isGangButton: true,
    },
    {
      id: 'guilds',
      label: 'Guilds',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: <Award className="w-5 h-5" />,
      badgeCount: unclaimedTrophiesCount,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t-2 border-black py-2 px-2 shadow-[0px_-3px_0px_0px_rgba(0,0,0,0.06)]"
      role="navigation"
      aria-label="Mobile navigation bar"
    >
      <div className="max-w-xl mx-auto flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          if (tab.isGangButton) {
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  onTabChange(tab.id);
                }}
                aria-label="Navigate to AI Gang screen"
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-2xl border-2 border-black transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                  isActive
                    ? 'bg-[#fde047] scale-105 brutal-shadow text-black'
                    : 'bg-[#fef08a] hover:bg-[#fde047] text-black brutal-shadow-sm'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-base" aria-hidden="true">🤖</span>
                  <span className="text-[11px] font-black uppercase tracking-tight">
                    AI GANG
                  </span>
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                onTabChange(tab.id);
              }}
              aria-label={`Navigate to ${tab.label} screen`}
              aria-current={isActive ? 'page' : undefined}
              className="flex-1 flex flex-col items-center justify-center py-1 transition-transform relative group active:scale-95 focus-visible:ring-2 focus-visible:ring-black rounded-xl cursor-pointer"
            >
              {/* Icon Container */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#ff5533] text-white border-2 border-black brutal-shadow-sm'
                    : 'text-neutral-800 hover:text-black group-hover:bg-neutral-100'
                }`}
                aria-hidden="true"
              >
                {tab.icon}
              </div>
              {/* Label */}
              <span
                className={`text-[10px] font-extrabold mt-0.5 tracking-tight ${
                  isActive ? 'text-[#ff5533]' : 'text-neutral-700'
                }`}
              >
                {tab.label}
              </span>
              {/* Notification badge */}
              {tab.badgeCount && tab.badgeCount > 0 ? (
                <span
                  className="absolute top-0 right-3 w-4 h-4 bg-[#ef4444] text-white text-[9px] font-black rounded-full border border-black flex items-center justify-center"
                  aria-label={`${tab.badgeCount} unclaimed items`}
                >
                  {tab.badgeCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
