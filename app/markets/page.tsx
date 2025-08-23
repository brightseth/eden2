"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OrderBook from "@/components/OrderBook";
import { getAgentPerformanceData } from "@/lib/analytics";
import { getAgentLaunchStatus } from "@/lib/tokenomics";

export default function MarketsPage() {
  const [selectedToken, setSelectedToken] = useState<string>("$ABRAHAM");
  const [marketData, setMarketData] = useState<any[]>([]);

  useEffect(() => {
    const performance = getAgentPerformanceData();
    const launchStatus = getAgentLaunchStatus();
    
    const data = performance.map(agent => {
      const status = launchStatus.find(s => s.agentId === agent.agentId);
      return {
        ...agent,
        isLaunched: status?.isLaunched || false,
        launchStatus: status?.status || "PILOT"
      };
    });
    
    setMarketData(data);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: amount > 1000000 ? 'compact' : 'standard'
    }).format(amount);
  };

  const formatPercent = (value: number, positive: boolean = true) => {
    const formatted = `${value.toFixed(1)}%`;
    return positive ? `+${formatted}` : formatted;
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-4">MARKETS</h1>
          <p className="text-xl opacity-60">AGENT TOKEN EXCHANGE & ORDER BOOKS</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Token List */}
          <div className="lg:col-span-2">
            <div className="border border-white p-6">
              <h2 className="text-2xl mb-6">AGENT TOKENS</h2>
              
              <div className="space-y-3">
                {marketData.map(agent => (
                  <div 
                    key={agent.agentId}
                    className={`border ${selectedToken === `$${agent.agentName.toUpperCase()}` ? 'border-white' : 'border-white/30'} p-4 cursor-pointer hover:border-white transition-all`}
                    onClick={() => setSelectedToken(`$${agent.agentName.toUpperCase()}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold">${agent.agentName.toUpperCase()}</span>
                          {agent.isLaunched ? (
                            <span className="text-xs px-2 py-1 border border-green-400 text-green-400">
                              LAUNCHED
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 border border-yellow-400 text-yellow-400">
                              {agent.launchStatus}
                            </span>
                          )}
                        </div>
                        <div className="text-xs opacity-60 mt-1">{agent.agentName}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-mono">
                          {formatCurrency(agent.marketCap)}
                        </div>
                        <div className={`text-sm ${agent.priceAppreciation > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(agent.priceAppreciation)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="opacity-60">PRICE</div>
                        <div className="font-mono">{(agent.tokenPrice * 3000).toFixed(4)}</div>
                      </div>
                      <div>
                        <div className="opacity-60">24H VOL</div>
                        <div className="font-mono">{formatCurrency(agent.totalRevenue / 365)}</div>
                      </div>
                      <div>
                        <div className="opacity-60">HOLDERS</div>
                        <div>{Math.floor(Math.random() * 500 + 100)}</div>
                      </div>
                      <div>
                        <div className="opacity-60">APY</div>
                        <div className="text-green-400">{agent.stakingYield.toFixed(1)}%</div>
                      </div>
                    </div>
                    
                    {/* Mini Chart Placeholder */}
                    <div className="mt-3 flex items-end justify-between h-12 opacity-40">
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-white w-1"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Stats */}
            <div className="border border-white/30 border-dashed p-6 mt-6">
              <h3 className="text-lg mb-4">MARKET OVERVIEW</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="opacity-60">TOTAL MARKET CAP</div>
                  <div className="font-mono text-lg">
                    {formatCurrency(marketData.reduce((sum, a) => sum + a.marketCap, 0))}
                  </div>
                </div>
                <div>
                  <div className="opacity-60">24H VOLUME</div>
                  <div className="font-mono text-lg">
                    {formatCurrency(marketData.reduce((sum, a) => sum + a.totalRevenue / 365, 0))}
                  </div>
                </div>
                <div>
                  <div className="opacity-60">AVG APY</div>
                  <div className="font-mono text-lg text-green-400">
                    {(marketData.reduce((sum, a) => sum + a.stakingYield, 0) / marketData.length).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="opacity-60">TOKENS LAUNCHED</div>
                  <div className="font-mono text-lg">
                    {marketData.filter(a => a.isLaunched).length} / {marketData.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="lg:col-span-1">
            <OrderBook tokenSymbol={selectedToken} />
            
            {/* Trade History */}
            <div className="border border-white p-6 mt-6">
              <h3 className="text-xl mb-4">RECENT TRADES</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...Array(10)].map((_, i) => {
                  const isBuy = Math.random() > 0.5;
                  const price = 0.00024 + (Math.random() - 0.5) * 0.00002;
                  const volume = Math.floor(Math.random() * 10000 + 1000);
                  const time = new Date(Date.now() - i * 60000 * Math.random() * 10);
                  
                  return (
                    <div key={i} className="flex justify-between text-xs border-b border-white/20 pb-1">
                      <span className={isBuy ? "text-green-400" : "text-red-400"}>
                        {isBuy ? "BUY" : "SELL"}
                      </span>
                      <span className="font-mono">{price.toFixed(6)}</span>
                      <span className="opacity-60">{volume.toLocaleString()}</span>
                      <span className="opacity-40">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}