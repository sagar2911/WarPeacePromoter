import { Conflict } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface HistoricalChartProps {
  historicalData?: Conflict[];
  isLoading: boolean;
}

const HistoricalChart = ({ historicalData, isLoading }: HistoricalChartProps) => {
  if (isLoading || !historicalData) {
    return (
      <div className="chart-container h-80">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const chartData = historicalData.map((conflict) => ({
    name: conflict.name.split(" ").slice(0, 2).join(" "),
    civilian: conflict.civilianDeaths,
    military: conflict.militaryDeathsIndia + conflict.militaryDeathsPakistan,
    year: conflict.year,
  }));

  return (
    <div className="chart-container h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              return [
                `${value.toLocaleString()} deaths`, 
                name === "civilian" ? "Civilian" : "Military"
              ];
            }}
            labelFormatter={(value, item) => {
              const conflict = item[0]?.payload;
              return `${conflict?.name} (${conflict?.year})`;
            }}
          />
          <Legend />
          <Bar dataKey="civilian" name="Civilian Deaths" fill="#EB455F" />
          <Bar dataKey="military" name="Military Deaths" fill="#2B3467" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
