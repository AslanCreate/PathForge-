import React, { useState } from 'react';
import { Mission, RoadmapModule, CareerOption } from '../../types';
import { CheckCircle2, Play, Lock, ChevronRight, X, GitFork, ArrowRight, Bot, Flame } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';
import { LoFiRadioDoodle } from '../doodles/LoFiRadioDoodle';
import { SparkleStarDoodle, SteamingCoffeeDoodle, SquiggleDoodle } from '../doodles/DoodleSvgs';
import { RoadmapProgressionConnector, NodeBranchConnector } from '../roadmap/RoadmapProgressionConnector';

interface RoadmapScreenProps {
  currentCareer: CareerOption;
  missions: Mission[];
  modules: RoadmapModule[];
  onStartSprint: (mission: Mission) => void;
  onOpenAutoReroute: () => void;
  onOpenMentorTip: () => void;
  onOpenGuilds: () => void;
  onPaceChange?: (pace: string) => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  currentCareer,
  missions,
  modules,
  onStartSprint,
  onOpenAutoReroute,
  onOpenMentorTip,
  onOpenGuilds,
  onPaceChange,
}) => {
  const [activePace, setActivePace] = useState<'1m' | '2m' | '3m'>('2m');
  const [showRerouteBanner, setShowRerouteBanner] = useState(true);

  const completedCount = missions.filter((m) => m.status === 'done').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
      {/* 1. Target Profile Top Website Hero Banner */}
      <section className="brutal-card p-6 bg-[#4ade80] space-y-4" aria-labelledby="roadmap-target-heading">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black brutal-shadow-sm flex items-center gap-1.5 uppercase">
              <span role="img" aria-label="Target">🎯</span>
              <span>ACTIVE TARGET ROADMAP</span>
            </div>
            <div className="bg-[#fef08a] border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black brutal-shadow-sm flex items-center gap-1">
              <span role="img" aria-label="Lightning bolt">⚡</span>
              <span>{currentCareer.compatibility}% SYNERGY</span>
            </div>
          </div>

          {/* Sprint Pace Selector integrated into banner header on desktop */}
          <div className="flex items-center gap-2" role="group" aria-label="Sprint pacing options">
            <span className="text-xs font-black uppercase text-black hidden sm:inline">Pacing:</span>
            <button
              type="button"
              role="button"
              aria-pressed={activePace === '1m'}
              onClick={() => {
                playClickSound();
                setActivePace('1m');
                onPaceChange?.('1m');
              }}
              className={`border-2 border-black px-3 py-1 rounded-xl text-xs font-black uppercase transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${
                activePace === '1m'
                  ? 'bg-black text-white brutal-shadow-sm'
                  : 'bg-white hover:bg-neutral-100 text-black'
              }`}
            >
              1M Fast (25h/wk)
            </button>
            <button
              type="button"
              role="button"
              aria-pressed={activePace === '2m'}
              onClick={() => {
                playClickSound();
                setActivePace('2m');
                onPaceChange?.('2m');
              }}
              className={`border-2 border-black px-3 py-1 rounded-xl text-xs font-black uppercase transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black relative ${
                activePace === '2m'
                  ? 'bg-[#fde047] text-black brutal-shadow-sm'
                  : 'bg-white hover:bg-neutral-100 text-black'
              }`}
            >
              2M Reco (16h/wk) ⭐
            </button>
            <button
              type="button"
              role="button"
              aria-pressed={activePace === '3m'}
              onClick={() => {
                playClickSound();
                setActivePace('3m');
                onPaceChange?.('3m');
              }}
              className={`border-2 border-black px-3 py-1 rounded-xl text-xs font-black uppercase transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${
                activePace === '3m'
                  ? 'bg-black text-white brutal-shadow-sm'
                  : 'bg-white hover:bg-neutral-100 text-black'
              }`}
            >
              3M Chill (8h/wk)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h1 id="roadmap-target-heading" className="font-display font-black text-3xl sm:text-4xl tracking-tight text-black leading-none uppercase">
              {currentCareer.title}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-1.5 leading-snug">
              Fast-track production LLM applications, agentic workflows, and eval pipelines directly for high-growth tech firms.
            </p>
          </div>

          <div className="md:col-span-4 bg-white border-2 border-black rounded-2xl p-4 brutal-shadow-sm text-center">
            <div className="text-[10px] font-black uppercase text-neutral-800">PROJECTED COMPENSATION</div>
            <div className="font-display font-black text-2xl text-black mt-0.5">
              {currentCareer.expectedPayout.split('/')[0].trim()}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 bg-white border-2 border-black rounded-full h-4 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full candy-stripe-orange transition-all duration-500"
              style={{ width: '62%' }}
              role="progressbar"
              aria-valuenow={62}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Target profile completion percentage"
            />
          </div>
          <span className="text-xs font-black text-black shrink-0 uppercase tracking-tight">
            62% FORGED (LEVEL 04 READY)
          </span>
        </div>
      </section>

      {/* Auto-Reroute Active Notification Banner */}
      {showRerouteBanner && (
        <div className="brutal-card p-4 bg-[#fef08a] relative flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0 brutal-shadow-sm text-lg">
            ⚡
          </div>
          <div className="flex-1 pr-6">
            <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
              <span>AUTO-REROUTE DIAGNOSTIC ACTIVE</span>
              <span className="bg-[#4ade80] border border-black px-1.5 py-0.2 rounded text-[10px]">
                SAVED 1.5 MONTHS
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-900 mt-1 leading-snug">
              React fundamentals verified in diagnostic quiz! Skipped ahead directly into Next.js dynamic streaming and agentic loop architectures.
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              setShowRerouteBanner(false);
            }}
            aria-label="Dismiss auto-reroute notification"
            className="w-7 h-7 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-bold hover:bg-neutral-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-black shrink-0"
          >
            <X className="w-3.5 h-3.5 text-black" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* 2. Responsive 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Missions & Roadmap Modules */}
        <div className="lg:col-span-8 space-y-8">
          {/* Today's Missions Section */}
          <section className="space-y-4" aria-labelledby="missions-heading">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2 text-sm font-black text-black uppercase">
                <span className="text-[#f59e0b]" aria-hidden="true">⚡</span>
                <h2 id="missions-heading">TODAY'S CODING MISSIONS</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#fef08a] border border-black px-2.5 py-0.5 rounded-full text-xs font-black text-black brutal-shadow-sm">
                  +180 XP POOL
                </span>
                <span className="text-xs font-black text-neutral-900">
                  {completedCount} / {missions.length} COMPLETED
                </span>
              </div>
            </div>

            {/* Mission Cards List */}
            <div className="space-y-3">
              {missions.map((mission) => {
                if (mission.status === 'done') {
                  return (
                    <div
                      key={mission.id}
                      className="brutal-card p-4 bg-white flex items-center justify-between gap-4 border-neutral-300 opacity-90"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#22c55e] border-2 border-black flex items-center justify-center text-white brutal-shadow-sm shrink-0">
                          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-neutral-900 line-through">
                            {mission.title}
                          </div>
                          <div className="text-[11px] font-bold text-[#15803d]">
                            Completed at {mission.completedAt || '10:42 AM'}
                          </div>
                        </div>
                      </div>
                      <span className="bg-[#f1ede4] border border-black text-xs font-black px-2.5 py-1 rounded-md text-neutral-900 shrink-0">
                        +{mission.xp} XP
                      </span>
                    </div>
                  );
                }

                if (mission.status === 'active') {
                  return (
                    <div
                      key={mission.id}
                      className="brutal-card p-5 bg-white relative space-y-3.5 ring-2 ring-black"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#fde047] border-2 border-black flex items-center justify-center text-black shrink-0 brutal-shadow-sm">
                            <Play className="w-5 h-5 fill-black" aria-hidden="true" />
                          </div>
                          <div>
                            <span className="bg-[#fecdd3] border border-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-black inline-block mb-1">
                              {mission.badgeLabel || 'CURRENT OBJECTIVE'}
                            </span>
                            <h3 className="font-display font-black text-base text-black leading-tight">
                              {mission.title}
                            </h3>
                            <p className="text-xs font-bold text-neutral-800 mt-1 leading-snug">
                              {mission.description}
                            </p>
                          </div>
                        </div>
                        <span className="bg-[#fef08a] border-2 border-black text-xs font-black px-3 py-1 rounded-xl text-black shrink-0 brutal-shadow-sm w-fit">
                          +{mission.xp} XP
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-black/10">
                        <div className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                          <span aria-hidden="true">⏱️</span>
                          <span>ESTIMATED TIME: {mission.timeEstimate}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            onStartSprint(mission);
                          }}
                          aria-label={`Start sprint mission: ${mission.title}`}
                          className="bg-[#ff5533] hover:bg-[#fa4420] text-white px-5 py-2.5 rounded-xl brutal-btn text-xs font-black uppercase flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
                        >
                          <span>START SPRINT MISSION</span>
                          <span aria-hidden="true">⚡</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                // Locked Mission
                return (
                  <div
                    key={mission.id}
                    className="brutal-card p-4 bg-[#f8f6f0] flex items-center justify-between gap-4 opacity-90 border-black"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-neutral-200 border-2 border-black flex items-center justify-center text-neutral-900 shrink-0">
                        <Lock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-neutral-900">
                          {mission.title}
                        </div>
                        <div className="text-[11px] font-bold text-neutral-800">
                          {mission.badgeLabel || 'Unlocks after Mission 2'}
                        </div>
                      </div>
                    </div>
                    <span className="bg-neutral-200 border border-black text-xs font-black px-2.5 py-1 rounded-md text-neutral-900 shrink-0">
                      +{mission.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Roadmap Modules Section */}
          <section className="space-y-4" aria-labelledby="roadmap-modules-heading">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <h2 id="roadmap-modules-heading" className="font-display font-black text-xl tracking-tight text-black uppercase">
                  CURRICULUM MODULES
                </h2>
                <span className="bg-white border-2 border-black text-[10px] font-black px-2.5 py-0.5 rounded-full text-black brutal-shadow-sm">
                  TRACK #AI-04
                </span>
              </div>
              <span className="text-xs font-bold text-neutral-800">
                Synced to Tech Hiring Rubrics
              </span>
            </div>

            <div className="space-y-4">
              {/* Module 1: Prompt-to-Code & Core Evals (Completed) */}
              <div className="brutal-card p-5 bg-white space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#15803d] border-2 border-black flex items-center justify-center text-white font-black text-base brutal-shadow-sm">
                      M1
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg text-black leading-tight">
                        Prompt-to-Code &amp; Core Evals
                      </h3>
                      <div className="text-xs font-black text-[#15803d] uppercase mt-0.5">
                        100% COMPLETE • MASTERY UNLOCKED
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#22c55e]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-[#4ade80] border border-black px-3 py-1 rounded-xl text-xs font-black text-black">
                    Prompt Engineering
                  </span>
                  <span className="bg-[#4ade80] border border-black px-3 py-1 rounded-xl text-xs font-black text-black">
                    Tokenomics &amp; Cost
                  </span>
                  <span className="bg-[#4ade80] border border-black px-3 py-1 rounded-xl text-xs font-black text-black">
                    Function Calling
                  </span>
                </div>
              </div>

              {/* Animated Progression SVG Pipeline: Module 1 -> Module 2 */}
              <RoadmapProgressionConnector
                type="completed-to-active"
                onInspectBridge={() => onOpenAutoReroute()}
              />

              {/* Module 2: Agentic Workflows & UI Architecture (Active) */}
              <div className="brutal-card p-5 bg-white space-y-4 relative border-2 border-black">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#fde047] border-2 border-black flex items-center justify-center text-black font-black text-base brutal-shadow-sm">
                      M2
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg text-black leading-tight">
                        Agentic Workflows &amp; UI Architecture
                      </h3>
                      <div className="text-xs font-black text-[#ea580c] uppercase mt-0.5">
                        45% ACTIVE PROGRESS
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#fef08a] border-2 border-black flex items-center justify-center text-sm font-black" aria-hidden="true">
                    ⚡
                  </div>
                </div>

                {/* Current Focus: Node C Inner Box */}
                <div className="border-2 border-black rounded-2xl p-4 bg-[#faf7f2] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black text-black">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
                      <span>CURRENT FOCUS: NODE C</span>
                    </div>
                    <span className="bg-white border border-black px-2.5 py-0.5 rounded-md text-xs font-black text-black">
                      STEP 3 / 6
                    </span>
                  </div>

                  <div className="font-display font-black text-base text-black">
                    Streaming UI, Vercel AI SDK &amp; Reactive State
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenAutoReroute();
                    }}
                    aria-label="Skip module: verify concept mastery and auto re-route syllabus ahead 1.5 months"
                    className="w-full bg-[#fef08a] hover:bg-[#fde047] border-2 border-black py-3 px-4 rounded-xl text-xs font-black uppercase text-black brutal-shadow-sm hover:translate-y-[-1px] transition-transform text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
                  >
                    AUTO RE-ROUTE: I ALREADY KNOW THIS &gt;&gt;
                  </button>
                </div>

                {/* Animated Sub-Node Synapse Branch Connector */}
                <NodeBranchConnector />

                {/* Node D & Node E */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border-2 border-black rounded-xl p-3 bg-white flex items-center justify-between">
                    <span className="text-xs font-extrabold text-neutral-900">
                      Node D: RAG with Hybrid Vectors
                    </span>
                    <span className="bg-neutral-100 border border-black text-[10px] font-black px-2 py-0.5 rounded uppercase text-neutral-800">
                      NEXT UP
                    </span>
                  </div>
                  <div className="border-2 border-black rounded-xl p-3 bg-white flex items-center justify-between opacity-80">
                    <span className="text-xs font-extrabold text-neutral-700">
                      Node E: LangGraph State
                    </span>
                    <span className="bg-neutral-100 border border-black text-[10px] font-black px-2 py-0.5 rounded uppercase text-neutral-700">
                      LOCKED
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Progression SVG Pipeline: Module 2 -> Module 3 Quest */}
              <RoadmapProgressionConnector
                type="active-to-locked"
                onInspectBridge={() => onOpenMentorTip()}
              />

              {/* Module 3: Deployment, Eval & Job Ready (Locked) */}
              <div className="brutal-card p-5 bg-[#f8f6f0] space-y-3.5 opacity-90">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-300 border-2 border-black flex items-center justify-center text-neutral-800 font-black text-base">
                      M3
                    </div>
                    <div>
                      <h3 className="font-display font-black text-lg text-black leading-tight">
                        Deployment, Eval &amp; Job Ready
                      </h3>
                      <div className="text-xs font-black text-neutral-700 uppercase mt-0.5">
                        LOCKED QUEST
                      </div>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-neutral-700" aria-hidden="true" />
                </div>

                {/* Final Boss Quest Card */}
                <div className="border-2 border-black rounded-2xl p-4 bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#e9d5ff] border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm"
                      role="img"
                      aria-label="Alien monster icon"
                    >
                      👾
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-[#7e22ce] uppercase tracking-wider">
                        FINAL BOSS QUEST
                      </div>
                      <div className="text-xs sm:text-sm font-black text-black">
                        Mock Technical Interview &amp; Offer Negotiation
                      </div>
                    </div>
                  </div>
                  <span className="bg-[#f1ede4] border border-black text-xs font-black px-3 py-1 rounded-md text-black shrink-0">
                    +500 XP
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Sticky Sidebar with AI Mentor, Guild Feed & Diagnostics */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* AI Mentor Quick Card */}
          <div className="brutal-card p-5 bg-[#fde047] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-black" aria-hidden="true" />
                <h3 className="font-display font-black text-sm text-black uppercase">
                  AI Mentor Standby
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold text-neutral-900 leading-snug">
              Got stuck debugging streaming tokens or Qdrant hybrid search? Chat with your AI coach instantly.
            </p>
            <button
              onClick={() => {
                playClickSound();
                onOpenMentorTip();
              }}
              aria-label="Open AI Mentor advice tip"
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>OPEN AI COACH (1 TIP READY)</span>
              <span role="img" aria-label="Robot">🤖</span>
            </button>
          </div>

          {/* Fast-Track Auto Re-Route Card */}
          <div className="brutal-card p-5 bg-white space-y-3 border-2 border-black">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
              <GitFork className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
              <span>Diagnostic Fast-Track</span>
            </div>
            <p className="text-xs font-bold text-neutral-800 leading-snug">
              Take the 3-question diagnostic quiz anytime to prove competence and fast-track syllabus nodes.
            </p>
            <button
              onClick={() => {
                playClickSound();
                onOpenAutoReroute();
              }}
              aria-label="Open syllabus diagnostic test"
              className="w-full bg-[#fef08a] hover:bg-[#fde047] border-2 border-black py-2.5 px-3 rounded-xl text-xs font-black uppercase text-black cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-black"
            >
              TAKE DIAGNOSTIC QUIZ &gt;&gt;
            </button>
          </div>

          {/* Guild Community Feed Widget (212 Homies) */}
          <div className="brutal-card p-5 bg-white space-y-3 border-2 border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
                <Flame className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
                <span>212 HOMIES ONLINE</span>
              </div>
              <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase text-black">
                LIVE
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-800 leading-snug">
              Sneha and Devansh just verified Node B streaming benchmarks! Join the active sprint voice room.
            </p>
            <button
              onClick={() => {
                playClickSound();
                onOpenGuilds();
              }}
              aria-label="Open Guilds community feed: 212 active homies online"
              className="w-full bg-white hover:bg-neutral-100 border-2 border-black py-2.5 px-3 rounded-xl text-xs font-black uppercase text-black flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>VIEW GUILD SQUAD</span>
              <ChevronRight className="w-4 h-4 text-black" aria-hidden="true" />
            </button>
          </div>

          {/* Animated Sprint Lo-Fi Radio Doodle */}
          <LoFiRadioDoodle />
        </div>
      </div>
    </div>
  );
};
