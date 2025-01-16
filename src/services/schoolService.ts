import { School, SchoolFilters } from '../types/school';
import axios from 'axios';

const API_BASE_URL = 'https://synergy-backend-six.vercel.app/api';

// Function to get the Bearer token
const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace this with your token retrieval logic
};

export const schoolService = {
  // Get all schools with filtering, search, and pagination
  async searchSchools(
    searchTerm: string,
    filters: SchoolFilters,
    page: number,
    limit: number = 10
  ): Promise<{ schools: School[]; total: number }> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      if (filters.category) {
        queryParams.append('category', filters.category);
      }

      if (filters.state) {
        queryParams.append('state', filters.state);
      }

      if (filters.type) {
        queryParams.append('type', filters.type);
      }

      if (filters.performanceBand) {
        queryParams.append('performanceBand', filters.performanceBand);
      }

      if (filters.facilities.length > 0) {
        queryParams.append('facilities', filters.facilities.join(','));
      }

      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      // Add Authorization header
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/schools?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);

      return {
        schools: response.data.map((school: any) => ({
          id: school._id,
          name: school.name,
          state: school.state,
          district: school.district,
          currentStructure: school.currentStructure,
          recommendedStructure: school.recommendedStructure,
          transitionStatus: school.transitionStatus,
          lastUpdated: school.lastUpdated,
          performanceBand: school.performanceBand,
          studentCount: school.studentCount,
          teacherCount: school.teacherCount,
          facilities: school.facilities,
          type: school.type,
          coordinates: school.coordinates,
          qualityScore: school.qualityScore,
          history: school.history,
          schoolId: school.schoolId,
          schoolUDISECode: school.schoolUDISECode,
        })),
        total: response.data.length
      };
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },

  // Get a single school by ID
  async getSchoolById(id: string): Promise<School> {
    try {
      // Add Authorization header
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/schools/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const school = response.data;

      return {
        id: school._id,
        name: school.name,
        state: school.state,
        district: school.district,
        currentStructure: school.currentStructure,
        recommendedStructure: school.recommendedStructure,
        transitionStatus: school.transitionStatus,
        lastUpdated: school.lastUpdated,
        performanceBand: school.performanceBand,
        studentCount: school.studentCount,
        teacherCount: school.teacherCount,
        facilities: school.facilities,
        type: school.type,
        coordinates: school.coordinates,
        qualityScore: school.qualityScore,
        history: school.history
      };
    } catch (error) {
      console.error('Error fetching school:', error);
      throw error;
    }
  }
};
