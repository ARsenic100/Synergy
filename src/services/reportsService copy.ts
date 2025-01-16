import axios from 'axios';
import { ResourceUtilization, CombinedResourceData, OverviewMetrics } from '../types/reports';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api/resource';

export const resourceReportsService = {
  async fetchResourceRequests() {
    const { data } = await axios.get(`${API_BASE_URL}/resource/requests`);
    return data;
  },

  async fetchResourceUtilizations() {
    const { data } = await axios.get(`${API_BASE_URL}/resource/utilizations`);
    return data;
  },

  async fetchCombinedData(): Promise<CombinedResourceData[]> {
    const [requests, utilizations] = await Promise.all([
      this.fetchResourceRequests(),
      this.fetchResourceUtilizations()
    ]);

    return requests.map((request: any) => {
      const utilization = utilizations.find(
        (u: ResourceUtilization) => 
          u.schoolUdiseCode === request.schoolUdiseCode && 
          u.resourceType === request.requestType
      );

      return {
        ...request,
        utilizationPercentage: utilization?.utilizationPercentage || 0,
        lastUpdated: utilization?.lastUpdated || request.createdAt
      };
    });
  },

  calculateOverviewMetrics(data: CombinedResourceData[]): OverviewMetrics {
    return {
      totalRequests: data.length,
      pendingRequests: data.filter(d => d.status === 'pending').length,
      approvedRequests: data.filter(d => d.status === 'approved').length,
      completedRequests: data.filter(d => d.status === 'completed').length,
      averageUtilization: data.reduce((acc, curr) => acc + curr.utilizationPercentage, 0) / data.length,
      criticalRequests: data.filter(d => d.priority === 'critical' || d.priority === 'high').length
    };
  }
};