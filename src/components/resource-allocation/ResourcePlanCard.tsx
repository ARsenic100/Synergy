import React, { useEffect } from 'react';
import { ResourcePlan } from '../../types/resourceAllocation';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';
import axios from 'axios';

interface ResourcePlanCardProps {
  plan: ResourcePlan;
  onApprove: (planId: string) => void;
  onReject: (planId: string) => void;
  onModify: (planId: string) => void;
}

export function ResourcePlanCard({
  plan,
  onApprove,
  onReject,
  onModify,
}: ResourcePlanCardProps) {


  useEffect(() => {
    console.log('ResourcePlanCard rendered', plan);
  }, []);

  const getStatusColor = (status: ResourcePlan['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'modified':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getPriorityColor = (priority: ResourcePlan['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const handleApprove = async (planId: string) => {
    try {
      await axios.put(`https://synergy-backend-six.vercel.app/api/resource-plans/approve/${planId}`);
      onApprove(planId); // Trigger the fetchPlans callback
      window.location.reload();
    } catch (error) {
      console.error("Error approving resource plan:", error);
    }
  };
  
  const handleReject = async (planId: string) => {
    try {
      await axios.put(`https://synergy-backend-six.vercel.app/api/resource-plans/reject/${planId}`);
      onReject(planId); // Trigger the fetchPlans callback
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting resource plan:", error);
    }
  };
  
  const handleModify = async (planId: string) => {
    try {
      await axios.put(`https://synergy-backend-six.vercel.app/api/resource-plans/modify/${planId}`, { status: 'modified' });
      onModify(planId); // Trigger the fetchPlans callback
      window.location.reload();
    } catch (error) {
      console.error("Error modifying resource plan:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold">Resource Plan #{plan.number}</h3>
            <h3 className="text-sm font-semibold">UDISE Code: {plan.schoolId}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-2">
          </div>
            <Clock className="h-4 w-4" />
            <span>
              Created: {new Date(plan.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
              plan.status
            )}`}
          >
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
              plan.priority
            )}`}
          >
            {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
          </span>
        </div>
      </div>
            
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Total Resources</span>
          <span className="font-semibold">{plan.resources[0].quantity}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Estimated Cost</span>
          <div className="flex items-center gap-1">
            
            <span className="font-semibold">
            ₹{plan.totalEstimatedCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {plan.status === 'pending' && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleApprove(plan.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </button>
          {/* <button
            onClick={() => handleModify(plan.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            <AlertTriangle className="h-4 w-4" />
            Modify
          </button> */}
          <button
            onClick={() => handleReject(plan.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
