export interface Achievement {
    _id: string;
    user: string;
    title: string;
    description: string;
    category: 'infrastructure' | 'engagement' | 'academic' | 'compliance';
    points: number;
    earnedDate: string;
    icon: string;
    shared: boolean;
    criteria?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewAchievement {
    title: string;
    description: string;
    category: Achievement['category'];
    points: number;
    icon: string;
    criteria?: Record<string, any>;
  }
  
  export interface AchievementsResponse {
    achievements: Achievement[];
    totalPoints: number;
  }