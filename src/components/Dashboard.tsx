import React from 'react';
import { School, TrendingUp, Building2, Clock } from 'lucide-react';
import { StatCard } from './StatCard';
import { SchoolStats } from '../types/school';

const mockStats: SchoolStats = {
  totalSchools: 145012,
  oddStructures: 20728,
  standardizedSchools: 124284,
  inTransition: 15420,
  percentageOdd: 14.28
};

export function Dashboard() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">National Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Schools"
          value={mockStats.totalSchools.toLocaleString()}
          icon={School}
        />
        <StatCard
          title="Odd Structures"
          value={mockStats.oddStructures.toLocaleString()}
          icon={Building2}
          trend={-2.5}
        />
        <StatCard
          title="Standardized Schools"
          value={mockStats.standardizedSchools.toLocaleString()}
          icon={TrendingUp}
          trend={3.2}
        />
        <StatCard
          title="In Transition"
          value={mockStats.inTransition.toLocaleString()}
          icon={Clock}
        />
      </div>
    </div>
  );
}