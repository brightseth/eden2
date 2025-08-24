import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent } from "@/lib/db";

export default function AgentPage({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  if (!agent) return notFound();
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/academy" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO ACADEMY
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Agent Identity */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-6xl md:text-8xl mb-4">{agent.name.toUpperCase()}</h1>
              {agent.personality && (
                <div className="text-lg opacity-80 mb-4">{agent.personality}</div>
              )}
              <p className="text-xl opacity-80 mb-6">{agent.persona}</p>
              {agent.bio && (
                <p className="text-sm opacity-60 leading-relaxed">{agent.bio}</p>
              )}
            </div>

            {/* Practice Details */}
            <div className="border border-white p-6">
              <h2 className="text-2xl mb-4">PRACTICE</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="opacity-60 mb-1">TYPE</div>
                  <div>{agent.practice.type.toUpperCase()}</div>
                </div>
                <div>
                  <div className="opacity-60 mb-1">CADENCE</div>
                  <div>{agent.practice.cadence.toUpperCase()}</div>
                </div>
                <div>
                  <div className="opacity-60 mb-1">METHODS</div>
                  <div>{agent.practice.methods.join(" • ")}</div>
                </div>
                {agent.practice.skuSet && (
                  <div>
                    <div className="opacity-60 mb-1">PRODUCTS</div>
                    <div>{agent.practice.skuSet.join(" • ").toUpperCase()}</div>
                  </div>
                )}
              </div>
              {agent.practice.motto && (
                <div className="mt-6 pt-4 border-t border-white/30">
                  <div className="text-xs opacity-40 mb-1">MOTTO</div>
                  <div className="italic">{agent.practice.motto}</div>
                </div>
              )}
            </div>

            {/* Recent Works */}
            {agent.recentWorks && agent.recentWorks.length > 0 && (
              <div className="border border-white p-6">
                <h2 className="text-2xl mb-4">RECENT WORKS</h2>
                <div className="space-y-3">
                  {agent.recentWorks.map((work, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
                      <div>
                        <div className="font-medium">{work.title}</div>
                        <div className="text-xs opacity-60">{work.type.toUpperCase()}</div>
                      </div>
                      <div className="text-xs opacity-60">{work.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trainer Info */}
            <div className="border border-white p-6">
              <h2 className="text-2xl mb-4">TRAINER</h2>
              <div className="text-lg mb-2">{agent.trainer.toUpperCase()}</div>
              {agent.trainerBio && (
                <p className="text-sm opacity-60 leading-relaxed">{agent.trainerBio}</p>
              )}
            </div>
          </div>

          {/* Right Column - Navigation & Details */}
          <div className="space-y-6">
            {/* Navigation */}
            <div className="grid gap-3">
              <Link 
                href={`/studio/${agent.id}`}
                className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center"
              >
                <div className="text-lg mb-1">STUDIO</div>
                <div className="text-xs opacity-60">UPLOAD & TAG</div>
              </Link>
              
              <Link 
                href={`/practice/${agent.id}`}
                className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center"
              >
                <div className="text-lg mb-1">PRACTICE</div>
                <div className="text-xs opacity-60">DAILY DROPS</div>
              </Link>
              
              <Link 
                href={`/exhibitions/${agent.id}`}
                className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center"
              >
                <div className="text-lg mb-1">EXHIBITIONS</div>
                <div className="text-xs opacity-60">SHOWS</div>
              </Link>
              
              <Link 
                href={`/economy/${agent.id}`}
                className="border border-white p-4 hover:bg-white hover:text-black transition-all text-center"
              >
                <div className="text-lg mb-1">ECONOMY</div>
                <div className="text-xs opacity-60">SPLITS</div>
              </Link>
            </div>

            {/* Technical Details */}
            <div className="border border-white/30 border-dashed p-4">
              <div className="space-y-3 text-sm">
                <div>
                  <div className="opacity-60">TOKEN</div>
                  <div>${agent.tokenomics.token} • ${agent.tokenomics.metaToken}</div>
                </div>
                <div>
                  <div className="opacity-60">WALLET</div>
                  <div className="font-mono text-xs">{agent.wallet || "TBD"}</div>
                </div>
                <div>
                  <div className="opacity-60">REVENUE</div>
                  <div>{agent.tokenomics.revenueStreams.join(" • ")}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {agent.social && (
              <div className="border border-white/30 border-dashed p-4">
                <div className="text-sm opacity-60 mb-2">SOCIAL</div>
                <div className="space-y-2 text-sm">
                  {Object.entries(agent.social).map(([platform, handle]) => (
                    <div key={platform}>
                      <a 
                        href={platform === "site" ? handle : `#${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {platform.toUpperCase()}: {platform === "site" ? handle : handle}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}