import React from "react";
import { OverviewMetrics } from "../../types/reports.ts";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart2,
} from "lucide-react";

interface ReportsOverviewProps {
  metrics: OverviewMetrics;
}

export function ReportsOverview({ metrics }: ReportsOverviewProps) {
  const cards = [
    {
      title: "Total Requests",
      value: metrics.totalRequests,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Requests",
      value: metrics.pendingRequests,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Approved Requests",
      value: metrics.approvedRequests,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Critical Requests",
      value: metrics.criticalRequests,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Completed Requests",
      value: metrics.completedRequests,
      icon: BarChart2,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Avg. Utilization",
      value: `${metrics.averageUtilization.toFixed(1)}%`,
      icon: TrendingUp,
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
