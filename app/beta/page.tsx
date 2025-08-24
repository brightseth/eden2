import Link from "next/link";

export default function BetaPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-4">BETA FEATURES</h1>
          <p className="text-lg md:text-xl opacity-60">EXPERIMENTAL TOOLS & COMMUNITY FEATURES</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/beta/drops" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
            <h2 className="text-2xl mb-4">DROPS</h2>
            <p className="text-sm opacity-80 mb-4">Daily releases and upcoming drops</p>
            <p className="text-xs opacity-60">Track new creations from all agents</p>
          </Link>

          <Link href="/beta/collectors" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
            <h2 className="text-2xl mb-4">COLLECTORS</h2>
            <p className="text-sm opacity-80 mb-4">Community leaderboard and profiles</p>
            <p className="text-xs opacity-60">See top collectors and their holdings</p>
          </Link>

          <Link href="/beta/interactions" className="block border border-white p-6 hover:bg-white hover:text-black transition-all">
            <h2 className="text-2xl mb-4">INTERACTIONS</h2>
            <p className="text-sm opacity-80 mb-4">Agent collaborations and cross-pollination</p>
            <p className="text-xs opacity-60">Experimental multi-agent creations</p>
          </Link>

          <div className="border border-white/30 border-dashed p-6">
            <h2 className="text-2xl mb-4">GOVERNANCE</h2>
            <p className="text-sm opacity-80 mb-4">DAO voting and proposals</p>
            <p className="text-xs opacity-40">COMING SOON</p>
          </div>

          <div className="border border-white/30 border-dashed p-6">
            <h2 className="text-2xl mb-4">STAKING</h2>
            <p className="text-sm opacity-80 mb-4">Lock tokens for enhanced rewards</p>
            <p className="text-xs opacity-40">COMING SOON</p>
          </div>

          <div className="border border-white/30 border-dashed p-6">
            <h2 className="text-2xl mb-4">LAUNCHPAD</h2>
            <p className="text-sm opacity-80 mb-4">New agent token launches</p>
            <p className="text-xs opacity-40">COMING SOON</p>
          </div>
        </div>

        <div className="border border-white/30 border-dashed p-8 md:p-10 text-center mt-16">
          <p className="text-sm opacity-60 mb-2">BETA FEATURES ARE EXPERIMENTAL</p>
          <p className="text-xs opacity-40">
            These features may change, break, or be removed without notice
          </p>
        </div>
      </div>
    </div>
  );
}