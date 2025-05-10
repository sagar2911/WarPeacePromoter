import { Link } from "wouter";
import SimulationControls from "@/components/simulation/SimulationControls";
import SimulationOutcomes from "@/components/simulation/SimulationOutcomes";
import { useState } from "react";
import { SimulationParameters, SimulationResults } from "@/lib/types";

const Simulation = () => {
  const [simulationParams, setSimulationParams] = useState<SimulationParameters>({
    airWar: 0,
    naval: 0,
    ground: 0,
    nuclear: false,
    duration: 1
  });
  
  const [simulationResults, setSimulationResults] = useState<SimulationResults>({
    civilianCasualties: 0,
    militaryCasualties: 0,
    totalCasualties: 0,
    economicCost: 0,
    infrastructureDamage: "None"
  });

  const handleParametersChange = (params: SimulationParameters) => {
    setSimulationParams(params);
    
    // Calculate casualties based on parameters
    let civilian = 0;
    let military = 0;
    
    // Base casualties from conventional warfare
    civilian += params.airWar * 10;
    civilian += params.ground * 15;
    military += params.airWar * 5;
    military += params.naval * 2;
    military += params.ground * 20;
    
    // Multiply by duration factor
    const durationFactor = Math.max(1, params.duration / 3);
    civilian = Math.round(civilian * durationFactor);
    military = Math.round(military * durationFactor);
    
    // Nuclear impact (massive increase)
    if (params.nuclear) {
      civilian += 1000000;
      military += 50000;
    }

    // Calculate economic cost (simplified)
    let cost = (params.airWar * 0.2 + params.naval * 0.1 + params.ground * 0.3) * durationFactor;
    
    let infrastructureDamage = "None";
    if (params.nuclear) {
      cost += 1000;
      infrastructureDamage = "Catastrophic - Multiple cities destroyed";
    } else if (cost > 40) {
      infrastructureDamage = "Severe - Major infrastructure destroyed";
    } else if (cost > 20) {
      infrastructureDamage = "Significant - Many facilities damaged";
    } else if (cost > 10) {
      infrastructureDamage = "Moderate - Some damage to infrastructure";
    } else if (cost > 0) {
      infrastructureDamage = "Minor - Limited damage to facilities";
    }
    
    setSimulationResults({
      civilianCasualties: civilian,
      militaryCasualties: military,
      totalCasualties: civilian + military,
      economicCost: parseFloat(cost.toFixed(1)),
      infrastructureDamage
    });
  };

  return (
    <section id="simulation" className="py-8 md:py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
            War Simulation Tool
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore how different military decisions could affect the human and economic toll of this conflict.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SimulationControls 
              params={simulationParams} 
              onChange={handleParametersChange} 
            />
            <SimulationOutcomes results={simulationResults} nuclearEnabled={simulationParams.nuclear} />
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-3 bg-neutral-100 rounded-lg text-sm text-neutral-600">
            <p>
              <strong>Disclaimer:</strong> All figures are hypothetical and for
              educational purposes only. This simulation aims to illustrate the
              potential human cost of conflict escalation, not to predict exact
              outcomes. Data is based on historical conflicts, military
              capabilities, and academic studies.
            </p>
          </div>
        </div>

        {/* CTA to Historical Data */}
        <div className="text-center">
          <Link href="/past-conflicts">
            <a className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              View Historical Conflict Data
              <span className="ml-2">→</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Simulation;
