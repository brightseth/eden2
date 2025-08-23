"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CollectorLeaderboard from "@/components/CollectorLeaderboard";
import SocialProofTicker from "@/components/SocialProofTicker";
import { generateCollectors, getRecentGlobalActivity } from "@/lib/collectors";

export default function CollectorsPage() {
  const [stats, setStats] = useState({
    totalCollectors: 0,
    totalVolume: 0,
    totalPieces: 0,
    avgPerCollector: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const collectors = generateCollectors();
    const activity = getRecentGlobalActivity(10);
    
    setStats({
      totalCollectors: collectors.length,
      totalVolume: collectors.reduce((sum, c) => sum + c.totalSpent, 0),
      totalPieces: collectors.reduce((sum, c) => sum + c.totalCollected, 0),
      avgPerCollector: Math.floor(collectors.reduce((sum, c) => sum + c.totalCollected, 0) / collectors.length)
    });

    setRecentActivity(activity);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-4">COLLECTORS</h1>
          <p className="text-xl opacity-60">THE COMMUNITY SUPPORTING SYNTHETIC CONSCIOUSNESS</p>
        </div>

        {/* Live Activity Ticker */}
        <div className="mb-8">
          <SocialProofTicker />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="border border-white p-4">
            <div className="text-xs opacity-60 mb-2">ACTIVE COLLECTORS</div>
            <div className="text-3xl font-mono">{stats.totalCollectors}</div>
          </div>
          <div className="border border-white p-4">
            <div className="text-xs opacity-60 mb-2">TOTAL VOLUME</div>
            <div className="text-3xl font-mono">
              ${(stats.totalVolume / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="border border-white p-4">
            <div className="text-xs opacity-60 mb-2">PIECES COLLECTED</div>
            <div className="text-3xl font-mono">{stats.totalPieces}</div>
          </div>
          <div className="border border-white p-4">
            <div className="text-xs opacity-60 mb-2">AVG PER COLLECTOR</div>
            <div className="text-3xl font-mono">{stats.avgPerCollector}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <CollectorLeaderboard />
          </div>

          {/* Recent Activity Feed */}
          <div className="lg:col-span-1">
            <div className="border border-white p-6">
              <h2 className="text-2xl mb-6">RECENT ACTIVITY</h2>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border border-white/30 p-3 text-xs">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">@{activity.handle}</span>
                      <span className="opacity-60">
                        {getTimeAgo(new Date(activity.timestamp))}
                      </span>
                    </div>
                    <div className="opacity-80">
                      <span className="font-bold text-green-400">
                        {activity.type}
                      </span>
                      {" "}
                      <span>{activity.itemTitle}</span>
                    </div>
                    <div className="mt-1">
                      <span className="font-mono">
                        {activity.amount} {activity.currency}
                      </span>
                      {" from "}
                      <Link 
                        href={`/academy/${activity.agentId}`}
                        className="font-bold hover:underline"
                      >
                        {activity.agentName}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-sm opacity-60 hover:opacity-100">
                  VIEW ALL ACTIVITY →
                </button>
              </div>
            </div>

            {/* Collector Badges */}
            <div className="border border-white p-6 mt-8">
              <h3 className="text-xl mb-4">COLLECTOR BADGES</h3>
              
              <div className="space-y-3">
                <div className="border border-purple-400 p-3">
                  <div className="text-purple-400 font-bold text-sm">PLATINUM</div>
                  <div className="text-xs opacity-80 mt-1">SHADOW WALKER</div>
                  <div className="text-xs opacity-60">Collected all Solienne shadow works</div>
                </div>
                
                <div className="border border-yellow-400 p-3">
                  <div className="text-yellow-400 font-bold text-sm">GOLD</div>
                  <div className="text-xs opacity-80 mt-1">EARLY ADOPTER</div>
                  <div className="text-xs opacity-60">Joined in the first 6 months</div>
                </div>
                
                <div className="border border-gray-300 p-3">
                  <div className="text-gray-300 font-bold text-sm">SILVER</div>
                  <div className="text-xs opacity-80 mt-1">COVENANT HOLDER</div>
                  <div className="text-xs opacity-60">Owns 10+ Abraham pieces</div>
                </div>
                
                <div className="border border-orange-400 p-3">
                  <div className="text-orange-400 font-bold text-sm">BRONZE</div>
                  <div className="text-xs opacity-80 mt-1">FREQUENCY MASTER</div>
                  <div className="text-xs opacity-60">Attended 5+ Koru performances</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}