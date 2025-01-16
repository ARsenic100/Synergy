// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Bell, Plus } from 'lucide-react';
// import { PolicyCard } from './PolicyCard';
// import { CreatePolicyForm } from './CreatePolicyForm';
// import { PolicyDetails } from './PolicyDetails';
// import { policyService } from '../../../services/policyService';
// import { Policy } from '../../../types/policy';
// import { LoadingSpinner } from '../../common/LoadingSpinner';

// export function PolicyCenter() {
//   const [policies, setPolicies] = useState<Policy[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState<string>('all');
//   const [importanceFilter, setImportanceFilter] = useState<string>('all');
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

//   useEffect(() => {
//     fetchPolicies();
//   }, [searchTerm, categoryFilter, importanceFilter]);

//   const fetchPolicies = async () => {
//     try {
//       setLoading(true);
//       const filters: Record<string, string> = {};
//       if (categoryFilter !== 'all') filters.category = categoryFilter;
//       if (importanceFilter !== 'all') filters.importance = importanceFilter;
//       if (searchTerm) filters.search = searchTerm;

//       const data = await policyService.getPolicies(filters);
//       setPolicies(data);
//     } catch (error) {
//       setError('Failed to fetch policies');
//       console.error('Error fetching policies:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreatePolicy = async (data: any) => {
//     try {
//       await policyService.createPolicy(data);
//       setShowCreateForm(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error('Error creating policy:', error);
//     }
//   };

//   const handleViewDetails = async (id: string) => {
//     try {
//       const policy = await policyService.getPolicy(id);
//       setSelectedPolicy(policy);
//     } catch (error) {
//       console.error('Error fetching policy details:', error);
//     }
//   };

//   const handleArchivePolicy = async (id: string) => {
//     try {
//       await policyService.archivePolicy(id);
//       fetchPolicies();
//     } catch (error) {
//       console.error('Error archiving policy:', error);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className="text-red-600 p-4">{error}</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Policy Updates</h2>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             <Plus className="h-5 w-5" />
//             Create Policy
//           </button>
//           <button className="relative p-2 text-gray-600 hover:text-gray-800">
//             <Bell className="h-6 w-6" />
//             <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
//           </button>
//         </div>
//       </div>

//       {showCreateForm ? (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-6">Create New Policy</h3>
//           <CreatePolicyForm
//             onSubmit={handleCreatePolicy}
//             onCancel={() => setShowCreateForm(false)}
//           />
//         </div>
//       ) : (
//         <>
//           <div className="flex gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search policies..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Categories</option>
//               <option value="infrastructure">Infrastructure</option>
//               <option value="academic">Academic</option>
//               <option value="administrative">Administrative</option>
//             </select>
//             <select
//               value={importanceFilter}
//               onChange={(e) => setImportanceFilter(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Importance</option>
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </select>
//           </div>

//           <div className="space-y-6">
//             {policies.map((policy) => (
//               <PolicyCard
//                 key={policy._id}
//                 policy={policy}
//                 onViewDetails={handleViewDetails}
//                 onArchive={handleArchivePolicy}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {selectedPolicy && (
//         <PolicyDetails
//           policy={selectedPolicy}
//           onClose={() => setSelectedPolicy(null)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, Plus } from 'lucide-react';
import { PolicyCard } from './PolicyCard';
import { CreatePolicyForm } from './CreatePolicyForm';
import { PolicyDetails } from './PolicyDetails';
import { policyService } from '../../../services/policyService';
import { activityService } from '../../../services/activityService';
import { Policy } from '../../../types/policy';
import { LoadingSpinner } from '../../common/LoadingSpinner';

export function PolicyCenter() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [importanceFilter, setImportanceFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    fetchPolicies();
    // Track page view
    activityService.trackActivity({
      type: 'policies',
      action: 'view',
      title: 'Viewed Policy Center',
      description: 'User accessed the policy center'
    });
  }, [searchTerm, categoryFilter, importanceFilter]);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const filters: Record<string, string> = {};
      if (categoryFilter !== 'all') filters.category = categoryFilter;
      if (importanceFilter !== 'all') filters.importance = importanceFilter;
      if (searchTerm) filters.search = searchTerm;

      const data = await policyService.getPolicies(filters);
      setPolicies(data);
    } catch (error) {
      setError('Failed to fetch policies');
      console.error('Error fetching policies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePolicy = async (data: any) => {
    try {
      await policyService.createPolicy(data);
      // Track policy creation
      await activityService.trackActivity({
        type: 'policies',
        action: 'create',
        title: 'Created New Policy',
        description: `Created policy: ${data.title}`
      });
      setShowCreateForm(false);
      fetchPolicies();
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const policy = await policyService.getPolicy(id);
      // Track policy view
      await activityService.trackActivity({
        type: 'policies',
        action: 'view',
        title: 'Viewed Policy Details',
        description: `Viewed policy: ${policy.title}`
      });
      setSelectedPolicy(policy);
    } catch (error) {
      console.error('Error fetching policy details:', error);
    }
  };

  const handleArchivePolicy = async (id: string) => {
    try {
      await policyService.archivePolicy(id);
      // Track policy archive
      await activityService.trackActivity({
        type: 'policies',
        action: 'archive',
        title: 'Archived Policy',
        description: `Archived policy ID: ${id}`
      });
      fetchPolicies();
    } catch (error) {
      console.error('Error archiving policy:', error);
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
        <h2 className="text-2xl font-bold">Policy Updates</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create Policy
          </button>
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Create New Policy</h3>
          <CreatePolicyForm
            onSubmit={handleCreatePolicy}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="academic">Academic</option>
              <option value="administrative">Administrative</option>
            </select>
            <select
              value={importanceFilter}
              onChange={(e) => setImportanceFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Importance</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {policies.map((policy) => (
              <PolicyCard
                key={policy._id}
                policy={policy}
                onViewDetails={handleViewDetails}
                onArchive={handleArchivePolicy}
              />
            ))}
          </div>
        </>
      )}

      {selectedPolicy && (
        <PolicyDetails
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
}