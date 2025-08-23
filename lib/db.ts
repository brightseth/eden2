import agentsData from "@/data/agents.json";
import { Agent } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const agents: Agent[] = agentsData as any;

export const getAgents = () => agents;
export const getAgent = (id: string) => getAgents().find(a => a.id === id);