

// //  import React, { useEffect, useState } from 'react';
// //  import {
// //    BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// // } from 'recharts';
// // import { DollarSign, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
// // import { financialService, BudgetOverview, AllocationData, FundingSource } from '../../services/financialService';
// // import { LoadingSpinner } from '../common/LoadingSpinner';
// // import jsPDF from 'jspdf';



// // const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

// // export function FinancialTransparency() {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [budgetData, setBudgetData] = useState<BudgetOverview | null>(null);
// //   const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
// //   const [fundingData, setFundingData] = useState<FundingSource[]>([]);

// //   useEffect(() => {
// //     const fetchFinancialData = async () => {
// //       try {
// //         setLoading(true);
// //         const [budget, allocation, funding] = await Promise.all([
// //           financialService.getBudgetOverview(),
// //           financialService.getAllocationUtilization(),
// //           financialService.getFundingSources()
// //         ]);
// //         console.log(budget);
// //         console.log(allocation);
// //         console.log(funding);
// //         setBudgetData(budget);
// //         setAllocationData(allocation);
// //         setFundingData(funding);
// //       } catch (err) {
// //         setError('Failed to fetch financial data');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFinancialData();
// //   }, []);

// //   if (loading) return <LoadingSpinner />;
// //   if (error) return <div className="text-red-600 p-4">{error}</div>;
// //   if (!budgetData) return null;

// //   const formatCurrency = (amount: number) => {
// //     if (amount >= 10000000) {
// //       return `₹${(amount / 10000000).toFixed(1)}M`;
// //     }
// //     if (amount >= 100000) {
// //       return `₹${(amount / 100000).toFixed(1)}L`;
// //     }
// //     return `₹${amount.toLocaleString()}`;
// //   };
// //   const formatCurrency2 = (amount: number): string => {
// //     return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// //   };
  
// //   const handleDownloadReport = () => {
// //     const doc = new jsPDF();
  
// //     // Title
// //     doc.setFontSize(18);
// //     doc.text('Financial Transparency Report', 14, 20);
  
// //     // Add Total Budget
// //     doc.setFontSize(14);
// //     doc.text('Total Budget:', 14, 40);
// //     doc.setFontSize(12);
// //     doc.text(formatCurrency2(budgetData.total_budget), 60, 40);
  
// //     // Add Utilization Rate
// //     doc.setFontSize(14);
// //     doc.text('Utilization Rate:', 14, 50);
// //     doc.setFontSize(12);
// //     doc.text(`${budgetData.utilization_rate}%`, 60, 50);
  
// //     // Add Cost Savings
// //     doc.setFontSize(14);
// //     doc.text('Cost Savings:', 14, 60);
// //     doc.setFontSize(12);
// //     doc.text(formatCurrency2(budgetData.savings), 60, 60);
  
// //     // Section for Allocation Utilization
// //     doc.setFontSize(14);
// //     doc.text('Budget Allocation vs Utilization:', 14, 80);
// //     let yPosition = 90;
  
// //     allocationData.forEach((item) => {
// //       doc.setFontSize(12);
// //       doc.text(
// //         `${item.category}: Allocated - ${formatCurrency2(item.allocated)}, Utilized - ${formatCurrency2(item.utilized)}`,
// //         14,
// //         yPosition
// //       );
// //       yPosition += 10;
// //     });
  
// //     // Section for Funding Sources
// //     doc.setFontSize(14);
// //     doc.text('Funding Sources:', 14, yPosition + 10);
// //     yPosition += 20;
  
// //     fundingData.forEach((item) => {
// //       doc.setFontSize(12);
// //       doc.text(`${item.name}: ${item.value}%`, 14, yPosition);
// //       yPosition += 10;
// //     });
  
// //     // Save the PDF
// //     doc.save('financial_report.pdf');
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h2 className="text-xl font-semibold">Financial Transparency</h2>
// //           <p className="text-gray-600 mt-1">
// //             Track resource allocation and utilization
// //           </p>
// //         </div>
// //         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2" onClick={handleDownloadReport}>
// //           <FileText className="h-5 w-5" />
// //           Download Report
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //         <div className="bg-green-50 p-4 rounded-lg">
// //           <div className="flex items-center gap-3 mb-2">
// //             <div className="p-2 bg-green-100 rounded-lg">
// //               <DollarSign className="h-6 w-6 text-green-600" />
// //             </div>
// //             <h3 className="font-medium">Total Budget</h3>
// //           </div>
// //           <p className="text-2xl font-bold text-green-600">
// //             {formatCurrency(budgetData.total_budget)}
// //           </p>
// //           <p className="text-sm text-gray-600 mt-1">FY 2024-25</p>
// //         </div>

// //         <div className="bg-blue-50 p-4 rounded-lg">
// //           <div className="flex items-center gap-3 mb-2">
// //             <div className="p-2 bg-blue-100 rounded-lg">
// //               <TrendingUp className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <h3 className="font-medium">Utilization Rate</h3>
// //           </div>
// //           <p className="text-2xl font-bold text-blue-600">
// //             {budgetData.utilization_rate}%
// //           </p>
// //           <p className="text-sm text-gray-600 mt-1">Current fiscal year</p>
// //         </div>

// //         <div className="bg-yellow-50 p-4 rounded-lg">
// //           <div className="flex items-center gap-3 mb-2">
// //             <div className="p-2 bg-yellow-100 rounded-lg">
// //               <AlertTriangle className="h-6 w-6 text-yellow-600" />
// //             </div>
// //             <h3 className="font-medium">Cost Savings</h3>
// //           </div>
// //           <p className="text-2xl font-bold text-yellow-600">
// //             {formatCurrency(budgetData.savings)}
// //           </p>
// //           <p className="text-sm text-gray-600 mt-1">Through optimizations</p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div>
// //           <h3 className="text-lg font-medium mb-4">
// //             Budget Allocation vs Utilization
// //           </h3>
// //           <div className="h-[300px]">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={allocationData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="category" />
// //                 <YAxis />
// //                 <Tooltip formatter={(value) => formatCurrency(Number(value))} />
// //                 <Legend />
// //                 <Bar
// //                   dataKey="allocated"
// //                   name="Allocated Budget"
// //                   fill="#4f46e5"
// //                 />
// //                 <Bar dataKey="utilized" name="Utilized Amount" fill="#10b981" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         <div>
// //           <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
// //           <div className="h-[300px]">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <PieChart>
// //                 <Pie
// //                   data={fundingData}
// //                   cx="50%"
// //                   cy="50%"
// //                   labelLine={false}
// //                   label={({ name, percent }) =>
// //                     `${name} (${(percent * 100).toFixed(0)}%)`
// //                   }
// //                   outerRadius={80}
// //                   fill="#8884d8"
// //                   dataKey="value"
// //                 >
// //                   {fundingData.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={COLORS[index % COLORS.length]}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts';
// import { DollarSign, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
// import { financialService, BudgetOverview, AllocationData, FundingSource } from '../../services/financialService';
// import { LoadingSpinner } from '../common/LoadingSpinner';
// import jsPDF from 'jspdf';

// const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

// export function FinancialTransparency() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [budgetData, setBudgetData] = useState<BudgetOverview | null>(null);
//   const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
//   const [fundingData, setFundingData] = useState<FundingSource[]>([]);
//   const [newFunding, setNewFunding] = useState({ name: '', value: 0 });

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       try {
//         setLoading(true);
//         const [budget, allocation, funding] = await Promise.all([
//           financialService.getBudgetOverview(),
//           financialService.getAllocationUtilization(),
//           financialService.getFundingSources(),
//         ]);
//         console.log(budget);
//         console.log(allocation);
//         console.log(funding);
//         setBudgetData(budget);
//         setAllocationData(allocation);
//         setFundingData(funding);
//       } catch (err) {
//         setError('Failed to fetch financial data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, []);

//   const handleAddSponsor = async () => {
//     if (!newFunding.name || newFunding.value <= 0) {
//       alert('Please provide valid sponsor details.');
//       return;
//     }
//     console.log(newFunding);
//     try {
//       const response = await fetch('https://synergy-backend-six.vercel.app/api/resource-plans/addFundingSource', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newFunding),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add new funding source');
//       }

//       const updatedFunding = await response.json();
//       setFundingData((prev) => {
//         const totalFunding = prev.reduce((sum, source) => sum + source.value, 0) + newFunding.value;
//         return prev.map((source) => ({
//           ...source,
//           value: (source.value / totalFunding) * 100,
//         })).concat({
//           name: newFunding.name,
//           value: (newFunding.value / totalFunding) * 100,
//         });
//       });
//       setNewFunding({ name: '', value: 0 });
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add sponsor');
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-600 p-4">{error}</div>;
//   if (!budgetData) return null;

//   const formatCurrency = (amount: number) => {
//     if (amount >= 10000000) {
//       return `₹${(amount / 10000000).toFixed(1)}M`;
//     }
//     if (amount >= 100000) {
//       return `₹${(amount / 100000).toFixed(1)}L`;
//     }
//     return `₹${amount.toLocaleString()}`;
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-semibold">Financial Transparency</h2>
//           <p className="text-gray-600 mt-1">Track resource allocation and utilization</p>
//         </div>
//       </div>

//              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//          <div className="bg-green-50 p-4 rounded-lg">
//            <div className="flex items-center gap-3 mb-2">
//              <div className="p-2 bg-green-100 rounded-lg">
//                <DollarSign className="h-6 w-6 text-green-600" />
//              </div>
//              <h3 className="font-medium">Total Budget</h3>
//            </div>
//            <p className="text-2xl font-bold text-green-600">
//              {formatCurrency(budgetData.total_budget)}
//            </p>
//            <p className="text-sm text-gray-600 mt-1">FY 2024-25</p>
//          </div>

//          <div className="bg-blue-50 p-4 rounded-lg">
//            <div className="flex items-center gap-3 mb-2">
//              <div className="p-2 bg-blue-100 rounded-lg">
//                <TrendingUp className="h-6 w-6 text-blue-600" />
//              </div>
//              <h3 className="font-medium">Utilization Rate</h3>
//            </div>
//            <p className="text-2xl font-bold text-blue-600">
//              {budgetData.utilization_rate}%
//            </p>
//            <p className="text-sm text-gray-600 mt-1">Current fiscal year</p>
//          </div>

//          <div className="bg-yellow-50 p-4 rounded-lg">
//            <div className="flex items-center gap-3 mb-2">
//              <div className="p-2 bg-yellow-100 rounded-lg">
//                <AlertTriangle className="h-6 w-6 text-yellow-600" />
//              </div>
//              <h3 className="font-medium">Cost Savings</h3>
//            </div>
//            <p className="text-2xl font-bold text-yellow-600">
//              {formatCurrency(budgetData.savings)}
//            </p>
//            <p className="text-sm text-gray-600 mt-1">Through optimizations</p>
//          </div>
//        </div>

//        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//          <div>
//            <h3 className="text-lg font-medium mb-4">
//              Budget Allocation vs Utilization
//            </h3>
//            <div className="h-[300px]">
//              <ResponsiveContainer width="100%" height="100%">
//                <BarChart data={allocationData}>
//                  <CartesianGrid strokeDasharray="3 3" />
//                  <XAxis dataKey="category" />
//                  <YAxis />
//                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
//                  <Legend />
//                  <Bar
//                    dataKey="allocated"
//                    name="Allocated Budget"
//                    fill="#4f46e5"
//                  />
//                  <Bar dataKey="utilized" name="Utilized Amount" fill="#10b981" />
//                </BarChart>
//              </ResponsiveContainer>
//            </div>
//          </div>

      // <div className="mb-6">
      //   <h3 className="text-lg font-medium mb-4">Add New Sponsor</h3>
      //   <div className="flex gap-4">
      //     <input
      //       type="text"
      //       placeholder="Sponsor Name"
      //       value={newFunding.name}
      //       onChange={(e) => setNewFunding({ ...newFunding, name: e.target.value })}
      //       className="border p-2 rounded w-full"
      //     />
      //     <input
      //       type="number"
      //       placeholder="Funding Amount"
      //       value={newFunding.value}
      //       onChange={(e) => setNewFunding({ ...newFunding, value: parseFloat(e.target.value) })}
      //       className="border p-2 rounded w-full"
      //     />
      //     <button
      //       className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      //       onClick={handleAddSponsor}
      //     >
      //       Add Sponsor
      //     </button>
      //   </div>
      // </div>

      // <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      //   <div>
      //     <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
      //     <div className="h-[300px]">
      //       <ResponsiveContainer width="100%" height="100%">
      //         <PieChart>
      //           <Pie
      //             data={fundingData}
      //             cx="50%"
      //             cy="50%"
      //             labelLine={false}
      //             label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
      //             outerRadius={80}
      //             fill="#8884d8"
      //             dataKey="value"
      //           >
      //             {fundingData.map((entry, index) => (
      //               <Cell
      //                 key={`cell-${index}`}
      //                 fill={COLORS[index % COLORS.length]}
      //               />
      //             ))}
      //           </Pie>
      //           <Tooltip />
      //           <Legend />
      //         </PieChart>
      //       </ResponsiveContainer>
      //     </div>
      //   </div>
      // </div>
//     </div>
//   );


// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts';
// import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
// import { financialService, BudgetOverview, AllocationData, FundingSource } from '../../services/financialService';
// import { LoadingSpinner } from '../common/LoadingSpinner';

// const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

// export function FinancialTransparency() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [budgetData, setBudgetData] = useState<BudgetOverview | null>(null);
//   const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
//   const [fundingData, setFundingData] = useState<FundingSource[]>([]);
//   const [newFunding, setNewFunding] = useState<{ name: string; value: number }>({ name: '', value: 0 });

//   useEffect(() => {
//     const fetchFinancialData = async () => {
//       try {
//         setLoading(true);
//         const [budget, allocation, funding] = await Promise.all([
//           financialService.getBudgetOverview(),
//           financialService.getAllocationUtilization(),
//           financialService.getFundingSources(),
//         ]);
//         console.log(budget);
//         console.log(allocation);
//         console.log(funding);
//         setBudgetData(budget);
//         setAllocationData(allocation);
//         setFundingData(funding);
//       } catch (err) {
//         setError('Failed to fetch financial data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFinancialData();
//   }, []);
//   let totalFunding;
//   const handleAddSponsor = async () => {
//     if (!newFunding.name || newFunding.value <= 0) {
//       alert('Please provide valid sponsor details.');
//       return;
//     }
//     try {
//       const response = await fetch('https://synergy-backend-six.vercel.app/api/resource-plans/addFundingSource', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newFunding),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add new funding source');
//       }

//       const updatedFunding = await response.json();
//       console.log(updatedFunding);
//       const totalFunding = updatedFunding[0].totalAmount;
//       console.log('totalFunding',totalFunding);
//       setFundingData(updatedFunding.map((source: FundingSource) => ({
//         ...source,
//         value: (source.value / totalFunding) * 100,
//       })));
//       setNewFunding({ name: '', value: 0 });
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add sponsor');
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     if (amount >= 10000000) {
//       return `₹${(amount / 10000000).toFixed(1)}M`;
//     }
//     if (amount >= 100000) {
//       return `₹${(amount / 100000).toFixed(1)}L`;
//     }
//     return `₹${amount.toLocaleString()}`;
//   };
//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-600 p-4">{error}</div>;
//   if (!budgetData) return null;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-semibold">Financial Transparency</h2>
//           <p className="text-gray-600 mt-1">Track resource allocation and utilization</p>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-medium mb-4">Add New Sponsor</h3>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Sponsor Name"
//             value={newFunding.name}
//             onChange={(e) => setNewFunding({ ...newFunding, name: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="number"
//             placeholder="Funding Amount"
//             value={newFunding.value}
//             onChange={(e) => setNewFunding({ ...newFunding, value: parseFloat(e.target.value) })}
//             className="border p-2 rounded w-full"
//           />
//           <button
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             onClick={handleAddSponsor}
//           >
//             Add Sponsor
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={fundingData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {fundingData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-green-50 p-4 rounded-lg">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <DollarSign className="h-6 w-6 text-green-600" />
//             </div>
//             <h3 className="font-medium">Total Funding</h3>
//           </div>
//           <p className="text-2xl font-bold text-green-600">

//   {formatCurrency(totalFunding)}
//           </p>
//           <p className="text-sm text-gray-600 mt-1">FY 2024-25</p>
//         </div>

//         <div className="bg-blue-50 p-4 rounded-lg">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <TrendingUp className="h-6 w-6 text-blue-600" />
//             </div>
//             <h3 className="font-medium">Utilization Rate</h3>
//           </div>
//           <p className="text-2xl font-bold text-blue-600">
//             {budgetData.utilization_rate}%
//           </p>
//           <p className="text-sm text-gray-600 mt-1">Current fiscal year</p>
//         </div>

//         <div className="bg-yellow-50 p-4 rounded-lg">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <AlertTriangle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <h3 className="font-medium">Cost Savings</h3>
//           </div>
//           <p className="text-2xl font-bold text-yellow-600">
//             {formatCurrency(budgetData.savings)}
//           </p>
//           <p className="text-sm text-gray-600 mt-1">Through optimizations</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-medium mb-4">Budget Allocation vs Utilization</h3>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={allocationData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => formatCurrency(Number(value))} />
//                 <Legend />
//                 <Bar dataKey="allocated" name="Allocated Budget" fill="#4f46e5" />
//                 <Bar dataKey="utilized" name="Utilized Amount" fill="#10b981" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={fundingData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {fundingData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { financialService, BudgetOverview, AllocationData, FundingSource } from '../../services/financialService';
import { LoadingSpinner } from '../common/LoadingSpinner';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export function FinancialTransparency() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetOverview | null>(null);
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);
  const [fundingData, setFundingData] = useState<FundingSource[]>([]);
  const [newFunding, setNewFunding] = useState<{ name: string; value: number }>({ name: '', value: 0 });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true);
        const [budget, allocation, funding] = await Promise.all([
          financialService.getBudgetOverview(),
          financialService.getAllocationUtilization(),
          financialService.getFundingSources(),
        ]);
        console.log(budget);
        console.log(allocation);
        console.log(funding);
        setBudgetData(budget);
        setAllocationData(allocation);
        setFundingData(funding);
      } catch (err) {
        setError('Failed to fetch financial data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  const handleAddSponsor = async () => {
    if (!newFunding.name || newFunding.value <= 0) {
      alert('Please provide valid sponsor details.');
      return;
    }

    try {
      const response = await fetch('https://synergy-backend-six.vercel.app/api/resource-plans/addFundingSource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFunding),
      });

      if (!response.ok) {
        throw new Error('Failed to add new funding source');
      }

      const updatedFunding = await response.json();
      console.log(updatedFunding);

      // Calculate total funding after the update
      const totalFunding = updatedFunding.reduce((total, source) => total + source.value, 0);

      setFundingData(updatedFunding.map((source: FundingSource) => ({
        ...source,
        value: (source.value / totalFunding) * 100,
      })));
      setNewFunding({ name: '', value: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}M`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  // Calculate total funding dynamically from fundingData
  const totalFunding = fundingData.reduce((total, source) => total + source.value, 0);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!budgetData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Financial Transparency</h2>
          <p className="text-gray-600 mt-1">Track resource allocation and utilization</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Add New Sponsor</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Sponsor Name"
            value={newFunding.name}
            onChange={(e) => setNewFunding({ ...newFunding, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Funding Amount"
            value={newFunding.value}
            onChange={(e) => setNewFunding({ ...newFunding, value: parseFloat(e.target.value) })}
            className="border p-2 rounded w-full"
          />
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={handleAddSponsor}
          >
            Add Sponsor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium">Total Funding</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalFunding)}
          </p>
          <p className="text-sm text-gray-600 mt-1">FY 2024-25</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Utilization Rate</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {budgetData.utilization_rate}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Current fiscal year</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-medium">Cost Savings</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(budgetData.savings)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Through optimizations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Budget Allocation vs Utilization</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allocationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="allocated" name="Allocated Budget" fill="#4f46e5" />
                <Bar dataKey="utilized" name="Utilized Amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
