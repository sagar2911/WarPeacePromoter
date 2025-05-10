import {
  users,
  type User,
  type InsertUser,
  dashboardData,
  type DashboardData,
  type InsertDashboardData,
  historicalConflicts,
  type HistoricalConflict,
  type InsertHistoricalConflict,
  economicImpacts,
  type EconomicImpact,
  type InsertEconomicImpact,
  dataSources,
  type DataSource,
  type InsertDataSource,
} from "@shared/schema";

export interface IStorage {
  // User methods (keeping from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Dashboard data methods
  getDashboardData(): Promise<DashboardData | undefined>;
  updateDashboardData(data: InsertDashboardData): Promise<DashboardData>;

  // Historical conflict methods
  getHistoricalConflicts(): Promise<HistoricalConflict[]>;
  getHistoricalConflict(id: number): Promise<HistoricalConflict | undefined>;
  createHistoricalConflict(conflict: InsertHistoricalConflict): Promise<HistoricalConflict>;

  // Economic impact methods
  getEconomicImpacts(): Promise<EconomicImpact[]>;
  createEconomicImpact(impact: InsertEconomicImpact): Promise<EconomicImpact>;

  // Data sources methods
  getDataSources(): Promise<DataSource[]>;
  createDataSource(source: InsertDataSource): Promise<DataSource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private dashboard: DashboardData | undefined;
  private conflicts: Map<number, HistoricalConflict>;
  private impacts: Map<number, EconomicImpact>;
  private sources: Map<number, DataSource>;
  
  currentId: { 
    users: number; 
    conflicts: number; 
    impacts: number; 
    sources: number;
  };

  constructor() {
    this.users = new Map();
    this.conflicts = new Map();
    this.impacts = new Map();
    this.sources = new Map();
    
    this.currentId = {
      users: 1,
      conflicts: 1,
      impacts: 1,
      sources: 1
    };
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Dashboard methods
  async getDashboardData(): Promise<DashboardData | undefined> {
    return this.dashboard;
  }

  async updateDashboardData(data: InsertDashboardData): Promise<DashboardData> {
    const dashboardData: DashboardData = { ...data, id: 1 };
    this.dashboard = dashboardData;
    return dashboardData;
  }

  // Historical conflict methods
  async getHistoricalConflicts(): Promise<HistoricalConflict[]> {
    return Array.from(this.conflicts.values());
  }

  async getHistoricalConflict(id: number): Promise<HistoricalConflict | undefined> {
    return this.conflicts.get(id);
  }

  async createHistoricalConflict(conflict: InsertHistoricalConflict): Promise<HistoricalConflict> {
    const id = this.currentId.conflicts++;
    const newConflict: HistoricalConflict = { ...conflict, id };
    this.conflicts.set(id, newConflict);
    return newConflict;
  }

  // Economic impact methods
  async getEconomicImpacts(): Promise<EconomicImpact[]> {
    return Array.from(this.impacts.values());
  }

  async createEconomicImpact(impact: InsertEconomicImpact): Promise<EconomicImpact> {
    const id = this.currentId.impacts++;
    const newImpact: EconomicImpact = { ...impact, id };
    this.impacts.set(id, newImpact);
    return newImpact;
  }

  // Data sources methods
  async getDataSources(): Promise<DataSource[]> {
    return Array.from(this.sources.values());
  }

  async createDataSource(source: InsertDataSource): Promise<DataSource> {
    const id = this.currentId.sources++;
    const newSource: DataSource = { ...source, id };
    this.sources.set(id, newSource);
    return newSource;
  }

  // Initialize with sample data
  private initializeData() {
    // Dashboard data
    const dashboardData: DashboardData = {
      id: 1,
      totalCasualties: 127,
      civilianCasualties: 54,
      militaryCasualties: 38,
      militantCasualties: 35,
      indiaCivilianCasualties: 23,
      indiaMilitaryCasualties: 18,
      pakistanCivilianCasualties: 31,
      pakistanMilitaryCasualties: 20,
      civilianSource: "Reuters",
      militarySource: "Al Jazeera",
      militantSource: "BBC",
      indiaSource: "Reuters, Ministry of Defence statements",
      pakistanSource: "Al Jazeera, government statements",
      updateSource: "Reuters",
      lastUpdated: new Date(),
      timelineData: [
        { date: "May 1", civilianDeaths: 10, militaryDeaths: 5, militantDeaths: 8 },
        { date: "May 3", civilianDeaths: 18, militaryDeaths: 12, militantDeaths: 15 },
        { date: "May 5", civilianDeaths: 32, militaryDeaths: 20, militantDeaths: 22 },
        { date: "May 7", civilianDeaths: 45, militaryDeaths: 32, militantDeaths: 28 },
        { date: "May 9", civilianDeaths: 54, militaryDeaths: 38, militantDeaths: 35 }
      ],
      hotspots: [
        { name: "Pahalgam Attack", casualties: 26, type: "civilian", x: 300, y: 150 },
        { name: "Border Skirmish Area", casualties: 15, type: "military", x: 450, y: 250 }
      ],
      contextualFacts: [
        { 
          text: "Both governments have reduced diplomatic ties amid the violence.", 
          source: "Reuters",
          sourceUrl: "https://www.reuters.com"
        },
        { 
          text: "UN Secretary General has called for immediate de-escalation and offered mediation.", 
          source: "UN",
          sourceUrl: "https://www.un.org"
        },
        { 
          text: "Each number represents a life lost – a reminder of war's tragic cost.",
          source: null,
          sourceUrl: null
        }
      ]
    };
    this.dashboard = dashboardData;

    // Historical conflicts
    this.createHistoricalConflict({
      name: "First Kashmir War",
      year: "1947-48",
      duration: "1 year, 3 months",
      militaryDeathsIndia: 1100,
      militaryDeathsPakistan: 6000,
      civilianDeaths: "Thousands (unconfirmed)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Indo-Pakistani_War_of_1947%E2%80%931948"
    });

    this.createHistoricalConflict({
      name: "Indo-Pakistani War",
      year: "1965",
      duration: "17 days",
      militaryDeathsIndia: 3000,
      militaryDeathsPakistan: 3800,
      civilianDeaths: "1,500",
      source: "Britannica",
      sourceUrl: "https://www.britannica.com/event/Indo-Pakistani-War-of-1965"
    });

    this.createHistoricalConflict({
      name: "Bangladesh Liberation War",
      year: "1971",
      duration: "13 days",
      militaryDeathsIndia: 3800,
      militaryDeathsPakistan: 9000,
      civilianDeaths: "300,000 (East Pakistan)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Indo-Pakistani_War_of_1971"
    });

    this.createHistoricalConflict({
      name: "Kargil War",
      year: "1999",
      duration: "2 months",
      militaryDeathsIndia: 527,
      militaryDeathsPakistan: 453,
      civilianDeaths: "35",
      source: "Multiple sources",
      sourceUrl: "https://en.wikipedia.org/wiki/Kargil_War"
    });

    // Economic impacts
    this.createEconomicImpact({
      conflict: "1971 War",
      cost: 2.4,
      notes: "Adjusted for inflation: ~$16 billion today"
    });

    this.createEconomicImpact({
      conflict: "1999 Kargil Conflict",
      cost: 1.5,
      notes: "Direct military expenditure only"
    });

    this.createEconomicImpact({
      conflict: "Post-2001 Mobilization",
      cost: 3,
      notes: "Combined losses from 10-month standoff"
    });

    // Data sources
    this.createDataSource({
      category: "Current Conflict",
      sources: [
        "Reuters International News Agency",
        "BBC World Service",
        "Al Jazeera English",
        "Associated Press",
        "Official statements from Indian and Pakistani governments (when verifiable)",
        "United Nations reports"
      ]
    });

    this.createDataSource({
      category: "Historical Data",
      sources: [
        "Encyclopedia Britannica",
        "Academic papers from the Journal of Conflict Resolution",
        "Uppsala Conflict Data Program",
        "Historical archives from both countries",
        "Studies from the Stockholm International Peace Research Institute"
      ]
    });

    this.createDataSource({
      category: "Simulation Methodology",
      sources: [
        "Military capability data from International Institute for Strategic Studies",
        "Economic impact models from World Bank reports",
        "Nuclear effects data from academic studies on nuclear conflicts",
        "Population density data from official census records"
      ]
    });
  }
}

export const storage = new MemStorage();
