import React, { useState } from 'react';
import { ProgressTabs } from '../components/progress/ProgressTabs';
import { NationalOverview } from '../components/progress/national/NationalOverview';
import { RegionalProgress } from '../components/progress/regional/RegionalProgress';
import { SchoolProgress } from '../components/progress/school/SchoolProgress';
import { ComparativeAnalysis } from '../components/progress/comparative/ComparativeAnalysis';
import { ChallengesDashboard } from '../components/progress/challenges/ChallengesDashboard';
import { ReportsDashboard } from '../components/progress/reports/ReportsDashboard';
import { SchoolProgressDashboard } from '../components/progress/school/SchoolProgressDashboard';
import { useAuth } from '../contexts/AuthContext';

type TabType =
  | 'national'
  | 'regional'
  | 'school'
  | 'comparative'
  | 'challenges'
  | 'reports';

export function ProgressPage() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const [activeTab, setActiveTab] = useState<TabType>(
    isSuperAdmin ? 'reports' : 'national'
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'regional':
        return <RegionalProgress />;
      case 'school':
        return <SchoolProgressDashboard />;
      case 'comparative':
        return <ComparativeAnalysis />;
      case 'challenges':
        return <ChallengesDashboard />;
      case 'reports':
        return isSuperAdmin ? (
          <ReportsDashboard />
        ) : (
          <RegionalProgress />
        );
      default:
        return <RegionalProgress />;
     
    }
  };

  const availableTabs: TabType[] = [
    'national',
    'regional',
    'school',
    'comparative',
    'challenges',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Progress Monitoring Dashboard
        </h1>
        <p className="text-lg opacity-90">
          Track, analyze, and optimize school standardization progress across
          the nation
        </p>
      </div>

      <ProgressTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        availableTabs={availableTabs}
      />

      <div className="bg-white rounded-lg shadow-md">{renderTabContent()}</div>
    </div>
  );
}
