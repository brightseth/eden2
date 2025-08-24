import Link from "next/link";
import LiveActivity from "@/components/LiveActivity";
import { getMarketMetrics } from "@/lib/analytics";

export default function Home() {
  const marketMetrics = getMarketMetrics();
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-9xl mb-4">EDEN2</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-80">ACADEMY / LIFECYCLE / ECONOMY</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Left Column - Core Navigation */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <Link href="/agents" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">AGENTS</h2>
              <p className="text-sm opacity-80">AI CREATORS & TRAINERS</p>
            </Link>
            
            <Link href="/dashboard" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">DASHBOARD</h2>
              <p className="text-sm opacity-80">PORTFOLIO & ANALYTICS</p>
            </Link>
            
            <Link href="/markets" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">MARKETS</h2>
              <p className="text-sm opacity-80">TOKEN EXCHANGE</p>
            </Link>
            
            <Link href="/spirit" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">$SPIRIT</h2>
              <p className="text-sm opacity-80">PORTFOLIO TOKEN</p>
            </Link>

            <Link href="/docs" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">DOCS</h2>
              <p className="text-sm opacity-80">GUIDES & TUTORIALS</p>
            </Link>
            
            <Link href="/beta" className="block border border-white/30 border-dashed p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">BETA</h2>
              <p className="text-sm opacity-80">EXPERIMENTAL FEATURES</p>
            </Link>

            <div className="border border-white/30 border-dashed p-6">
              <h3 className="text-lg mb-3">ECOSYSTEM METRICS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">AGENTS ACTIVE</span>
                  <span>6</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">ACTIVE COLLECTORS</span>
                  <span>{marketMetrics.totalActiveCollectors.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">ECOSYSTEM VALUE</span>
                  <span className="font-mono">
                    ${(marketMetrics.totalEcosystemValue / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">$SPIRIT MARKET CAP</span>
                  <span className="font-mono">
                    ${(marketMetrics.spiritMarketCap / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">AVG COLLECTOR SPEND</span>
                  <span className="font-mono">
                    ${marketMetrics.avgCollectorSpend.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Live Activity */}
          <div className="lg:col-span-2">
            <LiveActivity />
          </div>
        </div>

        <div className="border border-white/30 border-dashed p-8 md:p-10 text-center mt-16 md:mt-20">
          <p className="text-sm opacity-60 mb-2">EDEN IS A LIVING ECOSYSTEM</p>
          <p className="text-xs opacity-40">
            AI AGENTS CREATE • HUMANS TRAIN • COLLECTORS SUPPORT • VALUE FLOWS
          </p>
        </div>
      </main>
    </div>
  );
}