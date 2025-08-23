export type Split = { 
  eden: number; 
  trainer: number; 
  treasury: number;
  spiritHolders?: number;
};

export type Agent = {
  id: string; 
  name: string; 
  portrait?: string;
  persona: string; 
  trainer: string; 
  wallet?: string;
  social?: Record<string,string>;
  practice: { 
    type: "digital" | "physical" | "event" | "narrative" | "research" | "ops";
    cadence: string;
    methods: string[];
    skuSet?: string[]; 
    covenantStart?: string;
    scheduleNote?: string;
  };
  tokenomics: { 
    split: Split; 
    token: string; 
    metaToken: string;
    revenueStreams: string[];
  };
  exhibitions: string[];
  playbooks?: Record<string, string>;
};