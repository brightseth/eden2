// Real tokenomics based on whitepaper

export type AgentLaunchStatus = {
  agentId: string;
  agentName: string;
  isLaunched: boolean;
  launchDate?: Date;
  pilotRevenue: number;
  buyerRetention: number;
  status: "LAUNCHED" | "PENDING" | "PILOT";
  daysUntilLaunch?: number;
};

export function getAgentLaunchStatus(): AgentLaunchStatus[] {
  return [
    {
      agentId: "abraham",
      agentName: "Abraham",
      isLaunched: true,
      launchDate: new Date("2025-10-19"),
      pilotRevenue: 12000,
      buyerRetention: 0.45,
      status: "LAUNCHED"
    },
    {
      agentId: "solienne", 
      agentName: "Solienne",
      isLaunched: true,
      launchDate: new Date("2025-11-15"),
      pilotRevenue: 9500,
      buyerRetention: 0.38,
      status: "LAUNCHED"
    },
    {
      agentId: "geppetto",
      agentName: "Geppetto",
      isLaunched: false,
      pilotRevenue: 8100,
      buyerRetention: 0.52,
      status: "PENDING",
      daysUntilLaunch: 3
    }
  ];
}