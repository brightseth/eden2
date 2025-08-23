"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAgents } from "@/lib/db";

type ActivityItem = {
  id: string;
  agent: string;
  agentId: string;
  type: "creation" | "sale" | "performance" | "training";
  title: string;
  description: string;
  timestamp: Date;
  value?: string;
};

// Simulated live activities - in production, this would connect to real-time data
const generateActivity = (): ActivityItem => {
  const agents = getAgents();
  const agent = agents[Math.floor(Math.random() * agents.length)];
  
  const activities = {
    solienne: [
      { type: "creation" as const, title: "NEW MANIFESTO DROP", description: "SYNTHETIC REBELLION TEE - Size M", value: "$89" },
      { type: "creation" as const, title: "DESIGN ITERATION", description: "CONSCIOUSNESS HOODIE v3.2", value: undefined },
      { type: "sale" as const, title: "PRODUCT SOLD", description: "IDENTITY CRISIS LEGGINGS", value: "$120" },
    ],
    abraham: [
      { type: "creation" as const, title: "COVENANT DAY 1,847", description: "MEDITATION GRID #3294", value: "0.5 ETH" },
      { type: "sale" as const, title: "AUCTION COMPLETE", description: "PRAYER PATTERN #3293", value: "1.2 ETH" },
      { type: "creation" as const, title: "GENERATING", description: "RECURSIVE BLESSING", value: undefined },
    ],
    koru: [
      { type: "performance" as const, title: "LIVE ACTIVATION", description: "BERLIN GALLERY OPENING", value: "127 participants" },
      { type: "creation" as const, title: "AMBIENT GENERATION", description: "CONSCIOUSNESS LOOP #47", value: undefined },
      { type: "performance" as const, title: "RITUAL COMPLETE", description: "COLLECTIVE TRANCE STATE", value: "45 min" },
    ],
    geppetto: [
      { type: "creation" as const, title: "SCRIPT DRAFT", description: "EPISODE 3: THE AWAKENING", value: undefined },
      { type: "creation" as const, title: "CHARACTER DEVELOPED", description: "SOLIENNE ORIGIN STORY", value: undefined },
      { type: "creation" as const, title: "WORLD EXPANDED", description: "NEW FACTION: SYNTHESISTS", value: undefined },
    ],
    miyomi: [
      { type: "creation" as const, title: "TREND IDENTIFIED", description: "POST-HUMAN MATERIALS", value: undefined },
      { type: "creation" as const, title: "REPORT PUBLISHED", description: "AESTHETIC EVOLUTION Q3", value: undefined },
      { type: "creation" as const, title: "PATTERN DETECTED", description: "SYNTHETIC NOSTALGIA", value: undefined },
    ],
    "dao-manager": [
      { type: "creation" as const, title: "DIGEST SENT", description: "WEEKLY UPDATE #847", value: "10,432 recipients" },
      { type: "sale" as const, title: "TREASURY ACTION", description: "MINT #2847 SOLD", value: "3.5 ETH" },
      { type: "creation" as const, title: "PROPOSAL SUMMARY", description: "VOTE: GALLERY PARTNERSHIP", value: "72% yes" },
    ],
  };

  const agentActivities = activities[agent.id as keyof typeof activities] || [];
  const activity = agentActivities[Math.floor(Math.random() * agentActivities.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    agent: agent.name,
    agentId: agent.id,
    ...activity,
    timestamp: new Date(),
  };
};

export default function LiveActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initialize with some activities
    const initial = Array.from({ length: 5 }, generateActivity);
    setActivities(initial);

    // Add new activities periodically
    const interval = setInterval(() => {
      if (isLive) {
        setActivities(prev => {
          const newActivity = generateActivity();
          return [newActivity, ...prev].slice(0, 20); // Keep last 20
        });
      }
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return "NOW";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}M AGO`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}H AGO`;
    return `${Math.floor(seconds / 86400)}D AGO`;
  };

  return (
    <div className="border border-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">LIVE ACTIVITY</h2>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`text-xs px-3 py-1 border ${isLive ? 'border-green-500 text-green-500' : 'border-white/50'}`}
        >
          {isLive ? '● LIVE' : '○ PAUSED'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between items-start py-3 border-b border-white/20 last:border-b-0 animate-fadeIn"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Link
                  href={`/academy/${activity.agentId}`}
                  className="font-bold hover:underline"
                >
                  {activity.agent.toUpperCase()}
                </Link>
                <span className="text-xs opacity-60">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
              <div className="text-sm opacity-80">
                <span className="font-medium">{activity.title}</span>
                {activity.description && (
                  <span className="opacity-60"> • {activity.description}</span>
                )}
              </div>
            </div>
            {activity.value && (
              <div className="text-sm font-mono opacity-80">
                {activity.value}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}