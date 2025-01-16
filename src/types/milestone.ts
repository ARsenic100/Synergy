export interface Subtask {
    id: string;
    name: string;
    description?: string;
    completed: boolean;
  }
  
  export interface Milestone {
    id: string;
    name: string;
    description: string;
    startDate: string;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
    subtasks: Subtask[];
  }