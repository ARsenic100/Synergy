export interface Plan {
    _id: string;
    schoolId: string;
    name: string;
    startDate: string;
    endDate: string;
    status: 'draft' | 'in-progress' | 'completed' | 'on-hold';
    progress: number;
    createdBy: {
      _id: string;
      name: string;
      email: string;
    };
    lastUpdated: string;
  }
  
  export interface Milestone {
    _id: string;
    planId: string;
    name: string;
    description?: string;
    deadline: string;
    assignedTo: Array<{
      _id: string;
      name: string;
      email: string;
    }>;
    status: 'pending' | 'in-progress' | 'completed' | 'delayed';
    progress: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }
  
  export interface Task {
    _id: string;
    milestoneId: string;
    name: string;
    description?: string;
    assignedTo: {
      _id: string;
      name: string;
      email: string;
    };
    status: 'pending' | 'in-progress' | 'completed' | 'blocked';
    progress: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate: string;
    dependencies: string[];
    attachments: Array<{
      name: string;
      url: string;
      type: string;
    }>;
    comments: Array<{
      user: {
        _id: string;
        name: string;
      };
      content: string;
      createdAt: string;
    }>;
  }