import React, { useState } from "react";
import { CombinedResourceData, ResourceFilters } from "../../types/reports.ts";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface ReportsTableProps {
  data: CombinedResourceData[];
  filters: ResourceFilters;
  onFilterChange: (filters: ResourceFilters) => void;
}

export function ReportsTable({
  data,
  filters,
  onFilterChange,
}: ReportsTableProps) {
  const [sortField, setSortField] =
    useState<keyof CombinedResourceData>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof CombinedResourceData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "School Code",
                "Request Type",
                "Status",
                "Priority",
                "Quantity",
                "Utilization",
                "Created At",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(
                      header
                        .toLowerCase()
                        .replace(" ", "") as keyof CombinedResourceData
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortField === header.toLowerCase().replace(" ", "") &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.schoolUdiseCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.requestType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.priority === "critical"
                        ? "bg-red-100 text-red-800"
                        : item.priority === "high"
                        ? "bg-orange-100 text-orange-800"
                        : item.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.utilizationPercentage >= 80
                            ? "bg-green-500"
                            : item.utilizationPercentage >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${item.utilizationPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm">
                      {item.utilizationPercentage}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, data.length)} of {data.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
