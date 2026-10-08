import React, { useState } from 'react';
import { Sparkles, Heart, Zap, Flame, Terminal, Code2, Rocket } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { SparkleStarDoodle, SteamingCoffeeDoodle, SquiggleDoodle } from './DoodleSvgs';

interface StickerItem {
  id: string;
  label: string;
  icon: string;
  bg: string;
  rot: string;
}

const AVAILABLE_STICKERS: StickerItem[] = [
  { id: 'proof', label: 'PROOF > RESUME', icon: '⚡', bg: '#fde047', rot: '-rotate-3' },
  { id: 'chai', label: 'CHAI POWERED', icon: '☕', bg: '#fecdd3', rot: 'rotate-2' },
  { id: 'ship', label: 'SHIP OR BUST', icon: '🚀', bg: '#4ade80', rot: '-rotate-2' },
  { id: 'zero', label: 'ZERO SLOP', icon: '🛡️', bg: '#fed7aa', rot: 'rotate-3' },
  { id: 'agentic', label: 'AGENTIC LOOP', icon: '🤖', bg: '#bbf7d0', rot: '-rotate-1' },
  { id: 'latency', label: '0ms LATENCY', icon: '🔥', bg: '#e9d5ff', rot: 'rotate-2' },
];

export const BuilderStickerPad: React.FC = () => {
  const [stampedList, setStampedList] = useState<string[]>(['proof', 'ship']);
  const [mascotMood, setMascotMood] = useState<'happy' | 'hyped' | 'chill'>('hyped');

  const handleStamp = (id: string) => {
    playClickSound();
    if (!stampedList.includes(id)) {
      setStampedList([...stampedList, id]);
      setMascotMood('hyped');
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#fde047', '#ff5533'],
      });
      playSuccessChime();
    } else {
      setStampedList(stampedList.filter((s) => s !== id));
      playClickSound();
    }
  };

  const handlePokeMascot = () => {
    playLevelUpSound();
    setMascotMood((prev) => (prev === 'hyped' ? 'happy' : 'hyped'));
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff5533', '#fde047', '#38bdf8'],
    });
  };

  return (
    <div className="brutal-card p-5 bg-[#ffffff] space-y-4 border-2 border-black relative overflow-hidden" aria-label="Interactive Builder Doodle & Sticker Pad">
      {/* Decorative background doodles */}
      <div className="absolute top-2 right-2 opacity-25 pointer-events-none">
        <SparkleStarDoodle className="w-12 h-12" color="#ff5533" />
      </div>
      <div className="absolute bottom-2 left-2 opacity-20 pointer-events-none">
        <Code2 className="w-14 h-14 text-neutral-400" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#fef08a] border-2 border-black flex items-center justify-center text-sm font-black brutal-shadow-sm">
            ✨
          </div>
          <div>
            <h3 className="font-display font-black text-sm text-black uppercase tracking-tight">
              Builder Vibe &amp; Sticker Pad
            </h3>
            <p className="text-[11px] font-bold text-neutral-800">
              Interactive doodles for high-leverage builders
            </p>
          </div>
        </div>
        <SteamingCoffeeDoodle className="w-8 h-8" />
      </div>

      {/* Interactive Mascot & Speech Bubble */}
      <div className="bg-[#faf7f2] border-2 border-black rounded-2xl p-3.5 flex items-center gap-3 brutal-shadow-sm relative">
        <button
          type="button"
          onClick={handlePokeMascot}
          aria-label="Poke Byte Bot mascot for good luck"
          title="Poke Byte Bot for luck!"
          className="w-12 h-12 rounded-2xl bg-[#fde047] hover:bg-[#facc15] border-2 border-black flex items-center justify-center text-2xl shrink-0 brutal-shadow-sm cursor-pointer transition-transform hover:scale-110 active:scale-95 animate-doodle-wiggle"
        >
          {mascotMood === 'hyped' ? '🤖' : '😸'}
        </button>
        <div className="flex-1 pr-1">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-black">
            <span>BYTE BOT (FORGE MASCOT)</span>
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
          </div>
          <p className="text-xs font-bold text-neutral-900 mt-0.5 leading-snug">
            {mascotMood === 'hyped'
              ? '"Lock in! Tap any sticker below to slap it on your builder wall!"'
              : '"Chai is hot, code is compiling, seed funding is waiting!"'}
          </p>
        </div>
      </div>

      {/* Sticker Wall interactive stamps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase text-black">
          <span className="flex items-center gap-1">
            <span>COLLECTIBLE STICKER BADGES</span>
            <span className="text-[10px] bg-[#4ade80] border border-black px-1.5 rounded">
              {stampedList.length}/{AVAILABLE_STICKERS.length} SLAPPED
            </span>
          </span>
          <span className="text-[10px] text-neutral-800 lowercase">click to slap/unslap</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Builder stickers collection">
          {AVAILABLE_STICKERS.map((sticker) => {
            const isSlapped = stampedList.includes(sticker.id);
            return (
              <button
                key={sticker.id}
                type="button"
                onClick={() => handleStamp(sticker.id)}
                aria-pressed={isSlapped}
                aria-label={`Toggle sticker ${sticker.label}`}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${
                  sticker.rot
                } ${
                  isSlapped
                    ? `${sticker.bg} text-black brutal-shadow-sm scale-105`
                    : 'bg-white hover:bg-[#faf7f2] text-neutral-700 opacity-60 border-dashed'
                }`}
              >
                <span role="img" aria-hidden="true">
                  {sticker.icon}
                </span>
                <span>{sticker.label}</span>
                {isSlapped && <span className="text-[9px] font-black">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Mini Code Spark Doodle */}
      <div className="bg-[#1e293b] text-[#38bdf8] border-2 border-black rounded-xl p-3 font-mono text-[11px] flex items-center justify-between brutal-shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#4ade80]" aria-hidden="true" />
          <span className="text-white font-bold">git commit -m</span>
          <span className="text-[#fde047]">"shipping no-BS roadmap"</span>
        </div>
        <span className="text-emerald-400 font-black animate-pulse">● LIVE</span>
      </div>
    </div>
  );
};
