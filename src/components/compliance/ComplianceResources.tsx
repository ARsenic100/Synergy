import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

interface ComplianceResourcesProps {
  category: string;
}

export function ComplianceResources({ category }: ComplianceResourcesProps) {
  const resources = {
    infrastructure: [
      {
        type: 'guide',
        title: 'Infrastructure Requirements Guide',
        description: 'Detailed guide on classroom, laboratory, and facility requirements',
        link: '#',
      },
      {
        type: 'video',
        title: 'Facility Planning Tutorial',
        description: 'Step-by-step video on planning school infrastructure',
        link: '#',
      },
      {
        type: 'document',
        title: 'Safety Standards Documentation',
        description: 'Complete safety guidelines and checklists',
        link: '#',
      },
    ],
    staffing: [
      {
        type: 'guide',
        title: 'Staff Recruitment Guide',
        description: 'Guidelines for hiring and maintaining qualified staff',
        link: '#',
      },
      {
        type: 'video',
        title: 'Teacher Training Overview',
        description: 'Video guide on required teacher qualifications',
        link: '#',
      },
    ],
    // Add more categories as needed
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return BookOpen;
      case 'video':
        return Video;
      case 'document':
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Resources & Guidance</h3>
      <div className="space-y-4">
        {(resources[category as keyof typeof resources] || []).map((resource, index) => {
          const Icon = getIcon(resource.type);
          return (
            <motion.a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {resource.description}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}