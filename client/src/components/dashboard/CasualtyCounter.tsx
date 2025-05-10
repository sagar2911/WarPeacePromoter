import { DashboardData } from "@/lib/types";
import { Heart, Info, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CasualtyCounterProps {
  data?: DashboardData;
  isLoading: boolean;
}

const CasualtyCounter = ({ data, isLoading }: CasualtyCounterProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-2 border-danger">
      <h2 className="font-heading text-2xl font-bold text-center mb-2">
        Lives Irreparably Lost
      </h2>
      <p className="text-center text-neutral-600 mb-6">A tragedy that cannot be reversed</p>
      
      <div className="text-center">
        {isLoading ? (
          <div className="flex justify-center">
            <Skeleton className="h-16 w-36" />
          </div>
        ) : (
          <div className="text-5xl md:text-7xl font-bold text-danger mb-4 casualty-number bg-neutral-100 py-6 rounded-lg animate-pulse">
            {data?.totalCasualties || 0}
          </div>
        )}
        <div className="flex items-center justify-center mb-6">
          <Users className="h-5 w-5 text-danger mr-2" />
          <p className="text-neutral-800 font-medium">Human beings with families and dreams</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Civilian casualties */}
        <div className="bg-neutral-100 p-6 rounded-lg text-center border-l-4 border-danger">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-danger casualty-number mb-2">
              {data?.civilianCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold mb-2">Innocent Civilians</p>
          <p className="text-sm text-neutral-600 mb-3">People who never chose to fight</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.civilianSource || "Reuters"}</span>
          </div>
        </div>

        {/* Military casualties */}
        <div className="bg-neutral-100 p-6 rounded-lg text-center border-l-4 border-primary">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-primary casualty-number mb-2">
              {data?.militaryCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold mb-2">Military Personnel</p>
          <p className="text-sm text-neutral-600 mb-3">Sons, daughters, parents in uniform</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.militarySource || "Al Jazeera"}</span>
          </div>
        </div>

        {/* Militant casualties */}
        <div className="bg-neutral-100 p-6 rounded-lg text-center border-l-4 border-warning">
          {isLoading ? (
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
          ) : (
            <div className="text-3xl font-bold text-warning casualty-number mb-2">
              {data?.militantCasualties || 0}
            </div>
          )}
          <p className="text-neutral-700 font-semibold mb-2">Militants/Terrorists</p>
          <p className="text-sm text-neutral-600 mb-3">Also human beings caught in conflict</p>
          <div className="text-xs text-neutral-500 mt-1">
            <Info className="h-3 w-3 inline mr-1" /> Source:{" "}
            <span>{data?.militantSource || "BBC"}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center justify-center px-4 py-2 bg-danger text-white rounded-full">
          <Heart className="h-5 w-5 mr-2" /> These aren't just numbers
        </div>
      </div>
    </div>
  );
};

export default CasualtyCounter;
