import React from 'react';
import { useForm } from 'react-hook-form';
import { ResourceRequest, ResourceType } from '../../types/resourceAllocation';
import { Send } from 'lucide-react';

interface ResourceRequestFormProps {
  schoolId: string;
  onSubmit: (
    request: Omit<ResourceRequest, 'id' | 'status' | 'submittedAt'>
  ) => void;
}

export function ResourceRequestForm({
  schoolId,
  onSubmit,
}: ResourceRequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ResourceRequest, 'id' | 'status' | 'submittedAt'>>();

  const resourceTypes: ResourceType[] = [
    'classroom',
    'laboratory',
    'playground',
    'computer',
    'teacher',
    'staff',
    'digital_device',
    'furniture',
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-lg font-semibold mb-4">
        Request Additional Resources
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource Type
          </label>
          <select
            {...register('resourceType', {
              required: 'Please select a resource type',
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Resource Type</option>
            {resourceTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.resourceType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.resourceType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Quantity
          </label>
          <input
            type="number"
            {...register('quantity', {
              required: 'Please specify the quantity',
              min: { value: 1, message: 'Quantity must be at least 1' },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Estimated Cost
          </label>
          <input
            type="number"
            {...register('estimatedcost', {
              required: 'Please specify the estimatedcost',
              min: { value: 1, message: 'estimatedcost must be at least 1' },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <select
            {...register('priority', {
              required: 'Please select a priority level',
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Justification
          </label>
          <textarea
            {...register('justification', {
              required: 'Please provide justification for the request',
            })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Explain why these resources are needed..."
          />
          {errors.justification && (
            <p className="mt-1 text-sm text-red-600">
              {errors.justification.message}
            </p>
          )}
        </div>

        <input type="hidden" {...register('schoolId')} value={schoolId} />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
          Submit Request
        </button>
      </div>
    </form>
  );
}
