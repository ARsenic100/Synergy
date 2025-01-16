import React from 'react';
import { useForm } from 'react-hook-form';
import { Package, AlertTriangle, Send } from 'lucide-react';

interface ResourcePlanFormData {
  schoolId: string;
  resourceType: string;
  quantity: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  justification?: string;
}

interface ResourcePlanFormProps {
  onSubmit: (data: ResourcePlanFormData) => void;
  schools: Array<{ id: string; name: string }>;
  loading?: boolean;
}

export function ResourcePlanForm({ onSubmit, schools, loading }: ResourcePlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResourcePlanFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">School</label>
        <select
          {...register('schoolId', { required: 'Please select a school' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select School</option>
          {schools.map(school => (
            <option key={school.id} value={school.id}>{school.name}</option>
          ))}
        </select>
        {errors.schoolId && (
          <p className="mt-1 text-sm text-red-600">{errors.schoolId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resource Type</label>
        <select
          {...register('resourceType', { required: 'Please select a resource type' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Type</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="teaching">Teaching Staff</option>
          <option value="technology">Technology</option>
          <option value="equipment">Equipment</option>
        </select>
        {errors.resourceType && (
          <p className="mt-1 text-sm text-red-600">{errors.resourceType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          {...register('quantity', { 
            required: 'Please specify the quantity',
            min: { value: 1, message: 'Quantity must be at least 1' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          {...register('priority', { required: 'Please select a priority level' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Priority</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Justification</label>
        <textarea
          {...register('justification')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Explain why these resources are needed..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Package className="animate-spin h-5 w-5" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Submit Request
          </>
        )}
      </button>
    </form>
  );
}