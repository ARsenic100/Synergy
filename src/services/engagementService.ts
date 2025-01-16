import { ForumPost, Survey, PolicyUpdate } from '../types/engagement';

export const getForumPosts = async (): Promise<ForumPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Best practices for grade reconfiguration',
          content: 'Looking for advice on managing the transition process...',
          author: 'John Smith',
          category: 'discussion',
          tags: ['transition', 'grades', 'management'],
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:00:00Z',
          likes: 12,
          replies: 5
        },
        {
          id: '2',
          title: 'Infrastructure requirements clarification',
          content: 'Can someone explain the minimum requirements...',
          author: 'Mary Johnson',
          category: 'question',
          tags: ['infrastructure', 'requirements'],
          createdAt: '2024-03-14T15:30:00Z',
          updatedAt: '2024-03-14T16:45:00Z',
          likes: 8,
          replies: 3
        }
      ]);
    }, 1000);
  });
};

export const getActiveSurveys = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Transition Readiness Assessment',
          description: 'Help us understand your school\'s readiness for standardization',
          status: 'active',
          startDate: '2024-03-01T00:00:00Z',
          endDate: '2024-03-31T23:59:59Z',
          totalResponses: 45,
          questions: [
            {
              id: '1',
              type: 'multiple-choice',
              question: 'What is your current stage in the standardization process?',
              options: ['Planning', 'Initial Implementation', 'Advanced Implementation', 'Completed'],
              required: true
            }
          ]
        }
      ]);
    }, 1000);
  });
};

export const getPolicyUpdates = async (): Promise<PolicyUpdate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Updated Infrastructure Guidelines',
          summary: 'New requirements for classroom capacity and facilities',
          content: 'The Ministry of Education has released updated guidelines...',
          category: 'infrastructure',
          publishedAt: '2024-03-10T09:00:00Z',
          effectiveDate: '2024-04-01T00:00:00Z',
          status: 'published',
          importance: 'high'
        }
      ]);
    }, 1000);
  });
};