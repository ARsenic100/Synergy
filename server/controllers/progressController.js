import { Pen } from 'lucide-react';
import School from '../models/School.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get state-wise progress data for map
export const getStateProgress = async (req, res) => {
  try {
    const schools = await School.find();

    // Group schools by state
    const stateData = schools.reduce((acc, school) => {
      if (!acc[school.state]) {
        acc[school.state] = {
          totalSchools: 0,
          completed: 0,
          inProgress: 0,
          pending: 0,
          coordinates: getStateCoordinates(school.state),
        };
      }

      acc[school.state].totalSchools++;
      if (school.transitionStatus === 'completed') {
        acc[school.state].completed++;
      } else if (school.transitionStatus === 'in-progress') {
        acc[school.state].inProgress++;
      } else if (school.transitionStatus === 'pending') {
        acc[school.state].pending++;
      }

      return acc;
    }, {});

    // Calculate progress percentage and format response
    const progressData = Object.entries(stateData).map(([name, data]) => ({
      name,
      progress: Math.round((data.completed / data.totalSchools) * 100),
      schools: data.totalSchools,
      status: getStateStatus(data.completed, data.totalSchools),
      coordinates: data.coordinates,
    }));

    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get key metrics with month-over-month comparison
export const getKeyMetrics = async (req, res) => {
  try {
    const schools = await School.find();
    const currentDate = new Date();
    const lastMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );

    console.log(lastMonth);
    // Calculate current metrics
    const currentMetrics = calculateMetrics(schools);
    console.log(currentMetrics, 'currentMetrics');

    // Calculate last month's metrics using history
    const lastMonthMetrics = calculateHistoricalMetrics(schools, lastMonth);

    // Calculate changes
    const metrics = {
      schoolsTransitioned: {
        value: currentMetrics.transitionedPercentage,
        change:
          currentMetrics.transitionedPercentage -
          lastMonthMetrics.transitionedPercentage,
      },
      transitionRate: {
        value: currentMetrics.monthlyTransitions,
        change:
          ((currentMetrics.monthlyTransitions -
            lastMonthMetrics.monthlyTransitions) /
            lastMonthMetrics.monthlyTransitions) *
          100,
      },
      averageTime: {
        value: currentMetrics.averageTransitionTime,
        change:
          lastMonthMetrics.averageTransitionTime -
          currentMetrics.averageTransitionTime,
      },
      criticalCases: {
        value: currentMetrics.criticalCases,
        change: lastMonthMetrics.criticalCases - currentMetrics.criticalCases,
      },
    };
    console.log(metrics);

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transition trends data
export const getTransitionTrends = async (req, res) => {
  try {
    const schools = await School.find();
    const trends = calculateMonthlyTrends(schools);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get AI-generated insights
export const getInsights = async (req, res) => {
  try {
    const schools = await School.find();
    const insights = await generateInsights(schools);
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
function getStateCoordinates(state) {
  const coordinates = {
    Kerala: [10.8505, 76.2711],
    'Tamil Nadu': [11.1271, 78.6569],
    Maharashtra: [19.7515, 75.7139],
    Karnataka: [15.3173, 75.7139],
    Gujarat: [22.2587, 71.1924],
    Rajasthan: [27.0238, 74.2179],
    'Uttar Pradesh': [26.8467, 80.9462],
    'Madhya Pradesh': [22.9734, 78.6569],
    'West Bengal': [22.9868, 87.855],
    Bihar: [25.0961, 85.3131],
    Punjab: [31.1471, 75.3412],
    Haryana: [29.0588, 76.0856],
    Chhattisgarh: [21.2787, 81.8661],
    Odisha: [20.9517, 85.0985],
    Jharkhand: [23.6102, 85.2799],
    Assam: [26.2006, 92.9376],
    'Himachal Pradesh': [31.1048, 77.1734],
    Uttarakhand: [30.0668, 79.0193],
    Goa: [15.2993, 74.124],
    Tripura: [23.9408, 91.9882],
    Meghalaya: [25.467, 91.3662],
    Manipur: [24.6637, 93.9063],
    Nagaland: [26.1584, 94.5624],
    'Arunachal Pradesh': [28.218, 94.7278],
    Mizoram: [23.1645, 92.9376],
    Sikkim: [27.533, 88.5122],
    Delhi: [28.7041, 77.1025],
    'Jammu and Kashmir': [33.7782, 76.5762],
    Ladakh: [34.1526, 77.577],
    'Andhra Pradesh': [15.9129, 79.74],
    Telangana: [18.1124, 79.0193],
  };
  return coordinates[state] || [0, 0];
}

function getStateStatus(completed, total) {
  const percentage = (completed / total) * 100;
  if (percentage >= 80) return 'completed';
  if (percentage >= 40) return 'in-progress';
  return 'not-started';
}

function calculateMetrics(schools) {
  const oddStructureSchools = schools.filter(
    (s) => s.currentStructure === 'Odd Structure'
  );
  const total = oddStructureSchools.length;
  const transitioned = oddStructureSchools.filter(
    (s) => s.transitionStatus === 'completed'
  ).length;
  const inProgress = oddStructureSchools.filter(
    (s) => s.transitionStatus === 'in-progress'
  ).length;
  const pending = oddStructureSchools.filter(
    (s) => s.transitionStatus === 'pending'
  ).length;

  const currentMonth = new Date().getMonth();
  const monthlyTransitions = oddStructureSchools.filter(
    (s) =>
      s.transitionStatus === 'completed' &&
      new Date(s.updatedAt).getMonth() === currentMonth
  ).length;

  const completedSchools = oddStructureSchools.filter(
    (s) => s.transitionStatus === 'completed'
  );
  const averageTransitionTime =
    completedSchools.reduce((acc, school) => {
      const pendingDate = new Date(
        school.history.find((h) => h.transitionStatus === 'pending').updatedAt
      );
      console.log(pendingDate, 'pendingDate');
      const completedDate = new Date(school.updatedAt);
      const transitionTime =
        (completedDate - pendingDate) / (1000 * 60 * 60 * 24); // in days
      return acc + transitionTime;
    }, 0) / completedSchools.length;


  const criticalCases = oddStructureSchools.filter(
    (s) => s.transitionStatus === 'in-progress' && s.performanceBand === 'Poor'
  ).length;

  return {
    transitionedPercentage: Math.round((transitioned / total) * 100),
    monthlyTransitions,
    averageTransitionTime: averageTransitionTime.toFixed(2),
    criticalCases,
  };
}

function calculateHistoricalMetrics(schools, date) {
  const oddStructureSchools = schools.filter(
    (s) => s.currentStructure === 'Odd Structure'
  );
  const total = oddStructureSchools.length;

  const transitioned = oddStructureSchools.filter(
    (s) =>
      s.history[0].transitionStatus === 'completed' &&
      new Date(s.history[0].updatedAt).getMonth() === date.getMonth()
  ).length;

  const monthlyTransitions = oddStructureSchools.filter(
    (s) =>
      s.history[0].transitionStatus === 'completed' &&
      new Date(s.history[0].updatedAt).getMonth() === date.getMonth()
  ).length;

  const completedSchools = oddStructureSchools.filter(
    (s) => s.history[0].transitionStatus === 'completed'
  );
  const averageTransitionTime =
    completedSchools.reduce((acc, school) => {
      const pendingDate = new Date(
        school.history.find((h) => h.transitionStatus === 'pending').updatedAt
      );
      const completedDate = new Date(school.history[0].updatedAt);
      const transitionTime =
        (completedDate - pendingDate) / (1000 * 60 * 60 * 24); // in days
      return acc + transitionTime;
    }, 0) / completedSchools.length;

  const criticalCases = oddStructureSchools.filter(
    (s) =>
      s.history[0].transitionStatus === 'in-progress' &&
      s.performanceBand === 'Poor'
  ).length;

  return {
    transitionedPercentage: Math.round((transitioned / total) * 100),
    monthlyTransitions,
    averageTransitionTime: averageTransitionTime.toFixed(2),
    criticalCases,
  };
}

function calculateMonthlyTrends(schools) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return months.map((month) => {
    const completed = schools.filter((school) =>
      school.history.some(
        (h) =>
          h.transitionStatus === 'completed' &&
          new Date(h.updatedAt).toLocaleString('en-US', { month: 'short' }) ===
            month
      )
    ).length;

    const inProgress = schools.filter((school) =>
      school.history.some(
        (h) =>
          h.transitionStatus === 'in-progress' &&
          new Date(h.updatedAt).toLocaleString('en-US', { month: 'short' }) ===
            month
      )
    ).length;

    return { month, completed, inProgress };
  });
}

async function generateInsights(schools) {
  try {
    const client = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      You are EduBot, an AI assistant helping users navigate the education portal. Based on the following school data, generate key insights in the exact JSON format below without any additional text, code blocks, or formatting:
    
      [
        {
          "type": "success" | "warning" | "recommendation",
          "message": "Insight message",
          "importance": "high" | "medium" | "low"
        }
      ]
    
      School data:
      ${JSON.stringify(schools)}
    `;

    const result = await model.generateContent(prompt);

    // Parse the generated content into JSON
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    const insights = JSON.parse(responseText);
    return insights;
  } catch (error) {
    console.error('Error generating insights:', error);
    return [];
  }
}
