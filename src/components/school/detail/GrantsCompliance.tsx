import React from 'react';
import { School } from '../../../types/school';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { SchoolDetail } from '../../../types/schoolDetail';

interface GrantsComplianceProps {
  school: SchoolDetail;
}

export function GrantsCompliance({ school }: GrantsComplianceProps) {
  // Replace hardcoded grantData with data from school
  const grantData = school.grantUtilization.map((utilization) => ({
    month: utilization.month,
    received: utilization.grantsReceived,
    utilized: utilization.grantsUtilized,
  }));

  // Replace hardcoded complianceVisits with data from school
  const complianceVisits = school.complianceVisits.map((visit) => ({
    type: visit.type,
    lastVisit: visit.lastVisit,
    status: visit.status,
  }));

  return (
    <div className="space-y-6">
      {/* Grant Utilization */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Grant Utilization</h3>
            <p className="text-sm text-gray-500">Financial year 2023-24</p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={grantData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="received" name="Grants Received" fill="#4f46e5" />
              <Bar dataKey="utilized" name="Grants Utilized" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compliance Visits */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Compliance Visits</h3>
            <p className="text-sm text-gray-500">Recent inspections and audits</p>
          </div>
        </div>

        <div className="space-y-4">
          {complianceVisits.map((visit) => (
            <div
              key={visit.type}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-900">{visit.type}</div>
                <div className="text-sm text-gray-500">
                  Last Visit: {new Date(visit.lastVisit).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  visit.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-800">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Upcoming Compliance Requirements</span>
        </div>
        <ul className="mt-2 space-y-1 text-sm text-yellow-700">
          {school.upcomingComplianceRequirements.map((requirement) => (
            <li key={requirement.type}>
              {requirement.type} due on {requirement.deadline}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}