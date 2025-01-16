// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { Users, GraduationCap } from 'lucide-react';
// import { FormField } from '../FormField';

// export function TeacherFields() {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="Total Teachers"
//           icon={Users}
//           error={errors?.totalTeachers?.message as string}
//         >
//           <input
//             type="number"
//             {...register('totalTeachers', { valueAsNumber: true })}
//             placeholder="e.g., 17"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="Male Teachers"
//           icon={Users}
//           error={errors?.maleTeachers?.message as string}
//         >
//           <input
//             type="number"
//             {...register('maleTeachers', { valueAsNumber: true })}
//             placeholder="e.g., 9"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="Female Teachers"
//           icon={Users}
//           error={errors?.femaleTeachers?.message as string}
//         >
//           <input
//             type="number"
//             {...register('femaleTeachers', { valueAsNumber: true })}
//             placeholder="e.g., 8"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         {/* <FormField
//           label="Total Students"
//           icon={Users}
//           error={errors?.totalStudents?.message as string}
//         >
//           <input
//             type="number"
//             {...register('totalStudents', { valueAsNumber: true })}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField> */}

//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="Academic Qualification"
//           icon={GraduationCap}
//           error={errors?.academicQualification?.message as string}
//         >
//           <select
//             {...register('academicQualification')}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Qualification</option>
//             <option value="Below Graduate">Below Graduate</option>
//             <option value="Graduate">Graduate</option>
//             <option value="Post Graduate">Post Graduate</option>
//           </select>
//         </FormField>

//         <FormField
//           label="Professional Qualification"
//           icon={GraduationCap}
//           error={errors?.professionalQualification?.message as string}
//         >
//           <select
//             {...register('professionalQualification')}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Qualification</option>
//             <option value="Diploma">Diploma</option>
//             <option value="B.Ed.">B.Ed.</option>
//             <option value="M.Ed.">M.Ed.</option>
//           </select>
//         </FormField>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="General Category Total"
//           icon={Users}
//           error={errors?.generalCategoryTotal?.message as string}
//         >
//           <input
//             type="number"
//             {...register('generalCategoryTotal', { valueAsNumber: true })}
//             placeholder="e.g., 389"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="SC Category Total"
//           icon={Users}
//           error={errors?.scCategoryTotal?.message as string}
//         >
//           <input
//             type="number"
//             {...register('scCategoryTotal', { valueAsNumber: true })}
//             placeholder="e.g., 32"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="ST Category Total"
//           icon={Users}
//           error={errors?.stCategoryTotal?.message as string}
//         >
//           <input
//             type="number"
//             {...register('stCategoryTotal', { valueAsNumber: true })}
//             placeholder="e.g., 4"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="OBC Category Total"
//           icon={Users}
//           error={errors?.obcCategoryTotal?.message as string}
//         >
//           <input
//             type="number"
//             {...register('obcCategoryTotal', { valueAsNumber: true })}
//             placeholder="e.g., 6"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Users, TrendingUp, Building2, BookOpen, Calendar, Check, DollarSign, Plus, Minus, X } from 'lucide-react';
import { FormField } from '../FormField';

export function TeacherFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields: complianceVisits, append: appendComplianceVisit, remove: removeComplianceVisit } = useFieldArray({
    control,
    name: "complianceVisits"
  });

  const handleAddComplianceVisit = () => {
    appendComplianceVisit({
      type: '',
      lastVisit: '',
      status: ''
    });
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Total Teachers"
          icon={Users}
          error={errors?.totalTeachers?.message as string}
        >
          <input
            type="number"
            {...register('totalTeachers', { valueAsNumber: true })}
            placeholder="e.g., 17"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Total Students"
          icon={Users}
          error={errors?.totalStudents?.message as string}
        >
          <input
            type="number"
            {...register('totalStudents', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

      </div>

      <h3 className="text-lg font-semibold">Student Demographics</h3>
      <p className="text-sm text-gray-500">
        Please provide the number of 
        students in each category.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 

        <FormField
          label="General"
          icon={Users}
          error={errors?.studentDemographics?.[0]?.general?.message as string}
        >
          <input
            type="number"
            {...register('studentDemographics[0].general', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="SC"
          icon={Users}
          error={errors?.studentDemographics?.[0]?.SC?.message as string}
        >
          <input
            type="number"
            {...register('studentDemographics[0].SC', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="ST"
          icon={Users}
          error={errors?.studentDemographics?.[0]?.ST?.message as string}
        >
          <input
            type="number"
            {...register('studentDemographics[0].ST', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="OBC"
          icon={Users}
          error={errors?.studentDemographics?.[0]?.OBC?.message as string}
        >
          <input
            type="number"
            {...register('studentDemographics[0].OBC', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Academic Performance (%)"
          icon={TrendingUp}
          error={errors?.academicPerformance?.message}
        >
          <input
            {...register('academicAchievement', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Attendance Rate (%)"
          icon={Users}
          error={errors?.attendanceRate?.message}
        >
          <input
            {...register('attendance', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Teacher Retention Rate (%)"
          icon={Users}
          error={errors?.teacherRetentionRate?.message}
        >
          <input
            {...register('teacherRetentionRate', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Infrastructure Score (%)"
          icon={Building2}
          error={errors?.infrastructureScore?.message}
        >
          <input
            {...register('infrastructureScore', { valueAsNumber: true })}
            type="number"
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <h3 className="text-lg font-semibold">Grant Utilization</h3>
      <p className="text-sm text-gray-500">
        Please provide the grant utilization details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Month"
          icon={BookOpen}
          error={errors?.grantUtilization?.[0]?.month?.message as string}
        >
          <input
            type="text"
            {...register('grantUtilization[0].month')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Grants Received"
          icon={DollarSign}
          error={errors?.grantUtilization?.[0]?.grantsReceived?.message as string}
        >
          <input
            type="number"
            {...register('grantUtilization[0].grantsReceived', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Grants Utilized"
          icon={DollarSign}
          error={errors?.grantUtilization?.[0]?.grantsUtilized?.message as string}
        >
          <input
            type="number"
            {...register('grantUtilization[0].grantsUtilized', {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      {/* Modified Compliance Visits section */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Compliance Visits</h3>
        <button
          type="button"
          onClick={handleAddComplianceVisit}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Visit
        </button>
      </div>
      
      <p className="text-sm text-gray-500">
        Please provide the compliance visit details.
      </p>

      {complianceVisits.map((field, index) => (
        <div key={field.id} className="space-y-4">
          {index > 0 && <hr className="my-6" />}
          <div className="relative">
            {/* Remove button */}
            {complianceVisits.length > 1 && (
              <button
                type="button"
                onClick={() => removeComplianceVisit(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                title="Remove visit"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="Type"
                icon={BookOpen}
                error={errors?.complianceVisits?.[index]?.type?.message as string}
              >
                <input
                  type="text"
                  {...register(`complianceVisits.${index}.type`)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </FormField>

              <FormField
                label="Last Visit"
                icon={Calendar}
                error={errors?.complianceVisits?.[index]?.lastVisit?.message as string}
              >
                <input
                  type="date"
                  {...register(`complianceVisits.${index}.lastVisit`)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </FormField>

              <FormField
                label="Status"
                icon={Check}
                error={errors?.complianceVisits?.[index]?.status?.message as string}
              >
                <input
                  type="text"
                  {...register(`complianceVisits.${index}.status`)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </FormField>
            </div>
          </div>
        </div>
      ))}


    </div>
  );
}