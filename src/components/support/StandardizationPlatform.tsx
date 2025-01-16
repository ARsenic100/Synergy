import React, { useState } from 'react';
import { GuidesList } from './guides/GuideList';
import { TrainingList } from './training/TrainingList';
import { BestPracticesList } from './practices/BestPracticesList';
import { ToolsList } from './tools/ToolsList';
import { BookOpen, GraduationCap, FileText, Wrench } from 'lucide-react';

type ActiveSection = 'guides' | 'training' | 'practices' | 'tools' | null;

export function StandardizationPlatform() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'guides':
        return <GuidesList />;
      case 'training':
        return <TrainingList />;
      case 'practices':
        return <BestPracticesList />;
      case 'tools':
        return <ToolsList />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setActiveSection('guides')}
                className="bg-indigo-50 p-6 rounded-lg hover:bg-indigo-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold">Step-by-Step Guides</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Access comprehensive guides for infrastructure planning, grade
                  reconfiguration, and compliance requirements.
                </p>
              </button>

              <button
                onClick={() => setActiveSection('training')}
                className="bg-green-50 p-6 rounded-lg hover:bg-green-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Training Modules</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Interactive training programs for staff development and
                  standardization process management.
                </p>
              </button>

              <button
                onClick={() => setActiveSection('practices')}
                className="bg-yellow-50 p-6 rounded-lg hover:bg-yellow-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold">Best Practices</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Learn from successful case studies and proven methodologies
                  for school standardization.
                </p>
              </button>

              <button
                onClick={() => setActiveSection('tools')}
                className="bg-purple-50 p-6 rounded-lg hover:bg-purple-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold">
                    Implementation Tools
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Access practical tools and templates for planning, tracking,
                  and managing your standardization process.
                </p>
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Standardization Support Platform
        </h2>
        <p className="text-gray-600">
          Access comprehensive guides, training modules, and resources to
          support your school's transition to standardized structures.
        </p>
      </div>

      {renderContent()}
    </div>
  );
}
