import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, School, Users, TrendingUp } from 'lucide-react';

interface SuccessStory {
  id: string;
  schoolName: string;
  location: string;
  imageUrl: string;
  metrics: {
    label: string;
    value: string;
    icon: React.ElementType;
  }[];
  description: string;
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    schoolName: 'Delhi Public School',
    location: 'New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Student Performance', value: '+25%', icon: TrendingUp },
      { label: 'Resource Efficiency', value: '+40%', icon: School },
      { label: 'Teacher Satisfaction', value: '95%', icon: Users },
    ],
    description: 'Transformed from an odd structure to a standardized model, improving student outcomes and resource utilization.'
  },
  {
    id: '2',
    schoolName: 'St. Mary\'s School',
    location: 'Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Infrastructure Score', value: '+35%', icon: TrendingUp },
      { label: 'Student Enrollment', value: '+30%', icon: School },
      { label: 'Community Rating', value: '4.8/5', icon: Users },
    ],
    description: 'Implemented comprehensive standardization leading to increased enrollment and community engagement.'
  }
];

export function SuccessStories() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">
            Discover how schools across India are transforming through standardization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={story.imageUrl}
                  alt={story.schoolName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{story.schoolName}</h3>
                  <p className="text-sm opacity-90">{story.location}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {story.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="text-center">
                        <Icon className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="font-semibold text-gray-900">{metric.value}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-gray-600 mb-4">{story.description}</p>

                <button className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}