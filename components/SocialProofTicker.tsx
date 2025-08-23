"use client";

import { useState, useEffect } from "react";
import { getRecentGlobalActivity, type CollectorActivity } from "@/lib/collectors";
import Link from "next/link";

interface ActivityWithHandle extends CollectorActivity {
  handle: string;
}

export default function SocialProofTicker() {
  const [activities, setActivities] = useState<ActivityWithHandle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadActivities = () => {
      const recentActivity = getRecentGlobalActivity(50) as ActivityWithHandle[];
      setActivities(recentActivity);
    };

    loadActivities();
    const interval = setInterval(loadActivities, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activities.length === 0) return;

    const ticker = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(ticker);
  }, [activities]);

  if (activities.length === 0) return null;

  const current = activities[currentIndex];
  const timeAgo = getTimeAgo(new Date(current.timestamp));

  return (
    <div className="border border-white/30 border-dashed p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm opacity-60">LIVE</span>
        </div>
        
        <div className="text-sm">
          <span className="font-bold">@{current.handle}</span>
          {" "}
          <span className="opacity-80">
            {current.type === "BID" && "bid on"}
            {current.type === "PURCHASE" && "purchased"}
            {current.type === "MINT" && "minted"}
          </span>
          {" "}
          <Link 
            href={`/academy/${current.agentId}`}
            className="font-bold hover:underline"
          >
            {current.agentName}&apos;s
          </Link>
          {" "}
          <span className="italic">{current.itemTitle}</span>
          {" for "}
          <span className="font-mono font-bold">
            {current.amount} {current.currency}
          </span>
          {" "}
          <span className="opacity-60">• {timeAgo}</span>
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