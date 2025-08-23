"use client";

import { useMemo, useState } from "react";
import { Split, TwabEntry, simulateSplit, distributeWithCap, fmtUSD } from "@/lib/tokenomics";

type Props = {
  split: Split;
  agentName: string;
  defaultAmount?: number;
};

const DEFAULT_HOLDERS: TwabEntry[] = [
  { address: "eden_treasury", label: "EDEN TREASURY", twab: 12_000_000, eligible: true },
  { address: "0xAlice", label: "ALICE", twab: 8_000_000, eligible: true },
  { address: "0xBob", label: "BOB", twab: 5_000_000, eligible: true },
  { address: "0xCarol", label: "CAROL", twab: 2_500_000, eligible: true },
  { address: "bridge_cex_1", label: "CEX/BRIDGE", twab: 30_000_000, eligible: true, flagged: true },
];

export default function TokenomicsSimulator({ split, defaultAmount = 1000 }: Props) {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [holders] = useState<TwabEntry[]>(DEFAULT_HOLDERS);
  const [excludeFlagged, setExcludeFlagged] = useState(true);
  const [capPct, setCapPct] = useState(0.02);

  const base = useMemo(() => simulateSplit(amount, split), [amount, split]);
  const spiritResult = useMemo(() => {
    return distributeWithCap(base.spiritHolders, holders, { excludeFlagged, capPct });
  }, [base.spiritHolders, holders, excludeFlagged, capPct]);

  const eligibleTwab = spiritResult.eligibleTwab;
  const edenTreasuryTwab =
    holders.find(h => h.address === "eden_treasury" && (h.eligible ?? true) && (!excludeFlagged || !h.flagged))?.twab ?? 0;

  const edenEffectiveSharePct =
    100 * (split.edenTreasury + split.spiritHolders * (edenTreasuryTwab / (eligibleTwab || 1)));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-white p-6">
          <div className="text-sm opacity-60 mb-2">GROSS SALE</div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
            className="w-full bg-transparent border-b border-white text-2xl py-2 focus:outline-none"
            min={0}
            step={100}
          />
          <div className="mt-2 text-xs opacity-40">ENTER TEST VALUE</div>
        </div>

        <div className="border border-white p-6">
          <div className="text-sm opacity-60 mb-4">BASE SPLIT (25/25/25/25)</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-60">AGENT TREASURY:</span>
              <span className="font-mono">{fmtUSD(base.agentTreasury)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">EDEN TREASURY:</span>
              <span className="font-mono">{fmtUSD(base.edenTreasury)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">HUMAN CREATOR:</span>
              <span className="font-mono">{fmtUSD(base.humanCreator)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">$SPIRIT HOLDERS:</span>
              <span className="font-mono">{fmtUSD(base.spiritHolders)}</span>
            </div>
          </div>
        </div>

        <div className="border border-white p-6">
          <div className="text-sm opacity-60 mb-2">EFFECTIVE EDEN SHARE</div>
          <div className="text-4xl font-mono">{edenEffectiveSharePct.toFixed(1)}%</div>
          <div className="mt-2 text-xs opacity-40">
            25% + 25% × (TREASURY TWAB / ELIGIBLE TWAB)
          </div>
        </div>
      </div>

      <div className="border border-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">$SPIRIT HOLDER DISTRIBUTION</h3>
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={excludeFlagged} 
                onChange={e => setExcludeFlagged(e.target.checked)}
                className="accent-white"
              />
              EXCLUDE FLAGGED
            </label>
            <label className="flex items-center gap-2">
              CAP
              <input
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                value={capPct * 100}
                onChange={e => setCapPct((parseFloat(e.target.value || "2") / 100))}
                className="w-12 bg-transparent border-b border-white text-center"
              />%
            </label>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/30">
              <th className="text-left py-2 font-normal opacity-60">ADDRESS</th>
              <th className="text-left py-2 font-normal opacity-60">LABEL</th>
              <th className="text-right py-2 font-normal opacity-60">TWAB</th>
              <th className="text-center py-2 font-normal opacity-60">ELIGIBLE</th>
              <th className="text-center py-2 font-normal opacity-60">FLAGGED</th>
              <th className="text-right py-2 font-normal opacity-60">PAYOUT</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((h, i) => {
              const payout = spiritResult.perAddress.get(h.address) ?? 0;
              return (
                <tr key={h.address + i} className="border-b border-white/10">
                  <td className="py-3 font-mono text-xs">{h.address}</td>
                  <td className="py-3">{h.label}</td>
                  <td className="py-3 text-right font-mono">{h.twab.toLocaleString()}</td>
                  <td className="py-3 text-center">{h.eligible ? "✓" : "—"}</td>
                  <td className="py-3 text-center">{h.flagged ? "✓" : "—"}</td>
                  <td className="py-3 text-right font-mono">{fmtUSD(payout)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 text-xs opacity-60 flex gap-6">
          <span>ELIGIBLE TWAB: {eligibleTwab.toLocaleString()}</span>
          <span>TOTAL DISTRIBUTED: {fmtUSD(spiritResult.totalDistributed)}</span>
          <span>POOL: {fmtUSD(base.spiritHolders)}</span>
        </div>
      </div>
    </div>
  );
}