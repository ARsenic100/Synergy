import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, LineChart, Line
} from 'recharts';
import { KPICard } from './KPICard';
import {
  TransitionProgress,
  MonthlyProgress,
  RegionalData,
  KPIMetric
} from '../../types/progress';
import {
  getStateProgress,
  getMonthlyProgress,
  getRegionalData,
  getKPIMetrics
} from '../../services/progressService';

export function ProgressDashboard() {
  const [stateProgress, setStateProgress] = useState<TransitionProgress[]>([]);
  const [monthlyProgress, setMonthlyProgress] = useState<MonthlyProgress[]>([]);
  const [regionalData, setRegionalData] = useState<RegionalData[]>([]);
  const [kpiMetrics, setKPIMetrics] = useState<KPIMetric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [progress, monthly, regional, kpis] = await Promise.all([
        getStateProgress(),
        getMonthlyProgress(),
        getRegionalData(),
        getKPIMetrics()
      ]);

      setStateProgress(progress);
      setMonthlyProgress(monthly);
      setRegionalData(regional);
      setKPIMetrics(kpis);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Progress Monitoring Dashboard</h2>
        <p className="text-gray-600">
          Track the progress of school standardization across states and districts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">State-wise Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="standardizedSchools" name="Standardized" fill="#4f46e5" />
                <Bar dataKey="inTransition" name="In Transition" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Transition Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="standardized"
                  name="Standardized"
                  stackId="1"
                  fill="#4f46e5"
                  stroke="#4338ca"
                />
                <Area
                  type="monotone"
                  dataKey="inTransition"
                  name="In Transition"
                  stackId="1"
                  fill="#fbbf24"
                  stroke="#d97706"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  name="Pending"
                  stackId="1"
                  fill="#e5e7eb"
                  stroke="#9ca3af"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Regional Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="standardizedPercentage"
                name="Standardized %"
                stroke="#4f46e5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="inTransitionPercentage"
                name="In Transition %"
                stroke="#fbbf24"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}