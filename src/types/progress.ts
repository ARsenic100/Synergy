export interface StateProgress {
  name: string;
  progress: number;
  schools: number;
  status: 'completed' | 'in-progress' | 'not-started';
  coordinates: [number, number];
}

export interface KeyMetrics {
  schoolsTransitioned: {
    value: number;
    change: number;
  };
  transitionRate: {
    value: number;
    change: number;
  };
  averageTime: {
    value: number;
    change: number;
  };
  criticalCases: {
    value: number;
    change: number;
  };
}

export interface TransitionTrend {
  month: string;
  completed: number;
  inProgress: number;
}

export interface Insight {
  type: 'success' | 'warning' | 'recommendation';
  message: string;
  importance: 'high' | 'medium' | 'low';
}

// Add these interfaces to your existing progress.ts file

export interface RegionalMetrics {
  schoolsTransitioned: {
    value: number;
    change: number;
  };
  resourceUtilization: {
    value: number;
    change: number;
  };
  teacherAllocation: {
    value: number;
    change: number;
  };
  completionRate: {
    value: number;
    change: number;
  };
}

export interface StateComparison {
  name: string;
  completed: number;
  inProgress: number;
}

export interface RegionalChallenge {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  affectedSchools: number;
}

export interface RegionalGoal {
  id: string;
  title: string;
  deadline: string;
  progress: number;
  milestones: {
    title: string;
    completed: boolean;
  }[];
  state: string;
  createdAt: string;
  updatedAt: string;
}