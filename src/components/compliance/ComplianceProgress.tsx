// import React from 'react';
// import { motion } from 'framer-motion';
// import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
// import { ComplianceData } from '../../types/compliance';

// interface ComplianceProgressProps {
//   compliance: ComplianceData;
// }

// export function ComplianceProgress({ compliance }: ComplianceProgressProps) {
//   const calculateOverallProgress = () => {
//     let total = 0;
//     let completed = 0;

//     Object.values(compliance).forEach(category => {
//       total += category.items.length;
//       completed += category.items.filter(item => item.status).length;
//     });

//     return (completed / total) * 100;
//   };

//   const progress = calculateOverallProgress();

//   return (
//     <div className="mt-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
//         >
//           <div className="flex items-center gap-3">
//             <TrendingUp className="h-5 w-5" />
//             <div>
//               <div className="text-2xl font-bold">{progress.toFixed(1)}%</div>
//               <div className="text-sm text-indigo-100">Overall Progress</div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
//         >
//           <div className="flex items-center gap-3">
//             <AlertTriangle className="h-5 w-5" />
//             <div>
//               <div className="text-2xl font-bold">
//                 {Object.values(compliance).reduce(
//                   (acc, category) =>
//                     acc +
//                     category.items.filter(
//                       item => !item.status && item.severity === 'high'
//                     ).length,
//                   0
//                 )}
//               </div>
//               <div className="text-sm text-indigo-100">Critical Items</div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
//         >
//           <div className="flex items-center gap-3">
//             <CheckCircle className="h-5 w-5" />
//             <div>
//               <div className="text-2xl font-bold">
//                 {Object.values(compliance).reduce(
//                   (acc, category) =>
//                     acc + category.items.filter(item => item.status).length,
//                   0
//                 )}
//               </div>
//               <div className="text-sm text-indigo-100">
//                 Requirements Completed
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { ComplianceStats } from '../../types/compliance';

interface ComplianceProgressProps {
  stats: ComplianceStats;
}

export function ComplianceProgress({ stats }: ComplianceProgressProps) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-medium">Overall Progress</h3>
          </div>
          <p className="text-2xl font-bold">{stats.progress}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5" />
            <h3 className="font-medium">Completed Items</h3>
          </div>
          <p className="text-2xl font-bold">{stats.completedItems}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-medium">Critical Items</h3>
          </div>
          <p className="text-2xl font-bold">{stats.criticalItems}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5" />
            <h3 className="font-medium">Total Items</h3>
          </div>
          <p className="text-2xl font-bold">{stats.totalItems}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}