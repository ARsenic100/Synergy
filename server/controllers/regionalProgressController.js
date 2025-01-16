import School from '../models/School.js';
import RegionalGoal from '../models/RegionalProgress.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get regional metrics for a specific state
export const getRegionalMetrics = async (req, res) => {
  try {
    const { state } = req.params;
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    // Get all schools for the state
    const schools = await School.find({ state });
    
    // Calculate current metrics
    const currentMetrics = calculateRegionalMetrics(schools);
    
    // Calculate last month's metrics using history
    const lastMonthMetrics = calculateHistoricalRegionalMetrics(schools, lastMonth);

    // Calculate changes
    const metrics = {
      schoolsTransitioned: {
        value: currentMetrics.transitionedPercentage,
        change: currentMetrics.transitionedPercentage - lastMonthMetrics.transitionedPercentage
      },
      resourceUtilization: {
        value: currentMetrics.resourceUtilization,
        change: currentMetrics.resourceUtilization - lastMonthMetrics.resourceUtilization
      },
      teacherAllocation: {
        value: currentMetrics.teacherAllocation,
        change: currentMetrics.teacherAllocation - lastMonthMetrics.teacherAllocation
      },
      completionRate: {
        value: currentMetrics.completionRate,
        change: currentMetrics.completionRate - lastMonthMetrics.completionRate
      }
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get state-wise comparison data
export const getStateComparison = async (req, res) => {
  try {
    const states = req.query.states ? req.query.states.split(',') : [];
    const stateData = [];

    for (const state of states) {
      const schools = await School.find({ state });
      const total = schools.length;
      const completed = schools.filter(s => s.transitionStatus === 'completed').length;
      const inProgress = schools.filter(s => s.transitionStatus === 'in-progress').length;

      stateData.push({
        name: state,
        completed: Math.round((completed / total) * 100),
        inProgress: Math.round((inProgress / total) * 100)
      });
    }

    res.json(stateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get regional challenges
export const getRegionalChallenges = async (req, res) => {
  try {
    const { state } = req.params;
    const schools = await School.find({ state });

    // Use Gemini to analyze challenges
    const challenges = await analyzeRegionalChallenges(schools);
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get regional goals
export const getRegionalGoals = async (req, res) => {
  try {
    const { state } = req.params;
    const goals = await RegionalGoal.find({ state }).sort({ deadline: 1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new regional goal
export const addRegionalGoal = async (req, res) => {
  try {
    const goal = new RegionalGoal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update goal progress
export const updateGoalProgress = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { progress, milestones } = req.body;
    
    const goal = await RegionalGoal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.progress = progress;
    if (milestones) {
      goal.milestones = milestones;
    }
    goal.updatedAt = new Date();

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
function calculateRegionalMetrics(schools) {
  const total = schools.length;
  const transitioned = schools.filter(s => s.transitionStatus === 'completed').length;
  
  // Calculate resource utilization based on facilities and student-teacher ratio
  const resourceUtilization = schools.reduce((sum, school) => {
    const facilityScore = school.facilities.length / 10; // Assuming max 10 facilities
    const ratioScore = Math.min(1, school.teacherCount / (school.studentCount / 30));
    return sum + (facilityScore + ratioScore) / 2;
  }, 0) / total * 100;

  // Calculate teacher allocation
  const teacherAllocation = schools.reduce((sum, school) => {
    const idealTeachers = Math.ceil(school.studentCount / 30);
    return sum + Math.min(1, school.teacherCount / idealTeachers);
  }, 0) / total * 100;

  return {
    transitionedPercentage: Math.round((transitioned / total) * 100),
    resourceUtilization: Math.round(resourceUtilization),
    teacherAllocation: Math.round(teacherAllocation),
    completionRate: Math.round((transitioned / total) * 100)
  };
}

function calculateHistoricalRegionalMetrics(schools, date) {
  const historicalSchools = schools.map(school => {
    const historicalData = school.history.find(h => 
      new Date(h.updatedAt).getMonth() === date.getMonth() &&
      new Date(h.updatedAt).getFullYear() === date.getFullYear()
    );
    return historicalData ? { ...school.toObject(), ...historicalData } : school;
  });

  return calculateRegionalMetrics(historicalSchools);
}

async function analyzeRegionalChallenges(schools) {
  try {
    const client = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');
    const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      Analyze the following school data and identify the top 3 challenges in these categories:
      1. Infrastructure Gap
      2. Teacher Shortage
      3. Resource Distribution

      For each challenge, provide:
      - A specific description of the issue(max 20 words)
      - The number of schools affected

      School data:
      ${JSON.stringify(schools)}

      Return the response in valid JSON format as an array of objects with exactly this structure:
      [
        {
          "title": "challenge title",
          "description": "detailed description",
          "severity": "high/medium/low",
          "affectedSchools": number
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up the response text
    let cleanedResponse = responseText
      .replace(/```json\n?/g, '') // Remove JSON code block markers
      .replace(/```\n?/g, '')     // Remove any remaining code block markers
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .trim();

    // Try to find JSON content within the response
    const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }

    console.log(':', cleanedResponse);
    
    try {
      const challenges = JSON.parse(cleanedResponse);
      return challenges;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error analyzing challenges:', error);
    return [];
  }
}