"use client";
import { useState } from "react";
import Link from "next/link";
import { getAgent } from "@/lib/db";

export default function Studio({ params }: { params: { id: string }}) {
  const agent = getAgent(params.id);
  const [items, setItems] = useState<{url:string; tags:string[]; notes:string}[]>([]);
  
  if (!agent) return null;
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href={`/academy/${agent.id}`} className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK TO {agent.name.toUpperCase()}
        </Link>
        
        <h1 className="text-5xl mb-2">STUDIO</h1>
        <p className="text-xl opacity-60 mb-8">{agent.name.toUpperCase()} WORKSPACE</p>
        
        <div className="flex gap-4 mb-8">
          <label className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all cursor-pointer">
            UPLOAD FILES
            <input 
              type="file" 
              multiple 
              className="hidden"
              onChange={e => {
                const files = Array.from(e.target.files || []);
                setItems(prev => prev.concat(files.map(f => ({
                  url: URL.createObjectURL(f), 
                  tags: [], 
                  notes: ""
                }))));
              }} 
            />
          </label>
          
          <button 
            className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all"
            onClick={() => alert("EXPORT CSV/JSON (STUB)")}
          >
            EXPORT
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="border border-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="w-full mb-4 bg-white/10"/>
              <input 
                className="w-full bg-transparent border-b border-white/30 pb-1 mb-3 text-sm placeholder-white/40"
                placeholder="TAGS: MANIFESTO, PORTRAIT..."
                onChange={e => {
                  items[i].tags = e.target.value.split(",").map(s => s.trim());
                  setItems([...items]);
                }}
              />
              <textarea 
                className="w-full bg-transparent border-b border-white/30 pb-1 mb-3 text-sm placeholder-white/40 resize-none"
                placeholder="NOTES..."
                rows={2}
                onChange={e => {
                  items[i].notes = e.target.value; 
                  setItems([...items]);
                }}
              />
              <button 
                className="text-xs opacity-60 hover:opacity-100"
                onClick={() => alert("MARK PRINT_READY (STUB)")}
              >
                → MARK PRINT_READY
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}