export interface ResourceRequirement {
  id: string;
  schoolId: string;
  type: 'teacher' | 'infrastructure' | 'funds';
  currentAmount: number;
  requiredAmount: number;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'allocated';
  lastUpdated: string;
}

export interface ResourceAlert {
  id: string;
  schoolId: string;
  type: 'shortage' | 'excess';
  resourceType: 'teacher' | 'infrastructure' | 'funds';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface ResourceMetrics {
  teacherUtilization: number;
  infrastructureUtilization: number;
  fundUtilization: number;
  studentTeacherRatio: number;
  infrastructureCapacity: number;
  budgetAllocation: number;
}