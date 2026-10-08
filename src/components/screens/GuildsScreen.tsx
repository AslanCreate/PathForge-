import React, { useState } from 'react';
import { GUILD_MEMBERS } from '../../data/mockData';
import { Heart, MessageCircle, Headphones, Radio } from 'lucide-react';
import { playClickSound } from '../../utils/sound';
import confetti from 'canvas-confetti';
import { ChaiArcadeDoodle } from '../doodles/ChaiArcadeDoodle';

interface GuildsScreenProps {
  onAwardXp: (amount: number) => void;
  onShowNotice?: (msg: string) => void;
}

export const GuildsScreen: React.FC<GuildsScreenProps> = ({ onAwardXp, onShowNotice }) => {
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [reviewed, setReviewed] = useState<{ [key: string]: boolean }>({});

  const handleLike = (id: string) => {
    playClickSound();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!likes[id]) {
      onAwardXp(10);
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#ff5533', '#fde047'],
      });
    }
  };

  const handleReview = (name: string, id: string) => {
    playClickSound();
    setReviewed((prev) => ({ ...prev, [id]: true }));
    onAwardXp(15);
    if (onShowNotice) {
      onShowNotice(`Peer review submitted for ${name}'s project (+15 XP)!`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
      {/* 1. Header Banner */}
      <section className="brutal-card p-6 bg-[#4ade80] space-y-4" aria-labelledby="guilds-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black brutal-shadow-sm flex items-center gap-1.5 uppercase">
              <span role="img" aria-label="Flame">🔥</span>
              <span>212 HOMIES ONLINE</span>
            </div>
            <span className="bg-[#fde047] border-2 border-black text-xs font-black px-3 py-1 rounded-full text-black">
              GUILD AI-04
            </span>
          </div>
          <div className="bg-white border-2 border-black px-3 py-1 rounded-xl text-xs font-black text-black brutal-shadow-sm w-fit">
            <span>Peer Review Matchmaker: Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h1 id="guilds-heading" className="font-display font-black text-3xl sm:text-4xl tracking-tight text-black leading-none uppercase">
              COMMUNITY FEED &amp; SQUADS
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed">
              Zero gatekeeping. Peer review code, share micro-demos, and collaborate on real production roadmaps with 39.8K ambitious builders.
            </p>
          </div>

          {/* Community Proof Bar */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-2 bg-white border-2 border-black rounded-2xl p-3 brutal-shadow-sm text-center">
              <div>
                <div className="font-display font-black text-xl text-black leading-none">39.8K</div>
                <div className="text-[10px] font-black text-neutral-800 uppercase mt-1">Global Builders</div>
              </div>
              <div className="border-x-2 border-black">
                <div className="font-display font-black text-xl text-[#ea580c] leading-none">212</div>
                <div className="text-[10px] font-black text-neutral-800 uppercase mt-1">In Sprints Now</div>
              </div>
              <div>
                <div className="font-display font-black text-xl text-[#15803d] leading-none">24.9K</div>
                <div className="text-[10px] font-black text-neutral-800 uppercase mt-1">Shipped Demos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Responsive 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Activity Stream & Peer Reviews */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <div className="flex items-center gap-2 text-sm font-black text-black uppercase">
              <span aria-hidden="true">⚡</span>
              <h2>RECENT BUILDER MILESTONES</h2>
            </div>
            <span className="text-xs font-bold text-neutral-800">
              Live updates every 30s
            </span>
          </div>

          {/* Cards Grid: 2 columns on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUILD_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="brutal-card p-5 bg-white space-y-3.5 flex flex-col justify-between border-2 border-black"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm"
                        style={{ backgroundColor: member.avatarBg }}
                        role="img"
                        aria-label={`Avatar for ${member.name}`}
                      >
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display font-black text-sm text-black">
                            {member.name}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-700">
                            {member.handle}
                          </span>
                        </div>
                        <div className="text-[10px] font-black uppercase text-neutral-800">
                          {member.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#fef08a] border border-black px-2 py-0.5 rounded-full text-[10px] font-black text-black shrink-0">
                      <span role="img" aria-label="Flame">🔥</span>
                      <span>{member.streak}d streak</span>
                    </div>
                  </div>

                  {/* Achievement description */}
                  <div className="bg-[#faf7f2] border border-black rounded-xl p-3 text-xs font-bold text-neutral-900 leading-snug">
                    {member.recentAchievement}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-black/10">
                  <span className="text-[10px] font-black text-[#15803d] flex items-center gap-1 uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" aria-hidden="true" />
                    <span>ONLINE IN SANDBOX</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleLike(member.id)}
                      aria-label={`Send high-five reaction to ${member.name}`}
                      className={`flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-lg border border-black transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${
                        likes[member.id]
                          ? 'bg-[#ff5533] text-white'
                          : 'bg-white hover:bg-neutral-50 text-black'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likes[member.id] ? 'fill-white' : ''}`} aria-hidden="true" />
                      <span>{likes[member.id] ? 'Hype! +10XP' : 'Hype'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReview(member.name, member.id)}
                      aria-label={`Review code submission for ${member.name}`}
                      className={`flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-lg border border-black transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black ${
                        reviewed[member.id]
                          ? 'bg-[#dcfce7] text-[#14532d]'
                          : 'bg-white hover:bg-neutral-50 text-black'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{reviewed[member.id] ? 'Reviewed' : 'Review'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (4 cols): Live Virtual Study Rooms & Squad Hub */}
        <div className="lg:col-span-4 space-y-6">
          <div className="brutal-card p-5 bg-white space-y-4 border-2 border-black">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
                <Headphones className="w-4 h-4 text-black" aria-hidden="true" />
                <span>LIVE STUDY ROOMS</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" aria-hidden="true" />
            </div>

            <div className="space-y-3">
              <div className="border-2 border-black rounded-xl p-3.5 bg-white space-y-1 brutal-shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#15803d] uppercase">4 Builders Coding</span>
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-sm text-black">
                  Voice Agents Room
                </h3>
                <p className="text-xs text-neutral-800 font-bold">
                  Gemini Live WebSockets &amp; Real-time Audio
                </p>
              </div>

              <div className="border-2 border-black rounded-xl p-3.5 bg-[#fef08a] space-y-1 brutal-shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#b45309] uppercase">7 Builders Active</span>
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" aria-hidden="true" />
                </div>
                <h3 className="font-display font-black text-sm text-black">
                  Prompt Evals &amp; Latency Lab
                </h3>
                <p className="text-xs text-neutral-900 font-bold">
                  Async synthetic test suites &amp; token benchmarking
                </p>
              </div>
            </div>
          </div>

          <div className="brutal-card p-5 bg-[#faf7f2] space-y-3 border-2 border-black">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
              <Radio className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
              <span>Squad Guidelines</span>
            </div>
            <p className="text-xs font-bold text-neutral-800 leading-snug">
              Every peer review requires at least one actionable suggestion and constructive feedback. Zero ego, maximum velocity.
            </p>
            <div className="bg-white border border-black rounded-xl p-2.5 text-xs font-black text-black">
              📢 Next Live AMA: Friday 5 PM (Ex-Vercel Founder)
            </div>
          </div>

          {/* Interactive Chai & Bug Smasher Arcade Doodle */}
          <ChaiArcadeDoodle onAwardXp={onAwardXp} />
        </div>
      </div>
    </div>
  );
};
