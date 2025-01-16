// import React,{useState, useEffect} from 'react';
// import axios from 'axios';
// import {
//   User,
//   Settings,
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle,
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { ReportsView } from '../reports/ReportsView';
// // import MainView from './MainView.tsx';
// // onClick={() => setCurrentView('MAIN_VIEW')}

// export function RoleSpecificDashboard() {
//   const { user } = useAuth();
//   const [currentView, setCurrentView] = useState('DASHBOARD');

//   const renderSchoolAdminDashboard = () => {
//     const [dashboardData, setDashboardData] = useState({
//       pendingRequests: 0,
//       approvedRequests: 0,
//       completedRequests: 0,
//       rejectedRequests: 0,
//       utilization: {},
//     });
  
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//       schoolUdiseCode: "",
//       requestType: "",
//       status: "pending",
//       quantity: "",
//       priority: "",
//     });
  
//     const [loading, setLoading] = useState(false);
  
//     // Fetch Dashboard Data
//     useEffect(() => {
//       const fetchDashboardData = async () => {
//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/v1/resource/school-dashboard/",
//             { schoolUdiseCode: "32131200206" }
//           );
//           setDashboardData(response.data);
//         } catch (error) {
//           console.error("Error fetching dashboard data:", error);
//           alert("Failed to load dashboard data.");
//         }
//       };
  
//       fetchDashboardData();
//     }, []);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/v1/resource/insert-resource-request/",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//           }
//         );
  
//         if (!response.ok) {
//           throw new Error("Failed to submit the request.");
//         }
  
//         const data = await response.json();
//         console.log("Request submitted successfully:", data);
//         alert("Request submitted successfully!");
  
//         setFormData({
//           schoolUdiseCode: "",
//           requestType: "",
//           status: "pending",
//           quantity: "",
//           priority: "",
//         });
//         setShowForm(false);
//       } catch (error) {
//         console.error("Error submitting the request:", error);
//         alert("Failed to submit request.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (currentView === 'REPORTS') {
//       return <ReportsView onBack={() => setCurrentView('DASHBOARD')} />;
//     }

//     const {
//       pendingRequests,
//       approvedRequests,
//       completedRequests,
//       rejectedRequests,
//       utilization,
//     } = dashboardData;
  
//     if (showForm) {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">Submit New Request</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1">School UDISE Code</label>
//               <input
//                 type="text"
//                 name="schoolUdiseCode"
//                 value={formData.schoolUdiseCode}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Request Type</label>
//               <select
//                 name="requestType"
//                 value={formData.requestType}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               >
//                 <option value="" disabled>
//                   Select Request Type
//                 </option>
//                 <option value="Infrastructure">Infrastructure</option>
//                 <option value="Teaching Staff">Teaching Staff</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Learning Materials">Learning Materials</option>
//               </select>
//             </div>
//             <div>
//               <label className="block mb-1">Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Priority</label>
//               <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border rounded-lg"
//               >
//                 <option value="" disabled>
//                   Select Priority
//                 </option>
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//                 <option value="critical">Critical</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//           <button
//             onClick={() => setShowForm(false)}
//             className="mt-4 text-sm text-gray-500 hover:underline"
//           >
//             Cancel
//           </button>
//         </div>
//       );
//     }
  
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-4">Resource Status</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span>Pending Requests</span>
//                 <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
//                   {pendingRequests}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Approved Resources</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                   {approvedRequests}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Completed Resources</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                   {completedRequests}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Rejected Resources</span>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                   {rejectedRequests}
//                 </span>
//               </div>
              
//             </div>
//           </div>
  
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-4">Resource Utilization</h3>
//             <div className="space-y-3">
//               {Object.entries(utilization).map(([resourceType, utilizationPercentage]) => (
//                 <div key={resourceType}>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>{resourceType}</span>
//                     <span>{utilizationPercentage}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-indigo-600 h-2 rounded-full"
//                       style={{ width: `${utilizationPercentage}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
  
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2" onClick={() => setShowForm(true)}>
//                 <Settings className="h-5 w-5 text-gray-500" />
//                 Submit New Request
//               </button>
//               <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2" onClick={() => setCurrentView('REPORTS')} >
//                 <TrendingUp className="h-5 w-5 text-gray-500" />
//                 View Reports
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   // const renderSchoolAdminDashboard = () => (
//   //   <div className="space-y-6">
//   //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   //       <div className="bg-white p-6 rounded-lg shadow-md">
//   //         <h3 className="font-semibold mb-4">Resource Status</h3>
//   //         <div className="space-y-4">
//   //           <div className="flex justify-between items-center">
//   //             <span>Pending Requests</span>
//   //             <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
//   //               5
//   //             </span>
//   //           </div>
//   //           <div className="flex justify-between items-center">
//   //             <span>Approved Resources</span>
//   //             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
//   //               12
//   //             </span>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       <div className="bg-white p-6 rounded-lg shadow-md">
//   //         <h3 className="font-semibold mb-4">Resource Utilization</h3>
//   //         <div className="space-y-3">
//   //           <div>
//   //             <div className="flex justify-between text-sm mb-1">
//   //               <span>Infrastructure</span>
//   //               <span>75%</span>
//   //             </div>
//   //             <div className="w-full bg-gray-200 rounded-full h-2">
//   //               <div
//   //                 className="bg-indigo-600 h-2 rounded-full"
//   //                 style={{ width: '75%' }}
//   //               ></div>
//   //             </div>
//   //           </div>
//   //           <div>
//   //             <div className="flex justify-between text-sm mb-1">
//   //               <span>Teaching Resources</span>
//   //               <span>88%</span>
//   //             </div>
//   //             <div className="w-full bg-gray-200 rounded-full h-2">
//   //               <div
//   //                 className="bg-indigo-600 h-2 rounded-full"
//   //                 style={{ width: '88%' }}
//   //               ></div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       <div className="bg-white p-6 rounded-lg shadow-md">
//   //         <h3 className="font-semibold mb-4">Quick Actions</h3>
//   //         <div className="space-y-3">
//   //           <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2">
//   //             <Settings className="h-5 w-5 text-gray-500" />
//   //             Submit New Request
//   //           </button>
//   //           <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2">
//   //             <TrendingUp className="h-5 w-5 text-gray-500" />
//   //             View Reports
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   const renderRegionalManagerDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">Regional Overview</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span>Total Schools</span>
//               <span className="font-semibold">156</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Resource Requests</span>
//               <span className="font-semibold">23</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Critical Cases</span>
//               <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
//                 7
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">Resource Distribution</h3>
//           <div className="space-y-4">
//             {[
//               'Infrastructure',
//               'Teaching Staff',
//               'Technology',
//               'Learning Materials',
//             ].map((category) => (
//               <div key={category} className="flex items-center justify-between">
//                 <span>{category}</span>
//                 <div className="flex items-center gap-2">
//                   <div className="w-32 bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-indigo-600 h-2 rounded-full"
//                       style={{
//                         width: `${Math.floor(Math.random() * 40) + 60}%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderNationalAdminDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">National Statistics</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span>Total Regions</span>
//               <span className="font-semibold">28</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Total Schools</span>
//               <span className="font-semibold">145,012</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Resource Budget Utilized</span>
//               <span className="font-semibold">₹2.5B</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">Critical Alerts</h3>
//           <div className="space-y-4">
//             <div className="flex items-start gap-3 text-sm">
//               <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
//               <div>
//                 <p className="font-medium">Resource Shortage</p>
//                 <p className="text-gray-600">Critical shortage in 3 regions</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3 text-sm">
//               <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//               <div>
//                 <p className="font-medium">Distribution Target</p>
//                 <p className="text-gray-600">
//                   Monthly target achieved in 18 regions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="font-semibold mb-4">Policy Compliance</h3>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span>Resource Distribution</span>
//                 <span>92%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-green-600 h-2 rounded-full"
//                   style={{ width: '92%' }}
//                 ></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span>Equity Measures</span>
//                 <span>85%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-green-600 h-2 rounded-full"
//                   style={{ width: '85%' }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDashboardByRole = () => {
//     switch (user?.role) {
//       case 'SCHOOL_ADMIN':
//         return renderSchoolAdminDashboard();
//       case 'POLICY_MAKER':
//         return renderRegionalManagerDashboard();
//       case 'SUPER_ADMIN':
//         return renderNationalAdminDashboard();
//       default:
//         // return <div>Access Denied</div>;
//         return renderSchoolAdminDashboard();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-3 mb-6">
//         <User className="h-6 w-6 text-indigo-600" />
//         <h2 className="text-xl font-semibold">
//           {user?.role ? user.role.replace('_', ' ') : 'User'} Dashboard
//         </h2>
//       </div>
//       {/* {currentView === 'DASHBOARD' && renderDashboardByRole()} */}
//       {currentView === 'DASHBOARD' && renderDashboardByRole()}
//       {/* {currentView === 'MAINVIEW' && <MainView />} */}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ReportsView } from '../reports/ReportsView';

export function RoleSpecificDashboard() {
  const [currentView, setCurrentView] = useState('DASHBOARD');
  const [dashboardData, setDashboardData] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    completedRequests: 0,
    rejectedRequests: 0,
    utilization: {},
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    schoolUdiseCode: '',
    requestType: '',
    status: 'pending',
    quantity: '',
    priority: '',
    estimatedcost: '',
    extra: '',
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  console.log(user);

  // Fetch Dashboard Data


  const fetchDashboardData = async () => {
    try {
      const response = await axios.post(
        'https://synergy-backend-six.vercel.app/api/resource-plans/school-dashboard/',
        { schoolUdiseCode: user?.schoolId }
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Failed to load dashboard data.');
    }
    
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const handleSubmitNewRequest = async (newPlanData) => {
    //   try {
    //     await axios.post('http://localhost:4000/api/v1/resource/create', newPlanData);
    //     fetchPlans(); // Fetch updated plans
    //   } catch (error) {
    //     console.error("Error submitting new request:", error);
    //   }
    // };
    console.log(formData);
    try {
      const response = await fetch(
        'https://synergy-backend-six.vercel.app/api/resource-plans/insert-resource-request/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to submit the request.');
      }
  
      const data = await response.json();
      console.log('Request submitted successfully:', data);
      alert('Request submitted successfully!');
      window.location.reload();
  
      // Reset the form
      setFormData({
        schoolUdiseCode: '',
        requestType: '',
        status: 'pending',
        quantity: '',
        estimatedcost: '',
        extra: '',
        priority: '',
      });
      setShowForm(false);
  
      // Refetch the updated dashboard data to reflect changes
      fetchDashboardData();
    } catch (error) {
      console.error('Error submitting the request:', error);
      alert('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };
  

  if (currentView === 'REPORTS') {
    return <ReportsView onBack={() => setCurrentView('DASHBOARD')} />;
  }

  if (showForm) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Submit New Request</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">School UDISE Code</label>
            <input
              type="text"
              name="schoolUdiseCode"
              value={formData.schoolUdiseCode}
              placeholder={user?.schoolId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="" disabled>
                Select Request Type
              </option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Teaching Staff">Teaching Staff</option>
              <option value="Technology">Technology</option>
              <option value="Learning Materials">Learning Materials</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {formData.requestType === 'Others' && (
        <div>
          <label className="block mb-1">Enter Your Request Type</label>
          <input
            type="text"
            name="extra"
            value={formData.extra}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      )}
          <div>
            <label className="block mb-1">Enter Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Enter Estimated Cost</label>
            <input
              type="number"
              name="estimatedcost"
              value={formData.estimatedcost}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        <button
          onClick={() => setShowForm(false)}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  const {
    pendingRequests,
    approvedRequests,
    completedRequests,
    rejectedRequests,
    utilization,
  } = dashboardData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Resource Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pending Requests</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                {pendingRequests}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Approved Resources</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {approvedRequests}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Completed Resources</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {completedRequests}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Rejected Resources</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
                {rejectedRequests}
              </span>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Resource Utilization</h3>
          <div className="space-y-3">
            {Object.entries(utilization).map(
              ([resourceType, utilizationPercentage]) => (
                <div key={resourceType}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{resourceType}</span>
                    <span>{utilizationPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${utilizationPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        </div> */}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2"
              onClick={() => setShowForm(true)}
            >
              <Settings className="h-5 w-5 text-gray-500" />
              Submit New Request
            </button>
            {/* <button
              className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg flex items-center gap-2"
              onClick={() => setCurrentView('REPORTS')}
            >
              <FileText className="h-5 w-5 text-gray-500" />
              View Reports
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
