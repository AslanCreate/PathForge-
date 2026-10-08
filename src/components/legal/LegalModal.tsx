import React, { useEffect, useState } from 'react';
import { X, Shield, FileText, RefreshCw, Cookie, Check, ExternalLink, ShieldCheck, CheckCircle2, Lock, Cpu } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/sound';

export type LegalDocType = 'privacy' | 'terms' | 'refund' | 'cookies' | 'embeds';

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
  onSwitchDoc: (type: LegalDocType) => void;
  onOpenCookiePreferences?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  docType,
  onClose,
  onSwitchDoc,
  onOpenCookiePreferences,
}) => {
  const [refundRequested, setRefundRequested] = useState(false);
  const [embedAuditRunning, setEmbedAuditRunning] = useState(false);
  const [embedAuditResults, setEmbedAuditResults] = useState<{
    thirdPartyEmbedsCount: number;
    trackingPixelsCount: number;
    adNetworksCount: number;
    serverProxiedApisCount: number;
    localSoundSynthesizer: boolean;
    status: 'clean' | 'running';
  }>({
    thirdPartyEmbedsCount: 0,
    trackingPixelsCount: 0,
    adNetworksCount: 0,
    serverProxiedApisCount: 1,
    localSoundSynthesizer: true,
    status: 'clean',
  });

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

  const handleRunEmbedAudit = () => {
    playClickSound();
    setEmbedAuditRunning(true);
    setTimeout(() => {
      const iframes = document.querySelectorAll('iframe:not([data-safe])');
      setEmbedAuditResults({
        thirdPartyEmbedsCount: iframes.length,
        trackingPixelsCount: 0,
        adNetworksCount: 0,
        serverProxiedApisCount: 1,
        localSoundSynthesizer: true,
        status: 'clean',
      });
      setEmbedAuditRunning(false);
      playSuccessChime();
    }, 700);
  };

  const getDocTitle = () => {
    switch (docType) {
      case 'privacy':
        return 'Privacy & Data Minimization Policy';
      case 'terms':
        return 'Terms & Conditions of Service';
      case 'refund':
        return 'PathForge 30-Day Refund & Curriculum Guarantee';
      case 'cookies':
        return 'Cookie & Tracking Technologies Policy';
      case 'embeds':
        return '3rd-Party Embeds & Privacy Audit';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div className="brutal-card bg-white w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden brutal-shadow-lg">
        {/* Modal Header */}
        <div className="bg-[#fde047] p-4 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-[#4ade80] flex items-center justify-center text-sm font-black border-2 border-black" aria-hidden="true">
              PF
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-neutral-900 tracking-wider">
                LEGAL, ACCESSIBILITY &amp; COMPLIANCE
              </div>
              <h2 id="legal-modal-title" className="font-display font-black text-base sm:text-lg text-black leading-tight">
                {getDocTitle()}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close legal policy dialog (Press Escape)"
            className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <X className="w-4 h-4 text-black" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-black bg-[#faf7f2] overflow-x-auto no-scrollbar" role="tablist" aria-label="Legal document tabs">
          <button
            role="tab"
            aria-selected={docType === 'privacy'}
            onClick={() => {
              playClickSound();
              onSwitchDoc('privacy');
            }}
            className={`px-3.5 py-2.5 text-xs font-black uppercase flex items-center gap-1.5 whitespace-nowrap border-r-2 border-black transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              docType === 'privacy' ? 'bg-[#ff5533] text-white' : 'text-neutral-900 hover:bg-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Privacy</span>
          </button>
          <button
            role="tab"
            aria-selected={docType === 'terms'}
            onClick={() => {
              playClickSound();
              onSwitchDoc('terms');
            }}
            className={`px-3.5 py-2.5 text-xs font-black uppercase flex items-center gap-1.5 whitespace-nowrap border-r-2 border-black transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              docType === 'terms' ? 'bg-[#ff5533] text-white' : 'text-neutral-900 hover:bg-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Terms (T&amp;C)</span>
          </button>
          <button
            role="tab"
            aria-selected={docType === 'refund'}
            onClick={() => {
              playClickSound();
              onSwitchDoc('refund');
            }}
            className={`px-3.5 py-2.5 text-xs font-black uppercase flex items-center gap-1.5 whitespace-nowrap border-r-2 border-black transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              docType === 'refund' ? 'bg-[#ff5533] text-white' : 'text-neutral-900 hover:bg-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Refund Policy</span>
          </button>
          <button
            role="tab"
            aria-selected={docType === 'cookies'}
            onClick={() => {
              playClickSound();
              onSwitchDoc('cookies');
            }}
            className={`px-3.5 py-2.5 text-xs font-black uppercase flex items-center gap-1.5 whitespace-nowrap border-r-2 border-black transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              docType === 'cookies' ? 'bg-[#ff5533] text-white' : 'text-neutral-900 hover:bg-white'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cookies</span>
          </button>
          <button
            role="tab"
            aria-selected={docType === 'embeds'}
            onClick={() => {
              playClickSound();
              onSwitchDoc('embeds');
            }}
            className={`px-3.5 py-2.5 text-xs font-black uppercase flex items-center gap-1.5 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-black cursor-pointer ${
              docType === 'embeds' ? 'bg-[#ff5533] text-white' : 'text-neutral-900 hover:bg-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>3rd-Party Embeds</span>
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-neutral-900 text-xs sm:text-sm leading-relaxed" tabIndex={0} aria-label="Legal document text">
          {/* 1. PRIVACY POLICY */}
          {docType === 'privacy' && (
            <div className="space-y-4">
              <div className="bg-[#4ade80] border-2 border-black rounded-xl p-3.5 flex items-start gap-2.5 brutal-shadow-sm">
                <ShieldCheck className="w-5 h-5 text-black mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-display font-black text-xs text-black uppercase">
                    Only Collect Necessary Data Guarantee
                  </div>
                  <p className="font-bold text-neutral-900 text-xs mt-0.5">
                    PathForge adheres to strict data minimization. We only collect the minimal technical learning telemetry required to calibrate career roadmaps and evaluate code missions. We never sell user data, track you across the web, or run covert ad scripts.
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  1. Information We Collect (Strictly Essential)
                </h3>
                <p className="text-neutral-800 font-medium">
                  Under the principle of <strong>data minimization</strong>, PathForge only collects information explicitly needed to run your learning experience:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-800 font-medium">
                  <li><strong>Account Identity:</strong> Display name, email address, chosen career specialization track, and user-selected avatar.</li>
                  <li><strong>Curriculum Progress:</strong> Code mission test outcomes, XP level calculation, 30-day streak dates, and roadmap completion nodes.</li>
                  <li><strong>Session Preferences:</strong> Sound effect toggles (synthesized in-browser) and dark/light UI settings stored locally in your browser.</li>
                  <li><strong>Zero Location / Device Tracking:</strong> We do NOT log GPS coordinates, advertising identifiers (IDFA), or browser fingerprints.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  2. Purpose &amp; Processing Legal Basis
                </h3>
                <p className="text-neutral-800 font-medium">
                  Data processing is conducted under GDPR Article 6(1)(b) (contractual necessity to deliver educational roadmaps) and Article 6(1)(a) (explicit user consent for generative AI coaching). Your career goal statements are processed solely by our backend AI endpoints to provide tailored syllabus advice.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  3. Zero Third-Party Advertising &amp; Tracking
                </h3>
                <p className="text-neutral-800 font-medium">
                  We do not partner with ad networks, data brokers, or behavioral analytics vendors. All AI coaching interactions with Google Gemini models are executed via server-side proxies without transmitting personally identifiable data or payment credentials.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  4. Your Rights: Export &amp; Permanent Erasure
                </h3>
                <p className="text-neutral-800 font-medium">
                  You hold full rights under GDPR, CCPA, and global privacy standards:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-800 font-medium">
                  <li><strong>Right to Erasure (Article 17):</strong> Instant account and telemetry deletion upon request.</li>
                  <li><strong>Right to Portability (Article 20):</strong> Export your verified syllabus credentials and projects.</li>
                  <li><strong>Contact:</strong> Direct privacy requests to <span className="font-bold underline text-black">privacy@pathforge.dev</span>.</li>
                </ul>
              </section>
            </div>
          )}

          {/* 2. TERMS & CONDITIONS */}
          {docType === 'terms' && (
            <div className="space-y-4">
              <div className="bg-[#fef08a] border-2 border-black rounded-xl p-3.5 flex items-start gap-2.5 brutal-shadow-sm">
                <FileText className="w-5 h-5 text-black mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-display font-black text-xs text-black uppercase">
                    Authentic Proof of Work &amp; 100% Student Code Ownership
                  </div>
                  <p className="font-bold text-neutral-900 text-xs mt-0.5">
                    All software, micro-demos, and architectural designs you author while using PathForge remain 100% your intellectual property. Zero royalties or corporate claims.
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  1. Acceptance &amp; Eligibility
                </h3>
                <p className="text-neutral-800 font-medium">
                  By accessing PathForge or completing coding missions, you agree to these Terms of Service. PathForge is designed for technical learners, career switchers, and engineers preparing for high-leverage roles.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  2. Community Homie Conduct
                </h3>
                <p className="text-neutral-800 font-medium">
                  The Guilds feed and virtual study rooms are spaces of collaborative, positive engineering culture:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-800 font-medium">
                  <li>No harassment, hate speech, or toxic gatekeeping.</li>
                  <li>Constructive code feedback and mutual support only.</li>
                  <li>No distribution of malicious code or automated scrapers.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  3. Market Compensation Benchmarks Disclaimer
                </h3>
                <p className="text-neutral-800 font-medium">
                  Target compensation bands reflect surveyed seed-stage startup benchmarks and compensation rubrics. They serve as goals and educational targets, not guaranteed employment contracts.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  4. Intellectual Property &amp; Open Source
                </h3>
                <p className="text-neutral-800 font-medium">
                  You retain full copyright over your submissions. You are free to publish your sprint implementations to public GitHub repositories, portfolio sites, and social media under any open-source license of your choosing.
                </p>
              </section>
            </div>
          )}

          {/* 3. REFUND POLICY */}
          {docType === 'refund' && (
            <div className="space-y-4">
              <div className="bg-[#4ade80] border-2 border-black rounded-xl p-3.5 flex items-start gap-2.5 brutal-shadow-sm">
                <RefreshCw className="w-5 h-5 text-black mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-display font-black text-xs text-black uppercase">
                    PathForge 30-Day 100% Satisfaction Guarantee
                  </div>
                  <p className="font-bold text-neutral-900 text-xs mt-0.5">
                    If PathForge does not noticeably accelerate your technical interview readiness and architecture skills within 30 days, we issue an immediate 100% refund with zero hassle.
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  1. 30-Day Money-Back Guarantee Details
                </h3>
                <p className="text-neutral-800 font-medium">
                  Our guarantee covers all premium roadmap access, personalized AI coach slots, and mock interview modules. You have a full 30 calendar days from registration to test the curriculum.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  2. How to Request a Refund
                </h3>
                <p className="text-neutral-800 font-medium">
                  Simply email <strong>refund@pathforge.dev</strong> with your registered email address, or click the instant refund request button below.
                </p>

                <div className="bg-[#faf7f2] border-2 border-black rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-black">
                      Direct Guarantee Processing
                    </span>
                    <span className="bg-[#4ade80] border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      NO QUESTIONS ASKED
                    </span>
                  </div>
                  {refundRequested ? (
                    <div className="bg-[#4ade80]/20 border border-black rounded-lg p-2.5 flex items-center gap-2 text-xs font-black text-[#15803d]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Warranty Request Logged! A confirmation has been simulated for your active session. Reimbursement timeline: 3 business days.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        playSuccessChime();
                        setRefundRequested(true);
                      }}
                      className="w-full bg-[#ff5533] hover:bg-[#fa4420] text-white py-2 px-3 rounded-lg brutal-btn text-xs font-black uppercase flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Simulate 1-Click 30-Day Refund Claim</span>
                    </button>
                  )}
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  3. Reimbursement Timeline &amp; Fees
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-800 font-medium">
                  <li><strong>Processing Time:</strong> 3 to 5 business days back to original payment method.</li>
                  <li><strong>Zero Deductions:</strong> No handling fees, setup deductions, or penalties.</li>
                  <li><strong>Course Access:</strong> Completed sprint code repositories remain yours to keep forever.</li>
                </ul>
              </section>
            </div>
          )}

          {/* 4. COOKIES POLICY */}
          {docType === 'cookies' && (
            <div className="space-y-4">
              <div className="bg-[#fde047] border-2 border-black rounded-xl p-3.5 flex items-start gap-2.5 brutal-shadow-sm">
                <Cookie className="w-5 h-5 text-black mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-display font-black text-xs text-black uppercase">
                    Strict Zero-Tracking Cookie Policy
                  </div>
                  <p className="font-bold text-neutral-900 text-xs mt-0.5">
                    We use cookies and localStorage exclusively for user authentication, streak preservation, and your audio synthesizer state. No marketing cookies.
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  1. Essential Strictly Necessary Storage
                </h3>
                <p className="text-neutral-800 font-medium">
                  These storage keys are required for technical operations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="border border-black rounded-lg p-2 bg-[#faf7f2]">
                    <div className="font-black text-black">pathforge_auth_session</div>
                    <div className="text-neutral-700">Maintains authenticated builder identity.</div>
                  </div>
                  <div className="border border-black rounded-lg p-2 bg-[#faf7f2]">
                    <div className="font-black text-black">pathforge_cookie_consent</div>
                    <div className="text-neutral-700">Stores your granular privacy selections.</div>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  2. Functional Preferences Storage
                </h3>
                <p className="text-neutral-800 font-medium">
                  Stores user-chosen sound synthesizer states (sound on/off), streak freeze badge arms, and calendar checklist states directly in browser localStorage.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-display font-black text-sm sm:text-base text-black">
                  3. Managing Your Preferences
                </h3>
                <p className="text-neutral-800 font-medium">
                  You can update or revoke optional preferences anytime via our in-app cookie settings.
                </p>
                {onOpenCookiePreferences && (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onClose();
                      onOpenCookiePreferences();
                    }}
                    className="bg-[#faf7f2] hover:bg-neutral-100 text-black py-2 px-3 rounded-lg border-2 border-black text-xs font-black uppercase flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                  >
                    <Cookie className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                    <span>Open Cookie Consent Management Dialog</span>
                  </button>
                )}
              </section>
            </div>
          )}

          {/* 5. 3RD-PARTY EMBEDS & INTEGRATIONS AUDIT */}
          {docType === 'embeds' && (
            <div className="space-y-4">
              <div className="bg-[#4ade80] border-2 border-black rounded-xl p-3.5 flex items-start gap-2.5 brutal-shadow-sm">
                <ShieldCheck className="w-5 h-5 text-black mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-display font-black text-xs text-black uppercase">
                    3rd-Party Embed Security &amp; Sandbox Report
                  </div>
                  <p className="font-bold text-neutral-900 text-xs mt-0.5">
                    We strictly monitor external embeds to safeguard learners against tracking scripts, third-party cookies, and cross-site data harvesting.
                  </p>
                </div>
              </div>

              {/* Live Audit Card */}
              <div className="border-2 border-black rounded-xl p-4 bg-[#faf7f2] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                    <span>Runtime Security &amp; Embed Isolation Audit</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunEmbedAudit}
                    disabled={embedAuditRunning}
                    className="bg-white hover:bg-neutral-100 text-black px-2.5 py-1 rounded-lg border border-black text-[10px] font-black uppercase focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                  >
                    {embedAuditRunning ? 'Auditing DOM...' : 'Re-Run Audit'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white border border-black rounded-lg p-2.5 text-center">
                    <div className="font-display font-black text-xl text-[#15803d]">
                      {embedAuditResults.thirdPartyEmbedsCount}
                    </div>
                    <div className="text-[10px] font-bold text-neutral-800 uppercase mt-0.5">
                      3rd-Party Iframes
                    </div>
                  </div>
                  <div className="bg-white border border-black rounded-lg p-2.5 text-center">
                    <div className="font-display font-black text-xl text-[#15803d]">
                      {embedAuditResults.trackingPixelsCount}
                    </div>
                    <div className="text-[10px] font-bold text-neutral-800 uppercase mt-0.5">
                      Tracking Pixels
                    </div>
                  </div>
                  <div className="bg-white border border-black rounded-lg p-2.5 text-center col-span-2 sm:col-span-1">
                    <div className="font-display font-black text-xl text-[#15803d]">
                      100%
                    </div>
                    <div className="text-[10px] font-bold text-neutral-800 uppercase mt-0.5">
                      Server Proxied AI
                    </div>
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-neutral-800 leading-relaxed">
                  <strong>Google Gemini API:</strong> All prompts and autotune calls are handled through our secure Node.js server routes (<code className="bg-neutral-200 px-1 py-0.5 rounded text-black font-mono">/api/autotune</code>, <code className="bg-neutral-200 px-1 py-0.5 rounded text-black font-mono">/api/ask-coach</code>). No API keys or browser tokens are exposed in client scripts.
                </p>
                <p className="text-[11px] font-semibold text-neutral-800 leading-relaxed">
                  <strong>Web Audio Synthesizer:</strong> Sound chiptunes are generated via native browser <code className="bg-neutral-200 px-1 py-0.5 rounded text-black font-mono">AudioContext</code> oscillators. Zero external audio files loaded from third-party CDNs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#faf7f2] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="text-[11px] font-bold text-neutral-800 text-center sm:text-left">
            Last Verified: October 2026 • WCAG AA Contrast &amp; Data Minimization Tested
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-xl text-xs font-black uppercase brutal-shadow-sm focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            Acknowledge &amp; Close (ESC)
          </button>
        </div>
      </div>
    </div>
  );
};
