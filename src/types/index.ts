export type TabType = 'discover' | 'roadmap' | 'aigang' | 'guilds' | 'stats';

export interface CareerOption {
  id: string;
  title: string;
  subtitle: string;
  compatibility: number;
  isTopMatch?: boolean;
  expectedPayout: string;
  usdEquivalent: string;
  demandTag: string;
  demandColor: string;
  tags: string[];
  icon: string;
  iconBg: string;
  summary: string;
  dailyRituals: string[];
  seedStartupsHiring: string[];
  bookmarked?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  xp: number;
  status: 'done' | 'active' | 'locked';
  completedAt?: string;
  badgeLabel?: string;
  codeChallenge?: {
    instruction: string;
    starterCode: string;
    solutionSnippet: string;
    testCaseName: string;
  };
}

export interface RoadmapNode {
  id: string;
  code: string;
  title: string;
  status: 'completed' | 'active' | 'next' | 'locked';
  stepProgress?: string;
  canReroute?: boolean;
}

export interface RoadmapModule {
  id: string;
  moduleCode: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
  statusLabel: string;
  tags?: string[];
  currentFocus?: RoadmapNode;
  nodes?: RoadmapNode[];
  bossQuest?: {
    title: string;
    xp: number;
    description: string;
  };
}

export interface StudentProfile {
  name: string;
  level: number;
  badge: string;
  subTitle: string;
  currentXp: number;
  nextLevelXp: number;
  nodesSmashed: number;
  totalNodes: number;
  targetMatch: number;
  matchTier: string;
  projectsShipped: number;
  totalProjects: number;
  targetPayout: string;
  targetPayoutUsd: string;
  streakDays: number;
  streakMultiplier: string;
  readiness: {
    llmStack: number;
    fullStack: number;
    portfolio: number;
    interview: number;
  };
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  status: 'claimed' | 'unlocked' | 'locked';
  claimRewardXp: number;
}

export interface GuildMember {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  avatarBg: string;
  status: 'online' | 'coding' | 'in-review';
  recentAchievement: string;
  streak: number;
}
