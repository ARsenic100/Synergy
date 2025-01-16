// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Filter } from 'lucide-react';
// import { DiscussionList } from './DiscussionList';
// import { NewDiscussionForm } from './NewDiscussionForm';
// import { Discussion } from '../../../types/discussion';
// import { discussionService } from '../../../services/discussionService';

// export function DiscussionForum() {
//   const [isCreating, setIsCreating] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [discussions, setDiscussions] = useState<Discussion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchDiscussions();
//   }, [searchTerm, selectedCategory, currentPage]);

//   const fetchDiscussions = async () => {
//     try {
//       setLoading(true);
//       const response = await discussionService.getDiscussions({
//         page: currentPage,
//         category: selectedCategory !== 'all' ? selectedCategory : undefined,
//         search: searchTerm || undefined,
//       });
//       setDiscussions(response.discussions);
//     } catch (error) {
//       setError('Failed to fetch discussions');
//       console.error('Error fetching discussions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDiscussionCreate = async (data: Omit<Discussion, 'id' | 'author' | 'likes' | 'replies' | 'createdAt' | 'status'>) => {
//     try {
//       await discussionService.createDiscussion(data);
//       setIsCreating(false);
//       fetchDiscussions();
//     } catch (error) {
//       console.error('Error creating discussion:', error);
//     }
//   };

//   const handleDiscussionUpdate = (updatedDiscussion: Discussion) => {
//     setDiscussions(discussions.map(d => 
//       d._id === updatedDiscussion._id ? updatedDiscussion : d
//     ));
//   };

//   if (loading) {
//     return <div className="flex justify-center py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600 py-8">{error}</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Discussion Forum</h2>
//         <button
//           onClick={() => setIsCreating(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           <Plus className="h-5 w-5" />
//           New Discussion
//         </button>
//       </div>

//       {isCreating ? (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-6">Create New Discussion</h3>
//           <NewDiscussionForm
//             onSubmit={handleDiscussionCreate}
//             onCancel={() => setIsCreating(false)}
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
//                 placeholder="Search discussions..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="all">All Categories</option>
//               <option value="question">Questions</option>
//               <option value="discussion">Discussions</option>
//               <option value="announcement">Announcements</option>
//             </select>
//           </div>

//           <DiscussionList
//             discussions={discussions}
//             onDiscussionUpdate={handleDiscussionUpdate}
//           />
//         </>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { DiscussionList } from './DiscussionList';
import { NewDiscussionForm } from './NewDiscussionForm';
import { Discussion } from '../../../types/discussion';
import { discussionService } from '../../../services/discussionService';
import { activityService } from '../../../services/activityService';

export function DiscussionForum() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDiscussions();
    // Track page view
    activityService.trackActivity({
      type: 'discussions',
      action: 'view',
      title: 'Viewed Discussion Forum',
      description: 'User accessed the discussion forum'
    });
  }, [searchTerm, selectedCategory, currentPage]);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await discussionService.getDiscussions({
        page: currentPage,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchTerm || undefined,
      });
      setDiscussions(response.discussions);
    } catch (error) {
      setError('Failed to fetch discussions');
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscussionCreate = async (
    data: Omit<Discussion, 'id' | 'author' | 'likes' | 'replies' | 'createdAt' | 'status'>
  ) => {
    try {
      await discussionService.createDiscussion(data);
      // Track discussion creation
      await activityService.trackActivity({
        type: 'discussions',
        action: 'create',
        title: 'Created New Discussion',
        description: `Created discussion: ${data.title}`
      });
      setIsCreating(false);
      fetchDiscussions();
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  const handleDiscussionUpdate = async (updatedDiscussion: Discussion) => {
    setDiscussions(
      discussions.map((d) =>
        d._id === updatedDiscussion._id ? updatedDiscussion : d
      )
    );
    // Track discussion update
    await activityService.trackActivity({
      type: 'discussions',
      action: 'update',
      title: 'Updated Discussion',
      description: `Updated discussion: ${updatedDiscussion.title}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Discussion Forum</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          New Discussion
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Create New Discussion</h3>
          <NewDiscussionForm
            onSubmit={handleDiscussionCreate}
            onCancel={() => setIsCreating(false)}
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
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="question">Questions</option>
              <option value="discussion">Discussions</option>
              <option value="announcement">Announcements</option>
            </select>
          </div>

          <DiscussionList
            discussions={discussions}
            onDiscussionUpdate={handleDiscussionUpdate}
          />
        </>
      )}
    </div>
  );
}