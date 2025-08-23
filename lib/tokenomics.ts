export type Split = {
  edenTreasury: number;
  agentTreasury: number;
  humanCreator: number;
  spiritHolders: number;
};

export type TwabEntry = {
  address: string;
  label?: string;
  twab: number;
  eligible?: boolean;
  flagged?: boolean;
};

export function simulateSplit(amount: number, split: Split) {
  const f = (x: number) => Math.max(0, x);
  return {
    edenTreasury: f(amount * split.edenTreasury),
    agentTreasury: f(amount * split.agentTreasury),
    humanCreator: f(amount * split.humanCreator),
    spiritHolders: f(amount * split.spiritHolders),
  };
}

export function distributeWithCap(
  poolAmount: number,
  entries: TwabEntry[],
  { excludeFlagged = true, capPct = 0.02 }: { excludeFlagged?: boolean; capPct?: number } = {}
) {
  const candidates = entries
    .filter(e => (e.eligible ?? true))
    .filter(e => (excludeFlagged ? !e.flagged : true))
    .filter(e => e.twab > 0);

  const totalTwab = candidates.reduce((s, e) => s + e.twab, 0);
  if (totalTwab <= 0 || poolAmount <= 0) {
    return { perAddress: new Map<string, number>(), totalDistributed: 0, eligibleTwab: 0 };
  }

  type Work = { idx: number; twab: number; frozen: boolean; share: number };
  const work: Work[] = candidates.map((e, idx) => ({ idx, twab: e.twab, frozen: false, share: 0 }));

  let remaining = poolAmount;
  let remainingTwab = totalTwab;

  while (true) {
    let changed = false;

    for (const w of work) {
      if (w.frozen) continue;
      w.share = remaining * (w.twab / remainingTwab);
    }

    for (const w of work) {
      if (w.frozen) continue;
      const maxForWallet = poolAmount * capPct;
      if (w.share > maxForWallet) {
        remaining -= maxForWallet;
        remainingTwab -= w.twab;
        w.share = maxForWallet;
        w.frozen = true;
        changed = true;
      }
    }

    if (!changed) break;
    if (remainingTwab <= 0 || remaining <= 0) break;
  }

  if (remaining > 0 && remainingTwab > 0) {
    for (const w of work) {
      if (w.frozen) continue;
      w.share = remaining * (w.twab / remainingTwab);
    }
  }

  const perAddress = new Map<string, number>();
  work.forEach((w, i) => {
    const e = candidates[w.idx];
    perAddress.set(e.address, (perAddress.get(e.address) ?? 0) + w.share);
  });

  const totalDistributed = Array.from(perAddress.values()).reduce((s, v) => s + v, 0);
  return { perAddress, totalDistributed, eligibleTwab: totalTwab };
}

export function fmtUSD(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}