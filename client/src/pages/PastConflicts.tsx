import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Info } from "lucide-react";
import HistoricalChart from "@/components/past-conflicts/HistoricalChart";
import ConflictsTable from "@/components/past-conflicts/ConflictsTable";
import { HistoricalData } from "@/lib/types";

const PastConflicts = () => {
  const { data, isLoading } = useQuery<HistoricalData>({
    queryKey: ["/api/historical"],
  });

  return (
    <section id="past-conflicts" className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
            Past India-Pakistan Conflicts
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Historical casualties and impacts from previous wars and major conflicts
          </p>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">
            Historical Casualties Overview
          </h3>
          <HistoricalChart historicalData={data?.conflicts} isLoading={isLoading} />
          <div className="text-xs text-neutral-500 mt-4">
            <Info className="h-3 w-3 inline mr-1" /> Chart shows approximate casualties from major
            India-Pakistan conflicts, based on historical records
          </div>
        </div>

        {/* Wars Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 overflow-x-auto">
          <h3 className="font-heading text-xl font-bold mb-4">
            Major Conflicts Timeline
          </h3>
          <ConflictsTable conflicts={data?.conflicts} isLoading={isLoading} />
        </div>

        {/* Economic Impact of Past Wars */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="font-heading text-xl font-bold mb-4">
            Economic Impact of Past Conflicts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.economicImpacts?.map((impact, index) => (
              <div key={index} className="bg-neutral-100 p-4 rounded-lg">
                <h4 className="font-heading text-lg font-semibold mb-2">{impact.conflict}</h4>
                <p className="text-neutral-700 mb-2">Estimated economic cost:</p>
                <p className="text-2xl font-bold text-primary">${impact.cost} billion</p>
                <p className="text-sm text-neutral-500 mt-2">({impact.notes})</p>
              </div>
            ))}
            
            {isLoading && (
              <>
                <div className="bg-neutral-100 p-4 rounded-lg animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="bg-neutral-100 p-4 rounded-lg animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="bg-neutral-100 p-4 rounded-lg animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </>
            )}
          </div>
          <div className="text-xs text-neutral-500 mt-4">
            <Info className="h-3 w-3 inline mr-1" /> Economic figures are approximations based on
            historical records and academic studies, adjusted for inflation where
            possible
          </div>
        </div>

        {/* CTA to About */}
        <div className="text-center">
          <Link href="/about">
            <a className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Learn About Our Data Sources
              <span className="ml-2">→</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastConflicts;
