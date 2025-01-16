import React, { useState } from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import {
  SupportTicket,
  TicketComment,
  CreateCommentData,
} from '../../../types/support';
import { supportService } from '../../../services/supportService';
import { format } from 'date-fns';

interface SupportTicketListProps {
  tickets: SupportTicket[];
  onTicketUpdate: (updatedTicket: SupportTicket) => void;
}

export function SupportTicketList({
  tickets,
  onTicketUpdate,
}: SupportTicketListProps) {
  const [commentsByTicket, setCommentsByTicket] = useState<{
    [ticketId: string]: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (ticketId: string, comment: string) => {
    setCommentsByTicket((prevState) => ({
      ...prevState,
      [ticketId]: comment,
    }));
  };

  const handleAddComment = async (ticketId: string) => {
    const newComment = commentsByTicket[ticketId]?.trim();
    if (!newComment) return;

    try {
      setIsSubmitting(true);
      const updatedTicket = await supportService.addComment(ticketId, {
        content: newComment,
      });
      onTicketUpdate(updatedTicket);
      setCommentsByTicket((prevState) => ({
        ...prevState,
        [ticketId]: '',
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {tickets.map((ticket) => (
        <div key={ticket._id} className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>#{ticket._id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      Updated{' '}
                      {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>

            <p className="mt-4 text-gray-600">{ticket.description}</p>

            {ticket.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">
                    {typeof comment.user === 'string'
                      ? 'Unknown User'
                      : comment.user?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}

            <div className="mt-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={commentsByTicket[ticket._id] || ''}
                  onChange={(e) =>
                    handleCommentChange(ticket._id, e.target.value)
                  }
                  placeholder="Add a comment..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAddComment(ticket._id)}
                  disabled={isSubmitting || !commentsByTicket[ticket._id]?.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
