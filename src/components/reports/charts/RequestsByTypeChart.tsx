import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CombinedResourceData } from "../../../types/reports.ts";

interface RequestsByTypeChartProps {
  data: CombinedResourceData[];
}

export function RequestsByTypeChart({ data }: RequestsByTypeChartProps) {
  const chartData = Object.entries(
    data.reduce((acc, curr) => {
      const key = curr.requestType;
      if (!acc[key]) {
        acc[key] = {
          type: key,
          pending: 0,
          approved: 0,
          completed: 0,
          rejected: 0,
        };
      }
      acc[key][curr.status]++;
      return acc;
    }, {} as Record<string, any>)
  ).map(([_, value]) => value);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pending"
            name="Pending"
            fill="#fbbf24"
            stackId="stack"
          />
          <Bar
            dataKey="approved"
            name="Approved"
            fill="#34d399"
            stackId="stack"
          />
          <Bar
            dataKey="completed"
            name="Completed"
            fill="#60a5fa"
            stackId="stack"
          />
          <Bar
            dataKey="rejected"
            name="Rejected"
            fill="#ef4444"
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
