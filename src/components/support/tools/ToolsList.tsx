import React from 'react';
import { ResourcePlanningCalculator } from '../../calculators/ResourcePlanningCalculator';
import {
  ArrowLeft,
  FileSpreadsheet,
  FileText,
  BarChart2,
  Calculator,
} from 'lucide-react';
import { TransitionPlanTemplate } from '../../transition/TransitionPlanTemplate';
import { ComplianceChecklist } from '../../compliance/ComplianceChecklist';

interface ToolsListProps {
  onBack: () => void;
}

export function ToolsList() {
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);

  if (selectedTool === 'resource-calculator') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedTool(null)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>

        <ResourcePlanningCalculator />
      </div>
    );
  }
  if (selectedTool === 'transition-template') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedTool(null)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>

        <TransitionPlanTemplate />
      </div>
    );
  }
  if (selectedTool === 'compliance-checklist') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedTool(null)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>

        <ComplianceChecklist />
      </div>
    );
  }

  const implementationTools = [
    {
      id: 'resource-calculator',
      title: 'Resource Planning Calculator',
      description:
        'Calculate required resources based on student population and grade structure',
      icon: Calculator,
      category: 'planning',
    },
    {
      id: 'transition-template',
      title: 'Transition Plan Template',
      description:
        'Customizable template for planning and tracking your standardization journey',
      icon: FileSpreadsheet,
      category: 'planning',
    },
    {
      id: 'compliance-checklist',
      title: 'Compliance Checklist',
      description:
        'Comprehensive checklist to ensure alignment with standardization requirements',
      icon: FileText,
      category: 'compliance',
    },
   
  ];

  return (
    <div className="space-y-6">
      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
        <ArrowLeft className="h-4 w-4" />
        Back to Overview
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {implementationTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => {
                if (tool.link) {
                  window.open(tool.link, '_blank');
                } else {
                  setSelectedTool(tool.id);
                }
              }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group text-left"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
