import React, { useState, useEffect } from 'react';
import { Search, Filter, Upload } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { UploadResourceForm } from './UploadResourceForm';
import { resourceService } from '../../../services/resourceService';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function ResourceHub() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [searchTerm, categoryFilter, typeFilter]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {};
      
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (typeFilter !== 'all') params.type = typeFilter;

      const response = await resourceService.getResources(params);
      setResources(response.resources);
    } catch (error) {
      setError('Failed to fetch resources');
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resource Hub</h2>
        <button
          onClick={() => setShowUploadForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Upload className="h-5 w-5" />
          Share Resource
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="template">Templates</option>
          <option value="guide">Guides</option>
          <option value="case-study">Case Studies</option>
          <option value="report">Reports</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="word">Word</option>
          <option value="excel">Excel</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
            onUpdate={fetchResources}
          />
        ))}
      </div>

      {showUploadForm && (
        <UploadResourceForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={fetchResources}
        />
      )}
    </div>
  );
}