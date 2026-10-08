import React, { useEffect } from 'react';
import { CareerOption } from '../../types';
import { X, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';
import { SparkleStarDoodle } from '../doodles/DoodleSvgs';

interface CareerDetailModalProps {
  career: CareerOption;
  onClose: () => void;
  onSelectAsTarget: (career: CareerOption) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  onSelectAsTarget,
}) => {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="brutal-card bg-white w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] brutal-shadow-lg">
        {/* Header */}
        <div className="bg-[#fde047] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center text-xl shrink-0 brutal-shadow-sm"
              style={{ backgroundColor: career.iconBg }}
              role="img"
              aria-label={`${career.title} path icon`}
            >
              💼
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900 flex items-center gap-1">
                <span>COMPATIBILITY: {career.compatibility}%</span>
                <span>•</span>
                <span className="text-[#ea580c]">{career.demandTag}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <h2 id="career-modal-title" className="font-display font-black text-lg text-black leading-tight">
                  {career.title}
                </h2>
                <SparkleStarDoodle className="w-5 h-5 text-[#ff5533]" color="#ff5533" />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close career details dialog (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Summary Box */}
          <p className="text-xs font-bold text-neutral-900 leading-relaxed bg-[#faf7f2] border-2 border-black rounded-xl p-3">
            {career.summary}
          </p>

          {/* Compensation Breakdown */}
          <div className="border-2 border-black rounded-xl p-3 bg-white space-y-1">
            <div className="text-[10px] font-black text-neutral-900 uppercase">
              COMPENSATION BENCHMARK
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-display font-black text-xl text-black">
                {career.expectedPayout}
              </div>
              <div className="text-xs font-black text-[#15803d]">
                {career.usdEquivalent} Global Remote
              </div>
            </div>
          </div>

          {/* Daily Rituals */}
          <div className="space-y-2">
            <div className="text-xs font-black text-black uppercase flex items-center gap-1.5">
              <span aria-hidden="true">🛠️</span>
              <span>Daily High-Leverage Rituals</span>
            </div>
            <div className="space-y-1.5">
              {career.dailyRituals.map((ritual, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf7f2] border border-black rounded-xl p-2.5 flex items-start gap-2 text-xs font-bold text-black"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#15803d] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{ritual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seed Teams Hiring */}
          <div className="space-y-2">
            <div className="text-xs font-black text-black uppercase flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-black" aria-hidden="true" />
              <span>High-Growth Teams Hiring This Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {career.seedStartupsHiring.map((startup, idx) => (
                <span
                  key={idx}
                  className="bg-white border-2 border-black px-2.5 py-1 rounded-lg text-xs font-extrabold text-black brutal-shadow-sm"
                >
                  {startup}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#faf7f2] border-t-2 border-black">
          <button
            onClick={() => {
              playLevelUpSound();
              onSelectAsTarget(career);
              onClose();
            }}
            aria-label={`Set ${career.title} as target active roadmap profile`}
            className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
          >
            <span>SET AS ACTIVE TARGET PROFILE</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
