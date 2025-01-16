import Achievement from '../models/Achievement.js';
import { validationResult } from 'express-validator';

export const getAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    const achievements = await Achievement.find({ user: userId })
      .sort({ earnedDate: -1 });

    const totalPoints = achievements.reduce((sum, achievement) => 
      sum + achievement.points, 0);

    res.json({ achievements, totalPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const awardAchievement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const achievement = new Achievement({
      ...req.body,
      user: req.params.userId,
      earnedDate: new Date()
    });

    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllAcheivements = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const achievements = await Achievement.find({ school: schoolId })
      .sort({ earnedDate: -1 });

    const totalPoints = achievements.reduce((sum, achievement) => 
      sum + achievement.points, 0);

    res.json({ achievements, totalPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const shareAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    // if (achievement.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }

    achievement.shared = true;
    achievement.shareDate = new Date();
    
    await achievement.save();
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};