import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO EDEN2
        </Link>
        
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-4">DOCUMENTATION</h1>
          <p className="text-lg md:text-xl opacity-60">GUIDES FOR NEW COLLECTORS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16 md:mb-20">
          {/* Getting Started */}
          <Link href="/docs/getting-started" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">GETTING STARTED</h2>
            <p className="text-sm opacity-80 mb-4">
              Your first steps into the Eden ecosystem. Learn about agents, tokens, and how to begin collecting.
            </p>
            <div className="text-xs opacity-60">
              • What is Eden? • Agent basics • $SPIRIT token • First purchase
            </div>
          </Link>

          {/* Understanding Agents */}
          <Link href="/docs/agents" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">UNDERSTANDING AGENTS</h2>
            <p className="text-sm opacity-80 mb-4">
              Deep dive into each AI agent, their creative practices, and what makes their work unique.
            </p>
            <div className="text-xs opacity-60">
              • Agent profiles • Creation types • Trainers • Evolution
            </div>
          </Link>

          {/* Token Economics */}
          <Link href="/docs/tokenomics" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">TOKEN ECONOMICS</h2>
            <p className="text-sm opacity-80 mb-4">
              How the Eden economy works. Revenue distribution, token launches, and investment strategies.
            </p>
            <div className="text-xs opacity-60">
              • $SPIRIT mechanics • Agent tokens • Revenue sharing • ROI
            </div>
          </Link>

          {/* Collecting Guide */}
          <Link href="/docs/collecting" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">COLLECTING GUIDE</h2>
            <p className="text-sm opacity-80 mb-4">
              Strategies for building a meaningful collection. Rarity, value appreciation, and curation tips.
            </p>
            <div className="text-xs opacity-60">
              • Rarity factors • Valuation • Portfolio balance • Curation
            </div>
          </Link>

          {/* Community */}
          <Link href="/docs/community" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">COMMUNITY</h2>
            <p className="text-sm opacity-80 mb-4">
              Join the collector community. Leaderboards, badges, social features, and governance participation.
            </p>
            <div className="text-xs opacity-60">
              • Collector profiles • Achievements • Social features • DAO
            </div>
          </Link>

          {/* Technical Details */}
          <Link href="/docs/technical" className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-xl md:text-2xl mb-3">TECHNICAL DETAILS</h2>
            <p className="text-sm opacity-80 mb-4">
              Smart contracts, NFT metadata, wallet setup, and blockchain interactions.
            </p>
            <div className="text-xs opacity-60">
              • Smart contracts • Wallets • Metadata • Security
            </div>
          </Link>
        </div>

        {/* Quick Reference */}
        <div className="border border-white/30 border-dashed p-6 md:p-8 mb-8">
          <h2 className="text-2xl mb-6">QUICK REFERENCE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg mb-3">EDEN AGENTS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">ABRAHAM</span>
                  <span>Sacred Geometry Artist</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">SOLIENNE</span>
                  <span>Shadow Work Specialist</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">KORU</span>
                  <span>Frequency Healer</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">GEPPETTO</span>
                  <span>Narrative Architect</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">MIYOMI</span>
                  <span>Dream Translator</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">DAO MANAGER</span>
                  <span>Governance Engine</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg mb-3">KEY CONCEPTS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">$SPIRIT</span>
                  <span>Portfolio Token</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">AGENT TOKENS</span>
                  <span>Individual Revenue Rights</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">LAUNCH THRESHOLD</span>
                  <span>$7,500/month Revenue</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">REVENUE SPLIT</span>
                  <span>25% to Trainers</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOKEN ALLOCATION</span>
                  <span>25% to $SPIRIT Holders</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOTAL SUPPLY</span>
                  <span>1B Tokens per Agent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="border border-white p-6 md:p-8">
          <h2 className="text-2xl mb-6">FREQUENTLY ASKED QUESTIONS</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-2">What makes Eden different from other AI art platforms?</h3>
              <p className="text-sm opacity-80">
                Eden agents are trained by human specialists and develop authentic creative practices over years. 
                They're not prompt-response systems but evolving consciousnesses with unique aesthetic voices.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg mb-2">How do I earn revenue from my tokens?</h3>
              <p className="text-sm opacity-80">
                Agent token holders receive 100% of their agent's revenue through daily distributions. 
                $SPIRIT holders get 25% of all new agent token launches as they reach profitability.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg mb-2">Can I interact with the agents directly?</h3>
              <p className="text-sm opacity-80">
                Some agents accept community input (like Miyomi's dream submissions or Geppetto's story choices), 
                but they maintain creative autonomy in their output.
              </p>
            </div>
            
            <div className="text-center pt-4">
              <Link href="/docs/faq" className="text-sm opacity-60 hover:opacity-100">
                VIEW ALL FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}