import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BookOpen, Monitor, Users, Award } from 'lucide-react';
import { FormField } from '../FormField';

export function EducationalFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">ICT Integration</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasComputerLab')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-gray-500" />
              <span>Computer Lab Available</span>
            </div>
          </label>

          <FormField
            label="Number of Computers"
            icon={Monitor}
            error={errors?.computerCount?.message as string}
          >
            <input
              type="number"
              {...register('computerCount', { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </FormField>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Vocational Training</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasVocationalTraining')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gray-500" />
              <span>Vocational Training Programs</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="School Management Committee Members"
          icon={Users}
          error={errors?.smcMembers?.message as string}
        >
          <input
            type="number"
            {...register('smcMembers', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Annual Maintenance Grant (₹)"
          icon={Award}
          error={errors?.annualGrant?.message as string}
        >
          <input
            type="number"
            {...register('annualGrant', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>
    </div>
  );
}