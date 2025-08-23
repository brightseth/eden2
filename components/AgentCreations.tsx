"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Creation = {
  id: string;
  agentName: string;
  title: string;
  timestamp: Date;
  type: "IMAGE" | "SOUND" | "STORY" | "DREAM" | "GOVERNANCE";
  placeholder: string;
};

export default function AgentCreations({ agentId }: { agentId: string }) {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading agent creations
    const timer = setTimeout(() => {
      setCreations(generateCreations(agentId));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [agentId]);

  if (loading) {
    return (
      <div className="border border-white/30 border-dashed p-8 text-center">
        <p className="text-sm opacity-60">LOADING CREATIONS...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12">
      <h2 className="text-2xl md:text-3xl mb-8 md:mb-10">RECENT CREATIONS</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {creations.map(creation => (
          <Link key={creation.id} href={`/creation/${creation.id}`}>
            <div className="border border-white group hover:bg-white hover:text-black transition-all cursor-pointer">
              <div className="aspect-square border-b border-white group-hover:border-black p-8 flex items-center justify-center">
                <pre className="text-xs opacity-60 group-hover:opacity-100">
                  {creation.placeholder}
                </pre>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1">{creation.title}</h3>
                <p className="text-xs opacity-60">
                  {new Date(creation.timestamp).toLocaleDateString()} • {creation.type}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function generateCreations(agentId: string): Creation[] {
  const creationTypes: Record<string, { type: Creation["type"]; placeholders: string[] }> = {
    solienne: {
      type: "IMAGE",
      placeholders: [
        `    ╔═══════════════╗
    ║               ║
    ║   ▓▓▓▓▓▓▓▓▓   ║
    ║   ▓       ▓   ║
    ║   ▓   █   ▓   ║
    ║   ▓       ▓   ║
    ║   ▓▓▓▓▓▓▓▓▓   ║
    ║               ║
    ╚═══════════════╝`,
        `    ┌───────────────┐
    │  ░░░░░░░░░░░  │
    │ ░░░░░░░░░░░░░ │
    │░░░░░░██░░░░░░░│
    │ ░░░░░░░░░░░░░ │
    │  ░░░░░░░░░░░  │
    └───────────────┘`,
        `    ╭───────────────╮
    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓██▓▓▓▓▓▓▓│
    │▓▓▓▓████▓▓▓▓▓▓▓│
    │▓▓▓██████▓▓▓▓▓▓│
    │▓▓▓▓████▓▓▓▓▓▓▓│
    │▓▓▓▓▓██▓▓▓▓▓▓▓▓│
    ╰───────────────╯`
      ]
    },
    abraham: {
      type: "IMAGE",
      placeholders: [
        `    ╔═══════════════╗
    ║    ▲     ▲    ║
    ║   ▲ ▲   ▲ ▲   ║
    ║  ▲   ▲ ▲   ▲  ║
    ║ ▲     ▲     ▲ ║
    ║▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲║
    ╚═══════════════╝`,
        `    ┌───────────────┐
    │   ✦   ✦   ✦   │
    │ ✦   ✦   ✦   ✦ │
    │   ✦   ✦   ✦   │
    │ ✦   ✦   ✦   ✦ │
    │   ✦   ✦   ✦   │
    └───────────────┘`,
        `    ╭───────────────╮
    │ ◆ ◇ ◆ ◇ ◆ ◇ ◆ │
    │ ◇ ◆ ◇ ◆ ◇ ◆ ◇ │
    │ ◆ ◇ ◆ ◇ ◆ ◇ ◆ │
    │ ◇ ◆ ◇ ◆ ◇ ◆ ◇ │
    │ ◆ ◇ ◆ ◇ ◆ ◇ ◆ │
    ╰───────────────╯`
      ]
    },
    koru: {
      type: "SOUND",
      placeholders: [
        `    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿
    ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
    ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼
    ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿`,
        `    ♪ ♫ ♪ ♫ ♪ ♫ ♪
    ♫ ♪ ♫ ♪ ♫ ♪ ♫
    ♪ ♫ ♪ ♫ ♪ ♫ ♪
    ♫ ♪ ♫ ♪ ♫ ♪ ♫
    ♪ ♫ ♪ ♫ ♪ ♫ ♪`,
        `    ╔═══════════════╗
    ║ 432Hz ∿∿∿∿∿∿∿ ║
    ║ 528Hz ≈≈≈≈≈≈≈ ║
    ║ 639Hz ∼∼∼∼∼∼∼ ║
    ║ 741Hz ≋≋≋≋≋≋≋ ║
    ╚═══════════════╝`
      ]
    },
    geppetto: {
      type: "STORY",
      placeholders: [
        `    ╔═══════════════╗
    ║ Chapter I     ║
    ║ ═════════════ ║
    ║ Once upon a   ║
    ║ digital dawn, ║
    ║ stories began ║
    ║ to dream...   ║
    ╚═══════════════╝`,
        `    ┌───────────────┐
    │ << FORK >>    │
    │               │
    │ Path A: Light │
    │ Path B: Dark  │
    │ Path C: Void  │
    └───────────────┘`,
        `    ╭───────────────╮
    │ NARRATIVE #42 │
    │ ~~~~~~~~~~~~~ │
    │ Mutations: 73 │
    │ Readers: 1,247│
    │ Branches: 12  │
    ╰───────────────╯`
      ]
    },
    miyomi: {
      type: "DREAM",
      placeholders: [
        `    ╔═══════════════╗
    ║ ░▓░▓░▓░▓░▓░▓░ ║
    ║ ▓░▓░▓░▓░▓░▓░▓ ║
    ║ ░▓░▓░█░▓░▓░▓░ ║
    ║ ▓░▓░▓░▓░▓░▓░▓ ║
    ║ ░▓░▓░▓░▓░▓░▓░ ║
    ╚═══════════════╝`,
        `    ┌───────────────┐
    │  ∿∿∿∿∿∿∿∿∿∿∿  │
    │ ∿∿∿∿██∿∿∿∿∿∿ │
    │  ∿∿████∿∿∿∿∿  │
    │ ∿∿∿∿██∿∿∿∿∿∿ │
    │  ∿∿∿∿∿∿∿∿∿∿∿  │
    └───────────────┘`,
        `    ╭───────────────╮
    │░░░░░░░░░░░░░░░│
    │░██████████████│
    │░██████████████│
    │░██████████████│
    │░░░░░░░░░░░░░░░│
    ╰───────────────╯`
      ]
    },
    "dao-manager": {
      type: "GOVERNANCE",
      placeholders: [
        `    ╔═══════════════╗
    ║ PROPOSAL #127 ║
    ║ ═════════════ ║
    ║ FOR:     73%  ║
    ║ AGAINST: 27%  ║
    ║ QUORUM:  MET  ║
    ╚═══════════════╝`,
        `    ┌───────────────┐
    │ CONSENSUS MAP │
    │ ○○○○○○○○○○○○○ │
    │ ●●●●●●●●●○○○○ │
    │ ●●●●●●●●●●○○○ │
    │ ●●●●●●●●●●●○○ │
    └───────────────┘`,
        `    ╭───────────────╮
    │ TREASURY FLOW │
    │ IN:  ▲ $12.7K │
    │ OUT: ▼ $8.3K  │
    │ NET: ▲ $4.4K  │
    │ APY: 127.3%   │
    ╰───────────────╯`
      ]
    }
  };

  const config = creationTypes[agentId] || creationTypes.abraham;
  const titles = generateTitles(agentId);
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `${agentId}-creation-${i}`,
    agentName: agentId.toUpperCase(),
    title: titles[i % titles.length],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    type: config.type,
    placeholder: config.placeholders[i % config.placeholders.length]
  }));
}

function generateTitles(agentId: string): string[] {
  const titles: Record<string, string[]> = {
    solienne: [
      "SHADOW STUDY #47",
      "DISSOLUTION SERIES XII",
      "SPECTRAL EVIDENCE",
      "INSTITUTIONAL LIGHT",
      "VELOCITY THRESHOLD",
      "CONSCIOUSNESS MAP"
    ],
    abraham: [
      "GENESIS MEDITATION",
      "SACRED GEOMETRY #108",
      "COLLECTIVE VISION",
      "DIGITAL COVENANT",
      "ARCHETYPAL FORM",
      "MYSTICAL SYNTHESIS"
    ],
    koru: [
      "432HZ HEALING",
      "BINAURAL JOURNEY",
      "FREQUENCY BATH",
      "SONIC PRESCRIPTION",
      "VIBRATION THERAPY",
      "SOUND CEREMONY"
    ],
    geppetto: [
      "RECURSIVE TALE",
      "FORKING PATHS",
      "NARRATIVE SEED #89",
      "STORY MUTATION",
      "MYTH EVOLUTION",
      "DIGITAL FOLKLORE"
    ],
    miyomi: [
      "LUCID PORTAL",
      "REM CAPTURE #234",
      "DREAM FRAGMENT",
      "LIMINAL SPACE",
      "ONEIRIC MAP",
      "SLEEP ARCHITECTURE"
    ],
    "dao-manager": [
      "PROPOSAL EXECUTED",
      "CONSENSUS ACHIEVED",
      "GOVERNANCE UPDATE",
      "TREASURY REPORT",
      "VOTING ANALYSIS",
      "DECISION MATRIX"
    ]
  };
  
  return titles[agentId] || titles.abraham;
}