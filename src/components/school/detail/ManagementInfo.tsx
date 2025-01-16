import React from 'react';
import { School } from '../../../types/school';
import {
  Users,
  FileText,
  TrendingUp,
  Database,
  Shield,
  BookOpen,
} from 'lucide-react';
import { SchoolDetail } from '../../../types/schoolDetail';

interface ManagementInfoProps {
  school: SchoolDetail;
}

export function ManagementInfo({ school }: ManagementInfoProps) {
  const managementCategories = [
    {
      title: 'Governance Structure',
      icon: Users,
      items: [
        { label: 'Management Structure', status: school.managementStructure ? 'Established' : 'Not Established' },
        { label: 'Support Systems', status: school.supportSystems ? 'Active' : 'Inactive' },
        { label: 'Monitoring Practices', status: school.monitoringAndEvaluationPractices ? 'Regular' : 'Irregular' },
      ],
    },
    {
      title: 'Academic Management',
      icon: BookOpen,
      items: [
        { label: 'Curriculum Implementation', status: school.curriculumImplementation ? 'Standard' : 'Needs Improvement' },
        { label: 'Teacher Training', status: school.qualifiedAndTrainedTeachers ? 'Qualified' : 'Not Qualified' },
        { label: 'Learning Environment', status: school.supportiveLearningEnvironment ? 'Supportive' : 'Unsupportive' },
      ],
    },
    {
      title: 'Financial Management',
      icon: TrendingUp,
      items: [
        { label: 'Fund Utilization', status: school.timelyFundUtilization ? 'Timely' : 'Delayed' },
        { label: 'Annual Audits', status: school.fundsAuditedAnnually ? 'Completed' : 'Pending' },
        { label: 'Resource Efficiency', status: school.resourceUtilizationEfficiency ? 'Optimized' : 'Needs Improvement' },
      ],
    },
    {
      title: 'Data & Reporting',
      icon: Database,
      items: [
        { label: 'Student Records', status: school.studentTracking ? 'Digital' : 'Manual' },
        { label: 'Performance Tracking', status: school.performanceOverview && school.performanceOverview.length > 0 ? 'Regular' : 'Irregular' },
        { label: 'Compliance Reports', status: school.dataManagementAndReporting ? 'Up-to-date' : 'Outdated' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {managementCategories.map((category) => {
        const Icon = category.icon;
        return (
          <div
            key={category.title}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.label}
                  className="p-4 bg-gray-50 rounded-lg space-y-2"
                >
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="font-medium text-gray-900">{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
