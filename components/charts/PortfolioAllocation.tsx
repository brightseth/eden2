"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from 'react';

type ViewMode = 'allocation' | 'performance' | 'revenue';

interface PortfolioAllocationProps {
  address?: string;
}

export default function PortfolioAllocation({ address }: PortfolioAllocationProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('allocation');
  
  const allocationData = [
    { name: '$SPIRIT', value: 35000, percentage: 35, color: '#FFFFFF' },
    { name: '$ABRAHAM', value: 18000, percentage: 18, color: '#E0E0E0' },
    { name: '$SOLIENNE', value: 15000, percentage: 15, color: '#C0C0C0' },
    { name: '$KORU', value: 12000, percentage: 12, color: '#A0A0A0' },
    { name: '$GEPPETTO', value: 10000, percentage: 10, color: '#808080' },
    { name: '$MIYOMI', value: 8000, percentage: 8, color: '#606060' },
    { name: 'ETH', value: 2000, percentage: 2, color: '#404040' }
  ];

  const performanceData = [
    { name: '$SPIRIT', value: 145, revenue: 450 },
    { name: '$ABRAHAM', value: 89, revenue: 280 },
    { name: '$SOLIENNE', value: 124, revenue: 380 },
    { name: '$KORU', value: 67, revenue: 220 },
    { name: '$GEPPETTO', value: 45, revenue: 180 },
    { name: '$MIYOMI', value: 92, revenue: 160 }
  ];

  const totalValue = allocationData.reduce((sum, d) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-black border border-white p-3">
          <p className="text-sm">{payload[0].name}</p>
          <p className="text-sm font-mono">
            ${payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.percentage && (
            <p className="text-xs opacity-60">{payload[0].payload.percentage}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="black" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="border border-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl">PORTFOLIO ANALYSIS</h2>
          <p className="text-sm opacity-60 mt-1">
            {viewMode === 'allocation' ? 'Token distribution by value' :
             viewMode === 'performance' ? '30-day performance by token' :
             'Monthly revenue by token'}
          </p>
        </div>
        
        <div className="flex border border-white/30">
          <button
            onClick={() => setViewMode('allocation')}
            className={`px-3 py-1 text-xs ${viewMode === 'allocation' ? 'bg-white text-black' : ''}`}
          >
            ALLOCATION
          </button>
          <button
            onClick={() => setViewMode('performance')}
            className={`px-3 py-1 text-xs ${viewMode === 'performance' ? 'bg-white text-black' : ''}`}
          >
            PERFORMANCE
          </button>
          <button
            onClick={() => setViewMode('revenue')}
            className={`px-3 py-1 text-xs ${viewMode === 'revenue' ? 'bg-white text-black' : ''}`}
          >
            REVENUE
          </button>
        </div>
      </div>

      {viewMode === 'allocation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            <h3 className="text-lg mb-4">HOLDINGS BREAKDOWN</h3>
            {allocationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-white/20 pb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 border border-black"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono">${item.value.toLocaleString()}</div>
                  <div className="text-xs opacity-60">{item.percentage}%</div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white">
              <div className="flex justify-between">
                <span className="text-lg">TOTAL VALUE</span>
                <span className="text-lg font-mono">${totalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis 
              dataKey="name" 
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              stroke="#ffffff60"
              tick={{ fill: '#ffffff60', fontSize: 12 }}
              label={{ value: viewMode === 'performance' ? 'Performance %' : 'Revenue $', angle: -90, position: 'insideLeft', style: { fill: '#ffffff60' } }}
            />
            {viewMode === 'revenue' && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#ffffff30"
                tick={{ fill: '#ffffff30', fontSize: 12 }}
              />
            )}
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number, name: string) => {
                if (name === 'value') return `${value}%`;
                if (name === 'revenue') return `$${value}`;
                return value;
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey={viewMode === 'performance' ? 'value' : 'revenue'} 
              fill="#ffffff"
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/30">
        <div>
          <p className="text-xs opacity-60">BEST PERFORMER</p>
          <p className="text-lg font-mono text-green-400">
            $SPIRIT +145%
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">WORST PERFORMER</p>
          <p className="text-lg font-mono text-red-400">
            $GEPPETTO +45%
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">AVG RETURN</p>
          <p className="text-lg font-mono">
            +93.5%
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">TOTAL REVENUE</p>
          <p className="text-lg font-mono">
            $1,670/mo
          </p>
        </div>
      </div>
    </div>
  );
}