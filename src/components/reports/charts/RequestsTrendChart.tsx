import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CombinedResourceData } from "../../../types/reports.ts";
import { format, parseISO, startOfMonth, eachMonthOfInterval } from "date-fns";

interface RequestsTrendChartProps {
  data: CombinedResourceData[];
}

export function RequestsTrendChart({ data }: RequestsTrendChartProps) {
  const dateRange = data.reduce(
    (acc, curr) => {
      const date = parseISO(curr.createdAt);
      return {
        start: date < acc.start ? date : acc.start,
        end: date > acc.end ? date : acc.end,
      };
    },
    { start: new Date(), end: new Date(0) }
  );

  const months = eachMonthOfInterval({
    start: startOfMonth(dateRange.start),
    end: dateRange.end,
  });

  const chartData = months.map((month) => {
    const monthStr = format(month, "yyyy-MM");
    const monthData = data.filter(
      (item) => format(parseISO(item.createdAt), "yyyy-MM") === monthStr
    );

    return {
      month: format(month, "MMM yyyy"),
      total: monthData.length,
      critical: monthData.filter((item) => item.priority === "critical").length,
      high: monthData.filter((item) => item.priority === "high").length,
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Requests"
            stroke="#4f46e5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="critical"
            name="Critical Requests"
            stroke="#ef4444"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="high"
            name="High Priority"
            stroke="#f59e0b"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
