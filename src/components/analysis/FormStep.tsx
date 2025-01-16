import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormStepProps {
  id: string;
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function FormStep({
  title,
  icon: Icon,
  isActive,
  isCompleted,
  onClick
}: FormStepProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 ${
        isActive
          ? 'text-indigo-600'
          : isCompleted
          ? 'text-green-600'
          : 'text-gray-500'
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          isActive
            ? 'bg-indigo-100'
            : isCompleted
            ? 'bg-green-100'
            : 'bg-gray-100'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium">{title}</span>
    </button>
  );
}