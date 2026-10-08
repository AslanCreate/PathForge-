import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { playClickSound, playLevelUpSound } from '../../utils/sound';

interface AskCoachModalProps {
  onClose: () => void;
  userLevel: number;
  onAwardXp: (amount: number) => void;
}

const QUICK_QUESTIONS = [
  'How do I handle token latency jitters in streaming UI?',
  'What do seed-stage founders look for in an AI portfolio?',
  'How do I negotiate my first ₹25L+ offer?',
  'Should I use Qdrant or pgvector for fast hybrid search?',
];

export const AskCoachModal: React.FC<AskCoachModalProps> = ({
  onClose,
  userLevel,
  onAwardXp,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'coach' | 'user'; text: string; xpBonus?: number }>>([
    {
      sender: 'coach',
      text: "Yo Alex! Forge Homie Coach in the building. What's the biggest roadblock in your AI Product Engineer sprint today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;
    playClickSound();
    const query = userText.trim();
    setInputVal('');
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          currentFocus: 'Streaming UI, Vercel AI SDK & Reactive State',
          userLvl: userLevel,
        }),
      });
      const data = await res.json();
      const bonus = data.xpBonus || 25;
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: data.advice || "Keep grinding, homie! Lock in today's demo to flex in the Guild feed.",
          xpBonus: bonus,
        },
      ]);
      playLevelUpSound();
      onAwardXp(bonus);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: "Always decouple your stream buffer using requestAnimationFrame! It drops frame drops to 0ms. Keep building, homie!",
          xpBonus: 20,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputVal);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coach-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="brutal-card bg-white w-full max-w-lg overflow-hidden flex flex-col h-[600px] max-h-[90vh] brutal-shadow-lg">
        {/* Header */}
        <div className="bg-[#4ade80] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center brutal-shadow-sm text-lg"
              role="img"
              aria-label="Forge Homie Coach robot avatar"
            >
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 id="coach-modal-title" className="font-display font-black text-base text-black leading-tight uppercase">
                  Forge Homie Coach
                </h2>
                <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" aria-hidden="true" />
              </div>
              <p className="text-[10px] font-extrabold text-neutral-900">
                100% Homie Vibes • Zero Corporate Fluff • Gemini 2.5 Flash
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close mentor chat modal (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Chat History */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf7f2]"
          role="log"
          aria-live="polite"
          aria-label="Coach conversation messages"
        >
          {messages.map((m, idx) => {
            const isCoach = m.sender === 'coach';
            return (
              <div
                key={idx}
                className={`flex gap-2.5 ${isCoach ? 'items-start' : 'items-end justify-end'}`}
              >
                {isCoach && (
                  <div
                    className="w-7 h-7 rounded-lg bg-[#4ade80] border border-black flex items-center justify-center text-sm shrink-0"
                    role="img"
                    aria-label="Coach avatar"
                  >
                    🤖
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] border-2 border-black text-xs font-bold leading-relaxed ${
                    isCoach
                      ? 'bg-white text-black brutal-shadow-sm'
                      : 'bg-[#ff5533] text-white brutal-shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.xpBonus && (
                    <div className="mt-1.5 inline-flex items-center gap-1 bg-[#fef08a] text-black border border-black text-[9px] font-black px-1.5 py-0.2 rounded-full">
                      <Sparkles className="w-3 h-3 text-[#f59e0b]" aria-hidden="true" />
                      <span>+{m.xpBonus} XP COACH BONUS</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-lg bg-[#4ade80] border border-black flex items-center justify-center text-sm shrink-0">
                🤖
              </div>
              <div className="p-3 rounded-2xl bg-white text-black border-2 border-black text-xs font-bold brutal-shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff5533] animate-ping" aria-hidden="true" />
                <span>Coach is cooking tactical advice...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Injectors */}
        <div className="p-2.5 bg-white border-t-2 border-black overflow-x-auto no-scrollbar flex gap-1.5">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              aria-label={`Ask coach: ${q}`}
              className="shrink-0 bg-[#faf7f2] hover:bg-[#fde047] text-black border border-black text-[10px] font-black px-2.5 py-1 rounded-full transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSubmitForm} className="p-3 bg-white border-t-2 border-black flex items-center gap-2" aria-label="Send message to mentor">
          <label htmlFor="coach-message-input" className="sr-only">
            Ask coach a question
          </label>
          <input
            id="coach-message-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask your AI homie coach anything..."
            className="flex-1 bg-[#faf7f2] border-2 border-black rounded-xl px-3 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            aria-label="Send question to coach"
            className="bg-[#ff5533] hover:bg-[#fa4420] text-white p-2.5 rounded-xl brutal-btn text-xs font-black cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-black"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
};
