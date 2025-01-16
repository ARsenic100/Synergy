import Directory from '../models/Directory.js';
import { validationResult } from 'express-validator';

export const getStakeholders = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, location, expertise } = req.query;
    const query = {};

    if (role) {
      query.role = role;
    }

    if (location) {
      query['location.state'] = location;
    }

    if (expertise) {
      query.expertise = { $in: [expertise] };
    }

    const stakeholders = await Directory.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Directory.countDocuments(query);

    res.json({
      stakeholders,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStakeholder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const stakeholder = new Directory(req.body);
    const savedStakeholder = await stakeholder.save();
    res.status(201).json(savedStakeholder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestConnection = async (req, res) => {
  try {
    const stakeholder = await Directory.findById(req.params.id);
    
    if (!stakeholder) {
      return res.status(404).json({ message: 'Stakeholder not found' });
    }

    const existingConnection = stakeholder.connections.find(
      conn => conn.user.toString() === req.user.id
    );

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }

    stakeholder.connections.push({
      user: req.user.id,
      status: 'in-progress'
    });

    await stakeholder.save();
    res.json(stakeholder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConnectionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const stakeholder = await Directory.findById(req.params.id);
    
    if (!stakeholder) {
      return res.status(404).json({ message: 'Stakeholder not found' });
    }

    const connection = stakeholder.connections.find(
      conn => conn.user.toString() === req.params.userId
    );

    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    connection.status = status;
    await stakeholder.save();
    res.json(stakeholder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};