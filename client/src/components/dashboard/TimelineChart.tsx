import { TimelineDataPoint } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface TimelineChartProps {
  timelineData?: TimelineDataPoint[];
}

const TimelineChart = ({ timelineData }: TimelineChartProps) => {
  if (!timelineData) {
    return (
      <div className="chart-container">
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={timelineData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="civilianDeaths"
            name="Civilian Deaths"
            stroke="#EB455F"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="militaryDeaths"
            name="Military Deaths"
            stroke="#2B3467"
          />
          <Line
            type="monotone"
            dataKey="militantDeaths"
            name="Militant Deaths"
            stroke="#FFA500"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
