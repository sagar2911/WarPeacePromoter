import { SimulationResults } from "@/lib/types";

interface SimulationOutcomesProps {
  results: SimulationResults;
  nuclearEnabled: boolean;
}

const SimulationOutcomes = ({ results, nuclearEnabled }: SimulationOutcomesProps) => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h3 className="font-heading text-xl font-bold mb-4">Projected Outcomes</h3>

      {/* Casualty Estimates */}
      <div className="bg-neutral-100 p-4 rounded-lg mb-6">
        <h4 className="font-heading text-lg font-semibold mb-3">
          Estimated Casualties
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">Civilian Deaths:</span>
            <span className="font-bold text-danger">
              {formatNumber(results.civilianCasualties)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">Military Deaths:</span>
            <span className="font-bold text-primary">
              {formatNumber(results.militaryCasualties)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">Total Estimated Deaths:</span>
            <span className="font-bold text-xl">
              {formatNumber(results.totalCasualties)}
            </span>
          </div>
        </div>

        <div className="mt-3 text-xs text-neutral-500">
          All figures are hypothetical estimates based on historical conflict
          data and military capabilities.
        </div>
      </div>

      {/* Economic Impact */}
      <div className="bg-neutral-100 p-4 rounded-lg mb-6">
        <h4 className="font-heading text-lg font-semibold mb-3">
          Economic & Infrastructure Impact
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">Economic Cost:</span>
            <span className="font-bold">${results.economicCost} billion</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-700">Infrastructure Damage:</span>
            <span className="font-bold">{results.infrastructureDamage}</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-neutral-500">
          Based on historical war costs adjusted for inflation and current
          economic data.
        </div>
      </div>

      {/* Simulation Map */}
      <div className="rounded-lg overflow-hidden border border-neutral-200">
        <div className="h-48 bg-neutral-200 relative">
          {/* Simple SVG map showing impact areas */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-gray-200"
          >
            {/* Simple outline of region */}
            <path
              d="M200,100 C250,80 300,90 350,100 C400,110 450,130 500,150 C550,170 600,200 650,250 C700,300 750,350 780,400"
              stroke="#2B3467"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Potential impact zones based on simulation */}
            {results.civilianCasualties > 0 && (
              <circle
                cx="400"
                cy="200"
                r={Math.min(100, 10 + results.civilianCasualties / 10000)}
                fill="#EB455F"
                fillOpacity="0.3"
              />
            )}
            
            {results.militaryCasualties > 0 && (
              <circle
                cx="300"
                cy="300"
                r={Math.min(80, 5 + results.militaryCasualties / 1000)}
                fill="#2B3467"
                fillOpacity="0.3"
              />
            )}
          </svg>
          
          {nuclearEnabled && (
            <div className="absolute inset-0 bg-danger bg-opacity-40 flex items-center justify-center text-white font-bold text-xl">
              Nuclear Impact Zone
            </div>
          )}
        </div>
        <div className="bg-neutral-100 p-2 text-xs text-neutral-600">
          Map shows potential conflict zones based on selected parameters
        </div>
      </div>
    </div>
  );
};

export default SimulationOutcomes;
