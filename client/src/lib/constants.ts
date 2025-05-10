// Simulation labels
export const AIR_WAR_LABELS = {
  0: "None",
  25: "Limited Airstrikes",
  50: "Moderate Air Campaign",
  75: "Intensive Air Strikes",
  100: "Full Air War"
};

export const NAVAL_LABELS = {
  0: "None",
  25: "Minor Skirmishes",
  50: "Naval Engagements",
  75: "Naval Blockade",
  100: "Full Naval War"
};

export const GROUND_LABELS = {
  0: "None",
  25: "Border Skirmishes",
  50: "Limited Ground Combat",
  75: "Major Ground Operations",
  100: "Full Ground Invasion"
};

// Preset scenarios
export const PRESET_SCENARIOS = {
  peaceful: {
    airWar: 0,
    naval: 0,
    ground: 0,
    duration: 1,
    nuclear: false
  },
  limited: {
    airWar: 15,
    naval: 10,
    ground: 20,
    duration: 5,
    nuclear: false
  },
  conventional: {
    airWar: 75,
    naval: 60,
    ground: 80,
    duration: 14,
    nuclear: false
  },
  nuclear: {
    airWar: 90,
    naval: 70,
    ground: 90,
    duration: 21,
    nuclear: true
  }
};

// App sections for navigation
export const APP_SECTIONS = [
  {
    name: "Live War Dashboard",
    path: "/"
  },
  {
    name: "War Simulation Tool",
    path: "/simulation"
  },
  {
    name: "Past Conflicts Statistics",
    path: "/past-conflicts"
  },
  {
    name: "About & Data Sources",
    path: "/about"
  }
];
