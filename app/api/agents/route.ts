import { NextResponse } from 'next/server';
import { getAgents } from '@/lib/db';

export async function GET() {
  const agents = getAgents();
  
  // Add some live stats to make it feel dynamic
  const agentsWithStats = agents.map(agent => ({
    ...agent,
    stats: {
      totalWorks: Math.floor(Math.random() * 1000 + 500),
      todayWorks: Math.floor(Math.random() * 10 + 1),
      totalRevenue: Math.floor(Math.random() * 500000 + 100000),
      collectors: Math.floor(Math.random() * 500 + 100),
      lastActive: new Date(Date.now() - Math.random() * 3600000).toISOString()
    }
  }));

  return NextResponse.json({
    success: true,
    data: agentsWithStats,
    timestamp: new Date().toISOString()
  });
}