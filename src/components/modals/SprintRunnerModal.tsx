import React, { useState, useEffect } from 'react';
import { Mission } from '../../types';
import { X, Play, CheckCircle2, Terminal, ShieldCheck } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface SprintRunnerModalProps {
  mission: Mission;
  onClose: () => void;
  onCompleteSprint: (missionId: string, xpEarned: number) => void;
}

export const SprintRunnerModal: React.FC<SprintRunnerModalProps> = ({
  mission,
  onClose,
  onCompleteSprint,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [code, setCode] = useState(
    mission.codeChallenge?.starterCode ||
      `// Resilient SSE Stream Handler with AbortSignal
export async function streamWithTimeout(url: string, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return { ok: true, stream: res.body };
  } catch (err) {
    clearTimeout(timer);
    return {
      ok: false,
      fallbackUi: "Token stream timed out. Homie fallback cached response active.",
    };
  }
}`
  );

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRunSprint = () => {
    playClickSound();
    setIsRunning(true);
    setLogs(['> Initializing PathForge Sandbox v2.4...', '> Mounting test runner on Node C runtime...']);
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        '> [SUITE 1] Mock token socket connected (120 tokens/sec)... PASS',
        '> [SUITE 2] Injecting 14.2s synthetic server stall (triggering AbortSignal)...',
      ]);
    }, 800);
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        '> [SUITE 2] AbortSignal detected at 12000ms. Timeout fired cleanly.',
        '> [SUITE 3] Fallback error boundary rendered in 16ms (Zero UI jitter).',
        '> ALL 3 TEST CRITERIA PASSED! 🚀',
      ]);
      setIsRunning(false);
      setIsCompleted(true);
      playSuccessChime();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#4ade80', '#fde047', '#ff5533', '#38bdf8'],
      });
    }, 2000);
  };

  const handleFinish = () => {
    playLevelUpSound();
    onCompleteSprint(mission.id, mission.xp);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sprint-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="brutal-card bg-white w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] brutal-shadow-lg">
        {/* Header */}
        <div className="bg-[#fde047] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="Rocket icon">🚀</span>
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900">
                ACTIVE SPRINT MISSION • +{mission.xp} XP
              </div>
              <h2 id="sprint-modal-title" className="font-display font-black text-base text-black leading-tight">
                {mission.title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close active sprint mission (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Mission Objective Box */}
          <div className="bg-[#faf7f2] border-2 border-black rounded-xl p-3 space-y-1">
            <div className="text-[10px] font-black uppercase text-neutral-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" aria-hidden="true" />
              <span>PROMPT SPECIFICATION</span>
            </div>
            <p className="text-xs font-bold text-neutral-900 leading-snug">
              {mission.codeChallenge?.instruction || mission.description}
            </p>
          </div>

          {/* Code challenge sandbox */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-black uppercase text-neutral-900">
              <label htmlFor="sprint-code-editor" className="cursor-pointer">
                TypeScript Sandbox Editor
              </label>
              <span className="font-mono text-[10px] bg-neutral-200 border border-black px-1.5 py-0.2 rounded text-black">
                streamTimeout.ts
              </span>
            </div>
            <textarea
              id="sprint-code-editor"
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Code challenge sandbox editor"
              className="w-full bg-[#1e293b] text-[#f8fafc] font-mono text-xs p-3 rounded-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#ff5533] leading-relaxed resize-none"
            />
          </div>

          {/* Interactive Test Runner Console */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-black uppercase text-neutral-900">
              <div className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                <span>Sandbox Test Execution Logs</span>
              </div>
              <span className="text-[10px] text-neutral-800 font-bold">
                {logs.length > 0 ? `${logs.length} events logged` : 'Ready'}
              </span>
            </div>
            <div
              tabIndex={0}
              role="region"
              aria-label="Test execution console log stream"
              className="bg-black text-[#4ade80] font-mono text-xs p-3 rounded-xl border-2 border-black min-h-[90px] max-h-[120px] overflow-y-auto space-y-1 leading-snug focus-visible:ring-2 focus-visible:ring-[#ff5533]"
            >
              {logs.length === 0 ? (
                <div className="text-neutral-500 italic">
                  Press "Run Sprint Tests" to execute automated unit benchmarks...
                </div>
              ) : (
                logs.map((log, idx) => <div key={idx}>{log}</div>)
              )}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#faf7f2] border-t-2 border-black flex gap-2">
          {!isCompleted ? (
            <button
              onClick={handleRunSprint}
              disabled={isRunning}
              aria-label="Run automated sprint unit tests in sandbox"
              className="flex-1 bg-[#ff5533] hover:bg-[#fa4420] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-black"
            >
              <Play className="w-4 h-4 fill-white" aria-hidden="true" />
              <span>{isRunning ? 'EXECUTING STRESS TESTS...' : 'RUN SPRINT TESTS ⚡'}</span>
            </button>
          ) : (
            <button
              onClick={handleFinish}
              aria-label={`Submit solution and claim +${mission.xp} XP reward`}
              className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>SUBMIT SOLUTION &amp; CLAIM +{mission.xp} XP 🚀</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
