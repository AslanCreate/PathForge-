import React, { useState, useEffect } from 'react';
import { Flame, Check, Shield, Gift, Calendar, ChevronRight, X, Sparkles, Trophy } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface DayStatus {
  dayNumber: number;
  dateStr: string;
  status: 'completed' | 'current' | 'upcoming';
  xpEarned?: number;
  missionName?: string;
  milestoneReward?: string;
  milestoneIcon?: string;
}

interface DailyMissionsCalendarProps {
  currentStreak: number;
  streakMultiplier: string;
  onCheckInToday?: () => void;
}

export const DailyMissionsCalendar: React.FC<DailyMissionsCalendarProps> = ({
  currentStreak,
  streakMultiplier,
  onCheckInToday,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayStatus | null>(null);
  const [freezeShields, setFreezeShields] = useState(1);
  const [freezeActive, setFreezeActive] = useState(false);

  // Keyboard accessibility: Escape key closes selected day popup
  useEffect(() => {
    if (!selectedDay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDay(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDay]);

  // Generate 30 days data
  const days: DayStatus[] = Array.from({ length: 30 }, (_, i) => {
    const dayNumber = i + 1;
    let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
    let xpEarned: number | undefined;
    let missionName: string | undefined;
    let milestoneReward: string | undefined;
    let milestoneIcon: string | undefined;

    if (dayNumber < currentStreak) {
      status = 'completed';
      xpEarned = 160 + (dayNumber % 3) * 30;
      missionName = [
        'Prompt Evals & Tokenomics',
        'Streaming SSE Setup',
        'FastAPI WebSocket Gateway',
        'Qdrant Vector Collections',
        'LangGraph Agent Routing',
        'Micro-Interactions in Motion',
        'Synthetic Test Runner',
        'Docker Benchmarking',
        'Error Fallback Boundary',
        'Hybrid Search BM25',
      ][(dayNumber - 1) % 10];
    } else if (dayNumber === currentStreak) {
      status = 'current';
      xpEarned = 180;
      missionName = 'Deploy Solar Live Telemetry Streamer & Token Fallback';
    } else {
      status = 'upcoming';
    }

    // Milestones at Day 7, 14, 21, 30
    if (dayNumber === 7) {
      milestoneReward = '7-Day Streak Badge (+250 XP)';
      milestoneIcon = '🛡️';
    } else if (dayNumber === 14) {
      milestoneReward = '2.0X XP Booster Unlock';
      milestoneIcon = '⚡';
    } else if (dayNumber === 21) {
      milestoneReward = 'Seed-Stage Verified Portfolio Stamp';
      milestoneIcon = '🏅';
    } else if (dayNumber === 30) {
      milestoneReward = 'Forge Grandmaster & Founder Mock Slot';
      milestoneIcon = '👑';
    }

    return {
      dayNumber,
      dateStr: `Oct ${dayNumber < 10 ? '0' + dayNumber : dayNumber}`,
      status,
      xpEarned,
      missionName,
      milestoneReward,
      milestoneIcon,
    };
  });

  const handleUseShield = () => {
    playClickSound();
    if (freezeShields > 0 && !freezeActive) {
      setFreezeShields((prev) => prev - 1);
      setFreezeActive(true);
      playSuccessChime();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#4ade80', '#fde047'],
      });
    }
  };

  const completedDaysCount = days.filter((d) => d.status === 'completed').length;

  return (
    <div className="brutal-card p-5 bg-white space-y-4 relative" aria-label="30-Day Daily Missions Streak Calendar">
      {/* Component Title & Streak Header */}
      <div className="flex items-start justify-between gap-3 border-b-2 border-black pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center shrink-0 brutal-shadow-sm text-xl"
            role="img"
            aria-label="Calendar icon"
          >
            📅
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-black text-base text-black uppercase tracking-tight">
                Daily Missions Calendar
              </h2>
              <span className="bg-[#4ade80] border border-black text-[9px] font-black px-1.5 py-0.2 rounded-full text-black">
                30-DAY QUEST
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-800">
              Track consistency, earn XP boosters &amp; unlock milestone loot
            </p>
          </div>
        </div>

        {/* Streak & Freeze Status with Clear Button Label */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 bg-[#ff5533] text-white border-2 border-black px-2 py-0.5 rounded-full text-[10px] font-black uppercase brutal-shadow-sm">
            <Flame className="w-3 h-3 fill-white" aria-hidden="true" />
            <span>{currentStreak} DAYS</span>
          </div>
          <button
            type="button"
            onClick={handleUseShield}
            disabled={freezeActive || freezeShields === 0}
            aria-label={freezeActive ? 'Streak freeze shield is armed and active' : `Activate streak freeze shield (${freezeShields} available)`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 border-black text-[10px] font-black uppercase transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              freezeActive
                ? 'bg-[#38bdf8] text-white brutal-shadow-sm'
                : freezeShields > 0
                ? 'bg-white hover:bg-[#e0f2fe] text-black brutal-shadow-sm'
                : 'bg-neutral-200 text-neutral-800 opacity-60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{freezeActive ? 'SHIELD ARMED 🛡️' : `FREEZE (${freezeShields})`}</span>
          </button>
        </div>
      </div>

      {/* 30-Day Calendar Grid (6 columns x 5 rows) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-black text-black">
          <span className="uppercase">OCTOBER CYCLE • 30-DAY QUEST GRID</span>
          <span className="text-neutral-900 font-extrabold">{completedDaysCount} / 30 SMASHED</span>
        </div>
        <div className="grid grid-cols-6 gap-2" role="grid" aria-label="30-day mission quest calendar">
          {days.map((day) => {
            const isCompleted = day.status === 'completed';
            const isCurrent = day.status === 'current';
            const hasMilestone = !day.milestoneReward;
            let bgClass = 'bg-[#faf7f2] border-neutral-400 text-neutral-800';
            if (isCompleted) {
              bgClass = 'bg-[#4ade80] border-black text-black brutal-shadow-sm';
            } else if (isCurrent) {
              bgClass = 'bg-[#fde047] border-black text-black brutal-shadow-sm ring-2 ring-[#ea580c] ring-offset-1 animate-pulse';
            }

            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedDay(day);
                }}
                aria-label={`Day ${day.dayNumber}, ${day.dateStr}: ${day.status}${day.milestoneReward ? `. Milestone: ${day.milestoneReward}` : ''}`}
                className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-between p-1 transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${bgClass}`}
                title={`Day ${day.dayNumber}: ${day.status}`}
              >
                {/* Day number */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-[10px] font-black leading-none">
                    {day.dayNumber}
                  </span>
                  {hasMilestone && (
                    <span className="text-[10px] leading-none" title={day.milestoneReward} aria-hidden="true">
                      {day.milestoneIcon}
                    </span>
                  )}
                </div>

                {/* Status Indicator Icon */}
                <div className="flex items-center justify-center my-auto">
                  {isCompleted && (
                    <Check className="w-4 h-4 stroke-[3.5] text-black" aria-hidden="true" />
                  )}
                  {isCurrent && (
                    <Flame className="w-4 h-4 text-[#ea580c] fill-[#ea580c]" aria-hidden="true" />
                  )}
                  {!isCompleted && !isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" aria-hidden="true" />
                  )}
                </div>

                {/* Mini date label */}
                <span className="text-[8px] font-extrabold uppercase leading-none opacity-90 text-neutral-900">
                  {day.dateStr.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Legend & Progress with High Contrast */}
      <div className="flex items-center justify-between text-[10px] font-black text-neutral-900 pt-1 border-t border-neutral-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#4ade80] border border-black inline-block" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#fde047] border border-black inline-block" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#faf7f2] border border-neutral-400 inline-block" />
            <span>Locked</span>
          </div>
        </div>
        <span className="font-extrabold text-black">
          {Math.round((completedDaysCount / 30) * 100)}% CONSISTENCY
        </span>
      </div>

      {/* Milestone Loot Roadmap Preview */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[11px] font-black uppercase text-black flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-[#ff5533]" aria-hidden="true" />
          <span>STREAK MILESTONE REWARDS</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { day: 'Day 7', icon: '🛡️', title: '+250 XP Badge', status: 'Unlocked' },
            { day: 'Day 14', icon: '⚡', title: '2.0X Multiplier', status: 'In 3 Days' },
            { day: 'Day 21', icon: '🏅', title: 'Portfolio Stamp', status: 'Locked' },
            { day: 'Day 30', icon: '👑', title: 'Grandmaster Slot', status: 'Locked' },
          ].map((m, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl border-2 border-black flex flex-col justify-between ${
                m.status === 'Unlocked' ? 'bg-[#bbf7d0]' : 'bg-[#faf7f2]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-black">{m.day}</span>
                <span className="text-sm" role="img" aria-label={m.title}>{m.icon}</span>
              </div>
              <div className="text-[11px] font-black text-black leading-tight mt-1">{m.title}</div>
              <span className="text-[9px] font-black uppercase text-neutral-800 mt-1">{m.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day Details Modal Popup */}
      {selectedDay && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="day-details-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100"
        >
          <div className="brutal-card bg-white w-full max-w-sm p-5 space-y-4 brutal-shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-black uppercase text-neutral-900">
                  DAY {selectedDay.dayNumber} DETAILS • {selectedDay.dateStr}
                </div>
                <h3 id="day-details-title" className="font-display font-black text-lg text-black leading-tight">
                  {selectedDay.status === 'completed'
                    ? 'Mission Conquered'
                    : selectedDay.status === 'current'
                    ? "Today's Active Mission"
                    : 'Upcoming Syllabus Quest'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                aria-label="Close day detail dialog (Press Escape)"
                className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs hover:bg-neutral-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
              >
                <X className="w-4 h-4 text-black" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="bg-[#faf7f2] border-2 border-black rounded-xl p-3 text-xs font-bold text-neutral-900 space-y-1">
                <div className="text-[10px] font-black text-neutral-800 uppercase">
                  OBJECTIVE
                </div>
                <div className="text-black font-extrabold">
                  {selectedDay.missionName || 'Unlock by completing previous node missions.'}
                </div>
              </div>

              {selectedDay.xpEarned && (
                <div className="bg-[#fef08a] border border-black rounded-xl p-2.5 flex items-center justify-between text-xs font-black text-black">
                  <span>EXPERIENCE AWARDED:</span>
                  <span className="text-[#ea580c]">+{selectedDay.xpEarned} XP</span>
                </div>
              )}

              {selectedDay.milestoneReward && (
                <div className="bg-[#4ade80] border-2 border-black rounded-xl p-2.5 flex items-center gap-2 text-xs font-black text-black">
                  <span className="text-base" aria-hidden="true">{selectedDay.milestoneIcon}</span>
                  <div>
                    <div className="text-[9px] uppercase">MILESTONE UNLOCKED:</div>
                    <div>{selectedDay.milestoneReward}</div>
                  </div>
                </div>
              )}
            </div>

            {selectedDay.status === 'current' && (
              <button
                type="button"
                onClick={() => {
                  onCheckInToday?.();
                  setSelectedDay(null);
                }}
                aria-label="Complete today's mission check-in and claim streak bonus"
                className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-2.5 px-3 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
              >
                <span>CLAIM TODAY'S STREAK BONUS 🔥</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              aria-label="Close dialog"
              className="w-full bg-[#faf7f2] hover:bg-neutral-100 text-black py-2 rounded-xl border border-black text-xs font-bold uppercase cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
