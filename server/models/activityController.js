import Activity from '../models/Activity.js';

export const trackActivity = async (req, res) => {
  try {
    const { type, action, title, description, metadata } = req.body;
    
    const activity = new Activity({
      user: req.user.id,
      type,
      action,
      title,
      description,
      metadata
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'name');

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};