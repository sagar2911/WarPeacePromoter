import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/dashboard", async (req: Request, res: Response) => {
    try {
      const data = await storage.getDashboardData();
      if (!data) {
        return res.status(404).json({ message: "Dashboard data not found" });
      }
      res.json(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/historical", async (req: Request, res: Response) => {
    try {
      const conflicts = await storage.getHistoricalConflicts();
      const economicImpacts = await storage.getEconomicImpacts();
      
      res.json({
        conflicts,
        economicImpacts
      });
    } catch (error) {
      console.error("Error fetching historical data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/about", async (req: Request, res: Response) => {
    try {
      const dataSources = await storage.getDataSources();
      
      res.json({
        dataSources
      });
    } catch (error) {
      console.error("Error fetching about data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create an HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
