import { DashboardData } from "@/lib/types";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CasualtyCounterProps {
  data?: DashboardData;
  isLoading: boolean;
}

const CasualtyCounter = ({ data, isLoading }: CasualtyCounterProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="font-heading text-2xl font-bold text-center mb-6">
        Total Confirmed Casualties
      </h2>
      <div className="text-center">
        {isLoading ? (
          <div className="flex justify-center">
            <Skeleton className="h-16 w-36" />
          </div>
        ) : (
          <div className="text-5xl md:text-6xl font-bold text-danger mb-2 casualty-number">
            {data?.totalCasualties || 0}
          </div>
        )}
        <p className="text-neutral-600">Lives lost in the conflict</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Civilian casualties */}
        <div className="bg-neutral-100 p-4 rounded-lg text-center">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-danger casualty-number">
              {data?.civilianCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold">Civilians</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.civilianSource || "Reuters"}</span>
          </div>
        </div>

        {/* Military casualties */}
        <div className="bg-neutral-100 p-4 rounded-lg text-center">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-primary casualty-number">
              {data?.militaryCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold">Military Personnel</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.militarySource || "Al Jazeera"}</span>
          </div>
        </div>

        {/* Militant casualties */}
        <div className="bg-neutral-100 p-4 rounded-lg text-center">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-warning casualty-number">
              {data?.militantCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold">Militants/Terrorists</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.militantSource || "BBC"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasualtyCounter;
