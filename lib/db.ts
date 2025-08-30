import agentsData from "@/data/agents.json";
import { Agent } from "./types";

// Registry API Client
class RegistryClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = process.env.REGISTRY_API_URL || 'https://eden-genesis-registry.vercel.app/api/v1') {
    this.baseUrl = baseUrl;
  }
  
  async getAgent(identifier: string): Promise<Agent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/agents/${identifier}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('Registry API unavailable, using fallback data');
      return null;
    }
  }
  
  async getAgents(): Promise<Agent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/agents`);
      if (!response.ok) throw new Error('Registry API error');
      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      console.warn('Registry API unavailable, using fallback data');
      return [];
    }
  }
}

const registryClient = new RegistryClient();

// Transform legacy data to Registry-compliant format
function transformLegacyAgent(legacyAgent: any): Agent {
  return {
    ...legacyAgent,
    handle: legacyAgent.id,
    displayName: legacyAgent.name,
    status: legacyAgent.status || 'ACTIVE',
    cohort: legacyAgent.cohort || '2025',
    timezone: legacyAgent.timezone || 'UTC',
    languages: legacyAgent.languages || ['en'],
    createdAt: legacyAgent.createdAt || new Date().toISOString(),
    updatedAt: legacyAgent.updatedAt || new Date().toISOString(),
    schemaVersion: legacyAgent.schemaVersion || 'v1.0.0'
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyAgents: any[] = agentsData as any;
const transformedAgents: Agent[] = legacyAgents.map(transformLegacyAgent);

// Hybrid data access (Registry first, fallback to local)
export const getAgents = async (): Promise<Agent[]> => {
  const registryAgents = await registryClient.getAgents();
  return registryAgents.length > 0 ? registryAgents : transformedAgents;
};

export const getAgent = async (identifier: string): Promise<Agent | undefined> => {
  // Try Registry first
  const registryAgent = await registryClient.getAgent(identifier);
  if (registryAgent) return registryAgent;
  
  // Fallback to local data
  return transformedAgents.find(a => a.id === identifier || a.handle === identifier);
};

// Synchronous fallback methods (for backward compatibility)
export const getAgentsSync = () => transformedAgents;
export const getAgentSync = (identifier: string) => 
  transformedAgents.find(a => a.id === identifier || a.handle === identifier);