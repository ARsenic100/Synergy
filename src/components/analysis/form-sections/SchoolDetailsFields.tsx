import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Building2, Calendar } from 'lucide-react';
import { FormField } from '../FormField';

export function SchoolDetailsFields() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="School Category"
          icon={Building2}
          error={errors?.schoolCategory?.message as string}
        >
          <select
            {...register('schoolCategory')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="1-Primary">Primary</option>
            <option value="2-Upper Primary">Upper Primary</option>
            <option value="3-Secondary">Secondary</option>
            <option value="4-Higher Secondary">Higher Secondary</option>
          </select>
        </FormField>

        <FormField
          label="School Management"
          icon={Building2}
          error={errors?.schoolManagement?.message as string}
        >
          <select
            {...register('schoolManagement')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Management</option>
            <option value="1-Department of Education">Department of Education</option>
            <option value="2-Tribal Welfare Department">Tribal Welfare Department</option>
            <option value="3-Local Body">Local Body</option>
            <option value="4-Private Aided">Private Aided</option>
            <option value="5-Private Unaided">Private Unaided</option>
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="School Type"
          icon={Building2}
          error={errors?.schoolType?.message as string}
        >
          <select
            {...register('schoolType')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Type</option>
            <option value="1-Boys">Boys</option>
            <option value="2-Girls">Girls</option>
            <option value="3-Co-educational">Co-educational</option>
          </select>
        </FormField>

        <FormField
          label="Year of Establishment"
          icon={Calendar}
          error={errors?.yearEstablished?.message as string}
        >
          <input
            type="number"
            {...register('yearEstablished', { valueAsNumber: true })}
            placeholder="e.g., 1946"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isShiftSchool')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Shift School?</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('hasAnganwadi')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Anganwadi at Premises?</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isSpecialSchool')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Is Special School for CWSN?</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isMinoritySchool')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Minority School?</span>
          </label>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('communityParticipation')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Community Participation</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('activeSchoolManagementCommittee')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Active School Management Committee</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('communityEngagement')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Community Engagement</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('integrationWithAnganwadiCenters')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Integration with Anganwadi Centers</span>
        </label>
      </div>
      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('coLocationWithAnganwadiCenters')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Co-Location with Anganwadi Centers</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('KGBVUpgraded')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>KGBV Upgraded</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('provisionOfStipendsForCWSNGirls')}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Provision of Stipends for CWSN Girls</span>
        </label>
      </div>
    </div>

    <h3 className="font-medium text-gray-900 mb-4">Management & Governance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('annualMaintenance')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Annual Maintenance of School Infrastructure</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('schoolMapping')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>School Mapping and Planning</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('studentTracking')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Student Tracking and Monitoring</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('governanceAndManagement')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Governance and Management</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('monitoringAndEvaluationPractices')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Monitoring and Evaluation Practices</span>
          </label>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('managementStructure')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Management Structure</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('researchAndDevelopmentEngagement')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Engagement in Research and Development</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('supportSystems')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Support Systems</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('dataManagementAndReporting')}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Effective Data Management and Reporting</span>
          </label>
        </div>
        </div>

        <h3 className="font-medium text-gray-900 mt-6 mb-4">Financial Compliance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('freeAndCompulsoryEducation')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Free and Compulsory Education</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('nonDiscrimination')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Non-Discrimination</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('timelyFundUtilization')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Timely Fund Utilization</span>
            </label>

            </div>

            <div className="space-y-4">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('fundsAuditedAnnually')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Funds Audited Annually</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('resourceUtilizationEfficiency')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Resource Utilization Efficiency</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('financialManagement')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Effective Financial Management</span>
            </label>
          </div>
        </div>

    </div>
  );
}