import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { useAuth } from '../../../contexts/AuthContext';

interface Event {
  _id: string;
  title: string;
  date: string;
  attendees: Array<{ user: string }>;
}

interface CalendarViewProps {
  events: Event[];
  onClose: () => void;
}

export function CalendarView({ events, onClose }: CalendarViewProps) {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const isRegistered = (event: Event) => {
    console.log(user);
    return user && event.attendees.some(a => a.user === user.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 p-2"
            >
              {day}
            </div>
          ))}

          {daysInMonth.map(day => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] border rounded-lg p-2 ${
                  isToday(day) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="text-right text-sm text-gray-600">
                  {format(day, 'd')}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event._id}
                      className={`text-xs p-1 rounded truncate ${
                        isRegistered(event)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            Previous Month
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            Next Month
          </button>
        </div>
      </div>
    </div>
  );
}