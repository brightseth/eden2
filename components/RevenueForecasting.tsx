"use client";

import { useState, useEffect } from "react";
import { generateRevenueProjections, getAgentPerformanceData, type RevenueProjection, type AgentPerformanceData } from "@/lib/analytics";

type RevenueForecastingProps = {
  agentId?: string;
};

export default function RevenueForecasting({ agentId }: RevenueForecastingProps) {
  const [selectedAgent, setSelectedAgent] = useState<string>(agentId || "abraham");
  const [projections, setProjections] = useState<RevenueProjection[]>([]);
  const [performance, setPerformance] = useState<AgentPerformanceData | null>(null);
  const [viewMode, setViewMode] = useState<"chart" | "table">("table");
  const [agents, setAgents] = useState<AgentPerformanceData[]>([]);

  useEffect(() => {
    const agentData = getAgentPerformanceData();
    setAgents(agentData);
    const agentPerf = agentData.find(a => a.agentId === selectedAgent);
    if (agentPerf) {
      setPerformance(agentPerf);
      setProjections(generateRevenueProjections(selectedAgent));
    }
  }, [selectedAgent]);

  if (!performance) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="border border-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">REVENUE FORECASTING</h2>
        <div className="flex gap-2">
          <select 
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="bg-black border border-white px-3 py-1 text-sm"
          >
            {agents.map(agent => (
              <option key={agent.agentId} value={agent.agentId}>
                {agent.agentName}
              </option>
            ))}
          </select>
          <div className="flex">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 text-xs border-l border-t border-b ${
                viewMode === "table" ? "bg-white text-black" : "border-white/30"
              }`}
            >
              TABLE
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`px-3 py-1 text-xs border-r border-t border-b ${
                viewMode === "chart" ? "bg-white text-black" : "border-white/30"
              }`}
            >
              CHART
            </button>
          </div>
        </div>
      </div>

      {/* Current Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-white/30 p-4">
          <div className="text-xs opacity-60 mb-1">CURRENT MONTHLY</div>
          <div className="text-xl font-mono">
            {formatCurrency(performance.monthlyRevenue[performance.monthlyRevenue.length - 1])}
          </div>
          <div className="text-xs text-green-400">
            +{formatPercent(performance.priceAppreciation)}
          </div>
        </div>
        
        <div className="border border-white/30 p-4">
          <div className="text-xs opacity-60 mb-1">SALES VELOCITY</div>
          <div className="text-xl font-mono">
            {performance.salesVelocity}/week
          </div>
          <div className="text-xs opacity-80">
            Avg: {formatCurrency(performance.avgSalePrice)}
          </div>
        </div>
        
        <div className="border border-white/30 p-4">
          <div className="text-xs opacity-60 mb-1">MARKET SHARE</div>
          <div className="text-xl font-mono">
            {formatPercent(performance.marketShare)}
          </div>
          <div className="text-xs opacity-80">
            Liquidity: {performance.liquidityScore}/100
          </div>
        </div>
        
        <div className="border border-white/30 p-4">
          <div className="text-xs opacity-60 mb-1">TOKEN YIELD</div>
          <div className="text-xl font-mono text-green-400">
            {formatPercent(performance.stakingYield)}
          </div>
          <div className="text-xs opacity-80">
            APY for stakers
          </div>
        </div>
      </div>

      {/* Revenue Projections */}
      {viewMode === "table" ? (
        <div className="mb-6">
          <h3 className="text-lg mb-4">REVENUE PROJECTIONS</h3>
          <div className="border border-white">
            <div className="grid grid-cols-5 border-b border-white/30 bg-white/5">
              <div className="p-3 text-sm font-bold">PERIOD</div>
              <div className="p-3 text-sm font-bold text-center">CONSERVATIVE</div>
              <div className="p-3 text-sm font-bold text-center">EXPECTED</div>
              <div className="p-3 text-sm font-bold text-center">OPTIMISTIC</div>
              <div className="p-3 text-sm font-bold text-center">CONFIDENCE</div>
            </div>
            
            {projections.map((projection, index) => (
              <div key={projection.period} className={`grid grid-cols-5 ${
                index < projections.length - 1 ? "border-b border-white/30" : ""
              }`}>
                <div className="p-3 text-sm">{projection.period}</div>
                <div className="p-3 text-sm text-center font-mono">
                  {formatCurrency(projection.conservative)}
                </div>
                <div className="p-3 text-sm text-center font-mono font-bold">
                  {formatCurrency(projection.expected)}
                </div>
                <div className="p-3 text-sm text-center font-mono text-green-400">
                  {formatCurrency(projection.optimistic)}
                </div>
                <div className="p-3 text-sm text-center">
                  {projection.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h3 className="text-lg mb-4">HISTORICAL REVENUE TREND</h3>
          <div className="border border-white p-4">
            <div className="h-40 flex items-end justify-between gap-2">
              {performance.monthlyRevenue.map((revenue, index) => {
                const maxRevenue = Math.max(...performance.monthlyRevenue);
                const height = (revenue / maxRevenue) * 140; // Max height 140px
                const monthsAgo = performance.monthlyRevenue.length - index - 1;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-white w-full min-w-[20px]"
                      style={{ height: `${height}px` }}
                    />
                    <div className="text-xs mt-2 opacity-60">
                      {monthsAgo === 0 ? "NOW" : `-${monthsAgo}M`}
                    </div>
                    <div className="text-xs font-mono">
                      {formatCurrency(revenue).replace("$", "").replace(",", "K")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="border border-white/30 border-dashed p-4">
        <h3 className="text-lg mb-4">KEY INSIGHTS</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-bold mb-2">GROWTH TRAJECTORY</div>
            <div className="space-y-1 opacity-80">
              <div>• {formatPercent(performance.priceAppreciation)} price appreciation in 30 days</div>
              <div>• {performance.collectorGrowth} new collectors per week</div>
              <div>• Market share trending {performance.marketShare > 20 ? "up" : "stable"}</div>
            </div>
          </div>
          
          <div>
            <div className="font-bold mb-2">INVESTMENT THESIS</div>
            <div className="space-y-1 opacity-80">
              <div>• Strong liquidity score: {performance.liquidityScore}/100</div>
              <div>• Above-average staking yield: {formatPercent(performance.stakingYield)}</div>
              <div>• {performance.salesVelocity > 5 ? "High" : "Steady"} sales velocity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}