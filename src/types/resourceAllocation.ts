export interface ResourcePlan {
  id: string;
  schoolId: string;
  number: number;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  createdAt: string;
  updatedAt: string;
  resources: ResourceItem[];
  totalEstimatedCost: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  feedback?: ResourceFeedback;
  urgencyScore?: number;
  predictedNeed?: number;
  contextScore?: number;
  implementationStatus?: 'not_started' | 'in_progress' | 'completed';
  utilizationRate?: number;
  impactMetrics?: {
    academicImprovement?: number;
    infrastructureQuality?: number;
    studentSatisfaction?: number;
  };
}

export interface ResourceLocation {
  id: string;
  lat: number;
  lng: number;
  schoolName: string;
  resourceType: string;
  status: 'pending' | 'allocated' | 'in-transit' | 'delivered';
  quantity: number;
  lastUpdated?: string;
  estimatedDelivery?: string;
}

export interface SimulationParams {
  resourceAmount: number;
  timeframe: number;
  resourceType: string;
}

export interface SimulationResult {
  enrollmentImpact: number;
  academicImpact: number;
  costEfficiency: number;
  timeline: Array<{
    month: string;
    enrollment: number;
    performance: number;
    utilization: number;
  }>;
}

// ... (keep existing interfaces)