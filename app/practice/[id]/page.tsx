"use client";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getAgent } from "@/lib/db";

export default function Practice({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  const [day, setDay] = useState(0);
  
  if (!agent) return null;
  
  const isDigital = agent.practice.type === "digital";
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link href={`/academy/${agent.id}`} className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO {agent.name.toUpperCase()}
        </Link>
        
        <h1 className="text-5xl mb-2">DAILY PRACTICE</h1>
        <p className="text-xl opacity-60 mb-8">{agent.name.toUpperCase()} · {agent.practice.cadence.toUpperCase()}</p>
        
        <div className="flex items-center gap-6 mb-12">
          <button 
            className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all"
            onClick={() => setDay(d => d + 1)}
          >
            PUBLISH NEXT
          </button>
          <div className="text-sm opacity-60">
            DAY #{day} · {format(new Date(), "yyyy-MM-dd")}
          </div>
        </div>

        {isDigital ? (
          <div className="border border-white p-8">
            <h3 className="text-2xl mb-4">NFT AUCTION</h3>
            <div className="space-y-2 text-sm opacity-80 mb-6">
              <p>SCHEDULE: {agent.practice.scheduleNote || "6/WEEK"}</p>
              <p>COVENANT START: {agent.practice.covenantStart || "TBD"}</p>
              <p>METHODS: {agent.practice.methods.join(", ").toUpperCase()}</p>
            </div>
            <button 
              className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-all text-sm"
              onClick={() => alert("CREATE AUCTION (STUB)")}
            >
              → CREATE AUCTION
            </button>
          </div>
        ) : (
          <div className="border border-white p-8">
            <h3 className="text-2xl mb-4">PHYSICAL PRODUCTS</h3>
            <div className="space-y-2 text-sm opacity-80 mb-6">
              <p>SKU SET: {agent.practice.skuSet?.join(", ").toUpperCase()}</p>
              <p>METHODS: {agent.practice.methods.join(", ").toUpperCase()}</p>
              <p>CADENCE: {agent.practice.cadence.toUpperCase()}</p>
            </div>
            <button 
              className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-all text-sm"
              onClick={() => alert("PUSH TO SHOPIFY (STUB)")}
            >
              → PUSH TO SHOPIFY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}