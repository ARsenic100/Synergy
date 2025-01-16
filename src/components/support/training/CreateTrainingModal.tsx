import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Training } from '../../../types/support';

const trainingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  level: z.enum(['basic', 'intermediate', 'advanced']),
  topics: z.array(z.object({
    title: z.string().min(1, 'Topic title is required'),
    videoId: z.string().min(1, 'Video ID is required')
  })).min(1, 'At least one topic is required')
});

type FormData = z.infer<typeof trainingSchema>;

interface CreateTrainingModalProps {
  onClose: () => void;
  onCreate: (data: Partial<Training>) => Promise<void>;
}

export function CreateTrainingModal({ onClose, onCreate }: CreateTrainingModalProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      topics: [{ title: '', videoId: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics"
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Add unique IDs to topics
      const formattedData = {
        ...data,
        topics: data.topics.map((topic, index) => ({
          ...topic,
          id: `topic-${index + 1}`
        }))
      };
      await onCreate(formattedData);
      onClose();
    } catch (error) {
      console.error('Error creating training:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Training Module</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter training title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="Enter training description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                {...register('duration')}
                type="text"
                placeholder="e.g., 2 hours"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                {...register('level')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {errors.level && (
                <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Topics</label>
              <button
                type="button"
                onClick={() => append({ title: '', videoId: '' })}
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4" />
                Add Topic
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Topic {index + 1}</h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      {...register(`topics.${index}.title`)}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter topic title"
                    />
                    {errors.topics?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.topics[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Video ID</label>
                    <input
                      {...register(`topics.${index}.videoId`)}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter YouTube video ID"
                    />
                    {errors.topics?.[index]?.videoId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.topics[index]?.videoId?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
