export interface AnalysisFormData {
  // Basic Information
  schoolID: string;
  schoolName: string;
  state: string;
  district: string;
  block: string;
  ruralUrban: string;
  cluster?: string;
  villageCity?: string;
  pincode: string;
  schoolCategory?: string;
  schoolManagement?: string;
  mediumOfInstruction?: string;
  schoolType?: string;

  // Teachers, Classrooms, and Students
  totalTeachers?: number;
  totalClassrooms?: number;
  totalStudents?: number;

  // Facilities & Infrastructure
  separateRoomForHM?: boolean;
  lowestClass?: number;
  highestClass?: number;
  boysWashrooms?: boolean;
  girlsWashrooms?: boolean;
  boundaryWall?: boolean;
  libraryAvailable?: boolean;
  drinkingWaterAvailable?: boolean;
  playgroundAvailable?: boolean;
  electricityAvailability?: boolean;
  kitchensForMidDayMeal?: boolean;
  ecoFriendlyConstruction?: boolean;
  safetyStandardsCompliance?: boolean;
  universalAccess?: boolean;
  grant?: boolean;
  inclusiveEnvironment?: boolean;
  transportationForRemoteAreas?: boolean;
  communityParticipation?: boolean;
  qualifiedTeachersRTEAct?: boolean;
  ICTIntegration?: boolean;
  vocationalTrainingAvailability?: boolean;
  activeSchoolManagementCommittee?: boolean;
  annualMaintenance?: boolean;
  schoolMapping?: boolean;
  studentTracking?: boolean;
  freeAndCompulsoryEducation?: boolean;
  nonDiscrimination?: boolean;
  noPunitivePractices?: boolean;
  timelyFundUtilization?: boolean;
  fundsAuditedAnnually?: boolean;
  resourceUtilizationEfficiency?: boolean;
  provisionOfStipendsForCWSNGirls?: boolean;
  KGBVUpgraded?: boolean;
  integrationWithAnganwadiCenters?: boolean;
  curriculumStandardsAdherence?: boolean;
  adequateFacilities?: boolean;
  safetyStandards?: boolean;
  supportForCWSN?: boolean;
  communityEngagement?: boolean;
  coLocationWithAnganwadiCenters?: boolean;
  childProtectionPolicies?: boolean;
  curriculumImplementation?: boolean;
  qualifiedAndTrainedTeachers?: boolean;
  supportiveLearningEnvironment?: boolean;
  governanceAndManagement?: boolean;
  monitoringAndEvaluationPractices?: boolean;
  managementStructure?: boolean;
  infrastructureQuality?: boolean;
  supportSystems?: boolean;
  financialManagement?: boolean;
  positiveEducationalOutcomes?: boolean;
  researchAndDevelopmentEngagement?: boolean;
  studentLearningOutcomes?: boolean;
  dataManagementAndReporting?: boolean;

  // Classroom Conditions
  classroomCondition?: {
    goodCondition: number;
    minorRepair: number;
    majorRepair: number;
  };

  // Available Facilities
  availableFacilities?: {
    library?: boolean;
    computerLab?: boolean;
    drinkingWater?: boolean;
    electricity?: boolean;
    internet?: boolean;
    scienceLab?: boolean;
    smartClassroom?: boolean;
    playground?: boolean;
    auditorium?: boolean;
    digitalLibrary?: boolean;
  };

  // Resource Distribution
  resourceDistribution?: {
    teachingStaff: { current: number; required: number };
    classrooms: { current: number; required: number };
    labs: { current: number; required: number };
  };

  // Digital Equipment
  digitalEquipment?: {
    desktops: number;
    laptops: number;
    projectors: number;
    smartBoards: number;
    printers: number;
  };

  // Student Demographics
  studentDemographics?: {
    general: number;
    SC: number;
    ST: number;
    OBC: number;
  };

  // Teacher Qualifications
  teacherQualifications?: {
    PhD: number;
    postGraduate: number;
    graduate: number;
    other: number;
  };

  // Performance Overview
  performanceOverview?: {
    academicAchievement: number;
    teacherStudentRatio: number;
    infrastructure: number;
    resourceAvailability: number;
  };

  // Performance Trends
  performanceTrends?: {
    month: string;
    performance: number;
    attendance: number;
  }[];

  // Grant Utilization
  grantUtilization?: {
    month: string;
    grantsReceived: number;
    grantsUtilized: number;
  }[];

  // Compliance Visits
  complianceVisits?: {
    type: string;
    lastVisit: Date;
    status: string;
  }[];

  // Upcoming Compliance Requirements
  upcomingComplianceRequirements?: {
    type: string;
    deadline: Date;
  }[];
}