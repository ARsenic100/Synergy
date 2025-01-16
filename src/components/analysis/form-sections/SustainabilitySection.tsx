import React from 'react';
import { Droplets, Sun, Shield, MapPin, Heart } from 'lucide-react';
import { FormField } from '../FormField';

interface SustainabilitySectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function SustainabilitySection({
  formData,
  onChange,
  errors,
}: SustainabilitySectionProps) {
  return (
    <div className="space-y-6">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Eco-Friendly Construction</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.ecoFriendlyConstruction}
              onChange={(e) => onChange('ecoFriendlyConstruction', e.target.checked)}
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
              checked={formData.safetyStandardsCompliance}
              onChange={(e) => onChange('safetyStandardsCompliance', e.target.checked)}
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
              checked={formData.universalAccess}
              onChange={(e) => onChange('universalAccess', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Universal Access</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.inclusiveEnvironment}
              onChange={(e) => onChange('inclusiveEnvironment', e.target.checked)}
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
              checked={formData.transportationForRemoteAreas}
              onChange={(e) => onChange('transportationForRemoteAreas', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Transportation for Remote Areas</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.childProtectionPolicies}
              onChange={(e) => onChange('childProtectionPolicies', e.target.checked)}
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
              checked={formData.safetyStandards}
              onChange={(e) => onChange('safetyStandards', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Safety Standards</span>
          </label>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.supportForCWSN}
              onChange={(e) => onChange('supportForCWSN', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Support for CWSN</span>
          </label>
        </div>
      </div>
    </div>
  );
}







