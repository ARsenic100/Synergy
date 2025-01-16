import React from 'react';
import { Shield, Droplets, Sun, AlertTriangle } from 'lucide-react';

interface SafetyFieldsProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function SafetyFields({
  formData,
  onChange,
  errors,
}: SafetyFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Safety Standards</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.earthquakeCompliant}
              onChange={(e) => onChange('earthquakeCompliant', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Earthquake Safety Compliant</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.fireCompliant}
              onChange={(e) => onChange('fireCompliant', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Fire Safety Compliant</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.emergencyExits}
              onChange={(e) => onChange('emergencyExits', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Emergency Exits Available</span>
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Sustainability Features</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.rainwaterHarvesting}
              onChange={(e) => onChange('rainwaterHarvesting', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>Rainwater Harvesting System</span>
            </div>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.solarPower}
              onChange={(e) => onChange('solarPower', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>Solar Power System</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Distance from Nearest Habitation (km)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.distanceFromHabitation || ''}
            onChange={(e) => onChange('distanceFromHabitation', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          {errors.distanceFromHabitation && (
            <p className="mt-1 text-sm text-red-600">{errors.distanceFromHabitation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Response Time (minutes)
          </label>
          <input
            type="number"
            value={formData.emergencyResponseTime || ''}
            onChange={(e) => onChange('emergencyResponseTime', parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          {errors.emergencyResponseTime && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyResponseTime}</p>
          )}
        </div>
      </div>
    </div>
  );
}