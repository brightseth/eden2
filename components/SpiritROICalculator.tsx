"use client";

import { useState, useEffect } from "react";
import { calculateSpiritROI, getMarketMetrics, getTopPerformers } from "@/lib/analytics";

export default function SpiritROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("1000");
  const [timeframe, setTimeframe] = useState<"month" | "quarter" | "year">("year");
  const [roiData, setRoiData] = useState<{
    expectedReturn: number;
    yieldPercent: number;
    breakEvenMonths: number;
  } | null>(null);
  
  const [marketMetrics, setMarketMetrics] = useState<any>(null);
  const [topPerformers, setTopPerformers] = useState<any>(null);

  useEffect(() => {
    const amount = parseFloat(investmentAmount) || 0;
    if (amount > 0) {
      setRoiData(calculateSpiritROI(amount, timeframe));
    } else {
      setRoiData(null);
    }
    
    setMarketMetrics(getMarketMetrics());
    setTopPerformers(getTopPerformers());
  }, [investmentAmount, timeframe]);

  const formatCurrency = (amount: number, compact: boolean = false) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: compact ? 0 : 2,
      notation: compact && amount > 1000000 ? 'compact' : 'standard'
    }).format(amount);
  };

  const formatPercent = (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* ROI Calculator */}
      <div className="lg:col-span-2 border border-white p-6">
        <h2 className="text-2xl mb-6">$SPIRIT ROI CALCULATOR</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm font-bold mb-2">INVESTMENT AMOUNT (USD)</div>
            <input 
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full p-3 border border-white bg-black text-white font-mono text-lg"
              placeholder="1000"
              min="1"
              step="100"
            />
            <div className="text-xs opacity-60 mt-1">
              Minimum investment: $100
            </div>
          </div>
          
          <div>
            <div className="text-sm font-bold mb-2">TIMEFRAME</div>
            <div className="space-y-2">
              {[
                { value: "month", label: "1 Month" },
                { value: "quarter", label: "3 Months" },
                { value: "year", label: "12 Months" }
              ].map(option => (
                <label key={option.value} className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="timeframe"
                    value={option.value}
                    checked={timeframe === option.value}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {roiData && marketMetrics && (
          <div className="space-y-6">
            {/* ROI Results */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-white p-4 text-center">
                <div className="text-xs opacity-60 mb-1">EXPECTED RETURN</div>
                <div className="text-2xl font-mono text-green-400">
                  {formatCurrency(roiData.expectedReturn)}
                </div>
              </div>
              
              <div className="border border-white p-4 text-center">
                <div className="text-xs opacity-60 mb-1">YIELD</div>
                <div className="text-2xl font-mono text-green-400">
                  {formatPercent(roiData.yieldPercent)}
                </div>
              </div>
              
              <div className="border border-white p-4 text-center">
                <div className="text-xs opacity-60 mb-1">BREAK-EVEN</div>
                <div className="text-2xl font-mono">
                  {roiData.breakEvenMonths.toFixed(1)}M
                </div>
              </div>
            </div>

            {/* Market Context */}
            <div className="border border-white/30 p-4">
              <h3 className="text-lg mb-3">MARKET CONTEXT</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-60">$SPIRIT Price:</span>
                    <span className="font-mono">
                      {(marketMetrics.spiritTokenPrice * 3000).toFixed(4)} USD
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Market Cap:</span>
                    <span className="font-mono">
                      {formatCurrency(marketMetrics.spiritMarketCap, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Your Tokens:</span>
                    <span className="font-mono">
                      {(parseFloat(investmentAmount) / (marketMetrics.spiritTokenPrice * 3000)).toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })} $SPIRIT
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-60">Ecosystem Revenue:</span>
                    <span className="font-mono">
                      {formatCurrency(marketMetrics.totalEcosystemValue, true)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Active Collectors:</span>
                    <span className="font-mono">
                      {marketMetrics.totalActiveCollectors.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Avg Collector Spend:</span>
                    <span className="font-mono">
                      {formatCurrency(marketMetrics.avgCollectorSpend)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Distribution Model */}
            <div className="border border-white/30 border-dashed p-4">
              <h3 className="text-lg mb-3">$SPIRIT TOKEN MODEL</h3>
              <div className="text-sm space-y-2 mb-4">
                <div className="font-bold">Portfolio Token Structure:</div>
                <div className="opacity-80">• $SPIRIT holders receive 25% of EVERY new agent token launch</div>
                <div className="opacity-80">• Agent tokens earn 100% of their specific agent&apos;s revenue</div>
                <div className="opacity-80">• $SPIRIT provides diversified exposure to entire ecosystem</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-xs border-t border-white/30 pt-4">
                <div className="text-center">
                  <div className="text-lg font-mono text-green-400">25%</div>
                  <div className="opacity-60">TO $SPIRIT HOLDERS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono">25%</div>
                  <div className="opacity-60">AGENT TREASURY</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono">25%</div>
                  <div className="opacity-60">HUMAN CREATOR</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-mono">25%</div>
                  <div className="opacity-60">EDEN TREASURY</div>
                </div>
              </div>
              
              <div className="mt-4 text-xs opacity-80">
                <div className="font-bold mb-1">YOUR REVENUE COMES FROM:</div>
                <div>25% allocation in {roiData && ("portfolioValue" in roiData) ? "launched" : "all"} agent tokens × their individual revenues</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Performers */}
      <div className="lg:col-span-1 space-y-6">
        {topPerformers && (
          <>
            <div className="border border-white p-6">
              <h3 className="text-xl mb-4">TOP BY REVENUE</h3>
              <div className="space-y-3">
                {topPerformers.byRevenue.slice(0, 3).map((agent: any, index: number) => (
                  <div key={agent.agentId} className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm">{agent.agentName}</div>
                      <div className="text-xs opacity-60">
                        {formatPercent(agent.marketShare)} market share
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">
                        {formatCurrency(agent.totalRevenue, true)}
                      </div>
                      <div className="text-xs text-green-400">
                        +{formatPercent(agent.priceAppreciation)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white p-6">
              <h3 className="text-xl mb-4">HIGHEST YIELDS</h3>
              <div className="space-y-3">
                {topPerformers.byYield.slice(0, 3).map((agent: any, index: number) => (
                  <div key={agent.agentId} className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm">{agent.agentName}</div>
                      <div className="text-xs opacity-60">
                        Token staking APY
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-green-400">
                        {formatPercent(agent.stakingYield)}
                      </div>
                      <div className="text-xs opacity-60">
                        {agent.liquidityScore}/100 liquidity
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/30 border-dashed p-4">
              <h3 className="text-lg mb-3">INVESTMENT STRATEGY</h3>
              <div className="text-sm space-y-2 opacity-80">
                <div>• $SPIRIT provides exposure to entire ecosystem</div>
                <div>• Individual agent tokens offer higher risk/reward</div>
                <div>• Staking required for revenue sharing</div>
                <div>• Governance rights included with holdings</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}