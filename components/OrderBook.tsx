"use client";

import { useState, useEffect } from "react";
import { getTokenOrderBook } from "@/lib/portfolio";

type OrderBookProps = {
  tokenSymbol: string;
};

export default function OrderBook({ tokenSymbol }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<ReturnType<typeof getTokenOrderBook> | null>(null);

  useEffect(() => {
    setOrderBook(getTokenOrderBook(tokenSymbol));
    
    // Simulate live updates
    const interval = setInterval(() => {
      setOrderBook(getTokenOrderBook(tokenSymbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [tokenSymbol]);

  if (!orderBook) return null;

  const formatPrice = (price: number) => price.toFixed(6);
  const formatVolume = (volume: number) => {
    if (volume > 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume > 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toFixed(0);
  };

  const maxVolume = Math.max(
    ...orderBook.bids.map(b => b.volume),
    ...orderBook.asks.map(a => a.volume)
  );

  return (
    <div className="border border-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">ORDER BOOK - {tokenSymbol}</h3>
        <div className="text-xs opacity-60">
          24h Vol: {formatVolume(orderBook.volume24h)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Bids */}
        <div>
          <div className="text-sm font-bold mb-2 text-green-400">BIDS</div>
          <div className="space-y-1">
            {orderBook.bids.map((bid, index) => (
              <div key={index} className="relative">
                <div 
                  className="absolute inset-0 bg-green-900/20"
                  style={{ width: `${(bid.volume / maxVolume) * 100}%` }}
                />
                <div className="relative flex justify-between text-xs p-1">
                  <span className="font-mono">{formatPrice(bid.price)}</span>
                  <span className="opacity-80">{formatVolume(bid.volume)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="text-sm font-bold mb-2 text-red-400">ASKS</div>
          <div className="space-y-1">
            {orderBook.asks.map((ask, index) => (
              <div key={index} className="relative">
                <div 
                  className="absolute inset-0 bg-red-900/20"
                  style={{ width: `${(ask.volume / maxVolume) * 100}%` }}
                />
                <div className="relative flex justify-between text-xs p-1">
                  <span className="font-mono">{formatPrice(ask.price)}</span>
                  <span className="opacity-80">{formatVolume(ask.volume)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spread Info */}
      <div className="border-t border-white/30 pt-4">
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="opacity-60">LAST PRICE</div>
            <div className="font-mono">{formatPrice(orderBook.lastPrice)} ETH</div>
          </div>
          <div>
            <div className="opacity-60">SPREAD</div>
            <div className="font-mono">{(orderBook.spread * 10000).toFixed(2)} bps</div>
          </div>
          <div>
            <div className="opacity-60">MID PRICE</div>
            <div className="font-mono">
              {formatPrice((orderBook.bids[0].price + orderBook.asks[0].price) / 2)} ETH
            </div>
          </div>
        </div>
      </div>

      {/* Quick Trade Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black text-sm">
          BUY {tokenSymbol}
        </button>
        <button className="px-3 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black text-sm">
          SELL {tokenSymbol}
        </button>
      </div>
    </div>
  );
}