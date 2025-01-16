


import express from 'express';
import { auth } from '../middleware/auth.js';
import { body } from 'express-validator';
import {
  createSchoolDetail,
  getAllSchools,
  getSchoolDetail,
  searchSchoolBySchoolID
} from '../controllers/schoolDetailController.js';

const router = express.Router();


router.get('/all', getAllSchools);
router.get('/:id',getSchoolDetail)
router.get('/search/:schoolID', searchSchoolBySchoolID);
// Create school detail
router.post(
  '/insertschool',
  [
    // Basic Information
    body('schoolID').trim().notEmpty().withMessage('School ID is required'),
    body('schoolName').trim().notEmpty().withMessage('School Name is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('district').trim().notEmpty().withMessage('District is required'),
    body('block').trim().notEmpty().withMessage('Block is required'),
    body('ruralUrban').isIn(['rural', 'urban']).withMessage('Invalid ruralUrban value'),
    body('cluster').optional().trim(),
    body('villageCity').optional().trim(),
    body('pincode').optional().isPostalCode('any').withMessage('Invalid pincode'),
    body('schoolCategory').optional().trim(),
    body('schoolManagement').optional().trim(),
    body('mediumOfInstruction').optional().trim(),
    body('schoolType').optional().trim(),
    
    // Counts
    body('totalTeachers').isInt({ min: 0 }).withMessage('Invalid totalTeachers count'),
    body('totalClassrooms').optional().isInt({ min: 0 }).withMessage('Invalid totalClassrooms count'),
    body('totalStudents').isInt({ min: 0 }).withMessage('Invalid totalStudents count'),
    
    // Facilities
    body('separateRoomForHM').isBoolean().withMessage('separateRoomForHM must be a boolean'),
    body('boysWashrooms').isBoolean().withMessage('boysWashrooms must be a boolean'),
    body('girlsWashrooms').isBoolean().withMessage('girlsWashrooms must be a boolean'),
    body('boundaryWall').isBoolean().withMessage('boundaryWall must be a boolean'),
    body('libraryAvailable').isBoolean().withMessage('libraryAvailable must be a boolean'),
    body('drinkingWaterAvailable').isBoolean().withMessage('drinkingWaterAvailable must be a boolean'),
    body('playgroundAvailable').isBoolean().withMessage('playgroundAvailable must be a boolean'),
    body('electricityAvailability').isBoolean().withMessage('electricityAvailability must be a boolean'),
    body('kitchensForMidDayMeal').isBoolean().withMessage('kitchensForMidDayMeal must be a boolean'),
    body('ecoFriendlyConstruction').isBoolean().withMessage('ecoFriendlyConstruction must be a boolean'),
    body('safetyStandardsCompliance').isBoolean().withMessage('safetyStandardsCompliance must be a boolean'),
    body('universalAccess').isBoolean().withMessage('universalAccess must be a boolean'),
    body('inclusiveEnvironment').isBoolean().withMessage('inclusiveEnvironment must be a boolean'),
    body('transportationForRemoteAreas').isBoolean().withMessage('transportationForRemoteAreas must be a boolean'),
    body('communityParticipation').isBoolean().withMessage('communityParticipation must be a boolean'),
    body('qualifiedTeachersRTEAct').isBoolean().withMessage('qualifiedTeachersRTEAct must be a boolean'),
    body('ICTIntegration').isBoolean().withMessage('ICTIntegration must be a boolean'),
    body('vocationalTrainingAvailability').isBoolean().withMessage('vocationalTrainingAvailability must be a boolean'),
    body('activeSchoolManagementCommittee').isBoolean().withMessage('activeSchoolManagementCommittee must be a boolean'),
    body('annualMaintenance').isBoolean().withMessage('annualMaintenance must be a boolean'),
    body('schoolMapping').isBoolean().withMessage('schoolMapping must be a boolean'),
    body('studentTracking').isBoolean().withMessage('studentTracking must be a boolean'),
    body('freeAndCompulsoryEducation').isBoolean().withMessage('freeAndCompulsoryEducation must be a boolean'),
    body('nonDiscrimination').isBoolean().withMessage('nonDiscrimination must be a boolean'),
    body('noPunitivePractices').isBoolean().withMessage('noPunitivePractices must be a boolean'),
    body('timelyFundUtilization').isBoolean().withMessage('timelyFundUtilization must be a boolean'),
    body('fundsAuditedAnnually').isBoolean().withMessage('fundsAuditedAnnually must be a boolean'),
    body('resourceUtilizationEfficiency').isBoolean().withMessage('resourceUtilizationEfficiency must be a boolean'),
    body('provisionOfStipendsForCWSNGirls').isBoolean().withMessage('provisionOfStipendsForCWSNGirls must be a boolean'),
    body('KGBVUpgraded').isBoolean().withMessage('KGBVUpgraded must be a boolean'),
    body('integrationWithAnganwadiCenters').isBoolean().withMessage('integrationWithAnganwadiCenters must be a boolean'),
    body('curriculumStandardsAdherence').isBoolean().withMessage('curriculumStandardsAdherence must be a boolean'),
    body('adequateFacilities').isBoolean().withMessage('adequateFacilities must be a boolean'),
    body('safetyStandards').isBoolean().withMessage('safetyStandards must be a boolean'),
    body('supportForCWSN').isBoolean().withMessage('supportForCWSN must be a boolean'),
    body('communityEngagement').isBoolean().withMessage('communityEngagement must be a boolean'),
    body('coLocationWithAnganwadiCenters').isBoolean().withMessage('coLocationWithAnganwadiCenters must be a boolean'),
    body('childProtectionPolicies').isBoolean().withMessage('childProtectionPolicies must be a boolean'),
    body('curriculumImplementation').isBoolean().withMessage('curriculumImplementation must be a boolean'),
    body('qualifiedAndTrainedTeachers').isBoolean().withMessage('qualifiedAndTrainedTeachers must be a boolean'),
    body('supportiveLearningEnvironment').isBoolean().withMessage('supportiveLearningEnvironment must be a boolean'),
    body('governanceAndManagement').isBoolean().withMessage('governanceAndManagement must be a boolean'),
    body('monitoringAndEvaluationPractices').isBoolean().withMessage('monitoringAndEvaluationPractices must be a boolean'),
    body('managementStructure').isBoolean().withMessage('managementStructure must be a boolean'),
    body('infrastructureQuality').isBoolean().withMessage('infrastructureQuality must be a boolean'),
    body('supportSystems').isBoolean().withMessage('supportSystems must be a boolean'),
    body('financialManagement').isBoolean().withMessage('financialManagement must be a boolean'),
    body('positiveEducationalOutcomes').isBoolean().withMessage('positiveEducationalOutcomes must be a boolean'),
    body('researchAndDevelopmentEngagement').isBoolean().withMessage('researchAndDevelopmentEngagement must be a boolean'),
    body('studentLearningOutcomes').isBoolean().withMessage('studentLearningOutcomes must be a boolean'),
    body('dataManagementAndReporting').isBoolean().withMessage('dataManagementAndReporting must be a boolean'),
    body('latitude').optional().isFloat().withMessage('Invalid latitude value'),
    body('longitude').optional().isFloat().withMessage('Invalid longitude value'),  
    // Classroom Condition
    body('classroomCondition.goodCondition').isInt({ min: 0 }).withMessage('Invalid goodCondition value'),
    body('classroomCondition.minorRepair').isInt({ min: 0 }).withMessage('Invalid minorRepair value'),
    body('classroomCondition.majorRepair').isInt({ min: 0 }).withMessage('Invalid majorRepair value'),
    
    // Available Facilities
    body('availableFacilities.library').isBoolean().withMessage('Library must be a boolean'),
    body('availableFacilities.computerLab').isBoolean().withMessage('ComputerLab must be a boolean'),
    body('availableFacilities.drinkingWater').isBoolean().withMessage('drinkingWater must be a boolean'),
    body('availableFacilities.electricity').isBoolean().withMessage('electricity must be a boolean'),
    body('availableFacilities.internet').isBoolean().withMessage('internet must be a boolean'),
    body('availableFacilities.scienceLab').isBoolean().withMessage('scienceLab must be a boolean'),
    body('availableFacilities.smartClassroom').isBoolean().withMessage('smartClassroom must be a boolean'),
    body('availableFacilities.playground').isBoolean().withMessage('playground must be a boolean'),
    body('availableFacilities.auditorium').isBoolean().withMessage('auditorium must be a boolean'),
    body('availableFacilities.digitalLibrary').isBoolean().withMessage('digitalLibrary must be a boolean'),
    
    // Resource Distribution
    body('resourceDistribution.teachingStaff.current').isInt({ min: 0 }).withMessage('Invalid teachingStaff.current value'),
    body('resourceDistribution.teachingStaff.required').isInt({ min: 0 }).withMessage('Invalid teachingStaff.required value'),
    body('resourceDistribution.classrooms.current').isInt({ min: 0 }).withMessage('Invalid classrooms.current value'),
    body('resourceDistribution.classrooms.required').isInt({ min: 0 }).withMessage('Invalid classrooms.required value'),
    body('resourceDistribution.labs.current').isInt({ min: 0 }).withMessage('Invalid labs.current value'),
    body('resourceDistribution.labs.required').isInt({ min: 0 }).withMessage('Invalid labs.required value'),
    
    // Digital Equipment
    body('digitalEquipment.desktops').optional().isInt({ min: 0 }).withMessage('Invalid desktops count'),
    body('digitalEquipment.laptops').optional().isInt({ min: 0 }).withMessage('Invalid laptops count'),
    body('digitalEquipment.projectors').optional().isInt({ min: 0 }).withMessage('Invalid projectors count'),
    body('digitalEquipment.smartBoards').optional().isInt({ min: 0 }).withMessage('Invalid smartBoards count'),
    body('digitalEquipment.printers').optional().isInt({ min: 0 }).withMessage('Invalid printers count'),
    
    // Student Demographics
    body('studentDemographics.general').optional().isInt({ min: 0 }).withMessage('Invalid general demographics'),
    body('studentDemographics.SC').optional().isInt({ min: 0 }).withMessage('Invalid SC demographics'),
    body('studentDemographics.ST').optional().isInt({ min: 0 }).withMessage('Invalid ST demographics'),
    body('studentDemographics.OBC').optional().isInt({ min: 0 }).withMessage('Invalid OBC demographics'),
    
    // Teacher Qualifications
    body('teacherQualifications.PhD').optional().isInt({ min: 0 }).withMessage('Invalid PhD count'),
    body('teacherQualifications.postGraduate').optional().isInt({ min: 0 }).withMessage('Invalid postGraduate count'),
    body('teacherQualifications.graduate').optional().isInt({ min: 0 }).withMessage('Invalid graduate count'),
    body('teacherQualifications.other').optional().isInt({ min: 0 }).withMessage('Invalid other qualifications count'),
    
    // Performance Overview
    body('performanceOverview.academicAchievement').optional().isInt({ min: 0 }).withMessage('Invalid academicAchievement value'),
    body('performanceOverview.teacherStudentRatio').optional().isInt({ min: 0 }).withMessage('Invalid teacherStudentRatio value'),
    body('performanceOverview.infrastructure').optional().isInt({ min: 0 }).withMessage('Invalid infrastructure value'),
    body('performanceOverview.resourceAvailability').optional().isInt({ min: 0 }).withMessage('Invalid resourceAvailability value'),
    
    // Performance Trends
    body('performanceTrends').isArray().withMessage('performanceTrends must be an array'),
    body('performanceTrends.*.month').optional().isString().withMessage('Invalid month'),
    body('performanceTrends.*.performance').optional().isInt({ min: 0 }).withMessage('Invalid performance value'),
    body('performanceTrends.*.attendance').optional().isInt({ min: 0 }).withMessage('Invalid attendance value'),
    
    // Grant Utilization
    body('grantUtilization').isArray().withMessage('grantUtilization must be an array'),
    body('grantUtilization.*.month').optional().isString().withMessage('Invalid month'),
    body('grantUtilization.*.grantsReceived').optional().isInt({ min: 0 }).withMessage('Invalid grantsReceived value'),
    body('grantUtilization.*.grantsUtilized').optional().isInt({ min: 0 }).withMessage('Invalid grantsUtilized value'),
    
    // Compliance Visits
    body('complianceVisits').isArray().withMessage('complianceVisits must be an array'),
    body('complianceVisits.*.type').optional().isString().withMessage('Invalid type'),
    body('complianceVisits.*.lastVisit').optional().isISO8601().toDate().withMessage('Invalid lastVisit date'),
    body('complianceVisits.*.status').optional().isString().withMessage('Invalid status'),
    
    // Upcoming Compliance Requirements
    body('upcomingComplianceRequirements').isArray().withMessage('upcomingComplianceRequirements must be an array'),
    body('upcomingComplianceRequirements.*.type').optional().isString().withMessage('Invalid type'),
    body('upcomingComplianceRequirements.*.deadline').optional().isISO8601().toDate().withMessage('Invalid deadline date'),
  ],
  createSchoolDetail
);

export default router;
// Search school by school ID