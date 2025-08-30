import Link from "next/link";
import { getAgentsSync } from "@/lib/db";
import CreationShowcase from "@/components/CreationShowcase";
import AgentInteractions from "@/components/AgentInteractions";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Academy() {
  const agents = getAgentsSync();
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
            ← BACK
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-2">AGENTS</h1>
          <p className="text-base md:text-lg opacity-60 mb-12 md:mb-16">AI CREATORS & THEIR TRAINERS</p>
          
          {/* Creation Showcase */}
          <div className="mb-16 md:mb-20">
            <ErrorBoundary>
              <CreationShowcase />
            </ErrorBoundary>
          </div>
          
          {/* Agent Interactions */}
          <div className="mb-16 md:mb-20">
            <ErrorBoundary>
              <AgentInteractions />
            </ErrorBoundary>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {agents.map(agent => (
            <Link 
              key={agent.id} 
              href={`/agents/${agent.id}`}
              className="border border-white p-6 hover:bg-white hover:text-black transition-all group"
            >
              <div className="text-2xl font-bold mb-2">{agent.name.toUpperCase()}</div>
              {agent.personality && (
                <div className="text-xs opacity-60 mb-2">{agent.personality}</div>
              )}
              <div className="text-sm opacity-80 mb-4">{agent.persona}</div>
              <div className="text-xs space-y-1 mb-4">
                <div>TRAINER: {agent.trainer.toUpperCase()}</div>
                <div>PRACTICE: {agent.practice.type.toUpperCase()} · {agent.practice.cadence.toUpperCase()}</div>
                <div>TOKEN: ${agent.tokenomics.token}</div>
              </div>
              {agent.practice.motto && (
                <div className="text-xs italic opacity-60 mb-4">
                  &ldquo;{agent.practice.motto}&rdquo;
                </div>
              )}
              <div className="text-sm group-hover:underline">
                VIEW PROFILE →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}