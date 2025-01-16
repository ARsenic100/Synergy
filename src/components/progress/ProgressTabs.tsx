import React from 'react';
import { 
  Globe2, 
  Map, 
  School, 
  BarChart2, 
  AlertTriangle, 
  FileText 
} from 'lucide-react';

interface ProgressTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProgressTabs({ activeTab, onTabChange }: ProgressTabsProps) {
  const tabs = [
    { id: 'regional', label: 'Regional Progress', icon: Map },
    { id: 'school', label: 'School Progress', icon: School },
    { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: FileText },
    // { id: 'national', label: 'National Overview', icon: Globe2 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-1">
      <nav className="flex space-x-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}