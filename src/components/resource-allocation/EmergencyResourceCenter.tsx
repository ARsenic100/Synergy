// // import React, { useState } from 'react';
// // import { AlertTriangle, Clock, MapPin, ArrowRight } from 'lucide-react';

// // interface EmergencyRequest {
// //   id: string;
// //   schoolName: string;
// //   location: string;
// //   type: 'natural_disaster' | 'infrastructure_failure' | 'health_emergency';
// //   resourcesNeeded: string[];
// //   priority: 'critical' | 'high' | 'medium';
// //   requestedAt: string;
// //   status: 'pending' | 'approved' | 'dispatched';
// // }

// // const mockEmergencyRequests: EmergencyRequest[] = [
// //   {
// //     id: '1',
// //     schoolName: 'Government High School, Kerala',
// //     location: 'Wayanad, Kerala',
// //     type: 'natural_disaster',
// //     resourcesNeeded: ['Temporary Classrooms', 'Basic Supplies', 'First Aid'],
// //     priority: 'critical',
// //     requestedAt: '2024-03-15T10:00:00Z',
// //     status: 'pending',
// //   },
// //   {
// //     id: '2',
// //     schoolName: 'City Public School',
// //     location: 'Mumbai, Maharashtra',
// //     type: 'infrastructure_failure',
// //     resourcesNeeded: ['Structural Assessment', 'Temporary Facilities'],
// //     priority: 'high',
// //     requestedAt: '2024-03-14T15:30:00Z',
// //     status: 'approved',
// //   },
// // ];

// // export function EmergencyResourceCenter() {
// //   const [activeFilter, setActiveFilter] = useState<
// //     'all' | 'critical' | 'high' | 'medium'
// //   >('all');

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h2 className="text-xl font-semibold">Emergency Resource Center</h2>
// //           <p className="text-gray-600 mt-1">
// //             Rapid response resource allocation for emergencies
// //           </p>
// //         </div>
// //         <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
// //           <AlertTriangle className="h-5 w-5" />
// //           New Emergency Request
// //         </button>
// //       </div>

// //       <div className="flex gap-4 mb-6">
// //         {(['all', 'critical', 'high', 'medium'] as const).map((filter) => (
// //           <button
// //             key={filter}
// //             onClick={() => setActiveFilter(filter)}
// //             className={`px-4 py-2 rounded-lg ${
// //               activeFilter === filter
// //                 ? 'bg-red-50 text-red-600'
// //                 : 'text-gray-600 hover:bg-gray-50'
// //             }`}
// //           >
// //             {filter.charAt(0).toUpperCase() + filter.slice(1)}
// //           </button>
// //         ))}
// //       </div>

// //       <div className="space-y-4">
// //         {mockEmergencyRequests
// //           .filter(
// //             (request) =>
// //               activeFilter === 'all' || request.priority === activeFilter
// //           )
// //           .map((request) => (
// //             <div key={request.id} className="border rounded-lg p-4">
// //               <div className="flex items-start justify-between">
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-2">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm ${
// //                         request.priority === 'critical'
// //                           ? 'bg-red-100 text-red-800'
// //                           : request.priority === 'high'
// //                           ? 'bg-orange-100 text-orange-800'
// //                           : 'bg-yellow-100 text-yellow-800'
// //                       }`}
// //                     >
// //                       {request.priority}
// //                     </span>
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm ${
// //                         request.status === 'pending'
// //                           ? 'bg-yellow-100 text-yellow-800'
// //                           : request.status === 'approved'
// //                           ? 'bg-green-100 text-green-800'
// //                           : 'bg-blue-100 text-blue-800'
// //                       }`}
// //                     >
// //                       {request.status}
// //                     </span>
// //                   </div>

// //                   <h3 className="font-medium mb-2">{request.schoolName}</h3>

// //                   <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
// //                     <div className="flex items-center gap-1">
// //                       <MapPin className="h-4 w-4" />
// //                       <span>{request.location}</span>
// //                     </div>
// //                     <div className="flex items-center gap-1">
// //                       <Clock className="h-4 w-4" />
// //                       <span>
// //                         Requested:{' '}
// //                         {new Date(request.requestedAt).toLocaleString()}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap gap-2">
// //                     {request.resourcesNeeded.map((resource, index) => (
// //                       <span
// //                         key={index}
// //                         className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
// //                       >
// //                         {resource}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
// //                   View Details
// //                   <ArrowRight className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from 'react';
// import { AlertTriangle, Clock, MapPin, ArrowRight } from 'lucide-react';

// interface EmergencyRequest {
//   id: string;
//   schoolName: string;
//   location: string;
//   type: 'natural_disaster' | 'infrastructure_failure' | 'health_emergency';
//   resourcesNeeded: string[];
//   priority: 'critical' | 'high' | 'medium';
//   requestedAt: string;
//   status: 'pending' | 'approved' | 'dispatched';
// }

// const mockEmergencyRequests: EmergencyRequest[] = [
//   {
//     id: '1',
//     schoolName: 'Government High School, Kerala',
//     location: 'Wayanad, Kerala',
//     type: 'natural_disaster',
//     resourcesNeeded: ['Temporary Classrooms', 'Basic Supplies', 'First Aid'],
//     priority: 'critical',
//     requestedAt: '2024-03-15T10:00:00Z',
//     status: 'pending',
//   },
//   {
//     id: '2',
//     schoolName: 'City Public School',
//     location: 'Mumbai, Maharashtra',
//     type: 'infrastructure_failure',
//     resourcesNeeded: ['Structural Assessment', 'Temporary Facilities'],
//     priority: 'high',
//     requestedAt: '2024-03-14T15:30:00Z',
//     status: 'approved',
//   },
// ];

// export function EmergencyResourceCenter() {
//   const [activeFilter, setActiveFilter] = useState<
//     'all' | 'critical' | 'high' | 'medium'
//   >('all');
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     schoolName: '',
//     location: '',
//     type: 'natural_disaster',
//     resourcesNeeded: '',
//     priority: 'medium',
//   });

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newRequest: EmergencyRequest = {
//       id: String(mockEmergencyRequests.length + 1),
//       schoolName: formData.schoolName,
//       location: formData.location,
//       type: formData.type as EmergencyRequest['type'],
//       resourcesNeeded: formData.resourcesNeeded.split(',').map((r) => r.trim()),
//       priority: formData.priority as EmergencyRequest['priority'],
//       requestedAt: new Date().toISOString(),
//       status: 'pending',
//     };
//     mockEmergencyRequests.unshift(newRequest);
//     setShowForm(false);
//     setFormData({
//       schoolName: '',
//       location: '',
//       type: 'natural_disaster',
//       resourcesNeeded: '',
//       priority: 'medium',
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       {!showForm ? (
//         <>
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-xl font-semibold">Emergency Resource Center</h2>
//               <p className="text-gray-600 mt-1">
//                 Rapid response resource allocation for emergencies
//               </p>
//             </div>
//             <button
//               onClick={() => setShowForm(true)}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
//             >
//               <AlertTriangle className="h-5 w-5" />
//               New Emergency Request
//             </button>
//           </div>

//           <div className="flex gap-4 mb-6">
//             {(['all', 'critical', 'high', 'medium'] as const).map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-4 py-2 rounded-lg ${
//                   activeFilter === filter
//                     ? 'bg-red-50 text-red-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 {filter.charAt(0).toUpperCase() + filter.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="space-y-4">
//             {mockEmergencyRequests
//               .filter(
//                 (request) =>
//                   activeFilter === 'all' || request.priority === activeFilter
//               )
//               .map((request) => (
//                 <div key={request.id} className="border rounded-lg p-4">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <div className="flex items-center gap-2 mb-2">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             request.priority === 'critical'
//                               ? 'bg-red-100 text-red-800'
//                               : request.priority === 'high'
//                               ? 'bg-orange-100 text-orange-800'
//                               : 'bg-yellow-100 text-yellow-800'
//                           }`}
//                         >
//                           {request.priority}
//                         </span>
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             request.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : request.status === 'approved'
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-blue-100 text-blue-800'
//                           }`}
//                         >
//                           {request.status}
//                         </span>
//                       </div>

//                       <h3 className="font-medium mb-2">{request.schoolName}</h3>

//                       <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           <span>{request.location}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           <span>
//                             Requested:{' '}
//                             {new Date(request.requestedAt).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-2">
//                         {request.resourcesNeeded.map((resource, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
//                           >
//                             {resource}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
//                       View Details
//                       <ArrowRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </>
//       ) : (
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <h2 className="text-xl font-semibold">New Emergency Request</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               School Name
//             </label>
//             <input
//               type="text"
//               value={formData.schoolName}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Location
//             </label>
//             <input
//               type="text"
//               value={formData.location}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, location: e.target.value }))
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Type
//             </label>
//             <select
//               value={formData.type}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, type: e.target.value }))
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="natural_disaster">Natural Disaster</option>
//               <option value="infrastructure_failure">
//                 Infrastructure Failure
//               </option>
//               <option value="health_emergency">Health Emergency</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Resources Needed (comma separated)
//             </label>
//             <input
//               type="text"
//               value={formData.resourcesNeeded}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, resourcesNeeded: e.target.value }))
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Priority
//             </label>
//             <select
//               value={formData.priority}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, priority: e.target.value }))
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             >
//               <option value="critical">Critical</option>
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//             </select>
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Submit Request
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, ArrowRight } from 'lucide-react';

interface EmergencyRequest {
  id: string;
  schoolName: string;
  location: string;
  type: 'natural_disaster' | 'infrastructure_failure' | 'health_emergency';
  resourcesNeeded: string[];
  priority: 'critical' | 'high' | 'medium';
  requestedAt: string;
  status: 'pending' | 'approved' | 'dispatched';
}

const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: '1',
    schoolName: 'Government High School, Kerala',
    location: 'Wayanad, Kerala',
    type: 'natural_disaster',
    resourcesNeeded: ['Temporary Classrooms', 'Basic Supplies', 'First Aid'],
    priority: 'critical',
    requestedAt: '2024-03-15T10:00:00Z',
    status: 'pending',
  },
  {
    id: '2',
    schoolName: 'City Public School',
    location: 'Mumbai, Maharashtra',
    type: 'infrastructure_failure',
    resourcesNeeded: ['Structural Assessment', 'Temporary Facilities'],
    priority: 'high',
    requestedAt: '2024-03-14T15:30:00Z',
    status: 'approved',
  },
];

export function EmergencyResourceCenter() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'critical' | 'high' | 'medium'
  >('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);
  const [formData, setFormData] = useState({
    schoolName: '',
    location: '',
    type: 'natural_disaster',
    resourcesNeeded: '',
    priority: 'medium',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: EmergencyRequest = {
      id: String(mockEmergencyRequests.length + 1),
      schoolName: formData.schoolName,
      location: formData.location,
      type: formData.type as EmergencyRequest['type'],
      resourcesNeeded: formData.resourcesNeeded.split(',').map((r) => r.trim()),
      priority: formData.priority as EmergencyRequest['priority'],
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    mockEmergencyRequests.unshift(newRequest);
    setShowForm(false);
    setFormData({
      schoolName: '',
      location: '',
      type: 'natural_disaster',
      resourcesNeeded: '',
      priority: 'medium',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!showForm && !selectedRequest ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Emergency Resource Center</h2>
              <p className="text-gray-600 mt-1">
                Rapid response resource allocation for emergencies
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <AlertTriangle className="h-5 w-5" />
              New Emergency Request
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {(['all', 'critical', 'high', 'medium'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg ${
                  activeFilter === filter
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mockEmergencyRequests
              .filter(
                (request) =>
                  activeFilter === 'all' || request.priority === activeFilter
              )
              .map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            request.priority === 'critical'
                              ? 'bg-red-100 text-red-800'
                              : request.priority === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {request.priority}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            request.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : request.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>

                      <h3 className="font-medium mb-2">{request.schoolName}</h3>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            Requested:{' '}
                            {new Date(request.requestedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {request.resourcesNeeded.map((resource, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : showForm ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">New Emergency Request</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              School Name
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="natural_disaster">Natural Disaster</option>
              <option value="infrastructure_failure">
                Infrastructure Failure
              </option>
              <option value="health_emergency">Health Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resources Needed (comma separated)
            </label>
            <input
              type="text"
              value={formData.resourcesNeeded}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, resourcesNeeded: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, priority: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      ) : selectedRequest ? (
        <div>
          <button
            onClick={() => setSelectedRequest(null)}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to List
          </button>
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{selectedRequest.schoolName}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{selectedRequest.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  Requested: {new Date(selectedRequest.requestedAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-medium">Type: </span>
              {selectedRequest.type.replace('_', ' ')}
            </div>
            <div className="mb-4">
              <span className="font-medium">Priority: </span>
              {selectedRequest.priority}
            </div>
            <div className="mb-4">
              <span className="font-medium">Status: </span>
              {selectedRequest.status}
            </div>
            <div>
              <span className="font-medium">Resources Needed: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedRequest.resourcesNeeded.map((resource, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
