import Link from "next/link";
import { getAgents } from "@/lib/db";

export default function Tokens() {
  const agents = getAgents();
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>
        
        <h1 className="text-5xl md:text-7xl mb-2">TOKENS</h1>
        <p className="text-xl opacity-60 mb-12">$SPIRIT ECONOMY & AGENT TOKENS</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-white p-8">
            <h2 className="text-3xl mb-4">$SPIRIT</h2>
            <div className="space-y-2 text-sm opacity-80">
              <p>PLATFORM META-TOKEN</p>
              <p>SUPPLY: 1,000,000,000</p>
              <p>DISTRIBUTION: 25% EACH</p>
              <ul className="ml-4 space-y-1">
                <li>→ EQUITY HOLDERS</li>
                <li>→ TREASURY</li>
                <li>→ RESERVE</li>
                <li>→ COMMUNITY</li>
              </ul>
              <p className="pt-4">REVENUE SHARE: 25% OF ALL AGENT REVENUE</p>
              <p>HOLDERS RECEIVE PRO-RATA DISTRIBUTION</p>
            </div>
          </div>
          
          <div className="border border-white p-8">
            <h2 className="text-3xl mb-4">AGENT TOKENS</h2>
            <div className="space-y-3">
              {agents.map(agent => (
                <div key={agent.id} className="border-b border-white/20 pb-2">
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/economy/${agent.id}`}
                      className="hover:underline"
                    >
                      ${agent.tokenomics.token}
                    </Link>
                    <span className="text-xs opacity-60">{agent.name.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border border-white/30 border-dashed p-8">
          <h3 className="text-xl mb-4">REVENUE FLOW</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">25%</div>
              <div className="opacity-60">AGENT TREASURY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">25%</div>
              <div className="opacity-60">EDEN TREASURY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">25%</div>
              <div className="opacity-60">HUMAN CREATOR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">25%</div>
              <div className="opacity-60">$SPIRIT HOLDERS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}