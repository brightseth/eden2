"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import { getAgentPerformanceData } from '@/lib/analytics';

type ComparisonMode = 'radar' | 'bars' | 'table';

export default function AgentComparison() {
  const [mode, setMode] = useState<ComparisonMode>('radar');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['abraham', 'solienne', 'koru']);
  
  const agents = getAgentPerformanceData();
  
  // Normalize metrics for radar chart (0-100 scale)
  const radarData = [
    {
      metric: 'REVENUE',
      abraham: agents.find(a => a.agentId === 'abraham')?.marketShare || 0,
      solienne: agents.find(a => a.agentId === 'solienne')?.marketShare || 0,
      koru: agents.find(a => a.agentId === 'koru')?.marketShare || 0,
      geppetto: agents.find(a => a.agentId === 'geppetto')?.marketShare || 0,
      miyomi: agents.find(a => a.agentId === 'miyomi')?.marketShare || 0,
    },
    {
      metric: 'GROWTH',
      abraham: agents.find(a => a.agentId === 'abraham')?.priceAppreciation || 0,
      solienne: agents.find(a => a.agentId === 'solienne')?.priceAppreciation || 0,
      koru: agents.find(a => a.agentId === 'koru')?.priceAppreciation || 0,
      geppetto: agents.find(a => a.agentId === 'geppetto')?.priceAppreciation || 0,
      miyomi: agents.find(a => a.agentId === 'miyomi')?.priceAppreciation || 0,
    },
    {
      metric: 'VELOCITY',
      abraham: (agents.find(a => a.agentId === 'abraham')?.salesVelocity || 0) * 10,
      solienne: (agents.find(a => a.agentId === 'solienne')?.salesVelocity || 0) * 10,
      koru: (agents.find(a => a.agentId === 'koru')?.salesVelocity || 0) * 10,
      geppetto: (agents.find(a => a.agentId === 'geppetto')?.salesVelocity || 0) * 10,
      miyomi: (agents.find(a => a.agentId === 'miyomi')?.salesVelocity || 0) * 10,
    },
    {
      metric: 'LIQUIDITY',
      abraham: agents.find(a => a.agentId === 'abraham')?.liquidityScore || 0,
      solienne: agents.find(a => a.agentId === 'solienne')?.liquidityScore || 0,
      koru: agents.find(a => a.agentId === 'koru')?.liquidityScore || 0,
      geppetto: agents.find(a => a.agentId === 'geppetto')?.liquidityScore || 0,
      miyomi: agents.find(a => a.agentId === 'miyomi')?.liquidityScore || 0,
    },
    {
      metric: 'YIELD',
      abraham: (agents.find(a => a.agentId === 'abraham')?.stakingYield || 0) * 4,
      solienne: (agents.find(a => a.agentId === 'solienne')?.stakingYield || 0) * 4,
      koru: (agents.find(a => a.agentId === 'koru')?.stakingYield || 0) * 4,
      geppetto: (agents.find(a => a.agentId === 'geppetto')?.stakingYield || 0) * 4,
      miyomi: (agents.find(a => a.agentId === 'miyomi')?.stakingYield || 0) * 4,
    },
    {
      metric: 'COLLECTORS',
      abraham: (agents.find(a => a.agentId === 'abraham')?.collectorGrowth || 0) * 5,
      solienne: (agents.find(a => a.agentId === 'solienne')?.collectorGrowth || 0) * 5,
      koru: (agents.find(a => a.agentId === 'koru')?.collectorGrowth || 0) * 5,
      geppetto: (agents.find(a => a.agentId === 'geppetto')?.collectorGrowth || 0) * 5,
      miyomi: (agents.find(a => a.agentId === 'miyomi')?.collectorGrowth || 0) * 5,
    }
  ];

  const barData = agents.map(agent => ({
    name: agent.agentName.toUpperCase(),
    revenue: agent.totalRevenue / 1000,
    growth: agent.priceAppreciation,
    yield: agent.stakingYield,
    liquidity: agent.liquidityScore
  }));

  const colors = {
    abraham: '#FFFFFF',
    solienne: '#E0E0E0',
    koru: '#C0C0C0',
    geppetto: '#A0A0A0',
    miyomi: '#808080'
  };

  const toggleAgent = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      if (selectedAgents.length > 1) {
        setSelectedAgents(selectedAgents.filter(id => id !== agentId));
      }
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  return (
    <div className="border border-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl">AGENT COMPARISON</h2>
          <p className="text-sm opacity-60 mt-1">
            {mode === 'radar' ? 'Multi-dimensional performance metrics' :
             mode === 'bars' ? 'Side-by-side metric comparison' :
             'Detailed performance table'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex border border-white/30">
            <button
              onClick={() => setMode('radar')}
              className={`px-3 py-1 text-xs ${mode === 'radar' ? 'bg-white text-black' : ''}`}
            >
              RADAR
            </button>
            <button
              onClick={() => setMode('bars')}
              className={`px-3 py-1 text-xs ${mode === 'bars' ? 'bg-white text-black' : ''}`}
            >
              BARS
            </button>
            <button
              onClick={() => setMode('table')}
              className={`px-3 py-1 text-xs ${mode === 'table' ? 'bg-white text-black' : ''}`}
            >
              TABLE
            </button>
          </div>
        </div>
      </div>

      {mode === 'radar' && (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {['abraham', 'solienne', 'koru', 'geppetto', 'miyomi'].map(agentId => (
              <button
                key={agentId}
                onClick={() => toggleAgent(agentId)}
                className={`px-3 py-1 text-xs border ${
                  selectedAgents.includes(agentId)
                    ? 'bg-white text-black border-white'
                    : 'border-white/30'
                }`}
              >
                {agentId.toUpperCase()}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff30" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: '#ffffff60', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: '#ffffff30', fontSize: 10 }}
              />
              {selectedAgents.map(agentId => (
                <Radar
                  key={agentId}
                  name={agentId.toUpperCase()}
                  dataKey={agentId}
                  stroke={colors[agentId as keyof typeof colors]}
                  fill={colors[agentId as keyof typeof colors]}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))}
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
                labelStyle={{ color: '#fff' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </>
      )}

      {mode === 'bars' && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend 
              wrapperStyle={{ color: '#ffffff60' }}
            />
            <Bar dataKey="revenue" fill="#FFFFFF" name="Revenue (K)" />
            <Bar dataKey="growth" fill="#C0C0C0" name="Growth %" />
            <Bar dataKey="yield" fill="#808080" name="Yield %" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {mode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white">
                <th className="text-left py-2">AGENT</th>
                <th className="text-right py-2">REVENUE</th>
                <th className="text-right py-2">GROWTH</th>
                <th className="text-right py-2">VELOCITY</th>
                <th className="text-right py-2">LIQUIDITY</th>
                <th className="text-right py-2">YIELD</th>
                <th className="text-right py-2">MARKET CAP</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent.agentId} className="border-b border-white/20">
                  <td className="py-2 font-bold">{agent.agentName.toUpperCase()}</td>
                  <td className="text-right font-mono">${(agent.totalRevenue / 1000).toFixed(0)}K</td>
                  <td className="text-right text-green-400">+{agent.priceAppreciation.toFixed(1)}%</td>
                  <td className="text-right">{agent.salesVelocity.toFixed(1)}/wk</td>
                  <td className="text-right">{agent.liquidityScore}</td>
                  <td className="text-right text-green-400">{agent.stakingYield.toFixed(1)}%</td>
                  <td className="text-right font-mono">${(agent.marketCap / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/30">
        <div>
          <p className="text-xs opacity-60">TOP REVENUE</p>
          <p className="text-lg font-mono">
            {agents.sort((a, b) => b.totalRevenue - a.totalRevenue)[0].agentName.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">HIGHEST GROWTH</p>
          <p className="text-lg font-mono text-green-400">
            {agents.sort((a, b) => b.priceAppreciation - a.priceAppreciation)[0].agentName.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">BEST YIELD</p>
          <p className="text-lg font-mono">
            {agents.sort((a, b) => b.stakingYield - a.stakingYield)[0].agentName.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">MOST LIQUID</p>
          <p className="text-lg font-mono">
            {agents.sort((a, b) => b.liquidityScore - a.liquidityScore)[0].agentName.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}