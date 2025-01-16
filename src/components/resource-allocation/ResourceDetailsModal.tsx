import React from 'react';
import { ResourcePlan, ResourceItem } from '../../types/resourceAllocation';
import { X, Save } from 'lucide-react';
import { ResourceList } from './ResourceList';
import { FeedbackForm } from './FeedbackForm';

interface ResourceDetailsModalProps {
  plan: ResourcePlan;
  isOpen: boolean;
  onClose: () => void;
  onUpdateResource: (
    resourceId: string,
    updates: Partial<ResourceItem>
  ) => void;
  onSubmitFeedback: (feedback: any) => void;
}

export function ResourceDetailsModal({
  plan,
  isOpen,
  onClose,
  onUpdateResource,
  onSubmitFeedback,
}: ResourceDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resource Plan Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ResourceList
              resources={plan.resources}
              onStatusUpdate={onUpdateResource}
              editable={plan.status === 'pending' || plan.status === 'modified'}
            />
          </div>

          {(plan.status === 'approved' || plan.status === 'completed') && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Feedback</h3>
              {plan.feedback ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">
                    Quality Rating: {plan.feedback.quality}/5
                  </p>
                  <p className="text-gray-600 mt-2">
                    {plan.feedback.suggestions}
                  </p>
                </div>
              ) : (
                <FeedbackForm
                  resourcePlanId={plan.id}
                  onSubmit={onSubmitFeedback}
                />
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            {(plan.status === 'pending' || plan.status === 'modified') && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
