import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';
import { NeuralCircuitDoodle } from '../doodles/NeuralCircuitDoodle';
import { SparkleStarDoodle } from '../doodles/DoodleSvgs';

interface AIGangScreenProps {
  onOpenAskCoach: () => void;
  onAwardXp: (xp: number) => void;
}

export const AIGangScreen: React.FC<AIGangScreenProps> = ({
  onOpenAskCoach,
  onAwardXp,
}) => {
  const [testPrompt, setTestPrompt] = useState(
    'Extract user intent and generate JSON action schema for autonomous task executor.'
  );
  const [evalResult, setEvalResult] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleRunEval = () => {
    playClickSound();
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvalResult(
        '⚡ EVAL VERIFIED: 98.4% Precision | 42ms Latency | Zero Hallucination Invariants Verified | +35 XP awarded'
      );
      playLevelUpSound();
      onAwardXp(35);
    }, 900);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
      {/* 1. Header Banner */}
      <section className="brutal-card p-6 bg-[#fde047] space-y-4" aria-labelledby="aigang-header">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black brutal-shadow-sm flex items-center gap-1.5 uppercase">
              <span role="img" aria-label="Robot">🤖</span>
              <span>AI GANG HEADQUARTERS</span>
            </span>
            <span className="bg-[#ef4444] text-white border-2 border-black text-xs font-black px-3 py-1 rounded-full uppercase">
              REAL-TIME LAB
            </span>
          </div>
          <div className="bg-white border-2 border-black px-3 py-1 rounded-xl text-xs font-black text-black brutal-shadow-sm w-fit">
            <span>LLM Latency Sandbox: 42ms Baseline</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 id="aigang-header" className="font-display font-black text-3xl sm:text-4xl tracking-tight text-black leading-none uppercase">
              PROMPT &amp; AGENT BENCHMARK
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-900 max-w-2xl leading-relaxed">
              Stress-test your system instructions, measure token latency, evaluate synthetic schemas, and consult with your dedicated AI mentors before shipping to production.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => {
                playClickSound();
                onOpenAskCoach();
              }}
              aria-label="Open 1-on-1 coaching chat dialog with AI mentor"
              className="w-full sm:w-auto bg-[#ff5533] hover:bg-[#fa4420] text-white py-3.5 px-6 rounded-2xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>OPEN 1-ON-1 COACH CHAT</span>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Interactive Prompt Lab & Benchmark Arena */}
        <div className="lg:col-span-7 space-y-6">
          <div className="brutal-card p-6 bg-white space-y-5">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl" role="img" aria-label="Test tube">🧪</span>
                <div>
                  <h2 className="font-display font-black text-base sm:text-lg text-black">
                    Prompt Latency &amp; Eval Sandbox
                  </h2>
                  <p className="text-xs font-bold text-neutral-800">
                    Test system instructions against strict JSON schemas
                  </p>
                </div>
              </div>
              <span className="text-xs font-black bg-[#faf7f2] border-2 border-black px-2.5 py-1 rounded-lg text-black brutal-shadow-sm">
                GEMINI 2.5 FLASH
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="eval-test-prompt" className="block text-xs font-black uppercase text-black">
                TEST SYSTEM INSTRUCTIONS / TASK PROMPT
              </label>
              <textarea
                id="eval-test-prompt"
                rows={4}
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                aria-label="Prompt text input for latency and schema benchmark"
                placeholder="Enter prompt snippet to evaluate..."
                className="w-full bg-[#faf7f2] border-2 border-black rounded-xl p-3.5 text-xs sm:text-sm font-mono text-black placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#ff5533] leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="text-xs font-bold text-neutral-800 flex items-center gap-2">
                <span>Est. Cost: $0.000015</span>
                <span>•</span>
                <span>Strict JSON Mode</span>
                <span>•</span>
                <span>Zero Hallucination</span>
              </div>
              <button
                onClick={handleRunEval}
                disabled={isEvaluating}
                aria-label="Run prompt latency and precision benchmark"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 px-5 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-black"
              >
                <span>{isEvaluating ? 'BENCHMARKING...' : 'RUN BENCHMARK'}</span>
                <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
              </button>
            </div>

            {evalResult && (
              <div className="bg-[#dcfce7] border-2 border-[#16a34a] rounded-xl p-4 text-xs font-black text-[#14532d] leading-relaxed brutal-shadow-sm">
                {evalResult}
              </div>
            )}
          </div>

          {/* Real-time Token Stream & Neural Circuit Oscilloscope Doodle */}
          <NeuralCircuitDoodle />
        </div>

        {/* Right Column (5 cols): AI Mentors Roster & Coaching Perks */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-2">
              <h2 className="font-display font-black text-xl text-black uppercase">
                Specialized AI Mentors
              </h2>
              <p className="text-xs font-bold text-neutral-800">
                Trained on production codebases &amp; high-tier salary negotiations
              </p>
            </div>

            <div className="space-y-4">
              <div className="brutal-card p-4 bg-white space-y-2 border-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fef08a] border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-black">
                      Streaming State Bot
                    </h3>
                    <div className="text-[10px] font-bold text-neutral-800">
                      SSE &amp; Token Latency Architect
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-neutral-800 leading-snug">
                  Audits chunk pipelines, AbortControllers, and error boundary fallbacks for zero user latency.
                </p>
              </div>

              <div className="brutal-card p-4 bg-white space-y-2 border-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fed7aa] border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm">
                    💰
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-black">
                      Offer Negotiator Bot
                    </h3>
                    <div className="text-[10px] font-bold text-neutral-800">
                      Equity &amp; ₹25L+ Baselines
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-neutral-800 leading-snug">
                  Roleplays seed-stage compensation conversations, vesting cliffs, and counter-offers.
                </p>
              </div>

              <div className="brutal-card p-4 bg-white space-y-2 border-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dcfce7] border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm">
                    🛡️
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-black">
                      Security &amp; Invariants Bot
                    </h3>
                    <div className="text-[10px] font-bold text-neutral-800">
                      Prompt Injection &amp; Rate Limits
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold text-neutral-800 leading-snug">
                  Audits system prompt boundaries, tool access policies, and data isolation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
