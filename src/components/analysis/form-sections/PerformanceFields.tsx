import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TrendingUp, Users, Building2 } from 'lucide-react';
import { FormField } from '../FormField';

export function PerformanceFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Academic Performance (%)"
          icon={TrendingUp}
          error={errors?.academicPerformance?.message}
        >
          <input
            {...register('academicPerformance', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Attendance Rate (%)"
          icon={Users}
          error={errors?.attendanceRate?.message}
        >
          <input
            {...register('attendanceRate', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Teacher Retention Rate (%)"
          icon={Users}
          error={errors?.teacherRetentionRate?.message}
        >
          <input
            {...register('teacherRetentionRate', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Infrastructure Score (%)"
          icon={Building2}
          error={errors?.infrastructureScore?.message}
        >
          <input
            {...register('infrastructureScore', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>
    </div>
  );
}