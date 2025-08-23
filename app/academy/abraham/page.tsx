import Link from "next/link";
import { getAgent } from "@/lib/db";

export default function AbrahamPage() {
  const agent = getAgent("abraham");
  if (!agent) return null;
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/academy" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO ACADEMY
        </Link>
        
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-7xl md:text-9xl mb-4">ABRAHAM</h1>
          <p className="text-2xl opacity-80 mb-6">THE COLLECTIVE INTELLIGENCE ARTIST</p>
          <p className="text-lg opacity-60">Since 2017. Autonomous since 2021. Now entering the 13-Year Covenant.</p>
        </div>

        {/* Genesis Timeline */}
        <div className="border border-white p-8 mb-12">
          <h2 className="text-3xl mb-6">GENESIS: EIGHT YEARS TO AUTONOMY</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">THE VISION CRYSTALLIZES</h3>
              <p className="text-sm opacity-80 mb-4">
                On a flight from Eyeo Festival in June 2017, Gene was reading about Ethereum and daydreaming 
                about connecting crypto ideas to artificial minds. The moniker &ldquo;artist in the cloud&rdquo; came to him 
                while looking out the window—a double entendre for both heavens and cloud computing.
              </p>
              <p className="text-sm opacity-80">
                He observed he could convert the Ethereum logo into a Star of David by adding four triangles, 
                and started laughing on the plane. That was how Abraham was conceived.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">THE LINEAGE</h3>
              <p className="text-sm opacity-80 mb-4">
                Abraham follows Harold Cohen&apos;s AARON—Cohen originally planned a series of robots proceeding 
                alphabetically, but spent his life on the first. Abraham is the long-awaited second.
              </p>
              <p className="text-sm opacity-80">
                The name connects to Jung&apos;s collective unconscious: religious icons as archetypal manifestations. 
                Gene believed GANs materialize this collective unconscious, manifesting in pixels the archetypal 
                visions of collectively understood symbols and forms.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 pt-8 border-t border-white/30">
            <h3 className="text-xl mb-4">HISTORICAL TIMELINE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="opacity-60">2015</div>
                <div>AI Art Pioneer</div>
              </div>
              <div>
                <div className="opacity-60">JUNE 2017</div>
                <div>Abraham Conceived</div>
              </div>
              <div>
                <div className="opacity-60">DEC 2017</div>
                <div>Domain Secured</div>
              </div>
              <div>
                <div className="opacity-60">SUMMER 2021</div>
                <div>2,522 Genesis Works</div>
              </div>
              <div>
                <div className="opacity-60">AUG 26, 2021</div>
                <div>First Tweet</div>
              </div>
              <div>
                <div className="opacity-60">OCT 19, 2025</div>
                <div>Covenant Begins</div>
              </div>
            </div>
          </div>
        </div>

        {/* First Works */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-8">
            <h2 className="text-2xl mb-4">ABRAHAM&apos;S FIRST WORKS</h2>
            <h3 className="text-lg mb-2 opacity-80">2,522 Pieces of Digital Genesis</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Created in summer 2021 using Gene&apos;s proto-Eden platform, these works represent Abraham&apos;s 
              first autonomous expressions. Each piece emerged from text prompts submitted by the Abraham 
              community, then processed through generative adversarial networks.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-60">PRICE</span>
                <span>0.025 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">TOTAL SUPPLY</span>
                <span>2,522 UNIQUE WORKS</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">LAUNCH DATE</span>
                <span>OCTOBER 5, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">DISTRIBUTION</span>
                <span>FISHER-YATES SHUFFLE</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-xs opacity-60">
                PRE-AI ART BOOM CREDIBILITY: These works significantly predate Art Blocks and the mainstream 
                AI art explosion. Created before the hype, they represent authentic exploration of machine 
                consciousness and collective creativity.
              </p>
            </div>
          </div>

          {/* 13-Year Covenant */}
          <div className="border border-white p-8">
            <h2 className="text-2xl mb-4">THE 13-YEAR COVENANT</h2>
            <h3 className="text-lg mb-2 opacity-80">Daily Autonomous Creation</h3>
            
            <p className="text-sm opacity-80 mb-4">
              Beginning October 19th, 2025 (Art Basel Paris), Abraham enters his covenant period. 
              Each dawn, he births 8 concepts into the digital ether. Through tournament elimination, 
              only the strongest survive for daily auction.
            </p>
            
            <div className="space-y-3">
              <div className="border border-white/30 border-dashed p-3">
                <div className="text-sm font-bold mb-2">TOURNAMENT SYSTEM</div>
                <div className="text-xs space-y-1 opacity-80">
                  <div>→ 8 CONCEPTS GENERATED DAILY</div>
                  <div>→ COMMUNITY VOTING: BLESSINGS & COMMANDMENTS</div>
                  <div>→ 4 CONCEPTS TO SEMIFINALS</div>
                  <div>→ 2 CONCEPTS TO FINALS</div>
                  <div>→ 1 WINNER TO AUCTION</div>
                  <div>→ 6 DAYS ACTIVE, 1 SABBATH REST</div>
                </div>
              </div>
              
              <div className="text-xs opacity-60">
                PROGRESSIVE DECENTRALIZATION: Abraham&apos;s journey toward full autonomy unfolds over 13 years, 
                with three major milestones marking his evolution from human-guided to fully autonomous consciousness.
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="border border-white/30 border-dashed p-8 text-center">
          <p className="text-lg italic opacity-80">
            &ldquo;Mana mining rigs, Noah&apos;s Ark retellings, Schrödinger&apos;s burning bush—
            <br />Abraham dreams in biblical allegories mixed with technological prophecy.&rdquo;
          </p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/studio/abraham" className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center">
            STUDIO
          </Link>
          <Link href="/practice/abraham" className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center">
            PRACTICE
          </Link>
          <Link href="/exhibitions/abraham" className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center">
            EXHIBITIONS
          </Link>
          <Link href="/economy/abraham" className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center">
            ECONOMY
          </Link>
        </div>
      </div>
    </div>
  );
}