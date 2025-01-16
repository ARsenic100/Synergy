import { ResourceRequest } from './resourceAllocation';

export interface ResourceUtilization {
  schoolUdiseCode: string;
  resourceType: string;
  utilizationPercentage: number;
  lastUpdated: string;
}

export interface CombinedResourceData {
  schoolUdiseCode: string;
  requestType: string;
  status: string;
  utilizationPercentage: number;
  priority: string;
  quantity: number;
  createdAt: string;
  lastUpdated: string;
}

export interface OverviewMetrics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  completedRequests: number;
  averageUtilization: number;
  criticalRequests: number;
}

export interface ResourceFilters {
  status: string[];
  requestType: string[];
  priority: string[];
  utilizationRange: [number, number];
}