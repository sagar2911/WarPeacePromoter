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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="text-danger">Forgotten Victims:</span>{" "}
            <span className="text-primary">Historical Conflicts</span>
          </h2>
          <div className="max-w-3xl mx-auto bg-danger bg-opacity-10 p-4 rounded-lg border-l-4 border-danger">
            <p className="text-neutral-800 font-medium text-lg">
              Decades of conflict have already claimed thousands of lives. Each war leaves behind 
              grief, trauma, and economic devastation that lasts for generations.
            </p>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-danger">
          <h3 className="font-heading text-xl font-bold mb-2 text-danger">
            Lives Lost Through Decades of Conflict
          </h3>
          <p className="text-neutral-600 mb-4">Each bar represents countless families shattered forever</p>
          <HistoricalChart historicalData={data?.conflicts} isLoading={isLoading} />
          <div className="p-3 bg-neutral-100 rounded-lg mt-4">
            <p className="text-sm text-neutral-700">
              This chart demonstrates the recurring pattern of violence that has plagued the region for decades. 
              Each conflict brings new casualties, yet resolves little.
            </p>
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            <Info className="h-3 w-3 inline mr-1" /> Chart shows approximate casualties from major
            India-Pakistan conflicts, based on historical records
          </div>
        </div>

        {/* Wars Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 overflow-x-auto border-t-4 border-primary">
          <h3 className="font-heading text-xl font-bold mb-2 text-primary">
            The Human Cost of Every Conflict
          </h3>
          <p className="text-neutral-600 mb-4">Each number represents a person who never returned home</p>
          <ConflictsTable conflicts={data?.conflicts} isLoading={isLoading} />
        </div>

        {/* Economic Impact of Past Wars */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-warning">
          <h3 className="font-heading text-xl font-bold mb-2 text-warning">
            Financial Devastation from Violence
          </h3>
          <p className="text-neutral-600 mb-4">Resources that could have built schools, hospitals, and infrastructure</p>
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
          <div className="border-t border-neutral-200 mt-6 pt-6">
            <div className="p-4 bg-danger bg-opacity-10 rounded-lg">
              <p className="text-neutral-800 font-medium">
                These billions of dollars could have been invested in education, healthcare, and essential 
                infrastructure. Instead, they were wasted on weapons and destruction.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to About */}
        <div className="text-center bg-neutral-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3 text-danger">Will We Learn From History's Mistakes?</h3>
          <p className="text-neutral-700 max-w-2xl mx-auto mb-6">
            The data presented here comes from verified sources documenting the true cost of these conflicts.
            Understanding the facts is the first step toward breaking the cycle of violence.
          </p>
          <Link href="/about">
            <span className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md cursor-pointer">
              Understand Our Mission For Peace
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastConflicts;
