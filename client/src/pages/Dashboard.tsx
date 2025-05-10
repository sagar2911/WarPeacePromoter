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
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="text-danger">The Human Toll:</span>{" "}
            <span className="text-primary">India-Pakistan Conflict</span>
          </h1>
          <div className="max-w-3xl mx-auto bg-neutral-100 p-4 rounded-lg border-l-4 border-danger">
            <p className="text-neutral-800 font-medium text-lg">
              Every number below represents a human life extinguished by violence. 
              These are not statistics — they are children, parents, friends, and loved ones.
            </p>
          </div>
          <div className="text-sm text-neutral-500 mt-4">
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
          <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-danger">
            <h3 className="font-heading text-xl font-bold mb-2">
              Indian Lives Lost
            </h3>
            <p className="text-neutral-600 mb-4">People are dying on both sides</p>
            <div className="bg-neutral-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700 font-medium">Innocent Civilians</span>
                <span className="font-bold text-danger text-xl">
                  {isLoading ? "Loading..." : data?.indiaCivilianCasualties || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 font-medium">Military Personnel</span>
                <span className="font-bold text-primary text-xl">
                  {isLoading ? "Loading..." : data?.indiaMilitaryCasualties || 0}
                </span>
              </div>
            </div>
            <div className="text-sm text-neutral-700 italic">
              Every casualty represents a family torn apart
            </div>
            <div className="text-xs text-neutral-500 mt-4">
              <Info className="h-3 w-3 inline mr-1" /> Data from{" "}
              <span>{data?.indiaSource || "Reuters, Ministry of Defence statements"}</span>
            </div>
          </div>

          {/* Pakistan casualties */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-danger">
            <h3 className="font-heading text-xl font-bold mb-2">
              Pakistani Lives Lost
            </h3>
            <p className="text-neutral-600 mb-4">Families suffering just like on the other side</p>
            <div className="bg-neutral-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700 font-medium">Innocent Civilians</span>
                <span className="font-bold text-danger text-xl">
                  {isLoading ? "Loading..." : data?.pakistanCivilianCasualties || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 font-medium">Military Personnel</span>
                <span className="font-bold text-primary text-xl">
                  {isLoading ? "Loading..." : data?.pakistanMilitaryCasualties || 0}
                </span>
              </div>
            </div>
            <div className="text-sm text-neutral-700 italic">
              No country benefits from the loss of its people
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
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-danger">
            <h3 className="font-heading text-xl font-bold mb-2">
              Escalating Human Tragedy
            </h3>
            <p className="text-neutral-600 mb-4">Each day brings more grieving families</p>
            <TimelineChart timelineData={data?.timelineData} />
            <div className="mt-4 p-3 bg-neutral-100 rounded-lg">
              <p className="text-sm text-neutral-700 font-medium">
                This chart shows the steady rise of deaths as the conflict continues. 
                Each step upward represents more children without parents, more parents 
                without children.
              </p>
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              <Info className="h-3 w-3 inline mr-1" /> Showing confirmed casualties over time
              since conflict began
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-primary">
            <h3 className="font-heading text-xl font-bold mb-2">
              Devastation Map
            </h3>
            <p className="text-neutral-600 mb-4">Each location represents shattered communities</p>
            <ConflictMap hotspots={data?.hotspots} />
            <div className="mt-4 p-3 bg-neutral-100 rounded-lg">
              {data?.hotspots?.map((hotspot, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span
                    className={`w-4 h-4 rounded-full ${
                      hotspot.type === "civilian" ? "bg-danger" : "bg-primary"
                    } inline-block mr-2 flex-shrink-0`}
                  ></span>
                  <span className="font-medium">{hotspot.name} - {hotspot.casualties} {hotspot.type === "civilian" ? "innocent civilians" : "military personnel"} who will never return home</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contextual Facts */}
        <div className="bg-danger bg-opacity-10 rounded-lg p-6 mb-8 border-l-4 border-danger">
          <h4 className="font-heading text-xl font-bold mb-4 text-danger">
            The Real Cost of Conflict
          </h4>
          <ul className="space-y-4 text-neutral-800">
            {data?.contextualFacts?.map((fact, index) => (
              <li key={index} className="flex items-start">
                <Info className="text-danger mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {fact.text}
                  </p>
                  {fact.source && (
                    <div className="mt-1">
                      <a href={fact.sourceUrl || "#"} className="text-primary underline text-sm">
                        Source: {fact.source}
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-danger bg-opacity-20 rounded-lg">
            <p className="text-neutral-800 font-medium">
              Beyond these statistics are immeasurable consequences: trauma, economic devastation, 
              environmental damage, and generational suffering that will outlast this conflict.
            </p>
          </div>
        </div>

        {/* CTA to Simulation */}
        <div className="mb-12 bg-neutral-100 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-3 text-danger">Is Further Escalation Worth The Cost?</h3>
          <p className="text-neutral-700 max-w-2xl mx-auto mb-6">
            Our simulation tool shows the devastating impact of escalating this conflict. 
            See for yourself how many more innocent lives would be lost if tensions continue to rise.
          </p>
          <Link href="/simulation">
            <span className="inline-block bg-danger hover:bg-danger/90 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg cursor-pointer">
              See The Cost of Escalation
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
