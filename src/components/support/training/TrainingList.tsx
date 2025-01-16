import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { TrainingCard } from './TrainingCard';
import { TrainingDetails } from './TrainingDetails';
import { Training } from '../../../types/support';
import { TopicStatus } from './TopicProgress';
import { useTraining } from '../../../hooks/useTraining';
import { CreateTrainingModal } from './CreateTrainingModal';

export function TrainingList() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { trainings, loading, error, updateTrainingProgress, createTraining } = useTraining();

  const selectedModule = trainings.find((m) => m.id === selectedModuleId);

  const handleProgressUpdate = async (topicId: string, status: TopicStatus) => {
    if (selectedModule) {
      await updateTrainingProgress(selectedModule._id, topicId, status);
    }
  };

  const handleCreateTraining = async (data: Partial<Training>) => {
    await createTraining(data);
    setShowCreateModal(false);
  };

  if (selectedModule) {
    return (
      <TrainingDetails
        module={selectedModule}
        onBack={() => setSelectedModuleId(null)}
        onUpdateProgress={handleProgressUpdate}
      />
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Training Modules</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Create Training
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainings.map((module) => (
          <TrainingCard
            key={module.id}
            training={module}
            onClick={() => setSelectedModuleId(module.id)}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateTrainingModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTraining}
        />
      )}
    </div>
  );
}