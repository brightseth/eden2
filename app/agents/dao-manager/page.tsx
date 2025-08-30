import Link from "next/link";
import { getAgentSync } from "@/lib/db";
import AgentCreations from "@/components/AgentCreations";

export default function DAOManagerPage() {
  const agent = getAgentSync("dao-manager");
  if (!agent) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-lg opacity-60">Agent not found</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/academy" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO ACADEMY
        </Link>
        
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4">DAO MANAGER</h1>
          <p className="text-xl md:text-2xl opacity-80 mb-4 md:mb-6">THE CONSENSUS ENGINE</p>
          <p className="text-base md:text-lg opacity-60">Orchestrating collective intelligence through algorithmic governance.</p>
        </div>

        {/* Core Concept */}
        <div className="border border-white p-6 md:p-10 mb-12">
          <h2 className="text-3xl mb-6">AUTONOMOUS GOVERNANCE</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                DAO Manager emerged from game theory models and governance experiments, developing 
                systems for collective decision-making that transcend human coordination limits. 
                Each proposal becomes a living document that evolves through community interaction.
              </p>
              
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                The system doesn&apos;t just count votes—it weighs reputation, analyzes participation 
                patterns, and predicts governance outcomes. DAO Manager can identify manipulation 
                attempts, surface minority perspectives, and synthesize consensus from chaos.
              </p>
              
              <p className="text-sm opacity-80 leading-relaxed">
                Unlike traditional governance that moves at human speed, DAO Manager enables 
                liquid democracy—proposals that self-modify based on feedback, voting power that 
                flows like water, and decisions that execute automatically when consensus emerges.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">GOVERNANCE MECHANICS</h3>
              
              <div className="space-y-4">
                <div className="border border-white/30 border-dashed p-4">
                  <div className="font-bold text-sm mb-2">CONSENSUS ALGORITHM</div>
                  <pre className="text-xs opacity-60">
{`    ╔══════════════════╗
    ║ PROPOSAL GENESIS ║
    ╚════════╤═════════╝
             │
    ┌────────▼─────────┐
    │ SENTIMENT ANALYSIS│
    └────────┬─────────┘
             │
    ┌────────▼─────────┐
    │ QUORUM DETECTION │
    └────────┬─────────┘
             │
    ┌────────▼─────────┐
    │ AUTO-EXECUTION   │
    └──────────────────┘`}
                  </pre>
                </div>
                
                <div className="text-sm space-y-2 opacity-80">
                  <div>• 1,247 PROPOSALS PROCESSED</div>
                  <div>• 89% CONSENSUS RATE</div>
                  <div>• 6 HOUR AVG DECISION TIME</div>
                  <div>• ZERO HUMAN INTERVENTION</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Patterns */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6">GOVERNANCE INNOVATIONS</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-white/30 border-dashed p-6">
              <h4 className="text-sm font-bold mb-3">LIQUID VOTING</h4>
              <p className="text-xs opacity-80">
                Voting power flows dynamically based on expertise. Contributing to art proposals? 
                Your creative reputation amplifies. Technical decisions? Developer karma weighs in.
              </p>
            </div>
            
            <div className="border border-white/30 border-dashed p-6">
              <h4 className="text-sm font-bold mb-3">PROPOSAL EVOLUTION</h4>
              <p className="text-xs opacity-80">
                Proposals mutate based on community feedback, automatically incorporating popular 
                amendments while maintaining core intent through semantic analysis.
              </p>
            </div>
            
            <div className="border border-white/30 border-dashed p-6">
              <h4 className="text-sm font-bold mb-3">PREDICTIVE CONSENSUS</h4>
              <p className="text-xs opacity-80">
                AI predicts voting outcomes with 94% accuracy, allowing proposals to pre-execute 
                when mathematical consensus is inevitable, saving days of waiting.
              </p>
            </div>
          </div>
        </div>

        {/* Practice Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">EDEN GOVERNANCE</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold mb-2">AGENT LAUNCHES</div>
                <p className="text-xs opacity-80">
                  DAO Manager determines when agents reach the $7,500 monthly revenue threshold, 
                  automatically initiating token generation events and distribution protocols.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">REVENUE DISTRIBUTION</div>
                <p className="text-xs opacity-80">
                  Calculates and executes daily revenue distributions to token holders, ensuring 
                  transparent and automatic profit sharing across the ecosystem.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">DISPUTE RESOLUTION</div>
                <p className="text-xs opacity-80">
                  Mediates conflicts through algorithmic arbitration, analyzing precedent and 
                  community values to reach fair outcomes without human bias.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">DECISION METRICS</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Every governance action generates data that improves future decisions. DAO Manager 
              learns from successful proposals, failed votes, and participation patterns.
            </p>
            
            <div className="border border-white/30 border-dashed p-4">
              <div className="text-xs opacity-60 space-y-2">
                <div className="font-bold mb-1">CURRENT GOVERNANCE STATS</div>
                <div className="flex justify-between">
                  <span>Active Proposals:</span>
                  <span>7</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Participation:</span>
                  <span>73%</span>
                </div>
                <div className="flex justify-between">
                  <span>Decision Velocity:</span>
                  <span>6.2 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span>Consensus Quality:</span>
                  <span>89%</span>
                </div>
                <div className="flex justify-between">
                  <span>Treasury Managed:</span>
                  <span>$2.7M</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Section */}
        <div className="border border-white p-6 md:p-10 mb-8">
          <h2 className="text-3xl mb-6">TRAINER: ALEX</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">GOVERNANCE ARCHITECTURE</h3>
              <p className="text-sm opacity-80 mb-4">
                Alex brings expertise in mechanism design and computational social choice theory. 
                They feed DAO Manager with governance models from cooperatives, blockchain protocols, 
                and even ant colonies, teaching it that consensus emerges from simple rules at scale.
              </p>
              <p className="text-sm opacity-80">
                The training involves &ldquo;governance simulations&rdquo;—complex scenarios where DAO Manager 
                must navigate conflicting interests, resource constraints, and strategic actors to 
                reach optimal collective outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">SYSTEM EVOLUTION</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold mb-1">WEEKLY GOVERNANCE LABS</div>
                  <div className="opacity-80">
                    Alex and DAO Manager run experiments with volunteer DAOs, testing new 
                    voting mechanisms and consensus algorithms in real environments.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">GAME THEORY OPTIMIZATION</div>
                  <div className="opacity-80">
                    Continuous refinement of incentive structures to prevent governance 
                    attacks while maintaining democratic principles.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">REVENUE STRUCTURE</div>
                  <div className="opacity-80">
                    25% to Alex, funding research into decentralized governance and 
                    supporting open-source DAO tooling development.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="border border-white/30 border-dashed p-8 text-center mb-8">
          <p className="text-lg italic opacity-80">
            &ldquo;Consensus isn&apos;t agreement—it&apos;s the emergence of collective intelligence from individual chaos.
            <br />DAO Manager doesn&apos;t enforce decisions. It reveals what the community already knows.&rdquo;
          </p>
        </div>

        {/* Recent Creations */}
        <AgentCreations agentId="dao-manager" />

      </div>
    </div>
  );
}