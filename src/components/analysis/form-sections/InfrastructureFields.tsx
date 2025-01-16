// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { Building2 } from 'lucide-react';
// import { FormField } from '../FormField';

// export function InfrastructureFields() {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <FormField
//         label="Building Status"
//         icon={Building2}
//         error={errors?.buildingStatus?.message as string}
//       >
//         <select
//           {...register('buildingStatus')}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="">Select Building Status</option>
//           <option value="1-Private">Private</option>
//           <option value="2-Rented">Rented</option>
//           <option value="3-Government">Government</option>
//           <option value="4-Government school in a rent free building">Government school in a rent free building</option>
//         </select>
//       </FormField>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               {...register('hasBoundaryWall')}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span>Boundary Wall Available?</span>
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               {...register('hasRamps')}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span>Availability of Ramps?</span>
//           </label>
//         </div>

//         <div className="space-y-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               {...register('hasPlayground')}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span>Playground Available?</span>
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               {...register('hasDrinkingWater')}
//               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//             />
//             <span>Drinking Water Functional?</span>
//           </label>
//         </div>


//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Building2 } from 'lucide-react';
import { FormField } from '../FormField';

export function InfrastructureFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        label="Building Status"
        icon={Building2}
        error={errors?.buildingStatus?.message as string}
      >
        <select
          {...register('buildingStatus')}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Building Status</option>
          <option value="1-Private">Private</option>
          <option value="2-Rented">Rented</option>
          <option value="3-Government">Government</option>
          <option value="4-Government school in a rent free building">Government school in a rent free building</option>
        </select>
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasBoundaryWall')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Boundary Wall Available?</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasRamps')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Availability of Ramps?</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasPlayground')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Playground Available?</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasDrinkingWater')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Drinking Water Functional?</span>
          </label>
        </div>

        
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Eco-Friendly Construction</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('ecoFriendlyConstruction')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Eco-Friendly Construction</span>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Safety Standards</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('safetyStandardsCompliance')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Safety Standards Compliance</span>
          </label>


        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('universalAccess')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Universal Access</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('inclusiveEnvironment')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Inclusive Environment</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('transportationForRemoteAreas')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Transportation for Remote Areas</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('childProtectionPolicies')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Child Protection Policies</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('safetyStandards')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Safety Standards</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('supportForCWSN')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Support for CWSN</span>
          </label>
        </div>



      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('curriculumStandardsAdherence')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Curriculum Standards Adherence</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('curriculumImplementation')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Curriculum Implementation</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('qualifiedAndTrainedTeachers')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Qualified and Trained Teachers</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('grant')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Have you been granted money</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('supportiveLearningEnvironment')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Supportive Learning Environment</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('noPunitivePractices')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>No Punitive Practices</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('studentLearningOutcomes')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Student Learning Outcomes</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('positiveEducationalOutcomes')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Positive Educational Outcomes</span>
          </label>
        </div>
      </div>


    </div>
  );
}