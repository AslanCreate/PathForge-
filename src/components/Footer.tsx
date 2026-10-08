import React from 'react';
import { ShieldCheck, CheckCircle, SlidersHorizontal, ArrowUpRight, Compass, GitMerge, Bot, Users, Award } from 'lucide-react';
import { LegalDocType } from './legal/LegalModal';
import { TabType } from '../types';
import { playClickSound } from '../utils/sound';

interface FooterProps {
  onOpenLegal: (type: LegalDocType) => void;
  onOpenCookiePreferences?: () => void;
  onNavigateTab?: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCookiePreferences, onNavigateTab }) => {
  return (
    <footer className="w-full bg-[#f1ede4] border-t-2 border-black mt-16 py-12 px-4 sm:px-6 lg:px-8 text-black select-none" role="contentinfo">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl bg-[#4ade80] border-2 border-black flex items-center justify-center font-black text-sm text-black brutal-shadow-sm"
                role="img"
                aria-label="PathForge Logo"
              >
                PF
              </div>
              <div>
                <span className="font-display font-black text-xl text-black uppercase tracking-tight">
                  PathForge
                </span>
                <p className="text-[11px] font-extrabold text-neutral-800">
                  Gen-Z Tech Career Forge
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-neutral-800 leading-relaxed">
              Bridging high-growth tech careers with interactive coding roadmaps, real-time agent diagnostics, and 30-day streak discipline. Built for ambitious technical builders.
            </p>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-black text-neutral-900 w-fit brutal-shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
              <span>WCAG AA &amp; ZERO-TRACKING</span>
            </div>
          </div>

          {/* Column 2: Navigation & Tracks */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-black tracking-wider flex items-center gap-1.5">
              <span>EXPLORE PLATFORM</span>
              <span aria-hidden="true">🧭</span>
            </h3>
            <ul className="space-y-2 text-xs font-black" role="list">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onNavigateTab?.('discover');
                  }}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-[#ff5533] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
                >
                  <Compass className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>Discover Career Feed (18LPA+)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onNavigateTab?.('roadmap');
                  }}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-[#ff5533] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
                >
                  <GitMerge className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>Interactive Roadmap &amp; Sprints</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onNavigateTab?.('aigang');
                  }}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-[#ff5533] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
                >
                  <Bot className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>AI Gang Benchmark Lab</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onNavigateTab?.('guilds');
                  }}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-[#ff5533] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
                >
                  <Users className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>Guild Hub (212 Live Homies)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onNavigateTab?.('stats');
                  }}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-[#ff5533] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded p-0.5"
                >
                  <Award className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <span>30-Day Missions Calendar &amp; XP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Compliance Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-black tracking-wider flex items-center gap-1.5">
              <span>LEGAL &amp; COMPLIANCE</span>
              <span aria-hidden="true">📜</span>
            </h3>
            <ul className="space-y-2 text-xs font-black" role="list">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenLegal('privacy');
                  }}
                  aria-label="View Privacy Policy and Data Minimization terms"
                  className="text-neutral-900 hover:text-[#ff5533] underline hover:no-underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  Privacy Policy (Data Minimization)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenLegal('terms');
                  }}
                  aria-label="View Terms and Conditions of Service"
                  className="text-neutral-900 hover:text-[#ff5533] underline hover:no-underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenLegal('refund');
                  }}
                  aria-label="View 30-Day Refund and Career Guarantee"
                  className="text-neutral-900 hover:text-[#ff5533] underline hover:no-underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  30-Day Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenLegal('cookies');
                  }}
                  aria-label="View Cookie Policy and Tracking Audit"
                  className="text-neutral-900 hover:text-[#ff5533] underline hover:no-underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  Cookies Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenLegal('embeds');
                  }}
                  aria-label="View 3rd-Party Embeds Security Audit"
                  className="text-neutral-900 hover:text-[#ff5533] underline hover:no-underline transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black rounded"
                >
                  3rd-Party Embeds Security Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Privacy Pledge & Cookie Management */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-black tracking-wider flex items-center gap-1.5">
              <span>DATA TRUST &amp; COOKIES</span>
              <span aria-hidden="true">🛡️</span>
            </h3>
            <div className="bg-white border-2 border-black rounded-2xl p-4 text-xs font-bold text-neutral-900 space-y-2.5 brutal-shadow-sm">
              <div className="flex items-center gap-1.5 font-black text-black uppercase text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
                <span>ONLY NECESSARY DATA</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-800">
                We collect zero advertising telemetry, zero invasive 3rd-party trackers, and strictly store progress locally or with encrypted sessions.
              </p>
              {onOpenCookiePreferences && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenCookiePreferences();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-black uppercase text-black bg-[#faf7f2] hover:bg-[#fde047] border-2 border-black py-2 px-3 rounded-xl cursor-pointer transition-colors brutal-shadow-sm focus-visible:ring-2 focus-visible:ring-black"
                  aria-label="Manage cookie and tracking preferences"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                  <span>Manage Cookies</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Community Proof Bar */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 brutal-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
            <span className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-ping" aria-hidden="true" />
            <span>LIVE PLATFORM STATS</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-black text-black">
            <div className="flex items-center gap-1.5">
              <span role="img" aria-label="Flame">🔥</span>
              <span>39.8K ACTIVE BUILDERS</span>
            </div>
            <span className="text-neutral-400 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5">
              <span role="img" aria-label="Lightning">⚡</span>
              <span>212 LIVE HOMIES IN SPRINTS</span>
            </div>
            <span className="text-neutral-400 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5">
              <span role="img" aria-label="Rocket">🚀</span>
              <span>24.9K SHIPPED DEMOS</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="border-t-2 border-black/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-bold text-neutral-800">
          <p>© 2026 PathForge Inc. Optimized for desktop web browsers &amp; responsive displays. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-extrabold text-neutral-900">
            <span>Server Status: Operational (99.98%)</span>
            <span>•</span>
            <span>Zero Slop Guarantee 🛡️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
