import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Users } from 'lucide-react';
import { FormField } from '../FormField';

export function EnrollmentFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label=""
          icon={Users}
          error={errors?.consent?.message as string}
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('consent', { required: 'Consent is required' })}
              className="w-5 h-5 focus:ring-2 focus:ring-indigo-500"
            />
            <label className="text-sm font-medium text-gray-700">
              I hereby consent that the data filled by me is correct
            </label>
          </div>
        </FormField>
      </div>
    </div>
  );
}
