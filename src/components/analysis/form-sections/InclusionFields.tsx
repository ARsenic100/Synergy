import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Heart, Users, ShipWheelIcon, Baby } from 'lucide-react';
import { FormField } from '../FormField';

export function InclusionFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Special Needs Support</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasRamps')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <ShipWheelIcon className="h-4 w-4 text-gray-500" />
              <span>Ramps Available</span>
            </div>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasSpecialEducator')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Special Educator Available</span>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">
            Early Childhood Education
          </h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasAnganwadiCenter')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Baby className="h-4 w-4 text-gray-500" />
              <span>Anganwadi Center Integration</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="CWSN Students"
          icon={Heart}
          error={errors?.cwsnCount?.message as string}
        >
          <input
            type="number"
            {...register('cwsnCount', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="CWSN Support Staff"
          icon={Users}
          error={errors?.cwsnStaffCount?.message as string}
        >
          <input
            type="number"
            {...register('cwsnStaffCount', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>
    </div>
  );
}
