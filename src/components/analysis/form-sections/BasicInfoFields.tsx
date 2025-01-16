// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { School, MapPin, Hash } from 'lucide-react';
// import { Building2, BookOpen, Users } from 'lucide-react';
// import { FormField } from '../FormField';
// import { states } from '../../../data/states';

// export function BasicInfoFields() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="UDISE Code"
//           icon={Hash}
//           error={errors?.udiseCode?.message as string}
//         >
//           <input
//             {...register('udiseCode')}
//             placeholder="e.g., 19110908502"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="School Name"
//           icon={School}
//           error={errors?.schoolName?.message as string}
//         >
//           <input
//             {...register('schoolName')}
//             placeholder="e.g., Jabalpur Public School"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FormField
//           label="State"
//           icon={MapPin}
//           error={errors?.state?.message as string}
//         >
//           <select
//             {...register('state')}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select State</option>
//             {states.map((state) => (
//               <option key={state.code} value={state.name}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//         </FormField>

//         <FormField
//           label="District"
//           icon={MapPin}
//           error={errors?.district?.message as string}
//         >
//           <input
//             {...register('district')}
//             placeholder="e.g., Jabalpur"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="Block"
//           icon={MapPin}
//           error={errors?.block?.message as string}
//         >
//           <input
//             {...register('block')}
//             placeholder="e.g., Mohali"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <FormField
//           label="Rural/Urban"
//           icon={MapPin}
//           error={errors?.ruralUrban?.message as string}
//         >
//           <select
//             {...register('ruralUrban')}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select Area Type</option>
//             <option value="1-Rural">Rural</option>
//             <option value="2-Urban">Urban</option>
//             <option value="3-Remote">Remote</option>
//           </select>
//         </FormField>

//         <FormField
//           label="Cluster"
//           icon={MapPin}
//           error={errors?.cluster?.message as string}
//         >
//           <input
//             {...register('cluster')}
//             placeholder="e.g., Jalebi"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="Village"
//           icon={MapPin}
//           error={errors?.village?.message as string}
//         >
//           <input
//             {...register('village')}
//             placeholder="e.g., Samosa"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>

//         <FormField
//           label="Pincode"
//           icon={MapPin}
//           error={errors?.pincode?.message as string}
//         >
//           <input
//             {...register('pincode')}
//             placeholder="e.g., 400111"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//         </FormField>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="Medium of Instruction"
//           icon={BookOpen}
//           error={errors?.mediumOfInstruction?.message as string}
//         >
//           <input
//             {...register('mediumOfInstruction')}
//             type="text"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter medium of instruction"
//           />
//         </FormField>

//         {/* <FormField
//           label="School Type"
//           icon={Building2}
//           error={errors?.schoolType?.message as string}
//         >
//           <select
//             {...register('schoolType')}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">Select school type</option>
//             <option value="co-educational">Co-Educational</option>
//             <option value="boys">Boys</option>
//             <option value="girls">Girls</option>
//           </select>
//         </FormField> */}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//       <FormField
//         label="Total Classrooms"
//         icon={Building2}
//         error={errors?.totalClassrooms?.message as string}
//       >
//         <input
//           type="number"
//           {...register('totalClassrooms', { valueAsNumber: true })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Lowest Class"
//         icon={BookOpen}
//         error={errors?.lowestClass?.message as string}
//       >
//         <input
//           type="number"
//           {...register('lowestClass', { valueAsNumber: true })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Highest Class"
//         icon={BookOpen}
//         error={errors?.highestClass?.message as string}
//       >
//         <input
//           type="number"
//           {...register('highestClass', { valueAsNumber: true })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//     </div>

//     {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//       <div className="space-y-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('separateRoomForHM')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Separate Room for HM</span>
//         </label>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('boysWashrooms')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Boys Washrooms</span>
//         </label>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('girlsWashrooms')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Girls Washrooms</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('infrastructureQuality')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Infrastructure Quality</span>
//         </label>
//       </div>
//       <div className="space-y-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('boundaryWall')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Boundary Wall</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('playgroundAvailable')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Playground Available</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register('kitchensForMidDayMeal')}
//             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//           />
//           <span>Kitchens for Mid-Day Meal</span>
//         </label>
//       </div>
//     </div>

//     <h3 className="text-lg font-semibold mb-6">Classroom Condition</h3>
//     <p className="text-sm text-gray-500 mb-6">
//       Please provide the number of classrooms in good condition, requiring
//       minor repairs, and requiring major repairs.
//     </p>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <FormField
//         label="Good Condition"
//         icon={BookOpen}
//         error={
//           errors?.classroomCondition?.[0]?.goodCondition?.message as string
//         }
//       >
//         <input
//           type="number"
//           {...register('classroomCondition[0].goodCondition', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Minor Repair"
//         icon={BookOpen}
//         error={
//           errors?.classroomCondition?.[0]?.minorRepair?.message as string
//         }
//       >
//         <input
//           type="number"
//           {...register('classroomCondition[0].minorRepair', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Major Repair"
//         icon={BookOpen}
//         error={
//           errors?.classroomCondition?.[0]?.majorRepair?.message as string
//         }
//       >
//         <input
//           type="number"
//           {...register('classroomCondition[0].majorRepair', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>
//     </div>

//     <h3 className="text-lg font-semibold">Facilities</h3>
//     <p className="text-sm text-gray-500">
//       Please select the facilities available at the school.
//     </p>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('libraryAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Library Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('computerLabAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Computer Lab Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('drinkingWaterAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Drinking Water Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('electricityAvailability')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Electricity Availability</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('internetAvailability')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Internet Availability</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('scienceLabAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Science Lab Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('smartClassroomAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Smart Classroom Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('playgroundAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Playground Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('auditoriumAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Auditorium Available</span>
//       </label>

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           {...register('digitalLibraryAvailable')}
//           className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <span>Digital Library Available</span>
//       </label>
//     </div>

//     <h3 className="text-lg font-semibold">Resource Distribution</h3>
//     <p className="text-sm text-gray-500">
//       Please provide the number of teaching staff and classrooms available.
//     </p>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <FormField
//         label="Teaching Staff Current"
//         icon={Users}
//         error={
//           errors?.resourceDistribution?.[0]?.teachingStaff?.current
//             ?.message as string
//         }
//       >
//         <input
//           type="number"
//           {...register('resourceDistribution[0].teachingStaff.current', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>
//       <FormField
//         label="Classrooms Current"
//         icon={Building2}
//         error={
//           errors?.resourceDistribution?.[0]?.classrooms?.message as string
//         }
//       >
//         <input
//           type="number"
//           {...register('resourceDistribution[0].classrooms.current', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>
//       <FormField
//         label="Labs Current"
//         icon={Building2}
//         error={errors?.resourceDistribution?.[0]?.labs?.message as string}
//       >
//         <input
//           type="number"
//           {...register('resourceDistribution[0].labs.current', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>
//     </div>

//     <h3 className="text-lg font-semibold">Digital Equipments</h3>
//     <p className="text-sm text-gray-500">
//       Please provide the number of digital equipments available.
//     </p>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//     <FormField
//         label="Desktops"
//         icon={Building2}
//         error={errors?.digitalEquipment?.[0]?.desktops?.message as string}
//       >
//         <input
//           type="number"
//           {...register('digitalEquipment[0].desktops', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Laptops"
//         icon={Building2}
//         error={errors?.digitalEquipment?.[0]?.laptops?.message as string}
//       >
//         <input
//           type="number"
//           {...register('digitalEquipment[0].laptops', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Projectors"
//         icon={Building2}
//         error={errors?.digitalEquipment?.[0]?.projectors?.message as string}
//       >
//         <input
//           type="number"
//           {...register('digitalEquipment[0].projectors', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Smart Boards"
//         icon={Building2}
//         error={errors?.digitalEquipment?.[0]?.smartBoards?.message as string}
//       >
//         <input
//           type="number"
//           {...register('digitalEquipment[0].smartBoards', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//       <FormField
//         label="Printers"
//         icon={Building2}
//         error={errors?.digitalEquipment?.[0]?.printers?.message as string}
//       >
//         <input
//           type="number"
//           {...register('digitalEquipment[0].printers', {
//             valueAsNumber: true,
//           })}
//           className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//         />
//       </FormField>

//     </div> */}

//     </div>
//   );
// }

import React from "react";
import { useFormContext } from "react-hook-form";
import { School, MapPin, Hash } from "lucide-react";
import { Building2, BookOpen, Users } from "lucide-react";
import { FormField } from "../FormField";
import { states } from "../../../data/states";

export function BasicInfoFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="UDISE Code"
          icon={Hash}
          error={errors?.udiseCode?.message as string}
        >
          <input
            {...register("schoolID")}
            placeholder="e.g., 19110908502"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="School Name"
          icon={School}
          error={errors?.schoolName?.message as string}
        >
          <input
            {...register("schoolName")}
            placeholder="e.g., Jabalpur Public School"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="State"
          icon={MapPin}
          error={errors?.state?.message as string}
        >
          <select
            {...register("state")}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="District"
          icon={MapPin}
          error={errors?.district?.message as string}
        >
          <input
            {...register("district")}
            placeholder="e.g., Jabalpur"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Block"
          icon={MapPin}
          error={errors?.block?.message as string}
        >
          <input
            {...register("block")}
            placeholder="e.g., Mohali"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FormField
          label="Rural/Urban"
          icon={MapPin}
          error={errors?.ruralUrban?.message as string}
        >
          <select
            {...register("ruralUrban")}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Area Type</option>
            <option value="1-Rural">Rural</option>
            <option value="2-Urban">Urban</option>
            <option value="3-Remote">Remote</option>
          </select>
        </FormField>

        <FormField
          label="Cluster"
          icon={MapPin}
          error={errors?.cluster?.message as string}
        >
          <input
            {...register("cluster")}
            placeholder="e.g., Jalebi"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Village"
          icon={MapPin}
          error={errors?.village?.message as string}
        >
          <input
            {...register("villageCity")}
            placeholder="e.g., Samosa"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Pincode"
          icon={MapPin}
          error={errors?.pincode?.message as string}
        >
          <input
            {...register("pincode")}
            placeholder="e.g., 400111"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Medium of Instruction"
          icon={BookOpen}
          error={errors?.mediumOfInstruction?.message as string}
        >
          <input
            {...register("mediumOfInstruction")}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter medium of instruction"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="Latitude"
            icon={MapPin}
            error={errors?.latitude?.message as string}
          >
            <input
            type="float"
              {...register("latitude")}
              placeholder="e.g., 19.123456"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            
          </FormField>

          <FormField
            
            label="Longitude"
            icon={MapPin}
            error={errors?.longitude?.message as string}
          >
            <input
            type="float"
              {...register("longitude")}
              placeholder="e.g., 72.123456"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </FormField>

        </div>
        {/* <FormField
          label="School Type"
          icon={Building2}
          error={errors?.schoolType?.message as string}
        >
          <select
            {...register('schoolType')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select school type</option>
            <option value="co-educational">Co-Educational</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>
        </FormField> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Total Classrooms"
          icon={Building2}
          error={errors?.totalClassrooms?.message as string}
        >
          <input
            type="number"
            {...register("totalClassrooms", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Lowest Class"
          icon={BookOpen}
          error={errors?.lowestClass?.message as string}
        >
          <input
            type="number"
            {...register("lowestClass", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Highest Class"
          icon={BookOpen}
          error={errors?.highestClass?.message as string}
        >
          <input
            type="number"
            {...register("highestClass", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("separateRoomForHM")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Separate Room for HM</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("boysWashrooms")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Boys Washrooms</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("girlsWashrooms")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Girls Washrooms</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("infrastructureQuality")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Infrastructure Quality</span>
          </label>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("boundaryWall")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Boundary Wall</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("playgroundAvailable")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>PlayGround Available</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("kitchensForMidDayMeal")}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Kitchens for Mid-Day Meal</span>
          </label>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-6">Classroom Condition</h3>
      <p className="text-sm text-gray-500 mb-6">
        Please provide the number of classrooms in good condition, requiring
        minor repairs, and requiring major repairs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Good Condition"
          icon={BookOpen}
          error={
            errors?.classroomCondition?.[0]?.goodCondition?.message as string
          }
        >
          <input
            type="number"
            {...register("classroomCondition[0].goodCondition", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Minor Repair"
          icon={BookOpen}
          error={
            errors?.classroomCondition?.[0]?.minorRepair?.message as string
          }
        >
          <input
            type="number"
            {...register("classroomCondition[0].minorRepair", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Major Repair"
          icon={BookOpen}
          error={
            errors?.classroomCondition?.[0]?.majorRepair?.message as string
          }
        >
          <input
            type="number"
            {...register("classroomCondition[0].majorRepair", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <h3 className="text-lg font-semibold">Facilities</h3>
      <p className="text-sm text-gray-500">
        Please select the facilities available at the school.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("libraryAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Library Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("computerLabAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Computer Lab Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("drinkingWaterAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Drinking Water Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("electricityAvailability")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Electricity Availability</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("internetAvailability")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Internet Availability</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("scienceLabAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Science Lab Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("smartClassroomAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Smart Classroom Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("auditoriumAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Auditorium Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("digitalLibraryAvailable")}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Digital Library Available</span>
        </label>
      </div>

      <h3 className="text-lg font-semibold">Resource Distribution</h3>
      <p className="text-sm text-gray-500">
        Please provide the number of teaching staff and classrooms available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Teaching Staff Current"
          icon={Users}
          error={
            errors?.resourceDistribution?.[0]?.teachingStaff?.current
              ?.message as string
          }
        >
          <input
            type="number"
            {...register("resourceDistribution[0].teachingStaff.current", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
        <FormField
          label="Classrooms Current"
          icon={Building2}
          error={
            errors?.resourceDistribution?.[0]?.classrooms?.message as string
          }
        >
          <input
            type="number"
            {...register("resourceDistribution[0].classrooms.current", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
        <FormField
          label="Labs Current"
          icon={Building2}
          error={errors?.resourceDistribution?.[0]?.labs?.message as string}
        >
          <input
            type="number"
            {...register("resourceDistribution[0].labs.current", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <h3 className="text-lg font-semibold">Digital Equipments</h3>
      <p className="text-sm text-gray-500">
        Please provide the number of digital equipments available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Desktops"
          icon={Building2}
          error={errors?.digitalEquipment?.[0]?.desktops?.message as string}
        >
          <input
            type="number"
            {...register("digitalEquipment[0].desktops", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Laptops"
          icon={Building2}
          error={errors?.digitalEquipment?.[0]?.laptops?.message as string}
        >
          <input
            type="number"
            {...register("digitalEquipment[0].laptops", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Projectors"
          icon={Building2}
          error={errors?.digitalEquipment?.[0]?.projectors?.message as string}
        >
          <input
            type="number"
            {...register("digitalEquipment[0].projectors", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Smart Boards"
          icon={Building2}
          error={errors?.digitalEquipment?.[0]?.smartBoards?.message as string}
        >
          <input
            type="number"
            {...register("digitalEquipment[0].smartBoards", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Printers"
          icon={Building2}
          error={errors?.digitalEquipment?.[0]?.printers?.message as string}
        >
          <input
            type="number"
            {...register("digitalEquipment[0].printers", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>
    </div>
  );
}
