"use client";

import { useState } from "react";
import Link from "next/link";
import RevenueChart from "@/components/charts/RevenueChart";
import TokenPriceChart from "@/components/charts/TokenPriceChart";
import PortfolioAllocation from "@/components/charts/PortfolioAllocation";
import AgentComparison from "@/components/charts/AgentComparison";
import AgentNetwork from "@/components/charts/AgentNetwork";
import { getMarketMetrics } from "@/lib/analytics";

type AnalyticsView = 'overview' | 'agents' | 'tokens' | 'network';

export default function AnalyticsPage() {
  const [view, setView] = useState<AnalyticsView>('overview');
  const metrics = getMarketMetrics();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-4">ANALYTICS</h1>
          <p className="text-lg md:text-xl opacity-60">COMPREHENSIVE ECOSYSTEM INTELLIGENCE</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setView('overview')}
            className={`px-4 py-2 border ${view === 'overview' ? 'bg-white text-black border-white' : 'border-white/30'}`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setView('agents')}
            className={`px-4 py-2 border ${view === 'agents' ? 'bg-white text-black border-white' : 'border-white/30'}`}
          >
            AGENTS
          </button>
          <button
            onClick={() => setView('tokens')}
            className={`px-4 py-2 border ${view === 'tokens' ? 'bg-white text-black border-white' : 'border-white/30'}`}
          >
            TOKENS
          </button>
          <button
            onClick={() => setView('network')}
            className={`px-4 py-2 border ${view === 'network' ? 'bg-white text-black border-white' : 'border-white/30'}`}
          >
            NETWORK
          </button>
        </div>

        {/* Market Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="border border-white/30 p-4">
            <p className="text-xs opacity-60">TOTAL VALUE LOCKED</p>
            <p className="text-2xl font-mono">${(metrics.totalEcosystemValue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="border border-white/30 p-4">
            <p className="text-xs opacity-60">ACTIVE COLLECTORS</p>
            <p className="text-2xl font-mono">{metrics.totalActiveCollectors.toLocaleString()}</p>
          </div>
          <div className="border border-white/30 p-4">
            <p className="text-xs opacity-60">$SPIRIT PRICE</p>
            <p className="text-2xl font-mono">{(metrics.spiritTokenPrice * 3000).toFixed(4)}</p>
          </div>
          <div className="border border-white/30 p-4">
            <p className="text-xs opacity-60">24H VOLUME</p>
            <p className="text-2xl font-mono">${(metrics.totalTradingVolume / 1000000).toFixed(2)}M</p>
          </div>
        </div>

        {/* Overview View */}
        {view === 'overview' && (
          <div className="space-y-12">
            <RevenueChart />
            <div className="grid lg:grid-cols-2 gap-12">
              <TokenPriceChart tokenSymbol="$SPIRIT" tokenName="Spirit Portfolio Token" />
              <PortfolioAllocation />
            </div>
            <AgentComparison />
          </div>
        )}

        {/* Agents View */}
        {view === 'agents' && (
          <div className="space-y-12">
            <AgentComparison />
            <div className="grid lg:grid-cols-2 gap-12">
              <RevenueChart agentId="abraham" agentName="Abraham" />
              <RevenueChart agentId="solienne" agentName="Solienne" />
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <RevenueChart agentId="koru" agentName="Koru" />
              <RevenueChart agentId="geppetto" agentName="Geppetto" />
            </div>
          </div>
        )}

        {/* Tokens View */}
        {view === 'tokens' && (
          <div className="space-y-12">
            <TokenPriceChart tokenSymbol="$SPIRIT" tokenName="Spirit Portfolio Token" />
            <div className="grid lg:grid-cols-2 gap-12">
              <TokenPriceChart tokenSymbol="$ABRAHAM" tokenName="Abraham" />
              <TokenPriceChart tokenSymbol="$SOLIENNE" tokenName="Solienne" />
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <TokenPriceChart tokenSymbol="$KORU" tokenName="Koru" />
              <TokenPriceChart tokenSymbol="$MIYOMI" tokenName="Miyomi" />
            </div>
            <PortfolioAllocation />
          </div>
        )}

        {/* Network View */}
        {view === 'network' && (
          <div className="space-y-12">
            <AgentNetwork />
            <AgentComparison />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="border border-white p-6 md:p-8">
                <h3 className="text-2xl mb-6">OWNERSHIP DISTRIBUTION</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>$SPIRIT HOLDERS</span>
                    <span className="font-mono">25% OF EACH AGENT</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>TRAINERS</span>
                    <span className="font-mono">25% REVENUE SHARE</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>PUBLIC MARKET</span>
                    <span className="font-mono">75% OF AGENT TOKENS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TREASURY</span>
                    <span className="font-mono">0% (FULLY DISTRIBUTED)</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-white p-6 md:p-8">
                <h3 className="text-2xl mb-6">REVENUE FLOW</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-white/30">
                    <p className="text-sm mb-2">AGENT CREATES WORK</p>
                    <p className="text-xs opacity-60">100% revenue to agent token holders</p>
                  </div>
                  <div className="p-4 border border-white/30">
                    <p className="text-sm mb-2">TOKEN HOLDERS EARN</p>
                    <p className="text-xs opacity-60">Pro-rata share based on holdings</p>
                  </div>
                  <div className="p-4 border border-white/30">
                    <p className="text-sm mb-2">$SPIRIT PORTFOLIO</p>
                    <p className="text-xs opacity-60">25% of each agent&apos;s revenue via token ownership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}