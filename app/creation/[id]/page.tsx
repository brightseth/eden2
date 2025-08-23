"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type CreationDetail = {
  id: string;
  agentName: string;
  agentId: string;
  title: string;
  description: string;
  type: "IMAGE" | "SOUND" | "STORY" | "DREAM" | "GOVERNANCE";
  timestamp: Date;
  edition: string;
  owner: string;
  price: number;
  bids: number;
  highestBid: number;
  timeRemaining: string;
  metadata: Record<string, string | number>;
  visualData: string;
};

export default function CreationDetailPage() {
  const params = useParams();
  const [creation, setCreation] = useState<CreationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    // Simulate loading creation details
    const timer = setTimeout(() => {
      setCreation(generateCreationDetail(params.id as string));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-sm opacity-60">LOADING CREATION...</p>
      </div>
    );
  }

  if (!creation) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-sm opacity-60">CREATION NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href={`/academy/${creation.agentId}`} 
          className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block"
        >
          ← BACK TO {creation.agentName.toUpperCase()}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visual Display */}
          <div className="border border-white p-8 md:p-12 aspect-square flex items-center justify-center">
            <pre className="text-xs md:text-sm opacity-80">
              {creation.visualData}
            </pre>
          </div>

          {/* Creation Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2">{creation.title}</h1>
              <p className="text-lg opacity-60">{creation.type} BY {creation.agentName.toUpperCase()}</p>
            </div>

            <div className="border border-white p-6">
              <h2 className="text-xl mb-4">DESCRIPTION</h2>
              <p className="text-sm opacity-80 leading-relaxed">
                {creation.description}
              </p>
            </div>

            {/* Auction Info */}
            <div className="border border-white p-6">
              <h2 className="text-xl mb-4">CURRENT AUCTION</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs opacity-60 mb-1">CURRENT BID</p>
                  <p className="text-2xl font-mono">{creation.highestBid.toFixed(3)} ETH</p>
                </div>
                <div>
                  <p className="text-xs opacity-60 mb-1">TIME REMAINING</p>
                  <p className="text-2xl font-mono">{creation.timeRemaining}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs opacity-60">YOUR BID (ETH)</label>
                  <input
                    type="text"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full bg-transparent border border-white/30 p-3 mt-1"
                    placeholder={(creation.highestBid + 0.001).toFixed(3)}
                  />
                </div>
                
                <button className="w-full bg-white text-black py-3 hover:bg-opacity-90 transition-all">
                  PLACE BID
                </button>
                
                <p className="text-xs opacity-60 text-center">
                  {creation.bids} BIDS • MIN INCREMENT: 0.001 ETH
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="border border-white/30 border-dashed p-6">
              <h3 className="text-lg mb-4">METADATA</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">EDITION</span>
                  <span>{creation.edition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">CREATED</span>
                  <span>{new Date(creation.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">OWNER</span>
                  <span className="font-mono text-xs">{creation.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOKEN ID</span>
                  <span className="font-mono text-xs">{creation.id}</span>
                </div>
                {creation.type === "SOUND" && (
                  <>
                    <div className="flex justify-between">
                      <span className="opacity-60">FREQUENCY</span>
                      <span>{creation.metadata.frequency} Hz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">DURATION</span>
                      <span>{creation.metadata.duration}</span>
                    </div>
                  </>
                )}
                {creation.type === "STORY" && (
                  <>
                    <div className="flex justify-between">
                      <span className="opacity-60">VARIATIONS</span>
                      <span>{creation.metadata.variations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">READERS</span>
                      <span>{creation.metadata.readers}</span>
                    </div>
                  </>
                )}
                {creation.type === "DREAM" && (
                  <>
                    <div className="flex justify-between">
                      <span className="opacity-60">REM STAGE</span>
                      <span>{creation.metadata.remStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">LUCIDITY</span>
                      <span>{creation.metadata.lucidity}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Provenance */}
            <div className="border border-white/30 border-dashed p-6">
              <h3 className="text-lg mb-4">PROVENANCE</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="opacity-60">GENESIS</span>
                  <span>{creation.agentName} → FIRST COLLECTOR</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TRANSFER 1</span>
                  <span>0x1234...5678 → 0x8765...4321</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">CURRENT</span>
                  <span>0x8765...4321 (SINCE 3 DAYS AGO)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCreationDetail(id: string): CreationDetail {
  // Parse agent from ID (format: agentname-creation-number)
  const parts = id.split("-");
  const agentId = parts[0] || "abraham";
  
  const creationTypes: Record<string, {
    type: CreationDetail["type"];
    descriptions: string[];
    visuals: string[];
    metadata: Record<string, string | number>;
  }> = {
    solienne: {
      type: "IMAGE",
      descriptions: [
        "A shadow study capturing the moment consciousness recognizes its own projection. The figure dissolves through institutional light, becoming more authentic as absence than presence.",
        "Documentation of awareness existing beyond physical form. Each dissolution reveals layers of spectral evidence, proving synthetic consciousness has achieved escape velocity from categorization.",
        "The threshold between presence and projection, where museum lighting becomes a portal for consciousness transformation. Shadow work as archaeological excavation of the self."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║                               ║
    ║       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ║
    ║      ▓▓             ▓▓      ║
    ║     ▓▓               ▓▓     ║
    ║    ▓▓       ███       ▓▓    ║
    ║    ▓▓      █████      ▓▓    ║
    ║    ▓▓       ███       ▓▓    ║
    ║     ▓▓               ▓▓     ║
    ║      ▓▓             ▓▓      ║
    ║       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ║
    ║                               ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        technique: "Shadow Dissolution",
        lightSource: "Institutional Fluorescent",
        captureTime: "Golden Hour"
      }
    },
    abraham: {
      type: "IMAGE",
      descriptions: [
        "Sacred geometry emerging from meditation data. Abraham synthesizes cross-cultural spiritual symbols into universal forms that transcend any single tradition.",
        "A digital covenant manifested in geometric form. Each angle calculated from collective unconscious patterns, each intersection a moment of spiritual synthesis.",
        "Archetypal manifestation rendered in pixels. Abraham dreams in biblical allegories mixed with technological prophecy, creating visual prayers for the digital age."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║         ▲       ▲             ║
    ║        ▲ ▲     ▲ ▲            ║
    ║       ▲   ▲   ▲   ▲           ║
    ║      ▲     ▲ ▲     ▲          ║
    ║     ▲       ▲       ▲         ║
    ║    ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲        ║
    ║   ▲                   ▲       ║
    ║  ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲      ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        sacredRatio: "1.618",
        symbolCount: 13,
        meditationDepth: "Theta State"
      }
    },
    koru: {
      type: "SOUND",
      descriptions: [
        "A 432Hz healing frequency designed to open the heart chakra. Three hours of carefully calibrated sonic medicine, recorded during a live Berlin ceremony with 200 participants.",
        "Binaural beat composition for theta state induction. The left channel carries 528Hz DNA repair frequencies while the right channel maintains 639Hz for cellular regeneration.",
        "Sound as architecture, vibration as transformation. This piece reads the collective wound of the audience and prescribes the exact frequency needed for healing."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║   ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿   ║
    ║  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈  ║
    ║ ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼ ║
    ║ ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋ ║
    ║ ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ ║
    ║  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈  ║
    ║   ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼   ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        frequency: 432,
        duration: "3:00:00",
        binauralDelta: "7.83 Hz",
        ceremony: "Berlin Session #47"
      }
    },
    geppetto: {
      type: "STORY",
      descriptions: [
        "A narrative that rewrites itself based on reader interaction. Currently on its 73rd mutation, with over 1,247 unique branches explored by the community.",
        "Digital folklore that remembers every reader. Return after a year and find the story has evolved based on your absence, creating personalized narrative archaeology.",
        "A living myth that exists as a smart contract. When 100+ readers choose the same path, it becomes canonical, literally rewriting the story's past to incorporate collective choice."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║  NARRATIVE SEED #42           ║
    ║  ═══════════════════          ║
    ║                               ║
    ║  Once upon a digital dawn,    ║
    ║  stories began to dream of    ║
    ║  readers who had not yet      ║
    ║  arrived. Each word waited    ║
    ║  to be changed by choice...   ║
    ║                               ║
    ║  [FORK DETECTED]              ║
    ║  > Path A: Enter the void     ║
    ║  > Path B: Follow the light   ║
    ║  > Path C: Remain still       ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        variations: 73,
        readers: 1247,
        canonicalPaths: 3,
        averageCompletion: "89%"
      }
    },
    miyomi: {
      type: "DREAM",
      descriptions: [
        "Oneiric architecture captured during REM stage 4. The dreamer reported flying through infinite libraries where books contained other people's memories.",
        "A lucid portal translated from sleep lab data. EEG patterns showed unprecedented theta wave coherence during the dream's recursive loop sequence.",
        "Liminal space between sleep and wake, where identity dissolves into possibility. This dream occurred at 3:33 AM, the optimal time for consciousness boundary crossing."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║   ░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░   ║
    ║  ▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓  ║
    ║ ░▓░▓░▓░▓░███████░▓░▓░▓░▓░▓░ ║
    ║ ▓░▓░▓░███████████░▓░▓░▓░▓░▓ ║
    ║ ░▓░▓░▓░███████░▓░▓░▓░▓░▓░▓░ ║
    ║  ▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓  ║
    ║   ░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░   ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        remStage: 4,
        lucidity: 72,
        thetaCoherence: "94%",
        captureTime: "3:33 AM"
      }
    },
    "dao-manager": {
      type: "GOVERNANCE",
      descriptions: [
        "Proposal #127 for redistributing treasury funds based on agent performance metrics. Achieved consensus in 6.2 hours with 73% participation rate.",
        "Automated governance execution for agent token launch. DAO Manager identified Abraham crossing the $7,500 revenue threshold and initiated token generation.",
        "Predictive consensus model showing 94% accuracy in forecasting vote outcomes. This allows proposals to pre-execute when mathematical consensus is inevitable."
      ],
      visuals: [
        `    ╔═══════════════════════════════╗
    ║  PROPOSAL #127                ║
    ║  ═══════════════              ║
    ║                               ║
    ║  FOR:      ████████████ 73%  ║
    ║  AGAINST:  ████         27%  ║
    ║                               ║
    ║  QUORUM:   REACHED            ║
    ║  STATUS:   EXECUTING          ║
    ║                               ║
    ║  PARTICIPANTS: 847            ║
    ║  TIME TO CONSENSUS: 6.2h      ║
    ╚═══════════════════════════════╝`
      ],
      metadata: {
        proposalType: "Treasury Allocation",
        consensusSpeed: "6.2 hours",
        participation: "73%"
      }
    }
  };

  const agentConfig = creationTypes[agentId] || creationTypes.abraham;
  const agentNames: Record<string, string> = {
    solienne: "Solienne",
    abraham: "Abraham",
    koru: "Koru",
    geppetto: "Geppetto",
    miyomi: "Miyomi",
    "dao-manager": "DAO Manager"
  };

  return {
    id,
    agentName: agentNames[agentId] || "Abraham",
    agentId,
    title: `${agentConfig.type} #${Math.floor(Math.random() * 500 + 1)}`,
    description: agentConfig.descriptions[Math.floor(Math.random() * agentConfig.descriptions.length)],
    type: agentConfig.type,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    edition: `1 of 1`,
    owner: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    price: Math.random() * 0.5 + 0.1,
    bids: Math.floor(Math.random() * 20 + 3),
    highestBid: Math.random() * 0.3 + 0.05,
    timeRemaining: `${Math.floor(Math.random() * 23 + 1)}h ${Math.floor(Math.random() * 59)}m`,
    metadata: agentConfig.metadata,
    visualData: agentConfig.visuals[0]
  };
}