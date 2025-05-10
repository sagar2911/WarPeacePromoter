import { SimulationParameters } from "@/lib/types";
import { useState, useEffect } from "react";
import { Plane, Ship, Anchor, Rocket, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SimulationControlsProps {
  params: SimulationParameters;
  onChange: (params: SimulationParameters) => void;
}

const SimulationControls = ({ params, onChange }: SimulationControlsProps) => {
  const [parameters, setParameters] = useState<SimulationParameters>(params);

  useEffect(() => {
    onChange(parameters);
  }, [parameters, onChange]);

  const getAirWarLabel = (value: number) => {
    if (value === 0) return "None";
    if (value <= 25) return "Limited Airstrikes";
    if (value <= 50) return "Moderate Air Campaign";
    if (value <= 75) return "Intensive Air Strikes";
    return "Full Air War";
  };

  const getNavalLabel = (value: number) => {
    if (value === 0) return "None";
    if (value <= 25) return "Minor Skirmishes";
    if (value <= 50) return "Naval Engagements";
    if (value <= 75) return "Naval Blockade";
    return "Full Naval War";
  };

  const getGroundLabel = (value: number) => {
    if (value === 0) return "None";
    if (value <= 25) return "Border Skirmishes";
    if (value <= 50) return "Limited Ground Combat";
    if (value <= 75) return "Major Ground Operations";
    return "Full Ground Invasion";
  };

  const getDurationLabel = (value: number) => {
    if (value === 1) return "1 Day";
    if (value <= 7) return value + " Days";
    if (value <= 14) return Math.ceil(value / 7) + " Weeks";
    return value + " Days";
  };

  const handlePresetScenario = (scenario: string) => {
    switch (scenario) {
      case "peaceful":
        setParameters({
          airWar: 0,
          naval: 0,
          ground: 0,
          duration: 1,
          nuclear: false,
        });
        break;
      case "limited":
        setParameters({
          airWar: 15,
          naval: 10,
          ground: 20,
          duration: 5,
          nuclear: false,
        });
        break;
      case "conventional":
        setParameters({
          airWar: 75,
          naval: 60,
          ground: 80,
          duration: 14,
          nuclear: false,
        });
        break;
      case "nuclear":
        setParameters({
          airWar: 90,
          naval: 70,
          ground: 90,
          duration: 21,
          nuclear: true,
        });
        break;
    }
  };

  return (
    <div>
      {/* Preset Scenarios */}
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold mb-4">Preset Scenarios</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetScenario("peaceful")}
          >
            Reset (Peaceful)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetScenario("limited")}
          >
            Limited Skirmish
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetScenario("conventional")}
          >
            Full Conventional War
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetScenario("nuclear")}
          >
            Nuclear Exchange
          </Button>
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold mb-4">
        Adjust Conflict Parameters
      </h3>

      {/* Air War Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-neutral-700">
            <Plane className="inline-block mr-1 h-4 w-4" /> Air War Intensity
          </label>
          <span className="text-sm text-neutral-600">
            {getAirWarLabel(parameters.airWar)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={parameters.airWar}
          className="simulation-slider w-full"
          onChange={(e) =>
            setParameters({ ...parameters, airWar: parseInt(e.target.value) })
          }
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>No Airstrikes</span>
          <span>Limited</span>
          <span>Full Air Campaign</span>
        </div>
      </div>

      {/* Naval Engagement Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-neutral-700">
            <Ship className="inline-block mr-1 h-4 w-4" /> Naval Engagement
          </label>
          <span className="text-sm text-neutral-600">
            {getNavalLabel(parameters.naval)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={parameters.naval}
          className="simulation-slider w-full"
          onChange={(e) =>
            setParameters({ ...parameters, naval: parseInt(e.target.value) })
          }
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>None</span>
          <span>Naval Skirmishes</span>
          <span>Full Blockade</span>
        </div>
      </div>

      {/* Ground Offensive Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-neutral-700">
            <Anchor className="inline-block mr-1 h-4 w-4" /> Ground Offensive
          </label>
          <span className="text-sm text-neutral-600">
            {getGroundLabel(parameters.ground)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={parameters.ground}
          className="simulation-slider w-full"
          onChange={(e) =>
            setParameters({ ...parameters, ground: parseInt(e.target.value) })
          }
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>No Ground War</span>
          <span>Limited Battles</span>
          <span>Full Invasion</span>
        </div>
      </div>

      {/* Nuclear Toggle */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-neutral-700">
            <Rocket className="inline-block mr-1 h-4 w-4" /> Nuclear Weapons Use
          </label>
        </div>
        <div className="flex items-center">
          <Switch
            checked={parameters.nuclear}
            onCheckedChange={(checked) =>
              setParameters({ ...parameters, nuclear: checked })
            }
          />
          <span className="ml-2 text-sm text-neutral-600">
            {parameters.nuclear ? "Enabled" : "Disabled"}
          </span>
        </div>
        {parameters.nuclear && (
          <div className="text-xs text-error font-semibold mt-1">
            Warning: Enabling nuclear exchange dramatically increases casualties
          </div>
        )}
      </div>

      {/* Duration Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold text-neutral-700">
            <Clock className="inline-block mr-1 h-4 w-4" /> Conflict Duration
          </label>
          <span className="text-sm text-neutral-600">
            {getDurationLabel(parameters.duration)}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={parameters.duration}
          className="simulation-slider w-full"
          onChange={(e) =>
            setParameters({
              ...parameters,
              duration: parseInt(e.target.value),
            })
          }
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>Days</span>
          <span>Weeks</span>
          <span>Month</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
