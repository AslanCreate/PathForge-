import React, { useState, useEffect } from 'react';
import { X, GitFork, Check, AlertCircle } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface AutoRerouteModalProps {
  onClose: () => void;
  onSuccess: (monthsSkipped: number, xpBonus: number) => void;
}

export const AutoRerouteModal: React.FC<AutoRerouteModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [errorState, setErrorState] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const questionData = {
    title: 'Diagnostic Test: Streaming UI & Reactive Buffers',
    prompt:
      'In a high-throughput Next.js 15 application utilizing the Vercel AI SDK, how do you prevent blocking UI freezes when processing token chunks under intense network jitter?',
    options: [
      'Implement an AbortController with requestAnimationFrame buffer decoupling and error boundary fallback.',
      'Wrap JSON.parse in a synchronous while-loop inside the main React rendering thread.',
      'Reload the entire window via window.location.reload() every 500ms.',
      'Store all streamed tokens in localStorage and poll with setInterval(100).',
    ],
    correctIndex: 0,
  };

  const handleVerify = () => {
    playClickSound();
    if (selectedOption === null) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (selectedOption === questionData.correctIndex) {
        playSuccessChime();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#4ade80', '#fde047', '#ff5533'],
        });
        onSuccess(1.5, 100);
      } else {
        setErrorState(true);
      }
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reroute-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="brutal-card bg-white w-full max-w-lg overflow-hidden flex flex-col brutal-shadow-lg">
        {/* Header */}
        <div className="bg-[#4ade80] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-black rotate-90" aria-hidden="true" />
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900">
                FAST-TRACK DIAGNOSTIC
              </div>
              <h2 id="reroute-modal-title" className="font-display font-black text-base text-black leading-tight">
                Skill Mastery Auto Re-Route
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close fast-track diagnostic dialog (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="bg-[#fef08a] border-2 border-black rounded-xl p-3 text-xs font-bold text-neutral-900">
            ⚡ Pass this 1-minute question to skip <span className="underline font-black">1.5 months</span> of syllabus and advance straight into Node D: Hybrid Vector Search!
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-black text-sm text-black">
              {questionData.prompt}
            </h3>
            <div className="space-y-2 pt-1" role="radiogroup" aria-label="Diagnostic multiple choice options">
              {questionData.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      playClickSound();
                      setSelectedOption(idx);
                      setErrorState(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-2.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                      isSelected
                        ? 'bg-[#fde047] border-black brutal-shadow-sm'
                        : 'bg-[#faf7f2] border-black hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-black text-white' : 'bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-bold text-black leading-snug">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {errorState && (
            <div className="bg-[#fee2e2] border-2 border-[#ef4444] rounded-xl p-3 flex items-center gap-2 text-xs font-black text-[#b91c1c]">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Not quite right, homie! Review requestAnimationFrame stream decoupling or ask Coach for a hint.</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleVerify}
              disabled={selectedOption === null || isVerifying}
              aria-label="Verify diagnostic answer and fast-track syllabus"
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>{isVerifying ? 'VERIFYING MASTERY...' : 'VERIFY & FAST-TRACK 1.5 MONTHS >>'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
