import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Clock } from 'lucide-react';
import { Discussion } from '../../../types/discussion';
import { discussionService } from '../../../services/discussionService';
import { DiscussionDetail } from './DiscussionDetail';

interface DiscussionListProps {
  discussions: Discussion[];
  onDiscussionUpdate: (updatedDiscussion: Discussion) => void;
}

export function DiscussionList({ discussions, onDiscussionUpdate }: DiscussionListProps) {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const handleDiscussionClick = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleLike = async (e: React.MouseEvent, discussion: Discussion) => {
    e.stopPropagation();
    try {
      const updatedDiscussion = await discussionService.toggleLike(discussion._id);
      onDiscussionUpdate(updatedDiscussion);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="space-y-4">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleDiscussionClick(discussion)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
              <p className="text-gray-600 line-clamp-2">{discussion.content}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              discussion.category === 'question' ? 'bg-blue-100 text-blue-800' :
              discussion.category === 'discussion' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {discussion.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {discussion.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleLike(e, discussion)}
                className="flex items-center gap-1 hover:text-indigo-600"
              >
                <ThumbsUp className={`h-4 w-4 ${discussion.likes.length > 0 ? 'text-indigo-600' : ''}`} />
                <span>{discussion.likes.length}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{discussion.replies.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
              <span className="text-gray-400">by {discussion.author.name}</span>
            </div>
          </div>
        </div>
      ))}

      {selectedDiscussion && (
        <DiscussionDetail
          discussion={selectedDiscussion}
          onClose={() => setSelectedDiscussion(null)}
          onUpdate={(updatedDiscussion) => {
            onDiscussionUpdate(updatedDiscussion);
            setSelectedDiscussion(updatedDiscussion);
          }}
        />
      )}
    </div>
  );
}