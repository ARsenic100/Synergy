// import { z } from 'zod';

// export const analysisFormSchema = z.object({
//   // Basic Information
//   udiseCode: z.string().min(1, 'UDISE code is required'),
//   schoolName: z.string().min(1, 'School name is required'),
//   state: z.string().min(1, 'State is required'),
//   district: z.string().min(1, 'District is required'),
//   block: z.string().min(1, 'Block is required'),
//   ruralUrban: z.enum(['1-Rural', '2-Urban','3-Remote']),
//   cluster: z.string().min(1, 'Cluster is required'),
//   village: z.string().min(1, 'Village is required'),
//   pincode: z.string().length(6, 'PIN code must be 6 digits'),

//   // School Details
//   schoolCategory: z.string().min(1, 'School category is required'),
//   schoolManagement: z.string().min(1, 'School management is required'),
//   schoolType: z.string().min(1, 'School type is required'),
//   yearEstablished: z.number().min(1800).max(new Date().getFullYear()),
//   isShiftSchool: z.boolean(),
//   hasAnganwadi: z.boolean(),
//   isSpecialSchool: z.boolean(),
//   isMinoritySchool: z.boolean(),

//   // Infrastructure Details
//   buildingStatus: z.string().min(1, 'Building status is required'),
//   hasBoundaryWall: z.boolean(),
//   hasRamps: z.boolean(),
//   hasPlayground: z.boolean(),
//   hasDrinkingWater: z.boolean(),

//   // Teachers
//   totalTeachers: z.number().min(0),
//   maleTeachers: z.number().min(0),
//   femaleTeachers: z.number().min(0),
//   academicQualification: z.enum(['Below Graduate', 'Graduate', 'Post Graduate']),
//   professionalQualification: z.enum(['Diploma', 'B.Ed.', 'M.Ed.']),

//   // Students Enrollment
//   generalCategoryTotal: z.number().min(0),
//   scCategoryTotal: z.number().min(0),
//   stCategoryTotal: z.number().min(0),
//   obcCategoryTotal: z.number().min(0),
// });

// export type AnalysisFormData = z.infer<typeof analysisFormSchema>;

import { z } from 'zod';

export const analysisFormSchema = z.object({
  // Basic Information
  schoolID: z.string().min(1, 'School ID is required'),
  schoolName: z.string().min(1, 'School name is required'),
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  block: z.string().min(1, 'Block is required'),
  ruralUrban: z.enum(['1-Rural', '2-Urban', '3-Remote'], 'Rural/Urban selection is required'),
  cluster: z.string().optional(),
  villageCity: z.string().optional(),
  pincode: z.string().length(6, 'PIN code must be 6 digits'),
  grant: z.boolean().optional(),
  schoolCategory: z.string().optional(),
  schoolManagement: z.string().optional(),
  mediumOfInstruction: z.string().optional(),
  schoolType: z.string().optional(),

  // Teachers, Classrooms, and Students
  totalTeachers: z.number().min(0).optional(),
  totalClassrooms: z.number().min(0).optional(),
  totalStudents: z.number().min(0).optional(),

  // Facilities & Infrastructure
  separateRoomForHM: z.boolean().optional(),
  lowestClass: z.number().min(1).optional(),
  highestClass: z.number().min(1).optional(),
  boysWashrooms: z.boolean().optional(),
  girlsWashrooms: z.boolean().optional(),
  boundaryWall: z.boolean().optional(),
  libraryAvailable: z.boolean().optional(),
  drinkingWaterAvailable: z.boolean().optional(),
  playgroundAvailable: z.boolean().optional(),
  electricityAvailability: z.boolean().optional(),
  kitchensForMidDayMeal: z.boolean().optional(),
  ecoFriendlyConstruction: z.boolean().optional(),
  safetyStandardsCompliance: z.boolean().optional(),
  universalAccess: z.boolean().optional(),
  inclusiveEnvironment: z.boolean().optional(),
  transportationForRemoteAreas: z.boolean().optional(),
  communityParticipation: z.boolean().optional(),
  qualifiedTeachersRTEAct: z.boolean().optional(),
  ICTIntegration: z.boolean().optional(),
  vocationalTrainingAvailability: z.boolean().optional(),
  activeSchoolManagementCommittee: z.boolean().optional(),
  annualMaintenance: z.boolean().optional(),
  schoolMapping: z.boolean().optional(),
  studentTracking: z.boolean().optional(),
  freeAndCompulsoryEducation: z.boolean().optional(),
  nonDiscrimination: z.boolean().optional(),
  noPunitivePractices: z.boolean().optional(),
  timelyFundUtilization: z.boolean().optional(),
  fundsAuditedAnnually: z.boolean().optional(),
  resourceUtilizationEfficiency: z.boolean().optional(),
  provisionOfStipendsForCWSNGirls: z.boolean().optional(),
  KGBVUpgraded: z.boolean().optional(),
  integrationWithAnganwadiCenters: z.boolean().optional(),
  curriculumStandardsAdherence: z.boolean().optional(),
  adequateFacilities: z.boolean().optional(),
  safetyStandards: z.boolean().optional(),
  supportForCWSN: z.boolean().optional(),
  communityEngagement: z.boolean().optional(),
  coLocationWithAnganwadiCenters: z.boolean().optional(),
  childProtectionPolicies: z.boolean().optional(),
  curriculumImplementation: z.boolean().optional(),
  qualifiedAndTrainedTeachers: z.boolean().optional(),
  supportiveLearningEnvironment: z.boolean().optional(),
  governanceAndManagement: z.boolean().optional(),
  monitoringAndEvaluationPractices: z.boolean().optional(),
  managementStructure: z.boolean().optional(),
  infrastructureQuality: z.boolean().optional(),
  supportSystems: z.boolean().optional(),
  financialManagement: z.boolean().optional(),
  positiveEducationalOutcomes: z.boolean().optional(),
  researchAndDevelopmentEngagement: z.boolean().optional(),
  studentLearningOutcomes: z.boolean().optional(),
  dataManagementAndReporting: z.boolean().optional(),

  

  // Classroom Conditions
  classroomCondition: z
    .object({
      goodCondition: z.number().min(0),
      minorRepair: z.number().min(0),
      majorRepair: z.number().min(0),
    })
    .optional(),

  // Available Facilities
  availableFacilities: z
    .object({
      library: z.boolean().optional(),
      computerLab: z.boolean().optional(),
      drinkingWater: z.boolean().optional(),
      electricity: z.boolean().optional(),
      internet: z.boolean().optional(),
      scienceLab: z.boolean().optional(),
      smartClassroom: z.boolean().optional(),
      playground: z.boolean().optional(),
      auditorium: z.boolean().optional(),
      digitalLibrary: z.boolean().optional(),
    })
    .optional(),

  // Resource Distribution
  resourceDistribution: z
    .object({
      teachingStaff: z.object({
        current: z.number().min(0),
        required: z.number().min(0),
      }),
      classrooms: z.object({
        current: z.number().min(0),
        required: z.number().min(0),
      }),
      labs: z.object({
        current: z.number().min(0),
        required: z.number().min(0),
      }),
    })
    .optional(),

  // Digital Equipment
  digitalEquipment: z
    .object({
      desktops: z.number().min(0),
      laptops: z.number().min(0),
      projectors: z.number().min(0),
      smartBoards: z.number().min(0),
      printers: z.number().min(0),
    })
    .optional(),

  // Student Demographics
  studentDemographics: z
    .object({
      general: z.number().min(0),
      SC: z.number().min(0),
      ST: z.number().min(0),
      OBC: z.number().min(0),
    })
    .optional(),

  // Teacher Qualifications
  teacherQualifications: z
    .object({
      PhD: z.number().min(0),
      postGraduate: z.number().min(0),
      graduate: z.number().min(0),
      other: z.number().min(0),
    })
    .optional(),

  // Performance Overview
  performanceOverview: z
    .object({
      academicAchievement: z.number().min(0).max(100),
      teacherStudentRatio: z.number().min(0),
      infrastructure: z.number().min(0).max(100),
      resourceAvailability: z.number().min(0).max(100),
    })
    .optional(),

  // Performance Trends
  performanceTrends: z
    .array(
      z.object({
        month: z.string(),
        performance: z.number().min(0).max(100),
        attendance: z.number().min(0).max(100),
      })
    )
    .optional(),

  // Grant Utilization
  grantUtilization: z
    .array(
      z.object({
        month: z.string(),
        grantsReceived: z.number().min(0),
        grantsUtilized: z.number().min(0),
      })
    )
    .optional(),

  // Compliance Visits
  complianceVisits: z
    .array(
      z.object({
        type: z.string(),
        lastVisit: z.date(),
        status: z.string(),
      })
    )
    .optional(),

  // Upcoming Compliance Requirements
  upcomingComplianceRequirements: z
    .array(
      z.object({
        type: z.string(),
        deadline: z.date(),
      })
    )
    .optional(),
});

export type AnalysisFormData = z.infer<typeof analysisFormSchema>;