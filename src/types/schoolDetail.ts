export interface SchoolDetail {
    _id: string;
    schoolID: string;
    schoolName: string;
    state: string;
    district: string;
    block: string;
    ruralUrban: string;
    cluster: string;
    villageCity: string;
    pincode: string;
    schoolCategory: string;
    schoolManagement: string;
    mediumOfInstruction: string;
    schoolType: string;
    totalTeachers: number;
    totalClassrooms: number;
    totalStudents: number;
    lowestClass: number;
    highestClass: number;
    classroomCondition: Array<{
      goodCondition: number;
      minorRepair: number;
      majorRepair: number;
    }>;
    availableFacilities: Array<{
      library: boolean;
      computerLab: boolean;
      drinkingWater: boolean;
      electricity: boolean;
      internet: boolean;
      scienceLab: boolean;
      smartClassroom: boolean;
      playground: boolean;
      auditorium: boolean;
      digitalLibrary: boolean;
    }>;
    resourceDistribution: Array<{
      teachingStaff: {
        current: number;
        required: number;
      };
      classrooms: {
        current: number;
        required: number;
      };
      labs: {
        current: number;
        required: number;
      };
    }>;
    digitalEquipment: Array<{
      desktops: number;
      laptops: number;
      projectors: number;
      smartBoards: number;
      printers: number;
    }>;
    studentDemographics: Array<{
      general: number;
      SC: number;
      ST: number;
      OBC: number;
    }>;
    teacherQualifications: Array<{
      PhD: number;
      postGraduate: number;
      graduate: number;
      other: number;
    }>;
    performanceOverview: Array<{
      academicAchievement: number;
      teacherStudentRatio: number;
      infrastructure: number;
      resourceAvailability: number;
    }>;
    performanceTrends: Array<{
      _id: string;
      month: string;
      performance: number;
      attendance: number;
    }>;
    grantUtilization: Array<{
      _id: string;
      month: string;
      grantsReceived: number;
      grantsUtilized: number;
    }>;
    complianceVisits: Array<{
      _id: string;
      type: string;
      lastVisit: string;
      status: string;
    }>;
    upcomingComplianceRequirements: Array<{
      _id: string;
      type: string;
      deadline: string;
    }>;
    [key: string]: any;
  }