import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, GraduationCap, BarChart2, Users, Download } from 'lucide-react';
import { QuickAccessCard } from './QuickAccessCard';
import { WelcomeHeader } from './WelcomeHeader';
import { ProgressOverview } from './ProgressOverview';

export function StandardizationDashboard() {
  const { user } = useAuth();

  const quickAccessItems = [
    {
      title: 'Step-by-Step Guides',
      description: 'Comprehensive guides for infrastructure and grade reconfiguration',
      icon: BookOpen,
      link: '/standardization/guides',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Training Modules',
      description: 'Interactive training programs for staff development',
      icon: GraduationCap,
      link: '/standardization/training',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Implementation Tools',
      description: 'Practical tools for planning and execution',
      icon: BarChart2,
      link: '/standardization/tools',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Resources',
      description: 'Download templates and guides',
      icon: Download,
      link: '/standardization/resources',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="space-y-8">
      <WelcomeHeader user={user} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickAccessItems.map((item, index) => (
          <QuickAccessCard key={index} {...item} />
        ))}
      </div>

    </div>
  );
}