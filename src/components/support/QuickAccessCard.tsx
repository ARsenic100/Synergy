import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
}

export function QuickAccessCard({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  color 
}: QuickAccessCardProps) {
  return (
    <Link 
      to={link}
      className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}