"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getCollectorPortfolio, 
  getUpcomingAllocations, 
  calculateRevenueProjections,
  type CollectorPortfolio 
} from "@/lib/portfolio";

export default function PortfolioDashboard({ handle = "@vault_keeper" }: { handle?: string }) {
  const [portfolio, setPortfolio] = useState<CollectorPortfolio | null>(null);
  const [viewMode, setViewMode] = useState<"holdings" | "revenue" | "bids">("holdings");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  useEffect(() => {
    setPortfolio(getCollectorPortfolio(handle));
  }, [handle]);

  if (!portfolio) return null;

  const formatCurrency = (amount: number, compact: boolean = false) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: compact ? 0 : 2,
      maximumFractionDigits: compact ? 0 : 2,
      notation: compact && amount > 10000 ? 'compact' : 'standard'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const upcomingAllocations = getUpcomingAllocations(portfolio.spiritBalance);
  const revenueProjections = calculateRevenueProjections(portfolio);

  // Filter revenue history by time range
  const filteredRevenue = portfolio.revenueHistory.filter(dist => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 365;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return dist.date > cutoff;
  });

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="border border-white p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{handle}</h2>
            <div className="text-sm opacity-60">
              {portfolio.address} • Member since {portfolio.joinedDate.toLocaleDateString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold">
              {formatCurrency(portfolio.metrics.totalValue)}
            </div>
            <div className="text-sm text-green-400">
              +{formatPercent(portfolio.metrics.percentageReturn)} ALL TIME
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-white/30 p-3">
            <div className="text-xs opacity-60 mb-1">DAILY REVENUE</div>
            <div className="text-xl font-mono">{formatCurrency(portfolio.metrics.dailyRevenue)}</div>
          </div>
          <div className="border border-white/30 p-3">
            <div className="text-xs opacity-60 mb-1">MONTHLY REVENUE</div>
            <div className="text-xl font-mono">{formatCurrency(portfolio.metrics.monthlyRevenue)}</div>
          </div>
          <div className="border border-white/30 p-3">
            <div className="text-xs opacity-60 mb-1">TOTAL RECEIVED</div>
            <div className="text-xl font-mono">{formatCurrency(portfolio.metrics.totalRevenueReceived, true)}</div>
          </div>
          <div className="border border-white/30 p-3">
            <div className="text-xs opacity-60 mb-1">UNREALIZED GAINS</div>
            <div className="text-xl font-mono text-green-400">
              {formatCurrency(portfolio.metrics.unrealizedGains, true)}
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2">
        {(["holdings", "revenue", "bids"] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-2 border text-sm uppercase ${
              viewMode === mode 
                ? "border-white bg-white text-black" 
                : "border-white/30 hover:border-white"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Holdings View */}
      {viewMode === "holdings" && (
        <div className="space-y-6">
          {/* $SPIRIT Position */}
          <div className="border border-white p-6">
            <h3 className="text-xl mb-4">$SPIRIT POSITION</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-60">Balance:</span>
                    <span className="font-mono">{formatNumber(portfolio.spiritBalance)} $SPIRIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Value:</span>
                    <span className="font-mono">{formatCurrency(portfolio.spiritValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">% of Supply:</span>
                    <span>{formatPercent(portfolio.spiritBalance / 10000000)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">UPCOMING ALLOCATIONS</div>
                <div className="space-y-1">
                  {upcomingAllocations.slice(0, 3).map(allocation => (
                    <div key={allocation.agentName} className="text-xs opacity-80">
                      <span className="font-bold">{allocation.agentName}</span>
                      {" → "}
                      <span className="font-mono">{formatNumber(allocation.expectedAllocation)}</span>
                      {" tokens in "}
                      <span>{allocation.daysUntilLaunch}d</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Agent Token Holdings */}
          <div className="border border-white p-6">
            <h3 className="text-xl mb-4">AGENT TOKEN HOLDINGS</h3>
            <div className="space-y-3">
              {portfolio.tokenHoldings.map(holding => (
                <div key={holding.tokenSymbol} className="border border-white/30 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-lg font-bold">{holding.tokenSymbol}</div>
                      <div className="text-xs opacity-60">{holding.tokenName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">{formatCurrency(holding.valueUSD)}</div>
                      <div className="text-xs opacity-60">{formatPercent(holding.percentOfSupply)} of supply</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="opacity-60">Balance</div>
                      <div className="font-mono">{formatNumber(holding.balance)}</div>
                    </div>
                    <div>
                      <div className="opacity-60">Daily Revenue</div>
                      <div className="font-mono text-green-400">{formatCurrency(holding.dailyRevenue)}</div>
                    </div>
                    <div>
                      <div className="opacity-60">Last Distribution</div>
                      <div>{getTimeAgo(holding.lastDistribution)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="border border-white/30 border-dashed p-6">
            <h3 className="text-lg mb-4">REVENUE PROJECTIONS</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {revenueProjections.map(projection => (
                <div key={projection.period} className="text-center">
                  <div className="text-xs opacity-60 mb-1">{projection.period}</div>
                  <div className="text-xl font-mono">{formatCurrency(projection.projectedRevenue, true)}</div>
                  <div className="text-xs opacity-40">{projection.confidence}% confidence</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revenue History View */}
      {viewMode === "revenue" && (
        <div className="border border-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">REVENUE DISTRIBUTIONS</h3>
            <div className="flex gap-2">
              {(["7d", "30d", "all"] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs border ${
                    timeRange === range 
                      ? "border-white bg-white text-black" 
                      : "border-white/30 hover:border-white"
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredRevenue.map(dist => (
              <div key={dist.id} className="border border-white/30 p-3 text-sm">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-bold">{dist.agentName}</span>
                    <span className="opacity-60 ml-2">
                      {dist.date.toLocaleDateString()} {dist.date.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="font-mono text-green-400">
                    +{formatCurrency(dist.amount)}
                  </div>
                </div>
                <div className="text-xs opacity-60">
                  <span>Balance: {formatNumber(dist.tokenBalance)} tokens</span>
                  <span className="ml-4">Tx: {dist.txHash}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="flex justify-between text-sm">
              <span>Total ({timeRange}):</span>
              <span className="font-mono font-bold">
                {formatCurrency(filteredRevenue.reduce((sum, d) => sum + d.amount, 0))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Active Bids View */}
      {viewMode === "bids" && (
        <div className="border border-white p-6">
          <h3 className="text-xl mb-4">ACTIVE BIDS & ORDERS</h3>
          
          <div className="space-y-3">
            {portfolio.activeBids.map(bid => (
              <div key={bid.id} className="border border-white/30 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-lg font-bold">{bid.tokenSymbol}</div>
                    <div className={`text-xs ${
                      bid.status === "WINNING" ? "text-green-400" :
                      bid.status === "OUTBID" ? "text-red-400" :
                      bid.status === "EXECUTED" ? "text-blue-400" :
                      "text-gray-400"
                    }`}>
                      {bid.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono">{bid.bidAmount} ETH</div>
                    <div className="text-xs opacity-60">
                      Current: {bid.currentPrice} ETH
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs opacity-60">
                  <span>Placed {getTimeAgo(bid.timestamp)}</span>
                  <span>
                    {bid.status === "EXECUTED" ? "Executed" : `Expires in ${Math.floor((bid.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))}h`}
                  </span>
                </div>
                
                {bid.status === "OUTBID" && (
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 border border-white text-xs hover:bg-white hover:text-black">
                      INCREASE BID
                    </button>
                    <button className="px-3 py-1 border border-white/30 text-xs hover:border-white">
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="px-4 py-2 border border-white hover:bg-white hover:text-black">
              PLACE NEW BID
            </button>
          </div>
        </div>
      )}
    </div>
  );
}