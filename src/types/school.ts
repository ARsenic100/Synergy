export interface School {
  id: string;
  name: string;
  state: string;
  district: string;
  currentStructure: string;
  recommendedStructure: string;
  transitionStatus: 'pending' | 'in-progress' | 'completed';
  lastUpdated: string;
  performanceBand: string;
  studentCount: number;
  teacherCount: number;
  facilities: string[];
  type: string;
  qualityScore: number;
  history:[
    {
      currentStructure: string;
      recommendedStructure: string;
      transitionStatus: string;
      lastUpdated: string;
      performanceBand: string;
      studentCount: number;
      teacherCount: number;
      facilities: string[];
      type: string;
      qualityScore: number;
    }
  ]
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SchoolFilters {
  category: string;
  state: string;
  gradeLevels: string[];
  type: string;
  performanceBand: string;
  facilities: string[];
}

export interface SchoolStats {
  totalSchools: number;
  oddStructures: number;
  standardizedSchools: number;
  inTransition: number;
  percentageOdd: number;
}