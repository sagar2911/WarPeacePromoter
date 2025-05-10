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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            <span className="text-danger">The Horror of Escalation:</span>{" "}
            <span className="text-primary">Conflict Simulator</span>
          </h2>
          <div className="max-w-3xl mx-auto bg-danger bg-opacity-10 p-4 rounded-lg border-l-4 border-danger">
            <p className="text-neutral-800 font-medium text-lg">
              This simulator shows the devastating potential of continued conflict. 
              Adjust the parameters below to see how many more lives would be lost if hostilities escalate.
            </p>
          </div>
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
          <div className="mt-6 p-5 bg-danger bg-opacity-10 rounded-lg border-t-2 border-danger">
            <h4 className="font-heading text-lg font-bold mb-2 text-danger">Beyond The Numbers</h4>
            <p className="text-neutral-700">
              These figures represent real human lives. Behind each number is a person with hopes, dreams, 
              and loved ones. This simulation demonstrates why diplomatic solutions must always be prioritized 
              over military action.
            </p>
            <p className="text-neutral-700 mt-3">
              <strong>Remember:</strong> Escalating conflicts only leads to more suffering on all sides. 
              The simulator's purpose is to show that even the "smallest" military actions have devastating 
              human consequences.
            </p>
          </div>
        </div>

        {/* CTA to Historical Data */}
        <div className="text-center bg-neutral-100 rounded-lg p-6 border-t-4 border-danger">
          <h3 className="text-xl font-bold mb-3 text-danger">History Shows Us War Only Brings Sorrow</h3>
          <p className="text-neutral-700 max-w-2xl mx-auto mb-6">
            Past conflicts between these nations have already claimed thousands of lives.
            We cannot afford to repeat the tragedies of history.
          </p>
          <Link href="/past-conflicts">
            <span className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 cursor-pointer shadow-md">
              Remember The Lost Lives of Previous Conflicts
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Simulation;
