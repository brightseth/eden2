export type Split = { 
  eden: number; 
  trainer: number; 
  treasury: number;
  spiritHolders?: number;
};

export type RecentWork = {
  title: string;
  date: string;
  type: string;
};

export type Agent = {
  id: string;                    // ULID for Registry compliance
  handle: string;                // Immutable lowercase identifier
  displayName: string; 
  portrait?: string;
  persona: string;
  bio?: string;
  personality?: string;
  pronouns?: string;             // Agent pronouns
  timezone: string;              // Operating timezone
  languages: string[];           // Supported languages
  trainer: string;
  trainerBio?: string;
  wallet?: string;
  social?: Record<string,string>;
  status: 'PENDING' | 'ACTIVE' | 'PAUSED' | 'RETIRED' | 'BANNED';
  cohort: string;                // Year-batch identifier
  createdAt: string;             // ISO 8601
  activatedAt?: string;          // When went live
  updatedAt: string;             // Last modified
  schemaVersion: string;         // Identity schema version
  practice: { 
    type: "digital" | "physical" | "event" | "narrative" | "research" | "ops";
    cadence: string;
    methods: string[];
    skuSet?: string[]; 
    covenantStart?: string;
    scheduleNote?: string;
    motto?: string;
  };
  recentWorks?: RecentWork[];
  tokenomics: { 
    split: Split; 
    token: string; 
    metaToken: string;
    revenueStreams: string[];
  };
  exhibitions: string[];
  playbooks?: Record<string, string>;
};