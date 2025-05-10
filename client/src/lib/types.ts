// Dashboard data types
export interface TimelineDataPoint {
  date: string;
  civilianDeaths: number;
  militaryDeaths: number;
  militantDeaths: number;
}

export interface Hotspot {
  name: string;
  casualties: number;
  type: 'civilian' | 'military';
  x?: number;
  y?: number;
}

export interface ContextualFact {
  text: string;
  source: string | null;
  sourceUrl: string | null;
}

export interface DashboardData {
  id: number;
  totalCasualties: number;
  civilianCasualties: number;
  militaryCasualties: number;
  militantCasualties: number;
  indiaCivilianCasualties: number;
  indiaMilitaryCasualties: number;
  pakistanCivilianCasualties: number;
  pakistanMilitaryCasualties: number;
  civilianSource: string;
  militarySource: string;
  militantSource: string;
  indiaSource: string;
  pakistanSource: string;
  updateSource: string;
  lastUpdated: string | Date;
  timelineData: TimelineDataPoint[];
  hotspots: Hotspot[];
  contextualFacts: ContextualFact[];
}

// Simulation types
export interface SimulationParameters {
  airWar: number;
  naval: number;
  ground: number;
  nuclear: boolean;
  duration: number;
}

export interface SimulationResults {
  civilianCasualties: number;
  militaryCasualties: number;
  totalCasualties: number;
  economicCost: number;
  infrastructureDamage: string;
}

// Historical data types
export interface Conflict {
  id: number;
  name: string;
  year: string;
  duration: string;
  militaryDeathsIndia: number;
  militaryDeathsPakistan: number;
  civilianDeaths: string | number;
  source: string;
  sourceUrl: string;
}

export interface EconomicImpact {
  id: number;
  conflict: string;
  cost: number;
  notes: string;
}

export interface HistoricalData {
  conflicts: Conflict[];
  economicImpacts: EconomicImpact[];
}

// About data types
export interface DataSourceCategory {
  id: number;
  category: string;
  sources: string[];
}

export interface AboutData {
  dataSources: DataSourceCategory[];
}
