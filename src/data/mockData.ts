import { CareerOption, Mission, RoadmapModule, StudentProfile, Trophy, GuildMember } from '../types';

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Alex Vance',
  level: 8,
  badge: 'LVL 08',
  subTitle: 'PATHFINDER • AI FORGE',
  currentXp: 1720,
  nextLevelXp: 2000,
  nodesSmashed: 19,
  totalNodes: 32,
  targetMatch: 87,
  matchTier: 'SUPER',
  projectsShipped: 4,
  totalProjects: 8,
  targetPayout: '₹18.5L',
  targetPayoutUsd: '$165k/yr',
  streakDays: 11,
  streakMultiplier: '1.5X XP MULTI',
  readiness: {
    llmStack: 82,
    fullStack: 75,
    portfolio: 65,
    interview: 58,
  },
};

export const INITIAL_CAREERS: CareerOption[] = [
  {
    id: 'ai-product-eng',
    title: 'AI Product Engineer',
    subtitle: 'Translates high-level LLM models into slick web apps',
    compatibility: 94,
    isTopMatch: true,
    expectedPayout: '₹18L - ₹28L / yr',
    usdEquivalent: '$145k-$185k',
    demandTag: 'HIGH DEMAND',
    demandColor: '#fde047',
    tags: ['Next.js 15', 'LangChain', 'FastAPI', 'Vector DBs'],
    icon: 'brain',
    iconBg: '#fecdd3',
    summary: 'Master full-stack AI orchestration, dynamic streaming interfaces, token optimization, and real-time LLM caching for seed-stage to Series B hyper-growth tech teams.',
    dailyRituals: [
      'Architect resilient streaming server-sent events with zero UI dropouts',
      'Optimize prompt evals with synthetic test harnesses and cost limits',
      'Deploy low-latency semantic search with hybrid embeddings (Dense + BM25)',
      'Design delightful micro-interactions for progressive assistant completions'
    ],
    seedStartupsHiring: ['Cognition AI (Devin)', 'Perplexity', 'Cursor', 'Vercel AI Team']
  },
  {
    id: 'fullstack-agent-dev',
    title: 'Full Stack AI Agent Dev',
    subtitle: 'Autonomous bots & multi-agent loops',
    compatibility: 91,
    expectedPayout: '₹16L - ₹24L / yr',
    usdEquivalent: '$130k-$170k',
    demandTag: 'SURGING',
    demandColor: '#fed7aa',
    tags: ['AutoGPT', 'Python', 'Postgres'],
    icon: 'bot',
    iconBg: '#fef08a',
    summary: 'Design cyclical agent loops with tool-calling capabilities, self-correcting validation pipelines, and persistent memory stores.',
    dailyRituals: [
      'Construct agentic state machines with LangGraph or Temporal',
      'Benchmark function-calling error rates and fallback mechanisms',
      'Tune PostgreSQL pgvector indexing for sub-50ms conversational retrieval'
    ],
    seedStartupsHiring: ['AutoGPT Core', 'CrewAI', 'LlamaIndex', 'Harvey']
  },
  {
    id: 'creative-ui-technologist',
    title: 'Creative UI Technologist',
    subtitle: '3D micro-interactions, Shaders, WebGL',
    compatibility: 87,
    expectedPayout: '₹15L - ₹22L / yr',
    usdEquivalent: '$120k-$160k',
    demandTag: 'VIRAL',
    demandColor: '#bbf7d0',
    tags: ['Three.js', 'GLSL', 'Tailwind'],
    icon: 'sparkles',
    iconBg: '#bbf7d0',
    summary: 'Fuse buttery smooth 60fps animations with interactive 3D WebGL worlds to deliver viral landing experiences that convert like crazy.',
    dailyRituals: [
      'Write custom fragment shaders for kinetic text distortions',
      'Implement physics-driven spring animations with Motion',
      'Profile GPU memory and draw calls for smooth mobile performance'
    ],
    seedStartupsHiring: ['Linear', 'Basement.studio', 'Vercel Creative Labs', 'Raycast']
  },
  {
    id: 'mlops-infra-eng',
    title: 'MLOps Infrastructure Eng',
    subtitle: 'Deploying gigawatt GPU clusters',
    compatibility: 84,
    expectedPayout: '₹18L - ₹30L / yr',
    usdEquivalent: '$150k-$200k',
    demandTag: 'HARD TECH',
    demandColor: '#fed7aa',
    tags: ['Kubernetes', 'Triton', 'Docker'],
    icon: 'cog',
    iconBg: '#fecdd3',
    summary: 'Scale inference fleets, optimize vLLM tensor-parallelism, and orchestrate bare-metal GPU clusters for real-time model execution.',
    dailyRituals: [
      'Tune vLLM PagedAttention KV-cache utilization',
      'Automate Kubernetes auto-scaling policies on H100 GPU nodes',
      'Monitor token latency percentiles (P95/P99) under load'
    ],
    seedStartupsHiring: ['Together AI', 'Anyscale', 'Baseten', 'Modal Labs']
  },
  {
    id: 'climate-tech-systems-dev',
    title: 'Climate Tech Systems Dev',
    subtitle: 'Carbon modeling & solar grid telemetry',
    compatibility: 81,
    expectedPayout: '₹14L - ₹20L / yr',
    usdEquivalent: '$110k-$150k',
    demandTag: 'IMPACT',
    demandColor: '#bbf7d0',
    tags: ['Rust', 'IoT APIs', 'Go'],
    icon: 'leaf',
    iconBg: '#bbf7d0',
    summary: 'Build high-throughput telemetry pipelines that ingest sensor streams from smart solar inverters and battery storage nodes.',
    dailyRituals: [
      'Ingest 50,000 req/sec solar sensor packets in Rust with zero memory leak',
      'Calculate instantaneous grid carbon intensity metrics',
      'Wire WebSockets for real-time megawatt load shedding'
    ],
    seedStartupsHiring: ['Watershed', 'Enpal', 'Pivotal Earth', 'GridX']
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission-1',
    title: 'Setup Claude / OpenAI streaming pipeline',
    description: 'Establish bidirectional Server-Sent Events with resilient chunk parser.',
    timeEstimate: '30 mins',
    xp: 60,
    status: 'done',
    completedAt: '10:42 AM',
  },
  {
    id: 'mission-2',
    title: 'Implement Token Latency Fallback & Error UI',
    description: 'Handle timeouts & mock chunk parsing errors gracefully without UI freezes.',
    timeEstimate: '~35 MIN ESTIMATE',
    xp: 70,
    status: 'active',
    badgeLabel: 'CURRENT OBJECTIVE',
    codeChallenge: {
      instruction: 'Implement an AbortController with a 12-second timeout and an optimistic retry buffer that prevents frozen typing cursors.',
      starterCode: `// Mission 2: Token Fallback Handler\nexport function createResilientStream(endpoint: string) {\n  const controller = new AbortController();\n  const timeoutId = setTimeout(() => controller.abort(), 12000);\n  return fetch(endpoint, { signal: controller.signal })\n    .catch((err) => {\n      // TODO: Handle abort & emit fallback homie error\n      return { ok: false, fallbackMsg: "Token stalled! Homie fallback active." };\n    });\n}`,
      solutionSnippet: `// Solution verified!\n// 1. Abort signal configured\n// 2. Fallback UI payload dispatched\n// 3. 0ms blocking frame time achieved`,
      testCaseName: 'Stress test: 15s simulated network jitter with chunk dropouts'
    }
  },
  {
    id: 'mission-3',
    title: 'Ship 1-Tweet Micro-Demo of your app',
    description: 'Record a crisp 40s screen recording showing instant streaming and post on X.',
    timeEstimate: '20 mins',
    xp: 50,
    status: 'locked',
    badgeLabel: 'Unlocks after Mission 2'
  }
];

export const INITIAL_ROADMAP_MODULES: RoadmapModule[] = [
  {
    id: 'mod-1',
    moduleCode: 'M1',
    title: 'Prompt-to-Code & Core Evals',
    status: 'completed',
    statusLabel: '100% COMPLETE • MASTERY UNLOCKED',
    tags: ['Prompt Engineering', 'Tokenomics & Cost', 'Function Calling'],
  },
  {
    id: 'mod-2',
    moduleCode: 'M2',
    title: 'Agentic Workflows & UI Architecture',
    status: 'active',
    statusLabel: '45% ACTIVE PROGRESS',
    currentFocus: {
      id: 'node-c',
      code: 'Node C',
      title: 'Streaming UI, Vercel AI SDK & Reactive State',
      status: 'active',
      stepProgress: 'STEP 3 / 6',
      canReroute: true,
    },
    nodes: [
      {
        id: 'node-d',
        code: 'Node D',
        title: 'RAG with Hybrid Vector Search',
        status: 'next',
      },
      {
        id: 'node-e',
        code: 'Node E',
        title: 'LangGraph & Memory State Machines',
        status: 'locked',
      }
    ]
  },
  {
    id: 'mod-3',
    moduleCode: 'M3',
    title: 'Deployment, Eval & Job Ready',
    status: 'locked',
    statusLabel: 'LOCKED QUEST',
    bossQuest: {
      title: 'Mock Technical Interview & Offer Negotiation',
      xp: 500,
      description: 'Face the AI Founder Bot for a live 20-minute architectural system design sprint.'
    }
  }
];

export const INITIAL_TROPHIES: Trophy[] = [
  {
    id: 'trophy-1',
    title: 'First Deploy',
    description: 'Shipped production app with zero downtime',
    icon: 'rocket',
    bgColor: '#4ade80',
    status: 'claimed',
    claimRewardXp: 100
  },
  {
    id: 'trophy-2',
    title: 'Streak Fiend',
    description: 'Maintained 10+ daily missions in a row',
    icon: 'flame',
    bgColor: '#fecdd3',
    status: 'claimed',
    claimRewardXp: 150
  },
  {
    id: 'trophy-3',
    title: 'Agent Smith',
    description: 'Built multi-agent autonomous prompt workflow',
    icon: 'robot',
    bgColor: '#ffffff',
    status: 'claimed',
    claimRewardXp: 200
  },
  {
    id: 'trophy-4',
    title: 'Salary Hunter',
    description: 'Unlock 3 verified enterprise interview invites',
    icon: 'lock',
    bgColor: '#e2e8f0',
    status: 'locked',
    claimRewardXp: 300
  }
];

export const GUILD_MEMBERS: GuildMember[] = [
  {
    id: 'gm-1',
    name: 'Tanmay Sharma',
    handle: '@tanmaycodes',
    role: 'AI Product Eng',
    avatar: '👨‍💻',
    avatarBg: '#bbf7d0',
    status: 'online',
    recentAchievement: 'Just passed Node B: SSE Streaming!',
    streak: 14
  },
  {
    id: 'gm-2',
    name: 'Sneha Rao',
    handle: '@sneha_ui',
    role: 'Creative UI Dev',
    avatar: '👩‍💻',
    avatarBg: '#fed7aa',
    status: 'online',
    recentAchievement: 'Shipped GLSL Shader Micro-Demo',
    streak: 19
  },
  {
    id: 'gm-3',
    name: 'Arjun Verma',
    handle: '@arjun_rust',
    role: 'Systems & Cloud',
    avatar: '⚡',
    avatarBg: '#fef08a',
    status: 'coding',
    recentAchievement: 'Wrote zero-alloc telemetry server',
    streak: 8
  },
  {
    id: 'gm-4',
    name: 'Riya Gupta',
    handle: '@riyagpt',
    role: 'Full Stack Agent Dev',
    avatar: '🤖',
    avatarBg: '#e9d5ff',
    status: 'in-review',
    recentAchievement: 'Completed Qdrant Vector Pipeline',
    streak: 22
  }
];
