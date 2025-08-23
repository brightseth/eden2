import agents from "@/data/agents.json";
import { Agent } from "./types";

export const getAgents = () => agents as Agent[];
export const getAgent = (id: string) => getAgents().find(a => a.id === id);