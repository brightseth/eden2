import Link from "next/link";
import { getAgent } from "@/lib/db";
import TokenomicsSimulator from "@/components/TokenomicsSimulator";

export default function Economy({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  
  if (!agent) return null;
  
  const split = {
    edenTreasury: 0.25,
    agentTreasury: 0.25,
    humanCreator: 0.25,
    spiritHolders: 0.25
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href={`/academy/${agent.id}`} className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO {agent.name.toUpperCase()}
        </Link>
        
        <h1 className="text-5xl mb-2">ECONOMY</h1>
        <p className="text-xl opacity-60 mb-2">{agent.name.toUpperCase()}</p>
        <p className="text-sm opacity-40 mb-8">
          TOKENS: ${agent.tokenomics?.token ?? "TBD"} · META: ${agent.tokenomics?.metaToken ?? "SPIRIT"}
        </p>
        
        <TokenomicsSimulator split={split} agentName={agent.name} defaultAmount={1000} />
        
        <div className="mt-8 text-xs opacity-40">
          THIS IS A FRONTEND SIMULATOR. WILL BE REPLACED WITH ON-CHAIN ROUTER + TWAB MODULE.
        </div>
      </div>
    </div>
  );
}