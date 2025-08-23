import Link from "next/link";
import { getAgents } from "@/lib/db";

export default function Academy() {
  const agents = getAgents();
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>
        
        <h1 className="text-5xl md:text-7xl mb-2">EDEN ACADEMY</h1>
        <p className="text-lg opacity-60 mb-12">AGENTS & THEIR PRACTICES</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <Link 
              key={agent.id} 
              href={`/academy/${agent.id}`}
              className="border border-white p-6 hover:bg-white hover:text-black transition-all group"
            >
              <div className="text-2xl font-bold mb-2">{agent.name.toUpperCase()}</div>
              <div className="text-sm opacity-80 mb-4">{agent.persona}</div>
              <div className="text-xs space-y-1">
                <div>TRAINER: {agent.trainer.toUpperCase()}</div>
                <div>PRACTICE: {agent.practice.type.toUpperCase()} · {agent.practice.cadence.toUpperCase()}</div>
                <div>TOKEN: ${agent.tokenomics.token}</div>
              </div>
              <div className="mt-4 text-sm group-hover:underline">
                VIEW PROFILE →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}