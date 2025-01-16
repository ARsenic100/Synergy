import React from 'react';
import { BookOpen, Calendar, Check, Plus, Minus, X } from 'lucide-react';

interface GrantsComplianceSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function GrantsComplianceSection({
  formData,
  onChange,
  errors,
}: GrantsComplianceSectionProps) {
  const addComplianceVisit = () => {
    const newVisits = [
      ...(formData.complianceVisits || []),
      {
        type: '',
        lastVisit: '',
        status: '',
      },
    ];
    onChange('complianceVisits', newVisits);
  };

  const removeComplianceVisit = (index: number) => {
    const newVisits = formData.complianceVisits.filter(
      (_: any, i: number) => i !== index
    );
    onChange('complianceVisits', newVisits);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Grant Utilization</h3>
      <p className="text-sm text-gray-500">
        Please provide the grant utilization details.
      </p>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.grant}
          onChange={(e) => onChange('grant', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span>Have you been granted money</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <input
            type="text"
            value={formData.grantUtilization?.[0]?.month || ''}
            onChange={(e) =>
              onChange('grantUtilization', [
                {
                  ...formData.grantUtilization?.[0],
                  month: e.target.value,
                },
              ])
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grants Received
          </label>
          <input
            type="number"
            value={formData.grantUtilization?.[0]?.grantsReceived || ''}
            onChange={(e) =>
              onChange('grantUtilization', [
                {
                  ...formData.grantUtilization?.[0],
                  grantsReceived: parseFloat(e.target.value),
                },
              ])
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grants Utilized
          </label>
          <input
            type="number"
            value={formData.grantUtilization?.[0]?.grantsUtilized || ''}
            onChange={(e) =>
              onChange('grantUtilization', [
                {
                  ...formData.grantUtilization?.[0],
                  grantsUtilized: parseFloat(e.target.value),
                },
              ])
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Compliance Visits</h3>
        <button
          type="button"
          onClick={addComplianceVisit}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Visit
        </button>
      </div>

      {(formData.complianceVisits || []).map((visit: any, index: number) => (
        <div key={index} className="space-y-4">
          {index > 0 && <hr className="my-6" />}
          <div className="relative">
            {formData.complianceVisits.length > 1 && (
              <button
                type="button"
                onClick={() => removeComplianceVisit(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                title="Remove visit"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={visit.type}
                  onChange={(e) => {
                    const newVisits = [...formData.complianceVisits];
                    newVisits[index] = { ...visit, type: e.target.value };
                    onChange('complianceVisits', newVisits);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Visit
                </label>
                <input
                  type="date"
                  value={visit.lastVisit}
                  onChange={(e) => {
                    const newVisits = [...formData.complianceVisits];
                    newVisits[index] = { ...visit, lastVisit: e.target.value };
                    onChange('complianceVisits', newVisits);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  value={visit.status}
                  onChange={(e) => {
                    const newVisits = [...formData.complianceVisits];
                    newVisits[index] = { ...visit, status: e.target.value };
                    onChange('complianceVisits', newVisits);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
