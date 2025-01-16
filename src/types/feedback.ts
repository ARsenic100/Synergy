export interface CommunityFeedback {
    id: string;
    schoolName: string;
    type: 'improvement' | 'concern';
    message: string;
    date: string;
    status: 'pending' | 'addressed' | 'investigating';
    response?: string;
    priority?: 'low' | 'medium' | 'high';
  }
  
  export interface FeedbackFormData {
    schoolName: string;
    type: 'improvement' | 'concern';
    message: string;
    priority?: 'low' | 'medium' | 'high';
  }