import React from 'react';
import { School } from '../../../types/school';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SchoolDetail } from '../../../types/schoolDetail';

interface InfrastructureOverviewProps {
  school: SchoolDetail;
}

export function InfrastructureOverview({ school }: InfrastructureOverviewProps) {
  const schoolDetail = school;
  console.log(schoolDetail.classroomCondition)

  const classroomConditionTotals =
    schoolDetail.classroomCondition[0].goodCondition +
    schoolDetail.classroomCondition[0].minorRepair +
    schoolDetail.classroomCondition[0].majorRepair;

  const classroomConditionData = [
    {
      name: 'Good Condition',
      value:
        (schoolDetail.classroomCondition[0].goodCondition / classroomConditionTotals) *
        100,
    },
    {
      name: 'Minor Repair',
      value:
        (schoolDetail.classroomCondition[0].minorRepair / classroomConditionTotals) *
        100,
    },
    {
      name: 'Major Repair',
      value:
        (schoolDetail.classroomCondition[0].majorRepair / classroomConditionTotals) *
        100,
    },
  ];

  const resourceDistributionData = [
    {
      category: 'Teaching Staff',
      current: schoolDetail.resourceDistribution[0].teachingStaff.current,
      required: schoolDetail.resourceDistribution[0].teachingStaff.required,
    },
    {
      category: 'Classrooms',
      current: schoolDetail.resourceDistribution[0].classrooms.current,
      required: schoolDetail.resourceDistribution[0].classrooms.required,
    },
    {
      category: 'Labs',
      current: schoolDetail.resourceDistribution[0].labs.current,
      required: schoolDetail.resourceDistribution[0].labs.required,
    },
  ];

  const COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Classroom Condition Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Classroom Condition</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={classroomConditionData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {classroomConditionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource Distribution Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Current" fill="#4f46e5" />
              <Bar dataKey="required" name="Required" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}