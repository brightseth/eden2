"use client";

import Link from "next/link";
import { useState } from "react";
import TokenPriceChart from "@/components/charts/TokenPriceChart";
import { getMarketMetrics, calculateSpiritROI, getAgentPerformanceData } from "@/lib/analytics";

export default function SpiritPage() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const metrics = getMarketMetrics();
  const agents = getAgentPerformanceData();
  const roiData = calculateSpiritROI(investmentAmount, "year");

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-6">$SPIRIT</h1>
          <p className="text-xl md:text-2xl mb-4">THE GENESIS PORTFOLIO TOKEN</p>
          <p className="text-lg opacity-60 max-w-3xl">
            Own 25% of every AI agent in the Eden ecosystem through a single token. 
            $SPIRIT holders automatically receive token allocations from all new agent launches.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="border border-white p-4">
            <p className="text-xs opacity-60">CURRENT PRICE</p>
            <p className="text-2xl font-mono">${(metrics.spiritTokenPrice * 3000).toFixed(4)}</p>
          </div>
          <div className="border border-white p-4">
            <p className="text-xs opacity-60">MARKET CAP</p>
            <p className="text-2xl font-mono">${(metrics.spiritMarketCap / 1000000).toFixed(1)}M</p>
          </div>
          <div className="border border-white p-4">
            <p className="text-xs opacity-60">AGENTS OWNED</p>
            <p className="text-2xl font-mono">6 AGENTS</p>
          </div>
          <div className="border border-white p-4">
            <p className="text-xs opacity-60">AVG APY</p>
            <p className="text-2xl font-mono text-green-400">127.5%</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* How It Works */}
          <div className="border border-white p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl mb-8">HOW IT WORKS</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-white pl-4">
                <h3 className="text-lg mb-2">1. AUTOMATIC DIVERSIFICATION</h3>
                <p className="text-sm opacity-60">
                  Every $SPIRIT token represents ownership in ALL current and future Eden agents
                </p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h3 className="text-lg mb-2">2. 25% ALLOCATION</h3>
                <p className="text-sm opacity-60">
                  $SPIRIT holders collectively own 25% of each agent&apos;s token supply (250M tokens per agent)
                </p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h3 className="text-lg mb-2">3. REVENUE GENERATION</h3>
                <p className="text-sm opacity-60">
                  Agent tokens earn 100% of their agent&apos;s revenue from creations and services
                </p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h3 className="text-lg mb-2">4. COMPOUND GROWTH</h3>
                <p className="text-sm opacity-60">
                  New agent launches automatically add to your portfolio without additional investment
                </p>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="border border-white p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl mb-8">ROI CALCULATOR</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm opacity-60">INVESTMENT AMOUNT (USD)</label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full mt-2 p-3 bg-black border border-white text-white font-mono"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-white/30 p-3">
                  <p className="text-xs opacity-60">ANNUAL RETURN</p>
                  <p className="text-xl font-mono">${roiData.expectedReturn.toLocaleString()}</p>
                </div>
                <div className="border border-white/30 p-3">
                  <p className="text-xs opacity-60">YIELD %</p>
                  <p className="text-xl font-mono text-green-400">+{roiData.yieldPercent.toFixed(1)}%</p>
                </div>
                <div className="border border-white/30 p-3">
                  <p className="text-xs opacity-60">PORTFOLIO VALUE</p>
                  <p className="text-xl font-mono">${roiData.portfolioValue.toLocaleString()}</p>
                </div>
                <div className="border border-white/30 p-3">
                  <p className="text-xs opacity-60">BREAK EVEN</p>
                  <p className="text-xl font-mono">{roiData.breakEvenMonths.toFixed(0)} mo</p>
                </div>
              </div>

              <p className="text-xs opacity-40">
                *Based on current agent performance and 25% ownership model
              </p>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="mb-16">
          <TokenPriceChart tokenSymbol="$SPIRIT" tokenName="Spirit Portfolio Token" />
        </div>

        {/* Portfolio Composition */}
        <div className="border border-white p-6 md:p-8 mb-16">
          <h2 className="text-2xl md:text-3xl mb-8">PORTFOLIO COMPOSITION</h2>
          <p className="text-sm opacity-60 mb-8">
            Each $SPIRIT token gives you proportional ownership of these agent token allocations:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div key={agent.agentId} className="border border-white/30 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg">${agent.agentName.toUpperCase()}</h3>
                    <p className="text-xs opacity-60">250M TOKENS (25%)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">${(agent.marketCap / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-400">+{agent.priceAppreciation.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-60">Monthly Rev</span>
                    <span className="font-mono">${(agent.monthlyRevenue[5] / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Token Yield</span>
                    <span className="font-mono">{agent.stakingYield.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Hold SPIRIT */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="border border-white p-6">
            <h3 className="text-xl mb-4">INSTANT DIVERSIFICATION</h3>
            <p className="text-sm opacity-60">
              One token gives you exposure to the entire Eden ecosystem, reducing single-agent risk
            </p>
          </div>
          <div className="border border-white p-6">
            <h3 className="text-xl mb-4">AUTOMATIC EXPANSION</h3>
            <p className="text-sm opacity-60">
              New agent launches automatically add to your portfolio at no additional cost
            </p>
          </div>
          <div className="border border-white p-6">
            <h3 className="text-xl mb-4">COMPOUND REVENUE</h3>
            <p className="text-sm opacity-60">
              Earn from all agent creations across art, music, writing, and future capabilities
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-white/30 border-dashed p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">GET $SPIRIT</h2>
          <p className="text-lg opacity-60 mb-8">
            Available on decentralized exchanges
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/markets" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all">
              VIEW MARKETS
            </Link>
            <Link href="/docs/tokenomics" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all">
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}