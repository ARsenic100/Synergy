import React, { useState, useEffect } from 'react';
import { School } from '../../../types/school';
import { SchoolSearch } from './SchoolSearch';
import { ProgressMetrics } from './ProgressMetrics';
import { ProgressTimeline } from './ProgressTimeline';
import { AIRecommendations } from './AIRecommendations';
import { ProgressMilestones } from './ProgressMilestones';
import { RecentActivity } from './RecentActivity';
import { useSchoolProgress } from '../../../hooks/useSchoolProgress';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function SchoolProgressDashboard() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const { 
    progress, 
    loading, 
    error,
    recentActivity,
    fetchSchoolProgress 
  } = useSchoolProgress();

  useEffect(() => {
    if (selectedSchool) {
      fetchSchoolProgress(selectedSchool.id);
    }
  }, [selectedSchool]);

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <SchoolSearch onSchoolSelect={setSelectedSchool} />

      {selectedSchool ? (
        loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ProgressMetrics metrics={progress?.metrics} />
              <ProgressTimeline school={selectedSchool} />
              <RecentActivity activities={recentActivity} />
            </div>
            <div className="space-y-6">
              <AIRecommendations recommendations={progress?.recommendations} />
              <ProgressMilestones 
                milestones={progress?.milestones}
                schoolId={selectedSchool.id}
              />
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Select a school to view progress details
          </p>
        </div>
      )}
    </div>
  );
}