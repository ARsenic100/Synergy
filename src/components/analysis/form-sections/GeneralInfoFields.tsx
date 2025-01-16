import React from 'react';
import { useFormContext } from 'react-hook-form';
import { School, MapPin, Hash } from 'lucide-react';
import { FormField } from '../FormField';
import { states } from '../../../data/states';

export function GeneralInfoFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="School Name"
          icon={School}
          error={errors?.schoolName?.message as string}
        >
          <input
            {...register('schoolName')}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter school name"
          />
        </FormField>

        <FormField
          label="UDISE Code"
          icon={Hash}
          error={errors?.udiseCode?.message as string}
        >
          <input
            {...register('schoolId')}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter UDISE code"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="State"
          icon={MapPin}
          error={errors?.state?.message as string}
        >
          <select
            {...register('state')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="District"
          icon={MapPin}
          error={errors?.district?.message as string}
        >
          <input
            {...register('district')}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter district"
          />
        </FormField>

        <FormField
          label="PIN Code"
          icon={MapPin}
          error={errors?.pinCode?.message as string}
        >
          <input
            {...register('pinCode')}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter PIN code"
          />
        </FormField>
      </div>

      {/* <div className="grid grid-cols-1 gap-6">
        <FormField
          label="School Category"
          icon={School}
          error={errors?.category?.message as string}
        >
          <select
            {...register('category')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="odd">Odd Structure</option>
            <option value="standard">Standard Structure</option>
          </select>
        </FormField>
      </div> */}
    </div>
  );
}