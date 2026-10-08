import React, { useState } from 'react';
import { Cpu, Zap, Activity, Sparkles } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';
import confetti from 'canvas-confetti';

export const NeuralCircuitDoodle: React.FC = () => {
  const [pulseCount, setPulseCount] = useState(0);

  const handlePulse = () => {
    playLevelUpSound();
    setPulseCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#4ade80', '#fde047'],
    });
  };

  return (
    <div className="brutal-card p-5 bg-[#ffffff] space-y-4 border-2 border-black relative overflow-hidden" aria-label="Neural Circuit and Token Stream Oscilloscope Doodle">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#e9d5ff] border-2 border-black flex items-center justify-center text-sm font-black brutal-shadow-sm">
            ⚡
          </div>
          <div>
            <h3 className="font-display font-black text-sm text-black uppercase tracking-tight">
              Token Stream Oscilloscope
            </h3>
            <p className="text-[11px] font-bold text-neutral-800">
              Real-time generative vector stream doodle
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handlePulse}
          aria-label="Send high-frequency neural pulse test"
          className="bg-[#fde047] hover:bg-[#facc15] border-2 border-black text-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase brutal-shadow-sm cursor-pointer transition-transform active:scale-95"
        >
          PULSE ({pulseCount})
        </button>
      </div>

      {/* Oscilloscope SVG Waveform */}
      <div className="bg-[#0f172a] border-2 border-black rounded-2xl p-4 brutal-shadow-sm space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#38bdf8]">
          <span>FREQ: 120 T/S</span>
          <span className="text-[#4ade80] animate-pulse">JITTER: 1.2MS (OPTIMAL)</span>
        </div>

        {/* Animated Sine & Square Wave Oscilloscope Line */}
        <div className="h-16 w-full relative flex items-center">
          <svg
            viewBox="0 0 300 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full stroke-[#4ade80]"
            aria-hidden="true"
          >
            <path
              d="M0 30 Q 25 5, 50 30 T 100 30 T 150 10 T 200 50 T 250 30 T 300 30"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <path
              d="M0 30 Q 35 55, 70 30 T 140 30 T 210 20 T 280 40 T 300 30"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              className="animate-pulse opacity-75"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-neutral-700 pt-1.5">
          <span>SAMPLING: 44.1kHz</span>
          <span className="text-[#fde047]">SSE CHUNKS: 0 DROPOUTS</span>
        </div>
      </div>

      {/* Floating Micro Tech Badges */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        <span className="bg-[#faf7f2] border border-black px-2 py-0.5 rounded text-[10px] font-black text-black">
          #FastAPI WebSockets
        </span>
        <span className="bg-[#faf7f2] border border-black px-2 py-0.5 rounded text-[10px] font-black text-black">
          #Qdrant Hybrid
        </span>
        <span className="bg-[#faf7f2] border border-black px-2 py-0.5 rounded text-[10px] font-black text-black">
          #LangGraph State
        </span>
      </div>
    </div>
  );
};
