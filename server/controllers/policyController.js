import Policy from '../models/Policy.js';
import { validationResult } from 'express-validator';

export const getPolicies = async (req, res) => {
  try {
    const { category, importance, status, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (importance) query.importance = importance;
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } }
      ];
    }

    const policies = await Policy.find(query)
      .populate('author', 'name')
      .populate('approvedBy', 'name')
      .sort({ effectiveDate: -1 });

    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPolicy = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const policy = new Policy({
      ...req.body,
      author: req.user.id,
      status: 'draft'
    });

    const savedPolicy = await policy.save();
    await savedPolicy.populate('author', 'name');

    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id)
      .populate('author', 'name')
      .populate('approvedBy', 'name');

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    Object.assign(policy, req.body);
    
    if (req.body.status === 'published') {
      policy.approvedBy = req.user.id;
    }

    await policy.save();
    await policy.populate('author approvedBy', 'name');

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const archivePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    policy.status = 'archived';
    await policy.save();

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};