import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Download, Search } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  type: 'video' | 'document' | 'interactive';
  duration: string;
  category: string;
  completionStatus: 'not-started' | 'in-progress' | 'completed';
}

const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Digital Classroom Setup Guide',
    type: 'video',
    duration: '45 mins',
    category: 'Technology',
    completionStatus: 'not-started',
  },
  {
    id: '2',
    title: 'Resource Management Best Practices',
    type: 'document',
    duration: '2 hours',
    category: 'Management',
    completionStatus: 'completed',
  },
  {
    id: '3',
    title: 'Interactive Lab Equipment Tutorial',
    type: 'interactive',
    duration: '1.5 hours',
    category: 'Infrastructure',
    completionStatus: 'in-progress',
  },
];

export function ResourceTrainingCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Technology', 'Management', 'Infrastructure'];

  const filteredModules = mockTrainingModules.filter((module) => {
    const matchesSearch = module.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Resource Training Center</h2>
          <p className="text-gray-600 mt-1">
            Access training materials and guides for resource utilization
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Start New Training
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search training modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div key={module.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                {module.type === 'video' ? (
                  <Play className="h-6 w-6 text-indigo-600" />
                ) : module.type === 'document' ? (
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-indigo-600" />
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  module.completionStatus === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : module.completionStatus === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {module.completionStatus.replace('-', ' ')}
              </span>
            </div>

            <h3 className="font-medium mb-2">{module.title}</h3>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>
                {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
              </span>
              <span>{module.duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                {module.completionStatus === 'not-started'
                  ? 'Start'
                  : 'Continue'}
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
