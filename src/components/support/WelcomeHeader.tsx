import React from 'react';
import { User } from '../../types/auth';
import { School } from 'lucide-react';

interface WelcomeHeaderProps {
  user: User | null;
}

export function WelcomeHeader({ user }: WelcomeHeaderProps) {
  const getWelcomeMessage = () => {
    if (!user) return 'Welcome to the Standardization Support Platform';
    
    const role = user.role.replace('_', ' ').toLowerCase();
    return `Welcome, ${user.name} (${role})`;
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 text-white">
      <div className="flex items-center gap-4 mb-4">
        <School className="h-10 w-10" />
        <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
      </div>
      <p className="text-lg opacity-90">
        Access comprehensive resources and tools to support your school's transition 
        to standardized structures. Track progress, complete training modules, and 
        connect with other schools in your journey.
      </p>
    </div>
  );
}