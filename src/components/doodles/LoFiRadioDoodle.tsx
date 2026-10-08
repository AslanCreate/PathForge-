import React, { useState } from 'react';
import { Headphones, Radio, Volume2, Sparkles, Disc, Flame } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';

export const LoFiRadioDoodle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedStation, setSelectedStation] = useState<'flow' | 'sprint' | 'midnight'>('flow');

  const stations = {
    flow: { title: 'Deep Flow 120 BPM', sub: 'Chai & Synthesizers', icon: '☕' },
    sprint: { title: 'Turbo Sprint 140 BPM', sub: 'Zero-Alloc Rust Beats', icon: '⚡' },
    midnight: { title: 'Midnight City Lo-Fi', sub: 'Sub-50ms Vector Dreams', icon: '🌙' },
  };

  const handleTogglePlay = () => {
    playClickSound();
    setIsPlaying(!isPlaying);
  };

  const handleChangeStation = (station: 'flow' | 'sprint' | 'midnight') => {
    playLevelUpSound();
    setSelectedStation(station);
    setIsPlaying(true);
  };

  return (
    <div className="brutal-card p-5 bg-[#faf7f2] space-y-4 border-2 border-black relative overflow-hidden" aria-label="Animated Lo-Fi Radio Doodle">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2.5">
        <div className="flex items-center gap-2">
          <Headphones className="w-5 h-5 text-black" aria-hidden="true" />
          <h3 className="font-display font-black text-xs uppercase text-black">
            Sprint Lo-Fi Radio Doodle
          </h3>
        </div>
        <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase text-black">
          {isPlaying ? 'ON AIR' : 'PAUSED'}
        </span>
      </div>

      {/* Cassette / Audio Player Animation */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 brutal-shadow-sm space-y-3">
        {/* Cassette Visual with spinning tape wheels */}
        <div className="bg-[#1e293b] rounded-xl p-3 border-2 border-black flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full bg-[#fde047] border-2 border-black flex items-center justify-center text-black font-black text-xs ${
                isPlaying ? 'animate-spin [animation-duration:3s]' : ''
              }`}
              role="img"
              aria-label="Cassette wheel"
            >
              ✇
            </div>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <span>{stations[selectedStation].icon}</span>
                <span>{stations[selectedStation].title}</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-bold">
                {stations[selectedStation].sub}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause radio animation' : 'Resume radio animation'}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#fde047] border-2 border-black flex items-center justify-center text-black brutal-shadow-sm transition-colors cursor-pointer shrink-0"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-end justify-between h-9 px-2 gap-1 bg-[#f1ede4] rounded-lg border border-black/40 overflow-hidden" aria-hidden="true">
          {[40, 80, 60, 100, 30, 90, 75, 45, 95, 65, 85, 50, 90, 70].map((h, idx) => (
            <div
              key={idx}
              className={`w-full rounded-xs transition-all ${
                idx % 3 === 0
                  ? 'bg-[#ff5533]'
                  : idx % 3 === 1
                  ? 'bg-[#22c55e]'
                  : 'bg-[#fde047]'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (h + (idx % 4) * 8) % 100)}%` : '15%',
                animation: isPlaying
                  ? `waveBar ${0.8 + (idx % 5) * 0.25}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Station Switcher */}
      <div className="grid grid-cols-3 gap-1.5 pt-1" role="group" aria-label="Radio vibe presets">
        <button
          type="button"
          onClick={() => handleChangeStation('flow')}
          aria-pressed={selectedStation === 'flow'}
          className={`py-1.5 px-2 rounded-xl border-2 border-black text-[10px] font-black uppercase transition-all cursor-pointer ${
            selectedStation === 'flow'
              ? 'bg-[#fde047] text-black brutal-shadow-sm'
              : 'bg-white hover:bg-neutral-100 text-neutral-800'
          }`}
        >
          ☕ Flow
        </button>
        <button
          type="button"
          onClick={() => handleChangeStation('sprint')}
          aria-pressed={selectedStation === 'sprint'}
          className={`py-1.5 px-2 rounded-xl border-2 border-black text-[10px] font-black uppercase transition-all cursor-pointer ${
            selectedStation === 'sprint'
              ? 'bg-[#ff5533] text-white brutal-shadow-sm'
              : 'bg-white hover:bg-neutral-100 text-neutral-800'
          }`}
        >
          ⚡ Turbo
        </button>
        <button
          type="button"
          onClick={() => handleChangeStation('midnight')}
          aria-pressed={selectedStation === 'midnight'}
          className={`py-1.5 px-2 rounded-xl border-2 border-black text-[10px] font-black uppercase transition-all cursor-pointer ${
            selectedStation === 'midnight'
              ? 'bg-[#4ade80] text-black brutal-shadow-sm'
              : 'bg-white hover:bg-neutral-100 text-neutral-800'
          }`}
        >
          🌙 Night
        </button>
      </div>
    </div>
  );
};
