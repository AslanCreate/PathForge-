import React, { useState } from 'react';
import { StudentProfile, Trophy } from '../../types';
import { Check, Flame, Trophy as TrophyIcon, Sparkles, ChevronRight, Circle, Bot } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { DailyMissionsCalendar } from '../DailyMissionsCalendar';
import { TrophyVaultDoodle } from '../doodles/TrophyVaultDoodle';
import { SparkleStarDoodle, SquiggleDoodle } from '../doodles/DoodleSvgs';

interface StatsScreenProps {
  profile: StudentProfile;
  trophies: Trophy[];
  onClaimTrophy: (trophyId: string) => void;
  onOpenAskCoach: () => void;
  onResumePriorityMission: () => void;
  onStreakClick?: () => void;
  onOpenAuth?: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({
  profile,
  trophies,
  onClaimTrophy,
  onOpenAskCoach,
  onResumePriorityMission,
  onStreakClick,
  onOpenAuth,
}) => {
  const [priorityTasks, setPriorityTasks] = useState([
    { id: 1, text: 'Wire FastAPI WebSocket broker', done: true },
    { id: 2, text: 'Configure Qdrant vector memory collection', done: false, isNext: true },
    { id: 3, text: 'Run Docker benchmark & record demo video', done: false },
  ]);

  const toggleTask = (id: number) => {
    playClickSound();
    setPriorityTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleClaim = (trophy: Trophy) => {
    if (trophy.status === 'unlocked') {
      playSuccessChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#fde047', '#ff5533'],
      });
      onClaimTrophy(trophy.id);
    }
  };

  const renderTrophyIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <span className="text-xl" role="img" aria-label="Rocket">🚀</span>;
      case 'flame':
        return <span className="text-xl" role="img" aria-label="Flame">🔥</span>;
      case 'robot':
        return <span className="text-xl" role="img" aria-label="Robot">🤖</span>;
      case 'lock':
        return <span className="text-xl" role="img" aria-label="Padlock">🔒</span>;
      default:
        return <span className="text-xl" role="img" aria-label="Trophy">🏆</span>;
    }
  };

  const unlockedCount = trophies.filter((t) => t.status === 'claimed' || t.status === 'unlocked').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
      {/* 1. 11-Day Quest Streak Ticker Banner */}
      <button
        onClick={() => {
          playClickSound();
          const cal = document.getElementById('missions-calendar');
          if (cal) cal.scrollIntoView({ behavior: 'smooth' });
          onStreakClick?.();
        }}
        aria-label={`Current quest streak: ${profile.streakDays} days with ${profile.streakMultiplier}. Click to view 30-Day Daily Missions Calendar.`}
        className="w-full brutal-card p-3 bg-[#fef08a] flex items-center justify-between hover:bg-[#fde047] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
      >
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black text-black uppercase tracking-tight">
          <span role="img" aria-label="Flame icon">🔥</span>
          <span>{profile.streakDays}-DAY QUEST STREAK • {profile.streakMultiplier} MULTIPLIER ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
          <span className="hidden sm:inline">VIEW 30-DAY CALENDAR</span>
          <ChevronRight className="w-4 h-4 text-black" aria-hidden="true" />
        </div>
      </button>

      {/* 2. Full-Width Student Profile Dashboard Header */}
      <section className="brutal-card p-6 bg-white space-y-5 relative" aria-labelledby="profile-heading">
        {/* On Fire Badge */}
        <div className="absolute top-4 right-6 bg-[#4ade80] border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black brutal-shadow-sm flex items-center gap-1 uppercase">
          <span>ON FIRE 🔥</span>
        </div>

        {/* User Info & Switch ID */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playClickSound();
                onOpenAuth?.();
              }}
              aria-label={`Open dev account settings for ${profile.name}`}
              title="Click to Switch Dev ID / Authenticate"
              className="relative cursor-pointer group focus-visible:ring-2 focus-visible:ring-black rounded-2xl shrink-0"
            >
              <div
                className="w-16 h-16 rounded-2xl bg-[#fed7aa] group-hover:bg-[#fde047] border-2 border-black flex items-center justify-center brutal-shadow-sm text-3xl overflow-hidden transition-colors"
                role="img"
                aria-label={`Profile avatar for ${profile.name}`}
              >
                👨‍💻
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22c55e] border-2 border-black rounded-full flex items-center justify-center text-white" aria-hidden="true">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 id="profile-heading" className="font-display font-black text-2xl sm:text-3xl text-black leading-tight">
                  {profile.name}
                </h1>
                <span className="bg-[#b45309] text-white border border-black px-2.5 py-0.5 rounded-md text-xs font-black tracking-wider">
                  {profile.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-black text-neutral-800 uppercase tracking-wide mt-0.5">
                {profile.subTitle}
              </p>
            </div>
          </div>

          {onOpenAuth && (
            <button
              onClick={() => {
                playClickSound();
                onOpenAuth();
              }}
              aria-label="Switch developer login identity or sign out"
              className="bg-[#faf7f2] hover:bg-[#fde047] border-2 border-black text-xs font-black uppercase px-3.5 py-2 rounded-xl brutal-shadow-sm text-black transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black w-fit"
            >
              SWITCH DEV ID
            </button>
          )}
        </div>

        {/* XP Level Bar */}
        <div className="border-2 border-black rounded-2xl p-4 bg-[#faf7f2] space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-black uppercase">
            <div className="flex items-center gap-1.5">
              <span role="img" aria-label="Trophy">🏆</span>
              <span>EXPERIENCE &amp; NEXT LEVEL PROGRESS</span>
            </div>
            <span aria-label={`Current experience: ${profile.currentXp} of ${profile.nextLevelXp} XP`}>
              {profile.currentXp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP ({Math.round((profile.currentXp / profile.nextLevelXp) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-neutral-200 border-2 border-black rounded-full h-4 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full candy-stripe-orange transition-all duration-500"
              style={{ width: `${Math.min(100, (profile.currentXp / profile.nextLevelXp) * 100)}%` }}
              role="progressbar"
              aria-valuenow={profile.currentXp}
              aria-valuemin={0}
              aria-valuemax={profile.nextLevelXp}
            />
          </div>
        </div>

        {/* 4 Stat Metric Cards in 4-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Nodes Smashed */}
          <div className="border-2 border-black rounded-2xl p-4 bg-[#faf7f2] brutal-shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
              <span className="text-base" role="img" aria-label="Seedling">🌱</span>
              <span>Nodes Smashed</span>
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-black mt-1">
              {profile.nodesSmashed}{' '}
              <span className="text-sm font-extrabold text-neutral-800">
                / {profile.totalNodes}
              </span>
            </div>
          </div>

          {/* 2. Target Match */}
          <div className="border-2 border-black rounded-2xl p-4 bg-[#4ade80] brutal-shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-black">
              <span className="text-base" aria-hidden="true">⚡</span>
              <span>Target Match</span>
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-black mt-1 flex items-baseline gap-1.5">
              <span>{profile.targetMatch}%</span>
              <span className="text-xs font-black uppercase text-neutral-900">
                {profile.matchTier}
              </span>
            </div>
          </div>

          {/* 3. Projects Shipped */}
          <div className="border-2 border-black rounded-2xl p-4 bg-[#faf7f2] brutal-shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
              <span className="text-base" role="img" aria-label="Rocket">🚀</span>
              <span>Projects Shipped</span>
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-black mt-1">
              {profile.projectsShipped}{' '}
              <span className="text-sm font-extrabold text-neutral-800">
                / {profile.totalProjects}
              </span>
            </div>
          </div>

          {/* 4. Target Payout */}
          <div className="border-2 border-black rounded-2xl p-4 bg-[#fef08a] brutal-shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-black">
              <span className="text-base" role="img" aria-label="Cash bill">💵</span>
              <span>Target Payout</span>
            </div>
            <div className="mt-1">
              <div className="font-display font-black text-xl sm:text-2xl text-black leading-none">
                {profile.targetPayout}
              </div>
              <div className="text-xs font-bold text-neutral-900 mt-0.5">
                ({profile.targetPayoutUsd})
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Responsive 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Calendar & Priority Mission */}
        <div className="lg:col-span-7 space-y-8">
          {/* 30-Day Daily Missions Calendar Component */}
          <div id="missions-calendar">
            <DailyMissionsCalendar
              currentStreak={profile.streakDays}
              streakMultiplier={profile.streakMultiplier}
              onCheckInToday={() => {
                playSuccessChime();
                confetti({
                  particleCount: 45,
                  spread: 60,
                  origin: { y: 0.5 },
                  colors: ['#4ade80', '#fde047', '#ff5533'],
                });
              }}
            />
          </div>

          {/* Priority Mission Card */}
          <div className="brutal-card p-6 bg-[#fde047] space-y-4">
            <div className="flex items-center justify-between">
              <div className="bg-[#ef4444] border-2 border-black text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase brutal-shadow-sm">
                PRIORITY MISSION
              </div>
              <div className="bg-white border-2 border-black px-3 py-0.5 rounded-full text-xs font-black text-black">
                3 DAYS LEFT
              </div>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-black leading-tight">
              Deploy Solar Live Telemetry Streamer
            </h3>

            {/* Checklist */}
            <div className="space-y-2.5" role="group" aria-label="Priority mission sprint checklist">
              {priorityTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={`Toggle checklist task: ${task.text} (${task.done ? 'Completed' : 'Pending'})`}
                  className="w-full bg-white border-2 border-black rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-all hover:bg-neutral-50 brutal-shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div className="flex items-center gap-3">
                    {task.done ? (
                      <div className="w-5 h-5 rounded-full bg-[#22c55e] border border-black flex items-center justify-center text-white shrink-0" aria-hidden="true">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-600 shrink-0" aria-hidden="true" />
                    )}
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        task.done ? 'line-through text-neutral-700' : 'text-black'
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  {task.isNext && !task.done && (
                    <span className="bg-[#fed7aa] border border-black text-[10px] font-black px-2 py-0.5 rounded uppercase text-black shrink-0">
                      NEXT
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Loot Drop Box */}
            <div className="bg-white border-2 border-black rounded-xl p-3 flex items-center gap-2 text-xs sm:text-sm font-black text-black brutal-shadow-sm">
              <span role="img" aria-label="Gift box">🎁</span>
              <span className="uppercase">LOOT DROP:</span>
              <span className="text-[#ea580c]">+300 XP • Grid Architect Badge</span>
            </div>

            {/* Resume Mission CTA */}
            <button
              onClick={() => {
                playClickSound();
                onResumePriorityMission();
              }}
              aria-label="Resume priority mission: Deploy Solar Live Telemetry Streamer (Estimated 25 minutes)"
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-3.5 px-4 rounded-2xl brutal-btn text-xs sm:text-sm font-black flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>RESUME PRIORITY MISSION (25 MINS)</span>
              <span role="img" aria-label="Video game controller">🎮</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Readiness Benchmarks, Trophy Case & Coach */}
        <div className="lg:col-span-5 space-y-6">
          {/* Career Readiness Benchmarks */}
          <div className="brutal-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#fed7aa] border border-black flex items-center justify-center text-xs" aria-hidden="true">
                  📊
                </div>
                <h3 className="font-display font-black text-lg text-black">
                  Career Readiness Benchmarks
                </h3>
              </div>
              <span className="bg-[#4ade80] border-2 border-black text-xs font-black px-2.5 py-0.5 rounded-full text-black brutal-shadow-sm uppercase">
                TOP 12% GLOBAL
              </span>
            </div>

            <div className="space-y-3.5">
              {/* LLM Stack */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black text-black">
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="Brain">🧠</span> Technical LLM Stack
                  </span>
                  <span>{profile.readiness.llmStack}%</span>
                </div>
                <div className="w-full bg-neutral-200 border-2 border-black rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-[#ff5533]"
                    style={{ width: `${profile.readiness.llmStack}%` }}
                    role="progressbar"
                    aria-valuenow={profile.readiness.llmStack}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              {/* Full-Stack Architecture */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black text-black">
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="Crane">🏗️</span> Full-Stack Architecture
                  </span>
                  <span>{profile.readiness.fullStack}%</span>
                </div>
                <div className="w-full bg-neutral-200 border-2 border-black rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-[#22c55e]"
                    style={{ width: `${profile.readiness.fullStack}%` }}
                    role="progressbar"
                    aria-valuenow={profile.readiness.fullStack}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              {/* Portfolio Proof of Work */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black text-black">
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="Palette">🎨</span> Portfolio Proof of Work
                  </span>
                  <span>{profile.readiness.portfolio}%</span>
                </div>
                <div className="w-full bg-neutral-200 border-2 border-black rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-[#fde047]"
                    style={{ width: `${profile.readiness.portfolio}%` }}
                    role="progressbar"
                    aria-valuenow={profile.readiness.portfolio}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              {/* Interview & Behavioral */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-black text-black">
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="Handshake">🤝</span> Interview &amp; Behavioral
                  </span>
                  <span>{profile.readiness.interview}%</span>
                </div>
                <div className="w-full bg-neutral-200 border-2 border-black rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-[#475569]"
                    style={{ width: `${profile.readiness.interview}%` }}
                    role="progressbar"
                    aria-valuenow={profile.readiness.interview}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Forge Trophy Case */}
          <div className="brutal-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-black" aria-hidden="true" />
                <h3 className="font-display font-black text-lg text-black">
                  Forge Trophy Case
                </h3>
              </div>
              <span className="text-xs font-black text-neutral-800">
                {unlockedCount} / {trophies.length} UNLOCKED
              </span>
            </div>

            {/* 2x2 Trophy Grid */}
            <div className="grid grid-cols-2 gap-3">
              {trophies.map((trophy) => (
                <div
                  key={trophy.id}
                  className="border-2 border-black rounded-2xl p-3 flex flex-col justify-between brutal-shadow-sm min-h-[140px]"
                  style={{ backgroundColor: trophy.bgColor }}
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-black flex items-center justify-center mb-1.5 brutal-shadow-sm">
                      {renderTrophyIcon(trophy.icon)}
                    </div>
                    <h4 className="font-display font-black text-xs sm:text-sm text-black leading-tight">
                      {trophy.title}
                    </h4>
                    <p className="text-[10px] font-bold text-neutral-900 leading-snug mt-0.5 line-clamp-2">
                      {trophy.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    {trophy.status === 'claimed' && (
                      <span className="w-full bg-[#ffffff] border border-black py-1 px-2 rounded-lg text-[10px] font-black uppercase text-black inline-block text-center">
                        CLAIMED
                      </span>
                    )}
                    {trophy.status === 'unlocked' && (
                      <button
                        onClick={() => handleClaim(trophy)}
                        aria-label={`Claim trophy reward ${trophy.title} for ${trophy.claimRewardXp} XP`}
                        className="w-full bg-[#fde047] hover:bg-[#facc15] border-2 border-black py-1 px-2 rounded-lg text-[10px] font-black uppercase text-black brutal-shadow-sm hover:scale-102 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
                      >
                        CLAIM +{trophy.claimRewardXp} XP!
                      </button>
                    )}
                    {trophy.status === 'locked' && (
                      <span className="w-full bg-neutral-200 border border-black py-1 px-2 rounded-lg text-[10px] font-black uppercase text-neutral-800 inline-block text-center">
                        LOCKED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forge Homie Coach Card */}
          <div className="brutal-card p-5 bg-[#4ade80] space-y-3.5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl bg-white border-2 border-black flex items-center justify-center brutal-shadow-sm shrink-0"
                role="img"
                aria-label="Coach robot avatar"
              >
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-sm text-black uppercase">
                    FORGE HOMIE COACH
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  Personalized Career Co-Pilot
                </span>
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-900 leading-relaxed bg-white/70 p-3 rounded-xl border border-black">
              "Your vector DB skills are certified! Let's lock in streaming WebSocket state today to boost that Super Match to 92%."
            </p>
            <button
              onClick={() => {
                playClickSound();
                onOpenAskCoach();
              }}
              aria-label="Ask Forge Homie Coach for career advice and tactical tips"
              className="w-full bg-white hover:bg-neutral-50 text-black py-2.5 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              <span role="img" aria-label="Speech bubble">💬</span>
              <span>ASK FORGE HOMIE COACH</span>
              <span>⚡</span>
            </button>
          </div>

          {/* Animated Streak Flame Vault Doodle */}
          <TrophyVaultDoodle currentStreak={profile.streakDays} />
        </div>
      </div>
    </div>
  );
};
