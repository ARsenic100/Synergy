import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import SchoolDetail from '../models/SchoolDetail.js';
import axios from 'axios';
import School from '../models/School.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const createSchoolDetail = async (req, res) => {
  try {
    const { schoolID } = req.body;
    console.log('Request body:', schoolID);

    const dataUrl = 'https://synergy-scraper-docker.onrender.com/fetch-school-data';

    const sending = {
      school_id: schoolID,
    };

    let response;
    try {
      response = await axios.post(dataUrl, sending, { timeout: 30000 });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return res.status(408).json({ message: 'Request timed out after 30 seconds' });
      }
      return res.status(500).json({ 
        message: 'Error fetching school data',
        error: error.message 
      });
    }
    //if error response or reponse time more than 30 sec abort and send return erro message
    
    const schoolData = response.data;

    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );

    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });


    const prompt = `
    STRICT DATA EXTRACTION AND GENERATION INSTRUCTIONS:

     state-coordinates =  [
        {
          "state": "Andhra Pradesh",
          "latitude": 16.50,
          "longitude": 80.63
        },
        {
          "state": "Arunachal Pradesh",
          "latitude": 27.08,
          "longitude": 93.62
        },
        {
          "state": "Assam",
          "latitude": 26.11,
          "longitude": 91.77
        },
        {
          "state": "Bihar",
          "latitude": 25.60,
          "longitude": 85.13
        },
        {
          "state": "Chhattisgarh",
          "latitude": 21.21,
          "longitude": 81.62
        },
        {
          "state": "Goa",
          "latitude": 15.29,
          "longitude": 73.83
        },
        {
          "state": "Gujarat",
          "latitude": 23.22,
          "longitude": 72.64
        },
        {
          "state": "Haryana",
          "latitude": 30.73,
          "longitude": 76.78
        },
        {
          "state": "Himachal Pradesh",
          "latitude": 31.10,
          "longitude": 77.17
        },
        {
          "state": "Jharkhand",
          "latitude": 23.35,
          "longitude": 85.33
        },
        {
          "state": "Karnataka",
          "latitude": 12.97,
          "longitude": 77.58
        },
        {
          "state": "Kerala",
          "latitude": 8.29,
          "longitude": 76.95
        },
        {
          "state": "Madhya Pradesh",
          "latitude": 23.25,
          "longitude": 77.41
        },
        {
          "state": "Maharashtra",
          "latitude": 19.07,
          "longitude": 72.88
        },
        {
          "state": "Manipur",
          "latitude": 24.80,
          "longitude": 93.94
        },
        {
          "state": "Meghalaya",
          "latitude": 25.57,
          "longitude": 91.93
        },
        {
          "state": "Mizoram",
          "latitude": 23.72,
          "longitude": 92.72
        },
        {
          "state": "Nagaland",
          "latitude": 25.67,
          "longitude": 94.11
        },
        {
          "state": "Odisha",
          "latitude": 20.29,
          "longitude": 85.84
        },
        {
          "state": "Punjab",
          "latitude": 30.73,
          "longitude": 76.78
        },
        {
          "state": "Rajasthan",
          "latitude": 26.91,
          "longitude": 75.80
        },
        {
          "state": "Sikkim",
          "latitude": 27.33,
          "longitude": 88.62
        },
        {
          "state": "Tamil Nadu",
          "latitude": 13.08,
          "longitude": 80.27
        },
        {
          "state": "Telangana",
          "latitude": 17.38,
          "longitude": 78.47
        },
        {
          "state": "Tripura",
          "latitude": 23.83,
          "longitude": 91.29
        },
        {
          "state": "Uttar Pradesh",
          "latitude": 26.85,
          "longitude": 80.92
        },
        {
          "state": "Uttarakhand",
          "latitude": 30.31,
          "longitude": 78.02
        },
        {
          "state": "West Bengal",
          "latitude": 22.57,
          "longitude": 88.36
        }
      ]

      1. COORDINATE MAPPING:
        - USE provided STATE COORDINATES array
        - MATCH school's state EXACTLY to corresponding latitude and longitude
        - Precision: Use provided decimal coordinates
        - MATCH geographical center of specified state

      2. COORDINATE MATCHING RULES:
        - EXACT state name match (case-sensitive)
        - If state matches: 
          * Use PRECISE coordinates from provided array
          * DO NOT generate random coordinates
        - If NO state match found:
          * DEFAULT to India's general coordinate range
          * Latitude: 8.0° to 37.0° N
          * Longitude: 68.0° to 97.0° E

      3. DATA EXTRACTION PRIORITY:
        - Use UDISE code DIRECTLY as schoolID
        - Preserve existing data from schoolData where possible

      4. DATA HANDLING RULES:
        - UDISE Code = schoolID (Mandatory)
        - Existing schoolData values take precedence
        - For MISSING or EMPTY fields:
          * Boolean Fields (true/false): Generate RANDOM TRUE or FALSE
          * Numeric Fields: Generate RANDOM non-zero numbers
          * String Fields: Leave as empty strings

      5. REQUIREMENTS:
        - FOLLOW the EXACT JSON template structure
        - MATCH the specified data types
        - NO additional text, comments, or explanations
        - Return ONLY the complete, valid JSON object

      6. OUTPUT CONSTRAINTS:
        - MAINTAIN EXACT JSON STRUCTURE
        - NO modifications to template structure
        - NO extra or missing fields
        - COMPLETE JSON object REQUIRED

      IMPORTANT: Prioritize generating data that appears authentic and contextually appropriate for an educational institution.

      Template JSON (MUST BE FOLLOWED PRECISELY):
      {
      "schoolID": "",
      "schoolName": "",
      "qualityScore": null,
      "state": "",
      "district": "",
      "block": "",
      "ruralUrban": "",
      "cluster": "",
      "villageCity": "",
      "pincode": "",
      "schoolCategory": "",
      "schoolManagement": "",
      "mediumOfInstruction": "",
      "schoolType": "",
      "totalTeachers": 0,
      "totalClassrooms": 0,
      "totalStudents": 0,
      "separateRoomForHM": false,
      "lowestClass": 0,
      "highestClass": 0,
      "boysWashrooms": false,
      "girlsWashrooms": false,
      "boundaryWall": false,
      "libraryAvailable": false,
      "drinkingWaterAvailable": false,
      "playgroundAvailable": false,
      "electricityAvailability": false,
      "kitchensForMidDayMeal": false,
      "ecoFriendlyConstruction": false,
      "safetyStandardsCompliance": false,
      "universalAccess": false,
      "inclusiveEnvironment": false,
      "transportationForRemoteAreas": false,
      "communityParticipation": false,
      "qualifiedTeachersRTEAct": false,
      "ICTIntegration": false,
      "vocationalTrainingAvailability": false,
      "activeSchoolManagementCommittee": false,
      "annualMaintenance": false,
      "schoolMapping": false,
      "studentTracking": false,
      "freeAndCompulsoryEducation": false,
      "nonDiscrimination": false,
      "noPunitivePractices": false,
      "timelyFundUtilization": false,
      "fundsAuditedAnnually": false,
      "resourceUtilizationEfficiency": false,
      "provisionOfStipendsForCWSNGirls": false,
      "KGBVUpgraded": false,
      "integrationWithAnganwadiCenters": false,
      "curriculumStandardsAdherence": false,
      "adequateFacilities": false,
      "safetyStandards": false,
      "supportForCWSN": false,
      "communityEngagement": false,
      "coLocationWithAnganwadiCenters": false,
      "childProtectionPolicies": false,
      "curriculumImplementation": false,
      "qualifiedAndTrainedTeachers": false,
      "supportiveLearningEnvironment": false,
      "governanceAndManagement": false,
      "monitoringAndEvaluationPractices": false,
      "managementStructure": false,
      "infrastructureQuality": false,
      "supportSystems": false,
      "financialManagement": false,
      "positiveEducationalOutcomes": false,
      "researchAndDevelopmentEngagement": false,
      "studentLearningOutcomes": false,
      "dataManagementAndReporting": false,
      "grant": false,
      "latitude": 0,
      "longitude": 0,
      "classroomCondition": [
        {
          "goodCondition": 0,
          "minorRepair": 0,
          "majorRepair": 0
        }
      ],
      "availableFacilities": [
        {
          "library": false,
          "computerLab": false,
          "drinkingWater": false,
          "electricity": false,
          "internet": false,
          "scienceLab": false,
          "smartClassroom": false,
          "playground": false,
          "auditorium": false,
          "digitalLibrary": false
        }
      ],
      "resourceDistribution": [
        {
          "teachingStaff": { "current": 0, "required": 0 },
          "classrooms": { "current": 0, "required": 0 },
          "labs": { "current": 0, "required": 0 }
        }
      ],
      "digitalEquipment": [
        {
          "desktops": 0,
          "laptops": 0,
          "projectors": 0,
          "smartBoards": 0,
          "printers": 0
        }
      ],
      "studentDemographics": [
        {
          "general": 0,
          "SC": 0,
          "ST": 0,
          "OBC": 0
        }
      ],
      "teacherQualifications": [
        {
          "PhD": 0,
          "postGraduate": 0,
          "graduate": 0,
          "other": 0
        }
      ],
      "performanceOverview": {
        "academicAchievement": 0,
        "teacherStudentRatio": 0,
        "infrastructure": 0,
        "resourceAvailability": 0
      },
      "performanceTrends": [],
      "grantUtilization": [],
      "complianceVisits": [],
      "upcomingComplianceRequirements": []
    }


     HTML Content: ${JSON.stringify(schoolData)}

      RESPONSE FORMAT REQUIREMENTS:
      - Provide values ONLY for fields in the template
      - Use exact data types shown (string, number, boolean)
      - If no data found, use random values for the type
      - NO additional text before or after JSON
      - MUST return complete JSON object
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up the response text
    const cleanedResponseText = responseText
    .replace(/\\n/g, '') // Remove escaped newlines
    .replace(/\\/g, '')  // Remove remaining backslashes
    .replace(/^"|"$/g, '')
    .replace(/```json/g, '')  // Remove ```json
    .replace(/```/g, '')      // Remove remaining ```
    .trim();       
    

    // Parse the cleaned response
    const cleanedResponse = JSON.parse(cleanedResponseText);

    // Log the school ID if needed
    // console.log('School ID:', jsonData.resourceDistribution[0].classrooms.current);

    // if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
    //   throw new Error('Invalid JSON array structure');
    // }

    // console.log(cleanedResponse);


    const apiUrl = 'https://synergy-ml-model.onrender.com/predict_school_rating';
    

    // Replace with your Flask API URL

    const dataToSend = {
      'Lowest Class': cleanedResponse.lowestClass,
      'Highest Class': cleanedResponse.highestClass,
      'Boys Washrooms': cleanedResponse.boysWashrooms,
      'Girls Washrooms': cleanedResponse.girlsWashrooms,
      'Boundary Wall': cleanedResponse.boundaryWall,
      'Library Available': cleanedResponse.libraryAvailable,
      'Drinking Water Available': cleanedResponse.drinkingWaterAvailable,
      'Playground Available': cleanedResponse.playgroundAvailable,
      'Electricity Availability': cleanedResponse.electricityAvailability,
      'Kitchens for Mid-Day Meal': cleanedResponse.kitchensForMidDayMeal,
      'Eco-Friendly Construction (Rainwater Harvesting, Solar)':
        cleanedResponse.ecoFriendlyConstruction,
      'Safety Standards Compliance (Earthquake, Fire)':
        cleanedResponse.safetyStandardsCompliance,
      'Universal Access (Distance from habitation)': cleanedResponse.universalAccess,
      'Inclusive Environment (Ramp, Barrier-Free)':
        cleanedResponse.inclusiveEnvironment,
      'Transportation for Remote Areas': cleanedResponse.transportationForRemoteAreas,
      'Community Participation': cleanedResponse.communityParticipation,
      'Qualified Teachers (RTE Act)': cleanedResponse.qualifiedAndTrainedTeachers,
      'ICT Integration (Computer Labs)': cleanedResponse.transportationForRemoteAreas,
      'Vocational Training Availability': cleanedResponse.freeAndCompulsoryEducation,
      'Active School Management Committee (SMC)':
        cleanedResponse.activeSchoolManagementCommittee,
      'Adequate Facilities': cleanedResponse.nonDiscrimination,
      'Annual Maintenance (School Grants)': cleanedResponse.grant,
      'School Mapping (Geographic/Community Planning)': cleanedResponse.schoolMapping,
      'Student Tracking (SDMIS)': cleanedResponse.studentTracking,
      'Free and Compulsory Education': cleanedResponse.freeAndCompulsoryEducation,
      'Non-Discrimination': cleanedResponse.nonDiscrimination,
      'No Punitive Practices': cleanedResponse.noPunitivePractices,
      'Timely Fund Utilization': cleanedResponse.timelyFundUtilization,
      'Funds Audited Annually': cleanedResponse.fundsAuditedAnnually,
      'Resource Utilization Efficiency': cleanedResponse.resourceUtilizationEfficiency,
      'Provision of Stipends for CWSN Girls':
        cleanedResponse.provisionOfStipendsForCWSNGirls,
      'KGBV Upgraded': cleanedResponse.KGBVUpgraded,
      'Integration with Anganwadi Centers':
        cleanedResponse.integrationWithAnganwadiCenters,
      'Safety Standards': cleanedResponse.safetyStandards,
      'Support for CWSN': cleanedResponse.supportForCWSN,
      'Community Engagement': cleanedResponse.communityEngagement,
      'Co-location with Anganwadi Centers':
        cleanedResponse.coLocationWithAnganwadiCenters,
      'Child Protection Policies': cleanedResponse.childProtectionPolicies,
      'Curriculum Implementation': cleanedResponse.curriculumImplementation,
      'Qualified and Trained Teachers': cleanedResponse.qualifiedAndTrainedTeachers,
      'Supportive Learning Environment': cleanedResponse.supportiveLearningEnvironment,
      'Governance and Management': cleanedResponse.governanceAndManagement,
      'Monitoring and Evaluation Practices':
        cleanedResponse.monitoringAndEvaluationPractices,
      'Management Structure': cleanedResponse.managementStructure,
      'Infrastructure Quality': cleanedResponse.infrastructureQuality,
      'Support Systems': cleanedResponse.supportSystems,
      'Financial Management': cleanedResponse.financialManagement,
      'Positive Educational Outcomes': cleanedResponse.positiveEducationalOutcomes,
      'Research and Development Engagement':
        cleanedResponse.researchAndDevelopmentEngagement,
      'Student Learning Outcomes': cleanedResponse.studentLearningOutcomes,
      'Data Management and Reporting': cleanedResponse.dataManagementAndReporting,
      'Total Students': cleanedResponse.totalStudents,
      'Total Teachers': cleanedResponse.totalTeachers,
      'Total Classrooms': cleanedResponse.resourceDistribution[0].classrooms.current,
    };

    const flaskResponse = await axios.post(apiUrl, dataToSend);
    const { predicted_rating, suggestions } = flaskResponse.data;

    // Add the predicted rating to the request body
    cleanedResponse.qualityScore = predicted_rating;

    console.log('Predicted rating:', predicted_rating);

    console.log(cleanedResponse);
    
    const newSchoolDetail = new SchoolDetail({ schoolID: cleanedResponse.schoolID, ...cleanedResponse });
    const savedSchool = await newSchoolDetail.save();

    // Determine performance band based on predicted rating
    let performanceBand;
    if (predicted_rating >= 85) {
      performanceBand = 'Excellent';
    } else if (predicted_rating >= 70) {
      performanceBand = 'Good';
    } else if (predicted_rating >= 50) {
      performanceBand = 'Average';
    } else {
      performanceBand = 'Poor';
    }

    const facilities = [];
    if (savedSchool.libraryAvailable) facilities.push('Library');
    if (savedSchool.computerLabAvailable) facilities.push('Computer Lab');
    if (savedSchool.drinkingWaterAvailable) facilities.push('Drinking Water');
    if (savedSchool.electricityAvailability) facilities.push('Electricity');
    if (savedSchool.playgroundAvailable) facilities.push('Playground');

    const newSchool = new School({
      schoolId: savedSchool._id,
      name: savedSchool.schoolName,
      state: savedSchool.state,
      district: savedSchool.district,
      currentStructure:
        predicted_rating < 75 ? 'Odd Structure' : 'Standard Structure',
      recommendedStructure: 'Standard Structure',
      transitionStatus: 'in-progress',
      performanceBand: performanceBand,
      qualityScore: predicted_rating,
      studentCount: savedSchool.totalStudents,
      teacherCount: savedSchool.totalTeachers,
      facilities: facilities,
      type:
        savedSchool.schoolManagement === '1-Govt'
          ? 'government'
          : savedSchool.schoolManagement === '3-Local Body'
          ? 'aided'
          : 'private',
      coordinates: {
        lat: savedSchool.latitude,
        lng: savedSchool.longitude,
      },
      schoolUDISECode: savedSchool.schoolID,
    });

    const savedSchoolRating = await newSchool.save();

    res.status(201).json({
      message: 'School details added successfully!',
      data: savedSchool,
      school_card: savedSchoolRating,
      predicted_rating,
      suggestions,
      // cleanedResponse,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }

    if (error.response && error.response.data) {
      console.error('Error from Flask API:', error.response.data);
    }

    console.error('Error adding school details:', error.message);
    res.status(500).json({
      message: 'An error occurred while adding school details.',
      error: error.message,
    });
  }
};

export const getSchoolDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolDetail = await SchoolDetail.findById(id);

    if (!schoolDetail) {
      return res.status(404).json({ message: 'School detail not found' });
    }

    res.status(200).json(schoolDetail);
  } catch (error) {
    console.error('Error fetching school detail:', error.message);
    res.status(500).json({
      message: 'An error occurred while fetching school detail.',
      error: error.message,
    });
  }
};

export const searchSchoolBySchoolID = async (req, res) => {
  try {
    const { schoolID } = req.params;
    const school = await SchoolDetail.find({ schoolID });

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json(school);
  } catch (error) {
    console.error('Error searching school by school ID:', error.message);
    res.status(500).json({
      message: 'An error occurred while searching for the school.',
      error: error.message,
    });
  }
};
export const getAllSchools = async (req, res) => {
  try {
    const schools = await SchoolDetail.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error fetching all schools:', error.message);
    res.status(500).json({
      message: 'An error occurred while fetching all schools.',
      error: error.message,
    });
  }
};
