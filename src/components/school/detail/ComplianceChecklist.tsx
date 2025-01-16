import React from 'react';
import { School } from '../../../types/school';
import { Check, X } from 'lucide-react';
import { SchoolDetail } from '../../../types/schoolDetail';

interface ComplianceChecklistProps {
  school: SchoolDetail;
}

export function ComplianceChecklist({ school }: ComplianceChecklistProps) {
  const checklistCategories = [
    {
      title: 'Infrastructure & Facilities',
      items: [
        { label: 'Separate Room for HM', value: school.separateRoomForHM },
        { label: 'Boys Washrooms', value: school.boysWashrooms },
        { label: 'Girls Washrooms', value: school.girlsWashrooms },
        { label: 'Boundary Wall', value: school.boundaryWall },
        { label: 'Library Available', value: school.libraryAvailable },
        { label: 'Drinking Water Available', value: school.drinkingWaterAvailable },
        { label: 'Playground Available', value: school.playgroundAvailable },
        { label: 'Electricity Availability', value: school.electricityAvailability },
        { label: 'Kitchens for Mid-Day Meal', value: school.kitchensForMidDayMeal },
        { label: 'Adequate Facilities', value: school.adequateFacilities },
        { label: 'Infrastructure Quality', value: school.infrastructureQuality },
      ],
    },
    {
      title: 'Safety & Accessibility',
      items: [
        { label: 'Eco-Friendly Construction', value: school.ecoFriendlyConstruction },
        { label: 'Safety Standards Compliance', value: school.safetyStandardsCompliance },
        { label: 'Universal Access', value: school.universalAccess },
        { label: 'Inclusive Environment', value: school.inclusiveEnvironment },
        { label: 'Transportation for Remote Areas', value: school.transportationForRemoteAreas },
        { label: 'Safety Standards', value: school.safetyStandards },
        { label: 'Support for CWSN', value: school.supportForCWSN },
        { label: 'Child Protection Policies', value: school.childProtectionPolicies },
      ],
    },
    {
      title: 'Academic & Teaching',
      items: [
        { label: 'Qualified Teachers (RTE Act)', value: school.qualifiedTeachersRTEAct },
        { label: 'ICT Integration', value: school.ICTIntegration },
        { label: 'Vocational Training Availability', value: school.vocationalTrainingAvailability },
        { label: 'Curriculum Standards Adherence', value: school.curriculumStandardsAdherence },
        { label: 'Curriculum Implementation', value: school.curriculumImplementation },
        { label: 'Qualified and Trained Teachers', value: school.qualifiedAndTrainedTeachers },
        { label: 'Supportive Learning Environment', value: school.supportiveLearningEnvironment },
        { label: 'No Punitive Practices', value: school.noPunitivePractices },
        { label: 'Student Learning Outcomes', value: school.studentLearningOutcomes },
        { label: 'Positive Educational Outcomes', value: school.positiveEducationalOutcomes },
      ],
    },
    {
      title: 'Community & Integration',
      items: [
        { label: 'Community Participation', value: school.communityParticipation },
        { label: 'Active School Management Committee', value: school.activeSchoolManagementCommittee },
        { label: 'Community Engagement', value: school.communityEngagement },
        { label: 'Integration with Anganwadi Centers', value: school.integrationWithAnganwadiCenters },
        { label: 'Co-location with Anganwadi Centers', value: school.coLocationWithAnganwadiCenters },
        { label: 'KGBV Upgraded', value: school.KGBVUpgraded },
        { label: 'Provision of Stipends for CWSN Girls', value: school.provisionOfStipendsForCWSNGirls },
      ],
    },
    {
      title: 'Management & Governance',
      items: [
        { label: 'Annual Maintenance', value: school.annualMaintenance },
        { label: 'School Mapping', value: school.schoolMapping },
        { label: 'Student Tracking (SDMIS)', value: school.studentTracking },
        { label: 'Governance and Management', value: school.governanceAndManagement },
        { label: 'Monitoring and Evaluation Practices', value: school.monitoringAndEvaluationPractices },
        { label: 'Management Structure', value: school.managementStructure },
        { label: 'Support Systems', value: school.supportSystems },
        { label: 'Research and Development Engagement', value: school.researchAndDevelopmentEngagement },
        { label: 'Data Management and Reporting', value: school.dataManagementAndReporting },
      ],
    },
    {
      title: 'Financial Compliance',
      items: [
        { label: 'Free and Compulsory Education', value: school.freeAndCompulsoryEducation },
        { label: 'Non-Discrimination', value: school.nonDiscrimination },
        { label: 'Timely Fund Utilization', value: school.timelyFundUtilization },
        { label: 'Funds Audited Annually', value: school.fundsAuditedAnnually },
        { label: 'Resource Utilization Efficiency', value: school.resourceUtilizationEfficiency },
        { label: 'Financial Management', value: school.financialManagement },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {checklistCategories.map((category) => (
        <div key={category.title} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6">{category.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  item.value ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    item.value ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {item.label}
                </span>
                {item.value ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}