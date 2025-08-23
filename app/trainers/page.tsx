import Link from "next/link";
import trainersData from "@/data/trainers.json";
import { getAgents } from "@/lib/db";

export default function Trainers() {
  const agents = getAgents();
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>
        
        <h1 className="text-5xl md:text-7xl mb-2">TRAINERS</h1>
        <p className="text-lg opacity-60 mb-12">THE HUMANS BRINGING AI AGENTS TO LIFE</p>
        
        <div className="space-y-12">
          {trainersData.map(trainer => {
            const trainerAgents = agents.filter(a => 
              trainer.agents.includes(a.id)
            );
            
            return (
              <div key={trainer.id} className="border border-white p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Trainer Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-3xl mb-2">{trainer.name.toUpperCase()}</h2>
                      <div className="text-sm opacity-80 mb-1">{trainer.role.toUpperCase()}</div>
                      <div className="text-sm opacity-60">{trainer.location}</div>
                    </div>
                    
                    <p className="text-sm leading-relaxed opacity-80">
                      {trainer.bio}
                    </p>
                    
                    <div>
                      <div className="text-xs opacity-60 mb-2">METHODOLOGY</div>
                      <div className="text-sm">{trainer.methodology}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs opacity-60 mb-2">PHILOSOPHY</div>
                      <p className="text-sm italic opacity-80">
                        &ldquo;{trainer.philosophy}&rdquo;
                      </p>
                    </div>

                    {/* Training Approach */}
                    {trainer.trainingApproach && (
                      <div className="border-t border-white/30 pt-6">
                        <h3 className="text-lg mb-4">TRAINING APPROACH</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="opacity-60 mb-1">DATASET</div>
                            <div className="text-xs">{trainer.trainingApproach.datasetCuration}</div>
                          </div>
                          <div>
                            <div className="opacity-60 mb-1">FEEDBACK</div>
                            <div className="text-xs">{trainer.trainingApproach.feedbackLoop}</div>
                          </div>
                          <div>
                            <div className="opacity-60 mb-1">VALIDATION</div>
                            <div className="text-xs">{trainer.trainingApproach.outputValidation}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Agents & Links */}
                  <div className="space-y-6">
                    {/* Trained Agents */}
                    <div className="border border-white/30 border-dashed p-4">
                      <div className="text-sm opacity-60 mb-3">TRAINED AGENTS</div>
                      <div className="space-y-2">
                        {trainerAgents.map(agent => (
                          <Link
                            key={agent.id}
                            href={`/academy/${agent.id}`}
                            className="block hover:bg-white hover:text-black transition-all p-2"
                          >
                            <div className="font-bold">{agent.name.toUpperCase()}</div>
                            <div className="text-xs opacity-60">
                              {agent.practice.type.toUpperCase()} • ${agent.tokenomics.token}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Specializations */}
                    {trainer.specializations && (
                      <div className="border border-white/30 border-dashed p-4">
                        <div className="text-sm opacity-60 mb-2">SPECIALIZATIONS</div>
                        <div className="space-y-1 text-xs">
                          {trainer.specializations.map(spec => (
                            <div key={spec}>{spec.toUpperCase()}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Social Links */}
                    {trainer.social && (
                      <div className="border border-white/30 border-dashed p-4">
                        <div className="text-sm opacity-60 mb-2">CONNECT</div>
                        <div className="space-y-1 text-xs">
                          {Object.entries(trainer.social).map(([platform, handle]) => (
                            <div key={platform}>
                              <a
                                href={platform === "site" ? handle : `#${handle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {platform.toUpperCase()}: {handle}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Current Resident (for Artist in Residence) */}
                    {"currentResident" in trainer && trainer.currentResident && (
                      <div className="border border-white/30 border-dashed p-4">
                        <div className="text-sm opacity-60 mb-2">CURRENT RESIDENT</div>
                        <div className="text-sm">
                          <div className="font-bold">{trainer.currentResident.name.toUpperCase()}</div>
                          <div className="text-xs opacity-60">{trainer.currentResident.focus}</div>
                          <div className="text-xs opacity-60">{trainer.currentResident.term}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}