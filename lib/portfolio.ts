// Collector portfolio management and tracking

import { getAgentLaunchStatus } from "./tokenomics";
import { getAgentPerformanceData } from "./analytics";

export type TokenHolding = {
  tokenSymbol: string;
  tokenName: string;
  balance: number;
  valueUSD: number;
  percentOfSupply: number;
  dailyRevenue: number;
  totalRevenueReceived: number;
  lastDistribution: Date;
};

export type RevenueDistribution = {
  id: string;
  date: Date;
  agentId: string;
  agentName: string;
  amount: number;
  tokenBalance: number;
  txHash: string;
};

export type ActiveBid = {
  id: string;
  tokenSymbol: string;
  bidAmount: number;
  currentPrice: number;
  status: "WINNING" | "OUTBID" | "EXECUTED" | "CANCELLED";
  timestamp: Date;
  expiresAt: Date;
};

export type PortfolioMetrics = {
  totalValue: number;
  dailyRevenue: number;
  monthlyRevenue: number;
  totalRevenueReceived: number;
  unrealizedGains: number;
  realizedGains: number;
  percentageReturn: number;
};

export type CollectorPortfolio = {
  address: string;
  handle: string;
  spiritBalance: number;
  spiritValue: number;
  tokenHoldings: TokenHolding[];
  revenueHistory: RevenueDistribution[];
  activeBids: ActiveBid[];
  metrics: PortfolioMetrics;
  joinedDate: Date;
};

// Generate mock portfolio for a collector
export function getCollectorPortfolio(handle: string = "@vault_keeper"): CollectorPortfolio {
  const spiritBalance = 125000; // $SPIRIT tokens owned
  const spiritPrice = 0.0036; // USD per $SPIRIT
  const spiritSupply = 1000000000; // Total supply
  const userShare = spiritBalance / spiritSupply;
  
  // Get launched agents
  const launchStatuses = getAgentLaunchStatus();
  const launchedAgents = launchStatuses.filter(a => a.isLaunched);
  const agentPerformance = getAgentPerformanceData();
  
  // Calculate token holdings from $SPIRIT allocation
  const tokenHoldings: TokenHolding[] = launchedAgents.map(agent => {
    const perf = agentPerformance.find(p => p.agentId === agent.agentId);
    if (!perf) return null;
    
    // User gets their share of the 25% allocation to $SPIRIT holders
    const agentTokenBalance = 250000000 * userShare; // 250M tokens (25% of 1B) * user's share
    const tokenPrice = perf.tokenPrice * 3000; // Convert ETH to USD
    const monthlyRevenue = perf.monthlyRevenue[perf.monthlyRevenue.length - 1];
    const dailyRevenue = (monthlyRevenue / 30) * (agentTokenBalance / 1000000000); // User's share of revenue
    
    return {
      tokenSymbol: `$${agent.agentName.toUpperCase()}`,
      tokenName: agent.agentName,
      balance: agentTokenBalance,
      valueUSD: agentTokenBalance * tokenPrice,
      percentOfSupply: (agentTokenBalance / 1000000000) * 100,
      dailyRevenue,
      totalRevenueReceived: dailyRevenue * 45, // Assume 45 days of distributions
      lastDistribution: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
    };
  }).filter(Boolean) as TokenHolding[];
  
  // Add some direct token purchases (not just from $SPIRIT allocation)
  tokenHoldings.push({
    tokenSymbol: "$ABRAHAM",
    tokenName: "Abraham (Direct)",
    balance: 500000, // Bought directly
    valueUSD: 500000 * 0.00072 * 3000,
    percentOfSupply: 0.05,
    dailyRevenue: 28.50,
    totalRevenueReceived: 1282.50,
    lastDistribution: new Date(Date.now() - 8 * 60 * 60 * 1000)
  });
  
  // Generate revenue history
  const revenueHistory: RevenueDistribution[] = [];
  const now = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    tokenHoldings.forEach(holding => {
      if (Math.random() > 0.3) { // Not every day has distributions
        revenueHistory.push({
          id: `dist-${i}-${holding.tokenSymbol}`,
          date,
          agentId: holding.tokenName.toLowerCase().replace(" (direct)", ""),
          agentName: holding.tokenName,
          amount: holding.dailyRevenue * (0.8 + Math.random() * 0.4), // ±20% variance
          tokenBalance: holding.balance,
          txHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`
        });
      }
    });
  }
  
  // Active bids
  const activeBids: ActiveBid[] = [
    {
      id: "bid-1",
      tokenSymbol: "$GEPPETTO",
      bidAmount: 0.025,
      currentPrice: 0.023,
      status: "WINNING",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(now.getTime() + 22 * 60 * 60 * 1000)
    },
    {
      id: "bid-2",
      tokenSymbol: "$KORU",
      bidAmount: 0.018,
      currentPrice: 0.019,
      status: "OUTBID",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      expiresAt: new Date(now.getTime() + 19 * 60 * 60 * 1000)
    },
    {
      id: "bid-3",
      tokenSymbol: "$MIYOMI",
      bidAmount: 0.012,
      currentPrice: 0.012,
      status: "EXECUTED",
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      expiresAt: new Date(now.getTime() - 12 * 60 * 60 * 1000)
    }
  ];
  
  // Calculate portfolio metrics
  const totalValue = spiritBalance * spiritPrice * 3000 + 
    tokenHoldings.reduce((sum, h) => sum + h.valueUSD, 0);
  
  const dailyRevenue = tokenHoldings.reduce((sum, h) => sum + h.dailyRevenue, 0);
  const monthlyRevenue = dailyRevenue * 30;
  const totalRevenueReceived = tokenHoldings.reduce((sum, h) => sum + h.totalRevenueReceived, 0);
  
  const initialInvestment = totalValue * 0.75; // Assume 25% gains
  const unrealizedGains = totalValue - initialInvestment;
  const realizedGains = totalRevenueReceived;
  const percentageReturn = ((unrealizedGains + realizedGains) / initialInvestment) * 100;
  
  return {
    address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    handle,
    spiritBalance,
    spiritValue: spiritBalance * spiritPrice * 3000,
    tokenHoldings,
    revenueHistory: revenueHistory.sort((a, b) => b.date.getTime() - a.date.getTime()),
    activeBids,
    metrics: {
      totalValue,
      dailyRevenue,
      monthlyRevenue,
      totalRevenueReceived,
      unrealizedGains,
      realizedGains,
      percentageReturn
    },
    joinedDate: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000) // 120 days ago
  };
}

// Get upcoming agent launches that $SPIRIT holders will receive allocations from
export function getUpcomingAllocations(spiritBalance: number) {
  const spiritSupply = 1000000000;
  const userShare = spiritBalance / spiritSupply;
  const launchStatuses = getAgentLaunchStatus();
  const upcoming = launchStatuses.filter(a => !a.isLaunched);
  
  return upcoming.map(agent => ({
    agentName: agent.agentName,
    status: agent.status,
    daysUntilLaunch: agent.daysUntilLaunch || 30,
    expectedAllocation: 250000000 * userShare, // 25% of 1B tokens
    percentOfSupply: (250000000 * userShare / 1000000000) * 100
  }));
}

// Calculate revenue projections based on holdings
export function calculateRevenueProjections(portfolio: CollectorPortfolio) {
  const projections = [];
  const periods = ["Next 7 Days", "Next 30 Days", "Next 90 Days", "Next Year"];
  const multipliers = [7, 30, 90, 365];
  
  periods.forEach((period, index) => {
    const days = multipliers[index];
    const revenue = portfolio.metrics.dailyRevenue * days;
    
    projections.push({
      period,
      projectedRevenue: revenue,
      fromSpiritHoldings: revenue * 0.6, // 60% from $SPIRIT allocation
      fromDirectHoldings: revenue * 0.4, // 40% from direct purchases
      confidence: Math.max(95 - index * 10, 65)
    });
  });
  
  return projections;
}

// Get order book for a specific token
export function getTokenOrderBook(tokenSymbol: string) {
  const generateOrders = (count: number, basePrice: number, isBid: boolean) => {
    const orders = [];
    let cumulativeVolume = 0;
    
    for (let i = 0; i < count; i++) {
      const priceOffset = (i + 1) * 0.0001 * (isBid ? -1 : 1);
      const price = basePrice + priceOffset;
      const volume = Math.floor(Math.random() * 50000 + 10000);
      cumulativeVolume += volume;
      
      orders.push({
        price,
        volume,
        total: price * volume,
        cumulative: cumulativeVolume
      });
    }
    
    return orders;
  };
  
  const basePrice = 0.00024; // Base price in ETH
  
  return {
    bids: generateOrders(8, basePrice, true).sort((a, b) => b.price - a.price),
    asks: generateOrders(8, basePrice, false).sort((a, b) => a.price - b.price),
    spread: 0.0001,
    lastPrice: basePrice,
    volume24h: Math.floor(Math.random() * 1000000 + 500000)
  };
}