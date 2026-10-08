import React from 'react';
import { Check, Lock, Sparkles, ArrowDown, Zap, ChevronDown, ShieldCheck, Flame } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';

interface RoadmapConnectorProps {
  type: 'completed-to-active' | 'active-to-locked';
  onInspectBridge?: () => void;
}

export const RoadmapProgressionConnector: React.FC<RoadmapConnectorProps> = ({
  type,
  onInspectBridge,
}) => {
  if (type === 'completed-to-active') {
    return (
      <div
        className="w-full my-1 py-1 relative flex flex-col items-center justify-center select-none"
        aria-label="Progression bridge from Module 1 to Module 2"
      >
        {/* Main Animated SVG Pipeline Canvas */}
        <div className="w-full max-w-xl h-24 relative flex items-center justify-center">
          <svg
            viewBox="0 0 500 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            {/* Background Drop Shadow Line */}
            <path
              d="M50 8 C 120 8, 160 48, 250 48 S 380 88, 450 88"
              stroke="#000000"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Base Conduit Tube */}
            <path
              d="M50 8 C 120 8, 160 48, 250 48 S 380 88, 450 88"
              stroke="#e2e8f0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Green Flow Stream: Moving Dashes representing completed mastery */}
            <path
              d="M50 8 C 120 8, 160 48, 250 48 S 380 88, 450 88"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 8"
              className="animate-dash-flow"
            />
            {/* Yellow Highlight Particle Line */}
            <path
              d="M50 8 C 120 8, 160 48, 250 48 S 380 88, 450 88"
              stroke="#fde047"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 16"
              className="animate-dash-flow"
            />

            {/* Vertical Flow Center Line */}
            <line
              x1="250"
              y1="4"
              x2="250"
              y2="92"
              stroke="#000000"
              strokeWidth="3"
              strokeDasharray="6 4"
              className="animate-dash-flow"
            />

            {/* Start Node Indicator (M1 completion ping) */}
            <circle cx="50" cy="8" r="7" fill="#22c55e" stroke="#000000" strokeWidth="2.5" />
            <circle cx="50" cy="8" r="3" fill="#ffffff" />

            {/* End Node Indicator (M2 active beacon) */}
            <circle cx="450" cy="88" r="8" fill="#fde047" stroke="#000000" strokeWidth="2.5" className="animate-pulse" />
            <circle cx="450" cy="88" r="4" fill="#ff5533" />

            {/* Floating Energy Packet 1 */}
            <circle cx="160" cy="36" r="4.5" fill="#fde047" stroke="#000000" strokeWidth="1.5" className="animate-packet-pulse" />
            {/* Floating Energy Packet 2 */}
            <circle cx="340" cy="62" r="4.5" fill="#22c55e" stroke="#000000" strokeWidth="1.5" className="animate-packet-pulse [animation-delay:0.7s]" />
          </svg>

          {/* Central Interactive Bridge Milestone Pill */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onInspectBridge?.();
              }}
              aria-label="Progression Verified: Module 1 mastered, fast-tracked into Module 2"
              className="bg-[#fef08a] hover:bg-[#fde047] border-2 border-black py-1.5 px-3.5 rounded-full brutal-shadow-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
            >
              <div className="w-5 h-5 rounded-full bg-[#22c55e] border border-black flex items-center justify-center text-white shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
              <span className="text-[11px] font-black uppercase text-black tracking-tight">
                M1 MASTERY VERIFIED ➔ M2 ACTIVE
              </span>
              <span className="bg-black text-[#4ade80] text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                +180 XP FLOW
              </span>
            </button>
          </div>
        </div>

        {/* Ambient Annotation Badges */}
        <div className="flex items-center justify-between w-full max-w-lg px-4 -mt-2 text-[10px] font-black uppercase">
          <span className="text-[#15803d] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>Foundations Locked</span>
          </span>
          <span className="text-[#ea580c] flex items-center gap-1">
            <Flame className="w-3 h-3 fill-[#ea580c]" />
            <span>45% Active Sprints</span>
          </span>
        </div>
      </div>
    );
  }

  // Active to Locked Bridge (Module 2 -> Module 3 Boss Quest)
  return (
    <div
      className="w-full my-1 py-1 relative flex flex-col items-center justify-center select-none"
      aria-label="Progression bridge from Module 2 to Module 3 Boss Quest"
    >
      <div className="w-full max-w-xl h-24 relative flex items-center justify-center">
        <svg
          viewBox="0 0 500 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          {/* Shadow line */}
          <path
            d="M50 8 C 140 8, 160 50, 250 50 S 360 88, 450 88"
            stroke="#000000"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Base Pipe */}
          <path
            d="M50 8 C 140 8, 160 50, 250 50 S 360 88, 450 88"
            stroke="#e2e8f0"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Pulsing Orange Warning Cable */}
          <path
            d="M50 8 C 140 8, 160 50, 250 50 S 360 88, 450 88"
            stroke="#ea580c"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 8"
            className="animate-dash-flow-slow"
          />

          {/* Central Vertical Lock Bar */}
          <line
            x1="250"
            y1="4"
            x2="250"
            y2="92"
            stroke="#000000"
            strokeWidth="3"
            strokeDasharray="4 4"
            className="animate-dash-flow-slow"
          />

          {/* Start beacon */}
          <circle cx="50" cy="8" r="8" fill="#fde047" stroke="#000000" strokeWidth="2.5" />
          <circle cx="50" cy="8" r="3.5" fill="#ea580c" />

          {/* Locked End Beacon */}
          <circle cx="450" cy="88" r="8" fill="#cbd5e1" stroke="#000000" strokeWidth="2.5" />
          <circle cx="450" cy="88" r="3.5" fill="#475569" />

          {/* Traveling Warning Signal */}
          <circle cx="180" cy="38" r="4" fill="#ea580c" stroke="#000000" strokeWidth="1.5" className="animate-packet-pulse" />
        </svg>

        {/* Central Gatehouse Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onInspectBridge?.();
            }}
            aria-label="Module 3 Gate: Requires completing Node D and Node E"
            className="bg-[#faf7f2] hover:bg-[#fed7aa] border-2 border-black py-1.5 px-3.5 rounded-full brutal-shadow-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <div className="w-5 h-5 rounded-full bg-neutral-200 border border-black flex items-center justify-center text-neutral-800 shrink-0">
              <Lock className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-black uppercase text-black tracking-tight">
              GATE M3: 55% SYLLABUS REMAINING
            </span>
            <span className="bg-[#ef4444] text-white text-[9px] font-bold px-1.5 py-0.2 rounded border border-black">
              BOSS AT LVL 10
            </span>
          </button>
        </div>
      </div>

      {/* Ambient Annotation Badges */}
      <div className="flex items-center justify-between w-full max-w-lg px-4 -mt-2 text-[10px] font-black uppercase">
        <span className="text-[#ea580c]">
          ⚡ Node C &gt; Node D in sprint
        </span>
        <span className="text-neutral-600">
          🔒 Mock Interview Locked
        </span>
      </div>
    </div>
  );
};

// Sub-node branch connection inside Module 2: Node C -> Node D -> Node E
export const NodeBranchConnector: React.FC = () => {
  return (
    <div className="w-full py-2 flex items-center justify-center relative select-none" aria-label="Branch connection between Node C, Node D, and Node E">
      <svg
        viewBox="0 0 320 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xs h-8 overflow-visible"
        aria-hidden="true"
      >
        {/* Background shadow */}
        <path d="M20 16 L 160 16 L 300 16" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 16 L 160 16 L 300 16" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />

        {/* Node C to Node D active transfer */}
        <path
          d="M20 16 L 160 16"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 4"
          className="animate-dash-flow"
        />

        {/* Node D to Node E queued dashed line */}
        <path
          d="M160 16 L 300 16"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />

        {/* Node C checkpoint */}
        <circle cx="20" cy="16" r="6" fill="#22c55e" stroke="#000000" strokeWidth="2" />
        <circle cx="20" cy="16" r="2.5" fill="#ffffff" />

        {/* Node D checkpoint (Active Next) */}
        <circle cx="160" cy="16" r="6" fill="#fde047" stroke="#000000" strokeWidth="2" className="animate-pulse" />
        <circle cx="160" cy="16" r="2" fill="#000000" />

        {/* Node E checkpoint (Locked) */}
        <circle cx="300" cy="16" r="5" fill="#cbd5e1" stroke="#000000" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="bg-white border border-black px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-black brutal-shadow-sm">
          SYNAPSE FLOW: NODE C ➔ NODE D
        </span>
      </div>
    </div>
  );
};
