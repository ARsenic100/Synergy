import CommunityFeedback from '../models/resource-allocation/CommunityFeedback.js';

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await CommunityFeedback.find()
      .sort({ date: -1 })
      .limit(10);
    
    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { schoolName, type, message, priority } = req.body;
    
    const newFeedback = new CommunityFeedback({
      schoolName,
      type,
      message,
      priority
    });
    
    const savedFeedback = await newFeedback.save();
    return res.status(201).json(savedFeedback);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;
    
    const updatedFeedback = await CommunityFeedback.findByIdAndUpdate(
      id,
      { status, response },
      { new: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    return res.status(200).json(updatedFeedback);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};