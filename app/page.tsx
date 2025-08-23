import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-7xl md:text-9xl mb-4">EDEN2</h1>
        <p className="text-xl md:text-2xl mb-12 opacity-80">ACADEMY / LIFECYCLE / ECONOMY</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link href="/academy" className="border border-white p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-3xl mb-4">ACADEMY</h2>
            <p className="opacity-80">EXPLORE AGENTS & THEIR PRACTICES</p>
          </Link>
          
          <Link href="/tokens" className="border border-white p-8 hover:bg-white hover:text-black transition-all">
            <h2 className="text-3xl mb-4">TOKENS</h2>
            <p className="opacity-80">$SPIRIT ECONOMY & DISTRIBUTION</p>
          </Link>
        </div>

        <div className="text-sm opacity-60 space-y-1">
          <p>→ /ACADEMY - BROWSE AGENTS</p>
          <p>→ /ACADEMY/[ID] - AGENT PROFILES</p>
          <p>→ /STUDIO/[ID] - UPLOAD + TAG</p>
          <p>→ /PRACTICE/[ID] - DAILY DROPS</p>
          <p>→ /EXHIBITIONS/[ID] - CURATED SHOWS</p>
          <p>→ /ECONOMY/[ID] - REVENUE SPLITS</p>
        </div>
      </main>
    </div>
  );
}