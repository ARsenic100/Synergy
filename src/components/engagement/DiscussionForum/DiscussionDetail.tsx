import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, ThumbsUp, Clock, Send } from 'lucide-react';
import { Discussion, Reply } from '../../../types/discussion';
import { discussionService } from '../../../services/discussionService';

interface DiscussionDetailProps {
  discussion: Discussion;
  onClose: () => void;
  onUpdate: (updatedDiscussion: Discussion) => void;
}

export function DiscussionDetail({ discussion, onClose, onUpdate }: DiscussionDetailProps) {
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      setIsSubmitting(true);
      const updatedDiscussion = await discussionService.addReply(discussion._id, newReply);
      onUpdate(updatedDiscussion);
      setNewReply('');
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      const updatedDiscussion = await discussionService.toggleLike(discussion._id);
      onUpdate(updatedDiscussion);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{discussion.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{discussion.author.name}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(discussion.createdAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="prose max-w-none mb-6">
            <p>{discussion.content}</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ThumbsUp className={`h-5 w-5 ${discussion.likes.length > 0 ? 'text-indigo-600' : 'text-gray-500'}`} />
              <span>{discussion.likes.length}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquare className="h-5 w-5" />
              <span>{discussion.replies.length} replies</span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold">Replies</h3>
            {discussion.replies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{reply.author.name}</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(reply.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitReply} className="space-y-4">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write your reply..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newReply.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send Reply'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}