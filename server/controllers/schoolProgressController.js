import School from '../models/School.js';
import SchoolProgress from '../models/SchoolProgress.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Import mongoose instead of requiring it
import mongoose from 'mongoose';

export const getSchoolProgress = async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Get school and progress data
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    let progress = await SchoolProgress.findOne({ schoolId });

    // If no progress record exists, create one
    if (!progress) {
      const metrics = await calculateMetrics(school);
      const recommendations = await generateRecommendations(school);
      const milestones = await generateMilestones(recommendations);

      progress = await SchoolProgress.create({
        schoolId,
        metrics,
        recommendations,
        milestones,
      });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error in getSchoolProgress:', error); // Changed to console.error
    res.status(500).json({ message: error.message });
  }
};

export const updateMilestone = async (req, res) => {
  try {
    const { schoolId, milestoneId } = req.params;
    const updateData = req.body;

    const progress = await SchoolProgress.findOneAndUpdate(
      {
        schoolId,
        'milestones._id': milestoneId,
      },
      {
        $set: {
          'milestones.$': {
            ...updateData,
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!progress) {
      return res
        .status(404)
        .json({ message: 'Progress or milestone not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function calculateMetrics(school) {
  const currentMonth = new Date();
  const lastMonth = new Date(currentMonth);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  // Get historical data
  const lastMonthData = school.history.find((entry) => {
    const entryDate = new Date(entry.updatedAt);
    return (
      entryDate.getMonth() === lastMonth.getMonth() &&
      entryDate.getFullYear() === lastMonth.getFullYear()
    );
  });

  // Calculate infrastructure progress
  const infrastructureScore = calculateInfrastructureScore(school);
  const prevInfrastructureScore = lastMonthData
    ? calculateInfrastructureScore(lastMonthData)
    : infrastructureScore - 5;

  // Calculate staff training progress
  const staffTrainingScore = calculateStaffTrainingScore(school);
  const prevStaffTrainingScore = lastMonthData
    ? calculateStaffTrainingScore(lastMonthData)
    : staffTrainingScore - 3;

  // Calculate compliance progress
  const complianceScore = calculateComplianceScore(school);
  const prevComplianceScore = lastMonthData
    ? calculateComplianceScore(lastMonthData)
    : complianceScore - 2;

  // Calculate overall progress
  const overallScore =
    (infrastructureScore + staffTrainingScore + complianceScore) / 3;
  const prevOverallScore =
    (prevInfrastructureScore + prevStaffTrainingScore + prevComplianceScore) /
    3;

  return {
    overall: {
      current: Math.round(overallScore),
      previous: Math.round(prevOverallScore),
    },
    infrastructure: {
      current: Math.round(infrastructureScore),
      previous: Math.round(prevInfrastructureScore),
    },
    staffTraining: {
      current: Math.round(staffTrainingScore),
      previous: Math.round(prevStaffTrainingScore),
    },
    compliance: {
      current: Math.round(complianceScore),
      previous: Math.round(prevComplianceScore),
    },
  };
}

function calculateInfrastructureScore(schoolData) {
  const facilityWeights = {
    Library: 15,
    'Computer Lab': 15,
    'Science Lab': 15,
    Playground: 10,
    'Sports Complex': 15,
    Auditorium: 10,
    'Smart Classroom': 20,
  };

  let score = 0;
  let totalWeight = 0;

  schoolData.facilities.forEach((facility) => {
    if (facilityWeights[facility]) {
      score += facilityWeights[facility];
      totalWeight += facilityWeights[facility];
    }
  });

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

function calculateStaffTrainingScore(schoolData) {
  const studentTeacherRatio = schoolData.studentCount / schoolData.teacherCount;
  const idealRatio = 30; // Example ideal ratio
  const ratioScore = Math.min(100, (idealRatio / studentTeacherRatio) * 100);

  return ratioScore;
}

function calculateComplianceScore(schoolData) {
  const baseScore =
    schoolData.performanceBand === 'Excellent'
      ? 90
      : schoolData.performanceBand === 'Good'
      ? 75
      : schoolData.performanceBand === 'Average'
      ? 60
      : 40;

  return baseScore;
}

async function generateRecommendations(school) {
  try {
    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Return ONLY a valid JSON array containing 3-4 specific recommendations based on analyzing this school data:
      ${JSON.stringify({
        facilities: school.facilities,
        studentCount: school.studentCount,
        teacherCount: school.teacherCount,
        performanceBand: school.performanceBand,
        currentStructure: school.currentStructure,
        recommendedStructure: school.recommendedStructure,
      })}

      Each object in the array must follow EXACTLY this structure:
      {
        "title": "Brief title",
        "description": "Detailed description",
        "priority": "high|medium|low",
        "impact": "Expected impact of implementing this recommendation"
      }

      Do not include any explanatory text, markdown, or formatting - ONLY the JSON array.
    `;


    const result = await model.generateContent(prompt);
    let responseText = result.response.text();


    // More aggressive cleaning
    responseText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\*/g, '') // Remove markdown italic
      .replace(/^[^[{]*/, '') // Remove any text before the first [ or {
      .replace(/[^}\]]*$/, '') // Remove any text after the last } or ]
      .trim();


    // Validate JSON array structure
    if (!responseText.startsWith('[') || !responseText.endsWith(']')) {
      console.error('Response is not a valid JSON array');
      return [];
    }

    try {
      const recommendations = JSON.parse(responseText);
      if (!Array.isArray(recommendations)) {
        console.error('Response is not an array');
        return [];
      }

      // Validate each recommendation object
      const validRecommendations = recommendations.filter((rec) => {
        return (
          rec.title &&
          rec.description &&
          rec.priority &&
          rec.impact &&
          ['high', 'medium', 'low'].includes(rec.priority.toLowerCase())
        );
      });

      return validRecommendations;
    } catch (parseError) {
      console.error(
        'JSON parsing error:',
        parseError,
        'Response:',
        responseText
      );
      return [];
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}
async function generateMilestones(recommendations) {
  try {
    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You must return ONLY a valid JSON array containing 4-6 milestones based on these recommendations:
      ${JSON.stringify(recommendations)}

      Each object in the array must follow EXACTLY this structure:
      {
        "title": "Milestone title",
        "status": "upcoming",
        "dueDate": "YYYY-MM-DD",
        "description": "Detailed description of the milestone"
      }

      Do not include any explanatory text, markdown, or formatting - ONLY the JSON array.
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // More aggressive cleaning
    responseText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\*/g, '') // Remove markdown italic
      .replace(/^[^[{]*/, '') // Remove any text before the first [ or {
      .replace(/[^}\]]*$/, '') // Remove any text after the last } or ]
      .trim();


    try {
      const milestones = JSON.parse(responseText);
      if (!Array.isArray(milestones)) {
        console.error('Response is not an array');
        return [];
      }
      return milestones;
    } catch (parseError) {
      console.error(
        'JSON parsing error:',
        parseError,
        'Response:',
        responseText
      );
      return [];
    }
  } catch (error) {
    console.error('Error generating milestones:', error);
    return [];
  }
}

export const getRecentActivity = async (req, res) => {
  try {
    const { schoolId } = req.params;
    console.log('Processing request for schoolId:', schoolId);

    if (!schoolId || typeof schoolId !== 'string') {
      return res.status(400).json({ error: 'Invalid school ID format' });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    console.log('School history:', school.history);

    const client = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Add retry logic
    const maxRetries = 3;
    let activities = [];
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt} to generate activities`);

        const prompt = `
          Generate a JSON array of exactly 4 recent activities. The response must be a valid JSON array and nothing else.
          School history: ${JSON.stringify(school.history)}

          Required structure for each activity:
          {
            "date": "YYYY-MM-DD",
            "title": "Event title",
            "type": "milestone|update|training|task",
            "status": "completed|in-progress|pending",
            "description": "Detailed description"
          }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log('Raw Gemini response:', responseText);

        // Clean response
        let cleanedResponse = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .replace(/[\u200B-\u200D\uFEFF]/g, '')
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/^[^[{]*/, '')
          .replace(/[^}\]]*$/, '')
          .trim();


        // Validate JSON structure
        if (!cleanedResponse.startsWith('[') || !cleanedResponse.endsWith(']')) {
          throw new Error('Invalid JSON array structure');
        }

        activities = JSON.parse(cleanedResponse);

        // Validate activities array
        if (!Array.isArray(activities) || activities.length === 0) {
          throw new Error('Invalid or empty activities array');
        }

        // Validate each activity object
        activities = activities.filter(activity => 
          activity.date && 
          activity.title && 
          activity.type && 
          activity.status && 
          activity.description &&
          ['milestone', 'update', 'training', 'task'].includes(activity.type) &&
          ['completed', 'in-progress', 'pending'].includes(activity.status)
        );

        if (activities.length > 0) {
          console.log('Successfully generated activities:', activities);
          return res.json(activities);
        }

        throw new Error('No valid activities after filtering');
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        lastError = error;
        
        // Add delay between retries
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    console.error('All attempts failed. Last error:', lastError);
    return res.status(500).json({ 
      error: 'Failed to generate activities after multiple attempts',
      details: lastError.message
    });

  } catch (error) {
    console.error('Error in getRecentActivity:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
