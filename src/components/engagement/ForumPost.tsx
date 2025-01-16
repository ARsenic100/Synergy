import React from 'react';
import { ForumPost as ForumPostType } from '../../types/engagement';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';

interface ForumPostProps {
  post: ForumPostType;
}

export function ForumPost({ post }: ForumPostProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          post.category === 'discussion' ? 'bg-blue-100 text-blue-800' :
          post.category === 'question' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {post.category}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.replies}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}