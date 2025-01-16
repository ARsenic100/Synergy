import React from 'react';
import { Heart } from 'lucide-react';

interface SpecialNeedsSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function SpecialNeedsSection({
  formData,
  onChange,
  errors,
}: SpecialNeedsSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.communityParticipation}
              onChange={(e) => onChange('communityParticipation', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Community Participation</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.activeSchoolManagementCommittee}
              onChange={(e) => onChange('activeSchoolManagementCommittee', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Active School Management Committee</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.communityEngagement}
              onChange={(e) => onChange('communityEngagement', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Community Engagement</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.integrationWithAnganwadiCenters}
              onChange={(e) => onChange('integrationWithAnganwadiCenters', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Integration with Anganwadi Centers</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.coLocationWithAnganwadiCenters}
              onChange={(e) => onChange('coLocationWithAnganwadiCenters', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Co-Location with Anganwadi Centers</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.KGBVUpgraded}
              onChange={(e) => onChange('KGBVUpgraded', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>KGBV Upgraded</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.provisionOfStipendsForCWSNGirls}
              onChange={(e) => onChange('provisionOfStipendsForCWSNGirls', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Provision of Stipends for CWSN Girls</span>
          </label>
        </div>
      </div>
    </div>
  );
}