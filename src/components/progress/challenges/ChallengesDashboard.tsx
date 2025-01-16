import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { ChallengeForm } from './ChallengeForm';
import { MetricsCards } from './MetricsCards';
import { ChallengesList } from './ChallengesList';
import { challengesService } from '../../../services/challengesService';
import { Challenge, ChallengeMetrics } from '../../../types/challenges';

export function ChallengesDashboard() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [metrics, setMetrics] = useState<ChallengeMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const data = await challengesService.getChallenges();
      setChallenges(data.challenges);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      const data = await challengesService.analyzeSchoolData();
      setChallenges(data.challenges);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error analyzing data:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingChallenge) {
        await challengesService.updateChallenge(editingChallenge._id, data);
      } else {
        await challengesService.createChallenge(data);
      }
      fetchChallenges();
      setShowForm(false);
      setEditingChallenge(null);
    } catch (error) {
      console.error('Error saving challenge:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await challengesService.deleteChallenge(id);
        fetchChallenges();
      } catch (error) {
        console.error('Error deleting challenge:', error);
      }
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (filterStatus !== 'all' && challenge.status !== filterStatus) return false;
    if (filterSeverity !== 'all' && challenge.severity !== filterSeverity) return false;
    return true;
  });

  if (!metrics) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Challenges & Interventions</h2>
          <p className="text-gray-600">Monitor and address implementation challenges</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Add Challenge
          </button>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${analyzing ? 'animate-spin' : ''}`} />
            Analyze Again
          </button>
        </div>
      </div>

      <MetricsCards metrics={metrics} />

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Challenges</h3>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <ChallengesList
          challenges={filteredChallenges}
          loading={loading}
          onEdit={setEditingChallenge}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <ChallengeForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingChallenge(null);
          }}
          initialData={editingChallenge}
        />
      )}
    </div>
  );
}