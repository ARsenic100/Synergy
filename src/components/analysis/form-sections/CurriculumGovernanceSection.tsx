import React from 'react';
import { Shield } from 'lucide-react';

interface CurriculumGovernanceSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function CurriculumGovernanceSection({
  formData,
  onChange,
  errors,
}: CurriculumGovernanceSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-4">
        Management & Governance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.annualMaintenance}
              onChange={(e) => onChange('annualMaintenance', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Annual Maintenance of School Infrastructure</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.schoolMapping}
              onChange={(e) => onChange('schoolMapping', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>School Mapping and Planning</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.studentTracking}
              onChange={(e) => onChange('studentTracking', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Student Tracking and Monitoring</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.governanceAndManagement}
              onChange={(e) => onChange('governanceAndManagement', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Governance and Management</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.monitoringAndEvaluationPractices}
              onChange={(e) => onChange('monitoringAndEvaluationPractices', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Monitoring and Evaluation Practices</span>
          </label>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.managementStructure}
              onChange={(e) => onChange('managementStructure', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Management Structure</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.researchAndDevelopmentEngagement}
              onChange={(e) => onChange('researchAndDevelopmentEngagement', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Engagement in Research and Development</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.supportSystems}
              onChange={(e) => onChange('supportSystems', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Support Systems</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.dataManagementAndReporting}
              onChange={(e) => onChange('dataManagementAndReporting', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Data Management and Reporting</span>
          </label>
        </div>
      </div>

      <h3 className="font-medium text-gray-900 mt-6 mb-4">
        Financial Compliance
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.freeAndCompulsoryEducation}
              onChange={(e) => onChange('freeAndCompulsoryEducation', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Free and Compulsory Education</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.nonDiscrimination}
              onChange={(e) => onChange('nonDiscrimination', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Non-Discrimination</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.timelyFundUtilization}
              onChange={(e) => onChange('timelyFundUtilization', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Timely Fund Utilization</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.fundsAuditedAnnually}
              onChange={(e) => onChange('fundsAuditedAnnually', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Funds Audited Annually</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.resourceUtilizationEfficiency}
              onChange={(e) => onChange('resourceUtilizationEfficiency', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Resource Utilization Efficiency</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.financialManagement}
              onChange={(e) => onChange('financialManagement', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Financial Management</span>
          </label>
        </div>
      </div>
    </div>
  );
}