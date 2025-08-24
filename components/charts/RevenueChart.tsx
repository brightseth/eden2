"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';

type TimeRange = '7D' | '30D' | '90D' | '1Y' | 'ALL';

interface RevenueChartProps {
  agentId?: string;
  agentName?: string;
}

export default function RevenueChart({ agentId, agentName }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [chartType, setChartType] = useState<'revenue' | 'cumulative'>('revenue');

  const data = generateRevenueData(timeRange, agentId);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const formatTooltip = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="border border-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl">
            {agentName ? `${agentName.toUpperCase()} REVENUE` : 'ECOSYSTEM REVENUE'}
          </h2>
          <p className="text-sm opacity-60 mt-1">
            {chartType === 'revenue' ? 'Daily revenue from creations' : 'Total accumulated revenue'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex border border-white/30">
            <button
              onClick={() => setChartType('revenue')}
              className={`px-3 py-1 text-xs ${chartType === 'revenue' ? 'bg-white text-black' : ''}`}
            >
              DAILY
            </button>
            <button
              onClick={() => setChartType('cumulative')}
              className={`px-3 py-1 text-xs ${chartType === 'cumulative' ? 'bg-white text-black' : ''}`}
            >
              CUMULATIVE
            </button>
          </div>
          
          <div className="flex border border-white/30">
            {(['7D', '30D', '90D', '1Y', 'ALL'] as TimeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs ${timeRange === range ? 'bg-white text-black' : ''}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'revenue' ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="date" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={formatTooltip}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ffffff" 
              fillOpacity={1} 
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="date" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
            />
            <YAxis 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={formatTooltip}
            />
            <Line 
              type="monotone" 
              dataKey="cumulative" 
              stroke="#ffffff" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/30">
        <div>
          <p className="text-xs opacity-60">PERIOD TOTAL</p>
          <p className="text-xl font-mono">
            {formatYAxis(data.reduce((sum, d) => sum + d.revenue, 0))}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">DAILY AVERAGE</p>
          <p className="text-xl font-mono">
            {formatYAxis(data.reduce((sum, d) => sum + d.revenue, 0) / data.length)}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">BEST DAY</p>
          <p className="text-xl font-mono">
            {formatYAxis(Math.max(...data.map(d => d.revenue)))}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">GROWTH</p>
          <p className="text-xl font-mono text-green-400">
            +{((data[data.length - 1]?.revenue / data[0]?.revenue - 1) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}

function generateRevenueData(timeRange: TimeRange, agentId?: string) {
  const days = timeRange === '7D' ? 7 : 
               timeRange === '30D' ? 30 : 
               timeRange === '90D' ? 90 : 
               timeRange === '1Y' ? 365 : 
               730; // ALL = 2 years

  const data = [];
  const now = new Date();
  let cumulative = 0;
  
  // Different base revenue for different agents
  const baseRevenue = agentId === 'abraham' ? 300 :
                      agentId === 'solienne' ? 450 :
                      agentId === 'koru' ? 280 :
                      agentId === 'geppetto' ? 220 :
                      agentId === 'miyomi' ? 190 :
                      agentId === 'dao-manager' ? 50 :
                      1500; // Total ecosystem

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Simulate realistic revenue patterns
    const dayOfWeek = date.getDay();
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1;
    const randomVariation = 0.5 + Math.random();
    const growthFactor = 1 + (0.002 * (days - i)); // Gradual growth over time
    
    const revenue = Math.floor(baseRevenue * weekendMultiplier * randomVariation * growthFactor);
    cumulative += revenue;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue,
      cumulative
    });
  }
  
  return data;
}