import React from 'react';
import { School } from '../../../types/school';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ComparisonChartProps {
  schools: School[];
  metric: 'students' | 'teachers' | 'facilities';
}

export function ComparisonChart({ schools, metric }: ComparisonChartProps) {
  const getData = () => {
    return schools.map((school) => ({
      name: school.name,
      value:
        metric === 'students'
          ? school.studentCount
          : metric === 'teachers'
          ? school.teacherCount
          : school.facilities.length,
    }));
  };

  const getMetricLabel = () => {
    switch (metric) {
      case 'students':
        return 'Student Count';
      case 'teachers':
        return 'Teacher Count';
      case 'facilities':
        return 'Number of Facilities';
    }
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={getData()}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name={getMetricLabel()} fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
