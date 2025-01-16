import React from 'react';
import { MapPin, Hash, Building2 } from 'lucide-react';
import { states } from '../../../data/states';

interface IdentificationSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function IdentificationSection({
  formData,
  onChange,
  errors,
}: IdentificationSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-500" />
              UDISE ID
            </div>
          </label>
          <input
            type="text"
            value={formData.schoolId}
            onChange={(e) => onChange('schoolId', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
              errors.schoolId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter school ID"
          />
          {errors.schoolId && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              School Name
            </div>
          </label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => onChange('schoolName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
              errors.schoolName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter school name"
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              State
            </div>
          </label>
          <select
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              District
            </div>
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => onChange('district', e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 ${
              errors.district ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter district"
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">{errors.district}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Block
            </div>
          </label>
          <input
            type="text"
            value={formData.block}
            onChange={(e) => onChange('block', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter block"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Rural/Urban
            </div>
          </label>
          <select
            value={formData.ruralUrban}
            onChange={(e) => onChange('ruralUrban', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select area type</option>
            <option value="rural">Rural</option>
            <option value="urban">Urban</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Cluster
            </div>
          </label>
          <input
            type="text"
            value={formData.cluster}
            onChange={(e) => onChange('cluster', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter cluster"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Village/City
            </div>
          </label>
          <input
            type="text"
            value={formData.villageCity}
            onChange={(e) => onChange('villageCity', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter village/city"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              Pincode
            </div>
          </label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => onChange('pincode', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter pincode"
            maxLength={6}
          />
        </div>
      </div>
    </div>
  );
}