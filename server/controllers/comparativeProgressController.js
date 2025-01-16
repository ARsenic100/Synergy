import School from '../models/School.js';
import ComparativeProgress from '../models/ComparativeProgress.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getComparativeAnalysis = async (req, res) => {
  try {
    const { state, type, entities } = req.query; // entities can be district names or school IDs
    // Get schools for the selected state and entities
    const schools = await School.find({
      state: new RegExp(`^${state}$`, 'i'),
      ...(type === 'school'
        ? { _id: { $in: entities } }
        : { district: { $in: entities } }),
    });

    
    // Calculate metrics
    const metrics = calculateMetrics(schools, type);
    console.log('Metrics:', metrics);

    // Calculate progress distribution
    const distribution = calculateProgressDistribution(schools, type);

    // Calculate top performers
    const topPerformers = calculateTopPerformers(schools, type);

    // Generate AI insights
    const insights = await generateInsights(schools, type);

    const analysis = {
      type,
      state,
      metrics,
      progressDistribution: distribution,
      topPerformers,
      insights,
    };

    // Save analysis to database
    await ComparativeProgress.create(analysis);

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function calculateMetrics(schools, type) {
  const currentData = aggregateData(schools, type);
  const historicalData = aggregateHistoricalData(schools, type);
  // console.log('Current data:', currentData[0]);
  console.log(calculateStandardizationRate(currentData));

  return {
    standardizationRate: {
      value: calculateStandardizationRate(currentData),
      change: calculatePercentageChange(
        calculateStandardizationRate(currentData),
        calculateStandardizationRate(historicalData)
      ),
    },
    schoolsTransitioned: {
      value: countTransitionedSchools(currentData),
      change: calculatePercentageChange(
        countTransitionedSchools(currentData),
        countTransitionedSchools(historicalData)
      ),
    },
    resourceUtilization: {
      value: calculateResourceUtilization(currentData),
      change: calculatePercentageChange(
        calculateResourceUtilization(currentData),
        calculateResourceUtilization(historicalData)
      ),
    },
    completionTime: {
      value: calculateAverageCompletionTime(currentData),
      change: calculatePercentageChange(
        calculateAverageCompletionTime(currentData),
        calculateAverageCompletionTime(historicalData)
      ),
    },
  };
}

function calculateProgressDistribution(schools, type) {
  if (type === 'district') {
    return schools.reduce((acc, school) => {
      const districtData = acc.find((d) => d.name === school.district) || {
        name: school.district,
        standardized: 0,
        inProgress: 0,
        pending: 0,
      };

      switch (school.transitionStatus) {
        case 'completed':
          districtData.standardized++;
          break;
        case 'in-progress':
          districtData.inProgress++;
          break;
        case 'pending':
          districtData.pending++;
          break;
      }

      if (!acc.find((d) => d.name === school.district)) {
        acc.push(districtData);
      }

      return acc;
    }, []);
  }

  return schools.map((school) => ({
    name: school.name,
    standardized: school.transitionStatus === 'completed' ? 100 : 0,
    inProgress: school.transitionStatus === 'in-progress' ? 100 : 0,
    pending: school.transitionStatus === 'pending' ? 100 : 0,
  }));
}

function calculateTopPerformers(schools, type) {
  const performers =
    type === 'district'
      ? calculateDistrictPerformers(schools)
      : calculateSchoolPerformers(schools);

  return performers.slice(0, 5).map((p) => ({
    name: p.name,
    score: p.score,
    change: calculateScoreChange(p, schools),
  }));
}

function calculateDistrictPerformers(schools) {
  const districtData = schools.reduce((acc, school) => {
    if (!acc[school.district]) {
      acc[school.district] = {
        name: school.district,
        totalSchools: 0,
        completedSchools: 0,
        qualityScores: [],
      };
    }

    acc[school.district].totalSchools++;
    if (school.transitionStatus === 'completed') {
      acc[school.district].completedSchools++;
    }
    acc[school.district].qualityScores.push(school.qualityScore || 0);

    return acc;
  }, {});

  return Object.values(districtData)
    .map((district) => ({
      name: district.name,
      score:
        (district.completedSchools / district.totalSchools) * 60 +
        (district.qualityScores.reduce((a, b) => a + b, 0) /
          district.qualityScores.length) *
          0.4,
    }))
    .sort((a, b) => b.score - a.score);
}

function calculateSchoolPerformers(schools) {
  return schools
    .map((school) => ({
      name: school.name,
      score: calculateSchoolScore(school),
    }))
    .sort((a, b) => b.score - a.score);
}

function calculateSchoolScore(school) {
  const transitionScore =
    school.transitionStatus === 'completed'
      ? 100
      : school.transitionStatus === 'in-progress'
      ? 50
      : 0;

  const qualityScore = school.qualityScore || 0;
  const facilitiesScore = (school.facilities.length / 10) * 100;

  return transitionScore * 0.4 + qualityScore * 0.4 + facilitiesScore * 0.2;
}

function calculateScoreChange(performer, schools) {
  const historicalData = schools.find(
    (s) => s.name === performer.name || s.district === performer.name
  )?.history[0];

  if (!historicalData) return 0;

  const previousScore =
    performer.name === s.name
      ? calculateSchoolScore(historicalData)
      : calculateDistrictScore(historicalData);

  return ((performer.score - previousScore) / previousScore) * 100;
}

async function generateInsights(schools, type) {
  console.log('Generating insights for:', type, schools);
  try {
    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );
    const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
    Analyze this school data and provide insights in the following JSON format:
    {
      "strongPerformance": {
        "entity": "name of best performing ${type}",
        "description": "brief description of strong performance"
      },
      "areasForImprovement": {
        "entity": "name of ${type} needing improvement",
        "description": "brief description of improvement areas"
      },
      "trendingUpward": {
        "entity": "name of ${type} showing improvement",
        "description": "brief description of improvement trend"
      }
    }

    School data: ${JSON.stringify(schools)}
  `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up the response text
    let cleanedResponse = responseText
      .replace(/```json\n?/g, '') // Remove JSON code block markers
      .replace(/```\n?/g, '') // Remove any remaining code block markers
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
      .trim();

    // Try to find JSON content within the response
    const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }


    try {
      const challenges = JSON.parse(cleanedResponse);
      return challenges;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error generating insights:', error);
    return null;
  }
}

// Helper functions
function calculateStandardizationRate(data) {
  console.log(data, 'data');
  const completed = data.filter(
    (s) => s.transitionStatus && s.transitionStatus.toLowerCase() === 'completed'
  ).length;
  console.log(completed, 'completed');
  return (completed / data.length) * 100;
}

function countTransitionedSchools(data) {
  return data.filter((s) => s.transitionStatus === 'completed').length;
}

function calculateResourceUtilization(data) {
  return (
    data.reduce((acc, school) => {
      const utilizationScore = (school.facilities.length / 10) * 100; // Assuming 10 is max facilities
      return acc + utilizationScore;
    }, 0) / data.length
  );
}

function calculateAverageCompletionTime(data) {
  const completedSchools = data.filter(
    (s) => s.transitionStatus === 'completed'
  );
  if (completedSchools.length === 0) return 0;

  return (
    completedSchools.reduce((acc, school) => {
      const completionTime = calculateCompletionTime(school);
      return acc + completionTime;
    }, 0) / completedSchools.length
  );
}

function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function aggregateData(schools, type) {
  if (type === 'district') {
    return schools.reduce((acc, school) => {
      const district = acc.find((d) => d.district === school.district);
      if (district) {
        district.schools.push(school);
      } else {
        acc.push({
          district: school.district,
          schools: [school],
        });
      }
      return acc;
    }, []);
  }
  return schools;
}

function aggregateHistoricalData(schools, type) {
  return schools.map((school) => {
    const lastMonth = school.history[0] || school;
    return {
      ...lastMonth,
      district: school.district,
    };
  });
}

function calculateCompletionTime(school) {
  const startDate = new Date(school.createdAt);
  const completionDate = new Date(school.lastUpdated);
  return Math.ceil((completionDate - startDate) / (1000 * 60 * 60 * 24 * 30)); // in months
}
