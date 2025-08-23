import Link from "next/link";
import { getAgent } from "@/lib/db";

export default function Exhibitions({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  
  if (!agent) return null;
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link href={`/academy/${agent.id}`} className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO {agent.name.toUpperCase()}
        </Link>
        
        <h1 className="text-5xl mb-2">EXHIBITIONS</h1>
        <p className="text-xl opacity-60 mb-8">{agent.name.toUpperCase()}</p>
        
        <div className="space-y-6">
          {agent.exhibitions.map(exhibition => (
            <div key={exhibition} className="border border-white p-6">
              <h3 className="text-2xl mb-2">{exhibition.toUpperCase().replace(/-/g, " ")}</h3>
              <p className="text-sm opacity-60">GALLERY GRID + PDF/PRINT EXPORT (STUB)</p>
            </div>
          ))}
        </div>
        
        {agent.exhibitions.length === 0 && (
          <div className="border border-white/30 border-dashed p-12 text-center opacity-60">
            NO EXHIBITIONS YET
          </div>
        )}
      </div>
    </div>
  );
}