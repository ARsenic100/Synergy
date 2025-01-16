// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Calendar as CalendarIcon, Plus } from 'lucide-react';
// import { EventCard } from './EventCard';
// import { NewEventForm } from './NewEventForm';
// import { CalendarView } from './CalendarView';
// import { eventService } from '../../../services/eventService';
// import { LoadingSpinner } from '../../common/LoadingSpinner';

// export function EventsCalendar() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [showNewEventForm, setShowNewEventForm] = useState(false);
//   const [showCalendarView, setShowCalendarView] = useState(false);

//   useEffect(() => {
//     fetchEvents();
//   }, [searchTerm, typeFilter, categoryFilter]);

//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params: Record<string, any> = {};
      
//       if (searchTerm) params.search = searchTerm;
//       if (typeFilter !== 'all') params.type = typeFilter;
//       if (categoryFilter !== 'all') params.category = categoryFilter;

//       const response = await eventService.getEvents(params);
//       setEvents(response.events);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Events & Webinars</h2>
//         <div className="flex gap-4">
//           <button
//             onClick={() => setShowNewEventForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             <Plus className="h-5 w-5" />
//             Create Event
//           </button>
//           <button 
//             onClick={() => setShowCalendarView(true)}
//             className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
//           >
//             <CalendarIcon className="h-5 w-5" />
//             View Calendar
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search events..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <select
//           value={typeFilter}
//           onChange={(e) => setTypeFilter(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All Types</option>
//           <option value="online">Online</option>
//           <option value="in-person">In-Person</option>
//           <option value="hybrid">Hybrid</option>
//         </select>
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All Categories</option>
//           <option value="workshop">Workshops</option>
//           <option value="conference">Conferences</option>
//           <option value="webinar">Webinars</option>
//           <option value="training">Training</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         {events.map((event) => (
//           <EventCard
//             key={event._id}
//             event={event}
//             onUpdate={fetchEvents}
//           />
//         ))}
//       </div>

//       {showNewEventForm && (
//         <NewEventForm
//           onClose={() => setShowNewEventForm(false)}
//           onEventCreated={fetchEvents}
//         />
//       )}

//       {showCalendarView && (
//         <CalendarView
//           events={events}
//           onClose={() => setShowCalendarView(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { EventCard } from './EventCard';
import { NewEventForm } from './NewEventForm';
import { CalendarView } from './CalendarView';
import { eventService } from '../../../services/eventService';
import { activityService } from '../../../services/activityService';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);

  useEffect(() => {
    fetchEvents();
    // Track page view
    activityService.trackActivity({
      type: 'events',
      action: 'view',
      title: 'Viewed Events Calendar',
      description: 'User accessed the events calendar'
    });
  }, [searchTerm, typeFilter, categoryFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {};

      if (searchTerm) params.search = searchTerm;
      if (typeFilter !== 'all') params.type = typeFilter;
      if (categoryFilter !== 'all') params.category = categoryFilter;

      const response = await eventService.getEvents(params);
      setEvents(response.events);
    } catch (error) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (data: any) => {
    try {
      await eventService.createEvent(data);
      // Track event creation
      await activityService.trackActivity({
        type: 'events',
        action: 'create',
        title: 'Created New Event',
        description: `Created event: ${data.title}`
      });
      setShowNewEventForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    try {
      await eventService.registerForEvent(eventId);
      // Track event registration
      await activityService.trackActivity({
        type: 'events',
        action: 'register',
        title: 'Registered for Event',
        description: `Registered for event: ${eventId}`
      });
      fetchEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Events & Webinars</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowNewEventForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create Event
          </button>
          <button
            onClick={() => setShowCalendarView(true)}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            <CalendarIcon className="h-5 w-5" />
            View Calendar
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="workshop">Workshops</option>
          <option value="conference">Conferences</option>
          <option value="webinar">Webinars</option>
          <option value="training">Training</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onUpdate={fetchEvents}
          />
        ))}
      </div>

      {showNewEventForm && (
        <NewEventForm
          onClose={() => setShowNewEventForm(false)}
          onEventCreated={fetchEvents}
        />
      )}

      {showCalendarView && (
        <CalendarView
          events={events}
          onClose={() => setShowCalendarView(false)}
        />
      )}
    </div>
  );
}