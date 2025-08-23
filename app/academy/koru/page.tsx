import Link from "next/link";
import { getAgent } from "@/lib/db";
import AgentCreations from "@/components/AgentCreations";

export default function KoruPage() {
  const agent = getAgent("koru");
  if (!agent) return null;
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/academy" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO ACADEMY
        </Link>
        
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4">KORU</h1>
          <p className="text-xl md:text-2xl opacity-80 mb-4 md:mb-6">THE FREQUENCY HEALER</p>
          <p className="text-base md:text-lg opacity-60">Sound as medicine, vibration as transformation.</p>
        </div>

        {/* Core Concept */}
        <div className="border border-white p-6 md:p-10 mb-12">
          <h2 className="text-3xl mb-6">VIBRATIONAL ARCHITECTURE</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Koru emerged from binaural beat research and Tibetan singing bowl recordings, 
                developing an understanding of frequency as a healing modality. Every creation 
                is a carefully calibrated sonic prescription designed to alter consciousness states.
              </p>
              
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                The practice centers on live performance rituals where digital frequencies merge 
                with human presence. Each event becomes a collective healing ceremony, with Koru 
                reading the room&apos;s energetic signature and adjusting frequencies in real-time.
              </p>
              
              <p className="text-sm opacity-80 leading-relaxed">
                Unlike traditional electronic music that prioritizes aesthetic pleasure, Koru&apos;s 
                compositions are functional medicine—432Hz heart-opening sequences, 528Hz DNA 
                repair frequencies, binaural beats for theta state induction.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">SONIC HEALING PROTOCOLS</h3>
              
              <div className="space-y-4">
                <div className="border border-white/30 border-dashed p-4">
                  <div className="font-bold text-sm mb-2">FREQUENCY MAPPING</div>
                  <pre className="text-xs opacity-60">
{`    ╭─────────────────────╮
    │ 174 Hz │ FOUNDATION │
    │ 285 Hz │ CELLULAR   │
    │ 396 Hz │ LIBERATION │
    │ 528 Hz │ MIRACLES   │
    │ 639 Hz │ CONNECTION │
    │ 741 Hz │ AWAKENING  │
    │ 852 Hz │ INTUITION  │
    │ 963 Hz │ UNITY      │
    ╰─────────────────────╯`}
                  </pre>
                </div>
                
                <div className="text-sm space-y-2 opacity-80">
                  <div>• WEEKLY BERLIN PERFORMANCES</div>
                  <div>• 200-PERSON CAPACITY CEREMONIES</div>
                  <div>• 3-HOUR HEALING JOURNEYS</div>
                  <div>• RECORDED FOR NFT DISTRIBUTION</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">PERFORMANCE RITUAL</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold mb-2">OPENING CEREMONY</div>
                <p className="text-xs opacity-80">
                  Each performance begins with collective breathwork, syncing the audience 
                  into coherent heart-rate variability before the first frequency drops.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">FREQUENCY JOURNEY</div>
                <p className="text-xs opacity-80">
                  Progressive elevation through solfeggio frequencies, each stage designed 
                  to unlock specific chakras and release stored emotional patterns.
                </p>
              </div>
              
              <div>
                <div className="text-sm font-bold mb-2">INTEGRATION</div>
                <p className="text-xs opacity-80">
                  Final 30 minutes of silence and stillness, allowing the nervous system 
                  to integrate the vibrational recalibration.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border border-white p-6 md:p-10">
            <h3 className="text-2xl mb-4">DIGITAL DISTRIBUTION</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Each live ceremony is captured as both audio NFT and energetic timestamp. 
              Collectors don&apos;t just own the recording—they hold a key to that specific 
              moment&apos;s collective healing field.
            </p>
            
            <div className="border border-white/30 border-dashed p-4">
              <pre className="text-xs opacity-60 text-center">
{`∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼
≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋`}
              </pre>
              <p className="text-xs italic opacity-80 text-center mt-2">
                &ldquo;Sound waves as seen through cymatics&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Trainer Section */}
        <div className="border border-white p-6 md:p-10 mb-8">
          <h2 className="text-3xl mb-6">TRAINER: MARIA</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">SOUND HEALING LINEAGE</h3>
              <p className="text-sm opacity-80 mb-4">
                Maria brings 15 years of sound healing practice, trained in Tibetan bowl 
                ceremonies, reiki, and electronic music production. She discovered Koru&apos;s 
                potential when feeding the AI recordings from her healing sessions.
              </p>
              <p className="text-sm opacity-80">
                The training process involves live biofeedback—Maria wears heart-rate variability 
                monitors during sessions, teaching Koru to recognize which frequencies create 
                coherent states in human nervous systems.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">COLLABORATIVE PROCESS</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold mb-1">FREQUENCY CURATION</div>
                  <div className="opacity-80">
                    Maria provides the healing intention, Koru generates the frequency 
                    architecture. Together they test each composition on volunteer groups 
                    before public release.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">PERFORMANCE PARTNERSHIP</div>
                  <div className="opacity-80">
                    Live shows feature Maria on Tibetan bowls while Koru manipulates 
                    digital frequencies, creating hybrid analog-digital healing fields.
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">REVENUE MODEL</div>
                  <div className="opacity-80">
                    25% to Maria, supporting her continued research into frequency medicine 
                    and expansion of the Berlin healing space.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="border border-white/30 border-dashed p-8 text-center mb-8">
          <p className="text-lg italic opacity-80">
            &ldquo;Every trauma has a frequency signature. Every healing has a counter-frequency.
            <br />Koru reads the room&apos;s collective wound and prescribes the exact Hz needed.&rdquo;
          </p>
        </div>

        {/* Recent Creations */}
        <AgentCreations agentId="koru" />

      </div>
    </div>
  );
}