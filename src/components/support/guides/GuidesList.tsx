import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { GuideDetails } from './GuideDetails';
import { Guide } from '../../../types/support';
import { guideService } from '../../../services/guideService';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function GuidesList() {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingGuide, setIsAddingGuide] = useState(false);
  const [newGuide, setNewGuide] = useState({
    title: '',
    description: '',
    category: 'infrastructure' as Guide['category'],
    estimatedDuration: '',
    steps: [],
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const fetchedGuides = await guideService.getAllGuides();
      setGuides(fetchedGuides);
    } catch (err) {
      setError('Failed to fetch guides');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuide = async () => {
    if (newGuide.title && newGuide.description) {
      try {
        const createdGuide = await guideService.createGuide(newGuide);
        setGuides([...guides, createdGuide]);
        setNewGuide({
          title: '',
          description: '',
          category: 'infrastructure',
          estimatedDuration: '',
          steps: [],
        });
        setIsAddingGuide(false);
      } catch (err) {
        setError('Failed to create guide');
        console.error(err);
      }
    }
  };

  const handleDeleteGuide = async (guideId: string) => {
    try {
      await guideService.deleteGuide(guideId);
      setGuides(guides.filter((guide) => guide.id !== guideId));
      setSelectedGuideId(null);
    } catch (err) {
      setError('Failed to delete guide');
      console.error(err);
    }
  };

  const handleUpdateGuide = async (updatedGuide: Guide) => {
    try {
      const result = await guideService.updateGuide(updatedGuide._id, updatedGuide);
      setGuides(guides.map((g) => (g.id === result.id ? result : g)));
    } catch (err) {
      setError('Failed to update guide');
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  const selectedGuide = guides.find((g) => g.id === selectedGuideId);

  if (selectedGuide) {
    return (
      <GuideDetails
        guide={selectedGuide}
        onBack={() => setSelectedGuideId(null)}
        onUpdateGuide={handleUpdateGuide}
        onDeleteGuide={handleDeleteGuide}
      />
    );
  }

  return (
    <div className="space-y-6">
      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
        <ArrowLeft className="h-4 w-4" />
        Back to Overview
      </button>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuideId(guide.id)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{guide.title}</h3>
              <ChevronRight className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-600">{guide.estimatedDuration}</span>
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                {guide.steps.length} steps
              </span>
            </div>
          </button>
        ))}
      </div>

      {!isAddingGuide ? (
        <button
          onClick={() => setIsAddingGuide(true)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <PlusCircle className="h-5 w-5" />
          Add Guide
        </button>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Guide</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newGuide.title}
              onChange={(e) =>
                setNewGuide({ ...newGuide, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newGuide.description}
              onChange={(e) =>
                setNewGuide({ ...newGuide, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
            <select
              value={newGuide.category}
              onChange={(e) =>
                setNewGuide({
                  ...newGuide,
                  category: e.target.value as Guide['category'],
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="infrastructure">Infrastructure</option>
              <option value="academic">Academic</option>
              <option value="administrative">Administrative</option>
            </select>
            <input
              type="text"
              placeholder="Estimated Duration (e.g., 2-3 months)"
              value={newGuide.estimatedDuration}
              onChange={(e) =>
                setNewGuide({
                  ...newGuide,
                  estimatedDuration: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddGuide}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Guide
            </button>
            <button
              onClick={() => setIsAddingGuide(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}