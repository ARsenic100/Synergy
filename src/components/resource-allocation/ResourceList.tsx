import React, { useState } from 'react';
import { ResourceItem } from '../../types/resourceAllocation';
import {
  Package,
  Users,
  Monitor,
  Building2,
  CheckCircle,
  Truck,
  Clock,
  Edit2,
  Save,
} from 'lucide-react';

interface ResourceListProps {
  resources: ResourceItem[];
  onStatusUpdate?: (resourceId: string, updates: Partial<ResourceItem>) => void;
  editable?: boolean;
}

export function ResourceList({
  resources,
  onStatusUpdate,
  editable,
}: ResourceListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ResourceItem>>({});

  const getResourceIcon = (category: ResourceItem['category']) => {
    switch (category) {
      case 'infrastructure':
        return Building2;
      case 'staff':
        return Users;
      case 'technology':
        return Monitor;
      default:
        return Package;
    }
  };

  const getDispatchStatusIcon = (status?: ResourceItem['dispatchStatus']) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'dispatched':
        return Truck;
      case 'in_progress':
        return Clock;
      default:
        return Clock;
    }
  };

  const handleEdit = (resource: ResourceItem) => {
    setEditingId(resource.id);
    setEditForm(resource);
  };

  const handleSave = (resourceId: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(resourceId, editForm);
    }
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="space-y-4">
      {resources.map((resource) => {
        const Icon = getResourceIcon(resource.category);
        const StatusIcon = getDispatchStatusIcon(resource.dispatchStatus);
        const isEditing = editingId === resource.id;

        return (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {resource.type.replace('_', ' ').charAt(0).toUpperCase() +
                      resource.type.slice(1)}
                  </h4>
                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <input
                        type="number"
                        value={editForm.quantity || resource.quantity}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        className="w-24 px-2 py-1 border rounded"
                      />
                      <input
                        type="number"
                        value={editForm.estimatedCost || resource.estimatedCost}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            estimatedCost: parseInt(e.target.value),
                          })
                        }
                        className="w-32 px-2 py-1 border rounded"
                      />
                      <select
                        value={editForm.priority || resource.priority}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            priority: e.target
                              .value as ResourceItem['priority'],
                          })
                        }
                        className="px-2 py-1 border rounded"
                      >
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {resource.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Estimated Cost: $
                        {resource.estimatedCost.toLocaleString()}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {editable && (
                  <button
                    onClick={() =>
                      isEditing ? handleSave(resource.id) : handleEdit(resource)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {isEditing ? (
                      <Save className="h-4 w-4 text-green-600" />
                    ) : (
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                )}

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    resource.priority === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : resource.priority === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : resource.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {resource.priority}
                </span>

                {resource.dispatchStatus && (
                  <div className="flex items-center gap-1 text-sm">
                    <StatusIcon
                      className={`h-4 w-4 ${
                        resource.dispatchStatus === 'delivered'
                          ? 'text-green-600'
                          : resource.dispatchStatus === 'dispatched'
                          ? 'text-blue-600'
                          : 'text-yellow-600'
                      }`}
                    />
                    <span className="capitalize">
                      {resource.dispatchStatus.replace('_', ' ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {resource.justification && !isEditing && (
              <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-3 rounded-lg">
                {resource.justification}
              </p>
            )}
            {isEditing && (
              <textarea
                value={editForm.justification || resource.justification}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    justification: e.target.value,
                  })
                }
                className="w-full mt-3 px-3 py-2 border rounded"
                rows={3}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
