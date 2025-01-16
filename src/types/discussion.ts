export interface Discussion {
    _id: string;
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
    category: 'discussion' | 'question' | 'announcement';
    tags: string[];
    likes: string[];
    replies: Reply[];
    createdAt: string;
    status: 'active' | 'closed' | 'archived';
  }
  
  export interface Reply {
    id: string;
    author: {
      id: string;
      name: string;
    };
    content: string;
    createdAt: string;
  }
  
  export interface NewDiscussion {
    title: string;
    content: string;
    category: Discussion['category'];
    tags: string[];
  }