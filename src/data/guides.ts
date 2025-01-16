import { Guide } from '../types/support';

export const standardizationGuides: Guide[] = [
  {
    id: 'infrastructure-planning',
    title: 'Infrastructure Planning Guide',
    description: 'Comprehensive guide for planning and implementing infrastructure changes to meet standardization requirements.',
    category: 'infrastructure',
    estimatedDuration: '3-6 months',
    steps: [
      {
        id: 'assess-current',
        title: 'Current Infrastructure Assessment',
        description: 'Evaluate existing facilities, classrooms, and resources.',
        duration: '2-3 weeks',
        status: 'not-started'
      },
      {
        id: 'gap-analysis',
        title: 'Gap Analysis',
        description: 'Identify infrastructure gaps based on standard requirements.',
        duration: '2 weeks',
        status: 'not-started'
      },
      {
        id: 'resource-planning',
        title: 'Resource Planning',
        description: 'Plan resource allocation and budget requirements.',
        duration: '4 weeks',
        status: 'not-started'
      }
    ]
  },
  {
    id: 'grade-reconfiguration',
    title: 'Grade Reconfiguration Guide',
    description: 'Step-by-step process for restructuring grade configurations.',
    category: 'academic',
    estimatedDuration: '6-12 months',
    steps: [
      {
        id: 'current-structure',
        title: 'Current Structure Analysis',
        description: 'Analyze current grade structure and student distribution.',
        duration: '3 weeks',
        status: 'not-started'
      },
      {
        id: 'transition-plan',
        title: 'Transition Planning',
        description: 'Develop a phased transition plan for grade reconfiguration.',
        duration: '6 weeks',
        status: 'not-started'
      }
    ]
  }
];