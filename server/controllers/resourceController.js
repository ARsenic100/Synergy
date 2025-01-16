import Resource from '../models/Resource.js';
import { validationResult } from 'express-validator';

export const getResources = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, type, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const resources = await Resource.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Resource.countDocuments(query);

    res.json({
      resources,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const resource = new Resource({
      ...req.body,
      uploadedBy: req.user.id
    });

    const savedResource = await resource.save();
    await savedResource.populate('uploadedBy', 'name');

    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.downloads.push({ user: req.user.id });
    await resource.save();

    res.json({ downloadUrl: resource.fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const index = resource.likes.indexOf(req.user.id);
    if (index === -1) {
      resource.likes.push(req.user.id);
    } else {
      resource.likes.splice(index, 1);
    }

    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recordView = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.views.push({ user: req.user.id });
    await resource.save();

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};