import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping from the original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Dashboard data table for storing the current conflict data
export const dashboardData = pgTable("dashboard_data", {
  id: serial("id").primaryKey(),
  totalCasualties: integer("total_casualties").notNull(),
  civilianCasualties: integer("civilian_casualties").notNull(),
  militaryCasualties: integer("military_casualties").notNull(),
  militantCasualties: integer("militant_casualties").notNull(),
  indiaCivilianCasualties: integer("india_civilian_casualties").notNull(),
  indiaMilitaryCasualties: integer("india_military_casualties").notNull(),
  pakistanCivilianCasualties: integer("pakistan_civilian_casualties").notNull(),
  pakistanMilitaryCasualties: integer("pakistan_military_casualties").notNull(),
  civilianSource: text("civilian_source").notNull(),
  militarySource: text("military_source").notNull(),
  militantSource: text("militant_source").notNull(),
  indiaSource: text("india_source").notNull(),
  pakistanSource: text("pakistan_source").notNull(),
  updateSource: text("update_source").notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
  timelineData: json("timeline_data").notNull(),
  hotspots: json("hotspots").notNull(),
  contextualFacts: json("contextual_facts").notNull(),
});

export const insertDashboardDataSchema = createInsertSchema(dashboardData).omit({ id: true });

// Historical conflicts table
export const historicalConflicts = pgTable("historical_conflicts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  year: text("year").notNull(),
  duration: text("duration").notNull(),
  militaryDeathsIndia: integer("military_deaths_india").notNull(),
  militaryDeathsPakistan: integer("military_deaths_pakistan").notNull(),
  civilianDeaths: text("civilian_deaths").notNull(),
  source: text("source").notNull(),
  sourceUrl: text("source_url").notNull(),
});

export const insertHistoricalConflictSchema = createInsertSchema(historicalConflicts).omit({ id: true });

// Economic impacts table
export const economicImpacts = pgTable("economic_impacts", {
  id: serial("id").primaryKey(),
  conflict: text("conflict").notNull(),
  cost: integer("cost").notNull(),
  notes: text("notes").notNull(),
});

export const insertEconomicImpactSchema = createInsertSchema(economicImpacts).omit({ id: true });

// About data sources table
export const dataSources = pgTable("data_sources", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  sources: json("sources").notNull(),
});

export const insertDataSourceSchema = createInsertSchema(dataSources).omit({ id: true });

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDashboardData = z.infer<typeof insertDashboardDataSchema>;
export type DashboardData = typeof dashboardData.$inferSelect;

export type InsertHistoricalConflict = z.infer<typeof insertHistoricalConflictSchema>;
export type HistoricalConflict = typeof historicalConflicts.$inferSelect;

export type InsertEconomicImpact = z.infer<typeof insertEconomicImpactSchema>;
export type EconomicImpact = typeof economicImpacts.$inferSelect;

export type InsertDataSource = z.infer<typeof insertDataSourceSchema>;
export type DataSource = typeof dataSources.$inferSelect;
