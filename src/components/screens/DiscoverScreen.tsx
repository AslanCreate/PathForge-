import React, { useState } from 'react';
import { CareerOption } from '../../types';
import { Sparkles, Brain, Bot, Cog, Leaf, Bookmark, BookmarkCheck, ArrowRight, Target, Flame, Search, Zap } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { BuilderStickerPad } from '../doodles/BuilderStickerPad';
import { CurvedArrowDoodle, SparkleStarDoodle, SquiggleDoodle } from '../doodles/DoodleSvgs';

interface DiscoverScreenProps {
  careers: CareerOption[];
  onSelectCareer: (career: CareerOption) => void;
  onPeekCareer: (career: CareerOption) => void;
  onBookmarkToggle: (careerId: string) => void;
  onNavigateToRoadmap: () => void;
  onOpenLegalDoc?: (type: 'privacy' | 'terms' | 'refund') => void;
}

const AVAILABLE_VIBES = [
  { id: 'genai', label: 'GenAI Tools', icon: '🧠' },
  { id: 'creative-ui', label: 'Creative UI & 3D', icon: '🎨' },
  { id: 'cloud', label: 'Scalable Cloud', icon: '☁️' },
  { id: 'security', label: 'Cyber Sec', icon: '🛡️' },
  { id: 'agents', label: 'Autonomous Agents', icon: '🤖' },
];

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  careers,
  onSelectCareer,
  onPeekCareer,
  onBookmarkToggle,
  onNavigateToRoadmap,
  onOpenLegalDoc,
}) => {
  const [goalText, setGoalText] = useState(
    'I want to build AI products, design viral interfaces, and work remotely at an early-stage high-growth startup...'
  );
  const [selectedVibes, setSelectedVibes] = useState<string[]>(['genai', 'creative-ui']);
  const [grindHours, setGrindHours] = useState(15);
  const [workplaceVibe, setWorkplaceVibe] = useState<'early' | 'giant'>('early');
  const [isAutoTuning, setIsAutoTuning] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-demand' | 'bookmarked'>('all');

  const getSpicyLevel = () => {
    const len = goalText.length;
    if (len > 80 && selectedVibes.length >= 2) return 'MAX 🔥';
    if (len > 40) return 'MEDIUM ⚡';
    return 'MILD 🌱';
  };

  const toggleVibe = (vibe: string, label: string) => {
    playClickSound();
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter((v) => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
      if (!goalText.toLowerCase().includes(label.toLowerCase())) {
        setGoalText((prev) => (prev.trim() ? `${prev.trim()} Specialize in ${label}.` : `Focusing on ${label}.`));
      }
    }
  };

  const handleAutoTune = async () => {
    playClickSound();
    setIsAutoTuning(true);
    try {
      const res = await fetch('/api/autotune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPrompt: goalText,
          tags: selectedVibes.map((id) => AVAILABLE_VIBES.find((v) => v.id === id)?.label || id),
          grindHours,
          workplaceVibe,
        }),
      });
      const data = await res.json();
      if (data.autotunedText) {
        setGoalText(data.autotunedText);
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.3 },
          colors: ['#ff5533', '#4ade80', '#fde047'],
        });
        playLevelUpSound();
      }
    } catch {
      setGoalText(
        'Architecting high-leverage AI products, reactive streaming frontends, and zero-latency agentic loops at seed-stage unicorns.'
      );
    } finally {
      setIsAutoTuning(false);
    }
  };

  const handleCalibrate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound();
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#4ade80', '#ff5533', '#fde047', '#38bdf8'],
      });
      playLevelUpSound();
      const matchedSection = document.getElementById('top-matched-futures');
      if (matchedSection) {
        matchedSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  const getGrindLabel = (hrs: number) => {
    if (hrs <= 8) return 'CHILL (5H)';
    if (hrs <= 24) return 'BALANCED (15H)';
    return 'MONSTER MODE (40H)';
  };

  const renderCareerIcon = (icon: string) => {
    switch (icon) {
      case 'brain':
        return <Brain className="w-5 h-5 text-[#e11d48]" aria-hidden="true" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-[#ca8a04]" aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#16a34a]" aria-hidden="true" />;
      case 'cog':
        return <Cog className="w-5 h-5 text-[#ea580c]" aria-hidden="true" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-[#15803d]" aria-hidden="true" />;
      default:
        return <Brain className="w-5 h-5 text-[#e11d48]" aria-hidden="true" />;
    }
  };

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (activeFilter === 'high-demand') return c.compatibility >= 85;
    if (activeFilter === 'bookmarked') return c.bookmarked;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-10">
      {/* 1. Website Hero Header Section */}
      <section className="space-y-4" aria-labelledby="hero-heading">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#fef08a] border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase text-black brutal-shadow-sm flex items-center gap-1.5">
              <span>🚀 MINI-GAME CALIBRATOR</span>
            </span>
            <span className="bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase text-black brutal-shadow-sm flex items-center gap-1">
              <span>CHAI &amp; DREAMS ☕</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-black px-3.5 py-1 rounded-full text-xs font-black brutal-shadow-sm text-black">
            <span className="text-[#16a34a]" aria-hidden="true">●</span>
            <span>No boring corporate tours allowed! 🔥</span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="space-y-2 max-w-3xl relative">
          <div className="flex items-center gap-3">
            <h1 id="hero-heading" className="font-display font-black text-4xl sm:text-6xl tracking-tight text-black leading-none uppercase">
              BIG DREAMS. <span className="text-[#ff5533] drop-shadow-[2px_2px_0px_#000]">TINY OVERTHINK.</span>
            </h1>
            <div className="hidden lg:flex items-center gap-1.5 -mt-6">
              <SparkleStarDoodle className="w-8 h-8 text-[#ff5533]" color="#ff5533" />
              <div className="bg-[#fef08a] border-2 border-black px-2.5 py-1 rounded-xl text-[10px] font-black uppercase text-black brutal-shadow-sm rotate-3 flex items-center gap-1">
                <span>0% FLUFF</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base font-bold text-neutral-800 leading-relaxed">
            Find high-demand tech careers, bypass junior tutorial purgatory with real diagnostic fast-tracks, and forge production-grade engineering proof.
          </p>
          {/* Subtle playful hand-drawn squiggle underline */}
          <div className="pt-0.5">
            <SquiggleDoodle className="w-32 h-3" color="#ff5533" />
          </div>
        </div>
      </section>

      {/* 2. Responsive 2-Column Calibrator & Radar Engine */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" aria-label="Career Calibrator and Match Diagnostics">
        {/* Left Column: Interactive Playground Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCalibrate} className="brutal-card p-6 bg-white space-y-5 relative" aria-label="Career goal calibrator form">
            {/* Attached Badge */}
            <div className="absolute -top-3.5 right-6 bg-[#ef4444] border-2 border-black text-white text-[11px] font-black px-3 py-0.5 rounded-full brutal-shadow-sm flex items-center gap-1 uppercase tracking-wide">
              <span>NO BORING ADVICE 🔥</span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl bg-[#fef08a] border-2 border-black flex items-center justify-center shrink-0 brutal-shadow-sm text-2xl"
                  role="img"
                  aria-label="Location pin icon"
                >
                  📍
                </div>
                <div>
                  <h2 className="font-display font-black text-lg text-black leading-tight">
                    Future Tech Playground
                  </h2>
                  <p className="text-xs font-bold text-neutral-800">
                    Input your genuine ambitions &amp; target tech stack (Press Enter to Calibrate)
                  </p>
                </div>
              </div>

              {/* AI Auto-Tune Button */}
              <button
                type="button"
                onClick={handleAutoTune}
                disabled={isAutoTuning}
                aria-label="Automatically tune and optimize your career goal statement with AI"
                className="shrink-0 flex items-center gap-1.5 bg-[#fecdd3] hover:bg-[#fda4af] border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black text-black brutal-shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-all disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 text-black ${isAutoTuning ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>{isAutoTuning ? 'TUNING...' : 'AI AUTO-TUNE'}</span>
              </button>
            </div>

            {/* Goal Textarea */}
            <div className="space-y-1.5">
              <label htmlFor="goal-prompt-input" className="block text-xs font-black uppercase text-black">
                YOUR CAREER AMBITION PROMPT
              </label>
              <textarea
                id="goal-prompt-input"
                rows={3}
                value={goalText}
                onChange={(e) => setGoalText(e.target.value.slice(0, 500))}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleCalibrate();
                  }
                }}
                aria-label="Career goal description"
                placeholder="e.g., I want to build AI products, design viral interfaces, and work remotely at an early-stage high-growth startup..."
                className="w-full bg-[#faf7f2] border-2 border-black rounded-xl p-3.5 text-xs sm:text-sm font-bold text-black placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#ff5533] resize-none leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] font-black text-neutral-900 gap-1.5 uppercase">
                <span>PRESS CMD/CTRL+ENTER TO RUN</span>
                <div className="flex items-center gap-2">
                  <span>CHAR: {goalText.length}/500</span>
                  <span>•</span>
                  <span className="text-black font-black">SPICY LEVEL: {getSpicyLevel()}</span>
                </div>
              </div>
            </div>

            {/* Quick Vibe Injectors */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase tracking-tight">
                <span className="text-[#f59e0b]" aria-hidden="true">⚡</span>
                <span>QUICK VIBE INJECTORS (CLICK TO ADD)</span>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Specialization vibe filters">
                {AVAILABLE_VIBES.map((vibe) => {
                  const isSelected = selectedVibes.includes(vibe.id);
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      role="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleVibe(vibe.id, vibe.label)}
                      aria-label={`Toggle ${vibe.label} filter`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${
                        isSelected
                          ? 'bg-[#ff5533] text-white brutal-shadow-sm scale-102'
                          : 'bg-[#faf7f2] hover:bg-neutral-100 text-black'
                      }`}
                    >
                      <span role="img" aria-label={vibe.label}>{vibe.icon}</span>
                      <span>{vibe.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workload Grind Hours & Workplace Environment Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Workload Grind Hours Slider */}
              <div className="space-y-2 bg-[#faf7f2] border-2 border-black rounded-2xl p-3.5">
                <div className="flex items-center justify-between text-xs font-black text-black uppercase">
                  <label htmlFor="weekly-grind-slider" className="cursor-pointer">
                    WORKLOAD CAP
                  </label>
                  <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black text-black">
                    {getGrindLabel(grindHours)}
                  </span>
                </div>
                <input
                  id="weekly-grind-slider"
                  type="range"
                  min={5}
                  max={40}
                  step={5}
                  value={grindHours}
                  onChange={(e) => setGrindHours(Number(e.target.value))}
                  aria-label="Weekly workload hours slider"
                  className="w-full accent-[#ff5533] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-extrabold text-neutral-800">
                  <span>5h (Side)</span>
                  <span>15h (Balanced)</span>
                  <span>40h (Monster)</span>
                </div>
              </div>

              {/* Workplace Vibe Radio Selector */}
              <div className="space-y-2">
                <div className="text-xs font-black text-black uppercase tracking-tight">
                  TARGET COMPANY STAGE
                </div>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Workplace environment target">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={workplaceVibe === 'early'}
                    onClick={() => {
                      playClickSound();
                      setWorkplaceVibe('early');
                    }}
                    className={`p-2.5 rounded-xl border-2 border-black text-left transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                      workplaceVibe === 'early'
                        ? 'bg-[#4ade80] brutal-shadow-sm text-black font-black'
                        : 'bg-white hover:bg-neutral-50 text-neutral-900 font-bold'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">Seed / Series A</div>
                    <div className="text-[10px] text-neutral-900 mt-0.5">High equity &amp; speed</div>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={workplaceVibe === 'giant'}
                    onClick={() => {
                      playClickSound();
                      setWorkplaceVibe('giant');
                    }}
                    className={`p-2.5 rounded-xl border-2 border-black text-left transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                      workplaceVibe === 'giant'
                        ? 'bg-[#4ade80] brutal-shadow-sm text-black font-black'
                        : 'bg-white hover:bg-neutral-50 text-neutral-900 font-bold'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">Unicorn Scale</div>
                    <div className="text-[10px] text-neutral-900 mt-0.5">Deep specialization</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Calibrate & Reveal CTA Button */}
            <button
              type="submit"
              disabled={isCalibrating}
              aria-label="Calibrate career goals and reveal top matched futures"
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-4 px-6 rounded-2xl brutal-btn text-sm font-black flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>{isCalibrating ? 'CALIBRATING MATCHER...' : 'CALIBRATE & REVEAL TOP FUTURES'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        {/* Right Column: Live Match Radar & Diagnostic Overview */}
        <div className="lg:col-span-5 space-y-4">
          {/* Match Diagnostics Card */}
          <div className="brutal-card p-5 bg-[#faf7f2] space-y-4 border-2 border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#ea580c]" aria-hidden="true" />
                <h3 className="font-display font-black text-sm text-black uppercase">
                  Live Synergy Engine
                </h3>
              </div>
              <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase text-black">
                READY TO FORGE
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white border-2 border-black rounded-xl p-3 brutal-shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase text-neutral-800">RECOMMENDED PATH</div>
                  <div className="font-display font-black text-base text-black">Full-Stack AI Engineer</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-neutral-800">PROJECTED PAYOUT</div>
                  <div className="font-display font-black text-base text-[#15803d]">₹24-38 LPA</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white border-2 border-black rounded-xl p-2.5 brutal-shadow-sm">
                  <div className="text-xl font-black text-black">87%</div>
                  <div className="text-[10px] font-black uppercase text-neutral-800">Current Synergy</div>
                </div>
                <div className="bg-white border-2 border-black rounded-xl p-2.5 brutal-shadow-sm">
                  <div className="text-xl font-black text-[#ea580c]">1.5 Mo</div>
                  <div className="text-[10px] font-black uppercase text-neutral-800">Fast-Track Skip Ready</div>
                </div>
              </div>

              <div className="bg-[#fef08a] border-2 border-black rounded-xl p-3 space-y-1 brutal-shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase">
                  <Zap className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                  <span>VERIFIED HIRING NETWORK</span>
                </div>
                <p className="text-[11px] font-bold text-neutral-900 leading-snug">
                  Active partner cohorts with Anthropic, Perplexity, Cursor, Supabase, and Vercel ecosystem builders.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Builder Doodle & Sticker Pad */}
          <BuilderStickerPad />
        </div>
      </section>

      {/* 3. Top Matched Futures: Responsive Grid Section */}
      <section id="top-matched-futures" className="space-y-6 pt-4" aria-labelledby="matched-futures-heading">
        {/* Section Header & Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-black uppercase">
              <span className="text-[#ea580c]" aria-hidden="true">🔥</span>
              <span>CATALOG &amp; COMPATIBILITY RANKING</span>
            </div>
            <h2 id="matched-futures-heading" className="font-display font-black text-3xl text-black tracking-tight uppercase">
              High-Leverage Tech Careers
            </h2>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, skills..."
                aria-label="Search tech tracks by skill or title"
                className="bg-white border-2 border-black pl-8 pr-3 py-1.5 rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-white border-2 border-black p-1 rounded-xl brutal-shadow-sm">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveFilter('all');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-[#fde047] text-black' : 'text-neutral-800 hover:text-black'
                }`}
              >
                All ({careers.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveFilter('high-demand');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-colors cursor-pointer ${
                  activeFilter === 'high-demand' ? 'bg-[#fde047] text-black' : 'text-neutral-800 hover:text-black'
                }`}
              >
                Top Synergy
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveFilter('bookmarked');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-colors cursor-pointer ${
                  activeFilter === 'bookmarked' ? 'bg-[#fde047] text-black' : 'text-neutral-800 hover:text-black'
                }`}
              >
                Saved
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Available career paths">
          {filteredCareers.map((career) => (
            <div
              key={career.id}
              role="listitem"
              className={`brutal-card p-5 bg-white flex flex-col justify-between transition-all relative ${
                career.isTopMatch ? 'ring-2 ring-[#ff5533]' : ''
              }`}
            >
              {career.isTopMatch && (
                <div className="absolute -top-3 left-4 bg-[#ff5533] text-white border-2 border-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider brutal-shadow-sm flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" aria-hidden="true" />
                  <span>#1 COMPATIBILITY MATCH</span>
                </div>
              )}

              <div className="space-y-3.5">
                {/* Title & Icon Header */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm"
                      style={{ backgroundColor: career.iconBg }}
                      role="img"
                      aria-label={`${career.title} icon`}
                    >
                      {renderCareerIcon(career.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-base sm:text-lg text-black leading-tight">
                          {career.title}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span
                          className="border border-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase text-black"
                          style={{ backgroundColor: career.demandColor }}
                        >
                          {career.demandTag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onBookmarkToggle(career.id);
                    }}
                    aria-label={career.bookmarked ? `Remove bookmark for ${career.title}` : `Bookmark ${career.title}`}
                    className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors brutal-shadow-sm shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
                  >
                    {career.bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#ff5533] fill-[#ff5533]" aria-hidden="true" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-black" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <p className="text-xs font-bold text-neutral-800 leading-snug">
                  {career.subtitle}
                </p>

                {/* Compensation Benchmark Tag */}
                <div className="flex items-center justify-between bg-[#faf7f2] border-2 border-black rounded-xl p-3">
                  <div>
                    <div className="text-[10px] font-black uppercase text-neutral-800">
                      EXPECTED SEED PAYOUT
                    </div>
                    <div className="font-display font-black text-base text-black">
                      {career.expectedPayout}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase text-neutral-800">
                      MATCH RATING
                    </div>
                    <div className="font-display font-black text-base text-[#15803d]">
                      {career.compatibility}% SYNERGY
                    </div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {career.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#fef08a] border border-black px-2 py-0.5 rounded-lg text-[11px] font-black text-black"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions row with clear button labels */}
              <div className="flex gap-2 pt-4 border-t border-black/10 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onPeekCareer(career);
                  }}
                  aria-label={`View full career details and salary breakdown for ${career.title}`}
                  className="flex-1 bg-white hover:bg-neutral-50 text-black py-2.5 px-3 rounded-xl border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-1 brutal-shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                >
                  <span>VIEW DETAILS</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playLevelUpSound();
                    onSelectCareer(career);
                    onNavigateToRoadmap();
                  }}
                  aria-label={`Forge roadmap for ${career.title}`}
                  className="flex-1 bg-[#4ade80] hover:bg-[#22c55e] text-black py-2.5 px-3 rounded-xl border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 brutal-shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                >
                  <span>FORGE ROADMAP</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
