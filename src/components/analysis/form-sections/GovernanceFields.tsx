import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Briefcase, FileText, DollarSign, Users } from 'lucide-react';
import { FormField } from '../FormField';

export function GovernanceFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Management & Compliance</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasActiveManagement')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>Active School Management Committee</span>
            </div>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasStudentTracking')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Student Data Management System</span>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Financial Management</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasAnnualAudit')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>Annual Financial Audit</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Last Inspection Date"
          icon={Briefcase}
          error={errors?.lastInspectionDate?.message as string}
        >
          <input
            type="date"
            {...register('lastInspectionDate')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Compliance Score (%)"
          icon={FileText}
          error={errors?.complianceScore?.message as string}
        >
          <input
            type="number"
            min="0"
            max="100"
            {...register('complianceScore', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>
    </div>
  );
}
