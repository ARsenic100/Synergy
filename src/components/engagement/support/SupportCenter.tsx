import React, { useState, useEffect } from 'react';
import { SupportTicketForm } from './SupportTicketForm';
import { SupportTicketList } from './SupportTicketList';
import { supportService } from '../../../services/supportService';
import { SupportTicket } from '../../../types/support';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function SupportCenter() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await supportService.getTickets();
      setTickets(data);
    } catch (error) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (data: any) => {
    try {
      await supportService.createTicket(data);
      setShowNewTicketForm(false);
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleTicketUpdate = (updatedTicket: SupportTicket) => {
    setTickets(tickets.map(ticket => 
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    ));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {showNewTicketForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Create New Support Ticket</h3>
          <SupportTicketForm
            onSubmit={handleCreateTicket}
            onCancel={() => setShowNewTicketForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowNewTicketForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Ticket
        </button>
      )}

      <SupportTicketList
        tickets={tickets}
        onTicketUpdate={handleTicketUpdate}
      />
    </div>
  );
}