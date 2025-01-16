import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Training } from '../../../types/support';
import { VideoPlayer } from './VideoPlayer';
import { TopicProgress, TopicStatus } from './TopicProgress';
import { EditTrainingModal } from './EditTrainingModal';
import { useTraining } from '../../../hooks/useTraining';
import { useNavigate } from 'react-router-dom';

interface TrainingDetailsProps {
  module: Training;
  onBack: () => void;
  onUpdateProgress: (topicId: string, status: TopicStatus) => void;
  onUpdateModule: (id: string, data: Partial<Training>) => Promise<void>;
}

export function TrainingDetails({ module, onBack, onUpdateProgress }: TrainingDetailsProps) {
  const [selectedTopic, setSelectedTopic] = useState(module.topics[0]);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTraining } = useTraining();
  const navigate = useNavigate();
  const handleTopicStatusChange = (topicId: string, status: TopicStatus) => {
    onUpdateProgress(topicId, status);
  };

  const handleForceSubmit = async (data: Partial<Training>) => {
    console.log('Submitting form without validation:', data);
    try {
      await updateTraining(module._id, data);
      navigate('/standardization');
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting form without validation:', error);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Training Modules
      </button>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              module.level === 'basic'
                ? 'bg-green-100 text-green-800'
                : module.level === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {module.level}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Module
            </button>
          </div>
        </div>

        {selectedTopic && (
          <div className="mb-8">
            <VideoPlayer 
              videoId={selectedTopic.videoId}
              onComplete={() => handleTopicStatusChange(selectedTopic.id, 'completed')}
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Course Content</h3>
            <div className="space-y-4">
              {module.topics.map((topic) => (
                <TopicProgress
                  key={topic.id}
                  title={topic.title}
                  status={topic.status || 'pending'}
                  onStatusChange={(status) => handleTopicStatusChange(topic._id, status)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditTrainingModal
          training={module}
          onClose={() => setIsEditing(false)}
          onUpdate={async (id, data) => {
            await handleForceSubmit(data);
          }}
        />
      )}
    </div>
  );
}
