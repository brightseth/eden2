"use client";

import { useMemo, useState } from "react";

type Props = {
  agentName: string;
  defaultAmount?: number;
};

export default function TokenomicsSimulator({ agentName, defaultAmount = 1000 }: Props) {
  const [amount, setAmount] = useState<number>(defaultAmount);

  const split = useMemo(() => {
    const quarter = amount * 0.25;
    return {
      agentTreasury: quarter,
      edenTreasury: quarter,
      humanCreator: quarter,
      spiritHolders: quarter
    };
  }, [amount]);

  const fmtUSD = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-white p-6">
          <div className="text-sm opacity-60 mb-2">GROSS REVENUE</div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
            className="w-full bg-transparent border-b border-white text-3xl py-2 focus:outline-none"
            min={0}
            step={100}
          />
          <div className="mt-2 text-xs opacity-40">ENTER ANY AMOUNT TO SIMULATE</div>
        </div>

        <div className="border border-white p-6">
          <div className="text-sm opacity-60 mb-4">25/25/25/25 SPLIT</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="opacity-60">{agentName.toUpperCase()} TREASURY:</span>
              <span className="font-mono text-lg">{fmtUSD(split.agentTreasury)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-60">EDEN TREASURY:</span>
              <span className="font-mono text-lg">{fmtUSD(split.edenTreasury)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-60">HUMAN CREATOR:</span>
              <span className="font-mono text-lg">{fmtUSD(split.humanCreator)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-60">$SPIRIT HOLDERS:</span>
              <span className="font-mono text-lg">{fmtUSD(split.spiritHolders)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-white/30 border-dashed p-8">
        <h3 className="text-xl mb-6">REVENUE FLOW VISUALIZATION</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="border border-white p-4 mb-2">
              <div className="text-3xl mb-2">25%</div>
              <div className="text-xs opacity-60">AGENT</div>
            </div>
            <div className="font-mono text-sm">{fmtUSD(split.agentTreasury)}</div>
          </div>
          <div className="text-center">
            <div className="border border-white p-4 mb-2">
              <div className="text-3xl mb-2">25%</div>
              <div className="text-xs opacity-60">EDEN</div>
            </div>
            <div className="font-mono text-sm">{fmtUSD(split.edenTreasury)}</div>
          </div>
          <div className="text-center">
            <div className="border border-white p-4 mb-2">
              <div className="text-3xl mb-2">25%</div>
              <div className="text-xs opacity-60">CREATOR</div>
            </div>
            <div className="font-mono text-sm">{fmtUSD(split.humanCreator)}</div>
          </div>
          <div className="text-center">
            <div className="border border-white p-4 mb-2">
              <div className="text-3xl mb-2">25%</div>
              <div className="text-xs opacity-60">$SPIRIT</div>
            </div>
            <div className="font-mono text-sm">{fmtUSD(split.spiritHolders)}</div>
          </div>
        </div>
      </div>

      <div className="text-xs opacity-40 text-center">
        SIMPLIFIED SIMULATOR · ACTUAL SMART CONTRACTS WILL HANDLE ON-CHAIN DISTRIBUTION
      </div>
    </div>
  );
}