import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ResourceVisualizationProps {
  results: any;
}

export function ResourceVisualization({ results }: ResourceVisualizationProps) {
  const resourceDistribution = [
    { name: 'Teachers', value: results.teachers },
    { name: 'Classrooms', value: results.classrooms },
    { name: 'Washrooms', value: results.washrooms },
    { name: 'Computers', value: results.computers },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#6366F1', '#8B5CF6'];

  const costBreakdown = [
    {
      category: 'Infrastructure',
      cost: results.costBreakdown.infrastructure,
    },
    {
      category: 'Teaching',
      cost: results.costBreakdown.teaching,
    },
    {
      category: 'Equipment',
      cost: results.costBreakdown.equipment,
    },
    {
      category: 'Facilities',
      cost: results.costBreakdown.facilities,
    },
    {
      category: 'Other',
      cost: results.costBreakdown.other,
    },
  ];

  return (
    <div className="mt-12 space-y-8">
      <h3 className="text-xl font-bold text-gray-800">Resource Distribution</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Resource Requirements</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#374151"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {resourceDistribution[index].name} ({value})
                      </text>
                    );
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {resourceDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Cost Distribution</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="cost" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
