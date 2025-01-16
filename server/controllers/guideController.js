import Guide from '../models/Guide.js';

export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGuide = async (req, res) => {
  try {
    const guide = new Guide(req.body);
    const savedGuide = await guide.save();
    res.status(201).json(savedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    Object.assign(guide, req.body);
    const updatedGuide = await guide.save();
    res.json(updatedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    await guide.deleteOne();
    res.json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStepStatus = async (req, res) => {
  try {
    const { guideId, stepId, status } = req.body;
    const guide = await Guide.findById(guideId);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    const step = guide.steps.id(stepId);
    if (!step) {
      return res.status(404).json({ message: 'Step not found' });
    }

    step.status = status;
    await guide.save();
    res.json(guide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCheckpoint = async (req, res) => {
  try {
    const { guideId, stepId, checkpointId, completed } = req.body;
    const guide = await Guide.findById(guideId);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    const step = guide.steps.id(stepId);
    if (!step) {
      return res.status(404).json({ message: 'Step not found' });
    }

    const checkpoint = step.checkpoints.id(checkpointId);
    if (!checkpoint) {
      return res.status(404).json({ message: 'Checkpoint not found' });
    }

    checkpoint.completed = completed;
    await guide.save();
    res.json(guide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};