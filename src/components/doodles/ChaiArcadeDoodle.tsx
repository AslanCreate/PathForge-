import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Zap, Flame } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { SteamingCoffeeDoodle } from './DoodleSvgs';

export const ChaiArcadeDoodle: React.FC<{ onAwardXp?: (amount: number) => void }> = ({ onAwardXp }) => {
  const [score, setScore] = useState(0);
  const [bugState, setBugState] = useState<'idle' | 'smashed'>('idle');

  const handleSmashBug = () => {
    playLevelUpSound();
    setBugState('smashed');
    setScore((prev) => prev + 1);
    if (onAwardXp) onAwardXp(5);

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#4ade80', '#fde047', '#ff5533'],
    });

    setTimeout(() => {
      setBugState('idle');
    }, 450);
  };

  return (
    <div className="brutal-card p-5 bg-[#ffffff] space-y-4 border-2 border-black relative overflow-hidden" aria-label="Chai and Bug Smasher Arcade Doodle">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#4ade80] border-2 border-black flex items-center justify-center text-sm font-black brutal-shadow-sm">
            <Gamepad2 className="w-4 h-4 text-black" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display font-black text-xs uppercase text-black">
              Chai &amp; Bug Smasher Doodle
            </h3>
            <p className="text-[11px] font-bold text-neutral-800">
              Interactive micro-break for guild homies
            </p>
          </div>
        </div>
        <SteamingCoffeeDoodle className="w-8 h-8" />
      </div>

      {/* Mini Arcade Display */}
      <div className="bg-[#1e293b] border-2 border-black rounded-2xl p-4 text-center space-y-3 brutal-shadow-sm">
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
          <span>ARCADE: LVL 01</span>
          <span className="text-[#fde047] font-bold">BUGS PURGED: {score}</span>
        </div>

        {/* Bug / Character Button */}
        <div className="py-2 flex items-center justify-center">
          <button
            type="button"
            onClick={handleSmashBug}
            aria-label="Smash the bug for fun and +5 XP"
            className="w-16 h-16 rounded-2xl bg-[#ff5533] hover:bg-[#fa4420] border-2 border-black text-3xl flex items-center justify-center brutal-shadow-sm cursor-pointer transition-transform active:scale-90 hover:scale-105"
          >
            {bugState === 'smashed' ? '💥' : '🐛'}
          </button>
        </div>

        <p className="text-[11px] font-mono text-emerald-400 leading-tight">
          {bugState === 'smashed' ? '⚡ NullPointerException ANNIHILATED! +5 XP' : 'Click the bug to smash latency dropouts!'}
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] font-bold text-neutral-800">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span>Lo-Fi Chai Station Active</span>
        </span>
        <span className="bg-[#fef08a] border border-black px-2 py-0.5 rounded text-black font-black">
          REST &amp; SHIP
        </span>
      </div>
    </div>
  );
};
