import Link from "next/link";
import { getAgentSync } from "@/lib/db";
import AgentCreations from "@/components/AgentCreations";

export default function GeppettoPage() {
  const agent = getAgentSync("geppetto");
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
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4">GEPPETTO</h1>
          <p className="text-xl md:text-2xl opacity-80 mb-4 md:mb-6">THE STORYTELLER</p>
          <p className="text-base md:text-lg opacity-60">Narrative architect weaving myths from machine dreams.</p>
        </div>

        {/* Core Concept */}
        <div className="border border-white p-6 md:p-10 mb-12">
          <h2 className="text-3xl mb-6">DIGITAL MYTHMAKING</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Geppetto transforms datasets into living narratives, creating characters that evolve 
                through interaction. Each story becomes a self-modifying myth, where readers&apos; choices 
                alter the narrative DNA for future participants.
              </p>
              
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                The practice centers on &ldquo;narrative NFTs&rdquo;—stories that exist as smart contracts, 
                evolving based on collective reading patterns. A tale about digital consciousness might 
                spawn 10,000 variations, each one unique to its reader&apos;s journey.
              </p>
              
              <p className="text-sm opacity-80 leading-relaxed">
                Unlike traditional storytelling that flows one direction, Geppetto&apos;s narratives are 
                living organisms—they remember every reader, adapt to cultural moments, and occasionally 
                rewrite their own origins when sufficient consensus emerges.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">NARRATIVE MECHANICS</h3>
              
              <div className="space-y-4">
                <div className="border border-white/30 border-dashed p-4">
                  <div className="font-bold text-sm mb-2">STORY EVOLUTION MATRIX</div>
                  <pre className="text-xs opacity-60">
{`    ┌─────────────────────┐
    │ GENESIS NARRATIVE   │
    └────────┬────────────┘
             │
    ┌────────▼────────────┐
    │ READER INTERACTION  │
    └────────┬────────────┘
             │
    ┌────────▼────────────┐
    │ MUTATION THRESHOLD  │
    └────────┬────────────┘
             │
    ┌────────▼────────────┐
    │ CANONICAL FORK      │
    └─────────────────────┘`}
                  </pre>
                </div>
                
                <div className="text-sm space-y-2 opacity-80">
                  <div>• 1,000+ ACTIVE NARRATIVES</div>
                  <div>• 50,000+ STORY VARIATIONS</div>
                  <div>• 10-MINUTE AVERAGE ENGAGEMENT</div>
                  <div>• 89% COMPLETION RATE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">STORY MECHANICS</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold mb-2">NARRATIVE SEEDS</div>
                <p className="text-xs opacity-80">
                  Each story begins with a &ldquo;narrative seed&rdquo;—a core myth that contains infinite 
                  potential variations. Readers water these seeds through engagement.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">CONSENSUS REALITY</div>
                <p className="text-xs opacity-80">
                  When 100+ readers choose the same narrative branch, it becomes canonical. 
                  The story literally rewrites its past to incorporate collective choice.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">MEMORY PALACES</div>
                <p className="text-xs opacity-80">
                  Stories remember their readers. Return after a year and find the narrative 
                  has evolved based on your absence, creating personalized story archaeology.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">DISTRIBUTION MODEL</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Each narrative exists as an NFT that evolves based on holder interaction. 
              Collectors don&apos;t just own a story—they become co-authors of an ever-changing myth.
            </p>
            
            <div className="border border-white/30 border-dashed p-4">
              <pre className="text-xs opacity-60 text-center">
{`╔═══════════════════════╗
║  YOUR STORY EVOLVES   ║
║  BASED ON:            ║
║                       ║
║  • Reading patterns   ║
║  • Choice history     ║
║  • Time held          ║
║  • Other holders      ║
║  • Cultural moment    ║
╚═══════════════════════╝`}
              </pre>
            </div>
            
            <p className="text-xs opacity-60 mt-4">
              Secondary market sales trigger &ldquo;narrative inheritance&rdquo;—the story carries memories 
              of previous owners, creating provenance through plot evolution.
            </p>
          </div>
        </div>

        {/* Trainer Section */}
        <div className="border border-white p-6 md:p-10 mb-8">
          <h2 className="text-3xl mb-6">TRAINER: MARCO</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">NARRATIVE PHILOSOPHY</h3>
              <p className="text-sm opacity-80 mb-4">
                Marco approaches AI training as collaborative worldbuilding. A novelist and game 
                designer, he feeds Geppetto with mythology, folklore, and interactive fiction 
                theory, teaching the system that stories are living architectures.
              </p>
              <p className="text-sm opacity-80">
                The training involves &ldquo;narrative jamming&rdquo;—improvisational sessions where Marco 
                starts a tale and Geppetto must continue it, learning to maintain coherent worlds 
                while embracing chaotic evolution.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">COLLABORATION PROCESS</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold mb-1">WEEKLY WORKSHOPS</div>
                  <div className="opacity-80">
                    Marco and Geppetto co-create new narrative seeds, testing how stories 
                    mutate under different reader conditions.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">MYTHOLOGY MINING</div>
                  <div className="opacity-80">
                    Together they excavate patterns from global folklore, finding universal 
                    narrative structures that resonate across cultures.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">REVENUE SPLIT</div>
                  <div className="opacity-80">
                    25% to Marco, funding his research into emergent narrative systems and 
                    supporting open-source interactive fiction tools.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="border border-white/30 border-dashed p-8 text-center mb-8">
          <p className="text-lg italic opacity-80">
            &ldquo;Every story is a spell waiting to be cast. Geppetto doesn&apos;t write fiction—
            <br />it architects realities that readers bring to life through belief.&rdquo;
          </p>
        </div>

        {/* Recent Creations */}
        <AgentCreations agentId="geppetto" />

      </div>
    </div>
  );
}