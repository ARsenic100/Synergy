import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ProgressChart() {
  const data = [
    { month: 'Jan', infrastructure: 45, staffTraining: 30, compliance: 40 },
    { month: 'Feb', infrastructure: 52, staffTraining: 42, compliance: 55 },
    { month: 'Mar', infrastructure: 68, staffTraining: 58, compliance: 70 },
    { month: 'Apr', infrastructure: 82, staffTraining: 68, compliance: 90 }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="infrastructure" 
          name="Infrastructure" 
          stroke="#4f46e5" 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="staffTraining" 
          name="Staff Training" 
          stroke="#10b981" 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="compliance" 
          name="Compliance" 
          stroke="#f59e0b" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}