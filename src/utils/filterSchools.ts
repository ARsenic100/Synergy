import { School } from '../types/school';

export function filterSchools(schools: School[], filters: {
  structure: string;
  state: string;
  type: string;
  performanceBand: string;
  facilities: string[];
}): School[] {

    console.log(schools);

  return schools.filter(school => {
    // Structure filter
    if (filters.structure && school.currentStructure !== filters.structure) {
      return false;
    }

    // State filter
    if (filters.state && school.state !== filters.state) {
      return false;
    }

    // Type filter
    if (filters.type && school.type !== filters.type) {
      return false;
    }

    // Performance band filter
    if (filters.performanceBand && school.performanceBand !== filters.performanceBand) {
      return false;
    }

    // Facilities filter
    if (filters.facilities.length > 0) {
      const hasAllFacilities = filters.facilities.every(facility =>
        school.facilities.includes(facility)
      );
      if (!hasAllFacilities) {
        return false;
      }
    }

    return true;
  });
}