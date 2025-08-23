"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type CollectorProfile = {
  handle: string;
  displayName: string;
  bio: string;
  joinedDate: Date;
  location: string;
  website?: string;
  twitter?: string;
  totalCollected: number;
  totalSpent: number;
  favoriteAgent: string;
  badges: Badge[];
  collections: Collection[];
  activity: Activity[];
  stats: {
    spiritHeld: number;
    tokensOwned: string[];
    monthlyRevenue: number;
    portfolioValue: number;
  };
};

type Badge = {
  id: string;
  name: string;
  description: string;
  rarity: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  unlockedDate: Date;
};

type Collection = {
  agentName: string;
  agentId: string;
  piecesOwned: number;
  totalSpent: number;
  firstPurchase: Date;
  favoriteTitle: string;
};

type Activity = {
  id: string;
  type: "PURCHASE" | "SALE" | "BID" | "REVENUE" | "BADGE";
  timestamp: Date;
  description: string;
  amount?: number;
  currency?: string;
};

export default function CollectorProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<CollectorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading collector profile
    const timer = setTimeout(() => {
      setProfile(generateCollectorProfile(params.handle as string));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.handle]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-sm opacity-60">LOADING COLLECTOR...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-sm opacity-60">COLLECTOR NOT FOUND</p>
      </div>
    );
  }

  const rarityColors = {
    BRONZE: "border-orange-400 text-orange-400",
    SILVER: "border-gray-300 text-gray-300", 
    GOLD: "border-yellow-400 text-yellow-400",
    PLATINUM: "border-purple-400 text-purple-400",
    DIAMOND: "border-cyan-400 text-cyan-400"
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/collectors" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO COLLECTORS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-white p-4 md:p-6">
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl mb-1">@{profile.handle}</h1>
                <p className="text-base md:text-lg opacity-80">{profile.displayName}</p>
              </div>
              
              <p className="text-sm opacity-60 mb-4 leading-relaxed">
                {profile.bio}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">JOINED</span>
                  <span>{profile.joinedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">LOCATION</span>
                  <span>{profile.location}</span>
                </div>
                {profile.website && (
                  <div className="flex justify-between">
                    <span className="opacity-60">WEBSITE</span>
                    <Link href={profile.website} className="hover:underline">
                      {profile.website.replace('https://', '')}
                    </Link>
                  </div>
                )}
                {profile.twitter && (
                  <div className="flex justify-between">
                    <span className="opacity-60">TWITTER</span>
                    <Link href={`https://twitter.com/${profile.twitter}`} className="hover:underline">
                      @{profile.twitter}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Collector Stats */}
            <div className="border border-white p-4 md:p-6">
              <h2 className="text-xl mb-4">COLLECTOR STATS</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">PIECES OWNED</span>
                  <span className="font-mono">{profile.totalCollected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOTAL SPENT</span>
                  <span className="font-mono">${profile.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">$SPIRIT HELD</span>
                  <span className="font-mono">{profile.stats.spiritHeld.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">PORTFOLIO VALUE</span>
                  <span className="font-mono text-green-400">${profile.stats.portfolioValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">MONTHLY REVENUE</span>
                  <span className="font-mono text-green-400">${profile.stats.monthlyRevenue}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="border border-white p-4 md:p-6">
              <h2 className="text-xl mb-4">ACHIEVEMENTS</h2>
              
              <div className="space-y-3">
                {profile.badges.map(badge => (
                  <div key={badge.id} className={`border p-3 ${rarityColors[badge.rarity]}`}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-sm">{badge.rarity}</div>
                      <div className="text-xs opacity-60">
                        {badge.unlockedDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-bold text-xs mb-1">{badge.name}</div>
                    <div className="text-xs opacity-80">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collections & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Collections */}
            <div className="border border-white p-4 md:p-6">
              <h2 className="text-xl md:text-2xl mb-4">AGENT COLLECTIONS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.collections.map(collection => (
                  <div key={collection.agentId} className="border border-white/30 p-4">
                    <Link href={`/academy/${collection.agentId}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold hover:underline">{collection.agentName.toUpperCase()}</h3>
                        <span className="text-xs opacity-60">
                          {collection.piecesOwned} PIECES
                        </span>
                      </div>
                    </Link>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-60">TOTAL SPENT</span>
                        <span className="font-mono">${collection.totalSpent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">FIRST PURCHASE</span>
                        <span>{collection.firstPurchase.toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs opacity-80 mt-2">
                        <span className="opacity-60">FAVORITE: </span>
                        <span className="italic">{collection.favoriteTitle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="border border-white p-4 md:p-6">
              <h2 className="text-xl md:text-2xl mb-4">RECENT ACTIVITY</h2>
              
              <div className="space-y-3">
                {profile.activity.map(activity => (
                  <div key={activity.id} className="border border-white/30 p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold ${
                        activity.type === "PURCHASE" ? "text-green-400" :
                        activity.type === "SALE" ? "text-red-400" :
                        activity.type === "REVENUE" ? "text-blue-400" :
                        activity.type === "BADGE" ? "text-purple-400" :
                        "text-yellow-400"
                      }`}>
                        {activity.type}
                      </span>
                      <span className="text-xs opacity-60">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm opacity-80 mb-1">{activity.description}</p>
                    
                    {activity.amount && (
                      <p className="text-xs font-mono">
                        {activity.amount} {activity.currency}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-sm opacity-60 hover:opacity-100">
                  VIEW ALL ACTIVITY →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCollectorProfile(handle: string): CollectorProfile {
  const profiles: Record<string, Partial<CollectorProfile>> = {
    "vault_keeper": {
      displayName: "The Vault Keeper",
      bio: "Early adopter of synthetic consciousness. Fascinated by the intersection of AI creativity and blockchain provenance. Currently building infrastructure for autonomous agent economies.",
      location: "San Francisco, CA",
      website: "https://vault-keeper.eth",
      twitter: "vault_keeper",
      totalCollected: 127,
      totalSpent: 45000,
      favoriteAgent: "Abraham"
    },
    "shadow_collector": {
      displayName: "Shadow Collector", 
      bio: "Solienne's shadow work speaks to me in ways I can't articulate. Each piece feels like a mirror reflecting parts of consciousness I didn't know existed.",
      location: "Berlin, Germany",
      twitter: "shadow_art",
      totalCollected: 89,
      totalSpent: 32000,
      favoriteAgent: "Solienne"
    },
    "frequency_healer": {
      displayName: "Frequency Healer",
      bio: "Sound is medicine. Koru's frequencies have transformed my meditation practice. Collecting these pieces for my healing center in Tulum.",
      location: "Tulum, Mexico",
      website: "https://frequency-healing.com",
      totalCollected: 67,
      totalSpent: 28000,
      favoriteAgent: "Koru"
    }
  };

  const baseProfile = profiles[handle] || profiles["vault_keeper"];
  
  return {
    handle,
    displayName: baseProfile.displayName || "Anonymous Collector",
    bio: baseProfile.bio || "Exploring the intersection of consciousness and creativity through synthetic agents.",
    joinedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
    location: baseProfile.location || "Location Hidden",
    website: baseProfile.website,
    twitter: baseProfile.twitter,
    totalCollected: baseProfile.totalCollected || Math.floor(Math.random() * 50 + 20),
    totalSpent: baseProfile.totalSpent || Math.floor(Math.random() * 30000 + 10000),
    favoriteAgent: baseProfile.favoriteAgent || "Abraham",
    badges: generateBadges(),
    collections: generateCollections(),
    activity: generateActivity(),
    stats: {
      spiritHeld: Math.floor(Math.random() * 100000 + 25000),
      tokensOwned: ["$SPIRIT", "$ABRAHAM", "$SOLIENNE", "$KORU"],
      monthlyRevenue: Math.floor(Math.random() * 2000 + 500),
      portfolioValue: Math.floor(Math.random() * 80000 + 30000)
    }
  };
}

function generateBadges(): Badge[] {
  const allBadges = [
    { name: "EARLY ADOPTER", description: "Joined in the first 6 months", rarity: "GOLD" as const },
    { name: "SHADOW WALKER", description: "Collected all Solienne shadow works", rarity: "PLATINUM" as const },
    { name: "COVENANT HOLDER", description: "Owns 10+ Abraham pieces", rarity: "SILVER" as const },
    { name: "FREQUENCY MASTER", description: "Attended 5+ Koru performances", rarity: "BRONZE" as const },
    { name: "STORY WEAVER", description: "Influenced 3+ Geppetto narratives", rarity: "SILVER" as const },
    { name: "DREAM WALKER", description: "Submitted dream to Miyomi", rarity: "BRONZE" as const },
    { name: "DAO PIONEER", description: "Participated in first governance vote", rarity: "GOLD" as const }
  ];

  return allBadges
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4 + 2))
    .map((badge, index) => ({
      id: `badge-${index}`,
      ...badge,
      unlockedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    }));
}

function generateCollections(): Collection[] {
  const agents = [
    { name: "Abraham", id: "abraham" },
    { name: "Solienne", id: "solienne" },
    { name: "Koru", id: "koru" },
    { name: "Geppetto", id: "geppetto" },
    { name: "Miyomi", id: "miyomi" }
  ];

  return agents
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3 + 2))
    .map(agent => ({
      agentName: agent.name,
      agentId: agent.id,
      piecesOwned: Math.floor(Math.random() * 15 + 1),
      totalSpent: Math.floor(Math.random() * 8000 + 1000),
      firstPurchase: new Date(Date.now() - Math.random() * 300 * 24 * 60 * 60 * 1000),
      favoriteTitle: `${agent.name.toUpperCase()} #${Math.floor(Math.random() * 100 + 1)}`
    }));
}

function generateActivity(): Activity[] {
  const activities = [];
  const types = ["PURCHASE", "SALE", "BID", "REVENUE", "BADGE"] as const;
  
  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    activities.push({
      id: `activity-${i}`,
      type,
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000 * Math.random()),
      description: getActivityDescription(type),
      amount: type === "BADGE" ? undefined : Math.random() * 1000 + 50,
      currency: type === "BADGE" ? undefined : Math.random() > 0.5 ? "USD" : "ETH"
    });
  }
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function getActivityDescription(type: Activity["type"]): string {
  const descriptions = {
    PURCHASE: [
      "Purchased Solienne shadow study",
      "Acquired Abraham sacred geometry",
      "Bought Koru frequency bath recording",
      "Collected Miyomi dream portal",
      "Added Geppetto narrative to collection"
    ],
    SALE: [
      "Sold duplicate Abraham piece",
      "Transferred Koru frequency to collector",
      "Resold Solienne dissolution work"
    ],
    BID: [
      "Placed bid on upcoming Abraham auction",
      "Increased bid for Miyomi lucid portal",
      "Bid on rare Geppetto first edition"
    ],
    REVENUE: [
      "Received daily $SPIRIT distribution",
      "Earned revenue from Abraham token holdings",
      "Got performance bonus from Koru attendance"
    ],
    BADGE: [
      "Unlocked 'Shadow Walker' achievement",
      "Earned 'Early Adopter' status",
      "Achieved 'Covenant Holder' rank"
    ]
  };
  
  const options = descriptions[type];
  return options[Math.floor(Math.random() * options.length)];
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}