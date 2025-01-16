import React from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function SchoolTimeline() {
  const events = [
    {
      date: '2024-03-15',
      title: 'Infrastructure Assessment Completed',
      type: 'milestone',
      status: 'completed',
      description: 'Comprehensive evaluation of current facilities and requirements completed.'
    },
    {
      date: '2024-03-10',
      title: 'Resource Allocation Updated',
      type: 'update',
      status: 'completed',
      description: 'Additional resources allocated for laboratory equipment.'
    },
    {
      date: '2024-03-05',
      title: 'Staff Training Phase 1',
      type: 'training',
      status: 'in-progress',
      description: 'Initial training sessions for teaching staff initiated.'
    },
    {
      date: '2024-03-01',
      title: 'Documentation Review',
      type: 'task',
      status: 'pending',
      description: 'Scheduled review of transition documentation and compliance.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">Recent Activity Timeline</h3>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${
                event.status === 'completed' ? 'bg-green-100' :
                event.status === 'in-progress' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                {event.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : event.status === 'in-progress' ? (
                  <Clock className="h-5 w-5 text-yellow-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {index < events.length - 1 && (
                <div className="w-px h-full bg-gray-200 my-2" />
              )}
            </div>

            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}