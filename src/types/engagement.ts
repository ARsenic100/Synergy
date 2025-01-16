export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'discussion' | 'question' | 'announcement';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: number;
}



export interface PolicyUpdate {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'infrastructure' | 'academic' | 'administrative';
  publishedAt: string;
  effectiveDate: string;
  status: 'draft' | 'published' | 'archived';
  importance: 'low' | 'medium' | 'high';
}

// Update the existing file to include new types
export interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate: string;
  totalResponses: number;
  questions: SurveyQuestion[];
  creator: {
    id: string;
    name: string;
  };
  targetAudience: string;
}

export interface SurveyQuestion {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  user: {
    id: string;
    name: string;
  };
  answers: Array<{
    question: string;
    answer: any;
  }>;
  submittedAt: string;
}

export interface SurveyAnalytics {
  totalResponses: number;
  questionAnalytics: Array<{
    question: string;
    responses: number;
    optionCounts?: Record<string, number>;
  }>;
}

// Keep existing interfaces...