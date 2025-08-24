"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, Bar } from 'recharts';
import { useState } from 'react';

type TimeRange = '1H' | '24H' | '7D' | '30D' | '90D';

interface TokenPriceChartProps {
  tokenSymbol: string;
  tokenName: string;
}

export default function TokenPriceChart({ tokenSymbol, tokenName }: TokenPriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('24H');
  const [showVolume, setShowVolume] = useState(true);

  const data = generatePriceData(timeRange, tokenSymbol);
  
  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[0]?.price || 0;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const totalVolume = data.reduce((sum, d) => sum + d.volume, 0);

  const formatPrice = (value: number) => {
    if (value < 0.0001) return `$${value.toFixed(8)}`;
    if (value < 0.01) return `$${value.toFixed(6)}`;
    if (value < 1) return `$${value.toFixed(4)}`;
    return `$${value.toFixed(2)}`;
  };

  const formatVolume = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div className="border border-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl md:text-3xl">{tokenSymbol}</h2>
            <span className="text-lg opacity-60">{tokenName}</span>
          </div>
          <div className="flex items-baseline gap-4 mt-2">
            <span className="text-2xl font-mono">{formatPrice(currentPrice)}</span>
            <span className={`text-lg ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-3 py-1 text-xs border border-white/30 ${showVolume ? 'bg-white text-black' : ''}`}
          >
            VOLUME
          </button>
          
          <div className="flex border border-white/30">
            {(['1H', '24H', '7D', '30D', '90D'] as TimeRange[]).map(range => (
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
        <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis 
            dataKey="time" 
            stroke="#ffffff60"
            tick={{ fill: '#ffffff60', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="price"
            orientation="left"
            stroke="#ffffff60"
            tick={{ fill: '#ffffff60', fontSize: 12 }}
            tickFormatter={formatPrice}
          />
          {showVolume && (
            <YAxis 
              yAxisId="volume"
              orientation="right"
              stroke="#ffffff30"
              tick={{ fill: '#ffffff30', fontSize: 12 }}
              tickFormatter={formatVolume}
            />
          )}
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #fff' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number, name: string) => {
              if (name === 'price') return formatPrice(value);
              if (name === 'volume') return `${formatVolume(value)} USD`;
              return value;
            }}
          />
          {showVolume && (
            <Bar 
              yAxisId="volume"
              dataKey="volume" 
              fill="#ffffff20"
            />
          )}
          <Area 
            yAxisId="price"
            type="monotone" 
            dataKey="price" 
            stroke="#ffffff" 
            fillOpacity={1} 
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-white/30">
        <div>
          <p className="text-xs opacity-60">24H HIGH</p>
          <p className="text-lg font-mono">
            {formatPrice(Math.max(...data.map(d => d.price)))}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">24H LOW</p>
          <p className="text-lg font-mono">
            {formatPrice(Math.min(...data.map(d => d.price)))}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">24H VOLUME</p>
          <p className="text-lg font-mono">
            ${formatVolume(totalVolume)}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">MARKET CAP</p>
          <p className="text-lg font-mono">
            ${formatVolume(currentPrice * 1000000000)}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-60">HOLDERS</p>
          <p className="text-lg font-mono">
            {Math.floor(Math.random() * 2000 + 500).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function generatePriceData(timeRange: TimeRange, tokenSymbol: string) {
  const intervals = timeRange === '1H' ? 60 : // 1 minute intervals
                   timeRange === '24H' ? 24 : // 1 hour intervals
                   timeRange === '7D' ? 7 * 4 : // 6 hour intervals
                   timeRange === '30D' ? 30 : // 1 day intervals
                   90; // 1 day intervals for 90D

  const data = [];
  const now = new Date();
  
  // Base prices for different tokens
  const basePrice = tokenSymbol === '$SPIRIT' ? 0.0036 :
                   tokenSymbol === '$ABRAHAM' ? 0.00072 :
                   tokenSymbol === '$SOLIENNE' ? 0.00084 :
                   tokenSymbol === '$KORU' ? 0.00063 :
                   0.0005;

  let currentPrice = basePrice * (0.8 + Math.random() * 0.4);

  for (let i = 0; i < intervals; i++) {
    const time = new Date(now);
    
    if (timeRange === '1H') {
      time.setMinutes(time.getMinutes() - (intervals - i));
    } else if (timeRange === '24H') {
      time.setHours(time.getHours() - (intervals - i));
    } else if (timeRange === '7D') {
      time.setHours(time.getHours() - (intervals - i) * 6);
    } else {
      time.setDate(time.getDate() - (intervals - i));
    }

    // Simulate price movement
    const change = (Math.random() - 0.5) * 0.05;
    currentPrice = currentPrice * (1 + change);
    
    // Ensure price doesn't go negative or too high
    currentPrice = Math.max(basePrice * 0.5, Math.min(basePrice * 2, currentPrice));
    
    // Volume tends to be higher during price movements
    const volume = Math.abs(change) * 1000000 * Math.random() + 10000;

    data.push({
      time: timeRange === '1H' ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
            timeRange === '24H' ? time.toLocaleTimeString('en-US', { hour: '2-digit' }) :
            time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: currentPrice,
      volume: Math.floor(volume)
    });
  }

  return data;
}