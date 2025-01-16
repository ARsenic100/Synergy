// import React from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
// import { ComplianceCategoryData } from '../../types/compliance';

// interface ComplianceCategoryProps {
//   category: ComplianceCategoryData;
//   onStatusUpdate: (itemId: string, value: boolean) => void;
//   isActive: boolean;
//   onSelect: () => void;
// }

// export function ComplianceCategory({
//   category,
//   onStatusUpdate,
//   isActive,
//   onSelect,
// }: ComplianceCategoryProps) {
//   const completedItems = category.items.filter(item => item.status).length;
//   const progress = (completedItems / category.items.length) * 100;

//   return (
//     <motion.div
//       initial={false}
//       animate={isActive ? { height: 'auto' } : { height: 'auto' }}
//       className="bg-white rounded-xl shadow-sm overflow-hidden"
//     >
//       <button
//         onClick={onSelect}
//         className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
//       >
//         <div className="flex items-center gap-4">
//           <div className={`p-2 rounded-lg ${category.colorClass}`}>
//             <category.icon className="h-6 w-6" />
//           </div>
//           <div className="text-left">
//             <h3 className="font-semibold text-gray-900">{category.title}</h3>
//             <p className="text-sm text-gray-500">
//               {completedItems} of {category.items.length} requirements met
//             </p>
//           </div>
//         </div>
//         <ChevronDown
//           className={`h-5 w-5 text-gray-400 transition-transform ${
//             isActive ? 'rotate-180' : ''
//           }`}
//         />
//       </button>

//       {isActive && (
//         <div className="px-6 pb-6">
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
//             <div
//               className="bg-indigo-600 h-2 rounded-full transition-all"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <div className="space-y-4">
//             {category.items.map(item => (
//               <div
//                 key={item.id}
//                 className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
//               >
//                 <div className="pt-0.5">
//                   <input
//                     type="checkbox"
//                     checked={item.status}
//                     onChange={e => onStatusUpdate(item.id, e.target.checked)}
//                     className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <h4 className="font-medium text-gray-900">{item.title}</h4>
//                     {item.severity === 'high' && (
//                       <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
//                         Critical
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {item.description}
//                   </p>
//                   {!item.status && item.recommendation && (
//                     <div className="mt-2 text-sm text-indigo-600">
//                       Recommendation: {item.recommendation}
//                     </div>
//                   )}
//                 </div>
//                 {item.status ? (
//                   <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
//                 ) : (
//                   <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

import React from 'react';
import { motion } from 'framer-motion';
import { ComplianceCategory as CategoryType } from '../../types/compliance.js';

interface ComplianceCategoryProps {
  category: CategoryType;
  onStatusUpdate: (itemId: string, value: boolean) => void;
  isActive: boolean;
  onSelect: () => void;
}

export function ComplianceCategory({
  category,
  onStatusUpdate,
  isActive,
  onSelect,
}: ComplianceCategoryProps) {
  const Icon = category.icon;

  return (
    <motion.div
      layout
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isActive ? 'ring-2 ring-indigo-500' : ''
      }`}
    >
      <button
        onClick={onSelect}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${category.colorClass}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold">{category.title}</h3>
        </div>
        <div className="text-sm text-gray-500">
          {category.items.filter((item) => item.status).length} of {category.items.length} completed
        </div>
      </button>

      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="border-t border-gray-200"
        >
          <div className="p-4 space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={(e) => onStatusUpdate(item.id, e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{item.title}</h4>
                    {item.severity === 'high' && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Critical
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  {item.recommendation && (
                    <p className="text-sm text-indigo-600 mt-2">
                      Recommendation: {item.recommendation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}