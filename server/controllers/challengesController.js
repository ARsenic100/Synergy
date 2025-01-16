import { GoogleGenerativeAI } from '@google/generative-ai';
import Challenge from '../models/Challenge.js';
import ChallengeMetrics from '../models/ChallengeMetrics.js';
import School from '../models/School.js';

const genAI = new GoogleGenerativeAI('process.env.GEMINI_API_KEY');

export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    const metrics =
      (await ChallengeMetrics.findOne()) || (await ChallengeMetrics.create({}));

    res.json({
      challenges,
      metrics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();

    // Update metrics
    await updateMetrics();

    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Update metrics
    await updateMetrics();

    res.json(challenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Update metrics
    await updateMetrics();

    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const analyzeSchoolData = async (req, res) => {
  try {

    const client = new GoogleGenerativeAI(
        'process.env.GEMINI_API_KEY'
      );

    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const schools = await School.find();

    // Prepare school data for analysis
    const schoolData = schools.map((school) => ({
      name: school.name,
      state: school.state,
      district: school.district,
      currentStructure: school.currentStructure,
      recommendedStructure: school.recommendedStructure,
      transitionStatus: school.transitionStatus,
      performanceBand: school.performanceBand,
      studentCount: school.studentCount,
      teacherCount: school.teacherCount,
      facilities: school.facilities,
      qualityScore: school.qualityScore,
    }));

    const prompt = `
      Analyze this school data and identify challenges in the following format:
      {
        "challenges": [
          {
            "title": "Challenge title",
            "description": "Detailed description",
            "severity": "high|medium|low",
            "status": "open",
            "affectedSchools": number,
            "region": "State or region name"
          }
        ],
        "metrics": {
          "criticalIssues": number,
          "openChallenges": number,
          "resolvedThisMonth": number
        }
      }

      Consider factors like:
      - Infrastructure gaps
      - Teacher shortages
      - Resource distribution
      - Performance issues
      - Transition status problems
      - Quality score variations

      School data: ${JSON.stringify(schoolData)}
    `;


    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[^[{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();


    if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
      throw new Error('Invalid JSON array structure');
    }

    const analysis = JSON.parse(cleanedResponse);

    // Save AI-generated challenges
    await Challenge.deleteMany({ aiGenerated: true });
    await Challenge.insertMany(
      analysis.challenges.map((challenge) => ({
        ...challenge,
        aiGenerated: true,
      }))
    );

    // Update metrics
    await ChallengeMetrics.findOneAndUpdate({}, analysis.metrics, {
      upsert: true,
      new: true,
    });

    res.json({
      challenges: await Challenge.find().sort({ createdAt: -1 }),
      metrics: analysis.metrics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateMetrics() {
  const [criticalIssues, openChallenges, resolvedThisMonth] = await Promise.all(
    [
      Challenge.countDocuments({ severity: 'high', status: 'open' }),
      Challenge.countDocuments({ status: 'open' }),
      Challenge.countDocuments({
        status: 'resolved',
        updatedAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      }),
    ]
  );

  await ChallengeMetrics.findOneAndUpdate(
    {},
    {
      criticalIssues,
      openChallenges,
      resolvedThisMonth,
      lastAnalyzed: new Date(),
    },
    { upsert: true }
  );
}
