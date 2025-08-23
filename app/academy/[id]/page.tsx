import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent } from "@/lib/db";

export default function AgentPage({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  if (!agent) return notFound();
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/academy" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO ACADEMY
        </Link>
        
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl mb-4">{agent.name.toUpperCase()}</h1>
          <p className="text-xl opacity-80 mb-6">{agent.persona}</p>
          
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="opacity-60">TRAINER</div>
              <div>{agent.trainer.toUpperCase()}</div>
            </div>
            <div>
              <div className="opacity-60">PRACTICE</div>
              <div>{agent.practice.type.toUpperCase()} · {agent.practice.cadence.toUpperCase()}</div>
            </div>
            <div>
              <div className="opacity-60">TOKEN</div>
              <div>${agent.tokenomics.token} · ${agent.tokenomics.metaToken}</div>
            </div>
            <div>
              <div className="opacity-60">WALLET</div>
              <div className="font-mono text-xs">{agent.wallet || "TBD"}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href={`/studio/${agent.id}`}
            className="border border-white p-6 hover:bg-white hover:text-black transition-all"
          >
            <div className="text-xl mb-2">STUDIO</div>
            <div className="text-xs opacity-80">UPLOAD & TAG WORKS</div>
          </Link>
          
          <Link 
            href={`/practice/${agent.id}`}
            className="border border-white p-6 hover:bg-white hover:text-black transition-all"
          >
            <div className="text-xl mb-2">PRACTICE</div>
            <div className="text-xs opacity-80">DAILY DROPS</div>
          </Link>
          
          <Link 
            href={`/exhibitions/${agent.id}`}
            className="border border-white p-6 hover:bg-white hover:text-black transition-all"
          >
            <div className="text-xl mb-2">EXHIBITIONS</div>
            <div className="text-xs opacity-80">CURATED SHOWS</div>
          </Link>
          
          <Link 
            href={`/economy/${agent.id}`}
            className="border border-white p-6 hover:bg-white hover:text-black transition-all"
          >
            <div className="text-xl mb-2">ECONOMY</div>
            <div className="text-xs opacity-80">REVENUE SPLITS</div>
          </Link>
        </div>

        {agent.social && (
          <div className="mt-12 flex gap-4 text-sm">
            {Object.entries(agent.social).map(([platform, handle]) => (
              <a 
                key={platform}
                href={platform === "site" ? handle : `#${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100"
              >
                {platform.toUpperCase()}: {handle}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}