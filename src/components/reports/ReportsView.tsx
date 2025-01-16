import React, { useState, useEffect } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { ReportsOverview } from "./ReportsOverview";
import { ReportsChartView } from "./ReportsChartView";
import { ReportsTable } from "./ReportsTable";
import { reportsService } from "../../services/reportsService.ts";
import { CombinedResourceData, ResourceFilters } from "../../types/reports.ts";

interface ReportsViewProps {
  onBack: () => void;
}

export function ReportsView({ onBack }: ReportsViewProps) {
  const [viewMode, setViewMode] = useState<"overview" | "charts" | "table">(
    "overview"
  );
  const [data, setData] = useState<CombinedResourceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ResourceFilters>({
    status: [],
    requestType: [],
    priority: [],
    utilizationRange: [0, 100],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const combinedData = await reportsService.fetchCombinedData();
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = reportsService.calculateOverviewMetrics(data);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode("overview")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "overview"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode("charts")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "charts"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "table"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Detailed View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {viewMode === "overview" && <ReportsOverview metrics={metrics} />}
          {viewMode === "charts" && <ReportsChartView data={data} />}
          {viewMode === "table" && (
            <ReportsTable
              data={data}
              filters={filters}
              onFilterChange={setFilters}
            />
          )}
        </>
      )}
    </div>
  );
}
