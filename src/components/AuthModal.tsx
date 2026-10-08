import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ArrowRight, Github, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { playClickSound, playLevelUpSound, playSuccessChime } from '../utils/sound';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; role: string; level: number }) => void;
  onOpenLegalDoc?: (type: 'privacy' | 'terms') => void;
  currentUser?: { name: string; level: number };
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenLegalDoc,
  currentUser,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('alex.vance@pathforge.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Vance');
  const [selectedRole, setSelectedRole] = useState('AI Product Engineer');
  const [consentAgreed, setConsentAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDevFastLogin = (userName: string, userLevel: number, userRole: string) => {
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#4ade80', '#fde047', '#ff5533'],
      });
      onLoginSuccess({ name: userName, level: userLevel, role: userRole });
      onClose();
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAgreed) return;
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playLevelUpSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#4ade80', '#fde047', '#ff5533'],
      });
      onLoginSuccess({
        name: mode === 'signup' ? name : 'Alex Vance',
        level: mode === 'signup' ? 1 : 8,
        role: selectedRole,
      });
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="brutal-card bg-white w-full max-w-md overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150 brutal-shadow-lg">
        {/* Header */}
        <div className="bg-[#fde047] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl bg-black text-[#4ade80] flex items-center justify-center font-black text-sm border-2 border-black"
              role="img"
              aria-label="PathForge icon"
            >
              PF
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900 tracking-wider">
                PATHFORGE ACCESS PASS
              </div>
              <h2 id="auth-modal-title" className="font-display font-black text-base text-black leading-tight">
                {mode === 'signin' ? 'Welcome Back, Builder' : 'Forge Your Dev Identity'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close authentication modal (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#faf7f2] border-2 border-black rounded-xl" role="tablist" aria-label="Sign in or sign up options">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signin'}
              onClick={() => {
                playClickSound();
                setMode('signin');
              }}
              className={`py-2 text-xs font-black rounded-lg transition-all uppercase focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                mode === 'signin'
                  ? 'bg-black text-white brutal-shadow-sm'
                  : 'text-neutral-900 hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => {
                playClickSound();
                setMode('signup');
              }}
              className={`py-2 text-xs font-black rounded-lg transition-all uppercase focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
                mode === 'signup'
                  ? 'bg-black text-white brutal-shadow-sm'
                  : 'text-neutral-900 hover:text-black'
              }`}
            >
              Join The Gang
            </button>
          </div>

          {/* Quick Dev Fast-Pass Button */}
          <div className="bg-[#4ade80] border-2 border-black rounded-xl p-3 space-y-2 brutal-shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-black flex items-center gap-1">
                <span aria-hidden="true">⚡</span>
                <span>INSTANT DEV FAST-PASS</span>
              </span>
              <span className="bg-white border border-black text-[9px] font-black px-1.5 rounded uppercase text-black">
                1-CLICK DEMO
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  handleDevFastLogin('Alex Vance', 8, 'AI Product Engineer')
                }
                aria-label="One-click login as Alex Vance, Level 8 Pathfinder"
                className="flex-1 bg-white hover:bg-neutral-50 text-black py-2 px-2.5 rounded-lg border-2 border-black text-xs font-black flex items-center justify-center gap-1.5 brutal-shadow-sm focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <span role="img" aria-label="Avatar developer">👨‍💻</span>
                <span>Alex Vance (LVL 08)</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDevFastLogin('Sam Thorne', 1, 'Junior Pathfinder')
                }
                aria-label="One-click login as Sam Thorne, New Level 1 Learner"
                className="bg-[#fef08a] hover:bg-[#fde047] text-black py-2 px-2.5 rounded-lg border-2 border-black text-xs font-black flex items-center justify-center gap-1 brutal-shadow-sm focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                <span role="img" aria-label="Sprout icon">🌱</span>
                <span>New LVL 01</span>
              </button>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() =>
                handleDevFastLogin('Alex Vance', 8, 'AI Product Engineer')
              }
              aria-label="Continue with GitHub account"
              className="w-full bg-[#faf7f2] hover:bg-white text-black py-2.5 px-3 rounded-xl border-2 border-black text-xs font-black flex items-center justify-center gap-2 brutal-shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <Github className="w-4 h-4 text-black" aria-hidden="true" />
              <span>CONTINUE WITH GITHUB</span>
            </button>
            <button
              type="button"
              onClick={() =>
                handleDevFastLogin('Alex Vance', 8, 'AI Product Engineer')
              }
              aria-label="Continue with Google account"
              className="w-full bg-[#faf7f2] hover:bg-white text-black py-2.5 px-3 rounded-xl border-2 border-black text-xs font-black flex items-center justify-center gap-2 brutal-shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            >
              <span className="text-sm" role="img" aria-label="Google globe icon">🌐</span>
              <span>CONTINUE WITH GOOGLE</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-800 uppercase">
            <div className="flex-1 h-0.5 bg-neutral-300" />
            <span>OR USE EMAIL</span>
            <div className="flex-1 h-0.5 bg-neutral-300" />
          </div>

          {/* Email / Password Form with explicit labels & keyboard friendly flow */}
          <form onSubmit={handleSubmit} className="space-y-3" aria-label="Authentication credentials form">
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-name-input" className="text-[11px] font-black text-black uppercase block mb-1">
                  Full Name / Dev Tag
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-700 absolute left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="auth-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-[#faf7f2] border-2 border-black rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-email-input" className="text-[11px] font-black text-black uppercase block mb-1">
                Builder Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-700 absolute left-3 top-2.5" aria-hidden="true" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@pathforge.dev"
                  className="w-full bg-[#faf7f2] border-2 border-black rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="auth-password-input" className="text-[11px] font-black text-black uppercase">
                  Master Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      alert('Password reset instructions sent to registered email.');
                    }}
                    className="text-[10px] font-bold text-neutral-800 hover:text-black underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-700 absolute left-3 top-2.5" aria-hidden="true" />
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#faf7f2] border-2 border-black rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-role-select" className="text-[11px] font-black text-black uppercase block mb-1">
                  Target Track Specialization
                </label>
                <select
                  id="auth-role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-[#faf7f2] border-2 border-black rounded-xl px-3 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#ff5533]"
                >
                  <option value="AI Product Engineer">AI Product Engineer (₹18L - ₹28L)</option>
                  <option value="Full Stack AI Agent Dev">Full Stack AI Agent Dev (₹16L - ₹24L)</option>
                  <option value="Creative UI Technologist">Creative UI Technologist (₹15L - ₹22L)</option>
                  <option value="MLOps Infrastructure Eng">MLOps Infrastructure Eng (₹18L - ₹30L)</option>
                </select>
              </div>
            )}

            {/* Form Consent Checkbox with Data Minimization Notice */}
            <div className="bg-[#faf7f2] border border-black rounded-xl p-2.5 space-y-1.5">
              <div className="flex items-start gap-2">
                <input
                  id="auth-consent"
                  type="checkbox"
                  required
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#ff5533] cursor-pointer shrink-0"
                />
                <label htmlFor="auth-consent" className="text-[11px] font-bold text-neutral-900 leading-tight cursor-pointer">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegalDoc?.('terms')}
                    className="underline text-black font-black hover:text-[#ff5533] cursor-pointer"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegalDoc?.('privacy')}
                    className="underline text-black font-black hover:text-[#ff5533] cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>
              <div className="text-[10px] font-extrabold text-[#15803d] flex items-center gap-1 pl-6">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Only collect necessary data: Zero ad tracking or data reselling.</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !consentAgreed}
              aria-label={mode === 'signin' ? 'Sign in to PathForge' : 'Create new builder account'}
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-3 px-4 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>{isLoading ? 'AUTHENTICATING...' : mode === 'signin' ? 'ENTER THE FORGE' : 'CREATE ACCOUNT & CLAIM +100 XP'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#faf7f2] border-t-2 border-black text-center text-[10px] font-bold text-neutral-800">
          Protected by PathForge Verified Dev Rubrics • Zero Spam
        </div>
      </div>
    </div>
  );
};
