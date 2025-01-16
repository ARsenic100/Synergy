export interface Policy {
    _id: string;
    title: string;
    summary: string;
    content: string;
    category: 'infrastructure' | 'academic' | 'administrative';
    effectiveDate: string;
    status: 'draft' | 'published' | 'archived';
    importance: 'low' | 'medium' | 'high';
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
    }>;
    author: {
      id: string;
      name: string;
    };
    approvedBy?: {
      id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }