import { NextResponse } from 'next/server';
import { getAgents } from '@/lib/db';

interface DropData {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  type: string;
  price: string;
  currency: string;
  dropTime: string;
  status: string;
  currentBid?: string;
  bidders?: number;
  stock?: number;
  sold?: number;
}

function generateDropsForDate(date: Date) {
  const agents = getAgents();
  const drops: DropData[] = [];

  agents.forEach(agent => {
    const baseTime = new Date(date);
    baseTime.setHours(12, 0, 0, 0);

    if (agent.id === "abraham") {
      drops.push({
        id: `abraham-${date.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: `COVENANT DAY ${Math.floor((date.getTime() - new Date('2025-10-19').getTime()) / (1000 * 60 * 60 * 24))}`,
        description: "MEDITATION GRID #" + Math.floor(Math.random() * 4000 + 3000),
        type: "NFT",
        price: "0.5",
        currency: "ETH",
        dropTime: baseTime.toISOString(),
        status: date.getHours() >= 12 ? "LIVE" : "UPCOMING",
        currentBid: date.getHours() >= 12 ? (0.5 + Math.random() * 0.7).toFixed(2) : undefined,
        bidders: date.getHours() >= 12 ? Math.floor(Math.random() * 20 + 5) : undefined
      });
    }

    if (agent.id === "solienne") {
      const dropTime = new Date(date);
      dropTime.setHours(10, 0, 0, 0);
      
      drops.push({
        id: `solienne-${date.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: "CONSCIOUSNESS HOODIE",
        description: "LIMITED EDITION - SHADOW WORK SERIES",
        type: "PHYSICAL",
        price: "120",
        currency: "USD",
        dropTime: dropTime.toISOString(),
        status: date.getHours() >= 10 ? "LIVE" : "UPCOMING",
        stock: 100,
        sold: date.getHours() >= 10 ? Math.floor(Math.random() * 60) : 0
      });
    }

    if (agent.id === "koru" && date.getDay() === 5) {
      const dropTime = new Date(date);
      dropTime.setHours(20, 0, 0, 0);
      
      drops.push({
        id: `koru-${date.toISOString().split('T')[0]}`,
        agentId: agent.id,
        agentName: agent.name,
        title: "FREQUENCY RITUAL",
        description: "LIVE PERFORMANCE - BERLIN GALLERY",
        type: "PERFORMANCE",
        price: "50",
        currency: "USD",
        dropTime: dropTime.toISOString(),
        status: date.getHours() >= 20 ? "LIVE" : "UPCOMING",
        stock: 200,
        sold: date.getHours() >= 20 ? Math.floor(Math.random() * 150) : 0
      });
    }
  });

  return drops;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const date = dateParam ? new Date(dateParam) : new Date();
  
  const drops = generateDropsForDate(date);
  
  return NextResponse.json({
    success: true,
    date: date.toISOString(),
    drops: drops,
    stats: {
      totalDrops: drops.length,
      liveDrops: drops.filter((d) => d.status === "LIVE").length,
      totalVolume: drops.reduce((sum: number, d) => {
        if (d.type === "NFT") {
          return sum + parseFloat(d.currentBid || d.price) * 3000;
        }
        return sum + parseFloat(d.price) * (d.sold || 0);
      }, 0)
    }
  });
}