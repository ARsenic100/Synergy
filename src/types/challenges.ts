export interface Challenge {
    _id: string;
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    status: 'open' | 'in-progress' | 'resolved';
    affectedSchools: number;
    region: string;
    aiGenerated?: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ChallengeMetrics {
    _id: string;
    criticalIssues: number;
    openChallenges: number;
    resolvedThisMonth: number;
    lastAnalyzed: string;
  }
  
  export interface ChallengeFormData {
    title: string;
    description: string;
    severity: Challenge['severity'];
    status: Challenge['status'];
    affectedSchools: number;
    region: string;
  }