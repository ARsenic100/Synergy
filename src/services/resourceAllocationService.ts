import { ResourcePlan, ResourceRequest, ResourceFeedback } from '../types/resourceAllocation';
import axios from 'axios';

export const resourceAllocationService = {
  getResourcePlans: async (schoolId: string): Promise<ResourcePlan[]> => {
    const ans = await axios.get("https://synergy-backend-six.vercel.app/api/resource-plans/getallresourcerequests/")
    return ans.data;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         id: '1',
    //         schoolId,
    //         status: 'pending',
    //         createdAt: new Date().toISOString(),
    //         updatedAt: new Date().toISOString(),
    //         resources: [
    //           {
    //             id: '1',
    //             type: 'classroom',
    //             category: 'infrastructure',
    //             quantity: 2,
    //             estimatedCost: 200000,
    //             justification: 'Additional classrooms needed for increasing enrollment',
    //             priority: 'high',
    //             status: 'pending',
    //             dispatchStatus: 'pending'
    //           }
    //         ],
    //         totalEstimatedCost: 200000,
    //         priority: 'high'
    //       }
    //     ]);
    //   }, 1000);
    // });
  },

  submitResourceRequest: async (request: Omit<ResourceRequest, 'id' | 'status' | 'submittedAt'>): Promise<ResourceRequest> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...request,
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          submittedAt: new Date().toISOString()
        });
      }, 1000);
    });
  },

  submitFeedback: async (feedback: Omit<ResourceFeedback, 'id' | 'submittedAt'>): Promise<ResourceFeedback> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...feedback,
          id: Math.random().toString(36).substr(2, 9),
          submittedAt: new Date().toISOString()
        });
      }, 1000);
    });
  }
};