import React, { useState } from 'react';
import { TabType, CareerOption, Mission, RoadmapModule, StudentProfile, Trophy } from './types';
import {
  INITIAL_PROFILE,
  INITIAL_CAREERS,
  INITIAL_MISSIONS,
  INITIAL_ROADMAP_MODULES,
  INITIAL_TROPHIES,
} from './data/mockData';
import { HeaderTicker } from './components/HeaderTicker';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { RoadmapScreen } from './components/screens/RoadmapScreen';
import { StatsScreen } from './components/screens/StatsScreen';
import { AIGangScreen } from './components/screens/AIGangScreen';
import { GuildsScreen } from './components/screens/GuildsScreen';
import { SprintRunnerModal } from './components/modals/SprintRunnerModal';
import { AutoRerouteModal } from './components/modals/AutoRerouteModal';
import { AskCoachModal } from './components/modals/AskCoachModal';
import { CareerDetailModal } from './components/modals/CareerDetailModal';
import { AuthModal } from './components/AuthModal';
import { LegalModal, LegalDocType } from './components/legal/LegalModal';
import { CookieConsentBanner } from './components/legal/CookieConsentBanner';
import { Footer } from './components/Footer';
import { SparkleStarDoodle } from './components/doodles/DoodleSvgs';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('discover');
  const [careers, setCareers] = useState<CareerOption[]>(INITIAL_CAREERS);
  const [currentCareer, setCurrentCareer] = useState<CareerOption>(INITIAL_CAREERS[0]);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [modules, setModules] = useState<RoadmapModule[]>(INITIAL_ROADMAP_MODULES);
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [trophies, setTrophies] = useState<Trophy[]>(INITIAL_TROPHIES);
  const [soundState, setSoundState] = useState<boolean>(true);

  // Modals state
  const [sprintMission, setSprintMission] = useState<Mission | null>(null);
  const [showAutoReroute, setShowAutoReroute] = useState(false);
  const [showAskCoach, setShowAskCoach] = useState(false);
  const [peekCareer, setPeekCareer] = useState<CareerOption | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const [forceOpenCookiePreferences, setForceOpenCookiePreferences] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLoginSuccess = (user: { name: string; role: string; level: number }) => {
    setProfile((prev) => ({
      ...prev,
      name: user.name,
      level: user.level,
      badge: `LVL 0${user.level}`,
      subTitle: `PATHFINDER • ${user.role.toUpperCase()}`,
    }));
    showToast(`⚡ Logged in as ${user.name} (${user.role})!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Award XP and check level-up
  const handleAwardXp = (amount: number, reason?: string) => {
    setProfile((prev) => {
      const newXp = prev.currentXp + amount;
      let newLevel = prev.level;
      let nextXp = prev.nextLevelXp;
      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        nextXp = Math.round(prev.nextLevelXp * 1.3);
        showToast(`🎉 LEVEL UP! You reached LVL ${newLevel}! (+${amount} XP)`);
      } else if (reason) {
        showToast(`+${amount} XP: ${reason}`);
      }
      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        nextLevelXp: nextXp,
      };
    });
  };

  // Complete a sprint mission
  const handleCompleteSprint = (missionId: string, xpEarned: number) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            status: 'done',
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        // Unlock mission 3 if mission 2 is finished
        if (missionId === 'mission-2' && m.id === 'mission-3') {
          return {
            ...m,
            status: 'active',
            badgeLabel: 'UNLOCKED OBJECTIVE',
          };
        }
        return m;
      })
    );

    // Update profile metrics
    setProfile((prev) => ({
      ...prev,
      nodesSmashed: Math.min(prev.totalNodes, prev.nodesSmashed + 1),
      readiness: {
        ...prev.readiness,
        llmStack: Math.min(100, prev.readiness.llmStack + 4),
        fullStack: Math.min(100, prev.readiness.fullStack + 5),
      },
    }));
    handleAwardXp(xpEarned, 'Mission Smashed');
  };

  // Auto Re-route success
  const handleAutoRerouteSuccess = (monthsSkipped: number, xpBonus: number) => {
    setShowAutoReroute(false);
    // Advance roadmap module 2 from Node C to Node D
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === 'mod-2') {
          return {
            ...mod,
            statusLabel: '65% ACTIVE PROGRESS',
            currentFocus: {
              id: 'node-d',
              code: 'Node D',
              title: 'RAG with Hybrid Vector Search',
              status: 'active',
              stepProgress: 'STEP 1 / 4',
              canReroute: false,
            },
          };
        }
        return mod;
      })
    );
    handleAwardXp(xpBonus, 'Diagnostic Fast-Track');
    showToast(`⚡ FAST-TRACK ACTIVATED! Skipped ${monthsSkipped} months to Node D (+${xpBonus} XP)!`);
  };

  // Claim Trophy
  const handleClaimTrophy = (trophyId: string) => {
    const trophy = trophies.find((t) => t.id === trophyId);
    if (!trophy || trophy.status === 'claimed') return;
    setTrophies((prev) =>
      prev.map((t) => (t.id === trophyId ? { ...t, status: 'claimed' } : t))
    );
    handleAwardXp(trophy.claimRewardXp, `Trophy Claimed: ${trophy.title}`);
  };

  // Select Target Career
  const handleSelectCareer = (career: CareerOption) => {
    setCurrentCareer(career);
    setProfile((prev) => ({
      ...prev,
      subTitle: `PATHFINDER • ${career.title.toUpperCase()}`,
      targetMatch: career.compatibility,
    }));
    showToast(`🎯 Target Career updated to ${career.title}!`);
  };

  // Bookmark toggle
  const handleBookmarkToggle = (careerId: string) => {
    setCareers((prev) =>
      prev.map((c) => {
        if (c.id === careerId) {
          const next = !c.bookmarked;
          showToast(next ? `🔖 Bookmarked ${c.title}!` : `Removed bookmark for ${c.title}`);
          return { ...c, bookmarked: next };
        }
        return c;
      })
    );
  };

  // Unclaimed trophies count
  const unclaimedTrophiesCount = trophies.filter((t) => t.status === 'unlocked').length;

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-neutral-900 flex flex-col font-sans selection:bg-[#fde047] selection:text-black relative overflow-x-hidden">
      {/* Subtle Ambient Background Doodles */}
      <div className="fixed top-24 -left-6 pointer-events-none opacity-20 z-0 hidden lg:block animate-doodle-float" aria-hidden="true">
        <SparkleStarDoodle className="w-16 h-16" color="#fde047" />
      </div>
      <div className="fixed top-1/2 -right-6 pointer-events-none opacity-20 z-0 hidden lg:block animate-doodle-float-alt" aria-hidden="true">
        <SparkleStarDoodle className="w-20 h-20" color="#ff5533" />
      </div>
      <div className="fixed bottom-32 -left-4 pointer-events-none opacity-20 z-0 hidden xl:block animate-doodle-wiggle text-4xl select-none" aria-hidden="true">
        {'{ }'}
      </div>

      {/* Accessibility Skip-To-Main Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-[#4ade80] focus:font-black focus:border-2 focus:border-white focus:rounded-xl focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Unified Sticky Header: Ticker + Top Website Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#faf7f2] select-none" role="banner">
        <HeaderTicker />
        <TopNav
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
          level={profile.level}
          userName={profile.name}
          onProfileClick={() => setCurrentTab('stats')}
          onOpenAuth={() => setShowAuthModal(true)}
          soundState={soundState}
          setSoundState={setSoundState}
          unclaimedTrophiesCount={unclaimedTrophiesCount}
        />
      </header>

      {/* Interactive Toast Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-28 right-4 sm:right-8 z-50 max-w-sm pointer-events-none animate-in slide-in-from-top duration-200"
        >
          <div className="bg-[#fde047] text-black border-2 border-black p-3.5 rounded-2xl brutal-shadow font-display font-black text-xs sm:text-sm text-center">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main Screen View */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {currentTab === 'discover' && (
          <DiscoverScreen
            careers={careers}
            onSelectCareer={handleSelectCareer}
            onPeekCareer={(career) => setPeekCareer(career)}
            onBookmarkToggle={handleBookmarkToggle}
            onNavigateToRoadmap={() => setCurrentTab('roadmap')}
            onOpenLegalDoc={(type) => setLegalDoc(type)}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapScreen
            currentCareer={currentCareer}
            missions={missions}
            modules={modules}
            onStartSprint={(mission) => setSprintMission(mission)}
            onOpenAutoReroute={() => setShowAutoReroute(true)}
            onOpenMentorTip={() => setShowAskCoach(true)}
            onOpenGuilds={() => setCurrentTab('guilds')}
            onPaceChange={(pace) => showToast(`Sprint pace calibrated to ${pace.toUpperCase()} load!`)}
          />
        )}

        {currentTab === 'stats' && (
          <StatsScreen
            profile={profile}
            trophies={trophies}
            onClaimTrophy={handleClaimTrophy}
            onOpenAskCoach={() => setShowAskCoach(true)}
            onResumePriorityMission={() => {
              const activeMission = missions.find((m) => m.status === 'active') || missions[0];
              setSprintMission(activeMission);
            }}
            onStreakClick={() => showToast(`🔥 ${profile.streakDays}-Day Streak: 1.5x Multiplier Active!`)}
            onOpenAuth={() => setShowAuthModal(true)}
          />
        )}

        {currentTab === 'aigang' && (
          <AIGangScreen
            onOpenAskCoach={() => setShowAskCoach(true)}
            onAwardXp={(xp) => handleAwardXp(xp, 'AI Gang Benchmark')}
          />
        )}

        {currentTab === 'guilds' && (
          <GuildsScreen
            onAwardXp={(xp) => handleAwardXp(xp, 'Guild Peer Hype')}
            onShowNotice={(msg) => showToast(msg)}
          />
        )}

        {/* Full Desktop Website Footer */}
        <Footer
          onOpenLegal={(type) => setLegalDoc(type)}
          onOpenCookiePreferences={() => setForceOpenCookiePreferences(true)}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      </main>

      {/* Mobile Bottom Navigation (Only visible on mobile screens < 768px) */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        unclaimedTrophiesCount={unclaimedTrophiesCount}
      />

      {/* Modals */}
      {sprintMission && (
        <SprintRunnerModal
          mission={sprintMission}
          onClose={() => setSprintMission(null)}
          onCompleteSprint={handleCompleteSprint}
        />
      )}

      {showAutoReroute && (
        <AutoRerouteModal
          onClose={() => setShowAutoReroute(false)}
          onSuccess={handleAutoRerouteSuccess}
        />
      )}

      {showAskCoach && (
        <AskCoachModal
          userLevel={profile.level}
          onClose={() => setShowAskCoach(false)}
          onAwardXp={(xp) => handleAwardXp(xp, 'Coach Insight Bonus')}
        />
      )}

      {peekCareer && (
        <CareerDetailModal
          career={peekCareer}
          onClose={() => setPeekCareer(null)}
          onSelectAsTarget={(career) => {
            handleSelectCareer(career);
            setCurrentTab('roadmap');
          }}
        />
      )}

      {/* Login & Dev Identity Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenLegalDoc={(type) => setLegalDoc(type)}
        currentUser={{ name: profile.name, level: profile.level }}
      />

      {/* Legal & Compliance Modal (Privacy, Terms, Refund, Cookies, 3rd-Party Embeds) */}
      <LegalModal
        isOpen={legalDoc !== null}
        docType={legalDoc || 'privacy'}
        onClose={() => setLegalDoc(null)}
        onSwitchDoc={(type) => setLegalDoc(type)}
        onOpenCookiePreferences={() => {
          setLegalDoc(null);
          setForceOpenCookiePreferences(true);
        }}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenCookiesPolicy={() => setLegalDoc('cookies')}
        onOpenPrivacyPolicy={() => setLegalDoc('privacy')}
        forceOpen={forceOpenCookiePreferences}
        onCloseForceOpen={() => setForceOpenCookiePreferences(false)}
      />
    </div>
  );
}
