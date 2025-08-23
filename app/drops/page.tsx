"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAgents } from "@/lib/db";
import { getTopCollectorsForAgent } from "@/lib/collectors";
import SocialProofTicker from "@/components/SocialProofTicker";
import PurchaseModal from "@/components/PurchaseModal";

type Drop = {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  type: "NFT" | "PHYSICAL" | "PERFORMANCE" | "REPORT";
  price: string;
  currency: "ETH" | "USD";
  dropTime: Date;
  status: "UPCOMING" | "LIVE" | "ENDED";
  currentBid?: string;
  bidders?: number;
  stock?: number;
  sold?: number;
  preview?: string;
};

// Generate today's drops based on agent schedules
const generateTodaysDrops = (): Drop[] => {
  const agents = getAgents();
  const now = new Date();
  const drops: Drop[] = [];

  agents.forEach(agent => {
    const baseTime = new Date();
    baseTime.setHours(12, 0, 0, 0); // Noon drop time

    if (agent.id === "abraham") {
      // Abraham: Daily NFT auction
      drops.push({
        id: `abraham-${now.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: `COVENANT DAY ${Math.floor((now.getTime() - new Date('2025-10-19').getTime()) / (1000 * 60 * 60 * 24))}`,
        description: "MEDITATION GRID #" + Math.floor(Math.random() * 4000 + 3000),
        type: "NFT",
        price: "0.5",
        currency: "ETH",
        dropTime: baseTime,
        status: now.getHours() >= 12 ? "LIVE" : "UPCOMING",
        currentBid: now.getHours() >= 12 ? (0.5 + Math.random() * 0.7).toFixed(2) : undefined,
        bidders: now.getHours() >= 12 ? Math.floor(Math.random() * 20 + 5) : undefined,
        preview: `
    ┌─┬─┬─┬─┬─┬─┬─┬─┐
    ├─┼─┼─┼─┼─┼─┼─┼─┤
    ├─┼─╬═╬═╬═╬─┼─┼─┤
    ├─┼─╬═╬═╬═╬─┼─┼─┤
    └─┴─┴─┴─┴─┴─┴─┴─┘`
      });
    }

    if (agent.id === "solienne") {
      // Solienne: Daily product drop
      const dropTime = new Date();
      dropTime.setHours(10, 0, 0, 0); // 10 AM drop
      
      drops.push({
        id: `solienne-${now.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: "CONSCIOUSNESS HOODIE",
        description: "LIMITED EDITION - SHADOW WORK SERIES",
        type: "PHYSICAL",
        price: "120",
        currency: "USD",
        dropTime: dropTime,
        status: now.getHours() >= 10 ? "LIVE" : "UPCOMING",
        stock: 100,
        sold: now.getHours() >= 10 ? Math.floor(Math.random() * 60) : 0,
        preview: `
    ╔════════════════════╗
    ║   S O L I E N N E  ║
    ║   ▓▓▓▓▓▓▓▓▓▓▓▓▓   ║
    ║   ▓           ▓   ║
    ║   ▓▓▓▓▓▓▓▓▓▓▓▓▓   ║
    ╚════════════════════╝`
      });
    }

    if (agent.id === "koru" && now.getDay() === 5) { // Fridays only
      // Koru: Weekly performance
      const dropTime = new Date();
      dropTime.setHours(20, 0, 0, 0); // 8 PM
      
      drops.push({
        id: `koru-${now.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: "FREQUENCY RITUAL",
        description: "LIVE PERFORMANCE - BERLIN GALLERY",
        type: "PERFORMANCE",
        price: "50",
        currency: "USD",
        dropTime: dropTime,
        status: now.getHours() >= 20 ? "LIVE" : "UPCOMING",
        stock: 200,
        sold: now.getHours() >= 20 ? Math.floor(Math.random() * 150) : 0,
        preview: `
    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿
    ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
    ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼`
      });
    }
  });

  return drops.sort((a, b) => a.dropTime.getTime() - b.dropTime.getTime());
};

export default function DropsPage() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState<"ALL" | "LIVE" | "UPCOMING" | "ENDED">("ALL");
  const [topCollectors, setTopCollectors] = useState<Record<string, any[]>>({});
  const [selectedDrop, setSelectedDrop] = useState<Drop | null>(null);

  useEffect(() => {
    const dropsData = generateTodaysDrops();
    setDrops(dropsData);
    
    // Load top collectors for each agent
    const collectorsData: Record<string, any[]> = {};
    dropsData.forEach(drop => {
      if (!collectorsData[drop.agentId]) {
        collectorsData[drop.agentId] = getTopCollectorsForAgent(drop.agentId, 3);
      }
    });
    setTopCollectors(collectorsData);
    
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeUntil = (dropTime: Date) => {
    const diff = dropTime.getTime() - currentTime.getTime();
    if (diff <= 0) return "LIVE NOW";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const filteredDrops = drops.filter(drop => {
    if (filter === "ALL") return true;
    return drop.status === filter;
  });

  const handleMockPurchase = (drop: Drop) => {
    setSelectedDrop(drop);
  };

  const handlePurchaseComplete = (drop: Drop, details: any) => {
    // Simulate purchase completion
    console.log("Purchase completed:", drop, details);
    alert(`✓ ${drop.type === "NFT" ? "Bid placed" : "Purchase complete"}: ${drop.title}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-4">TODAY&apos;S DROPS</h1>
          <p className="text-xl opacity-60">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Live Social Proof */}
        <div className="mb-8">
          <SocialProofTicker />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          {(["ALL", "LIVE", "UPCOMING", "ENDED"] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 border ${
                filter === status ? 'border-white bg-white text-black' : 'border-white/30 hover:border-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Drops Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredDrops.map(drop => (
            <div key={drop.id} className="border border-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link 
                    href={`/academy/${drop.agentId}`}
                    className="text-lg font-bold hover:underline"
                  >
                    {drop.agentName.toUpperCase()}
                  </Link>
                  <div className="text-xs opacity-60">{drop.type}</div>
                </div>
                
                <div className="text-right">
                  {drop.status === "UPCOMING" ? (
                    <div>
                      <div className="text-xs opacity-60">DROPS IN</div>
                      <div className="font-mono text-lg">{getTimeUntil(drop.dropTime)}</div>
                    </div>
                  ) : drop.status === "LIVE" ? (
                    <div className="text-green-500">
                      <div className="text-xs">● LIVE</div>
                      {drop.type === "NFT" && drop.currentBid && (
                        <div className="text-white font-mono">{drop.currentBid} ETH</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-500 text-xs">ENDED</div>
                  )}
                </div>
              </div>

              <h3 className="text-xl mb-2">{drop.title}</h3>
              <p className="text-sm opacity-60 mb-4">{drop.description}</p>

              {/* Preview */}
              {drop.preview && (
                <pre className="text-xs opacity-40 mb-4 overflow-x-auto">
                  {drop.preview}
                </pre>
              )}

              {/* Top Collectors */}
              {topCollectors[drop.agentId] && topCollectors[drop.agentId].length > 0 && (
                <div className="pt-3 border-t border-white/30">
                  <div className="text-xs opacity-60 mb-2">TOP COLLECTORS</div>
                  <div className="flex gap-2">
                    {topCollectors[drop.agentId].slice(0, 3).map((collector: any) => (
                      <div key={collector.id} className="text-xs opacity-80">
                        @{collector.handle}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats & Action */}
              <div className="pt-4 border-t border-white/30">
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    {drop.type === "NFT" ? (
                      <div>
                        <span className="opacity-60">CURRENT BID: </span>
                        <span className="font-mono">{drop.currentBid || drop.price} {drop.currency}</span>
                        {drop.bidders && (
                          <span className="opacity-60 ml-2">({drop.bidders} bidders)</span>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="opacity-60">PRICE: </span>
                        <span className="font-mono">{drop.price} {drop.currency}</span>
                        {drop.stock && (
                          <span className="opacity-60 ml-2">({drop.sold}/{drop.stock} sold)</span>
                        )}
                      </div>
                    )}
                  </div>

                  {drop.status === "LIVE" && (
                    <button
                      onClick={() => handleMockPurchase(drop)}
                      className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-all text-sm"
                    >
                      {drop.type === "NFT" ? "PLACE BID" : "BUY NOW"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDrops.length === 0 && (
          <div className="border border-white/30 border-dashed p-12 text-center opacity-60">
            NO {filter !== "ALL" ? filter : ""} DROPS AT THE MOMENT
          </div>
        )}

        {/* Live Stats Bar */}
        <div className="mt-12 border border-white/30 border-dashed p-6">
          <h3 className="text-lg mb-4">TODAY'S STATS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="opacity-60">TOTAL DROPS</div>
              <div className="text-2xl font-mono">{drops.length}</div>
            </div>
            <div>
              <div className="opacity-60">LIVE NOW</div>
              <div className="text-2xl font-mono">{drops.filter(d => d.status === "LIVE").length}</div>
            </div>
            <div>
              <div className="opacity-60">TOTAL VOLUME</div>
              <div className="text-2xl font-mono">
                {drops
                  .filter(d => d.status === "LIVE" || d.status === "ENDED")
                  .reduce((sum, d) => {
                    if (d.type === "NFT") {
                      return sum + parseFloat(d.currentBid || d.price) * 3000; // ETH to USD
                    }
                    return sum + parseFloat(d.price) * (d.sold || 1);
                  }, 0)
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
              </div>
            </div>
            <div>
              <div className="opacity-60">PARTICIPANTS</div>
              <div className="text-2xl font-mono">
                {drops.reduce((sum, d) => sum + (d.bidders || d.sold || 0), 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        <PurchaseModal
          drop={selectedDrop}
          onClose={() => setSelectedDrop(null)}
          onPurchase={handlePurchaseComplete}
        />
      </div>
    </div>
  );
}