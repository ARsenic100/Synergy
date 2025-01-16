import SupportTicket from '../models/SupportTicket.js';
import { validationResult } from 'express-validator';

export const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = new SupportTicket({
      ...req.body,
      user: req.user.id,
      status: 'open'
    });

    const savedTicket = await ticket.save();
    await savedTicket.populate('user', 'name email');

    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { status, priority, category } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const tickets = await SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(ticket, req.body);
    await ticket.save();
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Add new comment to the ticket's comments array
    ticket.comments.push({
      user: req.user.id,
      content: req.body.content
    });

    // Save the ticket
    await ticket.save();

    // Re-fetch the ticket to populate the comments' user fields
    const updatedTicket = await SupportTicket.findById(ticket._id).populate('comments.user', 'name email');

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
