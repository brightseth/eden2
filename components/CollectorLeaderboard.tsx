"use client";

import { useState, useEffect } from "react";
import { generateCollectors, type Collector } from "@/lib/collectors";

export default function CollectorLeaderboard() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [timeFrame, setTimeFrame] = useState<"ALL" | "MONTH" | "WEEK">("ALL");

  useEffect(() => {
    setCollectors(generateCollectors());
  }, []);

  const formatValue = (value: number, isCurrency: boolean = false) => {
    if (isCurrency) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const getBadgeColor = (tier: string) => {
    switch(tier) {
      case "PLATINUM": return "text-purple-400";
      case "GOLD": return "text-yellow-400";
      case "SILVER": return "text-gray-300";
      case "BRONZE": return "text-orange-400";
      default: return "text-white";
    }
  };

  return (
    <div className="border border-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">TOP COLLECTORS</h2>
        <div className="flex gap-2">
          {(["ALL", "MONTH", "WEEK"] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-3 py-1 text-xs border ${
                timeFrame === tf 
                  ? "border-white bg-white text-black" 
                  : "border-white/30 hover:border-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {collectors.slice(0, 10).map((collector, index) => (
          <div key={collector.id} className="border border-white/30 p-4 hover:border-white transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-mono opacity-60">
                  #{index + 1}
                </div>
                <div>
                  <div className="text-lg font-bold">@{collector.handle}</div>
                  <div className="text-xs opacity-60">
                    Joined {new Date(collector.joined).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-mono">{formatValue(collector.totalSpent, true)}</div>
                <div className="text-xs opacity-60">{collector.totalCollected} pieces</div>
              </div>
            </div>

            {/* Badges */}
            {collector.badges.length > 0 && (
              <div className="flex gap-2 mb-2">
                {collector.badges.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`text-xs px-2 py-1 border ${getBadgeColor(badge.tier)} border-current`}
                    title={badge.description}
                  >
                    {badge.name}
                  </div>
                ))}
              </div>
            )}

            {/* Recent Activity */}
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="text-xs opacity-60 mb-2">RECENT ACTIVITY</div>
              <div className="space-y-1">
                {collector.recentActivity.slice(0, 2).map(activity => (
                  <div key={activity.id} className="text-xs opacity-80">
                    <span className="font-bold">{activity.type}</span>
                    {" "}
                    <span>{activity.itemTitle}</span>
                    {" for "}
                    <span className="font-mono">
                      {activity.amount} {activity.currency}
                    </span>
                    {" from "}
                    <span className="font-bold">{activity.agentName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm opacity-60 hover:opacity-100">
          VIEW ALL COLLECTORS →
        </button>
      </div>
    </div>
  );
}