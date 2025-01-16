import React from "react";
import { CombinedResourceData } from "../../types/reports.ts";
import { RequestsByTypeChart } from "./charts/RequestsByTypeChart";
import { UtilizationPieChart } from "./charts/UtilizationPieChart";
import { RequestsTrendChart } from "./charts/RequestsTrendChart";
import { BarChart2, PieChart, TrendingUp } from "lucide-react";

interface ReportsChartViewProps {
  data: CombinedResourceData[];
}

export function ReportsChartView({ data }: ReportsChartViewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <BarChart2 className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="font-medium">Requests by Type</h3>
          </div>
          <RequestsByTypeChart data={data} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <PieChart className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium">Resource Utilization</h3>
          </div>
          <UtilizationPieChart data={data} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-medium">Request Trends</h3>
        </div>
        <RequestsTrendChart data={data} />
      </div>
    </div>
  );
}
