import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/sound';

interface CookieConsentBannerProps {
  onOpenCookiesPolicy: () => void;
  onOpenPrivacyPolicy?: () => void;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenCookiesPolicy,
  onOpenPrivacyPolicy,
  forceOpen,
  onCloseForceOpen,
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [functionalAllowed, setFunctionalAllowed] = useState(true);

  useEffect(() => {
    if (forceOpen) {
      setShowBanner(true);
      setShowPreferences(true);
      return;
    }
    const consent = localStorage.getItem('pathforge_cookie_consent');
    if (!consent) {
      // Delay slightly for natural non-intrusive feel
      const t = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(t);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    playSuccessChime();
    localStorage.setItem(
      'pathforge_cookie_consent',
      JSON.stringify({ essential: true, functional: true, analytics: true })
    );
    setShowBanner(false);
    setShowPreferences(false);
    onCloseForceOpen?.();
  };

  const handleRejectNonEssential = () => {
    playClickSound();
    localStorage.setItem(
      'pathforge_cookie_consent',
      JSON.stringify({ essential: true, functional: false, analytics: false })
    );
    setShowBanner(false);
    setShowPreferences(false);
    onCloseForceOpen?.();
  };

  const handleSavePreferences = () => {
    playSuccessChime();
    localStorage.setItem(
      'pathforge_cookie_consent',
      JSON.stringify({
        essential: true,
        functional: functionalAllowed,
        analytics: analyticsAllowed,
      })
    );
    setShowBanner(false);
    setShowPreferences(false);
    onCloseForceOpen?.();
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent management banner"
      className="fixed bottom-16 sm:bottom-20 left-4 right-4 z-40 max-w-lg mx-auto animate-in slide-in-from-bottom duration-200"
    >
      <div className="brutal-card p-4 sm:p-5 bg-white border-2 border-black space-y-3.5 brutal-shadow-lg">
        {/* Banner Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl bg-[#fef08a] border-2 border-black flex items-center justify-center shrink-0 brutal-shadow-sm text-lg"
              role="img"
              aria-label="Cookie security icon"
            >
              🍪
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900 flex items-center gap-1.5 flex-wrap">
                <span>COOKIE &amp; PRIVACY NOTICE</span>
                <span>•</span>
                <span className="text-[#15803d] bg-[#4ade80]/20 px-1.5 py-0.2 rounded border border-black font-extrabold">
                  ONLY NECESSARY DATA
                </span>
              </div>
              <h3 className="font-display font-black text-sm sm:text-base text-black leading-tight mt-0.5">
                Your Privacy, Protected by Default
              </h3>
            </div>
          </div>
          <button
            onClick={handleRejectNonEssential}
            aria-label="Close and reject non-essential cookies"
            title="Reject Non-Essential Cookies"
            className="w-7 h-7 rounded-full border border-black bg-white flex items-center justify-center text-xs hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Short Explanation */}
        <p className="text-xs font-bold text-neutral-900 leading-relaxed">
          We strictly practice data minimization. We only collect essential session data required for your learning streak, coding roadmap progress, and audio feedback. Zero third-party ad tracking or data reselling. Learn more in our{' '}
          <button
            onClick={() => {
              playClickSound();
              onOpenCookiesPolicy();
            }}
            className="underline font-black text-black hover:text-[#ff5533] cursor-pointer"
          >
            Cookies Policy
          </button>{' '}
          and{' '}
          <button
            onClick={() => {
              playClickSound();
              onOpenPrivacyPolicy?.();
            }}
            className="underline font-black text-black hover:text-[#ff5533] cursor-pointer"
          >
            Privacy Policy
          </button>.
        </p>

        {/* Preferences Drawer */}
        {showPreferences && (
          <div className="border-2 border-black rounded-xl p-3 bg-[#faf7f2] space-y-2.5 text-xs font-bold text-black animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-300">
              <div>
                <div className="font-black text-black">Essential &amp; Security Cookies</div>
                <div className="text-[10px] font-semibold text-neutral-800">
                  Required for user authentication &amp; learning progress saving.
                </div>
              </div>
              <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase text-black shrink-0">
                Always On
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-300">
              <div>
                <label htmlFor="cookie-functional-toggle" className="font-black text-black cursor-pointer">
                  Sound &amp; Customization
                </label>
                <div className="text-[10px] font-semibold text-neutral-800">
                  Saves audio synthesizer states &amp; streak freeze badges.
                </div>
              </div>
              <input
                id="cookie-functional-toggle"
                type="checkbox"
                checked={functionalAllowed}
                onChange={(e) => setFunctionalAllowed(e.target.checked)}
                className="w-4 h-4 accent-[#ff5533] cursor-pointer shrink-0"
                aria-label="Allow sound & customization cookies"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="cookie-analytics-toggle" className="font-black text-black cursor-pointer">
                  Anonymous Sandbox Telemetry
                </label>
                <div className="text-[10px] font-semibold text-neutral-800">
                  Anonymous streaming latency benchmark logs.
                </div>
              </div>
              <input
                id="cookie-analytics-toggle"
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="w-4 h-4 accent-[#ff5533] cursor-pointer shrink-0"
                aria-label="Allow anonymous sandbox telemetry cookies"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAcceptAll}
            aria-label="Accept all cookies and save preferences"
            className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 px-3 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
            <span>Accept All</span>
          </button>
          <button
            type="button"
            onClick={handleRejectNonEssential}
            aria-label="Reject non-essential cookies and only collect necessary data"
            className="flex-1 bg-[#faf7f2] hover:bg-neutral-100 text-black py-2 px-3 rounded-xl border-2 border-black text-xs font-black uppercase flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <span>Only Necessary</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowPreferences(!showPreferences);
            }}
            aria-expanded={showPreferences}
            aria-label={showPreferences ? 'Hide granular cookie preferences' : 'Customize cookie preferences'}
            className="w-full sm:w-auto bg-white hover:bg-neutral-50 text-neutral-900 py-2 px-3 rounded-xl border-2 border-black text-[11px] font-black uppercase flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-black" aria-hidden="true" />
            <span>{showPreferences ? 'Hide Options' : 'Preferences'}</span>
          </button>

          {showPreferences && (
            <button
              type="button"
              onClick={handleSavePreferences}
              aria-label="Save customized cookie preferences"
              className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-2 px-3 rounded-xl brutal-btn text-xs font-black uppercase flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer mt-1"
            >
              <span>Save Cookie Preferences</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
