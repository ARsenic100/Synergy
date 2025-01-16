import React from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (data: {
    schoolName: string;
    type: 'improvement' | 'issue';  // Assuming two types: 'improvement' or 'issue'
    message: string;
    priority: 'low' | 'medium' | 'high';  // Assuming priority can be low, medium, or high
  }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    schoolName: string;
    type: 'improvement' | 'issue';
    message: string;
    priority: 'low' | 'medium' | 'high';
  }>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Feedback Form</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name
          </label>
          <input
            {...register('schoolName', {
              required: 'Please provide the school name',
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter school name"
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.schoolName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                {...register('type', { required: 'Please select a type' })}
                value="improvement"
                className="mr-2"
              />
              Improvement
            </label>
            <label>
              <input
                type="radio"
                {...register('type', { required: 'Please select a type' })}
                value="issue"
                className="mr-2"
              />
              Issue
            </label>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">
              {errors.type.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            {...register('message', {
              required: 'Please provide a message',
            })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your feedback message"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            {...register('priority', { required: 'Please select a priority' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
          Submit Feedback
        </button>
      </div>
    </form>
  );
}
