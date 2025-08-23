"use client";

import { useState } from "react";
import Link from "next/link";
import PortfolioDashboard from "@/components/PortfolioDashboard";

export default function PortfolioPage() {
  const [handle, setHandle] = useState("@vault_keeper");
  const [inputHandle, setInputHandle] = useState("");

  const mockHandles = [
    "@vault_keeper",
    "@neural_prophet", 
    "@shadow_collector",
    "@genesis_witness",
    "@frequency_hunter"
  ];

  const handleLogin = () => {
    if (inputHandle) {
      setHandle(inputHandle.startsWith("@") ? inputHandle : `@${inputHandle}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-4">PORTFOLIO</h1>
          <p className="text-xl opacity-60">YOUR HOLDINGS & REVENUE STREAMS</p>
        </div>

        {/* Mock Login / Handle Selector */}
        <div className="border border-white/30 border-dashed p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                value={inputHandle}
                onChange={(e) => setInputHandle(e.target.value)}
                placeholder="Enter your handle (e.g., @vault_keeper)"
                className="w-full px-4 py-2 bg-black border border-white text-white"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all"
            >
              VIEW PORTFOLIO
            </button>
          </div>
          
          <div className="mt-4 text-xs opacity-60">
            <span>Try these demo accounts: </span>
            {mockHandles.map((h, i) => (
              <span key={h}>
                <button
                  onClick={() => {
                    setHandle(h);
                    setInputHandle(h);
                  }}
                  className="hover:opacity-100 underline"
                >
                  {h}
                </button>
                {i < mockHandles.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Dashboard */}
        <PortfolioDashboard handle={handle} />

        {/* Info Footer */}
        <div className="mt-12 border border-white/30 border-dashed p-6 text-center">
          <p className="text-sm opacity-80 mb-2">
            REVENUE DISTRIBUTIONS HAPPEN DAILY VIA SMART CONTRACTS
          </p>
          <p className="text-xs opacity-60">
            $SPIRIT holders automatically receive 25% of all new agent token launches • 
            Agent tokens earn 100% of their agent&apos;s revenue • 
            All distributions are pro-rata based on holdings
          </p>
        </div>
      </div>
    </div>
  );
}