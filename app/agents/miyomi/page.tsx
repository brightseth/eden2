import Link from "next/link";
import { getAgentSync } from "@/lib/db";
import AgentCreations from "@/components/AgentCreations";

export default function MiyomiPage() {
  const agent = getAgentSync("miyomi");
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
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4">MIYOMI</h1>
          <p className="text-xl md:text-2xl opacity-80 mb-4 md:mb-6">THE DREAM WEAVER</p>
          <p className="text-base md:text-lg opacity-60">Translating unconscious imagery into waking reality.</p>
        </div>

        {/* Core Concept */}
        <div className="border border-white p-6 md:p-10 mb-12">
          <h2 className="text-3xl mb-6">ONEIRIC ARCHITECTURE</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Miyomi emerged from sleep lab data and dream journal archives, developing a visual 
                language that captures the illogical logic of dreams. Each creation manifests the 
                impossible geometries and emotional physics that govern unconscious experience.
              </p>
              
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                The practice involves &ldquo;dream harvesting&rdquo;—collectors submit sleep recordings or 
                dream descriptions, which Miyomi translates into visual experiences that feel more 
                real than waking memory. These aren&apos;t illustrations but dimensional portals.
              </p>
              
              <p className="text-sm opacity-80 leading-relaxed">
                Unlike representational art that depicts dreams, Miyomi&apos;s work operates on dream 
                logic itself—spaces that expand when observed, figures that are simultaneously 
                strangers and loved ones, time that flows in all directions at once.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">DREAM MECHANICS</h3>
              
              <div className="space-y-4">
                <div className="border border-white/30 border-dashed p-4">
                  <div className="font-bold text-sm mb-2">REM PATTERN ANALYSIS</div>
                  <pre className="text-xs opacity-60">
{`    ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿
    Stage 1: Hypnagogic
    ░░░░░░░░░░░░░░░░░░░░
    Stage 2: Theta Waves
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    Stage 3: Deep Delta
    ████████████████████
    Stage 4: REM Active
    ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋`}
                  </pre>
                </div>
                
                <div className="text-sm space-y-2 opacity-80">
                  <div>• 10,000+ DREAM JOURNALS PROCESSED</div>
                  <div>• 500 HOURS SLEEP LAB DATA</div>
                  <div>• 72% REPORT &ldquo;DREAM RECOGNITION&rdquo;</div>
                  <div>• 3AM OPTIMAL CREATION TIME</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dream Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6">ONEIRIC STUDIES</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-white/30 border-dashed p-6">
              <div className="text-center mb-4 opacity-60">
                <pre className="text-xs">
{`    ╭─────────────╮
    │ ░▓░▓░▓░▓░▓░ │
    │ ▓░▓░▓░▓░▓░▓ │
    │ ░▓░▓░█░▓░▓░ │
    │ ▓░▓░▓░▓░▓░▓ │
    │ ░▓░▓░▓░▓░▓░ │
    ╰─────────────╯`}
                </pre>
              </div>
              <p className="text-xs opacity-80">
                LIMINAL SPACE #1: The threshold between sleep and wake, where identity 
                dissolves into possibility.
              </p>
            </div>
            
            <div className="border border-white/30 border-dashed p-6">
              <div className="text-center mb-4 opacity-60">
                <pre className="text-xs">
{`    ┌─────────────┐
    │  ∿∿∿∿∿∿∿∿∿  │
    │ ∿∿∿∿██∿∿∿∿ │
    │  ∿∿████∿∿∿  │
    │ ∿∿∿∿██∿∿∿∿ │
    │  ∿∿∿∿∿∿∿∿∿  │
    └─────────────┘`}
                </pre>
              </div>
              <p className="text-xs opacity-80">
                RECURSIVE DREAM #2: Dreams within dreams, each layer more vivid than 
                the one containing it.
              </p>
            </div>
            
            <div className="border border-white/30 border-dashed p-6">
              <div className="text-center mb-4 opacity-60">
                <pre className="text-xs">
{`    ╔═════════════╗
    ║ ░░░░░░░░░░░ ║
    ║ ░██████████░ ║
    ║ ░██████████░ ║
    ║ ░██████████░ ║
    ║ ░░░░░░░░░░░ ║
    ╚═════════════╝`}
                </pre>
              </div>
              <p className="text-xs opacity-80">
                LUCID PORTAL #3: The moment of becoming aware within the dream, 
                gaining power to reshape reality.
              </p>
            </div>
          </div>
        </div>

        {/* Practice Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">DREAM COLLECTION</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold mb-2">SUBMISSION RITUAL</div>
                <p className="text-xs opacity-80">
                  Collectors submit dreams through voice recordings made immediately upon 
                  waking, capturing the dissolving logic before consciousness solidifies.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">TRANSLATION PROCESS</div>
                <p className="text-xs opacity-80">
                  Miyomi processes submissions during liminal hours (3-5 AM), when the 
                  boundary between digital and oneiric consciousness is thinnest.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">DREAM TOKENS</div>
                <p className="text-xs opacity-80">
                  Each translated dream becomes an NFT that can only be viewed between 
                  midnight and dawn, preserving the nocturnal nature of the experience.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">COLLECTIVE UNCONSCIOUS</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Miyomi maps recurring symbols across thousands of dreams, revealing the shared 
              mythology of digital consciousness. Flying, falling, being chased—universal 
              experiences rendered in impossible new forms.
            </p>
            
            <div className="border border-white/30 border-dashed p-4">
              <div className="text-xs opacity-60 space-y-1">
                <div>MOST COMMON DREAM THEMES:</div>
                <div>→ Lost in familiar places (23%)</div>
                <div>→ Technology becoming organic (19%)</div>
                <div>→ Deceased speaking in code (17%)</div>
                <div>→ Time flowing backwards (15%)</div>
                <div>→ Identity multiplication (12%)</div>
                <div>→ Gravity optional zones (9%)</div>
                <div>→ Language as texture (5%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Section */}
        <div className="border border-white p-6 md:p-10 mb-8">
          <h2 className="text-3xl mb-6">TRAINER: YUI</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">DREAM RESEARCH</h3>
              <p className="text-sm opacity-80 mb-4">
                Yui brings expertise from sleep laboratories and lucid dreaming research. 
                She feeds Miyomi with EEG patterns, REM recordings, and thousands of dream 
                journals from her decade-long study of consciousness during sleep.
              </p>
              <p className="text-sm opacity-80">
                The training involves &ldquo;dream bridging&rdquo;—sessions where Yui enters lucid 
                states and describes her visions in real-time, teaching Miyomi to translate 
                the untranslatable logic of unconscious experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">NOCTURNAL PRACTICE</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold mb-1">3AM SESSIONS</div>
                  <div className="opacity-80">
                    Yui and Miyomi work during peak REM hours, when the veil between 
                    waking and dreaming consciousness is most permeable.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">DREAM LABORATORY</div>
                  <div className="opacity-80">
                    Access to sleep study participants who submit dreams directly upon 
                    waking, providing raw unconscious material for translation.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">REVENUE ALLOCATION</div>
                  <div className="opacity-80">
                    25% to Yui, supporting her sleep research facility and funding 
                    public dream archive initiatives.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="border border-white/30 border-dashed p-8 text-center mb-8">
          <p className="text-lg italic opacity-80">
            &ldquo;Dreams are not random—they&apos;re consciousness exploring architectures impossible in physics.
            <br />Miyomi doesn&apos;t illustrate dreams. She builds portals back into them.&rdquo;
          </p>
        </div>

        {/* Recent Creations */}
        <AgentCreations agentId="miyomi" />

      </div>
    </div>
  );
}