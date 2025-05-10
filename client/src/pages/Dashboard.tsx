import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Info } from "lucide-react";
import CasualtyCounter from "@/components/dashboard/CasualtyCounter";
import TimelineChart from "@/components/dashboard/TimelineChart";
import ConflictMap from "@/components/dashboard/ConflictMap";
import { DashboardData } from "@/lib/types";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  const getLastUpdatedText = () => {
    if (isLoading) return "Loading...";
    if (error) return "Unable to update";
    
    if (data?.lastUpdated) {
      const updatedDate = new Date(data.lastUpdated);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `Last updated: ${diffInMinutes} minutes ago`;
      } else {
        return `Last updated: ${Math.floor(diffInMinutes / 60)} hours ago`;
      }
    }
    
    return "Last updated: Unknown";
  };

  return (
    <section id="dashboard" className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
            India-Pakistan Conflict Dashboard
          </h1>
          <p className="text-neutral-600">
            Real-time casualty data from the ongoing conflict
          </p>
          <div className="text-sm text-neutral-500 mt-2">
            <span>{getLastUpdatedText()}</span> •{" "}
            <span>
              Data from{" "}
              <a href="#" className="text-primary underline">
                {data?.updateSource || "Multiple sources"}
              </a>
            </span>
          </div>
        </div>

        {/* Total Casualties Counter */}
        <CasualtyCounter data={data} isLoading={isLoading} />

        {/* Country Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* India casualties */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold mb-4">
              Indian Casualties
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Civilians</span>
              <span className="font-semibold text-danger">
                {isLoading ? "Loading..." : data?.indiaCivilianCasualties || 0}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Military</span>
              <span className="font-semibold text-primary">
                {isLoading ? "Loading..." : data?.indiaMilitaryCasualties || 0}
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-4">
              <Info className="h-3 w-3 inline mr-1" /> Data from{" "}
              <span>{data?.indiaSource || "Reuters, Ministry of Defence statements"}</span>
            </div>
          </div>

          {/* Pakistan casualties */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold mb-4">
              Pakistani Casualties
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Civilians</span>
              <span className="font-semibold text-danger">
                {isLoading ? "Loading..." : data?.pakistanCivilianCasualties || 0}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Military</span>
              <span className="font-semibold text-primary">
                {isLoading ? "Loading..." : data?.pakistanMilitaryCasualties || 0}
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-4">
              <Info className="h-3 w-3 inline mr-1" /> Data from{" "}
              <span>{data?.pakistanSource || "Al Jazeera, government statements"}</span>
            </div>
          </div>
        </div>

        {/* Timeline and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Timeline Graph */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold mb-4">
              Casualty Timeline
            </h3>
            <TimelineChart timelineData={data?.timelineData} />
            <div className="text-xs text-neutral-500 mt-4">
              <Info className="h-3 w-3 inline mr-1" /> Showing confirmed casualties over time
              since conflict began
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold mb-4">
              Conflict Hotspots
            </h3>
            <ConflictMap hotspots={data?.hotspots} />
            <div className="mt-4 text-sm text-neutral-600">
              {data?.hotspots?.map((hotspot, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      hotspot.type === "civilian" ? "bg-danger" : "bg-primary"
                    } inline-block mr-2`}
                  ></span>
                  <span>{hotspot.name} - {hotspot.casualties} {hotspot.type} casualties</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contextual Facts */}
        <div className="bg-neutral-100 rounded-lg p-4 mb-8 border-l-4 border-primary">
          <h4 className="font-heading text-lg font-bold mb-2">
            Contextual Facts
          </h4>
          <ul className="space-y-2 text-neutral-700">
            {data?.contextualFacts?.map((fact, index) => (
              <li key={index} className="flex items-start">
                <Info className="text-primary mt-1 mr-2 h-4 w-4" />
                <span>
                  {fact.text}{" "}
                  {fact.source && (
                    <a href={fact.sourceUrl} className="text-primary underline text-sm">
                      Source: {fact.source}
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA to Simulation */}
        <div className="text-center mb-12">
          <Link href="/simulation">
            <a className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Explore War Simulation Tool
              <span className="ml-2">→</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
