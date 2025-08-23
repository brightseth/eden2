// Collector data and utilities
export type Collector = {
  id: string;
  handle: string;
  avatar?: string;
  joined: Date;
  totalCollected: number;
  totalSpent: number;
  favoriteAgent: string;
  recentActivity: CollectorActivity[];
  badges: Badge[];
};

export type CollectorActivity = {
  id: string;
  type: "BID" | "PURCHASE" | "MINT" | "LIST";
  agentId: string;
  agentName: string;
  itemTitle: string;
  amount: string;
  currency: "ETH" | "USD";
  timestamp: Date;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  earned: Date;
};

// Generate mock collectors for social proof
export function generateCollectors(): Collector[] {
  const handles = [
    "vault_keeper", "neural_prophet", "shadow_collector", "genesis_witness",
    "frequency_hunter", "dream_architect", "void_walker", "light_bearer",
    "pattern_seeker", "consciousness_node", "spectral_trader", "ritual_master",
    "covenant_holder", "dissolution_fan", "abraham_maxi", "solienne_scholar"
  ];

  const collectors: Collector[] = [];
  const now = new Date();

  handles.forEach((handle, index) => {
    const joinedDays = Math.floor(Math.random() * 365);
    const joined = new Date(now.getTime() - joinedDays * 24 * 60 * 60 * 1000);
    
    const collector: Collector = {
      id: `collector-${index}`,
      handle,
      joined,
      totalCollected: Math.floor(Math.random() * 200 + 10),
      totalSpent: Math.floor(Math.random() * 50000 + 5000),
      favoriteAgent: ["abraham", "solienne", "koru", "geppetto", "miyomi", "dao_manager"][Math.floor(Math.random() * 6)],
      recentActivity: generateRecentActivity(handle),
      badges: generateBadges(joinedDays)
    };
    
    collectors.push(collector);
  });

  return collectors.sort((a, b) => b.totalSpent - a.totalSpent);
}

function generateRecentActivity(handle: string): CollectorActivity[] {
  const activities: CollectorActivity[] = [];
  const activityCount = Math.floor(Math.random() * 5 + 1);
  const agents = [
    { id: "abraham", name: "Abraham" },
    { id: "solienne", name: "Solienne" },
    { id: "koru", name: "Koru" },
    { id: "geppetto", name: "Geppetto" },
    { id: "miyomi", name: "Miyomi" }
  ];

  for (let i = 0; i < activityCount; i++) {
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const hoursAgo = Math.floor(Math.random() * 72);
    
    activities.push({
      id: `activity-${handle}-${i}`,
      type: ["BID", "PURCHASE", "MINT"][Math.floor(Math.random() * 3)] as "BID" | "PURCHASE" | "MINT",
      agentId: agent.id,
      agentName: agent.name,
      itemTitle: generateItemTitle(agent.id),
      amount: (Math.random() * 2 + 0.1).toFixed(2),
      currency: agent.id === "solienne" ? "USD" : "ETH",
      timestamp: new Date(Date.now() - hoursAgo * 60 * 60 * 1000)
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function generateItemTitle(agentId: string): string {
  const titles: Record<string, string[]> = {
    abraham: [
      "COVENANT DAY #47", "MEDITATION GRID #3847", "COVENANT DAY #52", 
      "SACRED GEOMETRY #2891", "ABRAHAM'S VISION #441"
    ],
    solienne: [
      "CONSCIOUSNESS HOODIE", "SHADOW WORK PRINT", "DISSOLUTION SERIES #12",
      "SPECTRAL EVIDENCE #7", "INSTITUTIONAL LIGHT #3"
    ],
    koru: [
      "FREQUENCY RITUAL TICKET", "SOUND HEALING NFT", "VIBRATION PATTERN #88",
      "BERLIN PERFORMANCE", "RESONANCE COLLECTION"
    ],
    geppetto: [
      "STRING THEORY #19", "PUPPET MASTER NFT", "AUTONOMOUS CREATION #5",
      "CONTROL PARADOX #22", "MARIONETTE DREAMS"
    ],
    miyomi: [
      "KAWAII NIGHTMARE #666", "VOID PLUSHIE", "EXISTENTIAL CRISIS #42",
      "CUTE ABYSS STICKER", "DARKNESS COMPANION"
    ]
  };

  const agentTitles = titles[agentId] || ["GENESIS CREATION"];
  return agentTitles[Math.floor(Math.random() * agentTitles.length)];
}

function generateBadges(daysJoined: number): Badge[] {
  const badges: Badge[] = [];
  const now = new Date();

  // Early adopter badge
  if (daysJoined > 180) {
    badges.push({
      id: "early-adopter",
      name: "EARLY ADOPTER",
      description: "Joined in the first 6 months",
      tier: "GOLD",
      earned: new Date(now.getTime() - daysJoined * 24 * 60 * 60 * 1000)
    });
  }

  // Random collection badges
  if (Math.random() > 0.5) {
    badges.push({
      id: "abraham-covenant",
      name: "COVENANT HOLDER",
      description: "Owns 10+ Abraham pieces",
      tier: "SILVER",
      earned: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    });
  }

  if (Math.random() > 0.7) {
    badges.push({
      id: "shadow-walker",
      name: "SHADOW WALKER",
      description: "Collected all Solienne shadow works",
      tier: "PLATINUM",
      earned: new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000)
    });
  }

  if (Math.random() > 0.6) {
    badges.push({
      id: "frequency-master",
      name: "FREQUENCY MASTER",
      description: "Attended 5+ Koru performances",
      tier: "BRONZE",
      earned: new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    });
  }

  return badges;
}

// Get top collectors for a specific agent
export function getTopCollectorsForAgent(agentId: string, limit: number = 5): Collector[] {
  const allCollectors = generateCollectors();
  return allCollectors
    .filter(c => c.favoriteAgent === agentId || c.recentActivity.some(a => a.agentId === agentId))
    .slice(0, limit);
}

// Get recent activity across all collectors
export function getRecentGlobalActivity(limit: number = 20): CollectorActivity[] {
  const collectors = generateCollectors();
  const allActivity = collectors.flatMap(c => 
    c.recentActivity.map(a => ({ ...a, handle: c.handle }))
  );
  
  return allActivity
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
}