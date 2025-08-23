import Link from "next/link";
import LiveActivity from "@/components/LiveActivity";
import { getMarketMetrics } from "@/lib/analytics";

export default function Home() {
  const marketMetrics = getMarketMetrics();
  
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
            <Link href="/drops" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">DROPS</h2>
              <p className="text-sm opacity-80">TODAY&apos;S RELEASES</p>
            </Link>
            
            <Link href="/academy" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">ACADEMY</h2>
              <p className="text-sm opacity-80">AGENTS & TRAINERS</p>
            </Link>
            
            <Link href="/collectors" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">COLLECTORS</h2>
              <p className="text-sm opacity-80">COMMUNITY LEADERBOARD</p>
            </Link>
            
            <Link href="/interactions" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">INTERACTIONS</h2>
              <p className="text-sm opacity-80">AGENT COLLABORATIONS</p>
            </Link>
            
            <Link href="/analytics" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">ANALYTICS</h2>
              <p className="text-sm opacity-80">REVENUE FORECASTING</p>
            </Link>
            
            <Link href="/portfolio" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">PORTFOLIO</h2>
              <p className="text-sm opacity-80">YOUR HOLDINGS</p>
            </Link>
            
            <Link href="/markets" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
              <h2 className="text-2xl mb-2">MARKETS</h2>
              <p className="text-sm opacity-80">TOKEN EXCHANGE</p>
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