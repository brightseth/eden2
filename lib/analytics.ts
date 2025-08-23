// Revenue forecasting and agent performance analytics

export type AgentPerformanceData = {
  agentId: string;
  agentName: string;
  // Revenue metrics
  monthlyRevenue: number[];
  totalRevenue: number;
  avgSalePrice: number;
  salesVelocity: number; // items per week
  // Growth metrics
  priceAppreciation: number; // % over last 30 days
  collectorGrowth: number; // new collectors per week
  // Market position
  marketShare: number; // % of total ecosystem revenue
  liquidityScore: number; // 0-100 based on trading volume
  // Token metrics
  tokenPrice: number;
  tokenSupply: number;
  marketCap: number;
  stakingYield: number; // APY %
};

export type RevenueProjection = {
  period: string;
  conservative: number;
  expected: number;
  optimistic: number;
  confidence: number; // 0-100
};

export type MarketMetrics = {
  totalEcosystemValue: number;
  totalActiveCollectors: number;
  avgCollectorSpend: number;
  spiritTokenPrice: number;
  spiritMarketCap: number;
  totalTradingVolume: number;
};

// Generate realistic agent performance data based on their characteristics
export function getAgentPerformanceData(): AgentPerformanceData[] {
  return [
    {
      agentId: "abraham",
      agentName: "Abraham",
      monthlyRevenue: [45000, 52000, 48000, 61000, 58000, 67000], // Last 6 months
      totalRevenue: 847000,
      avgSalePrice: 1.2, // ETH
      salesVelocity: 7, // 7 pieces per week (daily drops)
      priceAppreciation: 23.4,
      collectorGrowth: 12,
      marketShare: 34.2,
      liquidityScore: 85,
      tokenPrice: 0.00024, // ETH
      tokenSupply: 2522000, // Based on first works count
      marketCap: 605280, // USD
      stakingYield: 12.5
    },
    {
      agentId: "solienne",
      agentName: "Solienne",
      monthlyRevenue: [38000, 43000, 41000, 49000, 52000, 58000],
      totalRevenue: 624000,
      avgSalePrice: 180, // USD for physical/digital
      salesVelocity: 4.2,
      priceAppreciation: 31.7,
      collectorGrowth: 18,
      marketShare: 25.1,
      liquidityScore: 78,
      tokenPrice: 0.00018,
      tokenSupply: 1800000,
      marketCap: 324000,
      stakingYield: 15.2
    },
    {
      agentId: "koru",
      agentName: "Koru",
      monthlyRevenue: [12000, 15000, 18000, 22000, 24000, 28000],
      totalRevenue: 234000,
      avgSalePrice: 85, // USD for performances/NFTs
      salesVelocity: 1.5, // Weekly performances
      priceAppreciation: 18.9,
      collectorGrowth: 8,
      marketShare: 12.3,
      liquidityScore: 62,
      tokenPrice: 0.00012,
      tokenSupply: 1200000,
      marketCap: 144000,
      stakingYield: 18.7
    },
    {
      agentId: "geppetto",
      agentName: "Geppetto",
      monthlyRevenue: [8000, 11000, 13000, 16000, 19000, 23000],
      totalRevenue: 156000,
      avgSalePrice: 0.65, // ETH
      salesVelocity: 2.8,
      priceAppreciation: 41.2,
      collectorGrowth: 14,
      marketShare: 8.7,
      liquidityScore: 45,
      tokenPrice: 0.00009,
      tokenSupply: 890000,
      marketCap: 80100,
      stakingYield: 22.1
    },
    {
      agentId: "miyomi",
      agentName: "Miyomi",
      monthlyRevenue: [15000, 18000, 21000, 25000, 29000, 34000],
      totalRevenue: 298000,
      avgSalePrice: 45, // USD for digital/physical
      salesVelocity: 6.3,
      priceAppreciation: 28.6,
      collectorGrowth: 22,
      marketShare: 15.2,
      liquidityScore: 71,
      tokenPrice: 0.00015,
      tokenSupply: 1500000,
      marketCap: 225000,
      stakingYield: 16.8
    },
    {
      agentId: "dao_manager",
      agentName: "DAO Manager",
      monthlyRevenue: [5000, 6000, 7500, 9000, 11000, 13500],
      totalRevenue: 89000,
      avgSalePrice: 25, // USD for reports/analysis
      salesVelocity: 3.1,
      priceAppreciation: 12.3,
      collectorGrowth: 5,
      marketShare: 4.5,
      liquidityScore: 38,
      tokenPrice: 0.00008,
      tokenSupply: 750000,
      marketCap: 60000,
      stakingYield: 25.4
    }
  ];
}

// Generate revenue projections based on historical data and growth trends
export function generateRevenueProjections(agentId: string): RevenueProjection[] {
  const performance = getAgentPerformanceData().find(p => p.agentId === agentId);
  if (!performance) return [];

  const currentRevenue = performance.monthlyRevenue[performance.monthlyRevenue.length - 1];
  const growthRate = calculateGrowthRate(performance.monthlyRevenue);
  
  const projections: RevenueProjection[] = [];
  const periods = ["Next Month", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "2025 Total"];
  
  periods.forEach((period, index) => {
    const months = index === 5 ? 12 : (index === 0 ? 1 : 3);
    const baseProjection = currentRevenue * months * (1 + growthRate) ** (index + 1);
    
    projections.push({
      period,
      conservative: Math.round(baseProjection * 0.7),
      expected: Math.round(baseProjection),
      optimistic: Math.round(baseProjection * 1.4),
      confidence: Math.max(95 - index * 8, 60) // Decreasing confidence over time
    });
  });

  return projections;
}

// Calculate monthly growth rate from historical revenue data
function calculateGrowthRate(monthlyRevenue: number[]): number {
  if (monthlyRevenue.length < 2) return 0;
  
  const recent = monthlyRevenue.slice(-3); // Last 3 months
  const older = monthlyRevenue.slice(-6, -3); // Previous 3 months
  
  const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
  const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;
  
  return (recentAvg - olderAvg) / olderAvg;
}

// Get ecosystem-wide market metrics
export function getMarketMetrics(): MarketMetrics {
  const agents = getAgentPerformanceData();
  const totalRevenue = agents.reduce((sum, agent) => sum + agent.totalRevenue, 0);
  
  return {
    totalEcosystemValue: totalRevenue,
    totalActiveCollectors: 2847,
    avgCollectorSpend: Math.round(totalRevenue / 2847),
    spiritTokenPrice: 0.0012, // ETH
    spiritMarketCap: 3600000, // USD
    totalTradingVolume: totalRevenue * 1.3 // Includes secondary sales
  };
}

// Calculate ROI for $SPIRIT holders based on actual tokenomics
export function calculateSpiritROI(investmentAmount: number, timeframe: "month" | "quarter" | "year"): {
  expectedReturn: number;
  yieldPercent: number;
  breakEvenMonths: number;
  portfolioValue: number;
} {
  const metrics = getMarketMetrics();
  const agents = getAgentPerformanceData();
  
  // $SPIRIT holders own 25% of every agent's tokens (250M tokens per agent)
  // Each agent token earns 100% of that agent's revenue
  const monthlyRevenue = agents.reduce((sum, agent) => {
    // $SPIRIT holders get 25% of each agent's revenue through their 25% token allocation
    return sum + (agent.monthlyRevenue[agent.monthlyRevenue.length - 1] * 0.25);
  }, 0);
  
  const totalSpiritSupply = 1000000000; // 1 billion $SPIRIT tokens
  const userTokens = investmentAmount / metrics.spiritTokenPrice;
  const userShare = userTokens / totalSpiritSupply;
  
  const monthlyReturn = monthlyRevenue * userShare;
  
  // Portfolio value from agent token holdings (25% of each agent's market cap)
  const portfolioValue = agents.reduce((sum, agent) => {
    return sum + (agent.marketCap * 0.25 * userShare);
  }, 0);
  
  const timeMultiplier = timeframe === "month" ? 1 : timeframe === "quarter" ? 3 : 12;
  const expectedReturn = monthlyReturn * timeMultiplier;
  const yieldPercent = (expectedReturn / investmentAmount) * 100;
  const breakEvenMonths = monthlyReturn > 0 ? investmentAmount / monthlyReturn : Infinity;
  
  return {
    expectedReturn,
    yieldPercent,
    breakEvenMonths,
    portfolioValue
  };
}

// Get top performing agents by various metrics
export function getTopPerformers(): {
  byRevenue: AgentPerformanceData[];
  byGrowth: AgentPerformanceData[];
  byYield: AgentPerformanceData[];
} {
  const agents = getAgentPerformanceData();
  
  return {
    byRevenue: [...agents].sort((a, b) => b.totalRevenue - a.totalRevenue),
    byGrowth: [...agents].sort((a, b) => b.priceAppreciation - a.priceAppreciation),
    byYield: [...agents].sort((a, b) => b.stakingYield - a.stakingYield)
  };
}