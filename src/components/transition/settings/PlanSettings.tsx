import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Bell,
  Globe,
  Lock,
  Users,
  Calendar,
  Mail,
  FileText,
  ToggleLeft,
  Clock,
  Settings2
} from 'lucide-react';

interface PlanSettingsProps {
  onClose: () => void;
}

interface Setting {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value: any;
  icon: React.ElementType;
  options?: { label: string; value: string }[];
}

const mockSettings: Record<string, Setting[]> = {
  notifications: [
    {
      id: 'email_notifications',
      label: 'Email Notifications',
      description: 'Receive updates about plan progress and milestones',
      type: 'toggle',
      value: true,
      icon: Mail
    },
    {
      id: 'reminder_frequency',
      label: 'Reminder Frequency',
      description: 'How often to receive task reminders',
      type: 'select',
      value: 'daily',
      icon: Bell,
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' }
      ]
    }
  ],
  privacy: [
    {
      id: 'plan_visibility',
      label: 'Plan Visibility',
      description: 'Control who can view your transition plan',
      type: 'select',
      value: 'team',
      icon: Globe,
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Team Only', value: 'team' },
        { label: 'Private', value: 'private' }
      ]
    },
    {
      id: 'collaboration',
      label: 'Team Collaboration',
      description: 'Allow team members to edit the plan',
      type: 'toggle',
      value: true,
      icon: Users
    }
  ],
  timeline: [
    {
      id: 'academic_year',
      label: 'Academic Year',
      description: 'Set the academic year for the transition',
      type: 'select',
      value: '2024-25',
      icon: Calendar,
      options: [
        { label: '2023-24', value: '2023-24' },
        { label: '2024-25', value: '2024-25' },
        { label: '2025-26', value: '2025-26' }
      ]
    },
    {
      id: 'phase_duration',
      label: 'Phase Duration',
      description: 'Default duration for transition phases',
      type: 'select',
      value: '3months',
      icon: Clock,
      options: [
        { label: '1 Month', value: '1month' },
        { label: '3 Months', value: '3months' },
        { label: '6 Months', value: '6months' }
      ]
    }
  ],
  documentation: [
    {
      id: 'auto_save',
      label: 'Auto-Save',
      description: 'Automatically save changes to the plan',
      type: 'toggle',
      value: true,
      icon: FileText
    },
    {
      id: 'version_history',
      label: 'Version History',
      description: 'Keep track of plan changes',
      type: 'toggle',
      value: true,
      icon: Clock
    }
  ]
};

export function PlanSettings({ onClose }: PlanSettingsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings2 className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold">Plan Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {Object.entries(mockSettings).map(([category, settings]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold capitalize mb-4">
                  {category}
                </h3>
                <div className="space-y-4">
                  {settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          {React.createElement(setting.icon, {
                            className: "h-5 w-5 text-gray-600"
                          })}
                        </div>
                        <div>
                          <h4 className="font-medium">{setting.label}</h4>
                          <p className="text-sm text-gray-600">
                            {setting.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        {setting.type === 'toggle' ? (
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                          </button>
                        ) : setting.type === 'select' ? (
                          <select className="form-select rounded-lg border-gray-300 text-sm">
                            {setting.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}