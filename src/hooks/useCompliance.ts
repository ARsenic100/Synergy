// import { useState, useEffect } from 'react';
// import { ComplianceData } from '../types/compliance';
// import { Building2, Users, BookOpen, Wifi } from 'lucide-react';

// const initialCompliance: ComplianceData = {
//   infrastructure: {
//     title: 'Infrastructure Requirements',
//     icon: Building2,
//     colorClass: 'bg-blue-100 text-blue-600',
//     items: [
//       {
//         id: 'inf1',
//         title: 'Classroom Size Standards',
//         description: 'Minimum 400 sq ft per classroom with proper ventilation',
//         status: false,
//         severity: 'high',
//         recommendation: 'Plan renovation to expand classrooms',
//       },
//       {
//         id: 'inf2',
//         title: 'Laboratory Facilities',
//         description: 'Separate labs for Physics, Chemistry, and Biology',
//         status: false,
//         severity: 'medium',
//         recommendation: 'Convert unused spaces into laboratories',
//       },
//       // Add more items
//     ],
//   },
//   staffing: {
//     title: 'Staffing Requirements',
//     icon: Users,
//     colorClass: 'bg-green-100 text-green-600',
//     items: [
//       {
//         id: 'staff1',
//         title: 'Teacher Qualifications',
//         description: 'All teachers must have required certifications',
//         status: false,
//         severity: 'high',
//         recommendation: 'Organize training programs',
//       },
//       // Add more items
//     ],
//   },
//   curriculum: {
//     title: 'Curriculum Standards',
//     icon: BookOpen,
//     colorClass: 'bg-purple-100 text-purple-600',
//     items: [
//       {
//         id: 'curr1',
//         title: 'Subject Coverage',
//         description: 'Implementation of standardized curriculum',
//         status: false,
//         severity: 'high',
//         recommendation: 'Review and align current curriculum',
//       },
//       // Add more items
//     ],
//   },
//   digital: {
//     title: 'Digital Infrastructure',
//     icon: Wifi,
//     colorClass: 'bg-yellow-100 text-yellow-600',
//     items: [
//       {
//         id: 'dig1',
//         title: 'Internet Connectivity',
//         description: 'Minimum 100 Mbps broadband connection',
//         status: false,
//         severity: 'medium',
//         recommendation: 'Upgrade internet infrastructure',
//       },
//       // Add more items
//     ],
//   },
// };

// export function useCompliance() {
//   const [compliance, setCompliance] = useState<ComplianceData>(initialCompliance);

//   const updateCompliance = (categoryId: string, itemId: string, value: boolean) => {
//     setCompliance(prev => ({
//       ...prev,
//       [categoryId]: {
//         ...prev[categoryId],
//         items: prev[categoryId].items.map(item =>
//           item.id === itemId ? { ...item, status: value } : item
//         ),
//       },
//     }));
//   };

//   const generateReport = () => {
//     // Implementation for generating and downloading PDF report
//     console.log('Generating report...');
//   };

//   return {
//     compliance,
//     updateCompliance,
//     generateReport,
//   };
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ComplianceData, ComplianceStats } from '../types/compliance';
import { Building2, Users, BookOpen, Wifi } from 'lucide-react';

const defaultCompliance: ComplianceData = {
  infrastructure: {
    title: 'Infrastructure Requirements',
    icon: Building2,
    colorClass: 'bg-blue-100 text-blue-600',
    items: [],
  },
  staffing: {
    title: 'Staffing Requirements',
    icon: Users,
    colorClass: 'bg-green-100 text-green-600',
    items: [],
  },
  curriculum: {
    title: 'Curriculum Standards',
    icon: BookOpen,
    colorClass: 'bg-purple-100 text-purple-600',
    items: [],
  },
  digital: {
    title: 'Digital Infrastructure',
    icon: Wifi,
    colorClass: 'bg-yellow-100 text-yellow-600',
    items: [],
  },
};

export function useCompliance() {
  const [compliance, setCompliance] = useState<ComplianceData>(defaultCompliance);
  const [stats, setStats] = useState<ComplianceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, statsRes] = await Promise.all([
        axios.get('https://synergy-backend-six.vercel.app/api/standardization/categories'),
        axios.get('https://synergy-backend-six.vercel.app/api/standardization/stats')
      ]);
      console.log(categoriesRes);
      // Map backend data to frontend structure
      const mappedData = { ...defaultCompliance };
      categoriesRes.data.forEach((category: any) => {
        const key = mapCategoryKey(category.name);
        if (key in mappedData) {
          mappedData[key].items = category.items.map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            status: item.isCompleted,
            severity: item.isCritical ? 'high' : 'medium',
            recommendation: item.recommendation
          }));
        }
      });

      setCompliance(mappedData);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching compliance data:', err);
      setError('Failed to fetch compliance data');
    } finally {
      setLoading(false);
    }
  };

  // const updateCompliance = async (categoryId: string, itemId: string, value: boolean) => {
  //   try {
  //     await axios.patch(`http://localhost:4000/api/v1/standardization/item/status`, {
  //       categoryId,
  //       itemId,
  //       isCompleted: value
  //     });
      
  //     // Refresh data after update
  //     fetchData();
  //   } catch (err) {
  //     console.error('Error updating compliance status:', err);
  //     setError('Failed to update compliance status');
  //   }
  // };

  const updateCompliance = async (categoryId, itemId, value) => {
    try {
      // Optimistically update local state
      console.log(categoryId,itemId,value);
      setCompliance((prevCompliance) => {
        const updatedCompliance = { ...prevCompliance };
      
        // Check if category exists in compliance
        if (!updatedCompliance[categoryId]) {
          console.error(`Category with ID ${categoryId} not found in compliance state.`);
          return prevCompliance; // Exit early to avoid undefined error
        }
      
        const category = updatedCompliance[categoryId];
      
        // Ensure items array exists
        if (!category.items) {
          console.error(`Items array not found in category ${categoryId}.`);
          return prevCompliance;
        }
      
        // Find the item and update its value
        const item = category.items.find((item) => item._id === itemId);
        if (item) {
          item.isCompleted = value;
        } else {
          console.error(`Item with ID ${itemId} not found in category ${categoryId}.`);
        }
      
        return updatedCompliance;
      });
  
      // Make API call to update the database
      await axios.patch('https://synergy-backend-six.vercel.app/api/standardization/item/', {
        categoryId,
        itemId,
        isCompleted: value,
      });
    } catch (error) {
      console.error("Error updating item status", error);
      // Revert changes in case of an error
      fetchCompliance(); // Optional: Refetch from backend
    }
  };

  const addComplianceItem = async (data: any) => {
    try {
      await axios.post('https://synergy-backend-six.vercel.app/api/v1/standardization/item', data);
      fetchData();
    } catch (err) {
      console.error('Error adding compliance item:', err);
      setError('Failed to add compliance item');
    }
  };

  const mapCategoryKey = (name: string): string => {
    const map: { [key: string]: string } = {
      'Infrastructure Requirements': 'infrastructure',
      'Staffing Requirements': 'staffing',
      'Curriculum Standards': 'curriculum',
      'Digital Infrastructure': 'digital'
    };
    return map[name] || name.toLowerCase().replace(/\s+/g, '');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    compliance,
    stats,
    loading,
    error,
    updateCompliance,
    addComplianceItem
  };
}