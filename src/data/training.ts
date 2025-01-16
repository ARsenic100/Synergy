import { TrainingModule } from '../types/support';

export const trainingModules: TrainingModule[] = [
  {
    id: 'basic-standardization',
    title: 'Understanding School Standardization',
    description: 'Introduction to school standardization principles and requirements.',
    topics: [
      'Basic standardization concepts',
      'UDISE+ requirements',
      'Compliance guidelines'
    ],
    duration: '2 hours',
    level: 'basic',
    completionRate: 0
  },
  {
    id: 'change-management',
    title: 'Change Management for School Leaders',
    description: 'Managing transition and stakeholder engagement during standardization.',
    topics: [
      'Stakeholder communication',
      'Resistance management',
      'Implementation strategies'
    ],
    duration: '4 hours',
    level: 'intermediate',
    completionRate: 0
  }
];