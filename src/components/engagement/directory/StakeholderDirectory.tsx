// import React, { useState, useEffect } from 'react';
// import { Search, Filter, UserPlus } from 'lucide-react';
// import { StakeholderCard } from './StakeholderCard';
// import { AddContactForm } from './AddContactForm';
// import { directoryService } from '../../../services/directoryService';
// import { Stakeholder } from '../../../types/directory';
// import { LoadingSpinner } from '../../common/LoadingSpinner';
// import { useAuth } from '../../../contexts/AuthContext';

// export function StakeholderDirectory() {
//   const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState('all');
//   const [locationFilter, setLocationFilter] = useState('all');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchStakeholders();
//   }, [roleFilter, locationFilter]);

//   const fetchStakeholders = async () => {
//     try {
//       setLoading(true);
//       const params: Record<string, any> = {};
//       if (roleFilter !== 'all') params.role = roleFilter;
//       if (locationFilter !== 'all') params.location = locationFilter;

//       const response = await directoryService.getStakeholders(params);
//       setStakeholders(response.stakeholders);
//     } catch (err) {
//       setError('Failed to fetch stakeholders');
//       console.error('Error fetching stakeholders:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConnect = async (stakeholderId: string) => {
//     if (!user) {
//       setError('Please login to connect with stakeholders');
//       return;
//     }

//     try {
//       await directoryService.requestConnection(stakeholderId);
//       fetchStakeholders();
//     } catch (err) {
//       setError('Failed to send connection request');
//       console.error('Error sending connection request:', err);
//     }
//   };

//   const handleAddContact = async (data: any) => {
//     console.log(data);
//     try {
//       await directoryService.createStakeholder(data);
//       setShowAddForm(false);
//       fetchStakeholders();
//     } catch (err) {
//       setError('Failed to add contact');
//       console.error('Error adding contact:', err);
//     }
//   };

//   const filteredStakeholders = stakeholders.filter(stakeholder => {
//     const matchesSearch = 
//       stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stakeholder.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stakeholder.expertise.some(skill => 
//         skill.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     return matchesSearch;
//   });

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
//         <h2 className="text-2xl font-bold">Stakeholder Directory</h2>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           <UserPlus className="h-5 w-5" />
//           Add Contact
//         </button>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by name, organization, or expertise..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <select
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All Roles</option>
//           <option value="School Administrator">School Administrators</option>
//           <option value="Education Policy Expert">Policy Experts</option>
//           <option value="Teacher">Teachers</option>
//           <option value="Support Staff">Support Staff</option>
//         </select>
//         <select
//           value={locationFilter}
//           onChange={(e) => setLocationFilter(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="all">All Locations</option>
//           <option value="Kerala">Kerala</option>
//           <option value="West Bengal">West Bengal</option>
//           <option value="Mizoram">Mizoram</option>
//           <option value="Tamil Nadu">Tamil Nadu</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         {filteredStakeholders.map((stakeholder) => (
//           <StakeholderCard
//             key={stakeholder._id}
//             stakeholder={stakeholder}
//             onConnect={handleConnect}
//           />
//         ))}
//       </div>

//       {showAddForm && (
//         <AddContactForm
//           onSubmit={handleAddContact}
//           onClose={() => setShowAddForm(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import { StakeholderCard } from './StakeholderCard';
import { AddContactForm } from './AddContactForm';
import { directoryService } from '../../../services/directoryService';
import { activityService } from '../../../services/activityService';
import { Stakeholder } from '../../../types/directory';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { useAuth } from '../../../contexts/AuthContext';

export function StakeholderDirectory() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchStakeholders();
    // Track page view
    activityService.trackActivity({
      type: 'directory',
      action: 'view',
      title: 'Viewed Stakeholder Directory',
      description: 'User accessed the stakeholder directory'
    });
  }, [roleFilter, locationFilter]);

  const fetchStakeholders = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {};
      if (roleFilter !== 'all') params.role = roleFilter;
      if (locationFilter !== 'all') params.location = locationFilter;

      const response = await directoryService.getStakeholders(params);
      setStakeholders(response.stakeholders);
    } catch (err) {
      setError('Failed to fetch stakeholders');
      console.error('Error fetching stakeholders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (stakeholderId: string) => {
    if (!user) {
      setError('Please login to connect with stakeholders');
      return;
    }

    try {
      await directoryService.requestConnection(stakeholderId);
      // Track connection request
      await activityService.trackActivity({
        type: 'directory',
        action: 'connect',
        title: 'Sent Connection Request',
        description: `Sent connection request to stakeholder: ${stakeholderId}`
      });
      fetchStakeholders();
    } catch (err) {
      setError('Failed to send connection request');
      console.error('Error sending connection request:', err);
    }
  };

  // const handleAddContact = async (data: any) => {
  //   try {
  //     await directoryService.createStakeholder(data);
  //     // Track contact addition
  //     await activityService.trackActivity({
  //       type: 'directory',
  //       action: 'create',
  //       title: 'Added New Contact',
  //       description: `Added new contact: ${data.name}`
  //     });
  //     setShowAddForm(false);
  //     fetchStakeholders();
  //   } catch (err) {
  //     setError('Failed to add contact');
  //     console.error('Error adding contact:', err);
  //   }
  // };

  const handleAddContact = async (data: any) => {
    try {
      // Check if the contact already exists or if the activity has already been tracked
      await directoryService.createStakeholder(data);
  
      // Track contact addition only if not already done
      if (!data.activityTracked) {
        await activityService.trackActivity({
          type: 'directory',
          action: 'create',
          title: 'Added New Contact',
          description: `Added new contact: ${data.name}`
        });
        // Mark activity as tracked in data (to avoid duplicate)
        data.activityTracked = true;
      }
  
      setShowAddForm(false);
      fetchStakeholders();
    } catch (err) {
      setError('Failed to add contact');
      console.error('Error adding contact:', err);
    }
  };
  

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Stakeholder Directory</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5" />
          Add Contact
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, organization, or expertise..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Roles</option>
          <option value="School Administrator">School Administrators</option>
          <option value="Education Policy Expert">Policy Experts</option>
          <option value="Teacher">Teachers</option>
          <option value="Support Staff">Support Staff</option>
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Locations</option>
          <option value="Kerala">Kerala</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {stakeholders.map((stakeholder) => (
          <StakeholderCard
            key={stakeholder._id}
            stakeholder={stakeholder}
            onConnect={handleConnect}
          />
        ))}
      </div>

      {showAddForm && (
        <AddContactForm
          onSubmit={handleAddContact}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}