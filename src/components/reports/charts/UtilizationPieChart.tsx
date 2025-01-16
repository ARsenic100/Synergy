import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CombinedResourceData } from "../../../types/reports.ts";

interface UtilizationPieChartProps {
  data: CombinedResourceData[];
}

export function UtilizationPieChart({ data }: UtilizationPieChartProps) {
  const chartData = Object.entries(
    data.reduce((acc, curr) => {
      const range =
        curr.utilizationPercentage >= 80
          ? "High"
          : curr.utilizationPercentage >= 50
          ? "Medium"
          : "Low";
      if (!acc[range]) acc[range] = 0;
      acc[range]++;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#34d399", "#fbbf24", "#ef4444"];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
