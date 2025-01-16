import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  School as SchoolIcon,
  MapPin,
  Calendar,
  Users,
  Building2,
  BookOpen,
  Shield,
  Settings,
  ClipboardCheck,
  FileText,
} from 'lucide-react';
import { BasicInfo } from '../components/school/detail/BasicInfo';
import { PerformanceOverview } from '../components/school/detail/PerformanceOverview';
import { InfrastructureOverview } from '../components/school/detail/InfrastructureOverview';
import { StudentTeacherData } from '../components/school/detail/StudentTeacherData';
import { FacilitiesOverview } from '../components/school/detail/FacilitiesOverview';
import { GrantsCompliance } from '../components/school/detail/GrantsCompliance';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useSchoolDetail } from '../hooks/useSchoolDetail';
import { ComplianceChecklist } from '../components/school/detail/ComplianceChecklist';
import { ManagementInfo } from '../components/school/detail/ManagementInfo';

type TabType =
  | 'overview'
  | 'facilities'
  | 'demographics'
  | 'performance'
  | 'compliance'
  | 'additional'
  | 'checklist'
  | 'management';

export function SchoolDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { school, loading, error } = useSchoolDetail(id!);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
    console.log(school);
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!school) return <div>School not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'facilities', label: 'Facilities & Infrastructure', icon: Building2 },
    { id: 'demographics', label: 'Students & Teachers', icon: Users },
    // { id: 'compliance', label: 'Grants & Compliance', icon: Calendar },
    { id: 'checklist', label: 'Compliance Checklist', icon: ClipboardCheck },
    { id: 'management', label: 'Management & Governance', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              {school[0].logoUrl ? (
                <img
                  src={school[0].logoUrl}
                  alt={`${school[0].name} logo`}
                  className="h-8 w-8"
                />
              ) : (
                <SchoolIcon className="h-8 w-8" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{school[0].schoolName}</h1>
              <div className="flex items-center gap-2 mt-2 text-indigo-100">
                <MapPin className="h-4 w-4" />
                <span>
                  {school[0].district}, {school[0].state}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{school[0].totalStudents}</div>
              <div className="text-sm text-indigo-100">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{school[0].totalTeachers}</div>
              <div className="text-sm text-indigo-100">Teachers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
              {school[0].availableFacilities ? Object.keys(school[0].availableFacilities).length : 0}
              </div>
              <div className="text-sm text-indigo-100">Facilities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{school[0].qualityScore.toFixed(2)}</div>
              <div className="text-sm text-indigo-100">Quality Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4 w-full overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    group inline-flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${
                      activeTab === tab.id
                        ? 'text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {activeTab === 'overview' && (
            <>
              <BasicInfo school={school[0]} />
              {/* <PerformanceOverview school={school[0]} /> */}
              {/* <InfrastructureOverview school={school[0]} /> */}
            </>
          )}

          {activeTab === 'facilities' && (
            <>
              {/* <InfrastructureOverview school={school[0]} /> */}
              <FacilitiesOverview school={school[0]} />
            </>
          )}

          {activeTab === 'demographics' && (
            <StudentTeacherData school={school[0]} />
          )}

          {activeTab === 'performance' && (
            <PerformanceOverview school={school[0]} />
          )}

          {/* {activeTab === 'compliance' && <GrantsCompliance school={school[0]} />} */}

          {activeTab === 'checklist' && <ComplianceChecklist school={school[0]} />}

          {activeTab === 'management' && <ManagementInfo school={school[0]} />}
        </div>
      </main>
    </div>
  );
}
