import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { SurveyCard } from './SurveyCard';
import { CreateSurveyModal } from './CreateSurveyModal';
import { surveyService } from '../../../services/surveyService';
import { activityService } from '../../../services/activityService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useAuth } from '../../../contexts/AuthContext';

export function SurveyCenter() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchSurveys();
    // Track page view
    activityService.trackActivity({
      type: 'surveys',
      action: 'view',
      title: 'Viewed Survey Center',
      description: 'User accessed the survey center',
    });
  }, [searchTerm, statusFilter, currentPage]);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const response = await surveyService.getSurveys({
        page: currentPage,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      setSurveys(response.surveys);
    } catch (error) {
      setError('Failed to fetch surveys');
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSurvey = async (data) => {
    try {
      setLoading(true);
      await surveyService.createSurvey(data);
      await fetchSurveys();
      setShowCreateModal(false);
      // Track survey creation
      await activityService.trackActivity({
        type: 'surveys',
        action: 'create',
        title: 'Created Survey',
        description: `Created new survey: ${data.title}`,
      });
    } catch (error) {
      setError('Failed to create survey');
      console.error('Error creating survey:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSurvey = async (data) => {
    try {
      setLoading(true);
      await surveyService.updateSurvey(editingSurvey._id, data);
      await fetchSurveys();
      setEditingSurvey(null);
      // Track survey update
      await activityService.trackActivity({
        type: 'surveys',
        action: 'update',
        title: 'Updated Survey',
        description: `Updated survey: ${data.title}`,
      });
    } catch (error) {
      setError('Failed to update survey');
      console.error('Error updating survey:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeSurvey = async (id: string) => {
    // Track survey participation
    await activityService.trackActivity({
      type: 'surveys',
      action: 'participate',
      title: 'Started Survey',
      description: `Started participating in survey: ${id}`,
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Survey Center</h2>
        {/* {user?.role === 'SUPER_ADMIN' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create Survey
          </button>
        )} */}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search surveys..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map((survey) => (
          <SurveyCard
            key={survey._id}
            survey={survey}
            onTakeSurvey={handleTakeSurvey}
            onEdit={user?.role === 'SUPER_ADMIN' ? () => setEditingSurvey(survey) : undefined}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateSurveyModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateSurvey}
        />
      )}

      {editingSurvey && (
        <CreateSurveyModal
          onClose={() => setEditingSurvey(null)}
          onSubmit={handleEditSurvey}
          initialData={editingSurvey}
        />
      )}
    </div>
  );
}