import Training from '../models/Training.js';

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training module not found' });
    }
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTraining = async (req, res) => {
  try {
    const training = new Training({
      ...req.body,
      topics: req.body.topics.map(topic => ({
        ...topic,
        status: 'pending'
      }))
    });
    const savedTraining = await training.save();
    res.status(201).json(savedTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training module not found' });
    }

    Object.assign(training, req.body);
    const updatedTraining = await training.save();
    res.json(updatedTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Training module not found' });
    }

    await training.deleteOne();
    res.json({ message: 'Training module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTopicStatus = async (req, res) => {
  try {
    const { id, topicId } = req.params;
    const { status } = req.body;

    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: 'Training module not found' });
    }

    const topic = training.topics.id(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    topic.status = status;

    // Calculate completion rate
    const completedTopics = training.topics.filter(t => t.status === 'completed').length;
    training.completionRate = (completedTopics / training.topics.length) * 100;

    await training.save();
    res.json(training);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};