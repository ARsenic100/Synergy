import Survey from '../models/Survey.js';
import { validationResult } from 'express-validator';

// Get a list of all surveys
export const getSurveys = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, targetAudience } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (targetAudience) {
      query.targetAudience = targetAudience;
    }

    const surveys = await Survey.find(query)
      .populate('creator', 'name')
      .sort({ startDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Survey.countDocuments(query);

    res.json({
      surveys,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new survey
export const createSurvey = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const survey = new Survey({
      ...req.body,
      creator: req.user.id,
    });

    const savedSurvey = await survey.save();
    await savedSurvey.populate('creator', 'name');

    res.status(201).json(savedSurvey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a response to a survey
export const submitResponse = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    if (survey.status !== 'active') {
      return res.status(400).json({ message: 'Survey is not active' });
    }

    if (new Date(survey.endDate) < new Date()) {
      return res.status(400).json({ message: 'Survey has ended' });
    }

    const alreadyResponded = survey.responses.some(
      (response) => response.user.toString() === req.user.id
    );

    if (alreadyResponded) {
      return res.status(400).json({ message: 'Already submitted response' });
    }

    survey.responses.push({
      user: req.user.id,
      answers: req.body.answers,
    });

    await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get survey analytics
export const getSurveyAnalytics = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate(
      'responses.user',
      'name'
    );

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    const analytics = {
      totalResponses: survey.responses.length,
      questionAnalytics: survey.questions.map((question) => {
        const answers = survey.responses.map((response) =>
          response.answers.find(
            (a) => a.question.toString() === question._id.toString()
          )
        );

        if (question.type === 'multiple-choice') {
          const optionCounts = {};
          answers.forEach((answer) => {
            if (answer && answer.answer) {
              optionCounts[answer.answer] =
                (optionCounts[answer.answer] || 0) + 1;
            }
          });
          return { question: question.question, optionCounts };
        }

        return { question: question.question, responses: answers.length };
      }),
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update survey
export const updateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    if (survey.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this survey' });
    }

    Object.assign(survey, req.body);
    await survey.save();
    
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};