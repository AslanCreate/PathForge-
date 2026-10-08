import React, { useState } from 'react';
import { Flame, Sparkles, Award, Coins, Heart } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { SteamingCoffeeDoodle } from './DoodleSvgs';

export const TrophyVaultDoodle: React.FC<{ currentStreak: number }> = ({ currentStreak }) => {
  const [cheersCount, setCheersCount] = useState(142);
  const [hasCheered, setHasCheered] = useState(false);

  const handleCheer = () => {
    if (!hasCheered) {
      playSuccessChime();
      setCheersCount((prev) => prev + 1);
      setHasCheered(true);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff5533', '#fde047', '#4ade80'],
      });
    } else {
      playClickSound();
    }
  };

  return (
    <div className="brutal-card p-5 bg-[#ffffff] space-y-4 border-2 border-black relative overflow-hidden" aria-label="Streak Vault and Homie Cheers Lounge">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#fed7aa] border-2 border-black flex items-center justify-center text-sm font-black brutal-shadow-sm">
            🔥
          </div>
          <div>
            <h3 className="font-display font-black text-sm text-black uppercase tracking-tight">
              Streak Flame Vault
            </h3>
            <p className="text-[11px] font-bold text-neutral-800">
              {currentStreak} straight days of shipping code
            </p>
          </div>
        </div>
        <SteamingCoffeeDoodle className="w-8 h-8" />
      </div>

      {/* Animated Flame Mascot Box */}
      <div className="bg-[#fef08a] border-2 border-black rounded-2xl p-4 brutal-shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl bg-[#ff5533] border-2 border-black flex items-center justify-center text-2xl brutal-shadow-sm animate-doodle-pulse shrink-0"
            role="img"
            aria-label="Dancing fire flame"
          >
            🔥
          </div>
          <div>
            <div className="text-xs font-black uppercase text-black">
              FLAME POWER: 1.5X MULTIPLIER
            </div>
            <p className="text-[11px] font-bold text-neutral-800 leading-snug mt-0.5">
              Streak active! Complete 1 more day to unlock the 2.0x Milestone XP Booster.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Homie Cheer button */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-xs font-black text-neutral-900">
          <Coins className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
          <span>{cheersCount} BUILDER CHEERS</span>
        </div>
        <button
          type="button"
          onClick={handleCheer}
          aria-label={hasCheered ? 'Cheered!' : 'Send cheer hype'}
          className={`px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
            hasCheered
              ? 'bg-[#22c55e] text-white brutal-shadow-sm'
              : 'bg-[#faf7f2] hover:bg-[#fde047] text-black'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasCheered ? 'fill-white' : ''}`} aria-hidden="true" />
          <span>{hasCheered ? 'HYPE SENT! ✨' : 'SEND HYPE'}</span>
        </button>
      </div>
    </div>
  );
};
