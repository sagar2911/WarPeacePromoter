import { Hotspot } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConflictMapProps {
  hotspots?: Hotspot[];
}

const ConflictMap = ({ hotspots }: ConflictMapProps) => {
  if (!hotspots) {
    return (
      <div className="h-64 w-full bg-neutral-200 rounded-lg relative overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="h-64 w-full bg-neutral-200 rounded-lg relative overflow-hidden">
      {/* This would be replaced with a proper map implementation */}
      <div className="w-full h-full flex items-center justify-center bg-gray-300">
        <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple outline of India-Pakistan border region */}
          <path d="M200,100 C250,80 300,90 350,100 C400,110 450,130 500,150 C550,170 600,200 650,250 C700,300 750,350 780,400" 
                stroke="#2B3467" strokeWidth="3" fill="none"/>
          
          {/* Example hotspots */}
          {hotspots.map((hotspot, index) => (
            <circle 
              key={index} 
              cx={hotspot.x || 300 + index * 100} 
              cy={hotspot.y || 200} 
              r="10" 
              fill={hotspot.type === 'civilian' ? '#EB455F' : '#2B3467'} 
              className="hover:opacity-80 cursor-pointer"
            />
          ))}
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-xs">
        Map data: <span>OpenStreetMap, conflict data</span>
      </div>
    </div>
  );
};

export default ConflictMap;
