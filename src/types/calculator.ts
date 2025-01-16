export interface ResourceCalculation {
    basicInfo: {
      totalStudents: number;
      schoolType: 'urban' | 'rural' | 'semi-urban';
      budget: number;
      landArea: number;
    };
    gradeStructure: {
      primary: { enabled: boolean; students: number };
      upperPrimary: { enabled: boolean; students: number };
      secondary: { enabled: boolean; students: number };
      higherSecondary: { enabled: boolean; students: number };
    };
    ratios: {
      teacherStudent: number;
      classroomStudent: number;
      washroomStudent: number;
      computerStudent: number;
    };
    facilities: {
      library: boolean;
      computerLab: boolean;
      scienceLab: boolean;
      playground: boolean;
      artRoom: boolean;
      musicRoom: boolean;
      infirmary: boolean;
      cafeteria: boolean;
    };
  }