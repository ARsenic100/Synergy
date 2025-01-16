import mongoose from "mongoose";

const SchoolDetailSchema = new mongoose.Schema({
  schoolID: { type: String, required: true, unique: true },
  schoolName: { type: String, required: true },
  qualityScore: { type: Number },
  state: { type: String, required: true },
  district: { type: String, required: true },
  block: { type: String, required: true },
  ruralUrban: { type: String, required: true },
  cluster: { type: String },
  villageCity: { type: String },
  pincode: { type: String },
  schoolCategory: { type: String },
  schoolManagement: { type: String },
  mediumOfInstruction: { type: String },
  schoolType: { type: String },
  totalTeachers: { type: Number },
  totalClassrooms: { type: Number },
  totalStudents: { type: Number },
  separateRoomForHM: { type: Boolean },
  lowestClass: { type: Number },
  highestClass: { type: Number },
  boysWashrooms: { type: Boolean },
  girlsWashrooms: { type: Boolean },
  boundaryWall: { type: Boolean },
  libraryAvailable: { type: Boolean },
  drinkingWaterAvailable: { type: Boolean },
  playgroundAvailable: { type: Boolean },
  electricityAvailability: { type: Boolean },
  kitchensForMidDayMeal: { type: Boolean },
  ecoFriendlyConstruction: { type: Boolean },
  safetyStandardsCompliance: { type: Boolean },
  universalAccess: { type: Boolean },
  inclusiveEnvironment: { type: Boolean },
  transportationForRemoteAreas: { type: Boolean },
  communityParticipation: { type: Boolean },
  qualifiedTeachersRTEAct: { type: Boolean },
  ICTIntegration: { type: Boolean },
  vocationalTrainingAvailability: { type: Boolean },
  activeSchoolManagementCommittee: { type: Boolean },
  annualMaintenance: { type: Boolean },
  schoolMapping: { type: Boolean },
  studentTracking: { type: Boolean },
  freeAndCompulsoryEducation: { type: Boolean },
  nonDiscrimination: { type: Boolean },
  noPunitivePractices: { type: Boolean },
  timelyFundUtilization: { type: Boolean },
  fundsAuditedAnnually: { type: Boolean },
  resourceUtilizationEfficiency: { type: Boolean },
  provisionOfStipendsForCWSNGirls: { type: Boolean },
  KGBVUpgraded: { type: Boolean },
  integrationWithAnganwadiCenters: { type: Boolean },
  curriculumStandardsAdherence: { type: Boolean },
  adequateFacilities: { type: Boolean },
  safetyStandards: { type: Boolean },
  supportForCWSN: { type: Boolean },
  communityEngagement: { type: Boolean },
  coLocationWithAnganwadiCenters: { type: Boolean },
  childProtectionPolicies: { type: Boolean },
  curriculumImplementation: { type: Boolean },
  qualifiedAndTrainedTeachers: { type: Boolean },
  supportiveLearningEnvironment: { type: Boolean },
  governanceAndManagement: { type: Boolean },
  monitoringAndEvaluationPractices: { type: Boolean },
  managementStructure: { type: Boolean },
  infrastructureQuality: { type: Boolean },
  supportSystems: { type: Boolean },
  financialManagement: { type: Boolean },
  positiveEducationalOutcomes: { type: Boolean },
  researchAndDevelopmentEngagement: { type: Boolean },
  studentLearningOutcomes: { type: Boolean },
  dataManagementAndReporting: { type: Boolean },
  grant: {type: Boolean},
  latitude: { type: Number },
  longitude: { type: Number },
  classroomCondition: [{
    goodCondition: { type: Number },
    minorRepair: { type: Number },
    majorRepair: { type: Number }
  }],
  availableFacilities: [{
    library: { type: Boolean },
    computerLab: { type: Boolean },
    drinkingWater: { type: Boolean },
    electricity: { type: Boolean },
    internet: { type: Boolean },
    scienceLab: { type: Boolean },
    smartClassroom: { type: Boolean },
    playground: { type: Boolean },
    auditorium: { type: Boolean },
    digitalLibrary: { type: Boolean }
  }],
  resourceDistribution: [{
    teachingStaff: { current: Number, required: Number },
    classrooms: { current: Number, required: Number },
    labs: { current: Number, required: Number }
  }],
  digitalEquipment: [{
    desktops: { type: Number },
    laptops: { type: Number },
    projectors: { type: Number },
    smartBoards: { type: Number },
    printers: { type: Number }
  }],
  studentDemographics: [{
    general: { type: Number },
    SC: { type: Number },
    ST: { type: Number },
    OBC: { type: Number }
  }],
  teacherQualifications: [{
    PhD: { type: Number },
    postGraduate: { type: Number },
    graduate: { type: Number },
    other: { type: Number }
  }],
  performanceOverview: {
    academicAchievement: { type: Number },
    teacherStudentRatio: { type: Number },
    infrastructure: { type: Number },
    resourceAvailability: { type: Number }
  },
  performanceTrends: [{
    month: { type: String },
    performance: { type: Number },
    attendance: { type: Number }
  }],
  grantUtilization: [{
    month: { type: String },
    grantsReceived: { type: Number },
    grantsUtilized: { type: Number }
  }],
  complianceVisits: [{
    type: { type: String },
    lastVisit: { type: Date },
    status: { type: String }
  }],
  upcomingComplianceRequirements: [{
    type: { type: String },
    deadline: { type: Date }
  }]
}, {
  timestamps: true
});

export default mongoose.model("SchoolDetail", SchoolDetailSchema);
