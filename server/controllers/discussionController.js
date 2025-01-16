import Discussion from '../models/Discussion.js';
import { validationResult } from 'express-validator';

export const getDiscussions = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const discussions = await Discussion.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Discussion.countDocuments(query);

    res.json({
      discussions,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDiscussion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const discussion = new Discussion({
      ...req.body,
      author: req.user.id
    });

    const savedDiscussion = await discussion.save();
    await savedDiscussion.populate('author', 'name');

    res.status(201).json(savedDiscussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name')
      .populate('replies.author', 'name');

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    discussion.replies.push({
      author: req.user.id,
      content
    });

    await discussion.save();
    await discussion.populate('replies.author', 'name');

    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const index = discussion.likes.indexOf(req.user.id);
    if (index === -1) {
      discussion.likes.push(req.user.id);
    } else {
      discussion.likes.splice(index, 1);
    }

    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};