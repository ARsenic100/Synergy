import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const complianceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  isCritical: z.boolean(),
  recommendation: z.string().optional(),
});

type ComplianceFormData = z.infer<typeof complianceSchema>;

interface ComplianceFormProps {
  onClose: () => void;
}

export function ComplianceForm({ onClose }: ComplianceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceSchema),
  });

  const onSubmit = async (data: ComplianceFormData) => {
    try {
    console.log(data);
      await axios.post('https://synergy-backend-six.vercel.app/api/standardization/item', data);
      onClose();
      // Optionally trigger a refresh of the compliance data
    } catch (error) {
      console.error('Error creating compliance item:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Compliance Item</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="Infrastructure Requirements">Infrastructure Requirements</option>
              <option value="Staffing Requirements">Staffing Requirements</option>
              <option value="Curriculum Standards">Curriculum Standards</option>
              <option value="Digital Infrastructure">Digital Infrastructure</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('isCritical')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Mark as Critical</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Recommendation</label>
            <textarea
              {...register('recommendation')}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}