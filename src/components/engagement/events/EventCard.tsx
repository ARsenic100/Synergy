import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Video } from 'lucide-react';
import { format } from 'date-fns';
import { eventService } from '../../../services/eventService';
import { useAuth } from '../../../contexts/AuthContext';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'online' | 'in-person' | 'hybrid';
  category: string;
  attendees: Array<{ user: string }>;
  maxAttendees?: number;
  registrationDeadline: string;
  meetingLink?: string;
}

interface EventCardProps {
  event: Event;
  onUpdate: () => void;
}

export function EventCard({ event, onUpdate }: EventCardProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFullyBooked = event.maxAttendees && event.attendees.length >= event.maxAttendees;
  const registrationDeadlinePassed = new Date(event.registrationDeadline) < new Date();
  const isRegistered = user && event.attendees.some(a => a.user === user.id);

  const handleRegistration = async () => {
    if (!user) {
      setError('Please login to register for events');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (isRegistered) {
        await eventService.cancelRegistration(event._id);
      } else {
        await eventService.registerForEvent(event._id);
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          event.type === 'online' ? 'bg-blue-100 text-blue-800' :
          event.type === 'in-person' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {event.type}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{event.startTime} - {event.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {event.type === 'online' ? (
            <Video className="h-4 w-4" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>
            {event.attendees.length} registered
            {event.maxAttendees && ` (${event.maxAttendees - event.attendees.length} spots left)`}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Registration deadline: {format(new Date(event.registrationDeadline), 'MMM d, yyyy')}
        </p>
        <button
          onClick={handleRegistration}
          disabled={isLoading || (!isRegistered && (isFullyBooked || registrationDeadlinePassed))}
          className={`px-4 py-2 rounded-lg text-sm ${
            isRegistered
              ? 'bg-red-600 text-white hover:bg-red-700'
              : isFullyBooked || registrationDeadlinePassed
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } disabled:opacity-50`}
        >
          {isLoading ? 'Processing...' :
           isRegistered ? 'Cancel Registration' :
           isFullyBooked ? 'Fully Booked' :
           registrationDeadlinePassed ? 'Registration Closed' :
           'Register Now'}
        </button>
      </div>
    </div>
  );
}