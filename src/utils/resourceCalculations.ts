import { ResourceCalculation } from '../types/calculator';

export function calculateResources(data: ResourceCalculation) {
  // Calculate total students across all grades
  const totalStudents = Object.values(data.gradeStructure).reduce(
    (sum, grade) => sum + (grade.enabled ? grade.students : 0),
    0
  );

  // Calculate required teachers based on teacher-student ratio
  const teachers = Math.ceil(totalStudents / data.ratios.teacherStudent);

  // Calculate required classrooms based on classroom-student ratio
  const classrooms = Math.ceil(totalStudents / data.ratios.classroomStudent);

  // Calculate required washrooms
  const washrooms = Math.ceil(totalStudents / data.ratios.washroomStudent);

  // Calculate required computers if computer lab is enabled
  const computers = data.facilities.computerLab
    ? Math.ceil(totalStudents / data.ratios.computerStudent)
    : 0;

  // Calculate building area (rough estimation)
  const classroomArea = classrooms * 56; // 56 sq meters per classroom
  const washroomArea = washrooms * 30;
  const facilityAreas = {
    library: data.facilities.library ? 150 : 0,
    computerLab: data.facilities.computerLab ? 100 : 0,
    scienceLab: data.facilities.scienceLab ? 120 : 0,
    artRoom: data.facilities.artRoom ? 80 : 0,
    musicRoom: data.facilities.musicRoom ? 80 : 0,
    infirmary: data.facilities.infirmary ? 40 : 0,
    cafeteria: data.facilities.cafeteria ? 200 : 0,
  };

  const totalBuildingArea =
    classroomArea + washroomArea
    Object.values(facilityAreas).reduce((sum, area) => sum + area, 0);

  // Calculate estimated costs (rough estimation in INR)
  const constructionCost = totalBuildingArea * 3000; // 30000 INR per sq meter
  const teachingCost = teachers * 35000;
  const equipmentCost =
    computers * 40000 + // 40000 INR per computer
    (data.facilities.scienceLab ? 1500000 : 0) + // 15 lakhs for science lab
    (data.facilities.library ? 1000000 : 0); // 10 lakhs for library

  const facilitiesCost = Object.entries(data.facilities).reduce(
    (sum, [facility, enabled]) => {
      if (!enabled) return sum;
      const costs: { [key: string]: number } = {
        artRoom: 200000,
        musicRoom: 300000,
        infirmary: 100000,
        cafeteria: 300000,
      };
      return sum + (costs[facility] || 0);
    },
    0
  );

  // Generate warnings based on calculations and constraints
  const warnings = [];
  if (totalBuildingArea > data.basicInfo.landArea * 0.6) {
    warnings.push(
      'Built-up area exceeds recommended 60% of total land area. Consider reducing facilities or increasing land area.'
    );
  }

  if (data.basicInfo.budget < constructionCost + teachingCost+ equipmentCost + facilitiesCost) {
    warnings.push(
      'Estimated total cost exceeds available budget. Consider adjusting requirements or increasing budget.'
    );
  }

  return {
    teachers,
    classrooms,
    washrooms,
    computers,
    buildingArea: totalBuildingArea,
    estimatedCost: constructionCost +teachingCost+ equipmentCost + facilitiesCost,
    costBreakdown: {
      infrastructure: constructionCost,
      teaching: teachingCost,
      equipment: equipmentCost,
      facilities: facilitiesCost,
      other: (constructionCost + equipmentCost + facilitiesCost) * 0.1, // 10% contingency
    },
    warnings,
  };
}