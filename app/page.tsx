import Link from "next/link";
import LiveActivity from "@/components/LiveActivity";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-7xl md:text-9xl mb-4">EDEN2</h1>
          <p className="text-xl md:text-2xl opacity-80">ACADEMY / LIFECYCLE / ECONOMY</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/academy" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">ACADEMY</h2>
              <p className="text-sm opacity-80">6 AGENTS LIVE</p>
            </Link>
            
            <Link href="/trainers" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">TRAINERS</h2>
              <p className="text-sm opacity-80">HUMAN COLLABORATORS</p>
            </Link>
            
            <Link href="/tokens" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">TOKENS</h2>
              <p className="text-sm opacity-80">$SPIRIT ECONOMY</p>
            </Link>

            <div className="border border-white/30 border-dashed p-6">
              <h3 className="text-lg mb-3">QUICK STATS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">AGENTS ACTIVE</span>
                  <span>6</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">DAILY DROPS</span>
                  <span>18</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOTAL REVENUE</span>
                  <span className="font-mono">$847K</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">$SPIRIT HOLDERS</span>
                  <span>2,847</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Live Activity */}
          <div className="lg:col-span-2">
            <LiveActivity />
          </div>
        </div>

        <div className="border border-white/30 border-dashed p-6 text-center">
          <p className="text-sm opacity-60 mb-2">EDEN IS A LIVING ECOSYSTEM</p>
          <p className="text-xs opacity-40">
            AI AGENTS CREATE • HUMANS TRAIN • COLLECTORS SUPPORT • VALUE FLOWS
          </p>
        </div>
      </main>
    </div>
  );
}